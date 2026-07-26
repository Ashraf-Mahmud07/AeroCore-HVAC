import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SkipLink } from '@/components/layout/SkipLink';
import { StickyMobileBar } from '@/components/layout/StickyMobileBar';

/** Chrome shared by every marketing route. */
export default function MarketingLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <StickyMobileBar />
    </>
  );
}
