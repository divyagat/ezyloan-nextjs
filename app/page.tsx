import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <HeroSection page="home" title="Welcome to EzyLoan" subtitle="Your trusted partner in financial solutions" />
      <Services />
    </>
  );
}
