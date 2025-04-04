import { useState } from 'react';
import { useRegisterUserMutation } from '../appSlice';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [registerUser] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(form).unwrap();
    alert('Registered!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
}
export default Register;