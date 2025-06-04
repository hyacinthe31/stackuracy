import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default async function Page() {

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Navbar />
        <About />
      </div>
      <Footer />
    </div>
  );
}