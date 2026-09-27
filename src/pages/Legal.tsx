import { PageHeader } from "./PageHeader";

const CONTENT = {
  privacy: {
    title: "Privacy",
    intro: "We collect only what's needed to reunite people with their belongings.",
    points: [
      "Reports show your first name, role and department — never your phone number or email.",
      "Messages between students are relayed through the platform.",
      "Hidden details you add to a found-item report are used only to verify claims.",
      "You can ask the campus Lost & Found desk to remove a report at any time.",
    ],
  },
  terms: {
    title: "Terms",
    intro: "A few ground rules that keep the community useful and safe.",
    points: [
      "Post only genuine lost or found reports for items on campus.",
      "Hand over items in person, preferably at a staffed help desk.",
      "Don't request payment or rewards for returning items.",
      "Valuables and ID documents should also be deposited with campus security.",
    ],
  },
} as const;

export default function Legal({ page }: { page: keyof typeof CONTENT }) {
  const c = CONTENT[page];
  return (
    <>
      <PageHeader eyebrow="Policies" title={c.title} description={c.intro} />
      <div className="container pb-20">
        <ul className="grid max-w-2xl gap-3">
          {c.points.map((p) => (
            <li key={p} className="rounded-2xl border bg-card p-4 text-foreground/85 shadow-soft">{p}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
