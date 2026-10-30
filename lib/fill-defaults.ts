const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

/**
 * Adds fields that exist in the defaults but are missing from a stored DB
 * value, so a field added to content/defaults.ts later (like the FAQ colours)
 * shows up in the dashboard and on the site for rows saved before it existed.
 * Array items borrow from the default item at the same position, or the
 * first one for items beyond the defaults. Stored values always win.
 */
export function fillMissing(value: unknown, defaults: unknown): unknown {
  if (Array.isArray(value) && Array.isArray(defaults)) {
    return value.map((item, i) => fillMissing(item, defaults[i] ?? defaults[0]));
  }
  if (isPlainObject(defaults) && !isPlainObject(value) && !Array.isArray(value)) {
    return repairPlainItem(value, defaults);
  }
  if (isPlainObject(value) && isPlainObject(defaults)) {
    const result: Record<string, unknown> = { ...value };
    for (const [k, d] of Object.entries(defaults)) {
      result[k] = k in value ? fillMissing(value[k], d) : structuredClone(d);
    }
    return result;
  }
  return value;
}

/**
 * An empty copy of a content item: text cleared, lists emptied, switches off.
 * Colours are kept so a new item starts with working colour pickers.
 */
export function emptyLike(item: unknown): unknown {
  if (typeof item === "string") return HEX_COLOR.test(item) ? item : "";
  if (typeof item === "boolean") return false;
  if (Array.isArray(item)) return [];
  if (isPlainObject(item)) {
    return Object.fromEntries(
      Object.entries(item).map(([k, v]) => [k, emptyLike(v)]),
    );
  }
  return "";
}

/**
 * Turns a list item stored as plain text back into the shape it should have.
 * The dashboard used to add text items to a list that had been emptied (an
 * FAQ category became just its title), so the text is kept as the item's
 * first text field.
 */
function repairPlainItem(value: unknown, defaults: Record<string, unknown>) {
  const shell = emptyLike(defaults) as Record<string, unknown>;
  if (typeof value === "string" && value) {
    const firstText = Object.keys(defaults).find(
      (k) => typeof defaults[k] === "string" && !HEX_COLOR.test(defaults[k]),
    );
    if (firstText) shell[firstText] = value;
  }
  return shell;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}
