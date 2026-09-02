import { Switch, Route, Redirect } from "wouter";
import { Toaster } from "sonner";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { BloggingProvider } from "./store";
import { BloggingSidebar } from "./components/BloggingSidebar";
import { DashboardPage } from "./pages/DashboardPage";
import { PostsPage } from "./pages/PostsPage";
import { PostEditorPage } from "./pages/PostEditorPage";
import { PostPreviewPage } from "./pages/PostPreviewPage";
import { AuthorsPage } from "./pages/AuthorsPage";
import { AuthorProfilePage } from "./pages/AuthorProfilePage";
import { MediaPage } from "./pages/MediaPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { TagsPage } from "./pages/TagsPage";
import { CalendarPage } from "./pages/CalendarPage";
import { CommentsPage } from "./pages/CommentsPage";
import { SettingsPage } from "./pages/SettingsPage";

/** Full-bleed editor / preview routes render without the standard chrome. */
function Shell() {
  return (
    <SidebarProvider>
      <BloggingSidebar />
      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/95 px-4 backdrop-blur">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-1 h-5" />
          <span className="text-sm font-medium text-muted-foreground">Blogging</span>
        </header>
        <div className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-6xl space-y-6">
            <Switch>
              <Route path="/" component={DashboardPage} />
              <Route path="/posts" component={PostsListRoute} />
              <Route path="/posts/drafts">{() => <PostsPage scope="draft" />}</Route>
              <Route path="/posts/pending">{() => <PostsPage scope="pending" />}</Route>
              <Route path="/posts/scheduled">{() => <PostsPage scope="scheduled" />}</Route>
              <Route path="/posts/published">{() => <PostsPage scope="published" />}</Route>
              <Route path="/posts/trash">{() => <PostsPage scope="trash" />}</Route>
              <Route path="/authors" component={AuthorsPage} />
              <Route path="/authors/:id" component={AuthorProfilePage} />
              <Route path="/media" component={MediaPage} />
              <Route path="/categories" component={CategoriesPage} />
              <Route path="/tags" component={TagsPage} />
              <Route path="/calendar" component={CalendarPage} />
              <Route path="/comments" component={CommentsPage} />
              <Route path="/settings" component={SettingsPage} />
              <Route path="/settings/:section" component={SettingsPage} />
              <Route>{() => <Redirect to="/" />}</Route>
            </Switch>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function PostsListRoute() {
  return <PostsPage scope="all" />;
}

export function BloggingApp() {
  return (
    <BloggingProvider>
      <div className="min-h-screen bg-background font-sans text-foreground">
        <Switch>
          {/* Editor & preview take the whole viewport — no sidebar chrome. */}
          <Route path="/posts/new" component={PostEditorPage} />
          <Route path="/posts/:id/edit" component={PostEditorPage} />
          <Route path="/posts/:id/preview" component={PostPreviewPage} />
          <Route component={Shell} />
        </Switch>
      </div>
      <Toaster position="bottom-right" richColors closeButton />
    </BloggingProvider>
  );
}
