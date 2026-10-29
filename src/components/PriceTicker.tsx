"use client";

import { useEffect, useState } from "react";

import ChangeText from "./ChangeText";

import { API_BASE, Product, formatPrice, getUnitShort } from "@/lib/bangla_utils";

const  PriceTicker = () => {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/products`)

      .then((r) => r.json())

      .then(setProducts)
      
      .catch(() => {});
  }, []);

  if (!products.length) return <div className="h\-[37px\] border-b border-base-300 bg-base-100" />;

  const tickerItems = [...products, ...products];

  return (
    <div className="overflow-hidden border-b border-base-300 bg-base-100">

      <div className="flex w-max animate-marquee">

        {tickerItems.map((p, i) => (

          <div key={`${p.id}-${i}`} className="flex items-center gap-1.5 whitespace-nowrap py-2 pl-4 pr\-[17px\] text-sm">
            <span>{p.image}

            </span>

            <span className="font-medium">{p.nameBn}

            </span>
            <span className="text-base-content/70">

              {formatPrice(p.today)} টাকা/{getUnitShort(p.unit)}

            </span>

            <ChangeText dir={p.change.dir} pct={p.change.pct} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PriceTicker;
