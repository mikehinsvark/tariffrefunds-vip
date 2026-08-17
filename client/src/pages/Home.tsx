/**
 * Design reminder — Operations Command Deck: boxed, agent-facing training workspace;
 * Command Navy is the field, Recovery Gold marks decisions, and teal marks active signals.
 */
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Compass,
  Copy,
  FileText,
  Headphones,
  Landmark,
  Menu,
  MessageSquareText,
  Network,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  TriangleAlert,
  UsersRound,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const wordmarkUrl = "/manus-storage/tra-wordmark-light_c3a94395.png";
const commandMarkUrl = "/manus-storage/tra-command-mark_11084be6.png";
const commandHeroUrl = "/manus-storage/tra-command-hero_83c20d99.png";
const qualificationVisualUrl = "/manus-storage/tra-qualification-visual_35bbe34e.png";
const scriptPracticeUrl = "/manus-storage/tra-script-practice_4c640a69.png";
const roleplayRoomUrl = "/manus-storage/tra-roleplay-room_07bb8352.png";

const navItems = [
  { id: "overview", label: "Overview", icon: Compass, kicker: "01" },
  { id: "field-guide", label: "Field guide", icon: Target, kicker: "02" },
  { id: "script", label: "Call script", icon: MessageSquareText, kicker: "03" },
  { id: "broker", label: "Broker path", icon: BriefcaseBusiness, kicker: "04" },
  { id: "categories", label: "Categories", icon: Network, kicker: "05" },
  { id: "qualifier", label: "Qualifier", icon: SearchCheck, kicker: "06" },
  { id: "practice", label: "Practice room", icon: Headphones, kicker: "07" },
];

const fieldSignals = [
  {
    title: "Importer of Record",
    copy: "Start with the business that owns its import process. Ask who is named on import documentation before discussing any next step.",
    icon: Landmark,
  },
  {
    title: "Documentation path",
    copy: "Confirm whether the contact can connect the appropriate finance, operations, or trade resource to the approved review process.",
    icon: FileText,
  },
  {
    title: "Decision access",
    copy: "Look for a responsible owner of import operations, finance, or customs coordination—not a guessed eligibility outcome.",
    icon: UsersRound,
  },
  {
    title: "Safe handoff",
    copy: "When a contact asks a legal, tariff, deadline, funding, or recovery question, route it to current approved resources.",
    icon: ShieldCheck,
  },
];

const businessSteps = [
  {
    num: "01",
    title: "Open with relevance",
    body: "I work with businesses that manage imported products. I am calling to see whether an approved specialist conversation would be relevant for your team.",
  },
  {
    num: "02",
    title: "Ask the signal question",
    body: "Would you be the right person to ask about import operations, or is there someone who oversees customs documentation and inbound purchasing?",
  },
  {
    num: "03",
    title: "Frame the next step",
    body: "If it makes sense, an approved customs and trade professional can review the current process and explain which options may be available based on your facts.",
  },
  {
    num: "04",
    title: "Close with control",
    body: "Would a short introductory review be useful, or would you prefer I send the approved overview for the right person to consider?",
  },
];

const categories = [
  ["Industrial & components", "Recurring inbound parts, equipment, or machinery purchases."],
  ["Consumer products", "Imported finished goods with an operations or supply-chain owner."],
  ["Specialty retail", "Multi-SKU businesses that work closely with procurement partners."],
  ["Manufacturing", "Organizations coordinating imported inputs or production equipment."],
  ["Automotive supply", "Parts-focused operations with established freight and trade workflows."],
  ["Technology hardware", "Teams managing physical product imports and purchasing operations."],
];

