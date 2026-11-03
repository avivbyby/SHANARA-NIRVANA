import "./shanara.css";
import "./components/shanara/interactions.css";
import ShanaraNavigation from "./ShanaraNavigation";
import MotionStage from "./components/shanara/MotionStage";
import Hero from "./components/shanara/Hero";
import Vision from "./components/shanara/Vision";
import SoundStory from "./components/shanara/SoundStory";
import Experience from "./components/shanara/Experience";
import NirvanaPreview from "./components/shanara/NirvanaPreview";
import Community from "./components/shanara/Community";
import Join from "./components/shanara/Join";
import ConnectionLinks from "./components/shanara/ConnectionLinks";
import Footer from "./components/shanara/Footer";

export default function Home() {
  return <main id="main-content" tabIndex={-1} dir="rtl" className="shanaraPage">
    <a className="skipLink" href="#main-content">דילוג לתוכן</a>
    <ShanaraNavigation />
    <MotionStage>
      <Hero /><Vision /><SoundStory /><Experience />
      <NirvanaPreview /><Community /><Join /><ConnectionLinks /><Footer />
    </MotionStage>
  </main>;
}
