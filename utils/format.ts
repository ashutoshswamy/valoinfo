export function formatWeaponCategory(category: string): string {
  if (category.includes("::")) {
    return category.split("::")[1];
  }
  return category;
}

export function formatPrice(cost: number): string {
  return `${cost.toLocaleString()} VP`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return "—";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}
