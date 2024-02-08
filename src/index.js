import 'dotenv/config';
import express from 'express';
const port = process.env.API_PORT || 5000;
const app = express();

import Routes from './routes/index.js';

app.use("/api/shopify", Routes.shopify);
app.use("/api/user", Routes.user);
app.use("/api/models", Routes.models);

app.listen(port, () => {
    console.log(`API server running on port: ${port}`);
    console.log(`Try a request. Something like: "http://localhost:${port}/api/user/J.%20Doe"`);
});
