/** Design reminder — shared Operations Command Deck shell for all internal training routes. */
import { Link, useLocation } from "wouter";
import { BookOpen, BriefcaseBusiness, CircleHelp, Compass, Network, SearchCheck, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

const navigation = [
  { href: "/", label: "Overview", icon: Compass },
  { href: "/field-guide", label: "Field guide", icon: BookOpen },
  { href: "/broker-script", label: "Broker script", icon: BriefcaseBusiness },
  { href: "/categories", label: "Categories", icon: Network },
  { href: "/qualifier", label: "Qualifier", icon: SearchCheck },
  { href: "/objections", label: "Objections", icon: CircleHelp },
];

export default function TrainingShell({ children, eyebrow = "INTERNAL AGENT TRAINING" }: { children: ReactNode; eyebrow?: string }) {
  const [location] = useLocation();
  const activeIndex = Math.max(0, navigation.findIndex((item) => item.href === location));
  const activePage = navigation[activeIndex];
  return <div className="academy-shell">
    <header className="academy-topbar">
      <Link href="/" className="academy-brand" aria-label="Tariff Refund Agent Training home"><img src="/manus-storage/tra-command-mark_11084be6.png" alt="" /><span><strong>Tariff Refund</strong><em>AGENT TRAINING</em></span></Link>
      <nav className="academy-nav" aria-label="Primary training navigation">
        {navigation.map((item) => { const Icon = item.icon; const active = location === item.href; return <Link href={item.href} key={item.href} className={active ? "active" : ""}><Icon size={14} /><span>{item.label}</span></Link>; })}
      </nav>
      <div className="academy-status"><span />AUTHORIZED</div>
    </header>
    <div className="academy-alert"><ShieldCheck size={14} /> <span>{eyebrow}</span><b>Use current approved materials before discussing program, legal, tariff, timing, recovery, fee, or eligibility questions.</b></div>
    <aside className="academy-mission-rail" aria-label="Current training module"><span>MODULE</span><strong>{String(activeIndex + 1).padStart(2, "0")}<i>/ {String(navigation.length).padStart(2, "0")}</i></strong><em>{activePage.label}</em><div><b /></div></aside>
    {children}
    <footer className="academy-footer"><img src="/manus-storage/tra-wordmark-light_c3a94395.png" alt="Tariff Refund Agency" /><p>Internal agent training guidance only. Not legal, customs, tax, financial, or professional advice.</p><a href="#top">Back to top ↑</a></footer>
  </div>;
}
