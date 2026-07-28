import { characters, cities } from "@/data/forcadia";
import { houses } from "@/data/houses";
import {
  centralCapitalSlug,
  worldLinks,
} from "@/data/world-links";

export function getCharacterBySlug(slug: string) {
  return characters.find((character) => character.slug === slug);
}

export function getHouseBySlug(slug: string) {
  return houses.find((house) => house.slug === slug);
}

export function getCityBySlug(slug: string) {
  return cities.find((city) => city.slug === slug);
}

export function getWorldLinkByCharacterSlug(characterSlug: string) {
  return worldLinks.find(
    (link) => link.characterSlug === characterSlug,
  );
}

export function getWorldLinkByHouseSlug(houseSlug: string) {
  return worldLinks.find((link) => link.houseSlug === houseSlug);
}

export function getWorldLinkByCitySlug(citySlug: string) {
  return worldLinks.find((link) => link.citySlug === citySlug);
}

export function getHouseByCharacterSlug(characterSlug: string) {
  const link = getWorldLinkByCharacterSlug(characterSlug);
  return link ? getHouseBySlug(link.houseSlug) : undefined;
}

export function getCityByCharacterSlug(characterSlug: string) {
  const link = getWorldLinkByCharacterSlug(characterSlug);
  return link ? getCityBySlug(link.citySlug) : undefined;
}

export function getCharacterByHouseSlug(houseSlug: string) {
  const link = getWorldLinkByHouseSlug(houseSlug);
  return link ? getCharacterBySlug(link.characterSlug) : undefined;
}

export function getCityByHouseSlug(houseSlug: string) {
  const link = getWorldLinkByHouseSlug(houseSlug);
  return link ? getCityBySlug(link.citySlug) : undefined;
}

export function getHouseByCitySlug(citySlug: string) {
  const link = getWorldLinkByCitySlug(citySlug);
  return link ? getHouseBySlug(link.houseSlug) : undefined;
}

export function getCharacterByCitySlug(citySlug: string) {
  const link = getWorldLinkByCitySlug(citySlug);
  return link ? getCharacterBySlug(link.characterSlug) : undefined;
}

export function isCentralCapital(citySlug: string) {
  return citySlug === centralCapitalSlug;
}
