/**
 * CHROMATIC PORT AUTHORITY — NAVY/GOLD REFERENCE EDITION
 * Deep Atlantic navy, opportunity-gold signals, oversized editorial type,
 * numbered chapter language, asymmetric route-map layouts, and pointer-reactive glow.
 */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Calculator,
  Check,
  ChevronRight,
  CircleDot,
  Eye,
  FileCheck2,
  Landmark,
  Layers3,
  LockKeyhole,
  Network,
  Play,
  Rocket,
  Route,
  ScanLine,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Waypoints,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";

const assetPath = (filename: string) => `${import.meta.env.BASE_URL}assets/${filename}`;

const assets = {
  logo: assetPath("trsg-icon-gateway.webp"),
  video: assetPath("tariff-refunds-partner-presentation.mp4"),
  chapters: [
    assetPath("partner-chapter-01.webp"),
    assetPath("partner-chapter-02.webp"),
    assetPath("partner-chapter-03.webp"),
    assetPath("partner-chapter-04.webp"),
    assetPath("partner-chapter-05.webp"),
    assetPath("partner-chapter-06.webp"),
  ],
  master: assetPath("tariff-refunds-partner-hero.webp"),
  brokerRoute: assetPath("tariff-refunds-broker-route.webp"),
  partnerValue: assetPath("tariff-refunds-partner-value.webp"),
};

const signupLinks = {
  broker: "https://tariffsolutionsgroup.com/brokers/signup?ref=ceo",
  partner: "https://tariffsolutionsgroup.com/login?tab=signup&ref=ceo",
};

type IconType = typeof BriefcaseBusiness;

type Audience = {
  id: string;
  route: string;
  label: string;
  kicker: string;
  promise: string;
  short: string;
  accent: string;
  rgb: string;
  icon: IconType;
  link: string;
  cta: string;
  proof: string[];
};

const audiences: Audience[] = [
  {
    id: "brokers",
    route: "01",
    label: "Customs brokers",
    kicker: "Add the service. Keep the relationship.",
    promise:
      "Offer a recovery pathway without adding a new department. Your brand and client relationship remain central.",
    short: "A recovery desk without new headcount.",
    accent: "#ff7a2f",
    rgb: "255, 122, 47",
    icon: BriefcaseBusiness,
    link: signupLinks.broker,
    cta: "Launch a broker alliance",
    proof: ["Co-brand or white-label", "Protected entry relationships", "Specialist workflow support"],
  },
  {
    id: "cpas",
    route: "02",
    label: "CPAs & advisors",
    kicker: "Bring recovery intelligence into the advisory room.",
    promise:
      "Help importer clients explore a time-sensitive recovery pathway through a specialized, documented process.",
    short: "A new value conversation for importer clients.",
    accent: "#b7f236",
    rgb: "183, 242, 54",
    icon: Calculator,
    link: signupLinks.partner,
    cta: "Activate an advisory alliance",
    proof: ["No tariff expertise required", "Compliant education tools", "Tracked introductions"],
  },
  {
    id: "chambers",
    route: "03",
    label: "Chambers & associations",
    kicker: "Turn member education into measurable member value.",
    promise:
      "Give importer members a trusted education and assessment pathway without operating the recovery process internally.",
    short: "A relevant member-value program, ready to activate.",
    accent: "#ff4fbd",
    rgb: "255, 79, 189",
    icon: Landmark,
    link: signupLinks.partner,
    cta: "Build a member alliance",
    proof: ["Member-ready education", "Co-branded pathway", "Centralized specialist support"],
  },
  {
    id: "agents",
    route: "04",
    label: "Professional agents",
    kicker: "Add a high-value introduction to the relationships you manage.",
    promise:
      "Lead with compliant talking points, specialist support, custom attribution, and a process built for warm introductions.",
    short: "A stronger reason to re-enter the conversation.",
    accent: "#5278ff",
    rgb: "82, 120, 255",
    icon: UsersRound,
    link: signupLinks.partner,
    cta: "Open an agent route",
    proof: ["Custom partner tracking", "Ready-to-use enablement", "Relationship-first coordination"],
  },
  {
    id: "entrepreneurs",
    route: "05",
    label: "Entrepreneurs",
    kicker: "Build a strategic-introduction engine around importer relationships.",
    promise:
      "Use a structured partner program, branded education, and transparent attribution to activate qualified introductions.",
    short: "A focused alliance business with a supported backend.",
    accent: "#ffc52f",
    rgb: "255, 197, 47",
    icon: Rocket,
    link: signupLinks.partner,
    cta: "Start an entrepreneur route",
    proof: ["Structured partner pathway", "Clear attribution", "Specialist process behind you"],
  },
];

