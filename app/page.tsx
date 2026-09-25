import { Shell } from "@/components/chrome";
import Loader from "@/components/Loader";
import About from "@/components/home/About";
import Commercial from "@/components/home/Commercial";
import Contact from "@/components/home/Contact";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import Process from "@/components/home/Process";
import Projects from "@/components/home/Projects";
import Services from "@/components/home/Services";
import Team from "@/components/home/Team";
import Trust from "@/components/home/Trust";
import Voices from "@/components/home/Voices";
import Why from "@/components/home/Why";
import Work from "@/components/home/Work";

// Section order follows the live homepage, with two moves: About comes straight after the services (its counters
// answer "who are you" early) and the team sits after the site photos. Merged: the "Why choose" points into Trust,
// the three "Commercial AC projects" teasers into Projects (same three jobs), the tip of the day into Process, Google
// reviews and the LinkedIn feed into Voices. Scenes alternate white and the reference's grey, as airmastersolutions.com does.
export default function Home() {
  return <>
    <Loader />
    <Shell>
      <Hero />
      <Services />
      <About />
      <Process />
      <Projects />
      <Why />
      <Work />
      <Team />
      <Commercial />
      <Trust />
      <Voices />
      <Faq />
      <Contact />
    </Shell>
  </>;
}
