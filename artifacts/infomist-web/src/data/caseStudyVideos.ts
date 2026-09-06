/** Hero clip per case study (basename in /public/hero, mp4 + webp poster).
 *  Matched to the engagement, reusing the existing hero library. */
export const CASE_STUDY_VIDEOS: Record<string, string> = {
  medez: "sub-web",
  beingguru: "sub-content",
  workchest: "hero-platforms",
  "grey-wolf-consulting": "sub-brand",
  syncbenefits: "sub-web",
  "aegis-proptech": "sub-voice",
};

export function caseStudyVideo(slug: string): string {
  return CASE_STUDY_VIDEOS[slug] ?? "hero-case-studies";
}
