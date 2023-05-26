import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import profesionalRoutes from "./routes/profesionales.js";
import postRoutes from "./routes/posts.js";
import { verifyUser } from "./controllers/user.js";



const app = express();

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
}));
app.use(cookieParser())


    app.use("/api/users", userRoutes),
    app.use("/api/profesionales", profesionalRoutes),
    app.use("/api/posts", postRoutes),



app.get('/' , verifyUser , (req, res) =>{
    return res.json({Status: "Exito" , name: req.name});
})  

    app.listen(8080, () => {
        console.log("Conectado");
    })