import OccupationOption from "./OccupationOption";

// Can be populated later
const occupations: OccupationOption[] = [
  { name: "Engineer", income: 100000, description: "a competent engineer in an in demand field" },
  { name: "Teacher", income: 60000, description: "a normal public school teacher" },
  { name: "Waiter", income: 20000, description: "a typical waiter" },
  {
    name: "7.25 hour",
    income: 7.25 * 40 * 52,
    description: "Federal Minimum wage, 40 hours a week, every week of the year"
  },
  { name: "10 hour", income: 10 * 40 * 52, description: "10 per hour, 40 hours a week, 52 weeks a year" },
  { name: "None", income: 0, description: "no source of income" }
];

export default function getOccupationOptions(): OccupationOption[] {
  // TODO: retrieve these from a table or something
  // use the US Data
  return occupations;
}
