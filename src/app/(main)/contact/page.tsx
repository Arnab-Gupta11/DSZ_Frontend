import { Metadata } from 'next';
import { site } from '@/constants/site';
import { ContactClient } from './_components/ContactClient';

export const metadata: Metadata = {
  title: `Contact | ${site.name}`,
  description: 'Talk to Digital Soft Zone about your next project. Get a free quote or message us on WhatsApp.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
