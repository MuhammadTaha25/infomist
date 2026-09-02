import * as React from "react";
import {
  ChevronDown,
  Check,
  AlertTriangle,
  Plus,
  X,
  ImagePlus,
  Replace,
  Trash2,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Post, PostStatus } from "../types";
import {
  useAuthors,
  useCategories,
  useTags,
  useMediaItem,
  useBlogging,
  uid,
  slugify,
} from "../store";
import { stripHtml } from "../utils/format";
import { MediaPickerDialog } from "./MediaPickerDialog";
import { AuthorFormDialog } from "./AuthorFormDialog";

export function PostSettingsPanel({
  post,
  onChange,
}: {
  post: Post;
  onChange: (patch: Partial<Post>) => void;
}) {
  const authors = useAuthors();
  const categories = useCategories();
  const tags = useTags();
  const { dispatch } = useBlogging();
  const featured = useMediaItem(post.featuredImageId);

  const [authorDialog, setAuthorDialog] = React.useState(false);
  const [featuredPicker, setFeaturedPicker] = React.useState(false);
  const [tagOpen, setTagOpen] = React.useState(false);

  const postTags = post.tagIds.map((id) => tags.find((t) => t.id === id)).filter(Boolean);
  const contentHtml = post.blocks.map((b) => b.html ?? "").join(" ");
  const hasInternal = /data-internal="true"/.test(contentHtml);
  const hasExternal = /data-external="true"/.test(contentHtml);

  const checklist = [
    { ok: !!post.seo.focusKeyword && post.title.toLowerCase().includes(post.seo.focusKeyword.toLowerCase()), label: "Keyword in title" },
    { ok: !!post.seo.focusKeyword && post.slug.includes(slugify(post.seo.focusKeyword)), label: "Keyword in URL" },
    { ok: post.seo.description.length >= 50, label: "Meta description (50+ chars)" },
    { ok: !!post.featuredImageId, label: "Featured image set" },
    { ok: hasInternal, label: "Internal link" },
    { ok: hasExternal, label: "External link" },
  ];

  function addTag(name: string) {
    const clean = name.trim();
    if (!clean) return;
    let tag = tags.find((t) => t.name.toLowerCase() === clean.toLowerCase());
    if (!tag) {
      tag = { id: uid("tag"), name: clean, slug: slugify(clean) };
      dispatch({ type: "tag/create", tag });
    }
    if (!post.tagIds.includes(tag.id)) onChange({ tagIds: [...post.tagIds, tag.id] });
  }

  return (
    <div className="divide-y divide-border">
      <Section title="Status &amp; visibility" defaultOpen>
        <Row label="Status">
          <Select value={post.status} onValueChange={(v) => onChange({ status: v as PostStatus })}>
            <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </Row>
        <Row label="Visibility">
          <Select value={post.visibility} onValueChange={(v) => onChange({ visibility: v as "public" | "private" })}>
            <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
        </Row>
        <Row label="Publish date">
          <Input
            type="datetime-local"
            className="h-8"
            value={toLocalInput(post.publishedAt)}
            onChange={(e) => onChange({ publishedAt: e.target.value ? new Date(e.target.value).toISOString() : null })}
          />
        </Row>
        <p className="pt-1 text-xs text-muted-foreground">
          A future publish date with status “Published” shows as <strong>Scheduled</strong> everywhere.
        </p>
      </Section>

      <Section title="Author" defaultOpen>
        <Select value={post.authorId} onValueChange={(v) => onChange({ authorId: v })}>
          <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
          <SelectContent>
            {authors.map((a) => (
              <SelectItem key={a.id} value={a.id}>
                {a.displayName} · {a.role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button size="sm" variant="ghost" className="mt-2 h-7 px-1 text-xs" onClick={() => setAuthorDialog(true)}>
          <Plus className="h-3.5 w-3.5" /> Add Author
        </Button>
        <AuthorFormDialog
          open={authorDialog}
          onOpenChange={setAuthorDialog}
          onSaved={(id) => onChange({ authorId: id })}
        />
      </Section>

      <Section title="Categories" defaultOpen>
        <Row label="Primary">
          <Select
            value={post.categoryId ?? "none"}
            onValueChange={(v) => onChange({ categoryId: v === "none" ? null : v })}
          >
            <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Row>
        <Row label="Secondary">
          <Select
            value={post.secondaryCategoryId ?? "none"}
            onValueChange={(v) => onChange({ secondaryCategoryId: v === "none" ? null : v })}
          >
            <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {categories.filter((c) => c.id !== post.categoryId).map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Row>
      </Section>

      <Section title="Tags" defaultOpen>
        <div className="flex flex-wrap gap-1.5">
          {postTags.map((t) => (
            <Badge key={t!.id} variant="secondary" className="gap-1">
              {t!.name}
              <button
                onClick={() => onChange({ tagIds: post.tagIds.filter((id) => id !== t!.id) })}
                aria-label={`Remove ${t!.name}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <Popover open={tagOpen} onOpenChange={setTagOpen}>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline" className="mt-2 h-7">
              <Plus className="h-3.5 w-3.5" /> Add tag
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0" align="start">
            <Command>
              <CommandInput
                placeholder="Search or create…"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTag((e.target as HTMLInputElement).value);
                    setTagOpen(false);
                  }
                }}
              />
              <CommandList>
                <CommandEmpty className="p-2 text-xs text-muted-foreground">Press Enter to create</CommandEmpty>
                <CommandGroup>
                  {tags
                    .filter((t) => !post.tagIds.includes(t.id))
                    .map((t) => (
                      <CommandItem
                        key={t.id}
                        onSelect={() => {
                          onChange({ tagIds: [...post.tagIds, t.id] });
                          setTagOpen(false);
                        }}
                      >
                        {t.name}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </Section>

      <Section title="Featured image" defaultOpen>
        {featured?.url ? (
          <div className="space-y-2">
            <img src={featured.url} alt={featured.alt} className="w-full rounded-md border border-border object-cover" />
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setFeaturedPicker(true)}>
                <Replace className="h-3.5 w-3.5" /> Replace
              </Button>
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => onChange({ featuredImageId: null })}>
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="outline" className="w-full" onClick={() => setFeaturedPicker(true)}>
            <ImagePlus className="h-4 w-4" /> Select image
          </Button>
        )}
        <p className="pt-1 text-[11px] text-muted-foreground">
          Distinct from images inside the article — used on listings, previews, and social cards.
        </p>
        <MediaPickerDialog
          open={featuredPicker}
          onOpenChange={setFeaturedPicker}
          onSelect={(ids) => onChange({ featuredImageId: ids[0] ?? null })}
        />
      </Section>

      <Section title="Excerpt">
        <Textarea
          value={post.excerpt}
          onChange={(e) => onChange({ excerpt: e.target.value })}
          placeholder="Write a short summary of this article…"
          className="min-h-[90px] text-sm"
          maxLength={320}
        />
        <p className="pt-1 text-right text-[11px] text-muted-foreground">{post.excerpt.length}/320</p>
      </Section>

      <Section title="Slug">
        <div className="flex items-center gap-1 rounded-md border border-border px-2 text-sm">
          <span className="text-muted-foreground">/blog/</span>
          <input
            value={post.slug}
            onChange={(e) => onChange({ slug: slugify(e.target.value) })}
            className="min-w-0 flex-1 bg-transparent py-1.5 outline-none"
          />
        </div>
        <p className="pt-1 text-[11px] text-muted-foreground">{post.slug.length} characters</p>
      </Section>

      <Section title="SEO">
        <Row label="SEO title">
          <Input
            className="h-8"
            value={post.seo.title}
            onChange={(e) => onChange({ seo: { ...post.seo, title: e.target.value } })}
            placeholder={post.title}
          />
        </Row>
        <Row label="Meta description">
          <Textarea
            className="min-h-[64px] text-sm"
            value={post.seo.description}
            onChange={(e) => onChange({ seo: { ...post.seo, description: e.target.value } })}
            maxLength={165}
          />
        </Row>
        <Row label="Focus keyword">
          <Input
            className="h-8"
            value={post.seo.focusKeyword}
            onChange={(e) => onChange({ seo: { ...post.seo, focusKeyword: e.target.value } })}
          />
        </Row>
        <Row label="Canonical URL">
          <Input
            className="h-8"
            value={post.seo.canonical}
            onChange={(e) => onChange({ seo: { ...post.seo, canonical: e.target.value } })}
            placeholder="https://…"
          />
        </Row>

        <div className="mt-3 rounded-md border border-border p-3">
          <p className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            <Search className="h-3 w-3" /> Search preview
          </p>
          <p className="line-clamp-1 text-[15px] text-[#1a0dab]">{post.seo.title || post.title || "Untitled"}</p>
          <p className="text-xs text-[#006621]">
            example.com/blog/{(post.slug || "post").slice(0, 40)}
          </p>
          <p className="line-clamp-2 text-xs text-[#4d5156]">
            {post.seo.description || post.excerpt || stripHtml(post.blocks.find((b) => b.type === "paragraph")?.html) || "Add a meta description to control this snippet."}
          </p>
        </div>

        <ul className="mt-3 space-y-1.5">
          {checklist.map((c) => (
            <li key={c.label} className="flex items-center gap-2 text-xs">
              {c.ok ? (
                <Check className="h-3.5 w-3.5 text-accent" />
              ) : (
                <AlertTriangle className="h-3.5 w-3.5 text-chart-5" />
              )}
              <span className={cn(c.ok ? "text-foreground" : "text-muted-foreground")}>{c.label}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Discussion">
        <label className="flex items-center justify-between text-sm">
          Allow comments
          <Switch checked={post.allowComments} onCheckedChange={(v) => onChange({ allowComments: v })} />
        </label>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="px-4 py-3">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-1 text-sm font-medium text-foreground">
        <span dangerouslySetInnerHTML={{ __html: title }} />
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2.5 pt-2">{children}</CollapsibleContent>
    </Collapsible>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function toLocalInput(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
