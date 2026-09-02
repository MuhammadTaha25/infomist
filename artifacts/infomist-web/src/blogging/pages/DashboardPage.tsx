import { Link } from "wouter";
import {
  FileText,
  CheckCircle2,
  FileEdit,
  Clock,
  CalendarClock,
  Plus,
  ArrowRight,
  Users,
  FolderTree,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader, StatCard } from "../components/common";
import { PostsTable } from "../components/PostsTable";
import { usePostCounts, useAuthors, useCategories, useMediaLibrary, useSettings } from "../store";

export function DashboardPage() {
  const counts = usePostCounts();
  const authors = useAuthors();
  const categories = useCategories();
  const media = useMediaLibrary();
  const settings = useSettings();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <>
      <PageHeader title={`${greeting}, Admin`} description={settings.general.blogName}>
        <Button asChild>
          <Link href="/posts/new">
            <Plus /> Add New Post
          </Link>
        </Button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Total Posts" value={counts.total} icon={FileText} accent />
        <StatCard label="Published" value={counts.published} icon={CheckCircle2} />
        <StatCard label="Drafts" value={counts.draft} icon={FileEdit} />
        <StatCard label="Pending Review" value={counts.pending} icon={Clock} />
        <StatCard label="Scheduled" value={counts.scheduled} icon={CalendarClock} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MiniLink to="/authors" icon={Users} label="Authors" value={authors.length} />
        <MiniLink to="/categories" icon={FolderTree} label="Categories" value={categories.length} />
        <MiniLink to="/media" icon={ImageIcon} label="Media items" value={media.length} />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Recent Posts</CardTitle>
          <Button asChild variant="link" size="sm" className="h-auto p-0">
            <Link href="/posts">
              View all posts <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <PostsTable compact pageSize={6} />
        </CardContent>
      </Card>
    </>
  );
}

function MiniLink({
  to,
  icon: Icon,
  label,
  value,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <Link href={to}>
      <Card className="transition-colors hover:border-primary-border hover:bg-muted/40">
        <CardContent className="flex items-center gap-3 p-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground">
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">{value} {label}</p>
            <p className="text-xs text-muted-foreground">Manage {label.toLowerCase()}</p>
          </div>
          <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  );
}
