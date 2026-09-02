import * as React from "react";
import { Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Block } from "../../types";
import { BLOCKS, BLOCK_GROUPS } from "./registry";

export function BlockInserter({
  open,
  onOpenChange,
  onInsert,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onInsert: (block: Block) => void;
}) {
  const [q, setQ] = React.useState("");

  React.useEffect(() => {
    if (open) setQ("");
  }, [open]);

  const filtered = BLOCKS.filter((b) =>
    q.trim() ? (b.label + (b.keywords ?? "") + b.group).toLowerCase().includes(q.toLowerCase()) : true,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add block
          </DialogTitle>
          <DialogDescription>Pick a block to insert into the post.</DialogDescription>
        </DialogHeader>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search blocks..." className="pl-9" />
        </div>
        <ScrollArea className="h-[22rem] pr-3">
          <div className="space-y-5">
            {BLOCK_GROUPS.map((group) => {
              const inGroup = filtered.filter((b) => b.group === group);
              if (inGroup.length === 0) return null;
              return (
                <div key={group}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{group}</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {inGroup.map((b) => {
                      const Icon = b.icon;
                      return (
                        <button
                          key={b.label}
                          type="button"
                          onClick={() => {
                            onInsert(b.make());
                            onOpenChange(false);
                          }}
                          className={cn(
                            "flex flex-col items-start gap-2 rounded-md border border-border bg-background p-3 text-left transition-colors",
                            "hover:border-primary-border hover:bg-muted/50",
                          )}
                        >
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">{b.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">No blocks match “{q}”.</p>
            ) : null}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
