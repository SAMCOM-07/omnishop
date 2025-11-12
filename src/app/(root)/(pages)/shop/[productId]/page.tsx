import ProductDetailsImages from "@/components/ProductDetailsImages";
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
    <div className="container py-10 ">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <ProductDetailsImages productImages={product.images} />
        <div className="mt-6 md:mt-0">
          <h1 className="text font-bold mb-4">{product.name}</h1>
          <p className="text-neutral-4 mb-6">{product.description}</p>
          <span className='font-bold'>{product.discount ? '$' + product.discountedAmount : '$' + product.price}</span>
          <span className='ml-4 line-through text-neutral-4'>{product.discount ? `$${product.price}` : ''}</span>
        </div>
      </section>
    </div>
  );
}
