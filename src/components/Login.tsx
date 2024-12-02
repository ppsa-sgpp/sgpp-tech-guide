import React, { useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const logoUrl = useBaseUrl('/img/logo.svg');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://sgpp-gateway.sgpp-cluster-dev.sao01.containers.appdomain.cloud/api/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('auth_token', data.id_token);
        localStorage.setItem('authenticated', 'true');
        onLogin();
      } else {
        setError('Credenciais inválidas.');
      }
    } catch (error) {
      setError('Erro ao autenticar.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <img src={logoUrl} alt="Logo" style={styles.logo} />
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Entrar
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  loginBox: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '300px',
  },
  logo: {
    width: '100px',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#2e8555',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default Login;
