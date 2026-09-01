export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  image: string;
  /** Short one-line description used for SEO alt text / meta and card subtitle */
  bio: string;
}

const IMG = (file: string) => `${import.meta.env.BASE_URL}team/${file}`;

export const CEO: TeamMember = {
  slug: "warda-hisham",
  name: "Warda Hisham",
  role: "Chief Executive Officer",
  image: IMG("warda-hisham-ceo.jpg"),
  bio: "Warda Hisham is the CEO of Infomist, a software development company delivering AI, web, and mobile engineering for businesses in the US, UK, and Canada.",
};

/**
 * Leadership grid order (excludes CEO, shown separately above the grid):
 * Row 1: Operations Manager, CTO, AI Lead
 * Row 2: UI/UX Lead, Web Development Lead, Design Lead
 * Row 3 (4th row overall incl. CEO): Video Editing Lead, centered
 */
export const LEADERSHIP_TEAM: TeamMember[] = [
  {
    slug: "sajid-shoaib",
    name: "Sajid Shoaib",
    role: "Operations Manager",
    image: IMG("sajid-shoaib-operations-manager.jpg"),
    bio: "Sajid Shoaib leads operations at Infomist, overseeing delivery, process, and client operations across every engagement.",
  },
  {
    slug: "fahad-mubeen",
    name: "Fahad Mubeen",
    role: "Chief Technology Officer",
    image: IMG("fahad-mubeen-cto.jpg"),
    bio: "Fahad Mubeen is the CTO of Infomist, leading software architecture and engineering strategy across web, mobile, and AI systems.",
  },
  {
    slug: "muhammad-taha",
    name: "Muhammad Taha",
    role: "AI Lead",
    image: IMG("muhammad-taha-ai-lead.jpg"),
    bio: "Muhammad Taha leads AI and machine learning engineering at Infomist, building production-grade AI agents and automation systems.",
  },
  {
    slug: "hajra-naz",
    name: "Hajra Naz",
    role: "UI/UX Lead",
    image: IMG("hajra-naz-uiux-lead.jpg"),
    bio: "Hajra Naz leads UI/UX design at Infomist, designing usable, conversion-focused interfaces grounded in research.",
  },
  {
    slug: "hassan-khan",
    name: "Hassan Khan",
    role: "Web Development Lead",
    image: IMG("hassan-khan-web-development-lead.jpg"),
    bio: "Hassan Khan leads web development at Infomist, building fast, scalable websites and web applications.",
  },
  {
    slug: "hadi-khan",
    name: "Hadi Khan",
    role: "Design Lead",
    image: IMG("hadi-khan-design-lead.jpg"),
    bio: "Hadi Khan leads brand and graphic design at Infomist, shaping visual identity across client projects.",
  },
  {
    slug: "sarfaraz-abbas",
    name: "Sarfaraz Abbas",
    role: "Video Editing Lead",
    image: IMG("sarfaraz-abbas-video-editing-lead.jpg"),
    bio: "Sarfaraz Abbas leads video editing at Infomist, producing on-brand video content for clients across industries.",
  },
];
