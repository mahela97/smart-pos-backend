import ProductObjectModel from "./productObjectModel";

interface OrderModel{
    variantId:ProductObjectModel[];
    shopId:string;
    salespersonId:string;
    timestamp:string;
    totalPrice:number;
    archived:boolean;
    isPaid:boolean;
    receivedPrice:number;
}

export default OrderModel;