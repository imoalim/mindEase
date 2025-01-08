import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../services/AuthProvider.jsx";
import NavBar from "./NavBar.jsx";

const RoleRoute = (props) => {
    const { user } = useAuth()

    if (user.roles == null) {
        return <Navigate replace to="/login" />
    }
    // eslint-disable-next-line react/prop-types
    const { allowed_roles } = props
    const roleArray = allowed_roles ?? []

    if (roleArray.some(item => user.roles.includes(item))) {
        // eslint-disable-next-line react/prop-types
        return <Outlet />;
    } else {
        return <>
            <NavBar />
            You are unauthorized to access this page!
        </>
    }
}

export default RoleRoute
