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
      console.log('Error Message: ' + error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Product</h2>

      {/* --- Basic Info --- */}
      <fieldset className="mb-6">
        <legend className="text-lg font-medium mb-2 text-gray-700">Basic Information</legend>
        <label>
          <span className="sr-only">Product name</span>
          <input
            name="name"
            placeholder="Product name"
            value={product.name}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
          />
        </label>

        <label>
          <span className="sr-only">Description</span>
          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
          />
        </label>

        <label>
          <span className="sr-only">Category</span>
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
        </label>

        <label>
          <span className="sr-only">Tags (comma separated)</span>
          <input
            name="tags"
            placeholder="Tags (comma separated)"
            value={product.tags}
            onChange={handleChange}
            className="border p-2 w-full mb-3 rounded"
          />
        </label>
      </fieldset>

      {/* --- Pricing --- */}
      <fieldset className="mb-6">
        <legend className="text-lg font-medium mb-2 text-gray-700">Pricing</legend>
        <div className="grid grid-cols-2 gap-3">
          <label>
            <span className="sr-only">Price</span>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </label>
          <label>
            <span className="sr-only">Discount (%)</span>
            <input
              type="number"
              name="discount"
              placeholder="Discount (%)"
              value={product.discount}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </label>
          <label>
            <span className="sr-only">Tax</span>
            <input
              type="number"
              name="tax"
              placeholder="Tax"
              value={product.tax}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </label>
        </div>
      </fieldset>

      {/* --- Inventory --- */}
      <fieldset className="mb-6">
        <legend className="text-lg font-medium mb-2 text-gray-700">Inventory</legend>
        <div className="grid grid-cols-2 gap-3">
          <label>
            <span className="sr-only">Units in stock</span>
            <input
              type="number"
              name="unit"
              placeholder="Units in stock"
              value={product.unit}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </label>
          <label>
            <span className="sr-only">Availability</span>
            <select
              name="availability"
              value={product.availability}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="in stock">In Stock</option>
              <option value="out of stock">Out of Stock</option>
            </select>
          </label>
        </div>
      </fieldset>

      {/* --- Ratings --- */}
      <fieldset className="mb-6">
        <legend className="text-lg font-medium mb-2 text-gray-700">Ratings</legend>
        <label>
          <span className="sr-only">Rating (0 - 5)</span>
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
        </label>
      </fieldset>

      {/* --- Shipping --- */}
      <fieldset className="mb-6">
        <legend className="text-lg font-medium mb-2 text-gray-700">Shipping Info</legend>
        <label>
          <span className="sr-only">Shipping details</span>
          <textarea
            name="shippingInfo"
            placeholder="Shipping details..."
            value={product.shippingInfo}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </label>
      </fieldset>

      {/* --- Images --- */}
      <fieldset className="mb-6">
        <legend className="text-lg font-medium mb-2 text-gray-700">Images</legend>
        <label>
          <span className="sr-only">Product images</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="border p-2 w-full rounded"
          />
        </label>
      </fieldset>

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