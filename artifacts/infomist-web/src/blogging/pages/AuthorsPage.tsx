import * as React from "react";
import { Link } from "wouter";
import { Plus, Pencil, Trash2, MoreHorizontal, Globe, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import type { Author } from "../types";
import { useAuthors, usePosts, useBlogging } from "../store";
import { PageHeader } from "../components/common";
import { AuthorFormDialog } from "../components/AuthorFormDialog";
import { effectiveStatus } from "../utils/format";

export function AuthorsPage() {
  const authors = useAuthors();
  const posts = usePosts();
  const { dispatch } = useBlogging();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Author | null>(null);

  const postCount = (id: string) =>
    posts.filter((p) => p.authorId === id && effectiveStatus(p.status, p.publishedAt) !== "trash").length;

  return (
    <>
      <PageHeader title="Authors" description="People who write for the blog. Frontend-only — no logins.">
        <Button
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
        >
          <Plus /> Add Author
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {authors.map((a) => (
          <Card key={a.id} className="flex flex-col">
            <CardContent className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <Link href={`/authors/${a.id}`} className="font-semibold text-foreground hover:text-primary hover:underline">
                    {a.displayName}
                  </Link>
                  <p className="text-xs text-muted-foreground">{a.jobTitle || a.role}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/authors/${a.id}`}>View profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setEditing(a);
                        setDialogOpen(true);
                      }}
                    >
                      <Pencil /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => {
                        if (postCount(a.id) > 0) {
                          toast.error("Reassign this author's posts before deleting.");
                          return;
                        }
                        dispatch({ type: "author/delete", id: a.id });
                        toast.success("Author removed");
                      }}
                    >
                      <Trash2 /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="line-clamp-3 text-sm text-muted-foreground">{a.bio}</p>

              <div className="flex flex-wrap gap-1">
                {a.expertise.slice(0, 3).map((e) => (
                  <Badge key={e} variant="secondary" className="text-[10px]">
                    {e}
                  </Badge>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{postCount(a.id)} posts</Badge>
                  <Badge variant={a.status === "active" ? "default" : "secondary"}>{a.status}</Badge>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  {a.social.website ? <Globe className="h-3.5 w-3.5" /> : null}
                  {a.social.linkedin ? <Linkedin className="h-3.5 w-3.5" /> : null}
                  {a.social.x ? <Twitter className="h-3.5 w-3.5" /> : null}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AuthorFormDialog open={dialogOpen} onOpenChange={setDialogOpen} author={editing} />
    </>
  );
}
