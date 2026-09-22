import React, { useState } from "react";
import { login } from "../../../services/authApi";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../../../services/authStorage";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setError("");
            const response = await login({ email, password })
            console.log("Login response:", response)
            saveToken(response.token)
            navigate("/dashboard")

        } catch (error) {
            console.error("Login failed:", error);
            setError("Invalid email id or password")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)} />
            <input type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)} />
            {error && <p>{error}</p>}
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm;
