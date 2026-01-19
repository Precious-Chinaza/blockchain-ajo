require("dotenv").config();
const express =require("express");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());


//simple health /ping endpoint

app.use("/api", require("./routes/health"));

const PORT =process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});