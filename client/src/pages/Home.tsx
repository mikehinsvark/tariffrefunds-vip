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
  type CarouselApi,
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
const opportunityCarouselImages = [
  "/manus-storage/01-hidden-refund-opportunity_22331b64.png",
  "/manus-storage/02-import-data-intelligence_7701c197.png",
  "/manus-storage/03-organized-recovery-process_66849247.png",
  "/manus-storage/04-working-capital_1841dbd7.png",
  "/manus-storage/05-referral-partner-opportunity_4c38886c.png",
  "/manus-storage/06-step-into-the-opportunity_c41cf05c.png",
];

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

const categoryFilters = ["All", "Technology", "Industrial", "Transportation", "Health", "Commerce", "Consumer", "Food"];

const categories = [
  { code: "ET", sector: "Technology", title: "Electronics & Technology", copy: "Computers, servers, telecom equipment, components, circuit boards and security systems.", tone: "#3EE2D0" },
  { code: "MI", sector: "Industrial", title: "Machinery & Industrial Equipment", copy: "Manufacturing machinery, pumps, motors, tools, generators, robotics and replacement parts.", tone: "#F4B41A" },
  { code: "AT", sector: "Transportation", title: "Automotive & Transportation", copy: "Vehicles, tires, batteries, aftermarket parts, truck parts and accessories.", tone: "#7BA7FF" },
  { code: "CP", sector: "Health", title: "Chemical & Pharmaceutical", copy: "Pharmaceuticals, supplements, cosmetic ingredients, industrial chemicals and cleaners.", tone: "#BB90E7" },
  { code: "WD", sector: "Commerce", title: "Wholesale Distributors", copy: "Finished goods, components and inventory distributed to retailers, manufacturers and contractors.", tone: "#E99B68" },
  { code: "RE", sector: "Commerce", title: "Retail & E-commerce Brands", copy: "Private-label products, household goods, electronics, toys and general merchandise.", tone: "#E99B68" },
  { code: "AF", sector: "Consumer", title: "Apparel, Footwear & Textiles", copy: "Clothing, uniforms, shoes, fabric, linens, handbags and accessories.", tone: "#E78F8F" },
  { code: "FH", sector: "Consumer", title: "Furniture & Home Furnishings", copy: "Furniture, cabinets, mattresses, lighting, flooring and decor.", tone: "#E78F8F" },
  { code: "CB", sector: "Industrial", title: "Construction & Building Materials", copy: "Tile, stone, lumber products, fixtures, hardware, glass, plumbing and electrical products.", tone: "#F4CB6C" },
  { code: "FB", sector: "Food", title: "Food & Beverage Importers", copy: "Produce, seafood, coffee, wine, spirits, packaged foods and restaurant supplies.", tone: "#8FCE7B" },
  { code: "MD", sector: "Health", title: "Medical & Dental Suppliers", copy: "Medical devices, diagnostics, dental equipment, disposables and PPE.", tone: "#BB90E7" },
  { code: "PP", sector: "Industrial", title: "Plastics & Packaging", copy: "Plastic products, containers, film, bottles, packaging materials and resins.", tone: "#B49AFF" },
  { code: "MF", sector: "Industrial", title: "Metals & Fabricated Products", copy: "Steel products, aluminum products, fasteners, castings, wire and fabricated components.", tone: "#A9B9C9" },
  { code: "RE", sector: "Technology", title: "Renewable Energy & Electrical", copy: "Solar equipment, batteries, inverters, chargers and electrical components.", tone: "#3EE2D0" },
  { code: "SG", sector: "Consumer", title: "Sporting Goods, Toys & Recreation", copy: "Fitness equipment, bicycles, toys, outdoor equipment and sporting goods.", tone: "#E78F8F" },
  { code: "BJ", sector: "Consumer", title: "Beauty, Jewelry & Luxury Goods", copy: "Cosmetics, skincare, watches, jewelry, handbags and accessories.", tone: "#E78F8F" },
  { code: "AG", sector: "Food", title: "Agriculture & Farm Supply", copy: "Fertilizer, equipment, irrigation systems, greenhouse products and packaging.", tone: "#8FCE7B" },
  { code: "HR", sector: "Food", title: "Hospitality & Restaurant Suppliers", copy: "Commercial kitchen equipment, furniture, linens, tableware and food products.", tone: "#8FCE7B" },
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
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [showCallCard, setShowCallCard] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("All");
  const [categorySearch, setCategorySearch] = useState("");

  const briefSlides = useMemo(
    () => [
      { eyebrow: "Opportunity awareness", title: "Start with the import process.", copy: "Lead with responsible discovery and establish whether the business owns its import workflow.", icon: Target, image: opportunityCarouselImages[0] },
      { eyebrow: "Data intelligence", title: "Turn detail into direction.", copy: "Use operational questions to locate the right contact and the safest next conversation.", icon: SearchCheck, image: opportunityCarouselImages[1] },
      { eyebrow: "Process clarity", title: "Make the handoff organized.", copy: "Set clear expectations for the next step without deciding eligibility, terms, or outcomes.", icon: ClipboardCheck, image: opportunityCarouselImages[2] },
      { eyebrow: "Working capital", title: "Keep claims out of the call.", copy: "When value, timing, funding, or legal treatment comes up, route it to approved specialists.", icon: ShieldCheck, image: opportunityCarouselImages[3] },
      { eyebrow: "Partner pathway", title: "Build the right introduction.", copy: "Protect the relationship, clarify the collaboration, and hand off only through approved channels.", icon: UsersRound, image: opportunityCarouselImages[4] },
      { eyebrow: "Agent action", title: "Step into the right next move.", copy: "Use the field guide, choose the appropriate talk track, and document the requested follow-up.", icon: ArrowDownRight, image: opportunityCarouselImages[5] },
    ],
    []
  );

  const visibleCategories = useMemo(() => {
    const query = categorySearch.trim().toLowerCase();
    return categories.filter((category) => {
      const matchesFilter = activeCategoryFilter === "All" || category.sector === activeCategoryFilter;
      const haystack = `${category.title} ${category.copy} ${category.sector}`.toLowerCase();
      return matchesFilter && (!query || haystack.includes(query));
    });
  }, [activeCategoryFilter, categorySearch]);

  useEffect(() => {
    if (!carouselApi) return;
    const interval = window.setInterval(() => carouselApi.scrollNext(), 6500);
    return () => window.clearInterval(interval);
  }, [carouselApi]);

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
              <Carousel opts={{ loop: true }} setApi={(api) => { setCarouselApi(api); api?.on("select", () => setCurrentBrief(api.selectedScrollSnap())); }} className="brief-carousel">
                <CarouselContent>
                  {briefSlides.map((brief, index) => {
                    const Icon = brief.icon;
                    return (
                      <CarouselItem key={brief.title}>
                        <article className="brief-card">
                          <div className="brief-card-top"><span><i /> {brief.eyebrow}</span><b>0{index + 1}</b></div>
                          <div className="brief-image"><img src={brief.image} alt="" /><div className="brief-image-scrim" /><div className="brief-image-icon"><Icon size={24} /></div></div>
                          <div className="brief-card-copy"><h2>{brief.title}</h2><p>{brief.copy}</p></div>
                          <div className="brief-progress"><span style={{ width: `${((index + 1) / briefSlides.length) * 100}%` }} /></div>
                        </article>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <div className="carousel-controls">
                  <CarouselPrevious className="brief-arrow border-[#23506b] bg-[#0a273a] text-white hover:bg-[#10354b]" />
                  <span>{String(currentBrief + 1).padStart(2, "0")} / {String(briefSlides.length).padStart(2, "0")}</span>
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
            <div className="section-heading split-heading"><div><div className="eyebrow teal-eyebrow"><span /> 05 / RESEARCH CATEGORIES</div><h2>18 priority business categories.</h2></div><p>Search by product or narrow the field by vertical. These are prospecting guides—not final eligibility determinations.</p></div>
            <div className="category-tools"><label className="category-search"><SearchCheck size={17} /><input type="search" value={categorySearch} onChange={(event) => setCategorySearch(event.target.value)} placeholder="Search products or categories..." aria-label="Search priority business categories" /></label><div className="category-filters" role="group" aria-label="Filter priority categories">{categoryFilters.map((filter) => <button key={filter} type="button" className={activeCategoryFilter === filter ? "active" : ""} onClick={() => setActiveCategoryFilter(filter)}>{filter}</button>)}</div></div>
            <div className="category-grid">{visibleCategories.map((category) => <article className="category-card" style={{ "--category-color": category.tone } as CSSProperties} key={category.title}><div className="category-topline"><span className="category-code">{category.code}</span><small>{String(categories.indexOf(category) + 1).padStart(2, "0")}</small></div><em>{category.sector}</em><h3>{category.title}</h3><p>{category.copy}</p><button onClick={() => scrollToModule("qualifier")} type="button">Use qualifier <ArrowUpRight size={16} /></button></article>)}</div>
            {visibleCategories.length === 0 && <div className="category-empty"><SearchCheck size={22} /><p>No category matches that search. Try a product, vertical, or broader phrase.</p></div>}
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
