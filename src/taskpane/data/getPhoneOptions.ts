import ExpenseOption from "./ExpenseOption";

const phones: ExpenseOption[] = [
    // Can adjust cost by amortizing over the number of years you intend the phone to last usually 2-3 years
    {
        name:"iPhone SE (new 2020) with T-Mobile family",
        description: "2020 iPhone SE (200 per year for 2 years), and T-Mobile family (40 per month)",
        cost: 200 + 40 * 12
    },
    {
        name:"iPhone SE (new 2020) with T-Mobile own",
        description: "2020 iPhone SE (200 per year for 2 years) and T-Mobile family (70 per month)",
        cost: 200 + 70 * 12
    }
] 

export default function getPhoneOptions(): ExpenseOption[] { 
    return phones;
}