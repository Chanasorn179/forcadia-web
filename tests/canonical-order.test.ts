import assert from "node:assert/strict";
import { test } from "node:test";
import { byCanonicalOrder } from "../src/lib/canonical-order";
import { characters } from "../src/data/forcadia";
import { houses } from "../src/data/houses";

test("rulers follow the Fourcadir record, not the alphabet", () => {
  const shuffled = [...characters].sort((a, b) => a.name.localeCompare(b.name));
  const sorted = shuffled.sort(byCanonicalOrder(characters)).map((c) => c.slug.split("-")[0]);
  assert.deepEqual(sorted, ["michael", "astraea", "abigail", "last", "remuria", "fortuna", "remus", "erebos"]);
});

test("Night-Fall is the eighth House, so the home fan can displace it", () => {
  const sorted = [...houses].reverse().sort(byCanonicalOrder(houses));
  assert.equal(sorted.at(-1)?.slug, "night-fall");
  assert.equal(sorted[0]?.slug, "saint-cross");
});

test("entries missing from the record go last, alphabetically", () => {
  const extra = [{ slug: "zeta", name: "Zeta" }, { slug: "alpha", name: "Alpha" }];
  const sorted = [...extra, ...houses].sort(byCanonicalOrder(houses)).map((h) => h.slug);
  assert.deepEqual(sorted.slice(-2), ["alpha", "zeta"]);
});
