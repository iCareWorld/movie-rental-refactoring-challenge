import { IPriceCode, PriceCodeType } from "../models/priceCodes/priceCode";


export class PriceCodeRegistry {

    private static _instance: PriceCodeRegistry;
    private _priceCodes = new Map<PriceCodeType, IPriceCode>();

    private constructor() { }

    static getInstance(): PriceCodeRegistry {
        if (!PriceCodeRegistry._instance) {
            PriceCodeRegistry._instance = new PriceCodeRegistry();
        }
        return PriceCodeRegistry._instance;
    }

    register(type: PriceCodeType): void {
        if (this._priceCodes.has(type)) {
            console.warn(`Price code '${type.name}' is already registered. Overwriting.`);
        }
        this._priceCodes.set(type, new type());
    }

    getPriceCode(type: PriceCodeType): IPriceCode {
        const priceCode = this._priceCodes.get(type);
        if (!priceCode) {
            throw new Error(`Price code '${type.name}' is not registered.`);
        }
        return priceCode;
    }

    clear(): void {
        this._priceCodes.clear();
    }
}