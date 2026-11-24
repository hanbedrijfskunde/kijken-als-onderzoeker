// Opgeslagen vinkjes zijn een lijst van nummers. Een oudere of kapotte opslag kan iets anders bevatten.
export function indexLijst(raw) {
  return Array.isArray(raw) ? raw.filter((x) => Number.isInteger(x) && x >= 0) : [];
}