const sections = [
  { id: "top", label: "Network open", number: "00" },
  { id: "routes", label: "Alliance routes", number: "01" },
  { id: "system", label: "The system", number: "02" },
  { id: "value", label: "Partner value", number: "03" },
  { id: "protect", label: "Protection", number: "04" },
  { id: "activate", label: "Activation", number: "05" },
  { id: "fit", label: "Find your fit", number: "06" },
  { id: "faq", label: "Questions", number: "07" },
];

function GlowPanel({
  children,
  accent = "#ffc52f",
  rgb = "255, 197, 47",
  className = "",
}: {
  children: ReactNode;
  accent?: string;
  rgb?: string;
  className?: string;
}) {
  const move = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      className={`glow-panel ${className}`}
      onMouseMove={move}
      style={{ "--accent": accent, "--accent-rgb": rgb } as CSSProperties}
    >
      {children}
    </div>
  );
}

function ManifestLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="manifest-label">
      <span className="manifest-index">{index}</span>
      <span>{children}</span>
    </div>
  );
}

function BrandIcon({ className = "" }: { className?: string }) {
  return <img className={className} src={assets.logo} alt="Tariff Refunds Solutions Group icon" />;
}

function SpectrumRail({ labels = false }: { labels?: boolean }) {
  return (
    <div className={`spectrum-rail ${labels ? "with-labels" : ""}`} aria-label="Five strategic alliance routes">
      {audiences.map((audience) => (
        <span key={audience.id} style={{ "--rail-color": audience.accent } as CSSProperties}>
          {labels && <small>{audience.route} / {audience.label}</small>}
        </span>
      ))}
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label="Tariff Refunds Solutions Group home">
        <BrandIcon />
        <span className="brand-copy">
          <strong>TARIFF REFUNDS</strong>
          <small>SOLUTIONS GROUP</small>
        </span>
      </a>
      <nav className="header-nav" aria-label="Primary navigation">
        <a href="#routes">Routes</a>
        <a href="#system">The system</a>
        <a href="#protect">Protection</a>
      </nav>
      <a className="header-cta" href="#fit">
        Find your route <ArrowUpRight size={16} />
      </a>
    </header>
  );
}

function PageRail({ active }: { active: string }) {
  const currentIndex = Math.max(0, sections.findIndex((section) => section.id === active));

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="page-rail" aria-label="Section navigator">
      <button
        className="rail-arrow"
        onClick={() => jump(sections[Math.max(0, currentIndex - 1)].id)}
        aria-label="Previous section"
      >
        <ArrowUp size={15} />
      </button>
      <div className="rail-sections">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => jump(section.id)}
            className={active === section.id ? "active" : ""}
            aria-label={`Go to ${section.label}`}
            aria-current={active === section.id ? "location" : undefined}
          >
            <span>{section.number}</span>
            <strong>{section.label}</strong>
          </button>
        ))}
      </div>
      <button
        className="rail-arrow"
        onClick={() => jump(sections[Math.min(sections.length - 1, currentIndex + 1)].id)}
        aria-label="Next section"
      >
        <ArrowDown size={15} />
      </button>
    </aside>
  );
}

