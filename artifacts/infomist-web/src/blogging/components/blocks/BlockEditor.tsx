import * as React from "react";
import { ImagePlus, Replace, X, Plus, Trash2, Rows3, Columns3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { Block, CalloutKind, Alignment } from "../../types";
import { useMediaItem } from "../../store";
import { uid } from "../../utils/format";
import { RichText } from "../RichText";
import { MediaPickerDialog } from "../MediaPickerDialog";
import { youtubeId } from "./BlockView";

type Patch = (patch: Partial<Block>) => void;

const ALIGNMENTS: Alignment[] = ["left", "center", "right", "wide", "full"];

export function BlockEditor({
  block,
  onChange,
  selected,
}: {
  block: Block;
  onChange: Patch;
  selected: boolean;
}) {
  switch (block.type) {
    case "paragraph":
      return (
        <RichText
          value={block.html ?? ""}
          onChange={(html) => onChange({ html })}
          placeholder="Write a paragraph…"
          ariaLabel="Paragraph"
        />
      );
    case "heading":
      return (
        <div className="space-y-2">
          <RichText
            value={block.html ?? ""}
            onChange={(html) => onChange({ html })}
            placeholder={`Heading ${block.level ?? 2}`}
            singleLine
            toolbar={false}
            ariaLabel="Heading text"
            className={cn(
              "[&_[role=textbox]]:font-semibold [&_[role=textbox]]:tracking-tight",
              block.level === 4
                ? "[&_[role=textbox]]:text-lg"
                : block.level === 3
                  ? "[&_[role=textbox]]:text-xl"
                  : "[&_[role=textbox]]:text-2xl",
            )}
          />
          {selected ? (
            <div className="flex items-center gap-2">
              <Label className="text-xs text-muted-foreground">Level</Label>
              <Select value={String(block.level ?? 2)} onValueChange={(v) => onChange({ level: Number(v) as 2 | 3 | 4 })}>
                <SelectTrigger className="h-7 w-20 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">H2</SelectItem>
                  <SelectItem value="3">H3</SelectItem>
                  <SelectItem value="4">H4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : null}
        </div>
      );
    case "list":
      return (
        <div className="space-y-2">
          <div
            className={cn(
              "rich-list",
              block.ordered ? "[&_ol]:list-decimal" : "[&_ul]:list-disc",
              "[&_[role=textbox]]:pl-5",
            )}
          >
            <ListEditor block={block} onChange={onChange} />
          </div>
          {selected ? (
            <div className="flex items-center gap-2 text-xs">
              <Button
                size="sm"
                variant={block.ordered ? "outline" : "secondary"}
                className="h-7"
                onClick={() => onChange({ ordered: false })}
              >
                Bulleted
              </Button>
              <Button
                size="sm"
                variant={block.ordered ? "secondary" : "outline"}
                className="h-7"
                onClick={() => onChange({ ordered: true })}
              >
                Numbered
              </Button>
            </div>
          ) : null}
        </div>
      );
    case "quote":
      return (
        <div className="space-y-2 border-l-2 border-primary pl-4">
          <RichText
            value={block.html ?? ""}
            onChange={(html) => onChange({ html })}
            placeholder="Quote…"
            ariaLabel="Quote"
            className="[&_[role=textbox]]:text-lg [&_[role=textbox]]:italic"
          />
          <Input
            value={block.citation ?? ""}
            onChange={(e) => onChange({ citation: e.target.value })}
            placeholder="Citation (optional)"
            className="h-8 border-0 bg-transparent px-0 text-sm text-muted-foreground focus-visible:ring-0"
          />
        </div>
      );
    case "code":
      return (
        <div className="space-y-2">
          {selected ? (
            <Select value={block.language ?? "typescript"} onValueChange={(v) => onChange({ language: v })}>
              <SelectTrigger className="h-7 w-40 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["typescript", "javascript", "python", "bash", "json", "html", "css", "sql", "go", "rust", "plaintext"].map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null}
          <Textarea
            value={block.code ?? ""}
            onChange={(e) => onChange({ code: e.target.value })}
            placeholder="Paste code…"
            spellCheck={false}
            className="min-h-[120px] rounded-lg border-border bg-[#0F172A] font-mono text-sm text-slate-100"
          />
        </div>
      );
    case "image":
      return <ImageEditor block={block} onChange={onChange} selected={selected} />;
    case "gallery":
      return <GalleryEditor block={block} onChange={onChange} selected={selected} />;
    case "video":
    case "audio":
      return <MediaEditor block={block} onChange={onChange} selected={selected} kind={block.type} />;
    case "file":
      return <FileEditor block={block} onChange={onChange} />;
    case "embed":
      return <EmbedEditor block={block} onChange={onChange} />;
    case "button":
      return <ButtonEditor block={block} onChange={onChange} />;
    case "separator":
      return <hr className="border-border" />;
    case "spacer":
      return (
        <div className="rounded-md border border-dashed border-border bg-muted/40 p-3">
          <div className="flex items-center gap-3">
            <Label className="text-xs text-muted-foreground">Height</Label>
            <Slider
              value={[block.spacerHeight ?? 48]}
              min={8}
              max={200}
              step={4}
              onValueChange={([v]) => onChange({ spacerHeight: v })}
              className="max-w-xs"
            />
            <span className="text-xs tabular-nums text-muted-foreground">{block.spacerHeight ?? 48}px</span>
          </div>
        </div>
      );
    case "cover":
      return <CoverEditor block={block} onChange={onChange} />;
    case "table":
      return <TableEditor block={block} onChange={onChange} selected={selected} />;
    case "faq":
      return <FaqEditor block={block} onChange={onChange} />;
    case "callout":
      return <CalloutEditor block={block} onChange={onChange} />;
    case "readmore":
      return (
        <div className="relative py-2 text-center">
          <Input
            value={block.label ?? "Read more"}
            onChange={(e) => onChange({ label: e.target.value })}
            className="mx-auto h-7 max-w-[180px] border-0 bg-transparent text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground focus-visible:ring-0"
          />
          <span className="absolute left-0 top-1/2 -z-10 h-px w-full -translate-y-1/2 bg-border" />
        </div>
      );
    case "toc":
      return (
        <div className="rounded-lg border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          Table of Contents — auto-generated from the headings in this post when previewed / published.
        </div>
      );
    case "columns":
    case "group":
      return (
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          {block.type === "columns" ? (
            <ColumnsHint block={block} onChange={onChange} />
          ) : (
            "Group container — nested blocks are edited in the full builder."
          )}
        </div>
      );
    default:
      return null;
  }
}

/* ── List editor (contentEditable <ul>/<ol>) ───────────────────────────── */

function ListEditor({ block, onChange }: { block: Block; onChange: Patch }) {
  const ref = React.useRef<HTMLElement>(null);
  const Tag = (block.ordered ? "ol" : "ul") as "ol" | "ul";
  React.useEffect(() => {
    if (ref.current && ref.current.innerHTML !== (block.html ?? "")) {
      ref.current.innerHTML = block.html || "<li></li>";
    }
  }, [block.html, block.ordered]);
  return React.createElement(Tag, {
    ref: ref as React.Ref<HTMLOListElement>,
    role: "textbox",
    "aria-multiline": true,
    "aria-label": "List items",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onInput: () => ref.current && onChange({ html: ref.current.innerHTML }),
    onBlur: () => ref.current && onChange({ html: ref.current.innerHTML }),
    className: cn(
      "min-h-[2rem] rounded-md border border-transparent px-1 py-1 pl-6 outline-none focus:border-border",
      block.ordered ? "list-decimal" : "list-disc",
      "[&_li]:leading-7",
    ),
  });
}

function ColumnsHint({ block, onChange }: { block: Block; onChange: Patch }) {
  const count = block.children?.length ?? 2;
  return (
    <div className="flex items-center gap-3">
      <span>Columns layout — {count} columns.</span>
      <Button
        size="sm"
        variant="outline"
        className="h-7"
        onClick={() => onChange({ children: Array.from({ length: Math.min(4, count + 1) }, (_, i) => block.children?.[i] ?? []) })}
      >
        <Plus className="h-3 w-3" /> Add column
      </Button>
      {count > 1 ? (
        <Button
          size="sm"
          variant="outline"
          className="h-7"
          onClick={() => onChange({ children: (block.children ?? []).slice(0, count - 1) })}
        >
          <X className="h-3 w-3" /> Remove
        </Button>
      ) : null}
    </div>
  );
}

/* ── Image ─────────────────────────────────────────────────────────────── */

function ImageEditor({ block, onChange, selected }: { block: Block; onChange: Patch; selected: boolean }) {
  const [open, setOpen] = React.useState(false);
  const media = useMediaItem(block.image?.mediaId ?? null);
  const img = block.image!;
  const set = (patch: Partial<typeof img>) => onChange({ image: { ...img, ...patch } });

  return (
    <div className="space-y-3">
      {media?.url ? (
        <div className={cn("overflow-hidden rounded-lg border border-border", widthWrap(img.align))}>
          <img src={media.url} alt={img.alt} className="w-full object-cover" style={{ width: img.width || "100%" }} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 rounded-lg border border-dashed border-border bg-muted/40 p-8 sm:grid-cols-3">
          <div className="col-span-full mb-1 text-center text-sm font-medium text-foreground">Image block</div>
          <Button variant="outline" onClick={() => setOpen(true)}>
            <ImagePlus className="h-4 w-4" /> Upload / Library
          </Button>
          <Button variant="outline" onClick={() => setOpen(true)}>
            Media Library
          </Button>
          <Button variant="outline" onClick={() => setOpen(true)}>
            Insert from URL
          </Button>
        </div>
      )}

      {media?.url && selected ? (
        <div className="grid gap-3 rounded-lg border border-border bg-muted/30 p-3 sm:grid-cols-2">
          <p className="col-span-full text-xs font-semibold uppercase tracking-wide text-muted-foreground">Image settings</p>
          <Field label="Alt text">
            <Input value={img.alt} onChange={(e) => set({ alt: e.target.value })} placeholder="Describe the image" />
          </Field>
          <Field label="Caption">
            <Input value={img.caption} onChange={(e) => set({ caption: e.target.value })} placeholder="Optional caption" />
          </Field>
          <Field label="Alignment">
            <Select value={img.align} onValueChange={(v) => set({ align: v as Alignment })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {ALIGNMENTS.map((a) => (
                  <SelectItem key={a} value={a} className="capitalize">
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Width">
              <Input value={img.width} onChange={(e) => set({ width: e.target.value })} placeholder="100% or 640" />
            </Field>
            <Field label="Height">
              <Input value={img.height} onChange={(e) => set({ height: e.target.value })} placeholder="auto" />
            </Field>
          </div>
          <Field label="Image link (URL)">
            <Input value={img.href} onChange={(e) => set({ href: e.target.value })} placeholder="https://…" />
          </Field>
          <label className="flex items-center gap-2 self-end text-sm">
            <Switch checked={img.linkNewTab} onCheckedChange={(v) => set({ linkNewTab: v })} /> Open link in new tab
          </label>
          <div className="col-span-full flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
              <Replace className="h-4 w-4" /> Replace image
            </Button>
            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => set({ mediaId: null })}>
              <Trash2 className="h-4 w-4" /> Remove image
            </Button>
          </div>
        </div>
      ) : null}

      <MediaPickerDialog
        open={open}
        onOpenChange={setOpen}
        onSelect={(ids) => set({ mediaId: ids[0] ?? null })}
      />
    </div>
  );
}

function widthWrap(align: Alignment) {
  if (align === "left") return "mr-auto max-w-md";
  if (align === "right") return "ml-auto max-w-md";
  if (align === "center") return "mx-auto max-w-xl";
  return "mx-auto";
}

/* ── Gallery ───────────────────────────────────────────────────────────── */

function GalleryEditor({ block, onChange, selected }: { block: Block; onChange: Patch; selected: boolean }) {
  const [open, setOpen] = React.useState(false);
  const g = block.gallery!;
  const set = (patch: Partial<typeof g>) => onChange({ gallery: { ...g, ...patch } });

  return (
    <div className="space-y-3">
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.max(1, g.columns)}, minmax(0,1fr))` }}>
        {g.mediaIds.map((id) => (
          <GalleryThumb key={id} id={id} onRemove={() => set({ mediaIds: g.mediaIds.filter((x) => x !== id) })} />
        ))}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex aspect-square items-center justify-center rounded-md border-2 border-dashed border-border text-muted-foreground hover:border-primary-border"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {selected ? (
        <div className="grid gap-3 rounded-lg border border-border bg-muted/30 p-3 sm:grid-cols-3">
          <p className="col-span-full text-xs font-semibold uppercase tracking-wide text-muted-foreground">Gallery settings</p>
          <Field label="Columns">
            <Select value={String(g.columns)} onValueChange={(v) => set({ columns: Number(v) })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((n) => (
                  <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Link to">
            <Select value={g.linkTo} onValueChange={(v) => set({ linkTo: v as "none" | "media" })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="media">Media file</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Alignment">
            <Select value={g.align} onValueChange={(v) => set({ align: v as Alignment })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {ALIGNMENTS.map((a) => (
                  <SelectItem key={a} value={a} className="capitalize">{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <label className="flex items-center gap-2 text-sm"><Switch checked={g.crop} onCheckedChange={(v) => set({ crop: v })} /> Crop to square</label>
          <label className="flex items-center gap-2 text-sm"><Switch checked={g.captions} onCheckedChange={(v) => set({ captions: v })} /> Show captions</label>
          <label className="flex items-center gap-2 text-sm"><Switch checked={g.lightbox} onCheckedChange={(v) => set({ lightbox: v })} /> Lightbox</label>
        </div>
      ) : null}

      <MediaPickerDialog
        open={open}
        onOpenChange={setOpen}
        multiple
        onSelect={(ids) => set({ mediaIds: [...g.mediaIds, ...ids.filter((i) => !g.mediaIds.includes(i))] })}
      />
    </div>
  );
}

function GalleryThumb({ id, onRemove }: { id: string; onRemove: () => void }) {
  const media = useMediaItem(id);
  return (
    <div className="group relative aspect-square overflow-hidden rounded-md border border-border bg-muted">
      {media?.url ? <img src={media.url} alt={media.alt} className="h-full w-full object-cover" /> : null}
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-1 top-1 hidden rounded-full bg-background/90 p-1 text-destructive group-hover:block"
        aria-label="Remove"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

/* ── Video / Audio ─────────────────────────────────────────────────────── */

function MediaEditor({
  block,
  onChange,
  selected,
  kind,
}: {
  block: Block;
  onChange: Patch;
  selected: boolean;
  kind: "video" | "audio";
}) {
  const [open, setOpen] = React.useState(false);
  const m = block.media!;
  const media = useMediaItem(m.mediaId ?? null);
  const set = (patch: Partial<typeof m>) => onChange({ media: { ...m, ...patch } });
  const src = media?.url || m.url;

  return (
    <div className="space-y-3">
      {src ? (
        kind === "video" ? (
          <video src={src} controls className="w-full rounded-lg border border-border bg-black" />
        ) : (
          <audio src={src} controls className="w-full" />
        )
      ) : (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 p-6">
          <span className="w-full text-center text-sm font-medium capitalize">{kind} block</span>
          <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Upload</Button>
          <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Media Library</Button>
          <Input
            placeholder="…or paste a URL"
            className="h-8 flex-1"
            onChange={(e) => set({ url: e.target.value })}
          />
        </div>
      )}

      {src && selected ? (
        <div className="grid gap-3 rounded-lg border border-border bg-muted/30 p-3 sm:grid-cols-2">
          <Field label="Title">
            <Input value={m.title ?? ""} onChange={(e) => set({ title: e.target.value })} />
          </Field>
          <Field label="Caption">
            <Input value={m.caption ?? ""} onChange={(e) => set({ caption: e.target.value })} />
          </Field>
          {kind === "video" ? (
            <Field label="Poster image URL">
              <Input value={m.poster ?? ""} onChange={(e) => set({ poster: e.target.value })} />
            </Field>
          ) : null}
          <div className="col-span-full flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm"><Switch checked={m.controls} onCheckedChange={(v) => set({ controls: v })} /> Controls</label>
            <label className="flex items-center gap-2 text-sm"><Switch checked={m.autoplay} onCheckedChange={(v) => set({ autoplay: v })} /> Autoplay</label>
            <label className="flex items-center gap-2 text-sm"><Switch checked={m.loop} onCheckedChange={(v) => set({ loop: v })} /> Loop</label>
            <label className="flex items-center gap-2 text-sm"><Switch checked={m.muted} onCheckedChange={(v) => set({ muted: v })} /> Muted</label>
          </div>
          <div className="col-span-full">
            <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
              <Replace className="h-4 w-4" /> Replace
            </Button>
          </div>
        </div>
      ) : null}

      <MediaPickerDialog open={open} onOpenChange={setOpen} accept={kind} onSelect={(ids) => set({ mediaId: ids[0] ?? null })} />
    </div>
  );
}

function FileEditor({ block, onChange }: { block: Block; onChange: Patch }) {
  const [open, setOpen] = React.useState(false);
  const media = useMediaItem(block.file?.mediaId ?? null);
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
        <span className="text-sm font-medium">{media?.filename || "No file selected"}</span>
        <Button size="sm" variant="outline" className="ml-auto" onClick={() => setOpen(true)}>
          Choose file
        </Button>
      </div>
      <Input
        value={block.file?.label ?? ""}
        onChange={(e) => onChange({ file: { mediaId: block.file?.mediaId ?? null, label: e.target.value } })}
        placeholder="Download label (optional)"
        className="h-8"
      />
      <MediaPickerDialog
        open={open}
        onOpenChange={setOpen}
        accept="document"
        onSelect={(ids) => onChange({ file: { mediaId: ids[0] ?? null, label: block.file?.label ?? "" } })}
      />
    </div>
  );
}

function EmbedEditor({ block, onChange }: { block: Block; onChange: Patch }) {
  const e = block.embed!;
  const set = (patch: Partial<typeof e>) => onChange({ embed: { ...e, ...patch } });
  const yt = e.provider === "youtube" ? youtubeId(e.url) : null;
  return (
    <div className="space-y-2">
      <Input
        value={e.url}
        onChange={(ev) => set({ url: ev.target.value })}
        placeholder={`Paste a ${e.provider} URL…`}
      />
      {yt ? (
        <div className="aspect-video overflow-hidden rounded-lg border border-border">
          <iframe src={`https://www.youtube.com/embed/${yt}`} className="h-full w-full" title="YouTube preview" allowFullScreen />
        </div>
      ) : e.url ? (
        <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm">
          <span className="font-medium capitalize">{e.provider}</span> embed preview —{" "}
          <span className="text-muted-foreground">{e.url}</span>
        </div>
      ) : null}
      <Input value={e.caption ?? ""} onChange={(ev) => set({ caption: ev.target.value })} placeholder="Caption (optional)" className="h-8" />
    </div>
  );
}

function ButtonEditor({ block, onChange }: { block: Block; onChange: Patch }) {
  const b = block.button!;
  const set = (patch: Partial<typeof b>) => onChange({ button: { ...b, ...patch } });
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label="Button text">
        <Input value={b.text} onChange={(e) => set({ text: e.target.value })} />
      </Field>
      <Field label="URL">
        <Input value={b.href} onChange={(e) => set({ href: e.target.value })} placeholder="/contact or https://…" />
      </Field>
      <Field label="Style">
        <Select value={b.style} onValueChange={(v) => set({ style: v as "primary" | "secondary" | "outline" })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="primary">Primary</SelectItem>
            <SelectItem value="secondary">Secondary</SelectItem>
            <SelectItem value="outline">Outline</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <label className="flex items-center gap-2 self-end text-sm">
        <Switch checked={b.newTab} onCheckedChange={(v) => set({ newTab: v })} /> Open in new tab
      </label>
    </div>
  );
}

function CoverEditor({ block, onChange }: { block: Block; onChange: Patch }) {
  const [open, setOpen] = React.useState(false);
  const c = block.cover!;
  const media = useMediaItem(c.mediaId ?? null);
  const set = (patch: Partial<typeof c>) => onChange({ cover: { ...c, ...patch } });
  return (
    <div className="space-y-2">
      <div className="relative overflow-hidden rounded-xl border border-border">
        {media?.url ? <img src={media.url} alt="" className="h-48 w-full object-cover" /> : <div className="h-48 w-full bg-gradient-to-br from-primary to-chart-3" />}
        <div className="absolute inset-0 bg-black" style={{ opacity: c.overlay / 100 }} />
        <input
          value={c.heading}
          onChange={(e) => set({ heading: e.target.value })}
          placeholder="Cover heading"
          className="absolute inset-x-6 top-1/2 -translate-y-1/2 bg-transparent text-center text-xl font-bold text-white placeholder:text-white/60 focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-3">
        <Button size="sm" variant="outline" onClick={() => setOpen(true)}>Set background</Button>
        <Label className="text-xs text-muted-foreground">Overlay</Label>
        <Slider value={[c.overlay]} min={0} max={90} step={5} onValueChange={([v]) => set({ overlay: v })} className="max-w-[160px]" />
      </div>
      <MediaPickerDialog open={open} onOpenChange={setOpen} onSelect={(ids) => set({ mediaId: ids[0] ?? null })} />
    </div>
  );
}

function TableEditor({ block, onChange, selected }: { block: Block; onChange: Patch; selected: boolean }) {
  const t = block.table!;
  const set = (patch: Partial<typeof t>) => onChange({ table: { ...t, ...patch } });
  const setCell = (r: number, c: number, val: string) => {
    const rows = t.rows.map((row) => [...row]);
    rows[r][c] = val;
    set({ rows });
  };
  const addRow = () => set({ rows: [...t.rows, t.rows[0].map(() => "")] });
  const delRow = (r: number) => set({ rows: t.rows.filter((_, i) => i !== r) });
  const addCol = () => set({ rows: t.rows.map((row) => [...row, ""]) });
  const delCol = (c: number) => set({ rows: t.rows.map((row) => row.filter((_, i) => i !== c)) });

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-sm">
          <tbody>
            {t.rows.map((row, r) => (
              <tr key={r} className={cn(t.headerRow && r === 0 && "bg-muted font-medium")}>
                {row.map((cell, c) => (
                  <td key={c} className="border border-border p-0">
                    <input
                      value={cell}
                      onChange={(e) => setCell(r, c, e.target.value)}
                      className="w-full bg-transparent px-2 py-1.5 focus:bg-background focus:outline-none"
                      placeholder={t.headerRow && r === 0 ? "Header" : "Cell"}
                    />
                  </td>
                ))}
                {selected ? (
                  <td className="w-8 border-0 px-1 text-center">
                    <button type="button" onClick={() => delRow(r)} className="text-muted-foreground hover:text-destructive" aria-label="Delete row">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected ? (
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline" className="h-7" onClick={addRow}><Rows3 className="h-3.5 w-3.5" /> Add row</Button>
          <Button size="sm" variant="outline" className="h-7" onClick={addCol}><Columns3 className="h-3.5 w-3.5" /> Add column</Button>
          <Button size="sm" variant="outline" className="h-7" onClick={() => delCol(t.rows[0].length - 1)}>Delete last column</Button>
          <label className="ml-2 flex items-center gap-2 text-xs"><Switch checked={t.headerRow} onCheckedChange={(v) => set({ headerRow: v })} /> Header row</label>
          <label className="flex items-center gap-2 text-xs"><Switch checked={t.footerRow} onCheckedChange={(v) => set({ footerRow: v })} /> Footer row</label>
        </div>
      ) : null}
    </div>
  );
}

function FaqEditor({ block, onChange }: { block: Block; onChange: Patch }) {
  const faq = block.faq ?? [];
  const update = (id: string, patch: Partial<(typeof faq)[number]>) =>
    onChange({ faq: faq.map((f) => (f.id === id ? { ...f, ...patch } : f)) });
  return (
    <div className="space-y-3">
      {faq.map((f, i) => (
        <div key={f.id} className="space-y-2 rounded-lg border border-border bg-muted/30 p-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Q{i + 1}</span>
            <Input
              value={f.q}
              onChange={(e) => update(f.id, { q: e.target.value })}
              placeholder="Question"
              className="h-8 flex-1"
            />
            <button
              type="button"
              onClick={() => onChange({ faq: faq.filter((x) => x.id !== f.id) })}
              className="text-muted-foreground hover:text-destructive"
              aria-label="Remove question"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <Textarea
            value={f.a}
            onChange={(e) => update(f.id, { a: e.target.value })}
            placeholder="Answer"
            className="min-h-[60px]"
          />
        </div>
      ))}
      <Button
        size="sm"
        variant="outline"
        onClick={() => onChange({ faq: [...faq, { id: uid("f"), q: "", a: "" }] })}
      >
        <Plus className="h-4 w-4" /> Add question
      </Button>
    </div>
  );
}

function CalloutEditor({ block, onChange }: { block: Block; onChange: Patch }) {
  const c = block.callout!;
  const set = (patch: Partial<typeof c>) => onChange({ callout: { ...c, ...patch } });
  const kinds: CalloutKind[] = ["info", "tip", "warning", "success", "danger"];
  return (
    <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-3">
      <div className="flex items-center gap-2">
        <Select value={c.kind} onValueChange={(v) => set({ kind: v as CalloutKind })}>
          <SelectTrigger className="h-8 w-32 capitalize"><SelectValue /></SelectTrigger>
          <SelectContent>
            {kinds.map((k) => (
              <SelectItem key={k} value={k} className="capitalize">{k}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input value={c.title} onChange={(e) => set({ title: e.target.value })} placeholder="Title" className="h-8 flex-1" />
      </div>
      <RichText value={c.html} onChange={(html) => set({ html })} placeholder="Callout text…" ariaLabel="Callout text" />
    </div>
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
