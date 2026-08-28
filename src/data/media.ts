const characterArtwork: Record<string, string> = {
  "michael-saint-cross": "/images/portraits/michael.png",
  "astraea-paradiseswan": "/images/portraits/astraea.png",
  "abigail-venom-veil": "/images/portraits/abigail.png",
  "last-void-requiem": "/images/portraits/last.png",
  "remuria-azure-song": "/images/portraits/remuria.png",
  "fortuna-royal-flush": "/images/portraits/fortuna.png",
  "remus-iron-bastion": "/images/portraits/remus.png",
  "erebos-night-fall": "/images/crests-transparent/night-fall.png",
};

export function getCharacterArtwork(slug: string) {
  return characterArtwork[slug] ?? "/images/logos/unity-crown-webmark-gold.png";
}
