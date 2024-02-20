const { handleUpload } = require("../helpers/cloudinary.helper");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const myUploadMiddleware = upload.single("file");
const maxSize = process.env.MAX_FILE_SIZE_MB || 2;
const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const imageHandler = async (req, res) => {
  try {
    await runMiddleware(req, res, myUploadMiddleware);
    if (req.file.size > maxSize * 1024 * 1024) {
      return res.status(400).json({ error: "File size exceeds the allowed limit" });

    }
    //console.log("file Size Is This",req.file.size)

    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: "Invalid file type. Only JPG, PNG, and PDF are allowed." });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    //console.log("file",req.file)
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const cldRes = await handleUpload(dataURI);

    if (!cldRes || !cldRes.secure_url) {
      //console.error("Secure URL is undefined in Cloudinary response:", cldRes);
      throw new Error("Image upload to Cloudinary failed");
    }

    return { public_id: cldRes.public_id, secure_url: cldRes.secure_url };
  } catch (error) {
    //console.error("Error handling image upload:", error);
    throw error; 
  }
};

module.exports = { imageHandler };
