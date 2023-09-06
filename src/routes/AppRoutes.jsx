import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import TableUsers from "../components/TableUsers/TableUsers";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      <Route path="/users" element={
        <PrivateRoute>
            <TableUsers />
        </PrivateRoute>
      } />
      <Route path="*" element={<div>Not found</div>} />
      </Routes>
      
    </>
  );
};
export default AppRoutes;
