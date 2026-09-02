import type { Block, Post } from "../types";
import { uid, stripHtml } from "./format";

export const AI_ACTIONS: { id: string; label: string }[] = [
  { id: "intro", label: "Generate Introduction" },
  { id: "rewrite", label: "Rewrite selection" },
  { id: "improve", label: "Improve Paragraph" },
  { id: "professional", label: "Make Professional" },
  { id: "simple", label: "Make Simple" },
  { id: "expand", label: "Expand" },
  { id: "shorten", label: "Shorten" },
  { id: "h2s", label: "Generate H2s" },
  { id: "faq", label: "Generate FAQ" },
  { id: "seoTitle", label: "Generate SEO Title" },
  { id: "meta", label: "Generate Meta Description" },
  { id: "internal", label: "Suggest Internal Links" },
  { id: "external", label: "Suggest External Sources" },
];

interface Result {
  blocks?: Block[];
  patch?: Partial<Post>;
  message: string;
}

const topic = (post: Post) => post.seo.focusKeyword || post.title || "this topic";

export function runAssistant(actionId: string, post: Post): Result {
  const t = topic(post);
  switch (actionId) {
    case "intro": {
      const intro: Block = {
        id: uid("b"),
        type: "paragraph",
        html: `<em>Draft introduction —</em> ${t} is reshaping how modern teams operate. In this article we break down what is changing, where the value is, and the practical steps to adopt it without disrupting what already works.`,
      };
      return { blocks: [intro, ...post.blocks], message: "Inserted a draft introduction at the top — edit before publishing." };
    }
    case "h2s": {
      const headings = ["What is changing", "Where the value is", "How to get started", "Common mistakes", "What to measure"];
      const newBlocks: Block[] = headings.flatMap((h) => [
        { id: uid("b"), type: "heading", level: 2, html: h } as Block,
        { id: uid("b"), type: "paragraph", html: "" } as Block,
      ]);
      return { blocks: [...post.blocks, ...newBlocks], message: "Added a 5-section H2 outline with empty paragraphs to fill in." };
    }
    case "faq": {
      const faqBlock: Block = {
        id: uid("b"),
        type: "faq",
        faq: [
          { id: uid("f"), q: `Is ${t} right for small teams?`, a: "Yes — smaller teams often see faster returns because a single workflow removes a large share of manual work." },
          { id: uid("f"), q: `How long does adoption take?`, a: "A focused first workflow is usually live within two to four weeks." },
          { id: uid("f"), q: `What are the risks?`, a: "The main risk is automating an irreversible action without a human checkpoint — always keep one until confidence is proven." },
        ],
      };
      return { blocks: [...post.blocks, faqBlock], message: "Generated a 3-question FAQ block at the end." };
    }
    case "seoTitle":
      return {
        patch: { seo: { ...post.seo, title: `${post.title || t}: A Practical 2026 Guide` } },
        message: "Updated the SEO title.",
      };
    case "meta":
      return {
        patch: {
          seo: {
            ...post.seo,
            description: `A practical guide to ${t}: what is changing, where the value is, and how to adopt it step by step in 2026.`,
          },
        },
        message: "Updated the meta description.",
      };
    case "internal": {
      const note: Block = {
        id: uid("b"),
        type: "callout",
        callout: {
          kind: "info",
          title: "Suggested internal links",
          html: "Consider linking to: <a data-internal=\"true\" href=\"/blog/ai-recruitment-automation-guide/\">AI Recruitment Automation Guide</a> and your Web Architecture pillar page.",
        },
      };
      return { blocks: [...post.blocks, note], message: "Added a note with internal link suggestions." };
    }
    case "external": {
      const note: Block = {
        id: uid("b"),
        type: "callout",
        callout: {
          kind: "info",
          title: "Suggested external sources",
          html: "Cite: <a data-external=\"true\" target=\"_blank\" rel=\"noopener\" href=\"https://platform.openai.com/docs\">OpenAI API documentation</a> and a recent industry benchmark report.",
        },
      };
      return { blocks: [...post.blocks, note], message: "Added a note with external source suggestions." };
    }
    case "rewrite":
    case "improve":
    case "professional":
    case "simple":
    case "expand":
    case "shorten": {
      const idx = post.blocks.findIndex((b) => b.type === "paragraph" && stripHtml(b.html).length > 0);
      if (idx < 0) return { message: "No paragraph found to transform. Add some text first." };
      const target = post.blocks[idx];
      const text = stripHtml(target.html);
      const transformed =
        actionId === "shorten"
          ? text.split(". ").slice(0, 1).join(". ") + "."
          : actionId === "expand"
            ? `${text} ${text.split(". ")[0]}, in practice, means measuring the baseline first and expanding only once error rates are known.`
            : actionId === "simple"
              ? text.replace(/\b(utilize|leverage|facilitate)\b/gi, "use")
              : actionId === "professional"
                ? text.replace(/\b(a lot|kind of|sort of)\b/gi, "considerably")
                : `${text} (revised)`;
      const blocks = post.blocks.map((b, i) => (i === idx ? { ...b, html: transformed } : b));
      return { blocks, message: `Applied “${AI_ACTIONS.find((a) => a.id === actionId)?.label}” to the first paragraph.` };
    }
    default:
      return { message: "Nothing to do." };
  }
}
