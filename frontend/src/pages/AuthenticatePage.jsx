import NavBar from "@/components/NavBar"
import React from "react"
import {Button} from "@mui/material";

const AuthenticatePage = () => {
    return(
        <>
            <NavBar />
            <Button variant="contained" onClick={() => window.location.href="http://localhost:8080/oauth2/authorization/google"}>
                Login with Google
            </Button>
        </>
    )
}

export default AuthenticatePage