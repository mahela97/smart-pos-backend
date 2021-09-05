interface ProductModel {
    pid?: string;
    name?: string;
    categoryId?: string;
    variantId: string[];
    description?: string;
    photo?: string;
    archived: boolean;
}

export default ProductModel;