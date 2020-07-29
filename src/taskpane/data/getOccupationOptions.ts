import OccupationOption from "./OccupationOption";

// Can be populated later
const occupations: OccupationOption[] = [
  { name: "None", income: 0 },
  { name: "Waiter", income: 20000 },
  { name: "Teacher", income: 60000 },
  { name: "Engineer", income: 100000 }
];

export default function getOccupationOptions(): OccupationOption[] {
  // TODO: retrieve these from a table or something
  // use the US Data
  return occupations;
}
