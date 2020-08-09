import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || port, function () {
    console.log(`Server running in ${port}\n`);
});

