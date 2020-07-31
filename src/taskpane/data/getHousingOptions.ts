import ExpenseOption from "./ExpenseOption";

// Cost is yearly

const housing: ExpenseOption[] = [
  {
    name: "apartment 1200 per month",
    cost: 1200 * 12,
    description:
      "an apartment 1200 per month (including utilities), costs are highly variable depending on location. Check housing prices in the area you want to live. Living with roommates may reduce this cost."
  },
  {
    name: "apartment 1000 per month",
    cost: 1000 * 12,
    description:
      "an apartment 1000 per month (including utilities)"
  },
  {
    name: "apartment 800 per month",
    cost: 800 * 12,
    description:
      "an apartment 800 per month (including utilities)"
  },
  {
    name: "apartment 600 per month",
    cost: 600 * 12,
    description:
      "an apartment 600 per month (including utilities"
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
