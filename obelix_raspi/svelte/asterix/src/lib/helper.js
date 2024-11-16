
export function strToId (name) {
  let newName = name.toLowerCase().trim()
    .replace('ä', 'ae')
    .replace('ö', 'oe')
    .replace('ü', 'ue')
    .replace('ß', 'ss');
  return newName.replace(/\W+/g, "_");
}