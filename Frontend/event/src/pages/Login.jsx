import { useState } from 'react';
import API from '../api/api';
import './Login.css';

export default function Login() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


const submit = async () => {
const res = await API.post('/auth/login', { email, password });
localStorage.setItem('token', res.data.token);
window.location.href = '/';
};


return (
<div>
<h2>Login</h2>
<input placeholder="Email" onChange={e => setEmail(e.target.value)} />
<input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
<button onClick={submit}>Login</button>
</div>
);
}