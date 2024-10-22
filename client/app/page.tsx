import Navbar from "@/components/base/Navbar";
import HeroSection from "@/components/base/HeroSection";
import FeatureSection from "@/components/base/FeatureSection";
import UserReviews from "@/components/base/UserReviews";
import Footer from "@/components/base/Footer";
import { authOptions, CustomSession } from "../app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
export default async function LandingPage() {
  const session: CustomSession | null = await getServerSession(authOptions);
  console.log("Session:", session); // Check the session data
  return (
    <div className="min-h-screen flex flex-col ">
      {/* Header */}
      <Navbar user ={session?.user ?? null} />
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* User Reviews Section */}
      <UserReviews />

      {/* Footer */}
      <Footer />
    </div>
  );
}