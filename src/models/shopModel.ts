interface ShopModel {
    sid?: string;
    name?: string;
    location?: string;
    email: string[];
    telephone?: string;
    ownerName?: string;
    address?: string;
    archived: boolean;
}

export default ShopModel;