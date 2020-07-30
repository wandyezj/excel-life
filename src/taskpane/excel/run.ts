import writeOptionSheet from "./writeOptionSheet";

export default async function run() {
await Excel.run(async context => {
    writeOptionSheet(
      context,
      "test",
      ["number", "name", "letter"],
      [
        [1, "one", "A"],
        [2, "two", "B"],
        [3, "three", "C"]
      ]
    );
    // /**
    //  * Insert your Excel code here
    //  */
    // const range = context.workbook.getSelectedRange();

    // // Read the range address
    // range.load("address");

    // // Update the fill color
    // range.format.fill.color = "yellow";

    // await context.sync();
    // console.log(`The range address was ${range.address}.`);
  });
}