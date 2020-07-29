import TransportationOption from "./TransportationOption";

const transportation: TransportationOption[] = [
  {
    name: "walk",
    cost: 0
  },
  {
    name: "bike",
    cost: 100
  },
  {
    name: "bus",
    cost: 2000
  },
  {
    name: "car",
    cost: 5000
  }
];

export default function getTransportationOptions(): TransportationOption[] {
  // TODO: be retrieved from an excel spreadsheet
  return transportation;
}
