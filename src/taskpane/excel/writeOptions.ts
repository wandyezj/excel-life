import writeOptionSheet from "./writeOptionSheet";

export default async function writeOptions(categories: any) {
  await Excel.run(async context => {
    const categoryNames = Object.getOwnPropertyNames(categories);
    for (let categoryName of categoryNames) {
      //console.log(categoryName);
      const category: { properties: { names: string[] }; options: any[] } = categories[categoryName];
      //console.log(category);
      const { properties, options } = category;
      const propertyNames = properties.names;

      const rows = options.map(item => propertyNames.map(property => item[property]));

      // convert object to rows
      //console.log(rows);
      writeOptionSheet(context, categoryName, propertyNames, rows);
      await context.sync();
    }
  });
}
