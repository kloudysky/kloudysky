import Hero from '@/components/Hero';
import SiteFooter from '@/components/SiteFooter';
import TopBar from '@/components/TopBar';
import WorkList from '@/components/WorkList';

export default function Home() {
  return (
    <main className="mx-auto flex min-h-svh max-w-[760px] flex-col px-5 sm:px-8">
      <TopBar />
      <Hero />
      <WorkList />
      <SiteFooter />
    </main>
  );
}
