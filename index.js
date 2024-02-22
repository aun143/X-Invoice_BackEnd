require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const { connectToDatabase } = require("./src/database/dbConnection");
const { usersRouter } = require("./src/routes/usersRouter");
const { businessRouter } = require("./src/routes/businessRouter ");
const { clientRouter } = require("./src/routes/clientRouter");
const { invoiceRouter } = require("./src/routes/invoiceRouter");
const { uploadRouter } = require("./src/routes/uploadRouter");
const { emailRouter } = require("./src/routes/emailRouter");
const pdfRoutes = require("./src/routes/pdfRoutes");

const app = express();

app.use(cors());

// app.use((err, req, res, next) => {
//   if (err.name === 'CORSError') {
//     res.status(403).json({ error: 'CORS error: Origin not allowed' });
//   } else {
//     next(err);
//   }
// });
app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use(express.json());

connectToDatabase();

app.use("/login", usersRouter);
app.use("/business", businessRouter);
app.use("/client", clientRouter);
app.use("/invoices", invoiceRouter);
app.use("/upload", uploadRouter);
app.use("/email", emailRouter);
app.use("/pdf", pdfRoutes);
app.use('*', (req, res) => res.send('X-Invoice Backend Routing Not Found'))

const PORT = process.env.PORT || 9002;
app.listen(PORT, () => {
  console.log("Server listening on port".blue, PORT.toString().green);
});
