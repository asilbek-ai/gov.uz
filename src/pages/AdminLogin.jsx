import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsAdmin } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      toast.success('Xush kelibsiz!');
      navigate('/admin/dashboard');
    } else {
      setError('Login yoki parol xato!');
      toast.error('Login yoki parol xato!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primaryDark p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4"><i className="fas fa-user-shield text-white text-3xl"></i></div>
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <p className="text-gray-500 text-sm">Tizimga kirish</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Login" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-primary" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Parol" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-primary" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition">Kirish</button>
        </form>
      </div>
    </div>
  );
}