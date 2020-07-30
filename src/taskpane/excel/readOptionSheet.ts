/**
 * Read Options from an Excel Sheet Table
 */
export default async function readOptionSheet(
  context: Excel.RequestContext,
  name: string,
  columnTitles: string[]
): Promise<(string | number | undefined)[][]> {
  const book = context.workbook;
  const table = book.tables.getItemOrNullObject(name);
  const dataRange = table.getDataBodyRange();
  const headerRange = table.getHeaderRowRange();
  dataRange.load("values");
  headerRange.load("values");
  await context.sync();
  if (table.isNullObject) {
    return [];
  }

  const headerRaw = headerRange.values;
  const data = dataRange.values;

  if (headerRaw.length <= 0) {
    return [];
  }

  const header = headerRaw[0];

  console.log(columnTitles);
  console.log(header);
  console.log(data);

  const titleIndices = columnTitles.map(title => header.indexOf(title));

  // Look at this mapping fun!
  // remap each row to desired title index
  const rows = data.map(row => titleIndices.map(index => (index >= 0 && row.length > index ? row[index] : undefined)));

  return rows;

  // build return mapped to appropriate columns

  // map header to title to data

  // const columns = table.columns;
  // const rows = table.rows;
  // columns.load()
  // table.columns.items[0].name
  // table.rows.load("items")

  //   context.workbook.worksheets.getItemOrNullObject(name);
  //   const sheet = recreateSheet(context, name);
  //   sheet.activate();

  //   const address = `A1:${numberToLetterColumn(columnTitles.length)}1`;
  //   const values = [columnTitles];
  //   //columnTitles.map(value => [value]);

  //   console.log(address);
  //   console.log(values);

  //   const range = sheet.getRange(address);

  //   range.values = values;
  //   // [columnTitles]
  //   //columnTitles.map(value => [value]);

  //   // Create Table
  //   const table = sheet.tables.add(range, true);
  //   table.name = name;

  //   // Add Rows
  //   console.log("add rows");
  //   table.rows.add(undefined, rows);
  //   // rows.forEach((row) => {

  //   // })

  //   // // Add Column Titles
  //   // columnTitles.forEach((title) => {
  //   //     table.columns.add(undefined, [], title);
  //   // });
}
