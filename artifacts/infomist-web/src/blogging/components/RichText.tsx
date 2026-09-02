import * as React from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code2,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LinkDialog, type LinkValue } from "./LinkDialog";

const HIGHLIGHTS = ["#FEF08A", "#BBF7D0", "#BFDBFE", "#FBCFE8", "#FED7AA"];
const COLORS = ["#0F172A", "#0EA5E9", "#84CC16", "#8B5CF6", "#F97316", "#EF4444"];

function exec(cmd: string, value?: string) {
  document.execCommand(cmd, false, value);
}

export function RichText({
  value,
  onChange,
  placeholder,
  singleLine = false,
  className,
  ariaLabel,
  toolbar = true,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  singleLine?: boolean;
  className?: string;
  ariaLabel?: string;
  toolbar?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [focused, setFocused] = React.useState(false);
  const [linkOpen, setLinkOpen] = React.useState(false);
  const savedRange = React.useRef<Range | null>(null);

  // keep DOM in sync only when value changes externally
  React.useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, [value]);

  function emit() {
    if (ref.current) onChange(ref.current.innerHTML);
  }

  function saveSelection() {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) savedRange.current = sel.getRangeAt(0).cloneRange();
  }
  function restoreSelection() {
    const sel = window.getSelection();
    if (sel && savedRange.current) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    }
  }

  function apply(cmd: string, val?: string) {
    ref.current?.focus();
    restoreSelection();
    exec(cmd, val);
    emit();
  }

  function applyInlineCode() {
    ref.current?.focus();
    restoreSelection();
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    const text = sel.toString();
    exec("insertHTML", `<code>${escapeHtml(text)}</code>`);
    emit();
  }

  function openLink() {
    saveSelection();
    setLinkOpen(true);
  }

  function insertLink(link: LinkValue) {
    ref.current?.focus();
    restoreSelection();
    const sel = window.getSelection();
    const selText = sel?.toString() || link.anchor || link.url;
    const rel: string[] = [];
    if (link.nofollow) rel.push("nofollow");
    if (link.sponsored) rel.push("sponsored");
    if (link.ugc) rel.push("ugc");
    if (link.newTab) rel.push("noopener");
    const attrs = [
      `href="${escapeAttr(link.url)}"`,
      link.internal ? `data-internal="true"` : `data-external="true"`,
      link.newTab ? `target="_blank"` : "",
      rel.length ? `rel="${rel.join(" ")}"` : "",
    ]
      .filter(Boolean)
      .join(" ");
    exec("insertHTML", `<a ${attrs}>${escapeHtml(selText)}</a>`);
    emit();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (singleLine && e.key === "Enter") {
      e.preventDefault();
      return;
    }
    if ((e.metaKey || e.ctrlKey) && !e.shiftKey) {
      const k = e.key.toLowerCase();
      if (k === "b") { e.preventDefault(); apply("bold"); }
      if (k === "i") { e.preventDefault(); apply("italic"); }
      if (k === "u") { e.preventDefault(); apply("underline"); }
      if (k === "k") { e.preventDefault(); openLink(); }
    }
  }

  return (
    <div className={cn("rich-text", className)}>
      {toolbar && focused ? (
        <div
          className="mb-2 flex flex-wrap items-center gap-0.5 rounded-md border border-border bg-background p-1 shadow-sm"
          onMouseDown={(e) => {
            e.preventDefault();
            saveSelection();
          }}
        >
          <TB icon={Bold} label="Bold" onClick={() => apply("bold")} />
          <TB icon={Italic} label="Italic" onClick={() => apply("italic")} />
          <TB icon={UnderlineIcon} label="Underline" onClick={() => apply("underline")} />
          <TB icon={Strikethrough} label="Strikethrough" onClick={() => apply("strikeThrough")} />
          <TB icon={Code2} label="Inline code" onClick={applyInlineCode} />
          <Separator orientation="vertical" className="mx-1 h-5" />
          {!singleLine ? (
            <>
              <TB icon={List} label="Bullet list" onClick={() => apply("insertUnorderedList")} />
              <TB icon={ListOrdered} label="Numbered list" onClick={() => apply("insertOrderedList")} />
              <Separator orientation="vertical" className="mx-1 h-5" />
              <TB icon={AlignLeft} label="Align left" onClick={() => apply("justifyLeft")} />
              <TB icon={AlignCenter} label="Align center" onClick={() => apply("justifyCenter")} />
              <TB icon={AlignRight} label="Align right" onClick={() => apply("justifyRight")} />
              <Separator orientation="vertical" className="mx-1 h-5" />
            </>
          ) : null}
          <SwatchPopover icon={Palette} label="Text color" colors={COLORS} onPick={(c) => apply("foreColor", c)} />
          <SwatchPopover
            icon={Highlighter}
            label="Highlight"
            colors={HIGHLIGHTS}
            onPick={(c) => apply("hiliteColor", c)}
          />
          <Separator orientation="vertical" className="mx-1 h-5" />
          <TB icon={Link2} label="Insert link" onClick={openLink} />
          <TB icon={Link2Off} label="Remove link" onClick={() => apply("unlink")} />
        </div>
      ) : null}

      <div
        ref={ref}
        role="textbox"
        aria-label={ariaLabel}
        aria-multiline={!singleLine}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={emit}
        onBlur={() => {
          setFocused(false);
          emit();
        }}
        onFocus={() => setFocused(true)}
        onKeyDown={onKeyDown}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        className={cn(
          "prose prose-sm max-w-none rounded-md border border-transparent px-1 py-0.5 outline-none",
          "focus:border-border focus:bg-background",
          "empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]",
          "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.85em]",
          "[&_a]:text-primary [&_a]:underline [&_a[data-internal]]:decoration-dotted",
        )}
      />

      <LinkDialog open={linkOpen} onOpenChange={setLinkOpen} onInsert={insertLink} />
    </div>
  );
}

function TB({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <Toggle
      size="sm"
      aria-label={label}
      title={label}
      className="h-7 w-7 p-0"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      <Icon className="h-3.5 w-3.5" />
    </Toggle>
  );
}

function SwatchPopover({
  icon: Icon,
  label,
  colors,
  onPick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  colors: string[];
  onPick: (c: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Toggle size="sm" aria-label={label} title={label} className="h-7 w-7 p-0" onMouseDown={(e) => e.preventDefault()}>
          <Icon className="h-3.5 w-3.5" />
        </Toggle>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="flex gap-1.5">
          {colors.map((c) => (
            <button
              key={c}
              type="button"
              className="h-6 w-6 rounded border border-border"
              style={{ background: c }}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onPick(c);
                setOpen(false);
              }}
              aria-label={c}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeAttr(s: string) {
  return s.replace(/"/g, "&quot;");
}
