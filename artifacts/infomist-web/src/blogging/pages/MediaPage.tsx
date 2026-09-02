import * as React from "react";
import { Plus, Search, Trash2, FileText, Film, Music, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Media, MediaType } from "../types";
import { useMediaLibrary, useBlogging, uid } from "../store";
import { PageHeader, EmptyState } from "../components/common";
import { formatBytes, formatDate } from "../utils/format";

const TYPE_ICON = { image: ImageIcon, video: Film, audio: Music, document: FileText } as const;

export function MediaPage() {
  const media = useMediaLibrary();
  const { dispatch } = useBlogging();
  const [q, setQ] = React.useState("");
  const [filter, setFilter] = React.useState<"all" | MediaType>("all");
  const [openId, setOpenId] = React.useState<string | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const items = media
    .filter((m) => (filter === "all" ? true : m.type === filter))
    .filter((m) => (q ? (m.filename + m.alt + m.caption).toLowerCase().includes(q.toLowerCase()) : true));

  const selected = media.find((m) => m.id === openId) ?? null;

  function upload(files: FileList | null) {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const m: Media = {
          id: uid("md"),
          filename: file.name,
          url: typeof reader.result === "string" ? reader.result : "",
          type: file.type.startsWith("video")
            ? "video"
            : file.type.startsWith("audio")
              ? "audio"
              : file.type.startsWith("image")
                ? "image"
                : "document",
          alt: file.name.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]/g, " "),
          caption: "",
          mime: file.type || "application/octet-stream",
          size: file.size,
          createdAt: new Date().toISOString(),
        };
        dispatch({ type: "media/create", media: m });
      };
      reader.readAsDataURL(file);
    });
    toast.success(`${files.length} file(s) added`);
  }

  return (
    <>
      <PageHeader title="Media Library" description="Images, video, audio and documents used across the blog. UI only.">
        <Button onClick={() => fileRef.current?.click()}>
          <Plus /> Add Media
        </Button>
        <input ref={fileRef} type="file" hidden multiple onChange={(e) => upload(e.target.files)} />
      </PageHeader>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search media..." className="pl-9" />
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as MediaType | "all")}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="image">Images</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="document">Documents</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {items.length === 0 ? (
        <EmptyState icon={ImageIcon} title="No media" description="Upload files or add them from the editor." />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((m) => {
            const Icon = TYPE_ICON[m.type];
            return (
              <button
                key={m.id}
                onClick={() => setOpenId(m.id)}
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background text-left transition-colors hover:border-primary-border"
              >
                <div className="flex aspect-square items-center justify-center bg-muted">
                  {m.type === "image" && m.url ? (
                    <img src={m.url} alt={m.alt} className="h-full w-full object-cover" />
                  ) : (
                    <Icon className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <div className="p-2">
                  <p className="truncate text-xs font-medium text-foreground">{m.filename}</p>
                  <p className="text-[10px] text-muted-foreground">{formatBytes(m.size)}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <Sheet open={!!selected} onOpenChange={(v) => !v && setOpenId(null)}>
        <SheetContent side="right" className="w-[360px] overflow-y-auto">
          {selected ? (
            <>
              <SheetHeader>
                <SheetTitle className="truncate">{selected.filename}</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-center rounded-lg border border-border bg-muted p-2">
                  {selected.type === "image" && selected.url ? (
                    <img src={selected.url} alt={selected.alt} className="max-h-56 rounded object-contain" />
                  ) : (
                    <div className="flex h-40 items-center justify-center text-muted-foreground">
                      {React.createElement(TYPE_ICON[selected.type], { className: "h-10 w-10" })}
                    </div>
                  )}
                </div>
                <Row label="Alt text">
                  <Input
                    value={selected.alt}
                    onChange={(e) => dispatch({ type: "media/update", id: selected.id, patch: { alt: e.target.value } })}
                  />
                </Row>
                <Row label="Caption">
                  <Input
                    value={selected.caption}
                    onChange={(e) => dispatch({ type: "media/update", id: selected.id, patch: { caption: e.target.value } })}
                  />
                </Row>
                <dl className="space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex justify-between"><dt>File type</dt><dd>{selected.mime}</dd></div>
                  <div className="flex justify-between"><dt>Size</dt><dd>{formatBytes(selected.size)}</dd></div>
                  {selected.width ? (
                    <div className="flex justify-between"><dt>Dimensions</dt><dd>{selected.width}×{selected.height}</dd></div>
                  ) : null}
                  <div className="flex justify-between"><dt>Uploaded</dt><dd>{formatDate(selected.createdAt)}</dd></div>
                </dl>
                <Button
                  variant="ghost"
                  className="w-full text-destructive"
                  onClick={() => {
                    dispatch({ type: "media/delete", id: selected.id });
                    setOpenId(null);
                    toast.success("Media deleted");
                  }}
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
