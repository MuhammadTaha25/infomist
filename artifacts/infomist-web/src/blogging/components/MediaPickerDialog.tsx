import * as React from "react";
import { Upload, Link as LinkIcon, ImageIcon, Search, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Media, MediaType } from "../types";
import { useBlogging } from "../store";
import { uid, formatBytes } from "../utils/format";

export function MediaPickerDialog({
  open,
  onOpenChange,
  onSelect,
  multiple = false,
  accept = "image",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSelect: (ids: string[]) => void;
  multiple?: boolean;
  accept?: MediaType;
}) {
  const { state, dispatch } = useBlogging();
  const [tab, setTab] = React.useState("library");
  const [q, setQ] = React.useState("");
  const [picked, setPicked] = React.useState<string[]>([]);
  const [url, setUrl] = React.useState("");
  const [urlAlt, setUrlAlt] = React.useState("");
  const fileRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) {
      setPicked([]);
      setQ("");
      setUrl("");
      setUrlAlt("");
      setTab("library");
    }
  }, [open]);

  const items = state.media
    .filter((m) => m.type === accept)
    .filter((m) => (q.trim() ? (m.filename + m.alt).toLowerCase().includes(q.toLowerCase()) : true));

  function togglePick(id: string) {
    setPicked((p) => {
      if (multiple) return p.includes(id) ? p.filter((x) => x !== id) : [...p, id];
      return p.includes(id) ? [] : [id];
    });
  }

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const created: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const media: Media = {
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
        dispatch({ type: "media/create", media });
        created.push(media.id);
        setPicked((p) => (multiple ? [...p, media.id] : [media.id]));
      };
      reader.readAsDataURL(file);
    });
    toast.success(`${files.length} file${files.length > 1 ? "s" : ""} added to Media Library`);
    setTab("library");
  }

  function addFromUrl() {
    if (!url.trim()) return;
    const media: Media = {
      id: uid("md"),
      filename: url.split("/").pop()?.split("?")[0] || "external-media",
      url: url.trim(),
      type: accept,
      alt: urlAlt,
      caption: "",
      mime: accept === "image" ? "image/*" : accept === "video" ? "video/*" : "application/octet-stream",
      size: 0,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "media/create", media });
    setPicked((p) => (multiple ? [...p, media.id] : [media.id]));
    setTab("library");
    toast.success("Media added from URL");
  }

  function confirm() {
    if (picked.length === 0) return;
    onSelect(picked);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" /> {multiple ? "Select media" : "Select image"}
          </DialogTitle>
          <DialogDescription>Choose from the library, upload new files, or paste a URL.</DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="library">Media Library</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="url">From URL</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search media..." className="pl-9" />
            </div>
            <ScrollArea className="h-72 rounded-md border border-border p-3">
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {items.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => togglePick(m.id)}
                    className={cn(
                      "group relative aspect-square overflow-hidden rounded-md border-2 bg-muted",
                      picked.includes(m.id) ? "border-primary" : "border-transparent hover:border-border",
                    )}
                  >
                    {m.type === "image" && m.url ? (
                      <img src={m.url} alt={m.alt} className="h-full w-full object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center p-2 text-center text-[10px] text-muted-foreground">
                        {m.filename}
                      </span>
                    )}
                    {picked.includes(m.id) ? (
                      <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-3 w-3" />
                      </span>
                    ) : null}
                  </button>
                ))}
                {items.length === 0 ? (
                  <p className="col-span-full py-8 text-center text-sm text-muted-foreground">No media yet</p>
                ) : null}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="upload">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 px-6 py-16 text-center hover:border-primary-border"
            >
              <Upload className="h-6 w-6 text-muted-foreground" />
              <span className="text-sm font-medium">Click to upload</span>
              <span className="text-xs text-muted-foreground">Stored locally in this prototype — no upload leaves your browser</span>
            </button>
            <input
              ref={fileRef}
              type="file"
              hidden
              multiple={multiple}
              accept={accept === "image" ? "image/*" : accept === "video" ? "video/*" : accept === "audio" ? "audio/*" : undefined}
              onChange={(e) => handleFiles(e.target.files)}
            />
          </TabsContent>

          <TabsContent value="url" className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="mp-url">Media URL</Label>
              <Input
                id="mp-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mp-alt">Alt text</Label>
              <Input id="mp-alt" value={urlAlt} onChange={(e) => setUrlAlt(e.target.value)} placeholder="Describe the media" />
            </div>
            <Button variant="outline" onClick={addFromUrl} disabled={!url.trim()}>
              <LinkIcon className="h-4 w-4" /> Add to library
            </Button>
          </TabsContent>
        </Tabs>

        <DialogFooter className="items-center justify-between sm:justify-between">
          <span className="text-xs text-muted-foreground">
            {picked.length > 0
              ? `${picked.length} selected${picked.length === 1 && state.media.find((m) => m.id === picked[0]) ? ` · ${formatBytes(state.media.find((m) => m.id === picked[0])!.size)}` : ""}`
              : "Nothing selected"}
          </span>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={confirm} disabled={picked.length === 0}>
              Insert
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
