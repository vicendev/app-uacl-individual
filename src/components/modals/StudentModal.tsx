import Modal from 'react-modal';
import { Helpers } from '../../helpers/helpers';
import { Student } from '../../types/Student';

type Props = {
  isOpenModal: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  student: Student
}

export const StudentModal = ({isOpenModal, setIsModalOpen, student}: Props) => {

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
      { Helpers.isEmpty(student) ? 
        <>No Data</>
        :
        <div className="flex py-5 w-3/4 mx-auto justify-center rounded-lg">
          <div className="px-4">
            <h1 className="text-left text-2xl pb-10 font-mono underline">Nuevo Estudiante Creado</h1>
            <div className="mb-5 grid grid-cols-2">
              <div>
                <p><b>Nombre:</b> {student.name} {student.lastname}</p>
                <p><b>Edad:</b> {student.age}</p>
                <p><b>Email:</b> {student.email}</p>
              </div>
            </div>
          </div>
        </div>
      }

    </Modal>
  )
}