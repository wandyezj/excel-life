import * as React from "react";
//import Header from "./Header";
import List from "./List";
import Progress from "./Progress";
import Select from "./Select";
import getTransportationOptions from "../data/getTransportationOptions";
import getOccupationOptions from "../data/getOccupationOptions";
import getHousingOptions from "../data/getHousingOptions";
import getTaxForIncome from "../data/getTaxForIncome";
import run from "../excel/run";
import OccupationOptionProperties from "../data/OccupationOptionProperties";
import ExpenseOptionProperties from "../data/ExpenseOptionProperties";
import writeOptions from "../excel/writeOptions";
import readOptions from "../excel/readOptions";
import recreateSheet from "../excel/recreateSheet";

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

// All state must be stored as part of the global state of the application
export interface AppState {
  // indices of selected option
  occupation: number;
  transportation: number;
  housing: number;
  //categories:any;
}

interface Expense {
  category: string;
  cost: number;
}

function optionNames(options: { name: string }[]) {
  return options.map(({ name }) => name);
}

export default class App extends React.Component<AppProps, AppState> {
  private categories = {
    occupation: {
      properties: OccupationOptionProperties,
      options: getOccupationOptions()
    },
    housing: {
      properties: ExpenseOptionProperties,
      options: getHousingOptions()
    },
    transportation: {
      properties: ExpenseOptionProperties,
      options: getTransportationOptions()
    }
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      occupation: 0,
      transportation: 0,
      housing: 0
    };
  }

  componentDidMount() {
    this.setState({
      occupation: 0,
      transportation: 0,
      housing: 0
    });
  }

  click = async () => {
    try {
      await run();
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: disable changes while loading
  // lock input in sheets, lock input in UI
  clickReadOptions = async () => {
    try {
      await readOptions(this.categories);
    } catch (error) {
      console.error(error);
    }
    console.log(this.categories);
    // Requires Force Update of the UI until figure out how to update a state with a complex object
    // TODO: figure out how to update existing indices on the state since the data has changed

    this.forceUpdate();
  };

  clickWriteOptions = async () => {
    try {
      await writeOptions(this.categories);
    } catch (error) {
      console.error(error);
    }
  };



  clickBudget = async () => {
    //const income = this.getIncome()
    const expenses = this.getControllableExpenses();
    try {
      await Excel.run(async(context)=> {
        //const book = context.workbook;
        const sheet = recreateSheet(context, "budget");
        sheet.activate();

        // write range with expense data
        const expenseRowHeader = ["Expense Category", "Cost"];
        const expenseRows = 
        [
          expenseRowHeader,
          ...expenses.map(({category, cost}) => [category, cost])
        ]
        const expenseRange = sheet.getRangeByIndexes(0,0, expenseRows.length, expenseRowHeader.length);
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
        dataLabelsFont.color = "white"
        dataLabelsFont.size = 16;
      });
    } catch (error) {
      console.error(error);
    }
  }

  getControllableExpenses() {
    
    const transportation: Expense = {
      category: "Transportation",
      ...this.categories.transportation.options[this.state.transportation]
    };

    const housing: Expense = {
      category: "Housing",
      ...this.categories.housing.options[this.state.housing]
    };

    const healthcare: Expense = {
      category: "Healthcare",
      cost: 5000
    };

    const phone: Expense = {
      category: "Phone",
      cost: 1000
    };
    const clothing: Expense = {
      category: "Clothing",
      cost: 600
    };
    const food = {
      category: "Food",
      cost: 4000
    };


    // Entertainment

    const expenses = [transportation, housing, phone, clothing, healthcare, food];
    return expenses
  }

  getExpenses(totalIncome: number) {

    const taxes = {
      category: "Tax (estimate)",
      cost: getTaxForIncome(totalIncome)
    };

    // Entertainment

    const expenses = [...this.getControllableExpenses(), taxes];
    return expenses
  }



  getIncome() {

    const occupation = {
      category: "Occupation",
      ...this.categories.occupation.options[this.state.occupation]
    };

    return occupation.income;

  }

  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="assets/icon-300.png" message="Please sideload your addin to see app body." />
      );
    }

    // Income
    const totalIncome = this.getIncome();

    // Expenses
    const expenses = this.getExpenses(totalIncome);

    const totalExpenses = expenses.reduce((previous, current) => previous + current.cost, 0);

    const totalRemaining = totalIncome - totalExpenses;

    const inGreen = totalRemaining >= 0;
    const finalMessage = {
      spanClass: inGreen ? "invest" : "debt",
      title: inGreen ? "Invest" : "Debt",
      amount: inGreen ? totalRemaining : totalRemaining * -1,
      message: inGreen
        ? "Good Job! You can invest in your future."
        : "You are in debt! Find a higher paying job or cut expenses."
    };

    return (
      <div>
        <h1>Simulate Your Life</h1>
        <h5>Explore Your Choices</h5>
        <button onClick={this.clickBudget}>Budget</button>
        <button onClick={this.clickWriteOptions}>Write Options</button>
        <button onClick={this.clickReadOptions}>Read Options</button>

        <h4>Lifestyle</h4>
        <span>Occupation</span>
        <Select
          id="occupation-options"
          options={optionNames(this.categories.occupation.options)}
          onChange={(index: number) => {
            this.setState({ occupation: index });
          }}
        />
        <br />
        <span>Transportation</span>
        <Select
          id="transportation-options"
          options={optionNames(this.categories.transportation.options)}
          onChange={(index: number) => {
            this.setState({ transportation: index });
          }}
        />
        <br />
        <span>Housing</span>
        <Select
          id="housing-options"
          options={optionNames(this.categories.housing.options)}
          onChange={(index: number) => {
            this.setState({ housing: index });
          }}
        />

        <h4>Income (Yearly)</h4>
        <p>Total Income: ${totalIncome}</p>

        <h4>Expenses (Yearly)</h4>
        <List
          items={expenses.map(({ category, cost }) => {
            return { text: `${category}: \$${cost}` };
          })}
        />
        <p>Total Expenses: ${totalExpenses}</p>

        <h4>Summary (yearly)</h4>
        <p>
          <span className={finalMessage.spanClass}>{finalMessage.title}</span> ${finalMessage.amount}
        </p>
        <p>{finalMessage.message}</p>
        <br />
      </div>
    );
  }
}
