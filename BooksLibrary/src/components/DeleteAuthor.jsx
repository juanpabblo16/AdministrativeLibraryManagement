import React, {useState} from 'react';
import axios from '../config/axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import Author from '../components/AuthorCreation.jsx';

function DeleteAuthor() {
    const [authorId, setAuthorId] = useState('');

    const back = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <Author/>
            </React.StrictMode>
        );
    }

    const handleDeleteAuthor = () => {
        if (window.confirm('¿Estás seguro?')) {
            const token = localStorage.getItem('token');
    
            axios
                .delete(`/authors/${authorId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        toast.success('Autor eliminado con éxito', {
                            position: 'top-right',
                            autoClose: 3000,
                        });
                    } 
                })
                .catch((error) => {
                    console.error('Error al eliminar el autor:', error);
                    if (error.response) {
                        if (error.response.status === 404) {
                            toast.error('Autor no encontrado. Verifique el ID del autor.', {
                                position: 'top-right',
                                autoClose: 3000,
                            });
                        } else if (error.response.status === 403) {
                            toast.error('No autorizado para eliminar el autor. Inicie sesión nuevamente.', {
                                position: 'top-right',
                                autoClose: 3000,
                            });
                        } else {
                            toast.error('Error al eliminar el autor', {
                                position: 'top-right',
                                autoClose: 3000,
                            });
                        }
                    } else {
                        toast.error('Error de red. Por favor, inténtelo de nuevo más tarde.', {
                            position: 'top-right',
                            autoClose: 3000,
                        });
                    }
                });
        }
    };    

    return (
        <div>
            <h1 style={styles.title}>DELETE AUTHOR</h1>
            <label htmlFor="authorId">ID FOR SEARCH:</label>
            <input
                type="text"
                id="authorId"
                name="authorId"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                style={styles.input}
            />
            <button type="button" onClick={handleDeleteAuthor} style={styles.button}>
                Delete
            </button>
            <ToastContainer/>
            <p></p>
            <button type="button" onClick={back}>
                GO BACK
            </button>
        </div>
    );
}

export default DeleteAuthor;

const styles = {
    label: {
        display: 'block',
        marginBottom: '4px',
        fontWeight: 'bold',
    },
    title: {
        backgroundColor: 'orange',
        color: 'black',
        textAlign: 'center',
        fontFamily: 'Roboto',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        fontSize: '2em',
        padding: '10px 0',
        borderRadius: '10px',
    },
    button: {
        backgroundColor: 'red',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        padding: '10px 20px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    authorInfo: {
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '10px',
        marginTop: '20px',
    },
    inputContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    input: {
        width: '57%',
        padding: '12px',
        border: '4px solid #ccc',
        borderRadius: '10px',
    },
};
