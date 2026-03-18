export function sanitizeCurrencyEditingValue(value: string) {
  return value.replace(/[^\d,.-]/g, "");
}

export function formatCurrencyInputBRL(value: string) {
  const sanitized = sanitizeCurrencyEditingValue(value).trim();
  if (!sanitized) return "";

  if (/[.,]/.test(sanitized)) {
    const normalized = sanitized.replace(/\./g, "").replace(",", ".");
    const parsed = Number(normalized);
    if (Number.isFinite(parsed)) {
      return parsed.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  }

  const digits = sanitized.replace(/\D/g, "");
  if (!digits) return "";

  return Number(digits).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function getCurrencyEditingValue(value: string) {
  const sanitized = sanitizeCurrencyEditingValue(value).trim();
  if (!sanitized) return "";

  const commaIndex = sanitized.lastIndexOf(",");
  if (commaIndex >= 0) {
    const integerPart = sanitized.slice(0, commaIndex).replace(/\./g, "").replace(/\D/g, "");
    const decimalPart = sanitized.slice(commaIndex + 1).replace(/\D/g, "");
    if (!decimalPart || /^0+$/.test(decimalPart)) {
      return integerPart;
    }
    return `${integerPart},${decimalPart}`;
  }

  return sanitized.replace(/\D/g, "");
}
