import React, {useState} from 'react';
import axios from '../config/axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from "react-dom";
import Author from "./AuthorCreation.jsx";

function UpdateAuthor() {
    const [authorId, setAuthorId] = useState('');
    const [authorData, setAuthorData] = useState({
        name: '',
        nationality: '',
    });

    const back = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <Author/>
            </React.StrictMode>
        );
    }

    const handleFind = () => {
        const token = localStorage.getItem('token');

        axios
            .get(`/authors/${authorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const {name, nationality} = response.data;
                setAuthorData({
                    name,
                    nationality,
                });
            })
            .catch((error) => {
                console.error('Error, por fa:', error);
                toast.error('Error al obtener los detalles del autor', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            });
    };

    const handleUpdateAuthor = () => {
        const token = localStorage.getItem('token');
    
        axios
            .put(`/authors/${authorId}`, authorData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log('Autor actualizado:', response.data);
                    toast.success('Autor actualizado con éxito', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                } 
            })
            .catch((error) => {
                console.error('Error al actualizar el autor:', error);
                if (error.response) {
                    if (error.response.status === 400) {
                        toast.error('Error en la solicitud. Verifique los datos proporcionados.', {
                            position: 'top-right',
                            autoClose: 3000,
                        });
                    } else if (error.response.status === 401) {
                        toast.error('No autorizado. Inicie sesión nuevamente.', {
                            position: 'top-right',
                            autoClose: 3000,
                        });
                    } else {
                        toast.error('Error al actualizar el autor', {
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
    };

    const handleChange = (e) => {
        setAuthorData({
            ...authorData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>UPDATE AUTHOR</h1>
            <form>
                <div>
                    <label htmlFor="authorId" style={styles.label}>ID for search:</label>
                    <input
                        type="text"
                        id="authorId"
                        name="authorId"
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                        style={styles.input}
                    />
                    <button type="button" onClick={handleFind} style={styles.button}>
                        Search
                    </button>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="name" style={styles.label}>Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={authorData.name}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="nationality" style={styles.label}>Nationality:</label>
                    <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={authorData.nationality}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
            </form>
            <button type="button" onClick={handleUpdateAuthor} style={styles.buttonU}>
                Update
            </button>
            <p></p>
            <button type="button" onClick={back}>
                Go Back
            </button>
            <ToastContainer/>
        </div>
    );
}

export default UpdateAuthor;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
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
        marginBottom: '4px',
        fontWeight: 'bold',
    },
    inputContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    input: {
        width: '47%',
        padding: '11px',
        border: '4px solid #ccc',
        borderRadius: '10px',
    },
    buttonU: {
        backgroundColor: 'green',
        color: '#000',
        border: 'none',
        borderRadius: '10px',
        padding: '10px 20px',
        cursor: 'pointer',
        marginRight: '10px',
    },

};
