import { useForm } from "@tanstack/react-form"
import { Student } from "../../types/Student"
import { Helpers } from "../../helpers/helpers"
import { Button } from "../_shared/Button"
import { usePayroll } from "../../hooks/usePayroll"
import { PayrollModal } from "../modals/PayrollModal"
import { useState } from "react"
import { useStudent } from "../../hooks/useStudent"
import { StudentModal } from "../modals/StudentModal"


export const StudentForm = () => {

  const [isOpenModal, setIsOpenModal] = useState(false);
  //const [student, setStudent] = useState<Student>({} as Student)
  const {handleSubmit, student} = useStudent();

  const form = useForm<Student>({
    defaultValues: {
      name: '',
      lastname: '',
      age: '',
      email: ''
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
            name="name"
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
            name="lastname"
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
            name="age"
            validators={{
              onMount: ({ value }) =>
                value.length < 1 ? "Mount" : undefined,
              onChange: ({ value }) =>
                Number(value) > 120 || Number(value) <= 0
                  ? "Debe ingresar una edad válida entre 1 y 120."
                  : undefined,
            }}
          >
            {(field) => (
              <div className="my-4 relative">
                <label className="block text-lg font-semibold" htmlFor={field.name}>Edad: </label>
                <input
                  className="rounded-md p-2 text-lg"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  type="text"
                  min={0}
                  onChange={(e) =>
                    field.handleChange(() => 
                      Helpers.positiveNumberFilter(e.target.value),
                    )
                  }
                />
                {field.state.meta.errors &&
                (field.state.meta.isTouched || field.state.meta.isDirty) && (
                  <p className="w-80 absolute italic text-red-600" role="alert">{field.state.meta.errors.join(', ')}</p>
                )}
              </div>
            )}
          </form.Field>
          <form.Field
            name="email"
            validators={{
              onMount: ({ value }) => (value.length < 2 ? "Mount" : undefined),
              onChange: ({ value }) =>
                !Helpers.emailFormat(value)
                  ? "Debe ingresar un correo válido."
                  : undefined,
            }}
          >
            {(field) => (
              <div className="my-4 relative">
                <label className="block text-lg font-semibold" htmlFor={field.name}>
                  Correo Electrónico:{" "}
                </label>
                <input
                  className="rounded-md p-2 text-lg"
                  placeholder="Ingrese su Correo"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  type="text"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors &&
                  (field.state.meta.isTouched || field.state.meta.isDirty) && (
                    <div className="w-80 absolute italic text-red-600" role="alert">
                      {field.state.meta.errors.join(", ")}
                    </div>
                  )}
              </div>
            )}
          </form.Field>
          <div className="flex flex-col items-center">
            <div className="my-4">
              <Button
                disabled={!canSubmit || !isDirty}
                onClick={async () => {
                  const student: Student = {} as Student;
                  student.name = form.getFieldValue("name").trim();
                  student.lastname = form.getFieldValue("lastname").trim();
                  student.age = form.getFieldValue("age").trim()
                  student.email = form.getFieldValue("email").trim()
                  
                  await handleSubmit(student);
                  setIsOpenModal(true);
                }}
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </div>
      { <StudentModal
        isOpenModal={isOpenModal} 
        setIsModalOpen={setIsOpenModal} 
        student={student} 
      /> }
    </div>
  )
}