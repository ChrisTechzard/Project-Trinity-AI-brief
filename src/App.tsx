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
import { BriefPage } from '@/components/sections/BriefPage';
import { siteConfig } from '@/config/site';
import { useViewMode, ViewModeProvider } from '@/context/ViewModeContext';
import { useSeo } from '@/hooks/useSeo';

function SiteBody(): JSX.Element {
  const { mode } = useViewMode();

  if (mode === 'brief') {
    return <BriefPage />;
  }

  return (
    <>
      <Hero />
      <Problem />
      <Technology />
      <Gallery />
      <Demonstrations />
      <Status />
      <Vision />
      <Collaboration />
    </>
  );
}

export default function App(): JSX.Element {
  useSeo(siteConfig);

  return (
    <ViewModeProvider>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <SiteBody />
      </main>
      <Footer />
    </ViewModeProvider>
  );
}
