import PriceMovers from "./PriceMovers";
import { Product } from "@/lib/bangla_utils";

const PriceRisers = ({ products }: { products: Product[] }) => {
  return <PriceMovers dir="up" products={products} />;
}
export default PriceRisers;


