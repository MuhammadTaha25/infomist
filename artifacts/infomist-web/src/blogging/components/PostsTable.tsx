import * as React from "react";
import { Link, useLocation } from "wouter";
import {
  MoreHorizontal,
  Pencil,
  Eye,
  Copy,
  Trash2,
  RotateCcw,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { toast } from "sonner";
import type { Post, PostStatus } from "../types";
import { useAuthors, useBlogging, useCategories } from "../store";
import { effectiveStatus, formatDate, relativeTime } from "../utils/format";
import { StatusBadge, AuthorCell, Thumb, EmptyState } from "./common";
import { FileText } from "lucide-react";

type SortKey = "updated" | "title" | "date" | "status";
const PAGE_SIZE = 8;

export function PostsTable({
  scope = "all",
  compact = false,
  pageSize = PAGE_SIZE,
}: {
  scope?: "all" | PostStatus;
  compact?: boolean;
  pageSize?: number;
}) {
  const { state, dispatch } = useBlogging();
  const authors = useAuthors();
  const categories = useCategories();
  const [, navigate] = useLocation();

  const [q, setQ] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | PostStatus>("all");
  const [authorFilter, setAuthorFilter] = React.useState<string>("all");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [sortKey, setSortKey] = React.useState<SortKey>("updated");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc");
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const rows = React.useMemo(() => {
    let list = state.posts.map((p) => ({ ...p, eff: effectiveStatus(p.status, p.publishedAt) }));
    if (scope !== "all") list = list.filter((p) => p.eff === scope);
    else list = list.filter((p) => p.eff !== "trash");
    if (statusFilter !== "all") list = list.filter((p) => p.eff === statusFilter);
    if (authorFilter !== "all") list = list.filter((p) => p.authorId === authorFilter);
    if (categoryFilter !== "all")
      list = list.filter(
        (p) => p.categoryId === categoryFilter || p.secondaryCategoryId === categoryFilter,
      );
    if (q.trim()) {
      const t = q.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(t) || p.slug.includes(t));
    }
    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "title") cmp = a.title.localeCompare(b.title);
      else if (sortKey === "status") cmp = a.eff.localeCompare(b.eff);
      else if (sortKey === "date")
        cmp = (a.publishedAt ?? a.createdAt).localeCompare(b.publishedAt ?? b.createdAt);
      else cmp = a.updatedAt.localeCompare(b.updatedAt);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [state.posts, scope, statusFilter, authorFilter, categoryFilter, q, sortKey, sortDir]);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = page > pageCount ? 1 : page;
  const pageRows = rows.slice((current - 1) * pageSize, current * pageSize);

  React.useEffect(() => setPage(1), [scope, statusFilter, authorFilter, categoryFilter, q]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function toggleRow(id: string) {
    setSelected((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }
  const allOnPageSelected = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id));

  function bulk(action: "trash" | "restore" | "delete") {
    selected.forEach((id) => {
      if (action === "trash") dispatch({ type: "post/status", id, status: "trash" });
      if (action === "restore") dispatch({ type: "post/status", id, status: "draft" });
      if (action === "delete") dispatch({ type: "post/delete", id });
    });
    toast.success(`${selected.size} post${selected.size > 1 ? "s" : ""} ${action === "delete" ? "deleted" : action === "trash" ? "moved to trash" : "restored"}`);
    setSelected(new Set());
  }

  function rowAction(post: Post, action: "edit" | "preview" | "duplicate" | "trash" | "restore" | "delete") {
    switch (action) {
      case "edit":
        navigate(`/posts/${post.id}/edit`);
        break;
      case "preview":
        navigate(`/posts/${post.id}/preview`);
        break;
      case "duplicate":
        dispatch({ type: "post/duplicate", id: post.id });
        toast.success("Post duplicated as a draft");
        break;
      case "trash":
        dispatch({ type: "post/status", id: post.id, status: "trash" });
        toast("Moved to trash", { description: post.title });
        break;
      case "restore":
        dispatch({ type: "post/status", id: post.id, status: "draft" });
        toast.success("Restored as draft");
        break;
      case "delete":
        dispatch({ type: "post/delete", id: post.id });
        toast.success("Post permanently deleted");
        break;
    }
  }

  const inTrash = scope === "trash";

  return (
    <div className="space-y-4">
      {!compact ? (
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search posts..."
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {scope === "all" ? (
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as PostStatus | "all")}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            ) : null}
            <Select value={authorFilter} onValueChange={setAuthorFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All authors</SelectItem>
                {authors.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ) : null}

      {selected.size > 0 ? (
        <div className="flex items-center gap-3 rounded-md border border-border bg-muted/40 px-3 py-2 text-sm">
          <span className="font-medium">{selected.size} selected</span>
          {inTrash ? (
            <>
              <Button size="sm" variant="outline" onClick={() => bulk("restore")}>
                <RotateCcw /> Restore
              </Button>
              <Button size="sm" variant="destructive" onClick={() => bulk("delete")}>
                <Trash2 /> Delete permanently
              </Button>
            </>
          ) : (
            <Button size="sm" variant="destructive" onClick={() => bulk("trash")}>
              <Trash2 /> Move to trash
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={() => setSelected(new Set())}>
            Clear
          </Button>
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-10">
                <Checkbox
                  checked={allOnPageSelected}
                  onCheckedChange={(v) => {
                    setSelected((s) => {
                      const n = new Set(s);
                      pageRows.forEach((r) => (v ? n.add(r.id) : n.delete(r.id)));
                      return n;
                    });
                  }}
                  aria-label="Select all"
                />
              </TableHead>
              {!compact ? <TableHead className="w-16">Image</TableHead> : null}
              <TableHead>
                <button className="inline-flex items-center gap-1 hover:text-foreground" onClick={() => toggleSort("title")}>
                  Title <ArrowUpDown className="h-3 w-3" />
                </button>
              </TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>
                <button className="inline-flex items-center gap-1 hover:text-foreground" onClick={() => toggleSort("status")}>
                  Status <ArrowUpDown className="h-3 w-3" />
                </button>
              </TableHead>
              <TableHead>
                <button className="inline-flex items-center gap-1 hover:text-foreground" onClick={() => toggleSort("date")}>
                  Date <ArrowUpDown className="h-3 w-3" />
                </button>
              </TableHead>
              {!compact ? <TableHead>Updated</TableHead> : null}
              <TableHead className="w-10 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRows.map((post) => {
              const cat = categories.find((c) => c.id === post.categoryId);
              return (
                <TableRow key={post.id} data-state={selected.has(post.id) ? "selected" : undefined}>
                  <TableCell>
                    <Checkbox
                      checked={selected.has(post.id)}
                      onCheckedChange={() => toggleRow(post.id)}
                      aria-label={`Select ${post.title}`}
                    />
                  </TableCell>
                  {!compact ? (
                    <TableCell>
                      <Thumb mediaId={post.featuredImageId} />
                    </TableCell>
                  ) : null}
                  <TableCell className="max-w-[280px]">
                    <Link
                      href={`/posts/${post.id}/edit`}
                      className="font-medium text-foreground hover:text-primary hover:underline"
                    >
                      {post.title || "(untitled)"}
                    </Link>
                    <p className="truncate text-xs text-muted-foreground">/{post.slug}</p>
                  </TableCell>
                  <TableCell>
                    <AuthorCell authorId={post.authorId} />
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{cat?.name ?? "—"}</span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={post.status} publishedAt={post.publishedAt} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {formatDate(post.publishedAt ?? post.createdAt)}
                  </TableCell>
                  {!compact ? (
                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {relativeTime(post.updatedAt)}
                    </TableCell>
                  ) : null}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem onClick={() => rowAction(post, "edit")}>
                          <Pencil /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => rowAction(post, "preview")}>
                          <Eye /> Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => rowAction(post, "duplicate")}>
                          <Copy /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {inTrash ? (
                          <>
                            <DropdownMenuItem onClick={() => rowAction(post, "restore")}>
                              <RotateCcw /> Restore
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => rowAction(post, "delete")}
                            >
                              <Trash2 /> Delete permanently
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => rowAction(post, "trash")}
                          >
                            <Trash2 /> Move to trash
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
            {pageRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={compact ? 6 : 9} className="p-0">
                  <EmptyState
                    icon={FileText}
                    title="No posts found"
                    description={q ? "Try a different search or clear the filters." : "Create your first post to get started."}
                  />
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>

      {!compact && pageCount > 1 ? (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                size="sm"
                disabled={current === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
            </PaginationItem>
            <PaginationItem>
              <span className="px-3 text-sm text-muted-foreground">
                Page {current} of {pageCount}
              </span>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="outline"
                size="sm"
                disabled={current === pageCount}
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              >
                Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  );
}
