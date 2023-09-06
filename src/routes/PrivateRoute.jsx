import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UseContext";
const PrivateRoute = (props) => {
    const {user} = useContext(UserContext)
    if(user && !user.auth){
        return (
            <>
            You don't have permission to access this route
            </>
        )
    }
    return (
    <>
        {props.children}
    </>
  );
};
export default PrivateRoute;
