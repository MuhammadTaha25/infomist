import * as React from "react";
import { Check, Reply, Pencil, Ban, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import type { CommentStatus } from "../types";
import { useBlogging, usePosts } from "../store";
import { PageHeader, EmptyState } from "../components/common";
import { relativeTime } from "../utils/format";
import { MessageSquare } from "lucide-react";

const TABS: { value: CommentStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "spam", label: "Spam" },
  { value: "trash", label: "Trash" },
];

export function CommentsPage() {
  const { state, dispatch } = useBlogging();
  const posts = usePosts();
  const [tab, setTab] = React.useState<CommentStatus | "all">("all");

  const rows = state.comments.filter((c) => (tab === "all" ? c.status !== "trash" : c.status === tab));
  const postTitle = (id: string) => posts.find((p) => p.id === id)?.title ?? "Unknown post";

  const setStatus = (id: string, status: CommentStatus, label: string) => {
    dispatch({ type: "comment/status", id, status });
    toast.success(label);
  };

  return (
    <>
      <PageHeader title="Comments" description="Moderate reader comments. Frontend-only — no backend." />

      <Tabs value={tab} onValueChange={(v) => setTab(v as CommentStatus | "all")}>
        <TabsList>
          {TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {rows.length === 0 ? (
        <EmptyState icon={MessageSquare} title="Nothing here" description="No comments with this status." />
      ) : (
        <div className="space-y-3">
          {rows.map((c) => (
            <Card key={c.id}>
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start">
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-foreground">{c.author}</span>
                    <span className="text-xs text-muted-foreground">{c.email}</span>
                    <Badge
                      variant={
                        c.status === "approved" ? "default" : c.status === "spam" ? "destructive" : "secondary"
                      }
                    >
                      {c.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">· {relativeTime(c.createdAt)}</span>
                  </div>
                  <p className="text-sm text-foreground">{c.content}</p>
                  <p className="text-xs text-muted-foreground">
                    on <span className="font-medium">{postTitle(c.postId)}</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.status !== "approved" ? (
                    <Button size="sm" variant="outline" onClick={() => setStatus(c.id, "approved", "Comment approved")}>
                      <Check className="h-3.5 w-3.5" /> Approve
                    </Button>
                  ) : null}
                  <Button size="sm" variant="ghost" onClick={() => toast("Reply composer is a demo in this prototype")}>
                    <Reply className="h-3.5 w-3.5" /> Reply
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => toast("Inline edit is a demo in this prototype")}>
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Button>
                  {c.status !== "spam" ? (
                    <Button size="sm" variant="ghost" onClick={() => setStatus(c.id, "spam", "Marked as spam")}>
                      <Ban className="h-3.5 w-3.5" /> Spam
                    </Button>
                  ) : null}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => setStatus(c.id, "trash", "Moved to trash")}
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
