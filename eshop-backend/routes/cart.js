const express = require("express");
const { supabase } = require("../supabaseClient.js");
const { authMiddleware } = require("../middlewares/auth.js");

const router = express.Router();

// Add item to cart
router.post("/", async (req, res) => {
  const { product_id, quantity } = req.body;
  const { data, error } = await supabase.from("cart").insert({
    user_id: req.uid,
    product_id,
    quantity,
  });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Get cart for user
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("cart").select("*").eq("user_id", req.uid);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;