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
import writeOptionSheet from "../excel/writeOptionSheet";
import OccupationOptionProperties from "../data/OccupationOptionProperties";
import ExpenseOptionProperties from "../data/ExpenseOptionProperties";
import writeOptions from "../excel/writeOptions";

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

  // need to disable changes while loading
  clickReadOptions = async () => {};

  clickWriteOptions = async () => {
    writeOptions(this.categories);
  };

  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="assets/icon-300.png" message="Please sideload your addin to see app body." />
      );
    }

    // Income

    const occupation = {
      category: "Occupation",
      ...this.categories.occupation.options[this.state.occupation]
    };

    const totalIncome = occupation.income;

    // Expenses

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
      cost: 500
    };
    const clothing: Expense = {
      category: "Clothing",
      cost: 600
    };
    const food = {
      category: "Food",
      cost: 4000
    };

    const taxes = {
      category: "Tax (estimate)",
      cost: getTaxForIncome(totalIncome)
    };

    const expenses = [transportation, housing, phone, clothing, healthcare, food, taxes];

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
        <button onClick={this.click}>Test</button>
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
        {/* <p>Transportation: {transportation.cost}</p>
        <p>Housing: {housing.cost}</p>
        <p>Healthcare: {healthcare.cost}</p>
        <p>Food: 4000</p>
        <p>Clothing: 600</p>
        <p>Phone: 500 to 1000</p>
        <p>Entertainment: ?</p>
        <p>Remaining: ?</p> */}
        <br />
      </div>
    );
  }
}
