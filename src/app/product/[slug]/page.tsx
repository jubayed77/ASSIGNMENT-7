import Link from "next/link";
import { notFound } from "next/navigation";
import { dirArrow, dirColor } from "@/components/ChangeText";
import { Product, getProducts, getUnitBn, taka, toBengaliNumber } from "@/lib/bangla_utils";

export const  getProduct = async(slug: string): Promise<Product | null> => {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) || null;
}

function Stat({ label, value, note, valueClass = "" }: { label: string; value: string; note: string; valueClass?: string }) {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 px-[25px] py-[17px]">
      <p className="text-xs text-base-content/60">{label}</p>
      <p className={`text-2xl font-bold leading-8 ${valueClass}`}>{value}</p>
      <p className="text-xs text-base-content/60">{note}</p>
    </div>
  );
}

const ProductPage = async({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const unitBn = getUnitBn(product.unit);
  const unitShort = unitBn.replace("প্রতি ", "");

  const rows = product.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const marketsByDivision = product.markets.reduce((acc, m) => {
    if (!acc[m.division]) acc[m.division] = [];
    acc[m.division].push(m);
    return acc;
  }, {} as Record<string, typeof product.markets>);
  const divisionCount = Object.keys(marketsByDivision).length;

  const minPrice = Math.min(...product.markets.map((m) => m.min));
  const maxPrice = Math.max(...product.markets.map((m) => m.max));
  const avgPrice = Math.round(product.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / product.markets.length);

  const { dir, pct } = product.change;
  const diff = Math.abs(product.today - product.yesterday);
  const changeLine =
    dir === "up"
      ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${taka(diff)}`
      : dir === "down"
        ? `গতকালের তুলনায় আজ দাম কমেছে · ${taka(diff)}`
        : "গতকালের তুলনায় আজ দামের পরিবর্তন নেই";

  const history = [
    { label: "আজ", value: product.today },
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <div className="breadcrumbs py-2 text-sm">
        <ul>
          <li><Link href="/">হোম</Link></li>
          <li><Link href={`/category/${product.category}`}>{product.categoryNameBn}</Link></li>
          <li>{product.nameBn}</li>
        </ul>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-[21px] md:flex-row md:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl">{product.image}</div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold leading-9">{product.nameBn}</h1>
          <p className="text-sm text-base-content/70">{unitBn} · {product.categoryNameBn}</p>
          <p className="mt-2 text-sm">{changeLine}</p>
        </div>
        <div className="flex flex-col items-center rounded-2xl bg-base-200 px-5 py-4 text-sm">
          <span className="text-base-content/70">আজকের দাম</span>
          <span className="text-3xl font-bold leading-9">{toBengaliNumber(product.today)}</span>
          <span className="text-base-content/70">টাকা / {unitShort}</span>
          <span className={`mt-1 flex items-center gap-1 font-semibold ${dirColor[dir]}`}>
            <span>{dirArrow[dir]}</span>
            {dir !== "flat" && <span>{toBengaliNumber(pct)}%</span>}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6 rounded-2xl border border-base-300 bg-base-100 p-[21px]">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold leading-7">দামের সারসংক্ষেপ</h2>
          <div className="grid gap-3 md:grid-cols-3">
            <Stat label="সর্বনিম্ন দাম" value={taka(minPrice)} note="সবচেয়ে কম দামের বাজার" valueClass="text-success" />
            <Stat label="সর্বাধিক দাম" value={taka(maxPrice)} note="সবচেয়ে বেশি দামের বাজার" valueClass="text-error" />
            <Stat label="গড় দাম" value={taka(avgPrice)} note={`${unitBn}-এর হিসাবে`} />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold leading-7">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
            <table className="table w-full text-sm">
              <thead>
                <tr className="border-base-content/5 text-base-content/60">
                  <th className="px-4 py-3 font-bold">বাজার</th>
                  <th className="px-4 py-3 font-bold">বিভাগ</th>
                  <th className="px-4 py-3 text-right font-bold">সর্বনিম্ন</th>
                  <th className="px-4 py-3 text-right font-bold">সর্বাধিক</th>
                  <th className="px-4 py-3 text-right font-bold">গড়</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((m, i) => (
                  <tr key={`${m.market}-${i}`} className={`border-base-content/5 ${i % 2 === 1 ? "bg-base-200" : ""}`}>
                    <td className="px-4 py-3 font-medium">{m.market}</td>
                    <td className="px-4 py-3 text-base-content/70">{m.division}</td>
                    <td className="px-4 py-3 text-right">{taka(m.min)}</td>
                    <td className="px-4 py-3 text-right">{taka(m.max)}</td>
                    <td className="px-4 py-3 text-right font-semibold">{taka(m.avg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-base-content/60">{toBengaliNumber(divisionCount)}টি বিভাগের {toBengaliNumber(rows.length)}টি বাজারের তথ্য।</p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold leading-7">দামের তুলনা</h2>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {history.map((h) => (
              <div key={h.label} className="rounded-2xl bg-base-200 px-5 py-4">
                <p className="text-xs text-base-content/60">{h.label}</p>
                <p className="text-xl font-bold leading-7">{taka(h.value)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="flex gap-2">
        <Link href={`/category/${product.category}`} className="btn btn-ghost h-10 min-h-10 rounded-lg px-[17px] font-semibold">
          {product.categoryIcon} সব {product.categoryNameBn}
        </Link>
      </div>
    </div>
  );
}

export default ProductPage;
