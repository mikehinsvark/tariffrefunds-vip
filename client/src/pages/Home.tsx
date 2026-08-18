/** Design reminder — homepage is an active mission brief: visual carousel first, colored module cards second, and all routes are internal-training resources. */
import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, BriefcaseBusiness, Calculator, CircleHelp, Compass, ContactRound, MessageSquareText, Network, Pause, Play, SearchCheck } from "lucide-react";
import TrainingShell from "@/components/TrainingShell";
import { carouselAssetUrl } from "@/lib/assets";

const slides = [
  ["01-hidden-refund-opportunity.png", "Find the process signal.", "Start by mapping who owns import documentation, purchasing, or inbound trade operations.", "/field-guide"],
  ["02-import-data-intelligence.png", "Prepare with import intelligence.", "Use approved research to shape a relevant first question before you request a conversation.", "/contact-research"],
  ["03-organized-recovery-process.png", "Explain the review path.", "Describe a responsible process and specialist handoff—never an outcome or a promise.", "/business-script"],
  ["04-working-capital.png", "Keep the conversation factual.", "Use the qualifier to organize what the right resource needs to understand next.", "/qualifier"],
  ["05-referral-partner-opportunity.png", "Build the broker pathway.", "Use calibrated questions and permission-based positioning with trade partners.", "/broker-script"],
  ["06-step-into-the-opportunity.png", "Route the next step.", "Move a prepared conversation into the right approved resource, page, or escalation path.", "/objections"],
] as const;

const modules = [
  ["/field-guide", "02", "Field guide", "Restore the gateway, partnership, direct-importer, campaign, launch, and guardrail playbook.", BookOpen, "#2de1d0"],
  ["/broker-script", "03", "Broker script", "Practice the permission opener, tactical empathy, calibrated questions, and partnership close.", BriefcaseBusiness, "#f4b41a"],
  ["/categories", "04", "Category explorer", "Search all 18 priority categories, then use the qualifier to structure the handoff.", Network, "#7aa9bb"],
  ["/qualifier", "05", "Qualifier", "Use a five-question screen to organize facts without deciding the outcome.", SearchCheck, "#2de1d0"],
  ["/objections", "06", "Objection practice", "Rehearse safe responses and escalation language for hard questions.", CircleHelp, "#f4b41a"],
  ["/business-script", "07", "Business script", "Use a process-first business-owner conversation and controlled handoff language.", MessageSquareText, "#0f9288"],
  ["/contact-research", "08", "Contact research", "Map the account, identify process owners, and prepare respectful outreach.", ContactRound, "#7aa9bb"],
  ["/comp-plan", "09", "Comp plan reference", "Learn calculator settings and plan vocabulary without quoting unverified projections.", Calculator, "#2de1d0"],
] as const;

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = slides[activeSlide];

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 5500);
    return () => window.clearInterval(interval);
  }, [paused]);

  const moveSlide = (direction: number) => setActiveSlide((current) => (current + direction + slides.length) % slides.length);

  return (
    <TrainingShell eyebrow="01 / TRAINING COMMAND CENTER">
      <main id="top">
        <section className="academy-hero home-hero">
          <div>
            <p className="academy-kicker">AGENT OPPORTUNITY FIELD GUIDE</p>
            <h1>Use the right page<br />for the <span>right conversation.</span></h1>
            <p className="academy-lede">A complete internal training website for researching prospects, building broker partnerships, preparing compliant conversations, and routing the next step.</p>
            <div className="academy-actions"><Link href="/field-guide">Open field guide <ArrowRight size={16} /></Link><Link className="ghost" href="/broker-script">Broker script</Link></div>
          </div>
          <div className="academy-home-carousel" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
            <div className="academy-carousel-frame">
              <img src={carouselAssetUrl(slide[0])} alt="Tariff Refund opportunity training visual" />
              <div className="academy-carousel-scrim" />
              <div className="academy-carousel-meta"><span><i /> OPPORTUNITY BRIEF</span><b>0{activeSlide + 1} / 0{slides.length}</b></div>
              <div className="academy-carousel-copy"><p>MISSION BRIEF</p><h2>{slide[1]}</h2><span>{slide[2]}</span><Link href={slide[3]}>Open resource <ArrowRight size={14} /></Link></div>
            </div>
            <div className="academy-carousel-controls" aria-label="Opportunity briefing carousel controls">
              <button type="button" onClick={() => moveSlide(-1)} aria-label="Previous briefing"><ArrowLeft size={16} /></button>
              <div className="academy-carousel-dots">{slides.map((item, index) => <button type="button" key={item[0]} className={index === activeSlide ? "active" : ""} onClick={() => setActiveSlide(index)} aria-label={`Show briefing ${index + 1}`} aria-current={index === activeSlide ? "true" : undefined} />)}</div>
              <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume carousel" : "Pause carousel"} aria-pressed={paused}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>
              <button type="button" onClick={() => moveSlide(1)} aria-label="Next briefing"><ArrowRight size={16} /></button>
            </div>
          </div>
        </section>
        <section className="academy-section overview-grid-section">
          <p className="academy-kicker dark">SELECT A TRAINING PAGE</p>
          <h2>Move through the work—not one endless page.</h2>
          <div className="academy-module-grid">{modules.map(([href, number, title, copy, Icon, color]) => { const ModuleIcon = Icon as typeof Compass; return <Link href={href} key={href}><article style={{ "--module-color": color } as CSSProperties}><span>{number}</span><ModuleIcon size={23} /><h3>{title}</h3><p>{copy}</p><b>Open page <ArrowRight size={14} /></b></article></Link>; })}</div>
        </section>
        <section className="academy-section dark overview-note"><p className="academy-kicker">CONTENT CONTROL</p><h2>Restore the curriculum.<br />Keep the boundary.</h2><p>Rich source-guide content is now organized into linked pages. It remains internal training material and must be paired with current approved resources before agents use claims, program specifics, legal or customs language, time-sensitive facts, costs, deadlines, or outcomes.</p></section>
      </main>
    </TrainingShell>
  );
}
