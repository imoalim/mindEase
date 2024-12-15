import {Navigate} from "react-router-dom";
import {useAuth} from "../services/AuthProvider.jsx";

const RoleRoute = (props) => {
    const { user } = useAuth()

    const userRole = user.roles
    if (userRole == null) {
        return <Navigate replace to="/sign-out" />
    }
    // eslint-disable-next-line react/prop-types
    const { allowed_roles } = props
    const roleArray = allowed_roles ?? []

    if (roleArray.includes(userRole)) {
        // eslint-disable-next-line react/prop-types
        return <>{props.children}</>
    } else {
        return <>You are unauthorized to access this page!</>
    }
}

export default RoleRoute
