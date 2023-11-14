import React, {useState, useEffect} from 'react';
import axios from '../config/axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Book from '../components/CreateBook.jsx';

function BookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const back = () => {
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <Book/>
            </React.StrictMode>
        );
    }

    const getBooksList = () => {
        setLoading(true);
        const token = localStorage.getItem('token');

        axios
            .get('/books', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error al obtener la lista de libros:', error);
                setLoading(false);
                toast.warning('La lista de libros está vacía', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            });
    };

    return (
        <body>
        <div>
            <button type="button" onClick={back} style={styles.tryAgain}>
                Go Back
            </button>

            <h1 style={styles.title}>Books List</h1>
            <button type="button" onClick={getBooksList} style={styles.createButton}>
                Get List
            </button>
            <p></p>
            {loading ? (
                <p>Loading Books...</p>
            ) : (
                books.length > 0 ? (
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={styles.tableCell}>ID</TableCell>
                                <TableCell style={styles.tableCell}>Title</TableCell>
                                <TableCell style={styles.tableCell}>Publication Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map((book) => (
                                <TableRow key={book.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell style={styles.tableComponent} component="th" scope="row">
                                        {book.id}
                                    </TableCell>
                                    <TableCell style={styles.tableComponent}>{book.title}</TableCell>
                                    <TableCell style={styles.tableComponent}>{book.publicationDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p>No Books available.</p>
                )
            )}
            <ToastContainer/>
        </div>
        </body>
    );
}

export default BookList;

const styles = {
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
        backgroundColor: 'black',
        color: '#fff',
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
    },
    tableCell: {
        backgroundColor: 'orange',
        color: 'black',
        fontWeight: 'bold',

    },
    tableComponent: {
        backgroundColor: 'white',
        color: 'black',
        fontWeight: 'bold',
    }
};
