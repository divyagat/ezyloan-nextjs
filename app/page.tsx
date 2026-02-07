import HeroSection from '@/components/HeroSection';
import Services from '@/components/Services';
import { metadata as layoutMetadata } from './layout';

// Override ONLY homepage-specific metadata
export const metadata = {
  ...layoutMetadata,
  title: 'EzyLoan - Quick & Easy Loans',
  description:
    'Get instant loans with EzyLoan - Personal loans, business loans, and more. Quick approval, competitive rates, and hassle-free process.',
  openGraph: {
    ...layoutMetadata.openGraph,
    title: 'EzyLoan - Quick & Easy Loans',
    description:
      'Apply for instant personal, business, and vehicle loans with quick approval and minimal documentation.',
    url: 'https://ezyloan.co.in',
  },
  twitter: {
    ...layoutMetadata.twitter,
    title: 'EzyLoan - Quick & Easy Loans',
    description:
      'Fast and easy loan solutions with EzyLoan. Apply online today.',
  },
};

export default function Home() {
  return (
    <>
      <HeroSection page="home" />
      <Services />
    </>
  );
}