const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const API_BASE = "https://api.api-store.workers.dev/api/bazardor";

export function toBengaliNumber(num: number | string): string {
  return String(num).replace(/[0-9]/g, (d) => bengaliDigits[Number(d)]);
}

/** 1850 -> "১,৮৫০" */
export function formatPrice(price: number): string {
  return toBengaliNumber(price.toLocaleString("en-IN"));
}

/** 63.5 -> "৬৩.৫০", 66 -> "৬৬" */
export function formatDecimal(n: number): string {
  return Number.isInteger(n) ? formatPrice(n) : toBengaliNumber(n.toFixed(2));
}

/** 66 -> "৬৬ টাকা" */
export function taka(price: number): string {
  return `${formatDecimal(price)} টাকা`;
}

const units: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  l: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
  hali: "প্রতি হালি",
  gram: "প্রতি গ্রাম",
  g: "প্রতি গ্রাম",
};

export function getUnitBn(unit: string): string {
  return units[unit.toLowerCase()] || `প্রতি ${unit}`;
}

/** "প্রতি কেজি" -> "কেজি" */
export function getUnitShort(unit: string): string {
  return getUnitBn(unit).replace("প্রতি ", "");
}

export function getBanglaDate(): string {
  const days = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
  const months = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
  const d = new Date();
  return `${days[d.getDay()]}, ${toBengaliNumber(d.getDate())} ${months[d.getMonth()]}, ${toBengaliNumber(d.getFullYear())}`;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
