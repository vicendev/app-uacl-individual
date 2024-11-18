export interface SecondCategoryTax {
  secondCategoryTax: SecondCategoryTaxClass;
}

export interface SecondCategoryTaxClass {
  exempt:      TaxDetail;
  firstRange:  TaxDetail;
  secondRange: TaxDetail;
  thirdRange:  TaxDetail;
  fourthRange: TaxDetail;
}

export interface TaxDetail {
  type: string;
  from: number;
  to:   number;
  tax:  number;
}
