import recreateSheet from "./recreateSheet";

export default async function chartInvestment(amount: number) {
    console.log("chartInvestment")
    await Excel.run(async(context) => {
        const sheet = recreateSheet(context, "invest");
        sheet.activate();
        const range = sheet.getRange("A1");
        range.values = [["invest"]];

        const count = 40;
        const offset = 2;
        const address = `A${offset}:A${offset + count - 1}`;
        const dataRange = sheet.getRange(address);
        //console.log(address);
    
        const assumedInterest = 0.08;

        const formulas = [];
        for (let i = 0; i < count; i++ ) {
            const formula = `=FV(${assumedInterest}, ${i}, -${amount})`;
            formulas.push([formula]);
        };

        //dataRange.load("values");
        //await context.sync();
        //console.log(dataRange.values);
        //console.log(formulas);
        dataRange.formulas = formulas;

        dataRange.format.autofitColumns();

        // create chart

        //.values = [[amount]];
        
        // write out formula

        //const formulaRange = ""
    });
}