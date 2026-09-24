import { useNavigate } from "react-router-dom";
import LoginForm from "../features/auth/components/LoginForm";
import { useEffect, useState } from "react";
import AppToast from "../components/AppToast";

function LoginPage() {
    const navigate = useNavigate();
    const [authMessage,setAuthMessage] = useState('');
    const handleRegister = () => {
        console.log("1-------------")
        navigate("/register")
    }

    useEffect(() => {
        const message = sessionStorage.getItem("auth_message");
        if(message) {
            setAuthMessage(message)
            sessionStorage.removeItem("auth_message")
        }
    },[])
    
    return (
        <div>
            <LoginForm />
            <button onClick={handleRegister} type="submit">Register User</button>
            {authMessage && (<AppToast type="error" message={authMessage} />)}
        </div>
    )
}

export default LoginPage;