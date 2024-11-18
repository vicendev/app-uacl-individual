import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Payroll } from "../pages/Payroll";
import Header from "../components/_shared/Header";

export default () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payroll" element={<Payroll />}/>
      </Routes>
    </>
  );
}