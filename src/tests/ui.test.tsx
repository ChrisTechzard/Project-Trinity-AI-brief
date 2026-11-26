import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Header } from '@/components/layout/Header';
import { Lightbox } from '@/components/ui/Lightbox';
import { VideoEmbed } from '@/components/ui/VideoEmbed';
import { galleryAssets, videos } from '@/config/media';

describe('Header', () => {
  it('opens and closes the mobile navigation', async () => {
    const user = userEvent.setup();
    render(<Header />);

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

  it('renders an explicit placeholder when no YouTube URL is configured', () => {
    const pending = videos.find((item) => item.kind === 'pending');
    expect(pending).toBeDefined();
    if (!pending) {
      return;
    }
    render(<VideoEmbed video={pending} />);
    expect(screen.getByText('Awaiting video link')).toBeInTheDocument();
  });
});