function VideoBriefing() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [chapter, setChapter] = useState(0);

  const playVideo = async () => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    await videoRef.current.play();
  };

  const jumpToChapter = async (index: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = index * 11;
    videoRef.current.muted = false;
    await videoRef.current.play();
  };

  return (
    <div className="video-console">
      <div className="video-frame">
        <div className="video-corner corner-a" />
        <div className="video-corner corner-b" />
        <div className="video-topline">
          <span><CircleDot size={12} /> ALLIANCE BRIEFING / 01:07</span>
          <span>1080P · NARRATED</span>
        </div>
        <video
          ref={videoRef}
          src={assets.video}
          poster={assets.chapters[0]}
          controls
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onTimeUpdate={(event) => setChapter(Math.min(5, Math.floor(event.currentTarget.currentTime / 11)))}
        />
        {!playing && (
          <button className="video-play" onClick={playVideo} aria-label="Play the strategic alliance briefing">
            <span><Play fill="currentColor" size={24} /></span>
            <strong>PLAY THE BRIEFING</strong>
            <small>67 seconds · sound on</small>
          </button>
        )}
      </div>
      <div className="chapter-dock" aria-label="Video chapters">
        {assets.chapters.map((image, index) => (
          <button
            key={image}
            className={chapter === index ? "active" : ""}
            onClick={() => jumpToChapter(index)}
            aria-label={`Play chapter ${index + 1}`}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <img src={image} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="hero section-anchor"
      style={{ "--hero-background-image": `url("${assets.master}")` } as CSSProperties}
    >
      <div className="hero-grid" />
      <div className="hero-orbit orbit-one" />
      <div className="hero-orbit orbit-two" />
      <div className="hero-inner page-shell">
        <div className="hero-copy">
          <ManifestLabel index="00 / 07">NETWORK STATUS / OPEN FOR STRATEGIC ALLIANCES</ManifestLabel>
          <h1>
            Your relationships already <em>open doors.</em>
            <span>Now they can unlock opportunity.</span>
          </h1>
          <p>
            A strategic partnership platform for customs brokers, CPAs, chambers, professional agents,
            and entrepreneurs who serve U.S. importer businesses.
          </p>
          <div className="hero-actions">
            <a className="signal-button" href="#routes">
              Choose your alliance route <ArrowRight size={19} />
            </a>
            <a className="text-link" href="#system">
              See how the system works <ArrowDown size={16} />
            </a>
          </div>
          <div className="hero-trust">
            <span><ShieldCheck size={15} /> Relationship-protected</span>
            <span><FileCheck2 size={15} /> Compliance-first</span>
            <span><Waypoints size={15} /> Tracked introductions</span>
          </div>
        </div>
        <VideoBriefing />
      </div>
      <div className="hero-ticker" aria-hidden="true">
        <span>STRATEGIC ALLIANCE NETWORK</span><i />
        <span>CUSTOMS BROKERS</span><i />
        <span>CPAs</span><i />
        <span>CHAMBERS</span><i />
        <span>PROFESSIONAL AGENTS</span><i />
        <span>ENTREPRENEURS</span>
      </div>
    </section>
  );
}

function AllianceRoutes() {
  return (
    <section id="routes" className="routes-section section-anchor">
      <div className="page-shell">
        <div className="section-intro split-intro">
          <div>
            <ManifestLabel index="01 / 07">CHOOSE YOUR ALLIANCE ROUTE</ManifestLabel>
            <h2>Five pathways.<br /><span>One shared opportunity.</span></h2>
          </div>
          <p>
            Every route is designed around the way you already create value. Move across the network to
            see how the model changes for your role.
          </p>
        </div>
        <SpectrumRail labels />
        <div className="route-grid">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <GlowPanel
                key={audience.id}
                accent={audience.accent}
                rgb={audience.rgb}
                className={`route-card route-card-${index + 1}`}
              >
                <div className="route-line" />
                {index === 0 && (
                  <div className="route-art" aria-hidden="true">
                    <img src={assets.brokerRoute} alt="" />
                  </div>
                )}
                <div className="route-card-head">
                  <span className="route-number">ROUTE {audience.route}</span>
                  <Icon size={25} />
                </div>
                <h3>{audience.label}</h3>
                <strong>{audience.kicker}</strong>
                <p>{audience.promise}</p>
                <a href={audience.link} target="_blank" rel="noreferrer">
                  {audience.cta} <ArrowUpRight size={17} />
                </a>
              </GlowPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SupportedSystem() {
  const modules = [
    { icon: ScanLine, number: "01", title: "Discover", text: "Recognize potential fit inside an existing importer network." },
    { icon: Network, number: "02", title: "Connect", text: "Introduce the business through a tracked or co-branded pathway." },
    { icon: Layers3, number: "03", title: "Coordinate", text: "Specialists organize intake, documents, data review, and handoffs." },
    { icon: Eye, number: "04", title: "Track", text: "Maintain visibility into the opportunity and its next-step status." },
  ];

  return (
    <section id="system" className="system-section section-anchor">
      <div className="page-shell system-layout">
        <div className="system-visual">
          <img src={assets.chapters[2]} alt="A secure, coordinated four-step tariff-refund workflow" />
          <div className="system-badge"><Sparkles size={16} /> SUPPORTED WORKFLOW</div>
        </div>
        <div className="system-copy">
          <ManifestLabel index="02 / 07">THE SUPPORTED SYSTEM</ManifestLabel>
          <h2>The opportunity is complex. <span>The partnership does not have to be.</span></h2>
          <p className="lead">
            Partners do not need to interpret tariff law, analyze every ACE record, predict outcomes, or
            manage filings. The role is to recognize possible fit and make a clean introduction.
          </p>
          <SpectrumRail />
          <div className="system-modules">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <div className="system-module" key={module.title}>
                  <span>{module.number}</span>
                  <Icon size={22} />
                  <div><h3>{module.title}</h3><p>{module.text}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerValue() {
  const valuePoints = [
    ["New service-line potential", "Add a relevant importer conversation without designing the recovery infrastructure."],
    ["Stronger client relevance", "Surface a specialized opportunity that aligns with the relationships you already advise."],
    ["Zero internal buildout", "Use a structured process rather than hiring, training, or building a portal from scratch."],
    ["Transparent attribution", "Route introductions through a dedicated partner pathway built to preserve source visibility."],
  ];

  return (
    <section id="value" className="value-section section-anchor">
      <div className="page-shell">
        <div className="value-heading">
          <ManifestLabel index="03 / 07">WHY THE ALLIANCE WORKS</ManifestLabel>
          <div><h2>Create client value <em>without creating an operations department.</em></h2><SpectrumRail /></div>
        </div>
        <div className="value-board">
          <div className="value-image">
            <img src={assets.partnerValue} alt="Five strategic partner audiences collaborating around a connected importer network" />
            <div className="value-overlay">
              <Route size={22} />
              <span>RELATIONSHIPS IN</span>
              <ArrowRight size={18} />
              <span>SUPPORTED WORKFLOW</span>
              <ArrowRight size={18} />
              <span>CLIENT VALUE OUT</span>
            </div>
          </div>
          <div className="value-points">
            {valuePoints.map(([title, text], index) => (
              <div key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="value-note">
          Partner compensation, where available, depends on the signed agreement, qualified introductions,
          completed outcomes, and applicable program requirements. No compensation is guaranteed.
        </p>
      </div>
    </section>
  );
}

function RelationshipProtection() {
  const protections = [
    { icon: LockKeyhole, title: "Relationship-first", text: "Your role stays visible throughout the introduction and next-step process." },
    { icon: BadgeCheck, title: "Compliance-first language", text: "Education and outreach avoid unsupported promises about eligibility, amounts, or timing." },
    { icon: Building2, title: "Branding flexibility", text: "Broker and strategic-partner pathways can support co-branded positioning where available." },
  ];

  return (
    <section id="protect" className="protect-section section-anchor">
      <div className="protect-backdrop" />
      <div className="page-shell protect-layout">
        <div className="protect-copy">
          <ManifestLabel index="04 / 07">PROTECT THE RELATIONSHIP</ManifestLabel>
          <h2>Your client. Your credibility. <span>Your seat at the table.</span></h2>
          <p className="lead">
            Strategic alliances work only when trust survives the handoff. The model is designed to keep
            the relationship owner connected while specialists handle the recovery workflow.
          </p>
          <SpectrumRail />
          <div className="protection-list">
            {protections.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title}>
                  <Icon size={23} />
                  <span><strong>{item.title}</strong><p>{item.text}</p></span>
                </div>
              );
            })}
          </div>
          <a className="signal-button" href={signupLinks.broker} target="_blank" rel="noreferrer">
            Explore the broker pathway <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="protect-image-wrap">
          <img src={assets.chapters[3]} alt="A protected client relationship at the center of the alliance workflow" />
          <div className="image-tag top">NO UNRELATED CLIENT SOLICITATION</div>
          <div className="image-tag bottom">CO-BRAND OPTIONS / BY AGREEMENT</div>
        </div>
      </div>
    </section>
  );
}

function ActivationSequence() {
  const steps = [
    ["01", "Select your route", "Choose the pathway that matches how you serve importer businesses."],
    ["02", "Align the model", "Review relationship protections, branding preference, and compliant talking points."],
    ["03", "Launch your pathway", "Receive the correct signup route and partner introduction process."],
    ["04", "Activate the network", "Educate potential-fit importers and follow each next step through the program."],
  ];

  return (
    <section id="activate" className="activate-section section-anchor">
      <div className="page-shell">
        <div className="activation-heading">
          <ManifestLabel index="05 / 07">ACTIVATION SEQUENCE</ManifestLabel>
          <h2>From strategic fit to <span>active alliance.</span></h2>
          <p>Four disciplined moves. No new department required.</p>
        </div>
        <SpectrumRail labels />
        <div className="activation-track">
          <div className="activation-line" />
          {steps.map(([number, title, text]) => (
            <div className="activation-step" key={number}>
              <span className="step-number">{number}</span>
              <div className="step-node"><Check size={16} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FitSelector() {
  const [selected, setSelected] = useState(audiences[0]);
  const SelectedIcon = selected.icon;

  return (
    <section id="fit" className="fit-section section-anchor">
      <div className="page-shell">
        <div className="fit-heading">
          <ManifestLabel index="06 / 07">ALLIANCE FIT CHECK</ManifestLabel>
          <h2>Where do you sit in the network?</h2>
          <p>Select the identity closest to your business. This recommends a partner pathway—not importer refund eligibility.</p>
        </div>
        <SpectrumRail labels />
        <div className="fit-console">
          <div className="fit-options" role="tablist" aria-label="Select your partner type">
            {audiences.map((audience) => {
              const Icon = audience.icon;
              return (
                <button
                  key={audience.id}
                  role="tab"
                  aria-selected={selected.id === audience.id}
                  className={selected.id === audience.id ? "active" : ""}
                  onClick={() => setSelected(audience)}
                  style={{ "--option-color": audience.accent, "--option-rgb": audience.rgb } as CSSProperties}
                >
                  <span>{audience.route}</span>
                  <Icon size={20} />
                  <strong>{audience.label}</strong>
                  <ChevronRight size={16} />
                </button>
              );
            })}
          </div>
          <div
            className="fit-result"
            style={{ "--result-color": selected.accent, "--result-rgb": selected.rgb } as CSSProperties}
            role="tabpanel"
          >
            <div className="fit-result-grid" />
            <div className="fit-result-label"><SelectedIcon size={18} /> RECOMMENDED ROUTE / {selected.route}</div>
            <h3>{selected.kicker}</h3>
            <p>{selected.promise}</p>
            <div className="fit-proof">
              {selected.proof.map((item) => <span key={item}><Check size={14} /> {item}</span>)}
            </div>
            <a href={selected.link} target="_blank" rel="noreferrer">
              {selected.cta} <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const questions = [
    {
      q: "Who is the strategic-alliance program designed for?",
      a: "It is designed for customs brokers, CPAs, accounting and advisory firms, chambers of commerce, trade associations, professional agents, consultants, logistics professionals, finance professionals, and entrepreneurs with trusted relationships among U.S. importer businesses.",
    },
    {
      q: "Do I need tariff expertise to participate?",
      a: "No. Partners should not analyze eligibility, promise outcomes, interpret tariff law, or manage filings unless independently licensed and engaged to do so. The partner role is to educate, recognize possible fit, and make a structured introduction.",
    },
    {
      q: "How is my client relationship protected?",
      a: "The partnership model emphasizes clear role definition, visible partner attribution, relationship-first coordination, and no promises beyond the agreed recovery scope. Specific protections and any co-brand or white-label options are governed by the signed partner agreement.",
    },
    {
      q: "What happens after I introduce an importer?",
      a: "The importer enters the appropriate intake pathway. The recovery workflow can then coordinate information collection, documentation, entry-data review, status milestones, and the relevant professional handoffs. Every matter depends on its facts and documentation.",
    },
    {
      q: "Can partners promise a refund, funding, timing, or compensation?",
      a: "No. Eligibility, filing pathways, recovery amounts, funding, timing, approval, and partner compensation depend on specific facts, agreements, documentation, applicable law, and third-party review. None is guaranteed.",
    },
    {
      q: "How is the customs-broker route different?",
      a: "Customs brokers often require deeper client-protection, branding, data, and operational coordination. The broker pathway is built around those concerns and has a dedicated onboarding route separate from the general strategic-partner signup.",
    },
  ];

  return (
    <section id="faq" className="faq-section section-anchor">
      <div className="page-shell faq-layout">
        <div className="faq-side">
          <ManifestLabel index="07 / 07">PARTNER QUESTIONS</ManifestLabel>
          <h2>Clarity before activation.</h2>
          <p>Start with the model, protections, and limits. Then choose the route that fits your business.</p>
          <BrandIcon className="faq-mark" />
        </div>
        <Accordion type="single" collapsible className="faq-accordion">
          {questions.map((item, index) => (
            <AccordionItem key={item.q} value={`item-${index}`}>
              <AccordionTrigger><span>{String(index + 1).padStart(2, "0")}</span>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="final-cta page-shell">
        <div className="final-cta-copy">
          <BrandIcon className="final-mark" />
          <div>
            <span>NETWORK STATUS / OPEN</span>
            <h2>The relationships are already there.<br /><em>Activate the route.</em></h2>
          </div>
        </div>
        <a className="signal-button" href={signupLinks.partner} target="_blank" rel="noreferrer">
          Start the conversation <ArrowUpRight size={19} />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="page-shell footer-main">
        <div className="footer-brand">
          <BrandIcon />
          <div><strong>TARIFF REFUNDS SOLUTIONS GROUP</strong><span>Strategic partnership experience</span></div>
        </div>
        <a href="#top">Return to network open <ArrowUp size={15} /></a>
      </div>
      <div className="page-shell footer-legal">
        <p>
          Tariff Refunds Solutions Group is a strategic-partnership education and introduction experience. It is not CBP,
          U.S. Customs, a government agency, a law firm, an accounting firm, or a customs broker. It does not provide
          legal, tax, accounting, customs-brokerage, or financial advice. Refund eligibility, filing options, timing,
          funding, recovery amounts, and partner compensation depend on specific facts, documentation, agreements,
          applicable law, and third-party review. No refund, approval, funding, timeline, or compensation is guaranteed.
        </p>
        <span>© 2026 Tariff Refunds Solutions Group. Strategic partner concept.</span>
      </div>
    </footer>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -52% 0px", threshold: [0.05, 0.2, 0.45] },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-root">
      <Header />
      <PageRail active={activeSection} />
      <main>
        <Hero />
        <AllianceRoutes />
        <SupportedSystem />
        <PartnerValue />
        <RelationshipProtection />
        <ActivationSequence />
        <FitSelector />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
