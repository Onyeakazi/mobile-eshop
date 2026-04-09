import React, { useState } from "react";

export default function ProductForm({ initialData = {}, onSubmit }) {
  const [name, setName] = useState(initialData.name || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [price, setPrice] = useState(initialData.price || 0);
  const [stock, setStock] = useState(initialData.stock || 0);
  const [imageUrl, setImageUrl] = useState(initialData.image_url || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, category, price, stock, imageUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
      <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" />
      <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" />
      <button type="submit" className="bg-black text-white p-2 rounded">Save</button>
    </form>
  );
}