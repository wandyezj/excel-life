import ExpenseOption from "./ExpenseOption";

// Cost is yearly

const housing: ExpenseOption[] = [
  {
    name: "apartment",
    cost: 12000,
    description:
      "an apartment, costs are highly variable depending on location. Check housing prices in the area you want to live. Living with roommates may reduce this cost."
  },
  {
    name: "mooch",
    cost: 0,
    description: "live with parents, friends, etc.. who don't mind you living at their place for free"
  },
  {
    name: "unsheltered",
    cost: 0,
    description: "cost is not technically zero as there are significant risks and costs to being unsheltered"
  }
];

export default function getHousingOptions(): ExpenseOption[] {
  return housing;
}
