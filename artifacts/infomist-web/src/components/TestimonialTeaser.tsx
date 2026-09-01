import { ClientImpactSlider } from "@/components/ClientImpactSlider";

export function TestimonialTeaser() {
  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">

        {/* Guru link */}
        <div className="flex justify-center md:justify-start">
          <a
            href="https://www.guru.com/freelancers/infomist/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#84CC16] hover:text-[#65A30D] transition-colors duration-150 group"
          >
            Read verified reviews on Guru.com
            <svg className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6m0 0v6m0-6-9 9" />
            </svg>
          </a>
        </div>

        {/* 3D Coverflow slider */}
        <ClientImpactSlider />

      </div>
    </section>
  );
}
