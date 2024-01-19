const express = require("express");
const cors = require('cors');
const { connectToDatabase } = require("./DataBase/dbConnection");
const { LoginUserRouter } = require("./routes/loginRouter");
const { invoiceRouter } = require("./routes/invoiceRouter");
const { uploadRouter } = require("./routes/uploadRouter");
const { clientRouter } = require("./routes/ClientRouter");
const pdfRoutes = require('./routes/pdfRoutes');

const {
  businessRouterIndividual,
} = require("./routes/businessIndividualRouter ");
const {
  businessRouterOrganization,
} = require("./routes/businessOrganizationRouter");
const colors = require("colors");

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));


require('dotenv').config();
app.use(express.json());
// const PORT = 3010;
const PORT = process.env.PORT || 5000;

connectToDatabase();

app.use("/individual", businessRouterIndividual);
app.use("/organization", businessRouterOrganization);
app.use("/client", clientRouter);
app.use("/upload", uploadRouter);
app.use("/invoices", invoiceRouter);
app.use("/login", LoginUserRouter);
app.use('/pdf', pdfRoutes);

app.listen(PORT, () => {
  console.log("Server listening on port".blue, PORT.toString().green);
});
