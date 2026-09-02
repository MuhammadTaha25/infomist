import * as React from "react";
import {
  ChevronUp,
  ChevronDown,
  GripVertical,
  Copy,
  MoreVertical,
  Trash2,
  Plus,
  ArrowUpToLine,
  ArrowDownToLine,
  ClipboardCopy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import type { Block } from "../../types";
import { uid } from "../../utils/format";
import { BlockEditor } from "./BlockEditor";
import { BlockInserter } from "./BlockInserter";
import { blockLabel, blockIcon } from "./registry";

export function BlockCanvas({
  blocks,
  onChange,
}: {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}) {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [inserterAt, setInserterAt] = React.useState<number | null>(null);
  const [dragId, setDragId] = React.useState<string | null>(null);
  const clipboard = React.useRef<Block | null>(null);

  const set = (next: Block[]) => onChange(next);

  function patchBlock(id: string, patch: Partial<Block>) {
    set(blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  }
  function insertAt(index: number, block: Block) {
    const next = [...blocks];
    next.splice(index, 0, block);
    set(next);
    setSelected(block.id);
  }
  function move(id: string, dir: -1 | 1) {
    const i = blocks.findIndex((b) => b.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= blocks.length) return;
    const next = [...blocks];
    [next[i], next[j]] = [next[j], next[i]];
    set(next);
  }
  function duplicate(id: string) {
    const i = blocks.findIndex((b) => b.id === id);
    if (i < 0) return;
    const copy = { ...structuredClone(blocks[i]), id: uid("b") };
    insertAt(i + 1, copy);
  }
  function remove(id: string) {
    set(blocks.filter((b) => b.id !== id));
    if (selected === id) setSelected(null);
  }

  function onDrop(targetId: string) {
    if (!dragId || dragId === targetId) return;
    const from = blocks.findIndex((b) => b.id === dragId);
    const to = blocks.findIndex((b) => b.id === targetId);
    if (from < 0 || to < 0) return;
    const next = [...blocks];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    set(next);
    setDragId(null);
  }

  return (
    <div className="space-y-1">
      <AddDivider onClick={() => setInserterAt(0)} />
      {blocks.map((block, index) => {
        const Icon = blockIcon(block);
        const isSel = selected === block.id;
        return (
          <React.Fragment key={block.id}>
            <div
              className={cn(
                "group relative rounded-lg border px-3 py-3 transition-colors sm:px-4",
                isSel ? "border-primary-border bg-background shadow-sm" : "border-transparent hover:border-border",
                dragId === block.id && "opacity-40",
              )}
              onClick={() => setSelected(block.id)}
              draggable={dragId === block.id}
              onDragOver={(e) => dragId && e.preventDefault()}
              onDrop={() => onDrop(block.id)}
              onDragEnd={() => setDragId(null)}
            >
              {/* contextual toolbar */}
              <div
                className={cn(
                  "absolute -top-3 right-3 z-10 flex items-center gap-0.5 rounded-md border border-border bg-background p-0.5 shadow-sm",
                  isSel ? "flex" : "hidden group-hover:flex",
                )}
              >
                <span
                  className="flex h-7 w-6 cursor-grab items-center justify-center text-muted-foreground active:cursor-grabbing"
                  title="Drag to reorder"
                  onMouseDown={() => setDragId(block.id)}
                  onMouseUp={() => setDragId(null)}
                >
                  <GripVertical className="h-3.5 w-3.5" />
                </span>
                <ToolbarBtn label="Move up" onClick={() => move(block.id, -1)} disabled={index === 0}>
                  <ChevronUp className="h-3.5 w-3.5" />
                </ToolbarBtn>
                <ToolbarBtn label="Move down" onClick={() => move(block.id, 1)} disabled={index === blocks.length - 1}>
                  <ChevronDown className="h-3.5 w-3.5" />
                </ToolbarBtn>
                <ToolbarBtn label="Duplicate" onClick={() => duplicate(block.id)}>
                  <Copy className="h-3.5 w-3.5" />
                </ToolbarBtn>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground hover:bg-muted" aria-label="More">
                      <MoreVertical className="h-3.5 w-3.5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem onClick={() => duplicate(block.id)}>
                      <Copy /> Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        clipboard.current = structuredClone(block);
                        toast("Block copied");
                      }}
                    >
                      <ClipboardCopy /> Copy
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setInserterAt(index)}>
                      <ArrowUpToLine /> Add before
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setInserterAt(index + 1)}>
                      <ArrowDownToLine /> Add after
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => remove(block.id)}>
                      <Trash2 /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                <Icon className="h-3 w-3" />
                {blockLabel(block)}
              </div>
              <BlockEditor block={block} onChange={(p) => patchBlock(block.id, p)} selected={isSel} />
            </div>
            <AddDivider onClick={() => setInserterAt(index + 1)} />
          </React.Fragment>
        );
      })}

      {blocks.length === 0 ? (
        <button
          type="button"
          onClick={() => setInserterAt(0)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 py-10 text-sm text-muted-foreground hover:border-primary-border"
        >
          <Plus className="h-4 w-4" /> Add your first block
        </button>
      ) : null}

      {clipboard.current ? (
        <div className="pt-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => clipboard.current && insertAt(blocks.length, { ...structuredClone(clipboard.current), id: uid("b") })}
          >
            <ClipboardCopy className="h-4 w-4" /> Paste copied block
          </Button>
        </div>
      ) : null}

      <BlockInserter
        open={inserterAt !== null}
        onOpenChange={(v) => !v && setInserterAt(null)}
        onInsert={(block) => {
          if (inserterAt !== null) insertAt(inserterAt, block);
          setInserterAt(null);
        }}
      />
    </div>
  );
}

function ToolbarBtn({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground hover:bg-muted disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function AddDivider({ onClick }: { onClick: () => void }) {
  return (
    <div className="group/add relative flex h-3 items-center justify-center">
      <button
        type="button"
        onClick={onClick}
        className="z-10 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-background text-muted-foreground opacity-0 transition-opacity hover:border-primary-border hover:text-primary group-hover/add:opacity-100"
        aria-label="Add block"
      >
        <Plus className="h-3 w-3" />
      </button>
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-transparent group-hover/add:bg-border" />
    </div>
  );
}
