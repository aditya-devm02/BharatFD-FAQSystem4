require("dotenv").config()
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const path = require("path")
const faqRoutes = require("./routes/faqRoutes");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.static(path.resolve(__dirname, 'frontend', 'build')))

app.get("/test",(req,res)=>{
    res.send("Express app is running")
})

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/faqs", faqRoutes);

// Error handling
app.use(errorHandler);

// Serve React app
app.get('*', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, 'frontend', 'build', 'index.html'),
        function (err) {
            if (err) {
                res.status(500).send(err)
            }
        }
    )
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
