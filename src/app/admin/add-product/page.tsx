"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addProductAction } from "@/app/actions/addProducts";

export default function AddProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  // ✅ single state for all product fields
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    discount: "",
    tax: "",
    unit: "",
    tags: "",
    shippingInfo: "",
    availability: "in stock",
    rating: 0,
  });

  // handle text and number input changes dynamically
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async () => {
  const { name, price } = product;
  if (!name || !price || files.length === 0) {
    alert("Please fill required fields and add at least one image.");
    return;
  }

  setLoading(true);
  const productId = Date.now().toString();

  const formData = new FormData();
  files.forEach((f) => formData.append("files", f));
  formData.append("productId", productId);

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (data?.images?.length) {
      const newProduct = {
        ...product,
        price: Number(product.price).toFixed(2),
        discount: Number(product.discount) || 0,
        discountedAmount: (
          Number(price) - (Number(product.discount) * Number(price)) / 100
        ).toFixed(2),
        tax: Number(product.tax) || 0,
        unit: Number(product.unit) || 1,
        rating: Number(product.rating) || 0,
        tags: product.tags
          ? product.tags.split(",").map((t) => t.trim().toLowerCase())
          : [],
        images: data.images ?? [],
        reviews: [],
      };

      // ✅ Call server action
      const result = await addProductAction(newProduct);

      if (result.success) {
        alert("✅ Product added successfully!");
        setProduct({
          name: "",
          description: "",
          category: "",
          price: "",
          discount: "",
          tax: "",
          unit: "",
          tags: "",
          shippingInfo: "",
          availability: "in stock",
          rating: 0,
        });
        setFiles([]);
        router.push("/admin");
      } else {
        alert(result.error);
      }
    }
  } catch (error) {
    console.error(error);
    alert("Failed to upload product.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Product</h2>

      {/* --- Basic Info --- */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-gray-700">Basic Information</h3>
        <input
          name="name"
          placeholder="Product name"
          value={product.name}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        >
          <option value="">Select category</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="groceries">Groceries</option>
          <option value="accessories">Accessories</option>
          <option value="others">Others</option>
        </select>

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={product.tags}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />
      </div>

      {/* --- Pricing --- */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-gray-700">Pricing</h3>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount (%)"
            value={product.discount}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            type="number"
            name="tax"
            placeholder="Tax"
            value={product.tax}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
      </div>

      {/* --- Inventory --- */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-gray-700">Inventory</h3>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            name="unit"
            placeholder="Units in stock"
            value={product.unit}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <select
            name="availability"
            value={product.availability}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="in stock">In Stock</option>
            <option value="out of stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* --- Ratings --- */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-gray-700">Ratings</h3>
        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          name="rating"
          placeholder="Rating (0 - 5)"
          value={product.rating}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      {/* --- Shipping --- */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-gray-700">Shipping Info</h3>
        <textarea
          name="shippingInfo"
          placeholder="Shipping details..."
          value={product.shippingInfo}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      {/* --- Images --- */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-gray-700">Images</h3>
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
          className="border p-2 w-full rounded"
        />
      </div>

      {/* --- Submit --- */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded font-medium"
      >
        {loading ? "Uploading..." : "Add Product"}
      </button>
    </div>
  );
}