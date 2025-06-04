import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


export default function ContactPage() {

return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Navbar />
        <Contact/>
      </div>
        <Footer />
    </div>
  );
}