import { useEffect } from "react";
import { Users } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHead, accentFor } from "@/components/site/primitives";
import { CEO, LEADERSHIP_TEAM, type TeamMember } from "@/data/teamData";

/** Person + Organization JSON-LD for the leadership team. */
function useLeadershipSchema() {
  useEffect(() => {
    const people = [CEO, ...LEADERSHIP_TEAM];
    const schema = {
      "@context": "https://schema.org",
      "@graph": people.map((p) => ({
        "@type": "Person",
        "@id": `https://www.infomist.com/leadership#${p.slug}`,
        name: p.name,
        jobTitle: p.role,
        description: p.bio,
        image: `https://www.infomist.com${p.image.startsWith("/") ? "" : "/"}${p.image.replace(/^\//, "")}`,
        worksFor: { "@type": "Organization", name: "Infomist", url: "https://www.infomist.com" },
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.id = "leadership-team-schema";
    document.head.appendChild(script);
    return () => {
      document.getElementById("leadership-team-schema")?.remove();
    };
  }, []);
}

function MemberCard({ member, accent = "#0EA5E9", featured = false }: { member: TeamMember; accent?: string; featured?: boolean }) {
  return (
    <div
      id={member.slug}
      className="group relative rounded-3xl p-[1.5px] h-full transition-transform duration-300 hover:-translate-y-1.5"
      style={{ background: `linear-gradient(150deg, ${accent}3a, ${accent}0a)` }}
    >
      <div className={`rounded-[22px] bg-white h-full flex flex-col items-center gap-4 text-center ${featured ? "p-8" : "p-6"}`}>
        <div
          className={`${featured ? "w-36 h-36" : "w-28 h-28"} rounded-full overflow-hidden flex-shrink-0`}
          style={{ border: `3px solid ${accent}26` }}
        >
          <img src={member.image} alt={`${member.name}, ${member.role} at Infomist`} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <h3 className={`${featured ? "text-xl" : "text-base"} font-bold text-[#0F172A]`}>{member.name}</h3>
          <p className="text-sm font-semibold" style={{ color: accent }}>{member.role}</p>
        </div>
        {featured && <p className="text-sm text-[#475569] leading-relaxed max-w-sm">{member.bio}</p>}
      </div>
    </div>
  );
}

export function OurLeadership() {
  useLeadershipSchema();

  return (
    <section id="our-leadership" className="w-full" style={{ background: "#F9FAFB" }}>
      <div className="max-w-5xl mx-auto px-6 py-24 md:py-28 flex flex-col gap-14">
        <Reveal>
          <SectionHead
            icon={Users}
            eyebrow="Our Leadership"
            title="The team behind"
            gradientWord="Infomist."
            center
          />
        </Reveal>

        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[CEO, ...LEADERSHIP_TEAM].map((m, i) => (
            <RevealItem key={m.slug}>
              <MemberCard member={m} accent={accentFor(i)} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
