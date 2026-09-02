import { useParams } from "wouter";
import { NotFoundBlock } from "@/components/site/NotFoundBlock";
import { PersonaDetail } from "@/components/who-we-work-with/PersonaDetail";
import { personaBySlug } from "@/data/whoWeWorkWithData";

/**
 * /who-we-work-with/:slug — persona detail journey.
 * Keyed remount on slug change so per-persona state (challenge selector, FAQ)
 * resets between personas.
 */
export function PersonaPage() {
  const { slug } = useParams<{ slug: string }>();
  const persona = slug ? personaBySlug(slug) : undefined;

  if (!persona) {
    return (
      <NotFoundBlock
        title="Role not found."
        sub="That role page doesn't exist, or the link has changed."
        backHref="/who-we-work-with"
        backLabel="Back to Who We Work With"
      />
    );
  }

  return <PersonaDetail key={persona.slug} persona={persona} />;
}
