import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../redux/products/productApiSlice";

const Products = () => {
  const { data: products, isLoading, error } = useGetAllProductsQuery();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Products Page</h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products && products.length > 0 ? (
          products.map(product => (
            
              <li key={product._id} className="bg-white rounded-lg shadow-md ">
                <Link to={`/products/${product._id}`}>

                {product.imageLink && (
                  <img src={product.imageLink[0]} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
                )}
                <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-2">Price: ${product.price}</p>
                </div>
                
                </Link>
              </li>
            
          ))
        ) : (
          <li className="text-center text-gray-500">No products available</li>
        )}
      </ul>
    </div>
  );
};

export default Products;
