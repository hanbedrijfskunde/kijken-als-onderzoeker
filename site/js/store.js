// Opslag van voortgang en antwoorden. Alles blijft in de browser van de student.
// Werkt localStorage niet (privémodus, ingesloten frame), dan werkt alles in het geheugen.

export const STORE_KEY = 'kijken-als-onderzoeker/v1';

export function safeLocalStorage() {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

function probe(storage) {
  if (!storage) return false;
  try {
    const k = `${STORE_KEY}/probe`;
    storage.setItem(k, '1');
    storage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

function load(storage, key) {
  try {
    const raw = storage?.getItem(key);
    const data = raw ? JSON.parse(raw) : {};
    return data && typeof data === 'object' ? data : {};
  } catch {
    return {};
  }
}

export function createStore(storage, key = STORE_KEY) {
  const persistent = probe(storage);
  let data = persistent ? load(storage, key) : {};

  function save() {
    if (!persistent) return;
    try {
      storage.setItem(key, JSON.stringify(data));
    } catch {
      // Vol of geblokkeerd: het geheugen blijft gelden.
    }
  }

  return {
    persistent,
    get(path, fallback) {
      let node = data;
      for (const part of path.split('.')) {
        if (node == null || typeof node !== 'object' || !(part in node)) return fallback;
        node = node[part];
      }
      return node;
    },
    set(path, value) {
      const parts = path.split('.');
      let node = data;
      for (const part of parts.slice(0, -1)) {
        if (node[part] == null || typeof node[part] !== 'object') node[part] = {};
        node = node[part];
      }
      node[parts.at(-1)] = value;
      save();
    },
    reset() {
      data = {};
      if (persistent) {
        try { storage.removeItem(key); } catch { /* niets te doen */ }
      }
    },
    snapshot() {
      return structuredClone(data);
    },
  };
}
