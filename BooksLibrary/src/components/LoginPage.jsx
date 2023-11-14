import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../config/axios';
import DashboardPage from '../components/DashboardPage.jsx';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        const userData = {
            username: username,
            password: password,
        };

        axios
            .post('/authenticate', userData)
            .then((response) => {

                if (response.status === 200) {
                        toast.success('Inicio de sesión exitoso', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                    const token = response.data.token;
                    console.log('Token JWT recibido:', token);
                    localStorage.setItem('token', token);
                    ReactDOM.createRoot(document.getElementById('root')).render(
                    <React.StrictMode>
                        <DashboardPage/>
                    </React.StrictMode>
                    );
                }

            })
            .catch((error) => {
                console.error('Error de autenticación:', error);
                if (error.response) {
                    if (error.response.status === 401) {
                        toast.error('Credenciales incorrectas. Por favor, inténtelo de nuevo.', {
                            position: 'top-right',
                            autoClose: 3000,
                        });
                    } else if (error.response.status === 500) {
                        toast.error('Error interno del servidor. Por favor, intente de nuevo más tarde.', {
                            position: 'top-right',
                            autoClose: 3000,
                        });
                    } else {
                        toast.error('Error. Por favor, intente de nuevo más tarde.', {
                            position: 'top-right',
                            autoClose: 3000,
                        })
                    }
                } else {
                    toast.error('Error de red. Por favor, intente de nuevo más tarde.', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
            });
    };

    return (
        <div>

            <div style={styles.container}>
                <h1 style={styles.heading}>Authentication with JWT</h1>
                <form>
                    <div style={styles.formGroup}>
                        <label htmlFor="username" style={styles.label}>
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button type="button" onClick={handleLogin} style={styles.button}>
                        Login
                    </button>
                </form>
                <ToastContainer/>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        margin: '0 auto',
    },
    heading: {
        backgroundColor: 'darkorange',
        color: 'black',
        textAlign: 'center',
        fontFamily: 'Roboto',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        fontSize: '2em',
        padding: '10px 0',
        borderRadius: '10px',
    },
    formGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '3px',
    },
    button: {
        backgroundColor: 'green',
        color: '#fff',
        border: 'none',
        borderRadius: '3px',
        padding: '10px 20px',
        cursor: 'pointer',
    },
};

export default LoginPage;
