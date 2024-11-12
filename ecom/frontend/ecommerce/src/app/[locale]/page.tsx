import Carousel from "@/components/homepage/Carousel";
import SectionHeader from "@/components/homepage/SectionHeader";
import Button from "@/components/Button";
import Filter from "@/components/filtering/Filter";
import axios from "axios";
import { Product } from "@/types/productTypes";
import ProductCard from "@/components/products/ProductCard";

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

const fetchData = async () => {
  const response = await axios.get("http://django-app:8000/products/");
  return response.data;
};

export default async function HomePage() {
  let products = await fetchData();
  products = products.slice(0, 5);
  return (
    <div className="container md:px-2 mx-auto">
      <main className="flex flex-col items-center justify-center gap-14">
        {/* Carousel */}
        <section className="w-full">
          <Carousel images={images} largeImages={largeImages} />
        </section>

        {/* Categories */}
        <section className="flex flex-col gap-10 md:gap-[60px] w-full px-3.5 md:px-0">
          <Filter />
        </section>

        {/* Horizontal line */}
        <div className="w-full px-3.5 md:px-0">
          <hr className="border-0.5 border-black" />
        </div>

        {/* Best Selling Products */}
        <section className="flex flex-col gap-10 md:gap-[60px] w-full px-3.5 md:px-0">
          <SectionHeader
            topHeading="This Month"
            heading="Best Selling Products"
            buttons={[
              <Button
                text="View All"
                className="md:w-40 md:h-14 md:text-base"
              />,
            ]}
          />
          <div className="flex flex-col justify-center items-center lg:flex-row">
            {products.map((product: Product) => (
              <ProductCard product={product} imageUrl={product.image} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
