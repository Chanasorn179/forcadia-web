/* Canonical order from the Fourcadir record: Michael, Astraea, Abigail, Last,
   Remuria, Fortuna, Remus, Erebos. Entries added later follow alphabetically. */
export function byCanonicalOrder<T extends { slug: string; name: string }>(order: { slug: string }[]) {
  const rank = (slug: string) => {
    const index = order.findIndex((item) => item.slug === slug);
    return index === -1 ? order.length : index;
  };
  return (a: T, b: T) => rank(a.slug) - rank(b.slug) || a.name.localeCompare(b.name);
}
