import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Clear');
    }
);

app.get('/hello', (req, res) => {
    res.send('Hello HELo');
});

app.get('/hello/:name', (req, res) => {
    res.json({ message: `Hello ${req.params.name}` });
});

app.post('/hello', (req, res) => {
    console.log(req.body.name);
    res.json({ message: `Hello ${req.body.name}` });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});