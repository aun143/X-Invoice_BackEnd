const puppeteer = require("puppeteer");
const { ClientDetail } = require("../Models/clinetModel");
const { BusinessProfile } = require("../Models/businessProfile");
const { InvoiceDetail } = require("../Models/invoiceModel");

const path = require("path");
const axios = require("axios");
const { log } = require("console");

const fetchData = async (
  userFilter = {},
  businessFilter = {},
  invoiceFilter = {}
) => {
  try {
    const userData = await ClientDetail.find(userFilter);
    const businessData = await BusinessProfile.find(businessFilter);
    const invoiceData = await InvoiceDetail.find(invoiceFilter);

    // console.log("invoiceData is This", JSON.stringify(invoiceData, null, 2));
    // console.log("invoiceData is This", invoiceData);
    // console.log("businessData", businessData);
    // console.log("userData is this", userData);

    return { userData, businessData, invoiceData };
  } catch (error) {
    throw error;
  }
};

const generatePDF = async (req, res) => {
  try {
    const userIdToGeneratePDF = req.query.userId;
    const businessIdToGeneratePDF = req.query.businessId;
    const invoiceIdToGeneratePDF = req.query.invoiceId;

   

    if (
      !userIdToGeneratePDF ||
      !businessIdToGeneratePDF ||
      !invoiceIdToGeneratePDF
    ) {
      return res
        .status(400)
        .send(
          "User ID, Business ID, and Invoice ID are required in the query parameters"
        );
    }

    const { userData, businessData, invoiceData } = await fetchData(
      { _id: userIdToGeneratePDF },
      { _id: businessIdToGeneratePDF },
      { _id: invoiceIdToGeneratePDF }
    );
    console.log("userIdToGeneratePDF>>>>", userIdToGeneratePDF);
    console.log("businessIdToGeneratePDF>>>>", businessIdToGeneratePDF);
    console.log("invoiceIdToGeneratePDF>>>>", invoiceIdToGeneratePDF);

    // Combine userData, businessData, and invoiceData as needed for PDF generation
    const combinedData = {
      user: userData,
      business: businessData,
      invoice: invoiceData,
    };
    // console.log("combinedData IS THIS>>>>",combinedData)
    const browser = await puppeteer.launch();
    const pdfBuffers = [];
    for (const record of combinedData.user) {
      const page = await browser.newPage();
      const htmlPath = path.join(__dirname, "../views/template-pdf.html");
      const content = await page.setContent(
        require("fs").readFileSync(htmlPath, "utf8")
      );

      // Pass combined data to the page.evaluate function
      await page.evaluate(
        (record, combinedData) => {
          document.getElementById("firstNameTo").innerText =
            record.firstName || "";
          document.getElementById("postalCodeTo").innerText =
            record.postalCode || "";
          document.getElementById("countryTo").innerText = record.country || "";
          document.getElementById("cityTo").innerText = record.city || "";
          document.getElementById("address1To").innerText = record.address1 || "";

          // ...

          // Access business and invoice data if needed:
          const businessInfo = combinedData.business;
          const firstBusiness =
            businessInfo && businessInfo.length > 0 ? businessInfo[0] : {};
          document.getElementById("email").innerText =
            firstBusiness.email || "";
          document.getElementById("firstNameFrom").innerText = firstBusiness.firstName || "";
          document.getElementById("address1From").innerText = firstBusiness.address1 || "";
          document.getElementById("postalCodeFrom").innerText = firstBusiness.postalCode || "";
          document.getElementById("cityFrom").innerText = firstBusiness.city || "";
          document.getElementById("countryFrom").innerText = firstBusiness.country || "";

          // Add other properties as needed

          const invoiceInfo = combinedData.invoice;
          const firstinvoiceInfo =
            invoiceInfo && invoiceInfo.length > 0 ? invoiceInfo[0] : {};

          // Displaying individual properties
          document.getElementById("subtotal").innerText =
            firstinvoiceInfo.subtotal || "";
          document.getElementById("total").innerText =
            firstinvoiceInfo.total || "";
          document.getElementById("invoiceNumber").innerText =
            firstinvoiceInfo.invoiceNumber || "";
          document.getElementById("date").innerText =
            firstinvoiceInfo.date || "";
          document.getElementById("description").innerText =
            firstinvoiceInfo.description || "";
          document.getElementById("notes").innerText =
            firstinvoiceInfo.notes || "";
          document.getElementById("purchaseOrderNumber").innerText =
            firstinvoiceInfo.purchaseOrderNumber || "";
          document.getElementById("invoiceDueDate").innerText =
            firstinvoiceInfo.invoiceDueDate || "";

const itemsContainer = document.getElementById("itemsContainer");

if (firstinvoiceInfo.items && firstinvoiceInfo.items.length > 0) {
  // Clear the items container before adding new items
  itemsContainer.innerHTML = "";

  // Loop through items array (assuming you have a loop)
  for (const item of firstinvoiceInfo.items) {
    // Create a new div for each item
    const itemContainer = document.createElement("div");

    // Display quantity, rate, amount, and descriptions for each item
    itemContainer.innerHTML = `
      <p><strong>Description:</strong> ${item.description || ""}</p>
      <p><strong>Quantity:</strong> ${item.quantity || ""}</p>
      <p><strong>Rate:</strong> ${item.rate || ""}</p>
      <p><strong>Amount:</strong> ${item.amount || ""}</p>
    `;

    // Append the item container to the items container
    itemsContainer.appendChild(itemContainer);
  }
} else {
  itemsContainer.innerHTML = "<p>No items available</p>";
}





//           const itemsContainer = document.getElementById("itemsContainer");

// if (firstinvoiceInfo.items && firstinvoiceInfo.items.length > 0) {
//   for (const item of firstinvoiceInfo.items) {
//     const itemContainer = document.createElement("div");

//     const quantityElement = document.createElement("p");
//     quantityElement.innerText = `Quantity: ${item.quantity || ""}`;
//     itemContainer.appendChild(quantityElement);

//     const rateElement = document.createElement("p");
//     rateElement.innerText = `Rate: ${item.rate || ""}`;
//     itemContainer.appendChild(rateElement);

//     const amountElement = document.createElement("p");
//     amountElement.innerText = `Amount: ${item.amount || ""}`;
//     itemContainer.appendChild(amountElement);

//     const descriptionElement = document.createElement("p");
//     descriptionElement.innerText = `Description: ${item.description || ""}`;
//     itemContainer.appendChild(descriptionElement);

//     // Append a line break for separation between items
//     const lineBreak = document.createElement("hr");
//     itemContainer.appendChild(lineBreak);

//     itemsContainer.appendChild(itemContainer);
//   }
// } else {
//   itemsContainer.innerText = "No items available";
// }


        },
        record,
        combinedData
      );

      const pdf = await page.pdf({ format: "A4" });
      pdfBuffers.push(pdf);
    }

    res.setHeader("Content-Type", "application/pdf");

    // res.setHeader("Content-Disposition", "attachment; filename=X-Invoicely.pdf");
    pdfBuffers.forEach((pdfBuffer) => res.write(pdfBuffer));
    res.end();
    await browser.close();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};



module.exports = {
  generatePDF,
};

