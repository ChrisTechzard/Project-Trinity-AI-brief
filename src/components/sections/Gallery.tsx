import { evidenceLegend } from '@/config/content';
import { GalleryCollections } from './GalleryCollections';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Gallery(): JSX.Element {
  return (
    <section id="showcase" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Project showcase"
            title={<>What the system looks like in operation.</>}
            description="Authentic captures from the project, grouped into three collections: live calibration, offline simulated walkthroughs and the team behind the work. Each set opens as one explorable gallery."
          />
        </Reveal>

        <div className="mt-9">
          <GalleryCollections />
        </div>

        <Reveal delay={0.08}>
          <div className="mt-10 rounded-2xl bg-slate-50 p-6 sm:p-7">
            <h3 className="font-display text-sm font-semibold text-navy-900">How to read this evidence</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {evidenceLegend.map((item) => (
                <div key={item.label}>
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-deep">
                    {item.label}
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.meaning}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-500">
              The calibration collection shows the phone-camera feed used with the miniature junction test bed. The simulated collection was recorded before live data was fed into the system and is not the final live interface.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
