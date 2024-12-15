const express = require("express");
const mongoose = require("mongoose");
const inventoryRoutes = require("./routes/inventoryRou");
const supplierRoutes = require("./routes/supllierRou");
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const _diname = path.resolve();
const PORT = process.env.PORT;

app.use(cors());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB)
    .then(() => console.log("Mongodb connected successfully"))
    .catch(console.error);

app.use("/api/inventorys", inventoryRoutes);
app.use("/api/suppliers", supplierRoutes);

app.use(express.static(path.join(_diname,"/frontend/dist")));
app.get('*', (_,res)=>{
res.sendFile(path.join(_diname,"frontend","dist","index.html"));
})

app.listen(PORT, () => {
    console.log(`Server Starting On http://localhost:${PORT}`)
});