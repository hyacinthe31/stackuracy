import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default async function Page() {

  return (
    <div>
      <Navbar />
      <About />
      <Footer />
    </div>
  );
}