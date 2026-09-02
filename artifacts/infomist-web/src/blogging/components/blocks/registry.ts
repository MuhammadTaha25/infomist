import {
  Type,
  Heading,
  List,
  Quote,
  Code2,
  Image as ImageIcon,
  Images,
  Video,
  Music,
  File as FileIcon,
  Youtube,
  Twitter,
  Instagram,
  Music2,
  MessageCircle,
  MapPin,
  Link as LinkIcon,
  MousePointerClick,
  Columns2,
  Group,
  Minus,
  MoveVertical,
  PanelTop,
  Table as TableIcon,
  HelpCircle,
  Megaphone,
  ChevronsDown,
  ListTree,
  Film,
} from "lucide-react";
import type { ComponentType } from "react";
import type { Block, BlockType, EmbedProvider } from "../../types";
import { uid } from "../../utils/format";

export type BlockGroup = "Text" | "Media" | "Embeds" | "Design" | "Content";

interface BlockDef {
  type: BlockType;
  label: string;
  group: BlockGroup;
  icon: ComponentType<{ className?: string }>;
  keywords?: string;
  embedProvider?: EmbedProvider;
  make: () => Block;
}

const base = (type: BlockType): Block => ({ id: uid("b"), type });

export const BLOCKS: BlockDef[] = [
  { type: "paragraph", label: "Paragraph", group: "Text", icon: Type, make: () => ({ ...base("paragraph"), html: "" }) },
  { type: "heading", label: "Heading", group: "Text", icon: Heading, make: () => ({ ...base("heading"), level: 2, html: "" }) },
  { type: "list", label: "List", group: "Text", icon: List, make: () => ({ ...base("list"), ordered: false, html: "<li></li>" }) },
  { type: "quote", label: "Quote", group: "Text", icon: Quote, make: () => ({ ...base("quote"), html: "", citation: "" }) },
  { type: "code", label: "Code", group: "Text", icon: Code2, make: () => ({ ...base("code"), code: "", language: "typescript" }) },

  {
    type: "image",
    label: "Image",
    group: "Media",
    icon: ImageIcon,
    make: () => ({
      ...base("image"),
      image: { mediaId: null, alt: "", caption: "", align: "center", width: "100%", height: "", href: "", linkNewTab: false },
    }),
  },
  {
    type: "gallery",
    label: "Gallery",
    group: "Media",
    icon: Images,
    make: () => ({
      ...base("gallery"),
      gallery: { mediaIds: [], columns: 3, crop: true, captions: false, lightbox: true, linkTo: "none", align: "center" },
    }),
  },
  {
    type: "video",
    label: "Video",
    group: "Media",
    icon: Video,
    make: () => ({
      ...base("video"),
      media: { mediaId: null, url: "", poster: "", title: "", caption: "", controls: true, autoplay: false, loop: false, muted: false },
    }),
  },
  {
    type: "audio",
    label: "Audio",
    group: "Media",
    icon: Music,
    make: () => ({
      ...base("audio"),
      media: { mediaId: null, url: "", title: "", caption: "", controls: true, autoplay: false, loop: false, muted: false },
    }),
  },
  { type: "file", label: "File", group: "Media", icon: FileIcon, make: () => ({ ...base("file"), file: { mediaId: null, label: "" } }) },

  ...embed("youtube", "YouTube", Youtube),
  ...embed("vimeo", "Vimeo", Film),
  ...embed("x", "X (Twitter)", Twitter),
  ...embed("instagram", "Instagram", Instagram),
  ...embed("tiktok", "TikTok", Music2),
  ...embed("spotify", "Spotify", Music),
  ...embed("reddit", "Reddit", MessageCircle),
  ...embed("maps", "Google Maps", MapPin),
  ...embed("generic", "Generic Embed", LinkIcon),

  { type: "button", label: "Button / CTA", group: "Design", icon: MousePointerClick, make: () => ({ ...base("button"), button: { text: "Learn more", href: "", newTab: false, style: "primary" } }) },
  { type: "columns", label: "Columns", group: "Design", icon: Columns2, make: () => ({ ...base("columns"), children: [[], []] }) },
  { type: "group", label: "Group", group: "Design", icon: Group, make: () => ({ ...base("group"), children: [[]] }) },
  { type: "separator", label: "Separator", group: "Design", icon: Minus, make: () => base("separator") },
  { type: "spacer", label: "Spacer", group: "Design", icon: MoveVertical, make: () => ({ ...base("spacer"), spacerHeight: 48 }) },
  { type: "cover", label: "Cover", group: "Design", icon: PanelTop, make: () => ({ ...base("cover"), cover: { mediaId: null, heading: "", overlay: 40, align: "center" } }) },

  {
    type: "table",
    label: "Table",
    group: "Content",
    icon: TableIcon,
    make: () => ({
      ...base("table"),
      table: { headerRow: true, footerRow: false, align: "center", rows: [["Column", "Column", "Column"], ["", "", ""], ["", "", ""]] },
    }),
  },
  {
    type: "faq",
    label: "FAQ",
    group: "Content",
    icon: HelpCircle,
    make: () => ({ ...base("faq"), faq: [{ id: uid("f"), q: "", a: "" }] }),
  },
  {
    type: "callout",
    label: "Callout",
    group: "Content",
    icon: Megaphone,
    make: () => ({ ...base("callout"), callout: { kind: "info", title: "", html: "" } }),
  },
  { type: "readmore", label: "Read More", group: "Content", icon: ChevronsDown, make: () => ({ ...base("readmore"), label: "Read more" }) },
  { type: "toc", label: "Table of Contents", group: "Content", icon: ListTree, make: () => base("toc") },
];

function embed(provider: EmbedProvider, label: string, icon: BlockDef["icon"]): BlockDef[] {
  return [
    {
      type: "embed",
      label,
      group: "Embeds",
      icon,
      embedProvider: provider,
      keywords: provider,
      make: () => ({ ...base("embed"), embed: { provider, url: "", caption: "" } }),
    },
  ];
}

export const BLOCK_GROUPS: BlockGroup[] = ["Text", "Media", "Embeds", "Design", "Content"];

export function blockLabel(block: Block): string {
  if (block.type === "embed" && block.embed) {
    const def = BLOCKS.find((b) => b.type === "embed" && b.embedProvider === block.embed!.provider);
    return def?.label ?? "Embed";
  }
  return BLOCKS.find((b) => b.type === block.type)?.label ?? block.type;
}

export function blockIcon(block: Block) {
  if (block.type === "embed" && block.embed) {
    const def = BLOCKS.find((b) => b.type === "embed" && b.embedProvider === block.embed!.provider);
    if (def) return def.icon;
  }
  return BLOCKS.find((b) => b.type === block.type)?.icon ?? Type;
}
