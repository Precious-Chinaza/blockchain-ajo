require('dotenv').config();
const express =require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());


//simple health /ping endpoint

app.get('/api/ping', (req, res) => {
    res.json({status: 'ok', message: 'pong'});
});

const PORT = process.env.PORT || 4000;
 app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

