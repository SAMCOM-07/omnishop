import { getAllProducts } from '@/lib/getProducts';
import { ProductType } from '@/types/types';
import Link from 'next/link';

export default async function AdminDashboard() {

  const products: ProductType[] = await getAllProducts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Panel</h1>
      <Link
        href={'/'}
        className="bg-black text-white px-4 py-2 rounded mr-4"
      >
        Go to Home
      </Link>
      <Link
        href="/admin/add-product"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Product
      </Link>

      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">All Products</h2>
        <div className="space-y-3">
          {products.map((p, index) => (
            <div
              key={p.id}
              className="border p-3 rounded flex items-center justify-between"
            >
              <span>{index + 1}</span>
              <span>{p.name}</span>
              <span>${p.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}