import * as React from "react";
import { useParams, useLocation } from "wouter";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { Settings } from "../types";
import { useSettings, useAuthors, useCategories, useBlogging } from "../store";
import { PageHeader } from "../components/common";

const SECTIONS = ["general", "writing", "publishing", "media", "seo", "comments"];

export function SettingsPage() {
  const params = useParams();
  const [, navigate] = useLocation();
  const settings = useSettings();
  const authors = useAuthors();
  const categories = useCategories();
  const { dispatch } = useBlogging();

  const section = SECTIONS.includes(params.section ?? "") ? params.section! : "general";

  const patch = (p: Partial<Settings>) => dispatch({ type: "settings/update", patch: p });

  return (
    <>
      <PageHeader title="Settings" description="Blog configuration. All values are frontend/demo only.">
        <Button
          variant="outline"
          onClick={() => {
            if (window.confirm("Reset ALL blogging data (posts, authors, media…) to the demo seed?")) {
              dispatch({ type: "reset" });
              toast.success("Blogging data reset to demo seed");
            }
          }}
        >
          <RotateCcw /> Reset demo data
        </Button>
      </PageHeader>

      <Tabs value={section} onValueChange={(v) => navigate(`/settings/${v}`)}>
        <TabsList className="flex-wrap">
          {SECTIONS.map((s) => (
            <TabsTrigger key={s} value={s} className="capitalize">
              {s}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="general">
          <SettingsCard>
            <Field label="Blog name">
              <Input value={settings.general.blogName} onChange={(e) => patch({ general: { ...settings.general, blogName: e.target.value } })} />
            </Field>
            <Field label="Blog description">
              <Textarea
                value={settings.general.blogDescription}
                onChange={(e) => patch({ general: { ...settings.general, blogDescription: e.target.value } })}
              />
            </Field>
            <Field label="Default author">
              <Select
                value={settings.general.defaultAuthorId}
                onValueChange={(v) => patch({ general: { ...settings.general, defaultAuthorId: v } })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {authors.map((a) => (
                    <SelectItem key={a.id} value={a.id}>{a.displayName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Default category">
              <Select
                value={settings.general.defaultCategoryId}
                onValueChange={(v) => patch({ general: { ...settings.general, defaultCategoryId: v } })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </SettingsCard>
        </TabsContent>

        <TabsContent value="writing">
          <SettingsCard>
            <Toggle
              label="Autosave"
              hint="Continuously store edits to local state"
              checked={settings.writing.autosave}
              onChange={(v) => patch({ writing: { ...settings.writing, autosave: v } })}
            />
            <Field label="Default editor">
              <Select value={settings.writing.defaultEditor} onValueChange={() => undefined}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="block">Block editor</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </SettingsCard>
        </TabsContent>

        <TabsContent value="publishing">
          <SettingsCard>
            <Toggle
              label="Approval required before publishing"
              hint="Posts must pass Pending Review before they can go live"
              checked={settings.publishing.approvalRequired}
              onChange={(v) => patch({ publishing: { ...settings.publishing, approvalRequired: v } })}
            />
            <Field label="Default status for new posts">
              <Select
                value={settings.publishing.defaultStatus}
                onValueChange={(v) => patch({ publishing: { ...settings.publishing, defaultStatus: v as Settings["publishing"]["defaultStatus"] } })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </SettingsCard>
        </TabsContent>

        <TabsContent value="media">
          <SettingsCard>
            <Field label={`Max image width — ${settings.media.maxWidth}px`}>
              <Slider
                value={[settings.media.maxWidth]}
                min={800}
                max={2560}
                step={80}
                onValueChange={([v]) => patch({ media: { ...settings.media, maxWidth: v } })}
              />
            </Field>
            <Field label={`Compression — ${settings.media.compression}%`}>
              <Slider
                value={[settings.media.compression]}
                min={40}
                max={100}
                step={1}
                onValueChange={([v]) => patch({ media: { ...settings.media, compression: v } })}
              />
            </Field>
            <Toggle
              label="Generate WebP / AVIF"
              checked={settings.media.webp}
              onChange={(v) => patch({ media: { ...settings.media, webp: v } })}
            />
          </SettingsCard>
        </TabsContent>

        <TabsContent value="seo">
          <SettingsCard>
            <Field label="Default meta title template">
              <Input
                value={settings.seo.titleTemplate}
                onChange={(e) => patch({ seo: { ...settings.seo, titleTemplate: e.target.value } })}
              />
            </Field>
            <Field label="Canonical base URL">
              <Input
                value={settings.seo.canonicalBase}
                onChange={(e) => patch({ seo: { ...settings.seo, canonicalBase: e.target.value } })}
              />
            </Field>
            <Field label="Robots directive">
              <Input value={settings.seo.robots} onChange={(e) => patch({ seo: { ...settings.seo, robots: e.target.value } })} />
            </Field>
            <Toggle
              label="Include blog in sitemap"
              checked={settings.seo.sitemap}
              onChange={(v) => patch({ seo: { ...settings.seo, sitemap: v } })}
            />
          </SettingsCard>
        </TabsContent>

        <TabsContent value="comments">
          <SettingsCard>
            <Toggle
              label="Enable comments"
              checked={settings.comments.enabled}
              onChange={(v) => patch({ comments: { ...settings.comments, enabled: v } })}
            />
            <Toggle
              label="Hold new comments for moderation"
              checked={settings.comments.moderate}
              onChange={(v) => patch({ comments: { ...settings.comments, moderate: v } })}
            />
          </SettingsCard>
        </TabsContent>
      </Tabs>
    </>
  );
}

function SettingsCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="mt-4 max-w-2xl">
      <CardContent className="space-y-4 p-6">{children}</CardContent>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
