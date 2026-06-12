import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="grow flex flex-col max-w-7xl mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
