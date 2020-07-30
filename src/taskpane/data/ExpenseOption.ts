export default interface ExpenseOption {
  /**
   * Short name for the option, one or two words
   */
  name: string;

  /**
   * Longer description for the option
   */
  description: string;

  /**
   * cost USD (positive number)
   */
  cost: number;
}
