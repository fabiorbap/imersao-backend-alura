import express from 'express';
import dotenv from 'dotenv';
import routes from './src/routes/postRoutes.js';

dotenv.config();

const app = express();
app.use(express.static("uploads"))
routes(app)

app.listen(3000, () => {
    console.log('Server listening...');
});