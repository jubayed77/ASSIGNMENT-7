import PriceMovers from "./PriceMovers";
import { Product } from "@/lib/bangla_utils";

const PriceFallers = ({ products }: { products: Product[] }) => {
  return <PriceMovers dir="down" products={products} />;
}

export default PriceFallers;


