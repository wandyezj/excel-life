import ExpenseOption from "./ExpenseOption";

const transportation: ExpenseOption[] = [
  {
    name: "car",
    description: "an ok car",
    cost: 5000,
  },
  {
    name: "bus",
    description: "ride the bus",
    cost: 2000,
  },
  {
    name: "bike",
    description: "bike maintenance, biking helps you get exercise",
    cost: 100,
  },
  {
    name: "walk",
    description: "walk, helps you get exercise",
    cost: 0,
  }
];

export default function getTransportationOptions(): ExpenseOption[] {
  // TODO: be retrieved from an excel spreadsheet
  return transportation;
}
