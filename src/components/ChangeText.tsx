import { toBengaliNumber } from "@/lib/bangla_utils";

type Dir = "up" | "down" | "flat";

export const dirColor: Record<Dir, string> = {
  up: "text-error",
  down: "text-success",
  flat: "text-base-content/60",
};

export const dirArrow: Record<Dir, string> = { up: "▲", down: "▼", flat: "—" };


const ChangeText = ({ dir, pct }: { dir: Dir; pct: number }) => {

  return (

    <span className={`font-semibold ${dirColor[dir]}`}>

      {dirArrow[dir]}

      {dir !== "flat" && ` ${toBengaliNumber(pct)}%`}
    </span>
  );
}
export default ChangeText;