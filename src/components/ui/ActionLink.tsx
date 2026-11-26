import type { AnchorHTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ActionLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent-brand text-white shadow-glow hover:bg-blue-500 focus-visible:outline-accent-bright',
  secondary:
    'border border-white/20 bg-white/5 text-white hover:border-accent-bright/60 hover:bg-white/10',
  ghost:
    'border border-slate-300 bg-white text-navy-800 hover:border-accent-brand hover:text-accent-deep',
};

export function ActionLink({
  href,
  children,
  variant = 'primary',
  icon: Icon,
  iconPosition = 'right',
  className = '',
  ...rest
}: ActionLinkProps): JSX.Element {
  const IconNode = Icon ? (
    <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
  ) : null;

  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition duration-250 cursor-pointer ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {IconNode && iconPosition === 'left' ? IconNode : null}
      {children}
      {IconNode && iconPosition === 'right' ? IconNode : null}
    </a>
  );
}
