const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const KEEPA_API_KEY = process.env.KEEPA_API_KEY;

app.post("/keepa", async (req, res) => {
    const { asin, domainId } = req.body;

    if (!asin || !domainId) {
        return res.status(400).json({ error: "asin y domainId are required" });
    }

    try {
        // REQUEST CORRECTO PARA PRODUCT DATA
        const url = `https://api.keepa.com/product?key=${KEEPA_API_KEY}&domain=${domainId}&asin=${asin}&product=1&history=1&stats=180`;

        console.log("Consultando Keepa:", url);

        const response = await axios.get(url);
        return res.json({
            success: true,
            data: response.data
        });

    } catch (error) {
        console.error("Error Keepa:", error.message);
        return res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🔥 Keepa Agent ejecutándose en puerto ${PORT}`);
});
