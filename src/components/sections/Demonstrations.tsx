import { Clapperboard, ListVideo, Radio } from 'lucide-react';
import { videos } from '@/config/media';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { VideoEmbed } from '@/components/ui/VideoEmbed';

export function Demonstrations(): JSX.Element {
  return (
    <section id="demonstrations" className="scroll-mt-20 border-t border-white/5 bg-navy-950 py-20 text-white sm:py-24 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="Demonstrations"
            title={<>See the project explained by the team building it.</>}
            description="A recorded walkthrough is available below. Space is also reserved for additional presentation or module videos once sharing links are supplied."
          />
        </Reveal>

        <div className="mt-12 grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Badge tone="light" icon={Clapperboard}>
                Video showcase
              </Badge>
              <h3 className="mt-6 font-display text-2xl font-semibold leading-snug sm:text-3xl">
                From the prototype, not a promotional edit.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                The featured recording is a short explanation from the team lead about what TRINITY AI is, the urban problems it targets and how the modules fit together. A second clip shows the camera calibration process alongside the detection view.
              </p>

              <ul className="mt-8 space-y-4">
                <li className="flex gap-3 text-sm leading-relaxed text-slate-300">
                  <Radio aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent-bright" />
                  <span>Recorded during the prototype stage — no deployment claims are made in the video section.</span>
                </li>
                <li className="flex gap-3 text-sm leading-relaxed text-slate-300">
                  <ListVideo aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent-bright" />
                  <span>Additional unlisted YouTube links can be added in one configuration file when available.</span>
                </li>
              </ul>

              <p className="mt-8 border-t border-white/10 pt-5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-slate-500">
                Embedded players are responsive. No video URL is invented or silently substituted.
              </p>
            </div>
          </Reveal>

          <div className="space-y-6">
            {videos.map((video, index) => (
              <Reveal key={video.id} delay={index * 0.08}>
                <VideoEmbed video={video} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
