import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Overview from '@/components/Overview';
import Gallery from '@/components/Gallery';
import WhyGopanpally from '@/components/WhyGopanpally';
import MasterPlan from '@/components/MasterPlan';
import Progress from '@/components/Progress';
import ResidenceFinder from '@/components/ResidenceFinder';
import FloorPlans from '@/components/FloorPlans';
import Amenities from '@/components/Amenities';
import Location from '@/components/Location';
import Pricing from '@/components/Pricing';
import Faq from '@/components/Faq';
import Advantage from '@/components/Advantage';
import Footer from '@/components/Footer';
import { jsonLd } from '@/lib/seo';

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, '\\u003c') }}
      />
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Overview />
        <Gallery />
        <WhyGopanpally />
        <MasterPlan />
        <Progress />
        <ResidenceFinder />
        <FloorPlans />
        <Amenities />
        <Location />
        <Pricing />
        <Faq />
        <Advantage />
      </main>
      <Footer />
    </>
  );
}
