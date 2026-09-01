import { useEffect } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { CEO, LEADERSHIP_TEAM, type TeamMember } from "@/data/teamData";

/** Person + Organization JSON-LD for leadership team — improves how search engines and
 * AI answer engines understand and cite Infomist's team. */
function useLeadershipSchema() {
  useEffect(() => {
    const people = [CEO, ...LEADERSHIP_TEAM];
    const schema = {
      "@context": "https://schema.org",
      "@graph": people.map((p) => ({
        "@type": "Person",
        "@id": `https://www.infomist.com/company#${p.slug}`,
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

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div
      id={member.slug}
      className="flex flex-col items-center gap-4 rounded-2xl p-6 bg-white transition-all duration-200 hover:-translate-y-1"
      style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 4px 0 rgba(15,23,42,0.04)" }}
    >
      <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0" style={{ border: "3px solid rgba(14,165,233,0.15)" }}>
        <img
          src={member.image}
          alt={`${member.name}, ${member.role} at Infomist`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center gap-0.5 text-center">
        <h3 className="text-base font-bold text-[#0F172A]">{member.name}</h3>
        <p className="text-sm font-semibold text-[#0EA5E9]">{member.role}</p>
      </div>
    </div>
  );
}

export function OurLeadership() {
  useLeadershipSchema();

  const row1 = LEADERSHIP_TEAM.slice(0, 3);
  const row2 = LEADERSHIP_TEAM.slice(3, 6);
  const row3 = LEADERSHIP_TEAM.slice(6, 7); // last member, centered alone

  return (
    <section id="our-leadership" className="w-full bg-[#F9FAFB] py-24 px-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-14">
        <Reveal className="flex flex-col gap-4 text-center items-center">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#0EA5E9]">Our Leadership</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight" style={{ letterSpacing: "-0.025em" }}>
            The team behind Infomist.
          </h2>
        </Reveal>

        {/* CEO — featured on top */}
        <Reveal className="flex justify-center">
          <div className="w-full max-w-xs">
            <MemberCard member={CEO} />
          </div>
        </Reveal>

        {/* Leadership grid: 3 + 3 + 1 (centered) */}
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {row1.map((m) => <RevealItem key={m.slug}><MemberCard member={m} /></RevealItem>)}
        </RevealGroup>
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {row2.map((m) => <RevealItem key={m.slug}><MemberCard member={m} /></RevealItem>)}
        </RevealGroup>
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="hidden sm:block" aria-hidden="true" />
          {row3.map((m) => <RevealItem key={m.slug}><MemberCard member={m} /></RevealItem>)}
        </RevealGroup>
      </div>
    </section>
  );
}
