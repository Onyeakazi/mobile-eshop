import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      if (!Array.isArray(data)) return setProducts([]);
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" });
      const result = await res.json();

      if (res.ok) {
        // Remove the product from the state immediately
        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
        alert(result.message || "Product deleted successfully!");
      } else {
        alert(result.error || "Error deleting product");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Error deleting product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <Link
            to="/add"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Add Product
          </Link>
        </div>

        {/* Product Grid */}
        {loading ? (
          <p className="text-gray-500 text-center mt-10">Loading products...</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow p-4 flex flex-col">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 mb-2">${Number(product.price).toLocaleString()}</p>
                <p className="text-gray-500 text-sm mb-3">{product.category}</p>
                <div className="flex gap-2 mt-auto">
                  <Link
                    to={`/edit/${product.id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">No products available</p>
        )}
      </div>
    </div>
  );
}