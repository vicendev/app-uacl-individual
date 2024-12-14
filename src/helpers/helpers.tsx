


export class Helpers {

  static validateRut(value: string) {
    const regex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;
    console.log(regex.test(value))
    return regex.test(value)
  }

  static rutFormatter(value: string): string {
    let cleanInput = value.replace(/[^0-9kK]/g, '');
    
    const dv = cleanInput.slice(-1);
    const body = cleanInput.slice(0, -1)
    
    const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    if (!formattedBody) {
      return dv ? dv : '';
    }

    return `${formattedBody}-${dv}`;
  }

  static numbersFormatter(value: number) {
    let formattedValue =  String(value) 
    if (formattedValue.startsWith('0')) {
      formattedValue = formattedValue.replace(/^0+/, '');
    }

    return Number(formattedValue);
  }

  static isEmpty = (obj: object) => Object.keys(obj).length === 0;

  static emailFormat (email: string) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return regex.test(email);
  }

  static positiveNumberFilter(value: string) {
    return value.replace(/[^0-9]/g, "");
  }
}
