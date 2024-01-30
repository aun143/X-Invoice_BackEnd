// const emailModel = require("../Models/emailModel");
// const { InvoiceDetail } = require("../Models/invoiceModel");

// const sendEmailFile = async (req, res) => {
//   const { to, subject, invoiceId } = req.body;
//   try {
//     const invoice = await InvoiceDetail.findById(invoiceId);

//     // console.log("invoice",invoice)

//     const text = `
//       Hi Dear! ${invoice.reciever},

//       A new invoice has been generated from XInvoicely for you . Here's a quick summary:
//       Invoice Details:
//       Description: ${invoice.description}
//       Quantity: ${invoice.quantity}
//       Amount: ${invoice.amount}
//       Total Invoice Amount: ${invoice.total}
//       Due Date: ${invoice.invoiceDueDate}

//       You can view the invoice or download a PDF copy of it from the following link:
//       ${invoice.invoiceLink}
//       Best regards,
//       ${invoice.sender}
//     `;
//     await emailModel.send(to, subject, text);

//     res.status(200).json({ message: "Email Sent Successfully XInvoicely" });
//   } catch (error) {
//     console.log("Error sending email", error);
//     res.status(500).json({ message: "Error Sending Email XInvoicely", error });
//   }
// };
// module.exports = { sendEmailFile };


const emailModel = require("../Models/emailModel");
const { InvoiceDetail } = require("../Models/invoiceModel");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmailFile = async (req, res) => {
  const { to, subject, invoiceId } = req.body;
  try {
    const invoice = await InvoiceDetail.findById(invoiceId);

    // Load the Handlebars template from a file
    const templatePath = path.join(__dirname, "../views/invoiceTemplate.hbs");
    const source = fs.readFileSync(templatePath, "utf-8");
    const template = handlebars.compile(source);

    // Create the context with data for the template
    const context = {
      receiver: invoice.receiver,
      description: invoice.description,
      quantity: invoice.quantity,
      amount: invoice.amount,
      total: invoice.total,
      invoiceDueDate: invoice.invoiceDueDate,
      invoiceLink: invoice.invoiceLink,
      sender: invoice.sender,
    };

    // Use the template and context to generate the email HTML content
    const htmlContent = template(context);

    // Send HTML email
    await emailModel.send(to, subject, htmlContent, true); // The 'true' indicates HTML content

    res.status(200).json({ message: "Email Sent Successfully XInvoicely" });
  } catch (error) {
    console.log("Error sending email", error);
    res.status(500).json({ message: "Error Sending Email XInvoicely", error });
  }
};

module.exports = { sendEmailFile };

