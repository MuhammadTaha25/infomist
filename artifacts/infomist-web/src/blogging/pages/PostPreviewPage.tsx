import * as React from "react";
import { useParams, useLocation, Link } from "wouter";
import { ArrowLeft, Monitor, Tablet, Smartphone, Clock, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { usePost, useAuthor, useCategory, useMediaItem, usePosts, useTags } from "../store";
import { BlocksView } from "../components/blocks/BlockView";
import { formatDate, readingTime, stripHtml } from "../utils/format";

type Device = "desktop" | "tablet" | "mobile";
const WIDTH: Record<Device, string> = { desktop: "max-w-3xl", tablet: "max-w-xl", mobile: "max-w-sm" };

export function PostPreviewPage() {
  const params = useParams();
  const [, navigate] = useLocation();
  const post = usePost(params.id ?? null);
  const author = useAuthor(post?.authorId);
  const category = useCategory(post?.categoryId ?? null);
  const secondary = useCategory(post?.secondaryCategoryId ?? null);
  const featured = useMediaItem(post?.featuredImageId ?? null);
  const allPosts = usePosts();
  const tags = useTags();
  const [device, setDevice] = React.useState<Device>("desktop");

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Post not found.</div>
    );
  }

  const headings = post.blocks.filter((b) => b.type === "heading");
  const hasToc = post.blocks.some((b) => b.type === "toc");
  const related = allPosts
    .filter((p) => p.id !== post.id && (p.categoryId === post.categoryId || p.tagIds.some((t) => post.tagIds.includes(t))))
    .slice(0, 3);
  const postTags = post.tagIds.map((id) => tags.find((t) => t.id === id)).filter(Boolean);

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-border bg-background px-3 sm:px-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/posts/${post.id}/edit`)}>
          <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Back to editor</span>
        </Button>
        <Separator orientation="vertical" className="mx-1 h-5" />
        <span className="text-sm font-medium text-muted-foreground">Preview</span>
        <div className="mx-auto flex items-center gap-1 rounded-md border border-border p-0.5">
          {(["desktop", "tablet", "mobile"] as Device[]).map((d) => {
            const Icon = d === "desktop" ? Monitor : d === "tablet" ? Tablet : Smartphone;
            return (
              <button
                key={d}
                onClick={() => setDevice(d)}
                className={cn(
                  "flex h-7 items-center gap-1.5 rounded px-2.5 text-xs font-medium capitalize",
                  device === d ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
                )}
              >
                <Icon className="h-3.5 w-3.5" /> <span className="hidden sm:inline">{d}</span>
              </button>
            );
          })}
        </div>
        <Button size="sm" variant="outline" onClick={() => navigate(`/posts/${post.id}/edit`)}>
          <Pencil className="h-4 w-4" /> <span className="hidden sm:inline">Edit</span>
        </Button>
      </header>

      <div className="px-4 py-8">
        <article className={cn("mx-auto rounded-xl border border-border bg-background p-6 shadow-sm transition-all sm:p-10", WIDTH[device])}>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {category ? <Badge>{category.name}</Badge> : null}
            {secondary ? <Badge variant="secondary">{secondary.name}</Badge> : null}
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{post.title || "Untitled"}</h1>

          {post.excerpt ? <p className="mt-3 text-lg text-muted-foreground">{post.excerpt}</p> : null}

          <div className="mt-5 flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={author?.avatar} alt={author?.name} />
              <AvatarFallback>{author?.name.slice(0, 2) ?? "?"}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium text-foreground">By {author?.displayName ?? "Unknown"}</p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                {formatDate(post.publishedAt ?? post.updatedAt, { month: "long", day: "numeric", year: "numeric" })}
                <span>·</span>
                <Clock className="h-3 w-3" /> {readingTime(post.blocks)} min read
              </p>
            </div>
          </div>

          {featured?.url ? (
            <img
              src={featured.url}
              alt={featured.alt}
              className="mt-6 aspect-video w-full rounded-lg border border-border object-cover"
            />
          ) : null}

          {hasToc && headings.length > 0 ? (
            <nav className="mt-6 rounded-lg border border-border bg-muted/40 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Table of contents</p>
              <ol className="space-y-1 text-sm">
                {headings.map((h) => (
                  <li key={h.id} className={cn(h.level === 3 && "pl-4", h.level === 4 && "pl-8")}>
                    <span className="text-primary">{stripHtml(h.html)}</span>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <Separator className="my-6" />

          <div className="prose prose-slate max-w-none">
            <BlocksView blocks={post.blocks} />
          </div>

          {postTags.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-1.5 border-t border-border pt-6">
              {postTags.map((t) => (
                <Badge key={t!.id} variant="outline">#{t!.name}</Badge>
              ))}
            </div>
          ) : null}
        </article>

        {related.length > 0 ? (
          <div className={cn("mx-auto mt-8", WIDTH[device])}>
            <p className="mb-3 text-sm font-semibold text-foreground">Related content</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} href={`/posts/${r.id}/preview`}>
                  <div className="rounded-lg border border-border bg-background p-3 text-sm transition-colors hover:border-primary-border">
                    <p className="font-medium text-foreground line-clamp-2">{r.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
