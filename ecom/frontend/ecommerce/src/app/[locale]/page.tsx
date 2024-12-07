import Carousel from "@/components/homepage/Carousel";
import Filter from "@/components/filtering/Filter";
import ProductSection from "@/components/homepage/ProductSection";
import ChatInterface from "@/components/chatbot/ChatInterface";

const images = [
  // Carousel Images for small devices
  "/images/homepage/carousel/small-iphone.png",
  "/images/products/joystick.svg",
  "/images/heart small.svg",
];

const largeImages = [
  // Carousel Images for large devices
  "/images/homepage/carousel/large-iphone.png",
  "/images/homepage/carousel/ecommerce.jpeg",
  "/images/homepage/carousel/cycle.png",
];

// Reusable Section Component
const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="flex flex-col gap-10 md:gap-[60px] w-full px-3.5 md:px-0">
    {children}
  </section>
);

// Reusable Horizontal Line Component
const HorizontalLine = () => (
  <div className="w-full px-3.5 md:px-0">
    <hr className="border-0.5 border-black border-opacity-30" />
  </div>
);

export default async function HomePage() {
  return (
    <div className="container md:px-2 mx-auto">
      <div className="flex flex-col items-center justify-center gap-14">
        {/* Carousel */}
        <section className="w-full">
          <Carousel images={images} largeImages={largeImages} />
        </section>

        {/* Categories */}
        <Section>
          <Filter />
        </Section>

        {/* Horizontal Line */}
        <HorizontalLine />

        {/* Best Selling Products */}
        <Section>
          <ProductSection
            type="bestselling"
            topHeading="This Month"
            heading="Best Selling Products"
          />
        </Section>

        {/* Horizontal Line */}
        <HorizontalLine />

        {/* Latest Products */}
        <Section>
          <ProductSection
            type="latest"
            topHeading="Latest"
            heading="Recently Added Products"
          />
        </Section>

        {/* Horizontal Line */}
        <HorizontalLine />

        {/* All Products */}
        <Section>
          <ProductSection topHeading="Explore" heading="All Products" />
        </Section>
        <ChatInterface />
      </div>
    </div>
  );
}
