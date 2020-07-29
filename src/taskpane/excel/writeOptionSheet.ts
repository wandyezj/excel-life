import recreateSheet from "./recreateSheet";

function numberToLetterColumn(n: number) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const base = alphabet.length;
  if (n === 0) {
    throw "zero not supported";
  }

  if (n > base) {
    throw "not yet implemented";
  }

  return alphabet[n - 1];
}

/**
 * Writes Options to a new Excel Sheet Table
 */
export default function writeOptionSheet(
  context: Excel.RequestContext,
  name: string,
  columnTitles: string[],
  rows: (string | number)[][]
) {
  const sheet = recreateSheet(context, name);
  sheet.activate();

  const address = `A1:${numberToLetterColumn(columnTitles.length)}1`;
  const values = [columnTitles];
  //columnTitles.map(value => [value]);

  console.log(address);
  console.log(values);

  const range = sheet.getRange(address);

  range.values = values;
  // [columnTitles]
  //columnTitles.map(value => [value]);

  // Create Table
  const table = sheet.tables.add(range, true);
  table.name = name;

  // Add Rows
  console.log("add rows");
  table.rows.add(undefined, rows);
  // rows.forEach((row) => {

  // })

  // // Add Column Titles
  // columnTitles.forEach((title) => {
  //     table.columns.add(undefined, [], title);
  // });
}
