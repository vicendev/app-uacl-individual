import data from '../data/data.json';
import { Payroll, PayrollDetails } from '../types/Payroll';
import { TaxDetail } from '../types/SecondCategoryTax';

export const usePayroll = () => {
  const afpEnabled = Object.assign(data.discounts.AFP);
  const secondCategoryTax = Object.assign(data.secondCategoryTax);

  /**
   * Calcula el sueldo líquido con todos los descuentos legales aplicados.
   * @param grossPay number - Sueldo bruto a calcular
   * @param afpAfiliation string - Afiliación AFP p.ej. Capital, Cuprum, etc.
   */
  const handleCalculateNetPay = async (payroll: Payroll): Promise<PayrollDetails> => {
    const payrollDetails: PayrollDetails = {} as PayrollDetails;

    payrollDetails.payroll = payroll;

    payrollDetails.afpAfiliationPercentage = afpEnabled[payroll.afpAfiliation];
    payrollDetails.afpLegalPercentage = data.discounts.obligatoryAFP;
    payrollDetails.afpTotalPercetange = afpEnabled[payroll.afpAfiliation] + data.discounts.obligatoryAFP;
    payrollDetails.healthPercentage = data.discounts.health;
    payrollDetails.severanceInsurancePercentage = data.discounts.severanceInsurance;
    
    payrollDetails.healthDiscount = Math.round(payroll.grossPay * payrollDetails.healthPercentage);
    payrollDetails.severanceInsuranceDiscount = Math.round(payroll.grossPay * payrollDetails.severanceInsurancePercentage);
    payrollDetails.afpDiscount = Math.round(payroll.grossPay * payrollDetails.afpTotalPercetange);

    payrollDetails.taxableSalary = payroll.grossPay - (
      payrollDetails.afpDiscount + 
      payrollDetails.healthDiscount + 
      payrollDetails.severanceInsuranceDiscount
    );

    const taxCategoryValue = searchSecondCategoryTax(payrollDetails.taxableSalary);

    payrollDetails.secondCategoryTaxDetail = taxCategoryValue;
    payrollDetails.taxDiscount = Math.round(payrollDetails.taxableSalary * taxCategoryValue.tax);
    payrollDetails.netPay = payrollDetails.taxableSalary - payrollDetails.taxDiscount

    return payrollDetails;
  }

  /**
   * Busca la declaración de renta según rango de sueldo líquido
   * @param netpay number - Sueldo líquido
   */
  const searchSecondCategoryTax = (netpay: number): TaxDetail => {
    let taxValue;
    for (const key of Object.keys(secondCategoryTax)) {
      if (secondCategoryTax[key].to >= netpay) {
        taxValue = secondCategoryTax[key]
        break;
      }
    }

    return !taxValue ? secondCategoryTax["fourthRange"] : taxValue;
  }

  return {
    // Functions
    handleCalculateNetPay
  }
}