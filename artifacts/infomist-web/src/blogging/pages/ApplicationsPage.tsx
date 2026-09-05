import * as React from "react";
import {
  Briefcase,
  Download,
  ExternalLink,
  Loader2,
  Mail,
  Phone,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { PageHeader, EmptyState } from "../components/common";
import { relativeTime, formatDateTime } from "../utils/format";
import {
  APPLICATION_STATUSES,
  STATUS_LABEL,
  cvHref,
  listApplications,
  setApplicationStatus,
  type ApplicationStatus,
  type JobApplication,
} from "@/lib/jobApplications";

const TABS: { value: ApplicationStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  ...APPLICATION_STATUSES.map((s) => ({ value: s, label: STATUS_LABEL[s] })),
];

const BADGE_VARIANT: Record<ApplicationStatus, "default" | "secondary" | "destructive" | "outline"> = {
  new: "default",
  reviewing: "secondary",
  shortlisted: "default",
  rejected: "destructive",
  hired: "default",
};

function StatusSelect({
  value,
  onChange,
  disabled,
}: {
  value: ApplicationStatus;
  onChange: (s: ApplicationStatus) => void;
  disabled?: boolean;
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as ApplicationStatus)} disabled={disabled}>
      <SelectTrigger className="h-8 w-[168px] text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {APPLICATION_STATUSES.map((s) => (
          <SelectItem key={s} value={s} className="text-xs">
            {STATUS_LABEL[s]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function CvButton({ app, className }: { app: JobApplication; className?: string }) {
  return (
    <Button asChild size="sm" variant="outline" className={className}>
      <a href={cvHref(app)} download={`${app.name} — CV.${app.cvExt}`} target="_blank" rel="noreferrer">
        <Download className="h-3.5 w-3.5" />
        CV ({app.cvExt.toUpperCase()})
      </a>
    </Button>
  );
}

export function ApplicationsPage() {
  const [apps, setApps] = React.useState<JobApplication[] | null>(null);
  const [source, setSource] = React.useState<"api" | "local">("api");
  const [tab, setTab] = React.useState<ApplicationStatus | "all">("all");
  const [busyId, setBusyId] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState<JobApplication | null>(null);

  const load = React.useCallback(async () => {
    setApps(null);
    const { source, applications } = await listApplications();
    setSource(source);
    setApps(applications);
  }, []);

  React.useEffect(() => {
    void load();
  }, [load]);

  const changeStatus = async (app: JobApplication, status: ApplicationStatus) => {
    setBusyId(app.id);
    setApps((prev) => prev?.map((a) => (a.id === app.id ? { ...a, status } : a)) ?? prev);
    setOpen((cur) => (cur && cur.id === app.id ? { ...cur, status } : cur));
    try {
      await setApplicationStatus(app.id, status);
      toast.success(`Marked as ${STATUS_LABEL[status]}`);
    } catch {
      toast.error("Could not update status");
      void load();
    } finally {
      setBusyId(null);
    }
  };

  const counts = React.useMemo(() => {
    const c: Record<string, number> = { all: apps?.length ?? 0 };
    for (const a of apps ?? []) c[a.status] = (c[a.status] ?? 0) + 1;
    return c;
  }, [apps]);

  const rows = (apps ?? []).filter((a) => tab === "all" || a.status === tab);

  return (
    <>
      <PageHeader
        title="Applications"
        description="Job applications submitted from the careers pages. CVs are stored with the site data, never in the browser."
      >
        <Button variant="outline" size="sm" onClick={() => void load()}>
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </Button>
      </PageHeader>

      {source === "local" && apps !== null ? (
        <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300">
          Showing applications saved in this browser — the live API isn't reachable from here (expected
          in local dev without the PHP server).
        </p>
      ) : null}

      <Tabs value={tab} onValueChange={(v) => setTab(v as ApplicationStatus | "all")}>
        <TabsList className="flex-wrap">
          {TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value} className="gap-1.5">
              {t.label}
              {counts[t.value] ? (
                <span className="text-xs text-muted-foreground">{counts[t.value]}</span>
              ) : null}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {apps === null ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : rows.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title={tab === "all" ? "No applications yet" : `Nothing marked ${STATUS_LABEL[tab as ApplicationStatus]}`}
          description={
            tab === "all"
              ? "Applications submitted from /careers/<role>/apply will appear here."
              : "Try another status filter."
          }
        />
      ) : (
        <div className="space-y-3">
          {rows.map((app) => (
            <Card key={app.id}>
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-foreground">{app.name}</span>
                    <Badge variant={BADGE_VARIANT[app.status]}>{STATUS_LABEL[app.status]}</Badge>
                    <span className="text-xs text-muted-foreground">· {relativeTime(app.submittedAt)}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {app.jobTitle}
                    </span>
                    <a className="inline-flex items-center gap-1 hover:text-foreground" href={`mailto:${app.email}`}>
                      <Mail className="h-3 w-3" />
                      {app.email}
                    </a>
                    {app.phone ? (
                      <span className="inline-flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {app.phone}
                      </span>
                    ) : null}
                  </div>
                  {app.coverNote ? (
                    <p className="line-clamp-2 pt-0.5 text-sm text-foreground">{app.coverNote}</p>
                  ) : null}
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <StatusSelect
                    value={app.status}
                    disabled={busyId === app.id}
                    onChange={(s) => void changeStatus(app, s)}
                  />
                  <CvButton app={app} />
                  <Button size="sm" variant="ghost" onClick={() => setOpen(app)}>
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-lg">
          {open ? (
            <>
              <DialogHeader>
                <DialogTitle>{open.name}</DialogTitle>
                <DialogDescription>
                  {open.jobTitle} · applied {formatDateTime(open.submittedAt)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-[88px_1fr] gap-x-3 gap-y-2">
                  <span className="text-muted-foreground">Email</span>
                  <a className="truncate font-medium hover:underline" href={`mailto:${open.email}`}>
                    {open.email}
                  </a>
                  {open.phone ? (
                    <>
                      <span className="text-muted-foreground">Phone</span>
                      <span className="font-medium">{open.phone}</span>
                    </>
                  ) : null}
                  {open.link ? (
                    <>
                      <span className="text-muted-foreground">Link</span>
                      <a
                        className="inline-flex items-center gap-1 truncate font-medium text-primary hover:underline"
                        href={open.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {open.link.replace(/^https?:\/\//, "")}
                        <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
                    </>
                  ) : null}
                  <span className="text-muted-foreground">Role</span>
                  <span className="font-medium">
                    {open.jobTitle} <span className="text-muted-foreground">({open.jobSlug})</span>
                  </span>
                </div>

                {open.coverNote ? (
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Note</span>
                    <p className="whitespace-pre-wrap rounded-md border border-border bg-muted/40 p-3 text-foreground">
                      {open.coverNote}
                    </p>
                  </div>
                ) : null}

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                  <StatusSelect
                    value={open.status}
                    disabled={busyId === open.id}
                    onChange={(s) => void changeStatus(open, s)}
                  />
                  <CvButton app={open} />
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
