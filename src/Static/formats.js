import numeral from 'numeral'
export const CURRENCY = {
  basic:'$0,0.00'
}
export function formatCurrency(value,format='basic'){
  return numeral(value).format(CURRENCY[format])
}
