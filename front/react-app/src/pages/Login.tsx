import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Login(){
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        login();        // ログイン状態にする
        navigate("/");  // Homeへ移動
    };

    return (
        <button onClick={handleLogin}>
            ログイン（仮）
        </button>
    );
}