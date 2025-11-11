import { getProductById } from "@/lib/getProducts";

type ProductDetailsPageProps = {
  params: {
    productId: string;
  };
};

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {

  const { productId } = await params;

  const product = await getProductById(productId);

  if (!product) {
    return (
      <div className="container py-20 text-center h-screen">
        <p className="text-gray-500 text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="container py-10 h-screen">
      <h1 className="text-3xl font-semibold mb-4">{product?.name}</h1>
      <p className="text-lg text-gray-600 mb-2">{product?.description}</p>
      <p className="text-xl font-bold text-green-600">₦{product?.price}</p>
    </div>
  );
}
