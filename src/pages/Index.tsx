import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ReportDumping from '@/components/ReportDumping';
import RecyclingIdeas from '@/components/RecyclingIdeas';
import About from '@/components/About';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div id="home" className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ReportDumping />
        <RecyclingIdeas />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
