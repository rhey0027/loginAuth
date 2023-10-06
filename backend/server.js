import Express from "express";
import dotenv from "dotenv";
const port = process.env.PORT || 5000;
import userRoutes from "./routes/userRoutes.js";
const app = Express();
dotenv.config();
import { requestNotFound, errorHandler } from "./middleware/customError.js";

app.use('/users', userRoutes);
app.get('/', (req, res) => res.send('Server is ready'));
app.use(requestNotFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is active on port=> ${port}`));