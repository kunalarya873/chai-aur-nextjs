import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './user/user.route.js';
const app = express();

try {
    connectDB();
    console.log('Connected to database');
}
catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
}


app.use(cors());

app.use(express.json());

app.use(userRouter);

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

app.use('/api/users', userRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});