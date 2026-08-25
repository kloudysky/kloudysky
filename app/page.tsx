import Feed from '@/components/Feed';
import Rail from '@/components/Rail';

export default function Home() {
  return (
    <main className="mx-auto grid min-h-screen max-w-[1180px] grid-cols-1 sm:grid-cols-[330px_1fr]">
      <Rail />
      <Feed />
    </main>
  );
}
