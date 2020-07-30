// https://www.debt.org/tax/brackets/

const taxBrackets: {
  above: number;
  below: number;
  rate: number;
}[] = [
  {
    above: 0,
    below: 9875,
    rate: 10
  },
  {
    above: 9876,
    below: 40125,
    rate: 12
  },
  {
    above: 40126,
    below: 85525,
    rate: 22
  },
  {
    above: 85526,
    below: 163300,
    rate: 24
  },
  {
    above: 163301,
    below: 207350,
    rate: 32
  },
  {
    above: 207351,
    below: 518400,
    rate: 35
  },
  {
    above: 518401,
    below: undefined,
    rate: 37
  }
];

export default function getTaxForIncome(income: number) {
  if (income <= 0) {
    return 0;
  }

  const socialSecurityPercentage = 0.062;
  const medicarePercentage = 0.0145;

  const socialSecurityTax = income * socialSecurityPercentage;
  const medicareTax = income * medicarePercentage;

  const standardDeduction = 12200;
  const taxableIncome = income > standardDeduction ? income - standardDeduction : 0;

  const taxPerBracket = taxBrackets.map(({ above, below, rate }) => {
    const percent = rate / 100.0;

    if (taxableIncome > above) {
      let taxableAtRate = 0;
      if (taxableIncome > below) {
        taxableAtRate = below - above;
      } else {
        taxableAtRate = taxableIncome - above;
      }

      const taxAtRate = taxableAtRate * percent;

      return taxAtRate;
    }

    return 0;
  });

  // sum all tax per bracket
  const totalBracketTax = taxPerBracket.reduce((previous, current) => previous + current, 0);

  // All Taxes

  const totalTax = totalBracketTax + socialSecurityTax + medicareTax;
  return Math.floor(totalTax);
}
