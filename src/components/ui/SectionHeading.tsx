import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'left',
  id,
}: SectionHeadingProps): JSX.Element {
  const isDark = tone === 'dark';
  const centered = align === 'center';

  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <div
        className={`eyebrow ${isDark ? 'text-accent-bright' : 'text-accent-deep'} ${
          centered ? 'justify-center' : ''
        }`}
      >
        <span className="h-px w-6 bg-current opacity-70" aria-hidden="true" />
        {eyebrow}
      </div>
      <h2
        id={id}
        className={`section-title mt-5 ${isDark ? 'text-white' : 'text-navy-900'}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`section-lead ${centered ? 'mx-auto' : ''} ${isDark ? 'text-slate-300' : ''}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
