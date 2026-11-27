import { act, render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { useActiveSection } from '@/hooks/useActiveSection';
import { GalleryCollections } from '@/components/sections/GalleryCollections';
import { Header } from '@/components/layout/Header';
import { Lightbox } from '@/components/ui/Lightbox';
import { ModeSwitch } from '@/components/ui/ModeSwitch';
import { VideoEmbed } from '@/components/ui/VideoEmbed';
import { galleryAssets, videos } from '@/config/media';
import { ViewModeProvider } from '@/context/ViewModeContext';

describe('useActiveSection', () => {
  it('follows the section under the fixed header as the page scrolls', async () => {
    document.body.innerHTML = `
      <header></header>
      <main id="main">
        <section id="problem"></section>
        <section id="technology"></section>
        <section id="collaboration"></section>
      </main>
    `;
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 5000,
    });

    const tops: Record<string, number> = {
      problem: -200,
      technology: 40,
      collaboration: 600,
    };
    const rectSpy = vi
      .spyOn(Element.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: Element) {
        const top = this.tagName === 'HEADER' ? 72 : (tops[this.id] ?? 0);
        return {
          top,
          bottom: top + 100,
          left: 0,
          right: 0,
          width: 0,
          height: 100,
          x: 0,
          y: top,
          toJSON: () => ({}),
        } as DOMRect;
      });

    try {
      const { result } = renderHook(() => useActiveSection(['problem', 'technology', 'collaboration']));
      expect(result.current).toBe('technology');

      tops.technology = -100;
      tops.collaboration = 40;
      act(() => {
        window.dispatchEvent(new Event('scroll'));
      });
      await waitFor(() => expect(result.current).toBe('collaboration'));
    } finally {
      rectSpy.mockRestore();
      Reflect.deleteProperty(document.documentElement, 'scrollHeight');
      document.body.innerHTML = '';
    }
  });
});

describe('Header', () => {
  it('opens and closes the mobile navigation', async () => {
    const user = userEvent.setup();
    render(
      <ViewModeProvider>
        <Header />
      </ViewModeProvider>,
    );

    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(menuButton);
    expect(screen.getByRole('button', { name: 'Close navigation menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    const mobileLink = screen.getAllByRole('link', { name: 'Demonstrations' }).at(-1);
    expect(mobileLink).toBeDefined();
    if (mobileLink) {
      await user.click(mobileLink);
    }
    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });
});

describe('Lightbox', () => {
  it('closes from the close button and reports navigation', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onIndexChange = vi.fn();

    render(
      <Lightbox
        open
        items={galleryAssets}
        index={0}
        onIndexChange={onIndexChange}
        onClose={onClose}
      />,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Next image' }));
    expect(onIndexChange).toHaveBeenCalledWith(1);
    await user.click(screen.getByRole('button', { name: 'Close image viewer' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('ModeSwitch', () => {
  it('switches between brief and detailed views', async () => {
    const user = userEvent.setup();
    render(
      <ViewModeProvider>
        <ModeSwitch />
      </ViewModeProvider>,
    );

    expect(screen.getByRole('button', { name: 'Brief' })).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', { name: 'Detailed' }));
    expect(screen.getByRole('button', { name: 'Detailed' })).toHaveAttribute('aria-pressed', 'true');
    expect(window.location.search).toBe('?view=detailed');
    await user.click(screen.getByRole('button', { name: 'Brief' }));
    expect(window.location.search).toBe('');
  });
});

describe('GalleryCollections', () => {
  it('opens the whole collection from any tap on the group card', async () => {
    const user = userEvent.setup();
    render(<GalleryCollections />);

    await user.click(screen.getByRole('button', { name: 'Open Live calibration set gallery' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('1 / 4')).toBeInTheDocument();
  });
});

describe('VideoEmbed', () => {
  it('renders a native player for a supplied local recording', () => {
    const video = videos.find((item) => item.kind === 'local');
    expect(video).toBeDefined();
    if (!video) {
      return;
    }
    render(<VideoEmbed video={video} />);
    expect(screen.getByLabelText(video.title)).toBeInstanceOf(HTMLVideoElement);
  });
});
