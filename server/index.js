const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const dbConnection = require("./db/config");
const fileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config();

const { PORT = 3004, HOST = "localhost" } = process.env;

const hosts = [HOST];

app.use(cors());
app.use(cookieParser());

app.use(express.json());

dbConnection();

const fileUploadConfig = {
   useTempFiles: true,
   tempFileDir: "/tmp/",
   createParentPath: true,
};

app.use(fileUpload(fileUploadConfig));

app.get("/api/test", async (req, res) => {
   // await Signature.updateMany({}, { $set: { disabled: false } });

   res.json({ msg: "Done" });
});

app.use("/api/user", require("./routes/user"));

app.use("/api/quick-notes", require("./routes/quick-notes"));

app.use("/api/signatures", require("./routes/signatures"));

app.use("/api/signatures/pages", require("./routes/signatures-pages"));

hosts.forEach((host) => {
   app.listen(PORT, host, () => console.log(`server running at http://${host}:${PORT}`));
});
