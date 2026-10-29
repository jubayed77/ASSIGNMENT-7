import Link from "next/link";

import ChangeText from "./ChangeText";

import { Product, getUnitBn, taka } from "@/lib/bangla_utils";


const ProductCard = ({ product }: { product: Product }) => {
  return (

    <Link
      href={`/product/${product.slug}`}
      className="card rounded-2xl border border-base-300 bg-base-100 transition hover:border-primary hover:shadow-md"
    >
      <div className="card-body gap-3 p-4">
        <div className="flex gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl">{product.image}</div>
          <div>
            <h3 className="font-semibold leading-6">{product.nameBn}</h3>
            <p className="text-xs text-base-content/60">{getUnitBn(product.unit)}</p>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-base-content/70">আজকের দাম</p>
            <p className="text-xl font-bold leading-7">{taka(product.today)}</p>
          </div>
          <span className="inline-flex items-center rounded-full bg-base-200 px-2 py-1 text-xs">
            <ChangeText dir={product.change.dir} pct={product.change.pct} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export  default ProductCard;