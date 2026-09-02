import * as React from "react";
import { useLocation, useParams, useRoute } from "wouter";
import {
  ArrowLeft,
  Eye,
  Save,
  Send,
  CalendarClock,
  Rocket,
  Sparkles,
  PanelRightClose,
  PanelRightOpen,
  Settings2,
  CheckCircle2,
  Undo2,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import type { Block, Post } from "../types";
import { newPost, useBlogging, usePost, useSettings, slugify } from "../store";
import { BlockCanvas } from "../components/blocks/BlockCanvas";
import { PostSettingsPanel } from "../components/PostSettingsPanel";
import { StatusBadge } from "../components/common";
import { readingTime, effectiveStatus } from "../utils/format";
import { runAssistant, AI_ACTIONS } from "../utils/assistant";

export function PostEditorPage() {
  const [isNew] = useRoute("/posts/new");
  const params = useParams();
  const [, navigate] = useLocation();
  const { state, dispatch } = useBlogging();
  const settings = useSettings();
  const isMobile = useIsMobile();

  const [createdId, setCreatedId] = React.useState<string | null>(null);

  // Create a real stored post for /posts/new so relationships work immediately.
  React.useEffect(() => {
    if (isNew && !createdId) {
      const p = newPost(settings);
      dispatch({ type: "post/create", post: p });
      setCreatedId(p.id);
      navigate(`/posts/${p.id}/edit`, { replace: true });
    }
  }, [isNew, createdId, dispatch, settings, navigate]);

  const postId = params.id ?? createdId;
  const post = usePost(postId);

  const [panelOpen, setPanelOpen] = React.useState(true);
  const [mobilePanel, setMobilePanel] = React.useState(false);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        {isNew ? "Creating post…" : "Post not found."}
      </div>
    );
  }

  const update = (patch: Partial<Post>) => dispatch({ type: "post/update", id: post.id, patch });
  const setBlocks = (blocks: Block[]) => update({ blocks });

  const eff = effectiveStatus(post.status, post.publishedAt);

  const doc = post;
  const saveDraft = () => {
    update({ status: doc.status === "published" ? "published" : "draft" });
    toast.success("Draft saved", { description: "All changes are stored locally." });
  };
  const submitReview = () => {
    dispatch({ type: "post/status", id: doc.id, status: "pending" });
    toast.success("Submitted for review");
  };
  const approve = () => {
    dispatch({
      type: "post/status",
      id: doc.id,
      status: "published",
      publishedAt: new Date().toISOString(),
    });
    toast.success("Approved & published", { description: doc.title || "Untitled" });
  };
  const requestChanges = () => {
    dispatch({ type: "post/status", id: doc.id, status: "draft" });
    toast("Changes requested — returned to author");
  };
  const schedule = () => {
    const when =
      doc.publishedAt && new Date(doc.publishedAt) > new Date()
        ? doc.publishedAt
        : new Date(Date.now() + 86400000).toISOString();
    dispatch({ type: "post/status", id: doc.id, status: "published", publishedAt: when });
    toast.success("Scheduled", { description: new Date(when).toLocaleString() });
  };
  const publish = () => {
    if (settings.publishing.approvalRequired && doc.status !== "pending" && eff !== "published") {
      toast.warning("Approval required", {
        description: "Submit for review first, or turn off approval in Settings.",
      });
      return;
    }
    dispatch({ type: "post/status", id: doc.id, status: "published", publishedAt: new Date().toISOString() });
    toast.success("Published", { description: doc.title || "Untitled" });
  };

  const applyAI = (actionId: string) => {
    const result = runAssistant(actionId, doc);
    if (result.blocks) setBlocks(result.blocks);
    if (result.patch) update(result.patch);
    toast.success("AI Assistant", { description: result.message });
  };

  const words = post.blocks.reduce((n, b) => n + (b.html ? b.html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length : 0), 0);

  const panel = (
    <PostSettingsPanel post={post} onChange={update} />
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* top bar — scrolls horizontally on very narrow screens instead of
          widening the page (keeps every action reachable on mobile) */}
      <header className="sticky top-0 z-20 flex h-14 items-center gap-2 overflow-x-auto border-b border-border bg-background px-3 sm:px-4">
        <Button variant="ghost" size="sm" className="flex-shrink-0" onClick={() => navigate("/posts")}>
          <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Back to Posts</span>
        </Button>
        <Separator orientation="vertical" className="mx-1 h-5 flex-shrink-0" />
        <div className="flex-shrink-0">
          <StatusBadge status={post.status} publishedAt={post.publishedAt} />
        </div>
        <span className="hidden text-xs text-muted-foreground md:inline">
          {words} words · {readingTime(post.blocks)} min read
        </span>

        <div className="ml-auto flex flex-shrink-0 items-center gap-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Sparkles className="h-4 w-4 text-primary" /> <span className="hidden sm:inline">AI Assistant</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>AI Assistant · demo output</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {AI_ACTIONS.map((a) => (
                <DropdownMenuItem key={a.id} onClick={() => applyAI(a.id)}>
                  {a.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                AI never auto-publishes — always Draft → Review → Publish.
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" onClick={() => window.open(`${import.meta.env.BASE_URL}blogging/posts/${post.id}/preview`, "_blank")}>
            <Eye className="h-4 w-4" /> <span className="hidden sm:inline">Preview</span>
          </Button>
          <Button variant="secondary" size="sm" onClick={saveDraft}>
            <Save className="h-4 w-4" /> <span className="hidden sm:inline">Save Draft</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm">
                <Rocket className="h-4 w-4" /> Publish
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem onClick={submitReview}>
                <Send /> Submit for Review
              </DropdownMenuItem>
              <DropdownMenuItem onClick={schedule}>
                <CalendarClock /> Schedule
              </DropdownMenuItem>
              <DropdownMenuItem onClick={publish}>
                <Rocket /> Publish now
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs">Review actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={approve}>
                <CheckCircle2 /> Approve
              </DropdownMenuItem>
              <DropdownMenuItem onClick={requestChanges}>
                <Undo2 /> Request Changes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { dispatch({ type: "post/status", id: post.id, status: "draft" }); toast("Returned to author"); }}>
                <RotateCcw /> Return to Author
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {!isMobile ? (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setPanelOpen((o) => !o)} aria-label="Toggle settings">
              {panelOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
            </Button>
          ) : (
            <Sheet open={mobilePanel} onOpenChange={setMobilePanel}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Post settings">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[340px] overflow-y-auto p-0">
                <SheetHeader className="border-b border-border px-4 py-3">
                  <SheetTitle>Post Settings</SheetTitle>
                </SheetHeader>
                {panel}
              </SheetContent>
            </Sheet>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        {/* editor */}
        <div className="min-w-0 flex-1">
          <ScrollArea className="h-[calc(100vh-3.5rem)]">
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
              <textarea
                value={post.title}
                onChange={(e) => {
                  const title = e.target.value.replace(/\n/g, "");
                  update({ title, slug: post.slug || slugify(title) });
                }}
                rows={1}
                placeholder="Post title"
                className="w-full resize-none border-0 bg-transparent p-0 text-3xl font-bold tracking-tight text-foreground outline-none placeholder:text-muted-foreground/50"
              />
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                <span>URL slug:</span>
                <span className="font-mono text-foreground">/{post.slug || "…"}</span>
                <button
                  className="text-primary hover:underline"
                  onClick={() => {
                    const v = window.prompt("Edit slug", post.slug);
                    if (v != null) update({ slug: slugify(v) });
                  }}
                >
                  edit
                </button>
                <span>· {post.slug.length} chars</span>
              </div>

              <Separator className="my-6" />

              <BlockCanvas blocks={post.blocks} onChange={setBlocks} />
            </div>
          </ScrollArea>
        </div>

        {/* desktop settings panel */}
        {!isMobile && panelOpen ? (
          <aside className="w-[340px] shrink-0 border-l border-border">
            <ScrollArea className="h-[calc(100vh-3.5rem)]">
              <div className="border-b border-border px-4 py-3 text-sm font-semibold">Post Settings</div>
              {panel}
            </ScrollArea>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
