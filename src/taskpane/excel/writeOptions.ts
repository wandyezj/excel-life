import writeOptionSheet from "./writeOptionSheet";

export default async function writeOptions(categories: any) {
  await Excel.run(async context => {
    const categoryNames = Object.getOwnPropertyNames(categories);
    for (let categoryName of categoryNames) {
      console.log(categoryName);
      const category: { properties: string[]; options: any[] } = this.categories[categoryName];

      const { properties, options } = category;

      const rows = options.map(item => properties.map(property => item[property]));

      // convert object to rows
      writeOptionSheet(context, categoryName, properties, rows);
      await context.sync();
    }
  });
}
