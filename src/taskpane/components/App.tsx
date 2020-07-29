import * as React from "react";
import { Button, ButtonType } from "office-ui-fabric-react";
//import Header from "./Header";
//import List, { ListItem } from "./List";
import Progress from "./Progress";
import Select from "./Select";
import getTransportationOptions from "../data/getTransportationOptions";
import getOccupationOptions from "../data/getOccupationOptions";

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

// All state must be stored as part of the global state of the application
export interface AppState {
  //listItems: ListItem[];

  /**
   * Occupation
   */
  occupation: number;

  /**
   * Transportation
   */
  transportation: number;
}

// Can be populated later
const occupationOptions = getOccupationOptions();

const transportationOptions = getTransportationOptions();

function optionNames(options: { name: string }[]) {
  return options.map(({ name }) => name);
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      //listItems: [],
      occupation: 0,
      transportation: 0
    };
  }

  componentDidMount() {
    this.setState({
      occupation: 0,
      transportation: 0
      // listItems: [
      //   {
      //     icon: "Ribbon",
      //     primaryText: "Achieve more with Office integration"
      //   },
      //   {
      //     icon: "Unlock",
      //     primaryText: "Unlock features and functionality"
      //   },
      //   {
      //     icon: "Design",
      //     primaryText: "Create and visualize like a pro"
      //   }
      // ]
    });
  }

  click = async () => {
    try {
      await Excel.run(async context => {
        /**
         * Insert your Excel code here
         */
        const range = context.workbook.getSelectedRange();

        // Read the range address
        range.load("address");

        // Update the fill color
        range.format.fill.color = "yellow";

        await context.sync();
        console.log(`The range address was ${range.address}.`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // modifyState(update: AppState){
  //   // const combined = {...this.state, ...update};
  //   // this.setState(combined);
  //   this.setState(update);
  // }

  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="assets/icon-300.png" message="Please sideload your addin to see app body." />
      );
    }

    const occupation = occupationOptions[this.state.occupation];
    const transportation = transportationOptions[this.state.transportation];

    console.log(occupation);
    console.log(transportation);

    // <List message="Excel Life - Explore your options!" items={this.state.listItems}>
    // <Header logo="assets/icon-300.png" title={this.props.title} message="Excel Life" /><Header logo="assets/icon-300.png" title={this.props.title} message="Excel Life" />
    return (
      <div>
        <p>Occupation</p>
        <Select
          id="occupation-options"
          options={optionNames(occupationOptions)}
          onChange={(index: number) => {
            this.setState({ occupation: index });
          }}
        />
        <br />
        <p>Transportation</p>
        <Select
          id="transportation-options"
          options={optionNames(transportationOptions)}
          onChange={(index: number) => {
            this.setState({ transportation: index });
          }}
        />
        <br />

        <p>Income: {occupation.income}</p>
        <p>Transportation: {transportation.cost}</p>
        <br />
        <Button className="" buttonType={ButtonType.hero} iconProps={{ iconName: "ChevronRight" }} onClick={this.click}>
          Run
        </Button>
      </div>
    );
  }
}
