import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { PostStatus } from "../types";
import { STATUS_META, effectiveStatus } from "../utils/format";
import { useAuthor, useMediaItem } from "../store";

export function StatusBadge({
  status,
  publishedAt,
  className,
}: {
  status: PostStatus;
  publishedAt?: string | null;
  className?: string;
}) {
  const eff = publishedAt !== undefined ? effectiveStatus(status, publishedAt) : status;
  const meta = STATUS_META[eff];
  return (
    <Badge variant={meta.badge} className={cn("gap-1.5 font-medium", className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </Badge>
  );
}

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children ? <div className="flex flex-wrap items-center gap-2">{children}</div> : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: boolean;
}) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-3 p-5">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold tabular-nums text-foreground">{value}</p>
          {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
        </div>
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border",
            accent
              ? "border-primary-border bg-primary/10 text-primary"
              : "border-border bg-muted text-muted-foreground",
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
      </CardContent>
    </Card>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted/30 px-6 py-14 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description ? <p className="max-w-sm text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function AuthorCell({ authorId }: { authorId: string }) {
  const author = useAuthor(authorId);
  if (!author) return <span className="text-muted-foreground">Unknown</span>;
  // Authors are represented by name only — no avatars / profile photos.
  return <span className="truncate text-sm">{author.displayName}</span>;
}

export function Thumb({ mediaId, className }: { mediaId: string | null; className?: string }) {
  const media = useMediaItem(mediaId);
  return (
    <div
      className={cn(
        "flex h-10 w-14 shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-muted",
        className,
      )}
    >
      {media?.url ? (
        <img src={media.url} alt={media.alt} className="h-full w-full object-cover" />
      ) : (
        <span className="text-[10px] text-muted-foreground">No image</span>
      )}
    </div>
  );
}
