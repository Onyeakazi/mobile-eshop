const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { supabase } = require("../supabaseClient.js");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// GET all products
router.get("/", async (req, res) => {
  try{
    const {search} = req.query;

    let query = supabase.from("products").select("*");

    if(search){
      query = query.ilike("name", `%${search}%`);
    }

    const { data, error } = await query;
    if(error) throw error;

    res.json(data)
  }catch(err) {
    res.status(500).json({error: err.message});
  }
});

// GET product by ID
router.get("/:id", async (req, res) => {
  const { data, error } = await supabase.from("products").select("*").eq("id", req.params.id).single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ADD product (POST) – as before
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ error: "Image is required" });

    const fileName = `${Date.now()}-${file.originalname}`;
    const { error: uploadError } = await supabase.storage.from("product-images").upload(
      fileName,
      fs.readFileSync(file.path),
      { contentType: file.mimetype }
    );
    if (uploadError) throw uploadError;

    const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/product-images/${fileName}`;
    const { data, error } = await supabase.from("products").insert([{ name, price, category, description, image: imageUrl }]);
    if (error) throw error;

    fs.unlinkSync(file.path);
    res.json({ message: "Product added", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// EDIT product (PUT)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const file = req.file;

    // Fetch existing product
    const { data: existingProduct, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .eq("id", req.params.id)
      .single();
    if (fetchError) throw fetchError;

    let updates = { name, price, category, description };

    if (file) {
      // Delete old image from Supabase bucket
      if (existingProduct.image) {
        const oldFileName = existingProduct.image.split("/").pop();
        const { error: removeError } = await supabase
          .storage
          .from("product-images")
          .remove([oldFileName]);
        if (removeError) console.error("Error removing old image:", removeError);
      }

      // Upload new image
      const fileName = `${Date.now()}-${file.originalname}`;
      const { error: uploadError } = await supabase
        .storage
        .from("product-images")
        .upload(fileName, fs.readFileSync(file.path), { contentType: file.mimetype });

      if (uploadError) throw uploadError;

      // Update image URL
      updates.image = `${process.env.SUPABASE_URL}/storage/v1/object/public/product-images/${fileName}`;

      // Delete local uploaded file
      fs.unlinkSync(file.path);
    }

    // Update product in DB
    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", req.params.id);
    if (error) throw error;

    res.json({ message: "Product updated successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    // Get the product from the DB
    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .eq("id", req.params.id)
      .single();
    if (fetchError) throw fetchError;

    // Remove image from Supabase bucket
    if (product.image) {
      const fileName = product.image.split("/").pop();
      const { error: removeError } = await supabase
        .storage
        .from("product-images")
        .remove([fileName]);

      if (removeError) console.error("Error removing image from bucket:", removeError);
    }

    // Remove local uploaded file if it still exists
    const localPath = `uploads/${product.image?.split("/").pop()}`;
    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }

    //  Delete product row from DB
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", req.params.id);
    if (error) throw error;

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;