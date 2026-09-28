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
import Trust from "@/components/home/Trust";
import Voices from "@/components/home/Voices";
import Why from "@/components/home/Why";

// Section order follows the live homepage, trimmed after client feedback (28 Sept): the team, the site-photo rail,
// the LinkedIn feed and the repeated "Why Choose" points are gone. About comes straight after the services, the tip
// of the day sits under the process steps, and Google reviews stand alone. Scenes alternate white and the
// reference's grey, as airmastersolutions.com does.
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
      <Commercial />
      <Trust />
      <Voices />
      <Faq />
      <Contact />
    </Shell>
  </>;
}
