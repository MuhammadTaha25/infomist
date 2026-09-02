import * as React from "react";
import { Plus, Trash2, Search, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { useTags, usePosts, useBlogging, uid, slugify } from "../store";
import { PageHeader } from "../components/common";
import { effectiveStatus } from "../utils/format";

export function TagsPage() {
  const tags = useTags();
  const posts = usePosts();
  const { dispatch } = useBlogging();
  const [q, setQ] = React.useState("");
  const [name, setName] = React.useState("");

  const count = (id: string) =>
    posts.filter((p) => p.tagIds.includes(id) && effectiveStatus(p.status, p.publishedAt) !== "trash").length;

  const filtered = q ? tags.filter((t) => t.name.toLowerCase().includes(q.toLowerCase())) : tags;

  function add() {
    const clean = name.trim();
    if (!clean) return;
    if (tags.some((t) => t.name.toLowerCase() === clean.toLowerCase())) {
      toast.error("Tag already exists");
      return;
    }
    dispatch({ type: "tag/create", tag: { id: uid("tag"), name: clean, slug: slugify(clean) } });
    setName("");
    toast.success("Tag created");
  }

  return (
    <>
      <PageHeader title="Tags" description="Lightweight labels. Posts reference tags by ID." />

      <div className="flex flex-col gap-4 lg:flex-row">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            add();
          }}
          className="w-full space-y-2 rounded-lg border border-border p-4 lg:max-w-xs"
        >
          <p className="text-sm font-medium">Add new tag</p>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tag name" />
          <Button type="submit" size="sm" className="w-full">
            <Plus className="h-4 w-4" /> Add tag
          </Button>
        </form>

        <div className="flex-1 space-y-3">
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tags..." className="pl-9" />
          </div>
          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead className="text-right">Posts</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <Input
                        defaultValue={t.name}
                        onBlur={(e) => {
                          const v = e.target.value.trim();
                          if (v && v !== t.name)
                            dispatch({ type: "tag/update", id: t.id, patch: { name: v, slug: slugify(v) } });
                        }}
                        className="h-8 border-0 bg-transparent px-0 font-medium focus-visible:bg-background focus-visible:px-2"
                      />
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{t.slug}</TableCell>
                    <TableCell className="text-right tabular-nums">{count(t.id)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={() => {
                          dispatch({ type: "tag/delete", id: t.id });
                          toast.success("Tag deleted");
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
