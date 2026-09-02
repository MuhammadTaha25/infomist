import { useParams, useLocation, Link } from "wouter";
import { ArrowLeft, Globe, Linkedin, Twitter, Pencil } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthor, usePosts, useCategories } from "../store";
import { StatCard, StatusBadge, Thumb } from "../components/common";
import { AuthorFormDialog } from "../components/AuthorFormDialog";
import { effectiveStatus, formatDate } from "../utils/format";
import { FileText, CheckCircle2, FileEdit, FolderTree } from "lucide-react";

export function AuthorProfilePage() {
  const params = useParams();
  const [, navigate] = useLocation();
  const author = useAuthor(params.id ?? null);
  const posts = usePosts();
  const categories = useCategories();
  const [edit, setEdit] = React.useState(false);

  if (!author) {
    return <p className="text-sm text-muted-foreground">Author not found.</p>;
  }

  const authored = posts.filter((p) => p.authorId === author.id);
  const live = authored.filter((p) => effectiveStatus(p.status, p.publishedAt) !== "trash");
  const published = live.filter((p) => effectiveStatus(p.status, p.publishedAt) === "published");
  const drafts = live.filter((p) => p.status === "draft");
  const cats = new Set(live.map((p) => p.categoryId).filter(Boolean));

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => navigate("/authors")}>
        <ArrowLeft className="h-4 w-4" /> Authors
      </Button>

      <Card>
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start">
          <Avatar className="h-20 w-20">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback className="text-lg">{author.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold text-foreground">{author.displayName}</h1>
              <Badge variant="secondary">{author.role}</Badge>
              <Badge variant={author.status === "active" ? "default" : "outline"}>{author.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {author.jobTitle}
              {author.expertise.length ? ` · ${author.expertise.join(" • ")}` : ""}
            </p>
            <p className="max-w-2xl text-sm text-foreground">{author.bio}</p>
            <div className="flex items-center gap-3 pt-1 text-muted-foreground">
              {author.social.website ? (
                <a href={author.social.website} target="_blank" rel="noopener" aria-label="Website">
                  <Globe className="h-4 w-4" />
                </a>
              ) : null}
              {author.social.linkedin ? (
                <a href={author.social.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              ) : null}
              {author.social.x ? (
                <a href={author.social.x} target="_blank" rel="noopener" aria-label="X">
                  <Twitter className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setEdit(true)}>
            <Pencil className="h-4 w-4" /> Edit
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Posts" value={live.length} icon={FileText} accent />
        <StatCard label="Published" value={published.length} icon={CheckCircle2} />
        <StatCard label="Drafts" value={drafts.length} icon={FileEdit} />
        <StatCard label="Categories" value={cats.size} icon={FolderTree} />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Published Posts</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {live.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <Thumb mediaId={p.featuredImageId} />
                  </TableCell>
                  <TableCell>
                    <Link href={`/posts/${p.id}/edit`} className="font-medium hover:text-primary hover:underline">
                      {p.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm">{categories.find((c) => c.id === p.categoryId)?.name ?? "—"}</TableCell>
                  <TableCell>
                    <StatusBadge status={p.status} publishedAt={p.publishedAt} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(p.publishedAt ?? p.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/posts/${p.id}/preview`}>Preview</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {live.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                    No posts by this author yet.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>
      </div>

      <AuthorFormDialog open={edit} onOpenChange={setEdit} author={author} />
    </>
  );
}
