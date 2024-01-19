// const puppeteer = require("puppeteer");
// const { ClientDetail } = require("../Models/clinetModel");

// const path = require("path");
// const axios = require("axios");

// const fetchData = async () => {
//   try {
//     const userData = await ClientDetail.find();
//     // const records = await BusinessProfileIndivil.find();

//     return { userData };
//   } catch (error) {
//     ////console.error("Error fetching user data:", error);
//     throw error;
//   }
// };

// const generatePDF = async (req, res) => {
//   try {
//     const { userData } = await fetchData();
//     const browser = await puppeteer.launch();

//     // Create an array to store PDF buffers
//     const pdfBuffers = [];

//     for (const record of userData) {
//       const page = await browser.newPage();

//       const htmlPath = path.join(__dirname, "../views/template.html");
//       const content = await page.setContent(
//         require("fs").readFileSync(htmlPath, "utf8")
//       );

//       await page.evaluate((record) => {
//         document.getElementById("firstName").innerText = record.firstName || "";
//         document.getElementById("email").innerText = record.email || "";
//         document.getElementById("phone").innerText = record.phone || "";
//         document.getElementById("zipCode").innerText = record.zipCode || "";
//         document.getElementById("country").innerText = record.country || "";
//         document.getElementById("state").innerText = record.state || "";
//         document.getElementById("city").innerText = record.city || "";
//       }, record);

//       ////console.log("Record>>>", record);

//       const pdf = await page.pdf({ format: "A4" });

//       // Push each PDF buffer into the array
//       pdfBuffers.push(pdf);
//     }

//     // Send all PDF buffers at once
//     res.header("Content-Type", "application/pdf");
//     pdfBuffers.forEach(pdfBuffer => res.write(pdfBuffer));
//     res.end();

//     await browser.close();
//   } catch (error) {
//     ////console.error("Error generating PDF:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// module.exports = {
//   generatePDF,
// };


const puppeteer = require("puppeteer");
const { ClientDetail } = require("../Models/clinetModel");
const path = require("path");
const axios = require("axios");

const fetchData = async (filter = {}) => {
  try {
    const userData = await ClientDetail.find(filter);

    ////console.log("userData is this", userData);

    return { userData };
  } catch (error) {
    ////console.error("Error fetching user data:", error);
    throw error;
  }
};

const generatePDF = async (req, res) => {
  try {
    // Extract user ID from query parameters
    const userIdToGeneratePDF = req.query.userId;

    // Check if userIdToGeneratePDF is present in the query parameters
    if (!userIdToGeneratePDF) {
      return res.status(400).send("User ID is required in the query parameters");
    }

    // Fetch data for the specified user
    const { userData } = await fetchData({ _id: userIdToGeneratePDF });

    const browser = await puppeteer.launch();

    // Create an array to store PDF buffers
    const pdfBuffers = [];

    for (const record of userData) {
      const page = await browser.newPage();

      const htmlPath = path.join(__dirname, "../views/template.html");
      const content = await page.setContent(
        require("fs").readFileSync(htmlPath, "utf8")
      );

      await page.evaluate((record) => {
        document.getElementById("firstName").innerText = record.firstName || "";
        document.getElementById("email").innerText = record.email || "";
        document.getElementById("phone").innerText = record.phone || "";
        document.getElementById("zipCode").innerText = record.zipCode || "";
        document.getElementById("country").innerText = record.country || "";
        document.getElementById("state").innerText = record.state || "";
        document.getElementById("city").innerText = record.city || "";
      }, record);

      ////console.log("Record>>>", record);

      const pdf = await page.pdf({ format: "A4" });

      // Push each PDF buffer into the array
      pdfBuffers.push(pdf);
    }

    // Send all PDF buffers at once
    res.header("Content-Type", "application/pdf");
    pdfBuffers.forEach((pdfBuffer) => res.write(pdfBuffer));
    res.end();

    await browser.close();
  } catch (error) {
    ////console.error("Error generating PDF:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  generatePDF,
};



// const puppeteer = require("puppeteer");
// const { ClientDetail } = require("../Models/clinetModel");
// const path = require("path");
// const axios = require("axios");

// const fetchData = async () => {
//   try {
//     const userData = await ClientDetail.find();

//     return { userData };
//   } catch (error) {
//     ////console.error("Error fetching user data:", error);
//     throw error;
//   }
// };  

// const generatePDF = async (req, res) => {
//   try {
//     const { userData } = await fetchData();
//     const browser = await puppeteer.launch();

//     // Create an array to store PDF buffers
//     const pdfBuffers = [];

//     for (const record of userData) {
//       const page = await browser.newPage();

//       const htmlPath = path.join(__dirname, "../views/template.html");
//       const content = await page.setContent(
//         require("fs").readFileSync(htmlPath, "utf8")
//       );

//       await page.evaluate((record) => {
//         document.getElementById("firstName").innerText = record.firstName || "";
//         document.getElementById("email").innerText = record.email || "";
//         document.getElementById("phone").innerText = record.phone || "";
//         document.getElementById("zipCode").innerText = record.zipCode || "";
//         document.getElementById("country").innerText = record.country || "";
//         document.getElementById("state").innerText = record.state || "";
//         document.getElementById("city").innerText = record.city || "";
//       }, record);

//       ////console.log("Record>>>", record);

//       const pdf = await page.pdf({ format: "A4" });

//       // Push each PDF buffer into the array
//       pdfBuffers.push(pdf);
//     }

//     // Send all PDF buffers at once
//     res.header("Content-Type", "application/pdf");
//     pdfBuffers.forEach((pdfBuffer) => res.write(pdfBuffer));
//     res.end();

//     await browser.close();
//   } catch (error) {
//     ////console.error("Error generating PDF:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// module.exports = {
//   generatePDF,
// };

