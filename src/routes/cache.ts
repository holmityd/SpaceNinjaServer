import express from "express";
import config from "@/config.json";
import { join } from "path";

const cacheRouter = express.Router();

cacheRouter.get("/B.Cache.Dx11.bin.*", (_req, res) => {
    res.sendFile(join(__dirname, "../../static/data/B.Cache.Dx11_33.0.6.bin"));
});

cacheRouter.get("/B.Cache.Windows_en.bin*", (_req, res) => {
    res.sendFile(join(__dirname, "../../static/data/B.Cache.Windows_en_33.0.10.bin"));
});

cacheRouter.get(/^\/origin\/[a-zA-Z0-9]+\/[0-9]+\/H\.Cache\.bin.*$/, (_req, res) => {
    res.sendFile(join(__dirname, `../../static/data/H.Cache_${config.version}.bin`));
});

export { cacheRouter };
