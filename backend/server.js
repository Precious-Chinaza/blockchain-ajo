require("dotenv").config();
const express =require("express");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

const dbTestRoute = require('./src/routes/dbTest');
app.use('/api' , dbTestRoute);


//simple health /ping endpoint

app.use("/api", require("./src/routes/health"));

const PORT =process.env.PORT || 4000;

app.get('/' , (req, res) => {
    res.send('Server is alive');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// mounting Auth Route

app.use("/api/auth", require("./src/routes/auth.routes"));