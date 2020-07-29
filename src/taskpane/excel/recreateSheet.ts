export default function recreateSheet(context: Excel.RequestContext, name: string) {
  const book = context.workbook;
  const sheets = book.worksheets;
  const sheet = sheets.getItemOrNullObject(name);
  sheet.delete();
  return sheets.add(name);
}
