import writeOptionSheet from "./writeOptionSheet";
import readOptionSheet from "./readOptionSheet";

export default async function run() {
await Excel.run(async context => {

    const name = "test";
    const header = ["number", "name", "letter"];
    writeOptionSheet(
      context,
      name,
      header,
      [
        [1, "one", "A"],
        [2, "two", "B"],
        [3, "three", "C"]
      ]
    );

    const data = await readOptionSheet(context, name, ["letter", "number"]);
    console.log("new data");
    console.log(data);

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