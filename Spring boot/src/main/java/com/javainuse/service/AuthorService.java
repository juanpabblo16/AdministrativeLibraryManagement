package com.javainuse.service;

import com.javainuse.dto.AuthorDTO;
import com.javainuse.model.Author;
import com.javainuse.model.Book;
import com.javainuse.repository.AuthorRepository;
import com.javainuse.repository.BookRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthorService {
    @Autowired
    private AuthorRepository authorRepository;
    @Autowired
    private BookRepository bookRepository;

    public List<AuthorDTO> getAllAuthors() {
        List<Author> authors = authorRepository.findAll();
        return authors.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public Author getAuthorById(Long id) {
        return authorRepository.findById(id).orElse(null);
    }

    public Author createAuthor(Author author) {
        return authorRepository.save(author);
    }

    public Author updateAuthor(Long id, Author author) {
        if (authorRepository.existsById(id)) {
            author.setId(id);
            return authorRepository.save(author);
        } else {
            return null; // You can handle the appropriate error logic
        }
    }

    public void deleteAuthor(Long id) {
        authorRepository.deleteById(id);
    }

    public List<Book> getBooksByAuthor(Long authorId) {
        return bookRepository.findByAuthorId(authorId);
    }

    private AuthorDTO convertToDto(Author author) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(author, AuthorDTO.class);
    }
}

