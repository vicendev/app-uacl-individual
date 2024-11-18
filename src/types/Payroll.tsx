import { Person } from "./Person"
import { TaxDetail } from "./SecondCategoryTax"

export enum AFP {
  CAPITAL = "Capital",
  CUPRUM = "Cuprum",
  HABITAT = "Habitat",
  MODELO = "Modelo",
  PLANVITAL = "Planvital",
  PROVIDA = "Provida",
  UNO = "Uno"
}

export type Payroll = {
  person: Person,
  grossPay: number,
  afpAfiliation: string
}

export type PayrollDetails = {
  payroll: Payroll,
  netPay: number,
  taxableSalary: number,
  afpDiscount: number,
  afpAfiliationPercentage: number,
  afpLegalPercentage: number,
  afpTotalPercetange: number,
  healthDiscount: number,
  healthPercentage: number,
  severanceInsuranceDiscount: number
  severanceInsurancePercentage: number
  taxDiscount: number
  secondCategoryTaxDetail: TaxDetail,
}