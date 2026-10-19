import assert from "node:assert/strict";
import { test } from "node:test";
import { parseCharacterForm } from "../src/lib/character-form";

function form(overrides: Record<string, string> = {}) {
  const data = new FormData();
  const base: Record<string, string> = {
    name: "Michael Fourcadir Saint-Cross",
    thaiName: "ไมเคิล",
    title: "The Living Sun",
    summary: "จักรพรรดิแห่งแสงศักดิ์สิทธิ์",
    keyName: "The Key of Domination",
    eye: "Eye of Solar Judgment",
    domain: "Eternal Daybreak",
    army: "The Solaris Crusade",
    powers: "Solaris Divinity\nDivine Edict, Heaven's Fall",
    accent: "#e7c66f",
    symbol: "☀",
    history: "  ผู้ถือกฎ  ",
    weakness: "   ",
    ...overrides,
  };
  for (const [key, value] of Object.entries(base)) data.set(key, value);
  return data;
}

test("parses a valid character and derives its slug from the name", () => {
  const parsed = parseCharacterForm(form());
  assert.ok(parsed);
  assert.equal(parsed.slug, "michael-fourcadir-saint-cross");
  assert.deepEqual(parsed.powers, ["Solaris Divinity", "Divine Edict", "Heaven's Fall"]);
});

test("optional lore is trimmed, and blank lore becomes null", () => {
  const parsed = parseCharacterForm(form());
  assert.equal(parsed?.history, "ผู้ถือกฎ");
  assert.equal(parsed?.weakness, null);
  assert.equal(parsed?.followers, null);
});

test("rejects a missing required field or a malformed accent", () => {
  assert.equal(parseCharacterForm(form({ title: "" })), null);
  assert.equal(parseCharacterForm(form({ accent: "gold" })), null);
});
