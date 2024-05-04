const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const dbConnection = require("./db/config");
const fileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config();

const os = require("os");

const {
   Ethernet: [{ address }],
} = os.networkInterfaces();

const { PORT = 3004, HOST = "localhost", NE_HOST = address } = process.env;

const hosts = [HOST, NE_HOST];

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
   res.json({ products: "hola" });
});

app.use("/api/user", require("./routes/user"));

app.use("/api/quick-notes", require("./routes/quick-notes"));

hosts.forEach((host) => {
   app.listen(PORT, host, () => console.log(`server running at http://${host}:${PORT}`));
});

module.exports = app;
