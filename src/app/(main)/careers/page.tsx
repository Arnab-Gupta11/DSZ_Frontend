import { Metadata } from 'next';
import { site } from '@/constants/site';
import { CareersClient } from './_components/CareersClient';

export const metadata: Metadata = {
  title: `Careers | ${site.name}`,
  description: 'Join Digital Soft Zone. We’re looking for passionate people who value flat hierarchies, clear communication and full ownership.',
  alternates: {
    canonical: '/careers',
  },
};

export default function CareersPage() {
  return <CareersClient />;
}
