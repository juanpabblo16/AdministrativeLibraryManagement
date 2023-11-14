import React, {useState, useEffect} from 'react';
import axios from '../config/axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import AuthorP from '../components/AuthorCreation.jsx'

function AuthorBooksList() {
    const [authorId, setAuthorId] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAuthorIdChange = (e) => {
        setAuthorId(e.target.value);
    };

    const back = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <AuthorP/>
            </React.StrictMode>
        );
    }

    const getBooksByAuthor = () => {
        if (authorId.trim() === '') {
            toast.warning('Please enter an author ID', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }

        setLoading(true);
        const token = localStorage.getItem('token');

        axios
            .get(`/authors/${authorId}/books`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error al obtener la lista de libros del autor:', error);
                setLoading(false);
                toast.warning('La lista de libros del autor está vacía', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            });
    };

    return (
        <div>
            <button type="button" onClick={back} style={styles.tryAgain}>
                Go back
            </button>
            <h1 style={styles.title}>Books of Author</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter Author ID"
                    value={authorId}
                    onChange={handleAuthorIdChange}
                />
                <button type="button" onClick={getBooksByAuthor} style={styles.createButton}>
                    Get List
                </button>
            </div>
            {loading ? (
                <p>Loading Books...</p>
            ) : books.length > 0 ? (
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            {book.title}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No books available for this author.</p>
            )}
            <ToastContainer/>
        </div>
    );
}

const styles = {
    input: {
        width: '20%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '3px',
    },
    createButton: {
        backgroundColor: 'green',
        color: '#fff',
        border: 'none',
        borderRadius: '3px',
        padding: '10px 20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    tryAgain: {
        backgroundColor: 'white',
        color: '#000',
        fontStyle: 'italic',
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
    }
};

export default AuthorBooksList;
