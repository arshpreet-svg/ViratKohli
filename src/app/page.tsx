import HeroSection from '@/components/sections/hero-section';
import CareerTimelineSection from '@/components/sections/career-timeline-section';
import StatsAchievementsSection from '@/components/sections/stats-achievements-section';
import MediaGallerySection from '@/components/sections/media-gallery-section';
import FanConnectSection from '@/components/sections/fan-connect-section';
import ScrollReveal from '@/components/scroll-reveal';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <HeroSection />
        <ScrollReveal>
          <CareerTimelineSection />
        </ScrollReveal>
        <ScrollReveal>
          <StatsAchievementsSection />
        </ScrollReveal>
        <ScrollReveal>
          <MediaGallerySection />
        </ScrollReveal>
        <ScrollReveal>
          <FanConnectSection />
        </ScrollReveal>
      </main>
    </div>
  );
}
