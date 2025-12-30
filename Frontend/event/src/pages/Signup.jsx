import { useState } from 'react';
import API from '../api/api';
import './Signup.css';

export default function Signup() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


const submit = async () => {
await API.post('/signup', { email, password });
window.location.href = '/login';
};


return (
<div>
<h2>Signup</h2>
<input placeholder="Email" onChange={e => setEmail(e.target.value)} />
<input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
<button onClick={submit}>Signup</button>
</div>
);
}