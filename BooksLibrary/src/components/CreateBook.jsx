import React, {useState, useEffect} from 'react';
import axios from '../config/axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ReactDOM from 'react-dom/client';
import Dash from '../components/DashboardPage.jsx';
import ShowList from '../components/getBookList.jsx';
import UpdateBooks from '../components/UpdateBook.jsx';
import DeleteBook from '../components/DeleteBook.jsx';

function CreateBook() {

    const [value, setValue] = useState(0);

    const handleChangee = (event, newValue) => {
        setValue(newValue);
    };

    const [bookData, setBookData] = useState({
        title: '',
        publicationDate: '',
        author: {
            id: null,
            name: '',
            nationality: '',
        }
    });

    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAuthors = () => {

        const token = localStorage.getItem('token');
        axios.get('/authors', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setAuthors(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error al obtener la lista de autores:', error);
                setLoading(false);

                toast.warning('La lista de autores está vacía', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            });
    }

    const handleCreateBook = () => {
        // Verificar que los campos no estén vacíos
        if (!bookData.title.trim() || !bookData.author.name.trim()) {
            toast.error('El título y el nombre del autor no pueden estar vacíos', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }
    
        // Verificar que la fecha no sea mayor que el día de hoy
        const selectedDate = new Date(bookData.publicationDate);
        const currentDate = new Date();
        if (selectedDate > currentDate) {
            toast.error('La fecha de publicación no puede ser mayor que el día de hoy', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }
    
        const token = localStorage.getItem('token');
        axios
            .post('/books', bookData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log('Libro creado:', response.data);
                    toast.success('Libro creado con éxito', {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
            })
            .catch((error) => {
                console.error('Error al crear el libro:', error);
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
                        toast.error('Error al crear el libro', {
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

        if (e.target.name === "author") {
            const {author} = bookData;

            if (e.target.id === "id" || e.target.id === "name" || e.target.id === "nationality") {
                author[e.target.id] = e.target.value;
                setBookData({
                    ...bookData,
                    author: {...author}
                });
            }
        } else {
            setBookData({
                ...bookData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleDashboard = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <Dash/>
            </React.StrictMode>
        );
    };

    const handleList = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <ShowList/>
            </React.StrictMode>
        );
    };

    const handleUpdateBook = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <UpdateBooks/>
            </React.StrictMode>
        );
    };

    const handleDelete = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <DeleteBook/>
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
                    <Tab label="Create Book"/>
                    <Tab label="Update Book" onClick={handleUpdateBook}/>
                    <Tab label="Delete Book" onClick={handleDelete}/>
                    <Tab label="Get Books List" onClick={handleList}/>
                </Tabs>
            </Box>
            <h1 style={styles.title}>Create new Book</h1>
            <form style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="title" style={styles.label}>
                        Title:
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={bookData.title}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </label>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="publicationDate" style={styles.label}>
                        Publication date:
                        <input
                            type="date"
                            id="publicationDate"
                            name="publicationDate"
                            value={bookData.publicationDate}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </label>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="author" style={styles.label}>
                        Author ID:
                        <input
                            type="number"
                            id="id"
                            name="author"
                            value={bookData.author.id}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </label>
                    <label htmlFor="author" style={styles.label}>
                        Author name:
                        <input
                            type="text"
                            id="name"
                            name="author"
                            value={bookData.author.name}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </label>
                    <label htmlFor="author" style={styles.label}>
                        Author nationality:
                        <input
                            type="text"
                            id="nationality"
                            name="author"
                            value={bookData.author.nationality}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </label>
                </div>
            </form>
            <div style={styles.buttonsContainer}>
                <button type="button" onClick={handleCreateBook} style={styles.createButton}>
                    Create Book
                </button>
            </div>
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
    form: {
        display: 'flex',
        flexDirection: 'column',
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
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    createButton: {
        backgroundColor: 'green',
        color: '#000',
        border: 'none',
        borderRadius: '10px',
        padding: '10px 20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};

export default CreateBook;
