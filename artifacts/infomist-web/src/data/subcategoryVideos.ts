/**
 * Per-subcategory hero clip (basename in /public/hero, mp4 + webp poster).
 * Keyed by the slug in /solutions/:slug. When a slug is present here the
 * SubcategoryPage renders the dark PageHeroVideo (keeping the page's own
 * displayName + tagline copy); otherwise it falls back to the SVG HeroVisual.
 * Clips are matched to the subject per the "All Pages & Subpages Hero Blueprint".
 */
export const SUBCATEGORY_VIDEOS: Record<string, string> = {
  // AI & Machine Learning
  "ai-voice-agent-development": "sub-voice",
  "ai-automation-services": "sub-automation",
  "autonomous-ai-agents": "sub-autonomous-agents",
  "business-process-automation": "sub-bpa",
  "ai-chatbot-development": "sub-chatbot",
  "ai-agents": "sub-agents",
  "computer-vision": "sub-vision",
  "generative-ai": "sub-genai",
  "nlp-solutions": "sub-nlp",
  "deep-learning": "sub-deep-learning",
  // Software & Web Architecture
  "software-development": "sub-software",
  "custom-software-development": "sub-software",
  "website-development": "sub-web",
  "saas-development": "sub-saas",
  "mobile-app-developer": "sub-mobile",
  "ios-app-development": "sub-mobile",
  "android-app-development": "sub-mobile",
  "cross-platform-mobile-app-development": "sub-mobile",
  "enterprise-software-development": "sub-devops",
  // Salesforce & Enterprise Cloud
  "salesforce-consulting-services": "sub-sf-architecture",
  "salesforce-implementation-partner": "sub-sf-implementation",
  "crm-integration": "sub-crm-automation",
  "system-integration": "sub-system-integration",
  // Experience Design & Media
  "graphic-design-services": "sub-design-system",
  "brand-identity-design": "sub-brand",
  "ui-ux-design-agency": "sub-design-system",
  "ux-design": "sub-ux",
  "video-production": "sub-video",
  "video-editing-services": "sub-video",
  "brochure-design": "sub-print",
  // SEO
  "conversion-rate-optimization": "sub-cro",
  "content-marketing-services": "sub-content",
  // Digital Marketing
  "digital-marketing-agency": "sub-dm-agency",
  "social-media-marketing-agency": "sub-content",
  "ppc-management-services": "sub-ads",
  "google-ads-agency": "sub-ads",
  "facebook-ads-agency": "sub-ads",
  "influencer-marketing-agency": "sub-content",
  // Dedicated Squads / Staffing
  "offshore-software-development": "sub-delivery",
  "dedicated-development-team": "sub-delivery",
};
