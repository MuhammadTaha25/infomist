import * as React from "react";
import { Link2, Globe, FileText, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { usePosts } from "../store";
import { effectiveStatus } from "../utils/format";

export interface LinkValue {
  url: string;
  anchor: string;
  internal: boolean;
  newTab: boolean;
  nofollow: boolean;
  sponsored: boolean;
  ugc: boolean;
}

export function LinkDialog({
  open,
  onOpenChange,
  onInsert,
  initial,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onInsert: (v: LinkValue) => void;
  initial?: Partial<LinkValue>;
}) {
  const posts = usePosts();
  const [tab, setTab] = React.useState<"internal" | "external">(
    initial?.internal === false ? "external" : "internal",
  );
  const [q, setQ] = React.useState("");
  const [picked, setPicked] = React.useState<string | null>(null);

  const [url, setUrl] = React.useState(initial?.url ?? "");
  const [anchor, setAnchor] = React.useState(initial?.anchor ?? "");
  const [newTab, setNewTab] = React.useState(initial?.newTab ?? true);
  const [nofollow, setNofollow] = React.useState(initial?.nofollow ?? false);
  const [sponsored, setSponsored] = React.useState(initial?.sponsored ?? false);
  const [ugc, setUgc] = React.useState(initial?.ugc ?? false);

  React.useEffect(() => {
    if (open) {
      setQ("");
      setPicked(null);
      setUrl(initial?.url ?? "");
      setAnchor(initial?.anchor ?? "");
      setTab(initial?.internal === false ? "external" : "internal");
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const results = React.useMemo(() => {
    const list = posts.filter((p) => effectiveStatus(p.status, p.publishedAt) !== "trash");
    if (!q.trim()) return list.slice(0, 8);
    const t = q.toLowerCase();
    return list.filter((p) => p.title.toLowerCase().includes(t)).slice(0, 12);
  }, [posts, q]);

  const pickedPost = posts.find((p) => p.id === picked);

  function submit() {
    if (tab === "internal") {
      if (!pickedPost) return;
      onInsert({
        url: `/blog/${pickedPost.slug}/`,
        anchor: anchor || pickedPost.title,
        internal: true,
        newTab,
        nofollow: false,
        sponsored: false,
        ugc: false,
      });
    } else {
      if (!url.trim()) return;
      onInsert({ url: url.trim(), anchor, internal: false, newTab, nofollow, sponsored, ugc });
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link2 className="h-4 w-4" /> Insert link
          </DialogTitle>
          <DialogDescription>Link to another post on this site, or to an external URL.</DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as "internal" | "external")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="internal">
              <FileText className="mr-1.5 h-3.5 w-3.5" /> Internal
            </TabsTrigger>
            <TabsTrigger value="external">
              <Globe className="mr-1.5 h-3.5 w-3.5" /> External
            </TabsTrigger>
          </TabsList>

          <TabsContent value="internal" className="space-y-3">
            <Input
              autoFocus
              placeholder="Search posts and pages..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <ScrollArea className="h-52 rounded-md border border-border">
              <ul className="divide-y divide-border">
                {results.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setPicked(p.id);
                        setAnchor((a) => a || p.title);
                      }}
                      className={cn(
                        "flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left text-sm hover:bg-muted",
                        picked === p.id && "bg-primary/10",
                      )}
                    >
                      <span className="font-medium text-foreground">{p.title}</span>
                      <span className="text-xs text-muted-foreground">/blog/{p.slug}/</span>
                    </button>
                  </li>
                ))}
                {results.length === 0 ? (
                  <li className="px-3 py-6 text-center text-sm text-muted-foreground">No matches</li>
                ) : null}
              </ul>
            </ScrollArea>
            <div className="space-y-1.5">
              <Label htmlFor="ln-anchor">Anchor text</Label>
              <Input id="ln-anchor" value={anchor} onChange={(e) => setAnchor(e.target.value)} placeholder="Link text" />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox checked={newTab} onCheckedChange={(v) => setNewTab(!!v)} /> Open in new tab
            </label>
          </TabsContent>

          <TabsContent value="external" className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="ln-anchor2">Anchor text</Label>
              <Input
                id="ln-anchor2"
                value={anchor}
                onChange={(e) => setAnchor(e.target.value)}
                placeholder="OpenAI API Documentation"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ln-url">URL</Label>
              <Input
                id="ln-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 rounded-md border border-border p-3">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={newTab} onCheckedChange={(v) => setNewTab(!!v)} /> Open in new tab
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={nofollow} onCheckedChange={(v) => setNofollow(!!v)} /> No-follow
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={sponsored} onCheckedChange={(v) => setSponsored(!!v)} /> Sponsored
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={ugc} onCheckedChange={(v) => setUgc(!!v)} /> UGC
              </label>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={tab === "internal" ? !picked : !url.trim()}>
            <ExternalLink className="h-4 w-4" /> Insert link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
