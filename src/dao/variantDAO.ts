import VariantModel from "../models/variantModel";
import Variant, { VariantDocument } from "../schemaModels/variant.model";
import Dao from "../interfaces/dao";

export default class VariantDAO extends Dao {
    constructor() {
        super(Variant);
    }

    public async add(VariantData: VariantModel): Promise<VariantDocument> {
        return super.add(VariantData);
    }
}