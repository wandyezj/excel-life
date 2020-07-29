import * as React from "react";
import { Button, ButtonType } from "office-ui-fabric-react";
import Header from "./Header";
import List, { ListItem } from "./List";
import Progress from "./Progress";
import Select from "./Select";

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

// All state must be stored as part of the global state of the application
export interface AppState {
  listItems: ListItem[];

  /**
   * Yearly Job Income
   */
  income: number;
}

interface Occupation {
  /**
   * name of the occupation
   */
  name:string;

  /**
   * Yearly Income
   */
  income:number;
}

const occupations: Occupation[] =[
  {name:"None", income: 0}
  {name:"Low", income:20000},
  {name:"Medium", income:60000},
  {name:"High", income:100000},
]

export default class App extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: [],
      income: 0,
    };
  }

  componentDidMount() {
    this.setState({
      listItems: [
        {
          icon: "Ribbon",
          primaryText: "Achieve more with Office integration"
        },
        {
          icon: "Unlock",
          primaryText: "Unlock features and functionality"
        },
        {
          icon: "Design",
          primaryText: "Create and visualize like a pro"
        }
      ]
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

  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="assets/icon-300.png" message="Please sideload your addin to see app body." />
      );
    }

    return (
      <div>
        <Header logo="assets/icon-300.png" title={this.props.title} message="Welcome" />
        <List message="Excel Life - Explore your options!" items={this.state.listItems}>
          <p>
            Modify the source files, then click <b>Run</b>.
          </p>
          <h2>Occupation Income</h2>
          <Select id="test" options={
            occupations.map(({name}) => name)
          }
          onChange={(index: number) => {
            this.setState({income:occupations[index].income});
          }}
            />
          <br/>
        <p>{this.state.income}</p>
        <br/>
          <Button
            className=""
            buttonType={ButtonType.hero}
            iconProps={{ iconName: "ChevronRight" }}
            onClick={this.click}
          >
            Run
          </Button>
        </List>
      </div>
    );
  }
}
