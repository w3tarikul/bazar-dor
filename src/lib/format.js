const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const UNIT_BN = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export function toBnDigits(value) {
  return String(value).replace(/[0-9]/g, (d) => BN_DIGITS[d]);
}

export function bnToNumber(value) {
  if (typeof value === "number") return value;
  const ascii = String(value)
    .replace(/[০-৯]/g, (d) => BN_DIGITS.indexOf(d))
    .replace(/[^0-9.-]/g, "");
  const parsed = Number.parseFloat(ascii);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function formatPrice(value) {
  const hasFraction = !Number.isInteger(value);
  return new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPct(pct) {
  return toBnDigits(Math.abs(Number(pct) || 0).toFixed(1));
}

export function unitBn(unit) {
  return UNIT_BN[unit] ?? unit;
}

export const CHANGE_META = {
  up: { arrow: "▲", className: "price-up", title: "গতকালের তুলনায় বেড়েছে" },
  down: { arrow: "▼", className: "price-down", title: "গতকালের তুলনায় কমেছে" },
  flat: { arrow: "—", className: "price-flat", title: "গতকালের তুলনায় অপরিবর্তিত" },
};

export function changeMeta(dir) {
  return CHANGE_META[dir] ?? CHANGE_META.flat;
}

export function bnDate(date = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}
