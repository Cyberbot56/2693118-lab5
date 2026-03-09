const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Your routes here
let books = [];

app.get('/whoami', (req, res) => {
    res.status(200).json({
        "studentNumber": '2693118'
    });
});

app.get('/books', (req, res) => {
    res.status(200).json(books);
});

app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find(book1 => book1.id === id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
});

app.post('/books', (req, res) => {
    const { id, title, details } = req.body;

    if (!id || !title || !details) {
        return res.status(400);
    }

    const book = { id, title, details };

    books.push(book);

    res.status(201).json(book);
});

app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, details } = req.body;

    const book = books.find(book1 => book1.id === id);

    if (!book) {
        return res.status(404);
    }

    if (title) {
        book.title = title;
    }
    if (details){
        book.details = details;
    }

    res.status(200).json(book);
});

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = books.findIndex(book1 => book1.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Book not found" });
    }

    books.splice(index, 1);

    res.status(200);
});

app.delete('/books/:id/details/:detailId', (req, res) => {
    const detailIdUse = parseInt(req.params.detailId);
    const id = parseInt(req.params.id);
    const book = books.find(book1 => book1.id === id);
    if(!book){
        return res.status(404).json({
            "error" : "Book or detail not found"
        });
    }
    const detailIndex = book.details.findIndex(detail1 => detail1.id === detailIdUse);
    if(detailIndex === -1){
        res.status(404).json({
            "error" : "Book or detail not found"
        });
    }
    else{
        book.details.splice(detailIndex, 1);
        res.status(200);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});