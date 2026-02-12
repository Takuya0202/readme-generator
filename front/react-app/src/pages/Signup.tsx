import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupRequest } from "../lib/api";
import Cookies from "js-cookie";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await signupRequest(email, password);
      const { status, token, message } = response.data;

      if (status === "success") {
        Cookies.set("token", token)
        navigate("/");
      } else {
        setErrorMessage(message);
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          setErrorMessage(data.message);
        } else if (status === 422) {
          setErrorMessage("入力内容に問題があります");
        } else {
          setErrorMessage("サーバーエラーが発生しました");
        }
      } else {
        setErrorMessage("通信エラーが発生しました");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">新規登録</h1>

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-64"
      />

      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-64"
      />

      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}

      <button
        onClick={handleSignup}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-64 disabled:opacity-50"
      >
        {loading ? "登録中..." : "登録"}
      </button>
    </div>
  );
}