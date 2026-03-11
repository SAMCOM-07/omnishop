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
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th scope="col" className="text-left p-3">#</th>
              <th scope="col" className="text-left p-3">Name</th>
              <th scope="col" className="text-left p-3">Price</th>
              <th scope="col" className="text-left p-3">Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr
                key={p.id}
                className="border p-3"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3">{p.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}