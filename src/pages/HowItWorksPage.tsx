import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-[72px]">
        <HowItWorks />
      </div>
      <Footer />
    </div>
  );
}
