const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./DataBase/dbConnection");
const { invoiceRouter } = require("./routes/invoiceRouter");
const { uploadRouter } = require("./routes/uploadRouter");
const { clientRouter } = require("./routes/ClientRouter");
const { businessRouter } = require("./routes/businessRouter ");
const pdfRoutes = require("./routes/pdfRoutes");
const { usersRouter } = require("./routes/usersRouter");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

require("dotenv").config();
app.use(express.json());
const PORT = process.env.PORT || 5000;

connectToDatabase();

app.use("/client", clientRouter);
app.use("/business", businessRouter);
app.use("/upload", uploadRouter);
app.use("/invoices", invoiceRouter);
app.use("/login", usersRouter);
app.use("/pdf", pdfRoutes);

app.listen(PORT, () => {
  console.log("Server listening on port".blue, PORT.toString().green);
});
