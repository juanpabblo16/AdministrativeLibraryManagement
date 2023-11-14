import React, { useState } from 'react';
import axios from '../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import Book from '../components/CreateBook.jsx';

function UpdateBook() {
  const [bookId, setBookId] = useState('');
  const [bookData, setBookData] = useState({
    title: '',
    publicationDate: '',
    author: {
      id: null,
      name: '',
      nationality: '',
    },
  });
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFind = () => {
    const token = localStorage.getItem('token');

    axios
      .get(`/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { title, publicationDate, author } = response.data;
        setBookData({
          title,
          publicationDate,
          author: { ...author },
        });
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del libro:', error);
        toast.error('Error al obtener los detalles del libro', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  };

  const back = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <Book />
        </React.StrictMode>
    );
  }

  const handleUpdateBook = () => {
    const token = localStorage.getItem('token');

    axios
      .put(`/books/${bookId}`, bookData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
          if (response.status === 200) {
          console.log('Libro actualizado:', response.data);
          toast.success('Libro actualizado con éxito', {
            position: 'top-right',
            autoClose: 3000,
          });
        } 
      })
      .catch((error) => {

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
      });
  };

  const handleChange = (e) => {
    if (e.target.name === 'author') {
      const { author } = bookData;
      if (e.target.id === 'id' || e.target.id === 'name' || e.target.id === 'nationality') {
        author[e.target.id] = e.target.value;
        setBookData({
          ...bookData,
          author: { ...author },
        });
      }
    } else {
      setBookData({
        ...bookData,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>UPDATE BOOK</h1>
      <div>
        <label htmlFor="bookId" style={styles.label}>ID Search:</label>
        <input
          type="text"
          id="bookId"
          name="bookId"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          style={styles.input}
        />
        <button type="button" onClick={handleFind} style={styles.button}>
          Send
        </button>
      </div>

      <form>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="publicationDate" style={styles.label}>Date Publication:</label>
          <input
            type="date"
            id="publicationDate"
            name="publicationDate"
            value={bookData.publicationDate}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="authorId" style={styles.label}>Author ID:</label>
          <input
            type="number"
            id="id"
            name="author"
            value={bookData.author.id}
            onChange={handleChange}
            style={styles.input}
          />
          <label htmlFor="authorName" style={styles.label}>Author Name:</label>
          <input
            type="text"
            id="name"
            name="author"
            value={bookData.author.name}
            onChange={handleChange}
            style={styles.input}
          />
          <label htmlFor="authorNationality" style={styles.label}>Author Nationality:</label>
          <input
            type="text"
            id="nationality"
            name="author"
            value={bookData.author.nationality}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </form>
      <button type="button" onClick={handleUpdateBook} style={styles.button}>
        Update
      </button>
      <p></p>
      <button type="button" onClick={back} >
        Go Back
      </button>
      <ToastContainer />
    </div>
  );
}

export default UpdateBook;

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
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'green',
    color: '#000',
    border: 'none',
    borderRadius: '3px',
    padding: '10px 20px',
    cursor: 'pointer',
    marginRight: '10px',
  },
};
