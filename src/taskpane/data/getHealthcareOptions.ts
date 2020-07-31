import ExpenseOption from "./ExpenseOption";
const healthcare: ExpenseOption[] = [
  {
    name: "Healthcare.gov (estimate)",
    description:
      "healthcare.gov insurance estimate is highly variable depending on area, lifestyle choices, desired coverage, and individual health",
    cost: 350 * 12
  },
  {
    name: "none",
    description:
      "Cost is not technically zero. You have no health insurance, and seek no medical care (not recommended). Failing to seek health care when needed has a significant impact on long term health and financial earnings.",
    cost: 0
  }
];

export default function getHealthcareOptions(): ExpenseOption[] {
  return healthcare;
}
