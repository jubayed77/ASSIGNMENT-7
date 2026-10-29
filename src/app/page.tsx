import Hero from "@/components/Hero";
import PriceRisers from "@/components/PriceRisers";
import PriceFallers from "@/components/PriceFallers";
import AllProducts from "@/components/AllProducts";
import { getProducts } from "@/lib/bangla_utils";

const HomePage = async () => {

  const products = await getProducts();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6">
      <Hero />
      <PriceRisers products={products} />
      <PriceFallers products={products} />
      <AllProducts products={products} />
    </div>
  );
};

export default HomePage;