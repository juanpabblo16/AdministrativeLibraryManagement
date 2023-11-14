import React, {useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dash from '../components/DashboardPage.jsx';
import ShowAL from '../components/getListAuthor.jsx';
import BooksAuthor from '../components/ShowAuthorBooks.jsx';
import DeleteAuthor from '../components/DeleteAuthor';
import UpdateAuthor from '../components/UpdateAuthor';
import axios from '../config/axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ReactDOM from 'react-dom/client';
import UpdateBooks from "./UpdateBook.jsx";

function AuthorCreation() {
    const [value, setValue] = useState(0);


    const handleChangee = (event, newValue) => {
        setValue(newValue);
    };

    const [authorData, setAuthorData] = useState({
        name: '',
        nationality: '',
    });

    const handleAuthorCreate = () => {
        // Verifica que los campos no estén vacíos y que no contengan números
        if (!authorData.name.trim() || !authorData.nationality.trim()) {
            toast.error('El nombre y la nacionalidad del autor no pueden estar vacío', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }

        // Puedes agregar verificación adicional aquí para el campo "nationality" si es necesario.

        const token = localStorage.getItem('token');
        console.log(token);

        axios
            .post('/authors', authorData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log('Autor creado:', response.data);
                    toast.success('Autor creado con éxito', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
            })
            .catch((error) => {
                console.error('Error al crear el autor:', error);
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
                    toast.error('Error al crear el autor', {
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

    const handleDashboard = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <Dash/>
            </React.StrictMode>
        );
    };

    const handleShowList = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <ShowAL/>
            </React.StrictMode>
        );
    };

    const handleBooksOfAuthor = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <BooksAuthor/>
            </React.StrictMode>
        );
    };

    const handleUpdateAuthor = () => {

        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <UpdateAuthor/>
            </React.StrictMode>
        );
    };

    const handleDeleteAuthor = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <DeleteAuthor/>
            </React.StrictMode>
        );
    };

    return (
        <div style={styles.container}>
            <Box
                sx={{
                    maxWidth: {xs: 320, sm: 1000},
                    bgcolor: 'background.paper',
                    margin: '0 auto',
                    padding: '20px',
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChangee}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Back to Dashboard" onClick={handleDashboard}/>
                    <Tab label="Create Author"/>
                    <Tab label="Update Author" onClick={handleUpdateAuthor}/>
                    <Tab label="Delete Author" onClick={handleDeleteAuthor}/>
                    <Tab label="Get Author List" onClick={handleShowList}/>
                    <Tab label="Get Books of Author" onClick={handleBooksOfAuthor}/>
                </Tabs>
            </Box>
            <h1 style={styles.heading}>Create Author</h1>
            <form>
                <div style={styles.formGroup}>
                    <label htmlFor="name" style={styles.label}>Author Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={authorData.name}
                        onChange={handleChange}
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

                    />
                </div>
                <button type="button" onClick={handleAuthorCreate} style={styles.button}>
                    Create
                </button>
            </form>
            <ToastContainer/>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
        color: '#000',
        border: 'none',
        borderRadius: '3px',
        padding: '10px 20px',
        cursor: 'pointer',
    },
};

export default AuthorCreation;
