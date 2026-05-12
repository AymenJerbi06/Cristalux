import type { ReactNode } from 'react';
import AnnouncementBar from './AnnouncementBar';
import RewardsBubble from './RewardsBubble';
import RouteMotion from './RouteMotion';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';

export default function StorefrontShell({ children }: { children: ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <RouteMotion>{children}</RouteMotion>
      </main>
      <RewardsBubble />
      <SiteFooter />
    </>
  );
}
