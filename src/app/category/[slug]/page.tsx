import Navbar from "@/components/Navbar";
import Category from "@/components/Category";
import Footer from "@/components/Footer";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return (
    <div>
      <Navbar />
      <Category type={slug.toLowerCase()} />
      <Footer />
    </div>
  );
}