import app from "./app";
import dotenv from "dotenv";
import config from "./config";



const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
