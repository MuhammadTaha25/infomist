export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  image: string;
  /** Short one-line description used for SEO alt text / meta and card subtitle */
  bio: string;
  /** Optional crop tweak for the circular avatar — scale factor (>1 zooms in)
   *  and a vertical focal point (default "30%"). Used when a source photo sits
   *  too far back in the frame. */
  imageZoom?: number;
  imageFocusY?: string;
}

const IMG = (file: string) => `${import.meta.env.BASE_URL}team/${file}`;

export const CEO: TeamMember = {
  slug: "warda-hisham",
  name: "Vardah Hisham",
  role: "Chief Executive Officer",
  image: IMG("warda-hisham-ceo.jpg"),
  bio: "Vardah Hisham is the CEO of Infomist, a software development company delivering AI, web, and mobile engineering for businesses in the US, UK, and Canada.",
};

/**
 * Leadership grid order (the CEO is not shown in this grid — see FounderSection).
 * Operations Manager leads, then CTO, then division and craft leads:
 * Row 1: Operations Manager, CTO, Software Development Lead
 * Row 2: UI/UX Lead, AI Lead, Creative Lead
 * Row 3: Content & SEO Lead, Video Editor Lead, Animation Lead
 */
export const LEADERSHIP_TEAM: TeamMember[] = [
  {
    slug: "sajid-shoaib",
    name: "Sajid Shoaib",
    role: "Operations Manager",
    image: IMG("sajid-shoaib-operations-manager.webp"),
    bio: "Sajid Shoaib is the Operations Manager at Infomist, overseeing project delivery, process, and client operations across every engagement.",
  },
  {
    slug: "fahad-mubeen",
    name: "Fahad Mubeen",
    role: "Chief Technology Officer",
    image: IMG("fahad-mubeen-cto.webp"),
    bio: "Fahad Mubeen is the Chief Technology Officer at Infomist, leading software architecture and engineering strategy across web, mobile, and AI systems.",
  },
  {
    slug: "muhammad-taha",
    name: "Muhammad Taha",
    role: "Software Development Lead",
    image: IMG("muhammad-taha-software-development-lead.webp"),
    bio: "Muhammad Taha is the Software Development Lead at Infomist, building fast, scalable web and mobile applications for clients in the US, UK, and Canada.",
  },
  {
    slug: "uzair-ahmad",
    name: "Uzair Ahmad",
    role: "UI/UX Lead",
    image: IMG("uzair-ahmad-uiux-lead.webp"),
    bio: "Uzair Ahmad is the UI/UX Lead at Infomist, designing research-driven, conversion-focused interfaces for web and mobile products.",
    imageZoom: 1.4,
    imageFocusY: "26%",
  },
  {
    slug: "murtaza-majid",
    name: "Murtaza Majid",
    role: "AI Lead",
    image: IMG("murtaza-majid-ai-lead.webp"),
    bio: "Murtaza Majid is the AI Lead at Infomist, building production-grade AI agents, automation, and machine learning systems.",
  },
  {
    slug: "hadi-khan",
    name: "Hadi Khan",
    role: "Creative Lead",
    image: IMG("hadi-khan-creative-lead.webp"),
    bio: "Hadi Khan is the Creative Lead at Infomist, shaping brand identity and visual design across client projects.",
  },
  {
    slug: "hajra-naz",
    name: "Hajra Naz",
    role: "Content & SEO Lead",
    image: IMG("hajra-naz-content-seo-lead.webp"),
    bio: "Hajra Naz is the Content & SEO Lead at Infomist, driving content strategy and search engine optimization for client campaigns.",
  },
  {
    slug: "zahid-hussain",
    name: "Zahid Hussain",
    role: "Video Editor Lead",
    image: IMG("zahid-hussain-video-editor-lead.webp"),
    bio: "Zahid Hussain is the Video Editor Lead at Infomist, producing on-brand video content for clients across industries.",
  },
  {
    slug: "sarfaraz-abbas",
    name: "Sarfaraz Abbas",
    role: "Animation Lead",
    image: IMG("sarfaraz-abbas-animation-lead.webp"),
    bio: "Sarfaraz Abbas is the Animation Lead at Infomist, creating motion graphics and animated content for brands and campaigns.",
  },
];
