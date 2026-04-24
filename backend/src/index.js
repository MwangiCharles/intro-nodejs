import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try {
        // Connect to MySQL database
        await connectDB();
        
        console.log("Database connected successfully");

        app.on("error", (error) => {
            console.log("ERROR:", error);
            throw error;
        });

        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`🚀 Server is running at port: ${PORT}`);
        });

    } catch (err) {
        console.log("❌ MySQL database connection failed: ", err.message);
        process.exit(1);
    }
}

startServer();