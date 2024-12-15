import { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography, Grid2, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select } from "@mui/material";
import { FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import client from "@/axios/APIinitializer.jsx";
import NavBar from "@/components/NavBar.jsx";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        client
            .get("/api/users")
            .then((response) => {
                console.log("Fetched users:", response.data);
                setUsers(response.data);
            })
            .catch((error) => console.error("Error fetching users:", error));
    }, []);
    
    useEffect(() => {
        console.log("Users state updated:", users);
    }, [users]);

    useEffect(() => {
        const fetchCountries = async () => {
            axios.get("https://restcountries.com/v3.1/all?fields=name")
                .then(response => setCountries(response.data.map(country => country.name.common).sort()))
                .catch(error => console.error("Error fetching countries. Error:" + error));
        };
        fetchCountries();
    }, []);

    const handleDelete = (id) => {
        client
            .delete(`/api/users/${id}`)
            .then(() => {
                setUsers((prev) => prev.filter((user) => user.id !== id));
            })
            .catch((error) => console.error("Error deleting user:", error));
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleSave = () => {
        console.log("Saving user:", currentUser);
        client
            .put(`/api/admin/${currentUser.id}`, currentUser)
            .then((response) => {
                console.log("Updated user response:", response.data);
                setUsers((prev) => {
                    const updatedUsers = prev.map((user) => {
                        if (user.id === currentUser.id) {
                            console.log("Updating user with ID:", user.id);
                            console.log("Old user data:", user);
                            console.log("New user data:", response.data);
                            return response.data;
                        }
                        return user;
                    });
                    console.log("Updated users state:", updatedUsers);
                    return updatedUsers;
                });
                setOpen(false);
            })
            .catch((error) => console.error("Error updating user:", error));
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser((prev) => {
            const updatedUser = { ...prev, [name]: value };
            console.log("Updated currentUser state:", updatedUser);
            return updatedUser;
        });
    };

    return (
        <>
            <NavBar />
            <Container sx={{ backgroundColor: "white", display: "flex", margin: 10, alignItems: "center", width: "90%" }}>
                <Grid2 spacing={5} padding={2} width={"100%"} alignItems={"center"} sx={{ padding: 4 }}>
                    <Typography variant="h4" sx={{ marginBottom: 4, color: "#00a0e1" }}>
                        <strong> All Users ({users.length}) </strong>
                    </Typography>
                    {users.map((user) => (
                        <Grid2 key={user.id} xs={12}>
                            <Card variant="outlined" sx={{ display: "flex", padding: 2, width: "100%" }}>
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                                    <Typography variant="body2">Role: {user.selectedRole}</Typography>
                                    <Typography variant="body2">Email: {user.email}</Typography>
                                    <Typography variant="body2">Country: {user.country}</Typography>
                                    <Typography variant="body2">Birthday: {user.birthday}</Typography>
                                    <Typography variant="body2">Verified: {user.verified ? "Yes" : "No"}</Typography>
                                </CardContent>
                                <Grid2 sx={{ display: "flex", alignItems: "center" }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEdit(user)}
                                        sx={{ marginRight: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(user.id)}
                                        sx={{ marginRight: 1 }}
                                    >
                                        Delete
                                    </Button>
                                </Grid2>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            </Container>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        value={currentUser.firstName || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="lastName"
                        label="Last Name"
                        type="text"
                        fullWidth
                        value={currentUser.lastName || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={currentUser.email || ""}
                        onChange={handleChange}
                    />
                    <Select
                        margin="dense"
                        name="country"
                        label="Country"
                        fullWidth
                        value={currentUser.country || ""}
                        onChange={handleChange}
                    >
                        {countries.map((country) => (
                            <MenuItem key={country} value={country}>
                                {country}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        margin="dense"
                        name="birthday"
                        label="Birthday"
                        type="date"
                        fullWidth
                        value={currentUser.birthday || ""}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Role</InputLabel>
                        <Select
                            name="selectedRole"
                            value={currentUser.selectedRole || ""}
                            onChange={handleChange}
                        >
                            <MenuItem value="USER">USER</MenuItem>
                            <MenuItem value="THERAPIST">THERAPIST</MenuItem>
                            <MenuItem value="PSYCHOLOGY_STUDENT">PSYCHOLOGY_STUDENT</MenuItem>
                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}