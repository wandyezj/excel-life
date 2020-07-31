import ExpenseOption from "./ExpenseOption";

const food: ExpenseOption[] = [
    {
        name: "15/day",
        description: "spend 15 per day on food, can probably eat out once or twice a week",
        cost: 15 * 365,
    },
    {
        name:"10/day",
        description: "spend 10 per day on food",
        cost: 10 * 365,
    },
    {
        name:"5/day",
        description: "spend 5 per day on food",
        cost: 5 * 365
    },
    {
        name:"3/day",
        description:"spend 3 per day on food, {oatmeal, bananas, beans, ramen, masa} ",
        cost: 3 * 365
    }
];

export default function getFoodOptions() {
    return food;
}