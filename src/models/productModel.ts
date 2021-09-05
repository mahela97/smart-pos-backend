interface  ProductModel {
    pid?: string;
    name: string;
    categoryId: string;
    variant1: string;
    variant2: string;
    variant1Option: string[];
    variant2Option: string[];
    description: string;
    photo: string;
    archived: boolean;

}

export default ProductModel;