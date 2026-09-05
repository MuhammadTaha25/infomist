import { useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, CheckCircle2, FileText, Send, UploadCloud, X } from "lucide-react";
import { useMeta } from "@/components/site/useMeta";
import { PageHeroVideo } from "@/components/hero/PageHeroVideo";
import { findJob } from "@/data/careersData";
import {
  submitApplication,
  ApplicationError,
  CV_ACCEPT,
  CV_MAX_BYTES,
} from "@/lib/jobApplications";

const fieldClass =
  "w-full rounded-xl px-4 py-3 text-sm text-[#0F172A] bg-white transition-all duration-150 outline-none placeholder:text-slate-400 border border-slate-200 focus:border-[#0EA5E9] focus:ring-4 focus:ring-[#0EA5E9]/10";

function FieldLabel({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <label className="text-xs font-bold uppercase tracking-widest text-[#475569]">
      {children}
      {required ? <span className="ml-1 text-[#0EA5E9]">*</span> : null}
    </label>
  );
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function ApplyPage() {
  const { slug } = useParams<{ slug: string }>();
  const job = useMemo(() => (slug ? findJob(slug) : null), [slug]);
  const jobTitle = job?.title ?? "General Application";
  const jobSlug = job?.slug ?? "general";

  useMeta(
    `Apply — ${jobTitle} | Careers at Infomist`,
    job
      ? `Apply for the ${job.title} role at Infomist (${job.type}, ${job.location}). Share your details and CV — every application is read by a person.`
      : "Send Infomist a speculative application. Share your details and CV and we'll be in touch when a matching role opens.",
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [link, setLink] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const pickCv = (f: File | null) => {
    setError(null);
    if (f && f.size > CV_MAX_BYTES) {
      setError("That CV is larger than 6 MB — please attach a smaller file.");
      return;
    }
    setCv(f);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!cv) {
      setError("Please attach your CV (PDF or Word).");
      return;
    }
    setSubmitting(true);
    try {
      await submitApplication({
        jobSlug,
        jobTitle,
        name,
        email,
        phone,
        link,
        coverNote,
        cv,
      });
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(
        err instanceof ApplicationError
          ? err.message
          : "Something went wrong sending your application. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const breadcrumb = (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
      <Link href="/careers" className="hover:text-[#27C7E8] transition-colors duration-150 font-medium">
        Careers
      </Link>
      <span aria-hidden="true">/</span>
      {job ? (
        <>
          <Link
            href={`/careers/${job.slug}`}
            className="hover:text-[#27C7E8] transition-colors duration-150 font-medium"
          >
            {job.title}
          </Link>
          <span aria-hidden="true">/</span>
        </>
      ) : null}
      <span className="text-[#F4F8FC] font-semibold">Apply</span>
    </nav>
  );

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <PageHeroVideo
        compact
        breadcrumb={breadcrumb}
        eyebrow={job ? `Apply · ${job.type}` : "Apply · Speculative"}
        title={job ? `Apply for ${job.title}` : "Send a speculative application"}
        sub={
          job
            ? `${job.summary} Share your details and CV below — every application is read by a person, and we reply either way.`
            : "No open role is a perfect fit? Send your details and CV anyway. We keep applications on file and reach out when something matching opens up."
        }
        primary={{ label: "Go to the form", href: "#application-form" }}
        secondary={job ? { label: "Back to role", href: `/careers/${job.slug}` } : { label: "See open roles", href: "/careers" }}
        media="hero-team"
      />

      <section id="application-form" className="w-full scroll-mt-24" style={{ background: "#FFFFFF" }}>
        <div className="max-w-2xl mx-auto px-6 py-16 md:py-20">
          {done ? (
            <div
              className="flex flex-col items-center gap-4 rounded-3xl p-10 md:p-12 text-center"
              style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(132,204,22,0.12)" }}>
                <CheckCircle2 size={28} color="#65A30D" />
              </div>
              <h2 className="text-2xl font-black text-[#0F172A]">Application received.</h2>
              <p className="text-[#475569] max-w-sm leading-relaxed">
                Thanks, {name.split(" ")[0] || "there"} — your application for{" "}
                <span className="font-semibold text-[#0F172A]">{jobTitle}</span> is in. We read every
                one and will get back to you, usually within a week.
              </p>
              <Link
                href="/careers"
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#0EA5E9] hover:underline"
              >
                <ArrowLeft size={15} strokeWidth={2.4} />
                Back to all positions
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8 flex flex-col gap-2">
                <h2 className="text-2xl md:text-3xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.02em" }}>
                  Your application
                </h2>
                <p className="text-sm text-[#64748B]">
                  Applying for <span className="font-semibold text-[#0F172A]">{jobTitle}</span>
                  {job ? ` · ${job.type} · ${job.location}` : ""}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 rounded-3xl p-8 md:p-10"
                style={{ border: "1px solid #E2E8F0", boxShadow: "0 4px 24px 0 rgba(15,23,42,0.05)" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <FieldLabel required>Full name</FieldLabel>
                    <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={fieldClass} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <FieldLabel required>Email</FieldLabel>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className={fieldClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <FieldLabel>Phone</FieldLabel>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92 300 0000000" className={fieldClass} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <FieldLabel>Portfolio / LinkedIn / GitHub</FieldLabel>
                    <input type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://" className={fieldClass} />
                  </div>
                </div>

                {/* CV upload */}
                <div className="flex flex-col gap-2">
                  <FieldLabel required>CV / Résumé</FieldLabel>
                  <input
                    ref={fileInput}
                    type="file"
                    accept={CV_ACCEPT}
                    className="sr-only"
                    onChange={(e) => pickCv(e.target.files?.[0] ?? null)}
                  />
                  {cv ? (
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <FileText size={18} className="text-[#0EA5E9] shrink-0" />
                      <span className="flex-1 min-w-0 truncate text-sm text-[#0F172A]">{cv.name}</span>
                      <span className="text-xs text-slate-400">{formatBytes(cv.size)}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setCv(null);
                          if (fileInput.current) fileInput.current.value = "";
                        }}
                        className="rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                        aria-label="Remove file"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInput.current?.click()}
                      className="flex items-center justify-center gap-2.5 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm font-semibold text-[#475569] transition-colors hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
                    >
                      <UploadCloud size={18} />
                      Upload PDF or Word — up to 6 MB
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <FieldLabel>Anything you want us to know</FieldLabel>
                  <textarea
                    rows={5}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="A short note on why this role, what you've built, notice period, salary expectation…"
                    className={fieldClass + " resize-none"}
                  />
                </div>

                <label className="flex items-start gap-3 text-sm text-[#475569]">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0EA5E9] focus:ring-[#0EA5E9]"
                  />
                  <span>
                    I agree that Infomist may store and process the information in this form to
                    consider me for this and future roles.
                  </span>
                </label>

                {error ? (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 border border-red-100">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center justify-center gap-2 mt-1 px-7 py-4 rounded-xl text-sm font-bold text-white transition-all duration-300 self-start hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-8px_rgba(14,165,233,0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(120deg, #0EA5E9, #0284C7)", boxShadow: "0 10px 28px -8px rgba(14,165,233,0.4)" }}
                >
                  {submitting ? "Sending…" : "Submit application"}
                  <Send size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </form>

              <Link
                href={job ? `/careers/${job.slug}` : "/careers"}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] hover:text-[#0EA5E9] transition-colors duration-150"
              >
                <ArrowLeft size={15} strokeWidth={2.4} />
                {job ? "Back to role" : "Back to all positions"}
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
