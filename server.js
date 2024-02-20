const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const { connectToDatabase } = require("./DataBase/dbConnection");
const { usersRouter } = require("./routes/usersRouter");
const { businessRouter } = require("./routes/businessRouter ");
const { clientRouter } = require("./routes/clientRouter");
const { invoiceRouter } = require("./routes/invoiceRouter");
const { uploadRouter } = require("./routes/uploadRouter");
const { emailRouter } = require("./routes/emailRouter");
const pdfRoutes = require("./routes/pdfRoutes");

const app = express();  
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use((err, req, res, next) => {
  if (err.name === 'CORSError') {
    res.status(403).json({ error: 'CORS error: Origin not allowed' });
  } else {
    next(err);
  }
});
app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); 

require("dotenv").config();
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectToDatabase();

app.use("/login", usersRouter);
app.use("/business", businessRouter);
app.use("/client", clientRouter);
app.use("/invoices", invoiceRouter);
app.use("/upload", uploadRouter);
app.use("/email", emailRouter);
app.use("/pdf", pdfRoutes);

app.listen(PORT, () => {
  console.log("Server listening on port".blue, PORT.toString().green);
});
