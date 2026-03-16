let express = require("express");
let app = express();
let mongoose = require("mongoose");

const EnquiryRouter = require("./App/route/web/enquiryRoutes");

require("dotenv").config();

let cors = require("cors");

// Allow only the deployed frontend domain
app.use(
  cors({
    origin: ["https://enquiryformusingmern-6-frontend-2.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/website/enquiry", EnquiryRouter);

// Connectivity with MongoDB
const mongoUri =
  "mongodb+srv://Riya:V3wVSw5g85rhop3x@cluster0.osjz3ip.mongodb.net/enquiryDB";
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(process.env.PORT || 8020, () => {
      console.log(
        `Server started on port https://localhost:${process.env.PORT || 8020}`,
      );
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });
