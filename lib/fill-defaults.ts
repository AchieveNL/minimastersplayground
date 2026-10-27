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
  if (isPlainObject(value) && isPlainObject(defaults)) {
    const result: Record<string, unknown> = { ...value };
    for (const [k, d] of Object.entries(defaults)) {
      result[k] = k in value ? fillMissing(value[k], d) : structuredClone(d);
    }
    return result;
  }
  return value;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}
