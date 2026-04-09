const express = require("express");
const { supabase } = require("../supabaseClient.js");
const { authMiddleware } = require("../middlewares/auth.js");

const router = express.Router();

router.get("/:productId", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", req.params.productId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { product_id, user_name, rating, comment } = req.body;

    const { data, error } = await supabase
      .from("reviews")
      .insert([{ product_id, user_name, rating, comment }]);

    if (error) throw error;

    res.json({ message: "Review added", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
