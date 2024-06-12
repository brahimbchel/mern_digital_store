import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../redux/products/productApiSlice";
import { useAddOrderMutation } from "../redux/orders/ordersApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const OneProduct = () => {
    let params = useParams();
    const { data: product, isLoading, error } = useGetProductQuery(params.productId);
    const currentToken = useSelector(selectCurrentToken);

    // console.log(product);

    const [GlobalUserInfo, setGlobalUserInfo] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        if (currentToken) {
            const decodedToken = jwtDecode(currentToken);
            const { UserInfo } = decodedToken;
            setGlobalUserInfo(UserInfo);
        }
    }, [currentToken])
  

    const [addOrder] = useAddOrderMutation()

    const sendEmail = async (email, productName) => {
        const emailData = {
            to: email,
            subject: 'Order Confirmation',
            text: `Your order for ${productName} has been placed successfully!`
        };

        try {
            const response = await fetch('http://localhost:5000/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            if (!response.ok) {
                throw new Error('Failed to send email');
            }
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!GlobalUserInfo) {
            console.log('User info not available');
            return;
        }

        const orderData = {
            user: GlobalUserInfo.id,
            product: params.productId,
            totalPrice: product.price 
        };

        // console.log(orderData);

        try {
            await addOrder(orderData).unwrap();
            setOrderSuccess(true);
            console.log('Order added successfully');
            await sendEmail(GlobalUserInfo.email, product.name);
        } catch (e) {
            console.error('Failed to add order:', e);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
                {orderSuccess && (
                            <div className="m-4 p-4 text-green-700 bg-green-100 rounded">
                                Order placed successfully!
                            </div>
                )}
                <div className="flex flex-col md:flex-row">
                    {/* Left Side */}
                    <div className="md:w-1/2 p-6">
                        <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
                        <div className="relative pb-2/3 mb-4">
                            {product.imageLink && product.imageLink.length > 0 && (
                                <img
                                    className=" h-full w-full object-cover"
                                    src={product.imageLink[0]}
                                    alt={product.name}
                                />
                            )}
                        </div>
                        <p className="text-gray-700">{product.description}</p>
                    </div>
                    {/* Right Side */}
                    <div className="md:w-1/2 p-6 bg-gray-100 flex flex-col justify-between">
                        <div>
                            <p className="text-2xl font-bold text-gray-800 mb-4">Price: ${product.price}</p>
                            <p className="text-gray-700 mb-2">Seller: {product.user.username} ({product.user.email})</p>
                            <p className="text-gray-700 mb-2">Created At: {new Date(product.createdAt).toLocaleDateString()}</p>
                            <p className="text-gray-700 mb-4">Updated At: {new Date(product.updatedAt).toLocaleDateString()}</p>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Order Now
                        </button>

                        
                    </div>
                </div>
            </div>
        </div>
    );
        
};

export default OneProduct;
