import NavBar from "@/components/NavBar"
import React from "react"

const AuthenticatePage = () => {
    return(
        <>
            <NavBar />
            <button onClick={window.href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:5173/grant-code&response_type=code&client_id=121169886667-bo7e1qsjlr7vhld3kj6jhudr820kn4s7.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&access_type=offline"}>

            </button>
        </>
    )
}

export default AuthenticatePage