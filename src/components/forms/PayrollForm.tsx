import { useForm } from "@tanstack/react-form"
import { AFP, Payroll, PayrollDetails } from "../../types/Payroll"
import { Helpers } from "../../helpers/helpers"
import { Button } from "../_shared/Button"
import { usePayroll } from "../../hooks/usePayroll"
import { PayrollModal } from "../modals/PayrollModal"
import { useState } from "react"


export const PayrollForm = () => {

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [payrollDetails, setPayrollDetails] = useState<PayrollDetails>({} as PayrollDetails)
  const {handleCalculateNetPay} = usePayroll();

  const form = useForm<Payroll>({
    onSubmit: async ({ value }) => {
      console.log(value)
    },
    defaultValues: {
      person: {
        firstName: '',
        lastName: '',
        rut: ''
      },
      grossPay: 1,
      afpAfiliation: AFP.CAPITAL
    },
  })

  const canSubmit = form.useStore((state) => state.canSubmit);
  const isDirty = form.useStore((state) => state.isDirty);

  return (
    <div className="flex bg-indigo-300 mt-10 py-5 w-2/4 mx-auto justify-center rounded-lg">
      <div className="w-full px-4">
        <h1 className="text-left text-2xl pl-5 font-mono underline">Datos Personales</h1>

        <div className="flex flex-col items-center">
          <form.Field
            name="person.firstName"
            validators={{
              onMount: ({value}) => 
                value.length < 2 ? 'Mount' : undefined
              ,
              onChange: ({value}) =>
                value.length < 2 ? 'Debe ingresar al menos 2 caracteres.' : undefined,
            }}
          >
            {(field) => (
              <div className="my-4 relative flex-1">
                <label className="block text-lg font-semibold" htmlFor={field.name}>Nombre: </label>
                <input
                  className="rounded-md p-2 text-lg"
                  placeholder="Ingrese su Nombre"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  type="text"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors &&
                (field.state.meta.isTouched || field.state.meta.isDirty) && (
                  <div className="w-80 absolute italic text-red-600" role="alert">{field.state.meta.errors.join(', ')}</div>
                )}
              </div>
            )}
          </form.Field>
          <form.Field
            name="person.lastName"
            validators={{
              onMount: ({value}) => 
                value.length < 2 ? 'Mount' : undefined
              ,
              onChange: ({value}) =>
                value.length < 2 ? 'Debe ingresar al menos 2 caracteres.' : undefined,
            }}
          >
            {(field) => (
              <div className="my-4 relative">
                <label className="block text-lg font-semibold" htmlFor={field.name}>Apellido: </label>
                <input
                  className="rounded-md p-2 text-lg"
                  placeholder="Ingrese su Apellido"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  type="text"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors &&
                (field.state.meta.isTouched || field.state.meta.isDirty) && (
                  <p className="w-80 absolute italic text-red-600" role="alert">{field.state.meta.errors.join(', ')}</p>
                )}
              </div>
            )}
          </form.Field>
          <form.Field
            name="person.rut"
            validators={{
              onMount: ({value}) => 
                !value ? 'Init' : undefined
              ,
              onChange: ({value}) =>
                !Helpers.validateRut(Helpers.rutFormatter(value)) ? 'Debe ingresar un rut válido.' : undefined,
            }}
          >
            {(field) => (
              <div className="my-4 relative">
                <label className="block text-lg font-semibold" htmlFor={field.name}>Rut: </label>
                <input
                  className="rounded-md p-2 text-lg"
                  placeholder="Ingrese su Rut"
                  id={field.name}
                  name={field.name}
                  value={Helpers.rutFormatter(field.state.value)}
                  type="text"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors &&
                (field.state.meta.isTouched || field.state.meta.isDirty) && (
                  <p className="w-80 absolute italic text-red-600" role="alert">{field.state.meta.errors.join(', ')}</p>
                )}
              </div>
            )}
          </form.Field>
        </div>

        <h1 className="text-left text-2xl pl-5 pt-5 font-mono underline">Planilla</h1>

        <div className="flex flex-col items-center">
          <form.Field
              name="grossPay"
              validators={{
                onChange: ({value}) =>
                  value <= 0 ? 'Debe ser mayor que cero.' : undefined,
              }}
          >
            {(field) => (
              <div className="my-4 relative">
                <label className="block text-lg font-semibold" htmlFor={field.name}>Sueldo Bruto: </label>
                <input
                  className="rounded-md p-2 text-lg"
                  placeholder="Ingrese Sueldo Bruto"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  type="number"
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                />
                {field.state.meta.errors &&
                (field.state.meta.isTouched || field.state.meta.isDirty) && (
                  <p className="w-80 absolute italic text-red-600" role="alert">{field.state.meta.errors.join(', ')}</p>
                )}
              </div>
            )}
          </form.Field>
          <form.Field
              name="afpAfiliation"
              validators={{
                onChange: ({value}) =>
                  !value  ? 'Debe ingresar un rut válido.' : undefined,
              }}
          >
            {(field) => (
              <div className="my-4">
                <label className="block text-lg font-semibold" htmlFor={field.name}>AFP: </label>
                <select
                  className="rounded-md p-2 text-lg w-full"
                  id={field.name}
                  name={field.name}
                  value={field.state.value || ''}
                  onChange={(e) => field.handleChange(e.target.value)}
                >
                  <option value="" disabled>
                    -- Seleccione una opción --
                  </option>
                  {Object.entries(AFP).map(([key, value]) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </form.Field>

          <div className="my-4">
            <Button
              disabled={!canSubmit || !isDirty}
              onClick={async () => {
                const payroll: Payroll = {} as Payroll;
                payroll.afpAfiliation = form.getFieldValue("afpAfiliation");
                payroll.grossPay = form.getFieldValue("grossPay");
                payroll.person = form.getFieldValue("person")

                const calculatedPayroll: PayrollDetails = await handleCalculateNetPay(payroll);
                
                setPayrollDetails(calculatedPayroll);
                setIsOpenModal(true);
              }}
            >
              Calcular Liquidez
            </Button>
          </div>
        </div>
      </div>
      <PayrollModal
        isOpenModal={isOpenModal} 
        setIsModalOpen={setIsOpenModal} 
        payrollDetails={payrollDetails} 
      />
    </div>
  )
}