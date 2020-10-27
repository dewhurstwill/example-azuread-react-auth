// Node Modules
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

// Dev dependencies
if(process.env.NODE_ENV === "Dev"){ require("dotenv").config(); }

const app = express();
app.disable("x-powered-by");
const port = process.env.PORT || 3000;

// Import routes
const authRoute = require("./routes/auth");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());

// Routes
// Health Endpoint that will return an HTTP200 if the service is up
app.get("/api/v1/auth/health", (req, res) => res.send());
// Auth Route
app.use("/api/v1/auth", authRoute);

app.listen(port, () => console.log(`Server Up and Running on port ${port}`));
