import { useState } from 'react';
import Modal from 'react-modal';
import { PayrollDetails } from '../../types/Payroll';
import { Helpers } from '../../helpers/helpers';

type Props = {
  isOpenModal: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  payrollDetails: PayrollDetails
}

export const PayrollModal = ({isOpenModal, setIsModalOpen, payrollDetails}: Props) => {

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={() => setIsModalOpen(!isOpenModal)}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: "800px",
          borderRadius: "10px"
        },
      }}
    >
      { Helpers.isEmpty(payrollDetails) ? 
        <>No Data</>
        :
        <div className="flex py-5 w-3/4 mx-auto justify-center rounded-lg">
          <div className="px-4">
            <h1 className="text-left text-2xl pb-10 font-mono underline">Planilla Liquidez</h1>
            <div className="mb-5 grid grid-cols-2">
              <div>
                <p><b>Nombre:</b> {payrollDetails.payroll.person.firstName} {payrollDetails.payroll.person.lastName}</p>
                <p><b>Rut:</b> {payrollDetails.payroll.person.rut}</p>
                <p><b>Sueldo Bruto:</b> $ {payrollDetails.payroll.grossPay}</p>
                <p><b>Sueldo Imponible:</b> $ {payrollDetails.taxableSalary}</p>
              </div>
              <div>
                <p><b>Impuesto 2da Categoria:</b> {100 * payrollDetails.secondCategoryTaxDetail.tax} %</p>
                <p><b>Rango:</b> {payrollDetails.secondCategoryTaxDetail.type}</p>
                <p><b>Descuento Imponible:</b> $ {payrollDetails.taxDiscount}</p>
                <p><b>Sueldo Líquido:</b> $ {payrollDetails.netPay}</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                        Detalle
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                        Descuento
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                        Porcentaje
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <p>AFP {payrollDetails.payroll.afpAfiliation}</p>
                        <p>(Legal + Afiliación)</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">$ {payrollDetails.afpDiscount}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{100 * payrollDetails.afpTotalPercetange}%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">Salud</td>
                      <td className="px-6 py-4 text-sm text-gray-700">$ {payrollDetails.healthDiscount}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{Math.round(100 * payrollDetails.healthPercentage)} %</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">Seguro Censatía</td>
                      <td className="px-6 py-4 text-sm text-gray-700">$ {payrollDetails.severanceInsuranceDiscount}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{100 * payrollDetails.severanceInsurancePercentage} %</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => setIsModalOpen(!isOpenModal)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      }

    </Modal>
  )
}