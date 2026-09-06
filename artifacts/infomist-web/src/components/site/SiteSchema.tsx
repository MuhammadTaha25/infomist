import { JsonLd } from "@/components/site/Faq";

const SITE = "https://www.infomist.com";

/**
 * Site-wide Organization + WebSite structured data. Mounted once in the
 * marketing layout so every page carries it; page-level JsonLd (Service,
 * FAQPage, Article, BreadcrumbList, …) is added on top per route.
 */
export function SiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${SITE}/#organization`,
            name: "Infomist",
            url: SITE,
            logo: `${SITE}/infomist-software-development-company-logo.png`,
            description:
              "Infomist is an AI transformation and intelligent systems partner. We design, engineer and operate secure AI systems, enterprise software and automated workflows.",
            slogan: "AI systems that run the work behind your business.",
            foundingDate: "2001",
            address: [
              {
                "@type": "PostalAddress",
                streetAddress: "DHA Phase 1",
                addressLocality: "Islamabad",
                addressCountry: "PK",
              },
              {
                "@type": "PostalAddress",
                addressLocality: "Dublin",
                addressCountry: "IE",
              },
            ],
            areaServed: "Worldwide",
          },
          {
            "@type": "WebSite",
            "@id": `${SITE}/#website`,
            url: SITE,
            name: "Infomist",
            publisher: { "@id": `${SITE}/#organization` },
          },
        ],
      }}
    />
  );
}
