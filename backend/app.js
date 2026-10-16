import express from "express";
import connectDB from "./connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import dotenv from "dotenv";
dotenv.config();



const app = express();
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/todo" , todoRoutes)

connectDB();
try {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
} catch (error) {
     console.log(`Error: ${error.message}`);
}
