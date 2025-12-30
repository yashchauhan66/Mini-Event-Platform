import { useState } from "react";
import API from "../api/api";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("Please enter email and password");
    }

    try {
      await API.post("/auth/signup", { email, password });
      alert("Signup successful!");
      window.location.href = "/login";
    } catch (err) {
      console.error(err.response || err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
