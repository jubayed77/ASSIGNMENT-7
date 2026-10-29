"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";
import { API_BASE, Category, Product, toBengaliNumber } from "@/lib/bangla_utils";

const CategoryPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setLoading(true);
    setError(false);
    Promise.all([
      fetch(`${API_BASE}/products?category=${slug}`).then((r) => {
        if (!r.ok) throw new Error("products");
        return r.json();
      }),
      fetch(`${API_BASE}/categories/${slug}`).then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([p, c]) => {
        setProducts(p);
        setCategory(c);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return a.today - b.today;
    if (sortBy === "price-desc") return b.today - a.today;
    return 0;
  });

  if (loading) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
        <div className="skeleton h\-[94px] rounded-2xl" />
        <div className="skeleton h\-[66px] rounded-2xl" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h\-[138px] rounded-2xl" />)}
        </div>
      </div>
    );
  }

  if (error || products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-32 text-center">
        <div className="text-6xl">🧺</div>
        <p className="text-xl font-semibold">কোনো পণ্য পাওয়া যায়নি</p>
        <Link href="/" className="btn btn-primary rounded-lg">হোম পেজে ফিরে যান</Link>
      </div>
    );
  }

  const icon = category?.icon || products[0].categoryIcon;
  const name = category?.nameBn || products[0].categoryNameBn;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p\-[21px]">
        <span className="text-4xl leading-10">{icon}</span>
        <div>
          <h1 className="text-2xl font-bold leading-8">{name}</h1>
          <p className="text-sm text-base-content/70">{toBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-end rounded-2xl border border-base-300 bg-base-100 p\-[17px]">
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
        <p className="text-sm text-base-content/70">মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;