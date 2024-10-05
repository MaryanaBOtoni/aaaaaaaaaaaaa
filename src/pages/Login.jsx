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
    const [isRegistering, setIsRegistering] = useState(false); // Estado para controlar o formulário de cadastro
    const [error, setError] = useState(''); // Estado para exibir mensagem de erro ao não encontrar o e-mail
    const { setUser } = useUser();
    const navigate = useNavigate(); // Para redirecionar

    // Simulação de uma base de dados de usuários cadastrados
    const [usersDatabase, setUsersDatabase] = useState([
        { email: 'teste@teste.com', password: '123456' }, // Exemplo de usuário já cadastrado
    ]);

    // Verificação do formulário de login
    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificar se o e-mail está registrado
        const userExists = usersDatabase.find((user) => user.email === email && user.password === password);

        if (!userExists) {
            setError('E-mail não cadastrado ou senha incorreta!');
        } else {
            // Caso o e-mail e senha estejam corretos, continuar com o login
            setUser({ name: username, email, city });
            setSuccess(true);

            // Redirecionar para a página Home após 2 segundos
            setTimeout(() => {
                navigate('/home'); // Redireciona para a página Home
            }, 2000);
        }
    };

    // Função para cadastro
    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        // Adicionando o novo usuário à "base de dados"
        const newUser = { email, password };
        setUsersDatabase([...usersDatabase, newUser]);

        // Após o cadastro, voltar para a tela de login
        setIsRegistering(false);
        setError(''); // Limpar a mensagem de erro após o cadastro bem-sucedido
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>{isRegistering ? 'Cadastro' : 'Login'}</h1>

                {success && <p className="success">Login realizado com sucesso! Redirecionando...</p>}

                {isRegistering ? (
                    // Formulário de cadastro
                    <form onSubmit={handleRegisterSubmit}>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Sobrenome"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Idade"
                            required
                        />
                        <select required>
                            <option value="">Sexo</option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                        </select>
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
                        <button type="submit">Cadastrar</button>
                    </form>
                ) : (
                    // Formulário de login
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

                        {error && (
                            <p className="error">
                                {error} Não tem conta?{' '}
                                <span 
                                    className="register-link" 
                                    onClick={() => setIsRegistering(true)}
                                    style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Registre-se
                                </span>
                            </p>
                        )}
                    </form>
                )}

                {!isRegistering && (
                    <>
                        {/* Espaço adicional entre a mensagem de erro e a frase final */}
                        <div style={{ marginTop: '15px' }}></div> 
                        <p>Informe seus dados para acessar o app de clima</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Login;
