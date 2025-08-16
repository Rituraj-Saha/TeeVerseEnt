import { useSelector } from "react-redux";
import type { Route } from "./+types/home";
import ClientOnlyRender from "utils/ClientOnlyRender";
import { ToastProvider } from "utils/ToastProvider";


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Orders" },
        { name: "description", content: "Welcome to React orders!" },
    ];
}
interface Address {
    id: number;
    line: string;
    pin: string;
    landmaerk: string;
    receiverPhone: string;
    default: boolean; //  The property 'default' is a reserved keyword in some contexts, so using an alternative name like 'isDefault' or enclosing it in quotes (e.g., 'default': boolean) may be necessary.
}

interface Item {
    id: number;
    productName: string;
    gender: string;
    ageGroup: string;
    price: number;
    discount: number;
    maxStock: number;
    selectedSize: string;
    sellingPrice: number;
    thubnailImage: string;
    description: string;
}

interface OrderDetails {
    address: Address;
    items: Item[]; // This represents an array of 'Item' objects.
    totalAmount: number
    totalItems: number

}
interface OrderItemsProps {
    orderDetails: OrderDetails[]; // This indicates that 'orderDetails' is a property of the props object
}

const OrderItems = (props: OrderItemsProps) => { // Correctly destructure 'orderDetails'
    const { orderDetails } = props
    return (
        <div> {/* It's a good practice to wrap the mapped items in a parent element like a div */}
            {orderDetails.map((orderDetail, idx) => ( // Use 'orderDetail' to represent each item in the array
                // <div key={orderDetail.address.id}> {/* Assuming 'id' in address is unique for each order */}
                //     <h3>Order #{orderDetail.address.id}</h3>
                //     <p>Address: {orderDetail.address.line}, {orderDetail.address.pin}</p>
                //     <h4>Items:</h4>
                //     <ul>
                //         {orderDetail.items.map((item) => (
                //             <li key={item.id}> {/* Each item within an order also needs a unique key */}
                //                 <p>Product: {item.productName}</p>
                //                 <p>Price: ${item.sellingPrice} (Discount: {item.discount}%)</p>
                //                 {/* Add more item details as needed */}
                //             </li>
                //         ))}
                //     </ul>
                // </div>
                <div key={idx} style={{ display: "flex", flexDirection: "column", border: "1px solid black" }}>
                    <h3>Order #{orderDetail.address.id}</h3>
                    <p>Address: {orderDetail.address.line}, {orderDetail.address.pin}</p>
                    <p>Total Amount: {orderDetail.totalAmount}</p>
                    <p>Receiver phone: {orderDetail.address.receiverPhone}</p>
                </div>
            ))}
        </div>
    );
};
export default function orders() {
    const orderItems = useSelector((state: any) => state.orders.orders)
    console.log("orderItems: ", orderItems)
    return <ClientOnlyRender> <OrderItems orderDetails={orderItems} /> <ToastProvider /></ClientOnlyRender>
    // <App />
}
