import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  FileText,
  Users,
  Image as ImageIcon,
  FolderTree,
  Tags,
  CalendarDays,
  Settings,
  MessageSquare,
  PenSquare,
  ArrowLeft,
  FilePlus2,
  FileEdit,
  Clock,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePostCounts } from "../store";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

function useActive() {
  const [loc] = useLocation();
  return (href: string, exact = false) =>
    exact ? loc === href || loc === `${href}/` : loc === href || loc.startsWith(`${href}/`);
}

export function BloggingSidebar() {
  const isActive = useActive();
  const counts = usePostCounts();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <span className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                  <PenSquare className="size-4" />
                </span>
                <span className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-sm font-semibold">Blogging</span>
                  <span className="truncate text-xs text-muted-foreground">Infomist Insights</span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/", true)} tooltip="Dashboard">
                  <Link href="/">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/posts")} tooltip="Posts">
                  <Link href="/posts">
                    <FileText />
                    <span>Posts</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge>{counts.total}</SidebarMenuBadge>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={isActive("/posts", true)}>
                      <Link href="/posts">
                        <FileText />
                        <span>All Posts</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={isActive("/posts/new")}>
                      <Link href="/posts/new">
                        <FilePlus2 />
                        <span>Add New Post</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={isActive("/posts/drafts")}>
                      <Link href="/posts/drafts">
                        <FileEdit />
                        <span>Drafts</span>
                        {counts.draft > 0 ? <span className="ml-auto text-xs text-muted-foreground">{counts.draft}</span> : null}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={isActive("/posts/pending")}>
                      <Link href="/posts/pending">
                        <Clock />
                        <span>Pending Review</span>
                        {counts.pending > 0 ? <span className="ml-auto text-xs text-muted-foreground">{counts.pending}</span> : null}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={isActive("/posts/scheduled")}>
                      <Link href="/posts/scheduled">
                        <CalendarDays />
                        <span>Scheduled</span>
                        {counts.scheduled > 0 ? <span className="ml-auto text-xs text-muted-foreground">{counts.scheduled}</span> : null}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={isActive("/posts/published")}>
                      <Link href="/posts/published">
                        <CheckCircle2 />
                        <span>Published</span>
                        {counts.published > 0 ? <span className="ml-auto text-xs text-muted-foreground">{counts.published}</span> : null}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={isActive("/posts/trash")}>
                      <Link href="/posts/trash">
                        <Trash2 />
                        <span>Trash</span>
                        {counts.trash > 0 ? <span className="ml-auto text-xs text-muted-foreground">{counts.trash}</span> : null}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/authors")} tooltip="Authors">
                  <Link href="/authors">
                    <Users />
                    <span>Authors</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/media")} tooltip="Media">
                  <Link href="/media">
                    <ImageIcon />
                    <span>Media</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/categories")} tooltip="Categories">
                  <Link href="/categories">
                    <FolderTree />
                    <span>Categories</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/tags")} tooltip="Tags">
                  <Link href="/tags">
                    <Tags />
                    <span>Tags</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/calendar")} tooltip="Editorial Calendar">
                  <Link href="/calendar">
                    <CalendarDays />
                    <span>Editorial Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/comments")} tooltip="Comments">
                  <Link href="/comments">
                    <MessageSquare />
                    <span>Comments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/settings")} tooltip="Settings">
                  <Link href="/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Back to website">
              <a href={`${base}/`}>
                <ArrowLeft />
                <span>Back to website</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
