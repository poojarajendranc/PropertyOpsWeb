import { useNavigate } from "react-router-dom";
import LoginForm from "../features/auth/components/LoginForm";

function LoginPage() {
    const navigate = useNavigate();

    const handleRegister = () => {
        console.log("1-------------")
        navigate("/register")
    }
    
    return (
        <div>
            <LoginForm />
            <button onClick={handleRegister} type="submit">Register User</button>
        </div>
    )
}

export default LoginPage;