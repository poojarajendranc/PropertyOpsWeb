import React, { useState } from "react";
import { login } from "../../../services/authApi";
import { useNavigate } from "react-router-dom";
import { saveRefreshToken, saveToken } from "../../../services/authStorage";
import styles from "./LoginForm.module.css"

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setError("");
            const response = await login({ email, password })
            console.log("Login response:", response)
            saveToken(response.accessToken)
            saveRefreshToken(response.refreshToken)
            navigate("/dashboard")

        } catch (error) {
            console.error("Login failed:", error);
            setError("Invalid email id or password")
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.logo}>P</div>
                    <h1>Welcome back</h1>
                    <p>Sign in to continue to PropertyOps</p>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                    </div>

                    {error && (
                        <div className={styles.error}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={styles.loginButton}
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <div className={styles.register}>
                    <span>Don't have an account?</span>
                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                    >
                        Create account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;
