import { Banner } from "@/components/Banner";
import Footer from "@/components/Footer";
import HomePage from "@/components/Homepage";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HomePage />
      <div className="h-96"></div>
      <Footer />
    </div>
  );
}
