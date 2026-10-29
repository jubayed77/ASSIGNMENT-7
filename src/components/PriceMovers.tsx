import ProductCard from "./ProductCard";

import { Product } from "@/lib/bangla_utils";

const PriceMovers = ({ dir, products }: { dir: "up" | "down"; products: Product[] }) => {

  const movers = products
  
    .filter((p) => p.change.dir === dir)

    .sort((a, b) => b.change.pct - a.change.pct)

    .slice(0, 6);

  if (!movers.length) return null;

  return (

    <section className="flex flex-col gap-3">

      <div className="flex items-center gap-2">

        <span className={dir === "up" ? "text-error" : "text-success"}>{dir === "up" ? "▲" : "▼"}

        </span>
        <h2 className="text-xl font-bold">{dir === "up" ? "আজ দাম বেড়েছে" : "আজ দাম কমেছে"}

        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {movers.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

export default PriceMovers;