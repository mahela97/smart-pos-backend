import ProductObjectModel from "./productObjectModel";

interface OrderModel{
    products:ProductObjectModel[];
    shop:string;
    salesperson:string;
    timestamp:string;
    totalPrice:number;
    archived:boolean;
    receivedPrice:number;
}

export default OrderModel;