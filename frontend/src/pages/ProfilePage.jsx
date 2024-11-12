import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "@/components/NavBar";
import axios from "axios";

const ProfilePage = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Fetch the authentication token from the URL or cookies (depending on implementation)
        axios.get("http://localhost:8080/user", {withCredentials: true})
            .then(response => {
                setUser(response.data)
            }).catch(error => {
                console.error("Error fetching user data: ", error)
            })
    }, [])

    return (
        <>
            <NavBar />
            {user === null ?
                (<h1>Loading...</h1>) :
                (<>
                    <h1>Welcome, {user.name}!</h1>
                    <p>Email: {user.email}</p>
                </>)
            }
        </>
    )
}

export default ProfilePage