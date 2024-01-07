import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import apiRoutes from './routes/apiRoutes.js';
const app = express();
app.use(express.json());
dotenv.config();
const URI = process.env.URI;
mongoose.connect(URI)
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Connected", process.env.PORT);
    });
})
    .catch(err => console.log(err));
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// routes
app.use('/api', apiRoutes);
