interface ProductModel {
    vid?: string;
    productId?: string;
    unitPrice?: number;
    variantType?: string;
    photo?: string;
    archived: boolean;
}

export default ProductModel;