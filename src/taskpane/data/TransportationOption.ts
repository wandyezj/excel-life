export default interface TransportationOption {
  /**
   * name of the transportation option
   */
  name: string;

  /**
   * estimated yearly cost of the transportation USD (positive number)
   */
  cost: number;
}