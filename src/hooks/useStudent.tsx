import { useState } from "react";
import { Student } from "../types/Student"

export const useStudent = () => {

  const [student, setStudent] = useState({} as Student)

  const handleSubmit = async (student: Student) => {
    const response = await fetch("http://localhost:3001/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(student),
    });

    if (response.status === 201) {
      const {data: student} = await response.json();

      setStudent(student)
    }
  }

  return {
    // properties
    student,

    // Functions
    handleSubmit
  }
}