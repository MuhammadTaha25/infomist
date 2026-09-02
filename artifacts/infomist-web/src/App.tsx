import { Router, Route, Switch, Redirect, useParams } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { HomePage } from "@/pages/Home";
import { SolutionsPage } from "@/pages/Solutions";
import { CaseStudiesPage } from "@/pages/CaseStudies";
import { CaseStudyDetailPage } from "@/pages/CaseStudyDetail";
import { OneManCompanyPage } from "@/pages/OneManCompany";
import { AboutPage } from "@/pages/About";
import { LeadershipPage } from "@/pages/Leadership";
import { CareersPage } from "@/pages/Careers";
import { JobDetailPage } from "@/pages/JobDetail";
import { ContactPage } from "@/pages/Contact";
import { TalkToStrategistPage } from "@/pages/TalkToStrategist";
import { ResourcesPage } from "@/pages/Resources";
import { SolutionsDirectoryPage } from "@/pages/SolutionsDirectory";
import { SubcategoryPage } from "@/pages/SubcategoryPage";
import { CategoryPage } from "@/pages/CategoryPage";
import { WhoWeWorkWithPage } from "@/pages/WhoWeWorkWithPage";
import { PersonaPage } from "@/pages/PersonaPage";
import { InsightDetailPage } from "@/pages/InsightDetail";
import { CATEGORIES } from "@/data/solutionsData";
import { ScrollToTop } from "@/components/ScrollToTop";
import { BloggingApp } from "@/blogging/BloggingApp";

const queryClient = new QueryClient();
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Routes /solutions/:slug to CategoryPage or SubcategoryPage based on slug.
 *
 * The key={slug} on each child forces a full unmount+remount whenever the slug
 * changes. Without it, navigating from one category to another (or one
 * subcategory to another) keeps the same component instance alive — stale FAQ
 * accordion state persists and useMeta updates lag by one render.
 */
function SolutionsRouter() {
  const { slug } = useParams<{ slug: string }>();
  const isCategory = slug ? CATEGORIES.some((c) => c.slug === slug) : false;
  if (isCategory) return <CategoryPage key={slug} />;
  return <SubcategoryPage key={slug} />;
}

/** Keyed remount on slug change — same rationale as SolutionsRouter above. */
function JobDetailRouter() {
  const { slug } = useParams<{ slug: string }>();
  return <JobDetailPage key={slug} />;
}

/** Keyed remount so per-project meta/content resets between case studies. */
function CaseStudyRouter() {
  const { slug } = useParams<{ slug: string }>();
  return <CaseStudyDetailPage key={slug} />;
}

/** Keyed remount so per-article state (meta, content) resets between insights. */
function InsightRouter() {
  const { slug } = useParams<{ slug: string }>();
  return <InsightDetailPage key={slug} />;
}

function NotFound() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center gap-6 pt-20">
      <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#0EA5E9]">404</span>
      <h1 className="text-5xl font-black text-[#0F172A]" style={{ letterSpacing: "-0.03em" }}>Page not found.</h1>
      <p className="text-[#475569]">The page you're looking for doesn't exist.</p>
      <a href={base + "/"} className="px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "#0EA5E9" }}>
        Back to Home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router base={base}>
        <Switch>
          <Route path="/blogging" nest>
            <BloggingApp />
          </Route>
          <Route>
            <MarketingSite />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

function MarketingSite() {
  return (
    <>
        <ScrollToTop />
        <div className="w-full min-h-screen bg-white font-sans">
          <NavBar />
          <main>
            <Switch>
              <Route path="/" component={HomePage} />
              <Route path="/solutions" component={SolutionsPage} />
              <Route path="/case-studies" component={CaseStudiesPage} />
              <Route path="/case-studies/:slug" component={CaseStudyRouter} />
              <Route path="/one-man-company" component={OneManCompanyPage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/leadership" component={LeadershipPage} />
              <Route path="/careers" component={CareersPage} />
              <Route path="/careers/:slug" component={JobDetailRouter} />
              {/* Legacy route — kept so old links / bookmarks resolve. */}
              <Route path="/company">{() => <Redirect to="/about" />}</Route>
              <Route path="/who-we-work-with" component={WhoWeWorkWithPage} />
              <Route path="/who-we-work-with/:slug" component={PersonaPage} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/talk-to-strategist" component={TalkToStrategistPage} />
              <Route path="/resources" component={ResourcesPage} />
              <Route path="/insights" >{() => <Redirect to="/resources" />}</Route>
              <Route path="/insights/:slug" component={InsightRouter} />
              <Route path="/solutions-directory" component={SolutionsDirectoryPage} />
              {/* /solutions/:slug routes to CategoryPage or SubcategoryPage via SolutionsRouter */}
              <Route path="/solutions/:slug" component={SolutionsRouter} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </div>
    </>
  );
}
