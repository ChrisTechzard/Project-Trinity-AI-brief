import { Collaboration } from '@/components/sections/Collaboration';
import { Demonstrations } from '@/components/sections/Demonstrations';
import { Footer } from '@/components/layout/Footer';
import { Gallery } from '@/components/sections/Gallery';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { Status } from '@/components/sections/Status';
import { Technology } from '@/components/sections/Technology';
import { Vision } from '@/components/sections/Vision';
import { siteConfig } from '@/config/site';
import { useSeo } from '@/hooks/useSeo';

export default function App(): JSX.Element {
  useSeo(siteConfig);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Problem />
        <Technology />
        <Gallery />
        <Demonstrations />
        <Status />
        <Vision />
        <Collaboration />
      </main>
      <Footer />
    </>
  );
}
