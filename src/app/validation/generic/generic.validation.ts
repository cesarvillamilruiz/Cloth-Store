export const isGreaterThan = (baseNumber: number, comparatorNumber: number) => {
  return baseNumber > comparatorNumber;
}

export const isSameValue = (baseValue: any, comparatorValue: any) => {
  return baseValue === comparatorValue;
}

export const isEmptyString = (value: string) => {
  return isUndefined(value) || !value.length;
}

export const isUndefined = (value: any) => {
  return value === undefined
}