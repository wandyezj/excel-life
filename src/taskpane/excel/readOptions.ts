import readOptionSheet from "./readOptionSheet";

export default async function readOptions(existingCategories: any) {
  await Excel.run(async context => {
    const categoryNames = Object.getOwnPropertyNames(existingCategories);
    for (let categoryName of categoryNames) {
      console.log(categoryName);
      const category: { properties: { names: string[] }; options: any[] } = existingCategories[categoryName];
      const { properties } = category;
      const propertyNames = properties.names;

      // map options to table rows
      const dataRows = await readOptionSheet(context, categoryName, propertyNames);

      // build objects
      const newOptions = dataRows.map(row =>
        row
          .map((value, index) => {
            const key = propertyNames[index];
            return {
              [key]: value
            };
          })
          .reduce((previous, current) => {
            return { ...previous, ...current };
          }, {})
      );

      // update existing categories
      existingCategories[categoryName].options = newOptions;
    }
  });
}
