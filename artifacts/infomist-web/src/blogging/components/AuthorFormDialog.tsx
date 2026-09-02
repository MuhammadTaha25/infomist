import * as React from "react";
import { UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import type { Author } from "../types";
import { useBlogging, uid } from "../store";
import { avatarDataUri } from "../utils/placeholder";

const EMPTY = (): Author => ({
  id: "",
  name: "",
  displayName: "",
  email: "",
  avatar: "",
  bio: "",
  role: "Author",
  jobTitle: "",
  expertise: [],
  social: {},
  status: "active",
});

export function AuthorFormDialog({
  open,
  onOpenChange,
  author,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  author?: Author | null;
  onSaved?: (id: string) => void;
}) {
  const { dispatch } = useBlogging();
  const [form, setForm] = React.useState<Author>(EMPTY());
  const fileRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) setForm(author ? { ...author } : EMPTY());
  }, [open, author]);

  const set = (patch: Partial<Author>) => setForm((f) => ({ ...f, ...patch }));
  const setSocial = (patch: Partial<Author["social"]>) => setForm((f) => ({ ...f, social: { ...f.social, ...patch } }));

  function pickAvatar(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set({ avatar: typeof reader.result === "string" ? reader.result : "" });
    reader.readAsDataURL(file);
  }

  function save() {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    const finalAuthor: Author = {
      ...form,
      id: form.id || uid("au"),
      displayName: form.displayName || form.name,
      avatar: form.avatar || avatarDataUri(form.name),
    };
    if (author) dispatch({ type: "author/update", id: finalAuthor.id, patch: finalAuthor });
    else dispatch({ type: "author/create", author: finalAuthor });
    toast.success(author ? "Author updated" : "Author added");
    onSaved?.(finalAuthor.id);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" /> {author ? "Edit author" : "Add author"}
          </DialogTitle>
          <DialogDescription>Frontend-only — this does not create a login.</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-3">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Basic information</p>
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarImage src={form.avatar || avatarDataUri(form.name || "A")} alt="" />
                <AvatarFallback>{(form.name || "A").slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()}>
                  Profile image
                </Button>
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => pickAvatar(e.target.files)} />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Full name">
                <Input value={form.name} onChange={(e) => set({ name: e.target.value })} />
              </Field>
              <Field label="Display name">
                <Input
                  value={form.displayName}
                  onChange={(e) => set({ displayName: e.target.value })}
                  placeholder={form.name}
                />
              </Field>
              <Field label="Email">
                <Input type="email" value={form.email} onChange={(e) => set({ email: e.target.value })} />
              </Field>
              <Field label="Status">
                <Select value={form.status} onValueChange={(v) => set({ status: v as Author["status"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field label="Short bio">
              <Textarea value={form.bio} onChange={(e) => set({ bio: e.target.value })} className="min-h-[70px]" />
            </Field>

            <p className="pt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Professional</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Role">
                <Select value={form.role} onValueChange={(v) => set({ role: v as Author["role"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Author">Author</SelectItem>
                    <SelectItem value="Contributor">Contributor</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Job title">
                <Input value={form.jobTitle} onChange={(e) => set({ jobTitle: e.target.value })} />
              </Field>
              <Field label="Expertise (comma-separated)">
                <Input
                  value={form.expertise.join(", ")}
                  onChange={(e) => set({ expertise: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                />
              </Field>
            </div>

            <p className="pt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Social links</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Website"><Input value={form.social.website ?? ""} onChange={(e) => setSocial({ website: e.target.value })} /></Field>
              <Field label="LinkedIn"><Input value={form.social.linkedin ?? ""} onChange={(e) => setSocial({ linkedin: e.target.value })} /></Field>
              <Field label="X"><Input value={form.social.x ?? ""} onChange={(e) => setSocial({ x: e.target.value })} /></Field>
              <Field label="Facebook"><Input value={form.social.facebook ?? ""} onChange={(e) => setSocial({ facebook: e.target.value })} /></Field>
              <Field label="Instagram"><Input value={form.social.instagram ?? ""} onChange={(e) => setSocial({ instagram: e.target.value })} /></Field>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={save}>Save author</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
