const express = require("express");
const { supabase } = require("../supabaseClient.js");
const { authMiddleware } = require("../middlewares/auth.js");

const router = express.Router();

// Create Order
router.post("/", async (req, res) => {
  const { productId, quantity, size, price, image, name } = req.body;

  const { data, error } = await supabase
    .from("orders")
    .insert([{  product_id: productId, quantity, size, price, image, name }])
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Get Orders 
router.get("/orders", async (req, res) => {
  const { data, error } = await supabase.from("orders").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

module.exports = router;