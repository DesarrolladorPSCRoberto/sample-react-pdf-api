import express from "express";
import createARS from "./PDFs/ARS/PDF-ARS";
import dotenv from 'dotenv';
import path from "path";
import createTemplate from "./create-template"; // adjust path as needed
import { ARSHeaderInfo } from "./PDFs/ARS/PDF-ARS-Header";
import { ARSItem } from "./PDFs/ARS/PDF-ARS-Tabla";
import { testInfoARS } from "./testInfo";

const NODE_ENV = process.env.NODE_ENV || 'production';
dotenv.config({ path: path.resolve(process.cwd(), 'config', `.env.${NODE_ENV}`) });
const app = express();
app.use(express.json());
const port = process.env.PORT || '5101';
app.get("/preview", async (req, res) => {
    // Use default/demo data for quick preview

    try {
        const stream = await createARS(testInfoARS);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=preview.pdf");
        stream.pipe(res);
    } catch (error) {
        console.error("Error creating PDF:", error);
        res.status(500).send({ error: "Error generating PDF" });
    }
});

app.post("/", async (req, res) => {
    // Log the raw request body to ensure it is being received correctly

    // Ensure the data is in the expected format
    if (!req.body.ARSHeaderInfo || !req.body.ARSItems) {
        return res.status(400).send({ error: "Invalid data format" });
    }

    // Now that we know the data structure is correct, pass it to createARS
    const json = req.body;

    try {
        const result = await createARS(json);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);
        result.pipe(res);
    } catch (error) {
        console.error("Error creating PDF:", error);
        res.status(500).send({ error: "Error generating PDF" });
    }
});


app.listen(port, () => {
    console.log(`The sample PDF app is running on port ${port}.`);
});