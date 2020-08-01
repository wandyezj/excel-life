import * as React from "react";
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
import chartExpenses from "../excel/chartExpenses";
import getPhoneOptions from "../data/getPhoneOptions";
import getHealthcareOptions from "../data/getHealthcareOptions";
import getFoodOptions from "../data/getFoodOptions";
import chartInvestment from "../excel/chartInvestment";

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
  phone: number;
  healthcare: number;
  food: number;
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
    },
    phone: {
      properties: ExpenseOptionProperties,
      options: getPhoneOptions()
    },
    healthcare: {
      properties: ExpenseOptionProperties,
      options: getHealthcareOptions()
    },
    food: {
      properties: ExpenseOptionProperties,
      options: getFoodOptions()
    }
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      occupation: 0,
      transportation: 0,
      housing: 0,
      phone: 0,
      healthcare: 0,
      food: 0,
    };
  }

  componentDidMount() {
    this.setState({
      occupation: 0,
      transportation: 0,
      housing: 0,
      phone: 0,
      food:0,
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
      await chartExpenses(expenses);
    } catch (error) {
      console.error(error);
    }
  };

  clickInvest = async () => {
    const investable = this.getTotalInvestable();
    try {
      await chartInvestment(investable);
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
      ...this.categories.healthcare.options[this.state.healthcare]
    };

    const phone: Expense = {
      category: "Phone",
      ...this.categories.phone.options[this.state.phone]
    };
    const clothing: Expense = {
      category: "Clothing",
      cost: 600
    };
    const food = {
      category: "Food",
      ...this.categories.food.options[this.state.food]
    };

    const entertainment = {
      category: "Entertainment",
      cost: 0
    };

    const expenses = [transportation, housing, phone, clothing, healthcare, food, entertainment];
    return expenses;
  }

  getExpenses(totalIncome: number) {
    const taxes = {
      category: "Tax (estimate)",
      cost: getTaxForIncome(totalIncome)
    };

    // Entertainment

    const expenses = [...this.getControllableExpenses(), taxes];
    return expenses;
  }

  getTotalExpenses(expenses: {cost:number}[]) {
    const totalExpenses = expenses.reduce((previous, current) => previous + current.cost, 0);
    return totalExpenses;
  }

  getTotalInvestable() {
    const totalIncome = this.getIncome();
    const totalExpenses = this.getTotalExpenses(this.getExpenses(totalIncome));
    const difference = totalIncome - totalExpenses;
    if (difference < 0) {
      return 0;
    }
    return difference;
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

    const totalExpenses = this.getTotalExpenses(expenses);

    const totalRemaining = totalIncome - totalExpenses;

    const inGreen = totalRemaining >= 0;
    const finalMessage = {
      spanClass: inGreen ? "invest" : "debt",
      title: inGreen ? "Invest" : "Debt",
      amount: inGreen ? totalRemaining : totalRemaining * -1,
      message: inGreen
        ? "Good Job! You can invest in your future."
        : "You are in debt! Find a higher paying job, cut expenses, or work more hours."
    };

    return (
      <div>
        <h1>Simulate Your Life</h1>
        <h5>Explore Your Choices</h5>
        <button onClick={this.clickBudget}>Budget</button>
        <button onClick={this.clickInvest}>Invest</button>
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
        <br />
        <span>Phone</span>
        <Select
          id="phone-options"
          options={optionNames(this.categories.phone.options)}
          onChange={(index: number) => {
            this.setState({ phone: index });
          }}
        />
        <br />
        <span>Healthcare</span>
        <Select
          id="healthcare-options"
          options={optionNames(this.categories.healthcare.options)}
          onChange={(index: number) => {
            this.setState({ healthcare: index });
          }}
        />
        <br />
        <span>Food</span>
        <Select
          id="food-options"
          options={optionNames(this.categories.food.options)}
          onChange={(index: number) => {
            this.setState({ food: index });
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
