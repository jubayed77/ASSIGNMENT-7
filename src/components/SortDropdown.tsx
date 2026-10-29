"use client";
const  SortDropdown = ({ value, onChange }: { value: string; onChange: (v: string) => void })  => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-base-content/70">সাজান</span>
      <select
        className="select select-sm h-8 min-h-8 rounded-lg border-base-content/20 bg-base-100 text-xs"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-asc">দাম: কম থেকে বেশি</option>
        <option value="price-desc">দাম: বেশি থেকে কম</option>
      </select>
    </div>
  );
}

export default SortDropdown;
