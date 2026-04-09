import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function AddProduct({ onSaved }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // get ID from URL if editing

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: null, // file
    description: "",
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Determine if editing
  const stateProduct = location.state?.product;
  const isEdit = Boolean(id || stateProduct);

  // Populate form if editing
  useEffect(() => {
    const fetchProduct = async () => {
      let productData = stateProduct;

      // If editing and no state product, fetch from backend
      if (!productData && id) {
        try {
          const res = await fetch(`http://localhost:5000/products/${id}`);
          const data = await res.json();
          productData = data;
        } catch (err) {
          console.error(err);
          alert("Failed to load product");
        }
      }

      if (productData) {
        setForm({
          name: productData.name || "",
          price: productData.price || "",
          category: productData.category || "",
          image: null, // keep null, optional to upload new image
          description: productData.description || "",
        });
        setPreview(productData.image || null);
      }
    };

    fetchProduct();
  }, [id, stateProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("description", form.description);
      if (form.image) formData.append("image", form.image);

      const url = isEdit
        ? `http://localhost:5000/products/${id}`
        : "http://localhost:5000/products";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
      const data = await res.json();

      alert(`Product ${isEdit ? "updated" : "added"} successfully!`);

      // Clear form after adding
      if (!isEdit) {
        setForm({ name: "", price: "", category: "", image: null, description: "" });
        setPreview(null);
      } else {
        // Optionally navigate back after editing
        navigate("/");
      }

      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEdit ? "Edit Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg bg-white"
            />
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-3 w-32 h-32 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : isEdit
              ? "Update Product"
              : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}