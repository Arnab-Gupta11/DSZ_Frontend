import { Metadata } from 'next';
import { site } from '@/constants/site';
import { AboutClient } from './_components/AboutClient';

export const metadata: Metadata = {
  title: `About Us | ${site.name}`,
  description: 'Strategists, designers, video makers and developers working as one team for growing brands at Digital Soft Zone.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
