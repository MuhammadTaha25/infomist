import { Link } from "wouter";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../components/common";
import { PostsTable } from "../components/PostsTable";
import type { PostStatus } from "../types";

const TITLES: Record<string, { title: string; description: string }> = {
  all: { title: "Posts", description: "Every post across the blog." },
  draft: { title: "Drafts", description: "Posts still being written." },
  pending: { title: "Pending Review", description: "Submitted for editorial review." },
  scheduled: { title: "Scheduled", description: "Set to publish automatically at a future date." },
  published: { title: "Published", description: "Live on the blog." },
  trash: { title: "Trash", description: "Removed posts. Restore or delete permanently." },
};

export function PostsPage({ scope }: { scope: "all" | PostStatus }) {
  const meta = TITLES[scope] ?? TITLES.all;
  return (
    <>
      <PageHeader title={meta.title} description={meta.description}>
        <Button asChild>
          <Link href="/posts/new">
            <Plus /> Add New Post
          </Link>
        </Button>
      </PageHeader>
      <PostsTable scope={scope} />
    </>
  );
}
