import * as React from "react";
import { Plus, Pencil, Trash2, Search, CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import type { Category } from "../types";
import { useCategories, usePosts, useBlogging, uid, slugify } from "../store";
import { PageHeader } from "../components/common";
import { effectiveStatus } from "../utils/format";

const EMPTY = (): Category => ({ id: "", name: "", slug: "", description: "", parentId: null });

export function CategoriesPage() {
  const categories = useCategories();
  const posts = usePosts();
  const { dispatch } = useBlogging();
  const [q, setQ] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<Category>(EMPTY());

  const count = (id: string) =>
    posts.filter(
      (p) =>
        (p.categoryId === id || p.secondaryCategoryId === id) &&
        effectiveStatus(p.status, p.publishedAt) !== "trash",
    ).length;

  const roots = categories.filter((c) => !c.parentId);
  const childrenOf = (id: string) => categories.filter((c) => c.parentId === id);

  const ordered: Category[] = [];
  roots.forEach((r) => {
    ordered.push(r);
    childrenOf(r.id).forEach((c) => ordered.push(c));
  });
  const filtered = q ? categories.filter((c) => c.name.toLowerCase().includes(q.toLowerCase())) : ordered;

  function save() {
    if (!form.name.trim()) {
      toast.error("Name required");
      return;
    }
    const final: Category = { ...form, id: form.id || uid("cat"), slug: form.slug || slugify(form.name) };
    if (form.id) dispatch({ type: "category/update", id: final.id, patch: final });
    else dispatch({ type: "category/create", category: final });
    toast.success(form.id ? "Category updated" : "Category created");
    setOpen(false);
  }

  return (
    <>
      <PageHeader title="Categories" description="Content topics. Posts reference categories by ID.">
        <Button
          onClick={() => {
            setForm(EMPTY());
            setOpen(true);
          }}
        >
          <Plus /> Add Category
        </Button>
      </PageHeader>

      <div className="relative w-full max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search categories..." className="pl-9" />
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Posts</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <TableRow key={c.id}>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {c.parentId ? <CornerDownRight className="h-3.5 w-3.5 text-muted-foreground" /> : null}
                    <span className="font-medium">{c.name}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{c.slug}</TableCell>
                <TableCell className="max-w-xs truncate text-sm text-muted-foreground">{c.description}</TableCell>
                <TableCell className="text-right tabular-nums">{count(c.id)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => {
                        setForm({ ...c });
                        setOpen(true);
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive"
                      onClick={() => {
                        dispatch({ type: "category/delete", id: c.id });
                        toast.success("Category deleted — posts kept, category cleared");
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit category" : "Add category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Field label="Name">
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value, slug: f.slug || slugify(e.target.value) }))}
              />
            </Field>
            <Field label="Slug">
              <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))} />
            </Field>
            <Field label="Description">
              <Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </Field>
            <Field label="Parent category">
              <Select
                value={form.parentId ?? "none"}
                onValueChange={(v) => setForm((f) => ({ ...f, parentId: v === "none" ? null : v }))}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (top level)</SelectItem>
                  {categories
                    .filter((c) => c.id !== form.id && !c.parentId)
                    .map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
