// app/product/[id]/page.jsx
import ProductInfoClient from "@/components/ProductInfo/ProductInfoClient";
import { fetchAllProductIds } from "@/lib/FetchProduct";

export async function generateStaticParams() {
  try {
    const products = await fetchAllProductIds();
    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [{ id: "default" }];
  }
}

const ProductPage = ({ params }) => {
  const { id } = params;
  return <ProductInfoClient productId={id} />;
};

export default ProductPage;
