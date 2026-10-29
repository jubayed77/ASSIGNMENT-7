import ProductCard from "./ProductCard";
import { Product, toBengaliNumber } from "@/lib/bangla_utils";

const AllProducts = ({ products }: { products: Product[] }) => {
  return (
    <section id="সব-পণ্য" className="flex scroll-mt-32 flex-col gap-3">
      <h2 className="text-xl font-bold">সব পণ্য</h2>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-base-content/70">মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}

export default AllProducts;
