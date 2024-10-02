import React, { useState } from 'react';
import './Login.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useUser } from '../UserContext'; 
import { useNavigate } from 'react-router-dom'; // Para redirecionar após o login

function Login() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useUser();
    const navigate = useNavigate(); // Para redirecionar

    const handleSubmit = (e) => {
        e.preventDefault();
        // Salvando os dados do usuário no contexto
        setUser({ name: username, email, city });
        setSuccess(true);

        // Redirecionar para a página Home após 2 segundos
        setTimeout(() => {
            navigate('/home'); // Redireciona para a página Home
        }, 2000);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                {success && <p className="success">Login realizado com sucesso! Redirecionando...</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome de Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="password-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="password-icon" onClick={togglePasswordVisibility}>
                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </span>
                    </div>
                    <input
                        type="text"
                        placeholder="Cidade/Estado"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                    <button type="submit">Entrar</button>
                </form>
                <p>Informe seus dados para acessar o app de clima</p>
            </div>
        </div>
    );
}

export default Login;
