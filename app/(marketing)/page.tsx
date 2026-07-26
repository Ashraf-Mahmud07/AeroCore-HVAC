import type { Metadata } from 'next';
import { JsonLd } from '@/components/shared/JsonLd';
import { BrandMarquee } from '@/components/shared/BrandMarquee';
import { Blog } from '@/components/home/Blog';
import { ContactCta } from '@/components/home/ContactCta';
import { Financing } from '@/components/home/Financing';
import { Hero } from '@/components/home/Hero';
import { HomeFaq } from '@/components/home/HomeFaq';
import { PlansTeaser } from '@/components/home/PlansTeaser';
import { ProcessSteps } from '@/components/home/ProcessSteps';
import { Projects } from '@/components/home/Projects';
import { ServiceAreas } from '@/components/home/ServiceAreas';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { Testimonials } from '@/components/home/Testimonials';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { buildPageMetadata, homeFaqSchema, buildReviewSchema } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    path: '/',
    keywords: [
      'HVAC contractor San Francisco',
      'air conditioning installation',
      'furnace repair Bay Area',
      'heat pump rebates',
      'emergency HVAC 24/7',
      'Manual J load calculation',
      'HVAC maintenance plan',
    ],
  }),
  // The homepage owns the site's default title, so it opts out of the template.
  title: { absolute: `${siteConfig.name} — ${siteConfig.tagline}` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandMarquee caption="Factory-authorized on the equipment that runs the world's buildings" />
      <ServicesGrid />
      <WhyChooseUs />
      <ProcessSteps />
      <Projects />
      <Testimonials />
      <PlansTeaser />
      <Financing />
      <ServiceAreas />
      <Blog />
      <HomeFaq />
      <ContactCta />

      <JsonLd id="ld-home-faq" schema={homeFaqSchema()} />
      <JsonLd id="ld-home-reviews" schema={buildReviewSchema()} />
    </>
  );
}
