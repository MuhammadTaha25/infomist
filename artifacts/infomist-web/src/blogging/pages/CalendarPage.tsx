import * as React from "react";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePosts, useSettings, newPost, useBlogging } from "../store";
import { PageHeader } from "../components/common";
import { STATUS_META, effectiveStatus } from "../utils/format";
import { toast } from "sonner";

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarPage() {
  const posts = usePosts();
  const settings = useSettings();
  const { dispatch } = useBlogging();
  const [, navigate] = useLocation();
  const [cursor, setCursor] = React.useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  function postsOn(day: number) {
    return posts.filter((p) => {
      const ref = p.publishedAt ?? p.updatedAt;
      const d = new Date(ref);
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day && effectiveStatus(p.status, p.publishedAt) !== "trash";
    });
  }

  function createOn(day: number) {
    const p = newPost(settings);
    p.publishedAt = new Date(year, month, day, 9, 0).toISOString();
    p.status = "scheduled";
    dispatch({ type: "post/create", post: p });
    toast.success("New scheduled post created");
    navigate(`/posts/${p.id}/edit`);
  }

  return (
    <>
      <PageHeader
        title="Editorial Calendar"
        description="Posts placed on their publish date. Click a day to draft; click a post to edit."
      >
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCursor(new Date(year, month - 1, 1))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="min-w-[9rem] text-center text-sm font-medium">
            {cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </span>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCursor(new Date(year, month + 1, 1))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setCursor(new Date(today.getFullYear(), today.getMonth(), 1))}>
            Today
          </Button>
        </div>
      </PageHeader>

      <div className="flex flex-wrap gap-3 text-xs">
        {(["draft", "pending", "scheduled", "published"] as const).map((s) => (
          <span key={s} className="flex items-center gap-1.5">
            <span className={cn("h-2 w-2 rounded-full", STATUS_META[s].dot)} /> {STATUS_META[s].label}
          </span>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <div className="grid min-w-[720px] grid-cols-7 border-b border-border bg-muted/40 text-xs font-medium text-muted-foreground">
          {DOW.map((d) => (
            <div key={d} className="px-2 py-2 text-center">
              {d}
            </div>
          ))}
        </div>
        <div className="grid min-w-[720px] grid-cols-7">
          {cells.map((day, i) => {
            const isToday =
              day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const dayPosts = day ? postsOn(day) : [];
            return (
              <div
                key={i}
                className={cn(
                  "group min-h-[104px] border-b border-r border-border p-1.5",
                  !day && "bg-muted/20",
                )}
              >
                {day ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "text-xs font-medium",
                          isToday
                            ? "flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {day}
                      </span>
                      <button
                        onClick={() => createOn(day)}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                        aria-label="Create post"
                      >
                        <Plus className="h-3.5 w-3.5 text-muted-foreground hover:text-primary" />
                      </button>
                    </div>
                    <div className="mt-1 space-y-1">
                      {dayPosts.slice(0, 3).map((p) => {
                        const s = effectiveStatus(p.status, p.publishedAt);
                        return (
                          <button
                            key={p.id}
                            onClick={() => navigate(`/posts/${p.id}/edit`)}
                            className="flex w-full items-center gap-1 rounded bg-muted/60 px-1.5 py-1 text-left text-[11px] hover:bg-muted"
                          >
                            <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", STATUS_META[s].dot)} />
                            <span className="truncate">{p.title || "(untitled)"}</span>
                          </button>
                        );
                      })}
                      {dayPosts.length > 3 ? (
                        <p className="px-1 text-[10px] text-muted-foreground">+{dayPosts.length - 3} more</p>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
