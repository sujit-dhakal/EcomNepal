import Carousel from "@/components/homepage/Carousel";
import Filter from "@/components/filtering/Filter";
import ProductSection from "@/components/homepage/ProductSection";
import ChatInterface from "@/components/chatbot/ChatInterface";
import { HorizontalLine, Section } from "@/components/homepage/LayoutSections";

const images = [
  "/images/homepage/carousel/buy.png",
  "/images/homepage/carousel/sale.png",
  "/images/homepage/carousel/phone.png",
];

export default async function HomePage() {
  return (
    <div className="container md:px-2 mx-auto">
      <div className="flex flex-col items-center justify-center gap-14">
        {/* Carousel */}
        <section className="w-full">
          <Carousel images={images} />
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
        {/* <HorizontalLine /> */}

        <Section>
          <img src="/images/homepage/banner.png" className="lg:my-[50px]"></img>
        </Section>

        {/* All Products */}
        <Section>
          <ProductSection topHeading="Explore" heading="All Products" />
        </Section>
        <ChatInterface />
      </div>
    </div>
  );
}
