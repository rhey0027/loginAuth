import Express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = Express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Server is ready'));

app.listen(port, () => console.log(`Server is active on port ${port}`));