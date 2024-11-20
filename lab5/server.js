import express from 'express';
import cors from 'cors';
import cameraRoutes from './routes/cameraRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/cameras', cameraRoutes);

app.listen(port, () => {
    console.log(`backend http://localhost:${port}`);
});