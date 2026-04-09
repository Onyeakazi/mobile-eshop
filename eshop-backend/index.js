const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const productsRouter = require("./routes/products.js");
const cartRouter = require("./routes/cart.js");
const reviewRoutes = require("./routes/reviews");
const ordersRouter = require("./routes/orders.js");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/reviews", reviewRoutes);
app.use("/orders", ordersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));