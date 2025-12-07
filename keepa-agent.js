// --- Keepa Local Agent Server (for Render) ---
// API will run at: /keepa

const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

// --------------------------------------------------
// API KEY se toma de variable de entorno en Render
// --------------------------------------------------
const KEEPA_API_KEY = process.env.KEEPA_API_KEY;

// --------------------------------------------------
// ENDPOINT para consultar Keepa
// --------------------------------------------------
app.post("/keepa", async (req, res) => {
    const { asin, domainId } = req.body;

    if (!asin || !domainId) {
        return res.status(400).json({ error: "asin y domainId son requeridos" });
    }

    try {
        const url = `https://api.keepa.com/product?key=${KEEPA_API_KEY}&domain=${domainId}&asin=${asin}`;
        console.log("Consultando Keepa:", asin, "Domain:", domainId);

        const response = await axios.get(url);

        return res.json({
            success: true,
            data: response.data
        });

    } catch (err) {
        console.error("Error Keepa:", err.message);
        return res.status(500).json({ error: err.message });
    }
});

// --------------------------------------------------
// INICIAR SERVIDOR (Render asigna el puerto dinámicamente)
// --------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🔥 Keepa Agent ejecutándose en puerto ${PORT}`);
});
