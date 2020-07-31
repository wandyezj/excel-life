import recreateSheet from "./recreateSheet";

export default async function chartExpenses(expenses: { category: string; cost: number }[]) {
  await Excel.run(async context => {
    //const book = context.workbook;
    const sheet = recreateSheet(context, "budget");
    sheet.activate();

    // write range with expense data
    const expenseRowHeader = ["Expense Category", "Cost"];
    const expenseRows = [expenseRowHeader, ...expenses.map(({ category, cost }) => [category, cost])];
    const expenseRange = sheet.getRangeByIndexes(0, 0, expenseRows.length, expenseRowHeader.length);
    expenseRange.values = expenseRows;
    expenseRange.format.autofitColumns();

    const table = sheet.tables.add(expenseRange, true);
    //table.sort.apply
    //table.showFilterButton = true;

    const sortFields = [
      {
        key: 1,
        ascending: false
      }
    ];

    table.sort.apply(sortFields);

    const chart = sheet.charts.add(Excel.ChartType.treemap, expenseRange, Excel.ChartSeriesBy.columns);
    chart.name = "Controllable Expenses"; // can't control taxes
    //chart.seriesNameLevel
    // /? can't set a charts title? - oh its a buried property
    chart.title.text = "Controllable Expenses";

    // Size
    chart.width = 650;
    chart.height = 400;

    const series = chart.series.getItemAt(0);
    // Documentation does not specify valid value range
    //series.doughnutHoleSize = 60;

    const seriesDataLabels = series.dataLabels;
    //seriesDataLabels.separator = "\n";
    seriesDataLabels.showValue = true;
    //seriesDataLabels.
    seriesDataLabels.showCategoryName = true;
    //seriesDataLabels.showPercentage = true;
    //seriesDataLabels.separator = "\n"

    const legend = chart.legend;
    //legend.position =Excel.ChartLegendPosition.invalid
    legend.visible = false;
    //legend.position = Excel.ChartLegendPosition.left;
    //legend.format.font.size = 14;

    const dataLabels = chart.dataLabels;
    //dataLabels.separator = " "; //weird interaction with hierarchy
    dataLabels.showCategoryName = true;
    dataLabels.showValue = true;
    // dataLabels.separator = "\n";
    //dataLabels.showSeriesName = true; //"cost"
    // dataLabels.showBubbleSize = true; // ?

    //dataLabels.showPercentage = true;

    const dataLabelsFont = dataLabels.format.font;
    dataLabelsFont.color = "white";
    dataLabelsFont.size = 16;
  });
}
