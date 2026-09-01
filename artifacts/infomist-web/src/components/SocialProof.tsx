import { Reveal } from "@/components/Reveal";

export function SocialProof() {
  return (
    <section className="w-full border-y border-slate-200 bg-slate-50">
      <Reveal className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3">

        <div className="relative flex flex-col items-center justify-center gap-2 px-10 py-10 text-center">
          <p
            className="text-5xl font-black text-[#0F172A] leading-none"
            style={{ letterSpacing: "-0.05em" }}
          >
            $1.5M+
          </p>
          <p className="text-sm text-[#475569] leading-snug max-w-[180px]">
            Verified B2B Revenue Generated
          </p>
          <div className="absolute right-0 top-8 bottom-8 w-px bg-slate-200 hidden md:block" />
        </div>

        <div className="relative flex flex-col items-center justify-center gap-2 px-10 py-10 text-center">
          <div className="flex items-baseline gap-2">
            <p className="text-5xl font-black text-[#0F172A] leading-none" style={{ letterSpacing: "-0.05em" }}>
              4.9
            </p>
            <p className="text-3xl font-black text-[#0F172A] leading-none" style={{ letterSpacing: "-0.04em" }}>
              /5
            </p>
          </div>
          <div className="flex items-center gap-0.5" aria-label="4.9 out of 5 stars">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                {i <= 4 ? (
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill="#84CC16"
                  />
                ) : (
                  <>
                    <defs>
                      <linearGradient id="star-partial" x1="0%" x2="100%">
                        <stop offset="90%" stopColor="#84CC16" />
                        <stop offset="90%" stopColor="#E2E8F0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      fill="url(#star-partial)"
                    />
                  </>
                )}
              </svg>
            ))}
          </div>
          <p className="text-sm text-[#475569] leading-snug max-w-[200px]">
            Based on hundreds of enterprise reviews on Guru.com
          </p>
          <div className="absolute right-0 top-8 bottom-8 w-px bg-slate-200 hidden md:block" />
        </div>

        <div className="flex flex-col items-center justify-center gap-2 px-10 py-10 text-center">
          <p className="text-5xl font-black text-[#0F172A] leading-none" style={{ letterSpacing: "-0.05em" }}>
            25+
          </p>
          <p className="text-sm text-[#475569] leading-snug max-w-[180px]">
            Years of Engineering &amp; Automation Excellence
          </p>
        </div>

      </Reveal>
    </section>
  );
}
