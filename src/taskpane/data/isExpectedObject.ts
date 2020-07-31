function validOption(
  o: {
    [property: string]: number | string;
  },
  validator: {
    names: string[];
    types: {
      [property: string]: "number" | "string";
    };
  }
): boolean {
  // check that all properties are present
  const propertyNames = Object.getOwnPropertyNames(o);

  for (let propertyName of propertyNames) {
    const propertyExpected = validator.properties.includes(propertyName);
    if (!propertyExpected) {
      // property is not in the allowed list
      return false;
    }

    const value = o[propertyName];
    const valueType = typeof value;
    const valueExpected = validator.types[propertyName] === valueType;
    if (!valueExpected) {
      return false;
    }
  }

  return true;
}