function scrollToModule(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CopyCard({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button className="copy-control" onClick={copyText} type="button" aria-label={`Copy ${label}`}>
      {copied ? <Check size={15} /> : <Copy size={15} />}
      {copied ? "Copied" : "Copy wording"}
    </button>
  );
}

function CommandSidebar({ activeId }: { activeId: string }) {
  return (
    <Sidebar collapsible="offcanvas" className="command-sidebar border-r border-white/8 bg-[#071827]">
      <SidebarHeader className="px-5 pt-5 pb-4">
        <a href="#overview" className="brand-lockup" aria-label="Tariff Refund Agency agent training home">
          <img src={commandMarkUrl} alt="" className="brand-mark" />
          <span>
            <strong>Tariff Refund</strong>
            <em>AGENT TRAINING</em>
          </span>
        </a>
        <div className="rail-rule" />
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-3 text-[10px] tracking-[0.18em] text-[#7893a8] uppercase">Training index</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild isActive={activeId === item.id} className="rail-nav-item group rounded-none px-3 py-6 text-[#9ab1c2] hover:bg-white/4 hover:text-white data-[active=true]:bg-[#0d2b3f] data-[active=true]:text-white">
                      <a href={`#${item.id}`}>
                        <span className="nav-sequence">{item.kicker}</span>
                        <Icon size={16} strokeWidth={1.8} />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                    {activeId === item.id && <SidebarMenuBadge className="right-2 bg-transparent text-[#2de1d0]"><span className="active-marker" /></SidebarMenuBadge>}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-5 pb-5">
        <div className="rail-callout">
          <div className="rail-callout-head"><ShieldCheck size={15} /> CURRENT CONTENT</div>
          <p>Use only approved language. Escalate program, legal, eligibility, and funding questions.</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function Home() {
  const [activeId, setActiveId] = useState("overview");
  const [currentBrief, setCurrentBrief] = useState(0);
  const [showCallCard, setShowCallCard] = useState(false);

  const briefSlides = useMemo(
    () => [
      { eyebrow: "Qualification signal", title: "Start with the importer role.", copy: "The most useful first question establishes whether the business manages its own import documentation.", icon: Target },
      { eyebrow: "Conversation map", title: "Discover before you describe.", copy: "Use a compact sequence: role, process, responsible contact, and the safest next action.", icon: Compass },
      { eyebrow: "Safety boundary", title: "Never decide the outcome.", copy: "Approved professionals evaluate current program details. Your job is a clean, respectful handoff.", icon: ShieldCheck },
    ],
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-28% 0px -62% 0px", threshold: [0.08, 0.24, 0.5] }
    );
    navItems.forEach((item) => {
      const target = document.getElementById(item.id);
      if (target) observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <SidebarProvider defaultOpen style={{ "--sidebar-width": "19rem" } as CSSProperties}>
      <CommandSidebar activeId={activeId} />
      <SidebarInset className="bg-[#061725] text-white">
        <header className="mobile-topbar">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-[#dceef5] hover:bg-white/8 hover:text-white" />
            <a href="#overview" className="brand-lockup compact-brand">
              <img src={commandMarkUrl} alt="" className="brand-mark" />
              <span><strong>Tariff Refund</strong><em>AGENT TRAINING</em></span>
            </a>
          </div>
          <span className="topbar-status"><span />AUTHORIZED</span>
        </header>

        <main className="command-stage">
          <section id="overview" className="hero-module scroll-module" style={{ "--hero-image": `url(${commandHeroUrl})` } as CSSProperties}>
            <div className="hero-copy">
              <div className="eyebrow"><span /> AGENT OPPORTUNITY FIELD GUIDE</div>
              <h1>Find the conversations<br />most likely to need a<br /><span>responsible next step.</span></h1>
              <p className="hero-lede">A private operating guide for locating the right contact, leading with compliant discovery, and routing nuanced questions to approved experts.</p>
              <div className="hero-actions">
                <button className="signal-button" type="button" onClick={() => scrollToModule("field-guide")}>Open field guide <ArrowDownRight size={18} /></button>
                <button className="subtle-button" type="button" onClick={() => setShowCallCard(true)}>Open call card <ChevronRight size={17} /></button>
              </div>
              <div className="hero-metrics" aria-label="Training path information">
                <div><b>07</b><span>TRAINING MODULES</span></div>
                <div><b>04</b><span>QUALIFICATION SIGNALS</span></div>
                <div><b>01</b><span>SAFE NEXT ACTION</span></div>
              </div>
            </div>

            <div className="brief-stage">
              <div className="brief-stage-grid" />
              <Carousel opts={{ loop: true }} setApi={(api) => api?.on("select", () => setCurrentBrief(api.selectedScrollSnap()))} className="brief-carousel">
                <CarouselContent>
                  {briefSlides.map((brief, index) => {
                    const Icon = brief.icon;
                    return (
                      <CarouselItem key={brief.title}>
                        <article className="brief-card">
                          <div className="brief-card-top"><span><i /> {brief.eyebrow}</span><b>0{index + 1}</b></div>
                          <div className="signal-orbit" aria-hidden="true"><span className="orbit-dot dot-one" /><span className="orbit-dot dot-two" /><div className="signal-core"><Icon size={33} /><small>THE FOCUS</small></div></div>
                          <h2>{brief.title}</h2>
                          <p>{brief.copy}</p>
                          <div className="brief-progress"><span style={{ width: `${((index + 1) / briefSlides.length) * 100}%` }} /></div>
                        </article>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <div className="carousel-controls">
                  <CarouselPrevious className="brief-arrow border-[#23506b] bg-[#0a273a] text-white hover:bg-[#10354b]" />
                  <span>{String(currentBrief + 1).padStart(2, "0")} / 03</span>
                  <CarouselNext className="brief-arrow border-[#23506b] bg-[#0a273a] text-white hover:bg-[#10354b]" />
                </div>
              </Carousel>
            </div>
          </section>

          <section id="field-guide" className="field-guide-module scroll-module">
            <div className="section-heading split-heading">
              <div><div className="eyebrow teal-eyebrow"><span /> 02 / OPPORTUNITY FIELD GUIDE</div><h2>Use a signal, not a guess.</h2></div>
              <p>Qualification starts with the business process, not a promise. These four markers help an agent choose the appropriate conversation path.</p>
            </div>
            <div className="field-guide-layout">
              <div className="signal-map-wrap"><img src={qualificationVisualUrl} alt="Abstract qualification signal dial" /><div className="map-label label-a">OPEN THE RIGHT CONVERSATION</div><div className="map-label label-b">ROUTE COMPLEX QUESTIONS</div></div>
              <div className="signal-list">
                {fieldSignals.map((signal, index) => {
                  const Icon = signal.icon;
                  return <article className="signal-list-item" key={signal.title}><div className="signal-index">0{index + 1}</div><div className="signal-icon"><Icon size={18} /></div><div><h3>{signal.title}</h3><p>{signal.copy}</p></div></article>;
                })}
              </div>
            </div>
            <div className="notice-bar"><TriangleAlert size={17} /><span><strong>Boundary:</strong> An agent does not determine eligibility, refund value, legal treatment, timing, or funding outcome. Use current approved materials and specialist escalation routes.</span></div>
          </section>

          <section id="script" className="script-module scroll-module">
            <div className="section-heading script-heading"><div><div className="eyebrow gold-eyebrow"><span /> 03 / BUSINESS CONVERSATION</div><h2>Lead a clean discovery<br />conversation.</h2></div><div className="approved-chip"><BadgeCheck size={16} /> APPROVED-LANGUAGE FRAMEWORK</div></div>
            <div className="script-layout">
              <div className="script-visual"><img src={scriptPracticeUrl} alt="Representative reviewing trade-related documents" /><div className="script-visual-copy"><span>THE OBJECTIVE</span><strong>Clarify the path.<br />Do not predict the outcome.</strong></div></div>
              <div className="script-steps">
                {businessSteps.map((step) => <article className="script-step" key={step.num}><span>{step.num}</span><div><h3>{step.title}</h3><p>“{step.body}”</p><CopyCard text={step.body} label={step.title} /></div></article>)}
              </div>
            </div>
          </section>

          <section id="broker" className="broker-module scroll-module">
            <div className="broker-content"><div className="eyebrow teal-eyebrow"><span /> 04 / BROKER PARTNERSHIP PATH</div><h2>Protect the relationship.<br /><span>Clarify the collaboration.</span></h2><p>For broker conversations, lead with respect for the client relationship and describe TRA as a structured partner process. Avoid making program, legal, recovery, timing, or income claims outside current approved materials.</p><div className="broker-points"><div><Check size={16} /> Acknowledge the broker’s client stewardship.</div><div><Check size={16} /> Offer a specialist introduction—not an eligibility conclusion.</div><div><Check size={16} /> Capture questions for approved follow-up.</div></div><button className="dark-outline-button" type="button" onClick={() => scrollToModule("practice")}>Practice a broker scenario <ArrowDownRight size={18} /></button></div>
            <div className="broker-diagram"><div className="broker-node center-node"><BriefcaseBusiness size={22} /><span>BROKER</span></div><div className="broker-node top-node"><UsersRound size={18} /><span>CLIENT RELATIONSHIP</span></div><div className="broker-node bottom-node"><ShieldCheck size={18} /><span>APPROVED SPECIALIST</span></div><div className="connector connector-one" /><div className="connector connector-two" /></div>
          </section>

          <section id="categories" className="categories-module scroll-module">
            <div className="section-heading split-heading"><div><div className="eyebrow teal-eyebrow"><span /> 05 / RESEARCH CATEGORIES</div><h2>Build a relevant prospecting map.</h2></div><p>Use category cues to prioritize research. They are conversation starters, not proof of status or eligibility.</p></div>
            <div className="category-grid">{categories.map(([title, copy], index) => <article className="category-card" key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p><button onClick={() => scrollToModule("qualifier")} type="button">View questions <ArrowUpRight size={16} /></button></article>)}</div>
          </section>

          <section id="qualifier" className="qualifier-module scroll-module">
            <div className="qualifier-copy"><div className="eyebrow gold-eyebrow"><span /> 06 / 60-SECOND QUALIFIER</div><h2>A short screen.<br />A clear handoff.</h2><p>Use this sequence to organize a responsible introduction. Stop and escalate when the conversation becomes legal, financial, tariff-specific, deadline-specific, or outcome-specific.</p><div className="qualifier-actions"><button className="signal-button" type="button" onClick={() => setShowCallCard(true)}>Open call card <ChevronRight size={17} /></button><button className="subtle-button" type="button" onClick={() => scrollToModule("practice")}>Go to practice <Headphones size={16} /></button></div></div>
            <ol className="qualifier-steps"><li><span>01</span><div><h3>Role</h3><p>Who oversees import operations, purchasing, customs, or inbound documentation?</p></div></li><li><span>02</span><div><h3>Process</h3><p>Does the company manage imported goods or coordinate with a customs professional?</p></div></li><li><span>03</span><div><h3>Permission</h3><p>Would an approved specialist introduction be useful for the right contact to consider?</p></div></li><li><span>04</span><div><h3>Route</h3><p>Select the approved resource, document the requested follow-up, and escalate specific questions.</p></div></li></ol>
          </section>

          <section id="practice" className="practice-module scroll-module">
            <div className="practice-image"><img src={roleplayRoomUrl} alt="Two professionals practicing a structured business conversation" /><div className="image-overlay" /><div className="practice-image-label"><ShieldCheck size={15} /> SECURE REVIEW ROOM</div></div>
            <div className="practice-copy"><div className="eyebrow teal-eyebrow"><span /> 07 / PRACTICE ROOM</div><h2>Train the conversation<br />before the conversation.</h2><p>Choose a practice prompt, rehearse your opener, and use the coaching rubric to improve clarity, listening, and safe next-step handling.</p><div className="scenario-row"><article><span><MessageSquareText size={18} /></span><div><b>Business owner</b><small>Discovery opener</small></div><ChevronRight size={18} /></article><article><span><BriefcaseBusiness size={18} /></span><div><b>Customs broker</b><small>Partnership path</small></div><ChevronRight size={18} /></article><article><span><CircleHelp size={18} /></span><div><b>Hard question</b><small>Escalation practice</small></div><ChevronRight size={18} /></article></div><div className="practice-note"><Sparkles size={17} /> Coaching is limited to communication, discovery, safe positioning, and next-step handling. It is not legal or financial advice.</div></div>
          </section>

          <section className="resource-strip" aria-label="Internal agent resources">
            <div><span className="resource-icon"><BookOpen size={20} /></span><div><b>Approved content desk</b><p>Confirm version and review date before using claims or terms.</p></div></div>
            <div><span className="resource-icon"><ClipboardCheck size={20} /></span><div><b>Compensation reference</b><p>Use the separate internal calculator only with current approved plan materials.</p></div></div>
            <div><span className="resource-icon"><ShieldCheck size={20} /></span><div><b>Escalation standard</b><p>Route eligibility, law, deadline, funding, and recovery questions to specialists.</p></div></div>
          </section>

          <footer className="command-footer"><img src={wordmarkUrl} alt="Tariff Refund Agency" /><p>Internal agent training guidance only. Not legal, tax, customs, financial, or professional advice.</p><button type="button" onClick={() => scrollToModule("overview")}>Back to top <ArrowUpRight size={15} /></button></footer>
        </main>

        {showCallCard && <div className="callcard-scrim" role="presentation" onClick={() => setShowCallCard(false)}><aside className="call-card" role="dialog" aria-modal="true" aria-labelledby="call-card-title" onClick={(event) => event.stopPropagation()}><button type="button" className="close-card" onClick={() => setShowCallCard(false)} aria-label="Close call card">×</button><div className="eyebrow gold-eyebrow"><span /> QUICK CALL CARD</div><h2 id="call-card-title">Ask for the right owner.</h2><p className="call-card-prompt">“Would you be the right person to ask about import operations, or is there someone who oversees customs documentation and inbound purchasing?”</p><CopyCard text="Would you be the right person to ask about import operations, or is there someone who oversees customs documentation and inbound purchasing?" label="call card question" /><div className="call-card-checks"><span><Check size={15} /> Do not determine eligibility</span><span><Check size={15} /> Do not quote results or timing</span><span><Check size={15} /> Escalate program-specific questions</span></div><button type="button" className="signal-button full-width" onClick={() => { setShowCallCard(false); scrollToModule("qualifier"); }}>Open qualifier <ArrowDownRight size={18} /></button></aside></div>}
      </SidebarInset>
    </SidebarProvider>
  );
}
