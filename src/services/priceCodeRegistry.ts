import { IPriceCode, PriceCodeType } from "../models/priceCodes/priceCode";

/**
 * Represents a registry for movie price codes.
 * It implements the Singleton pattern to ensure that there is only one instance
 * of the registry throughout the application.
 */
export class PriceCodeRegistry {

    private static _instance: PriceCodeRegistry;
    private _priceCodes = new Map<PriceCodeType, IPriceCode>();

    private constructor() { }

    /**
     * Gets the singleton instance of the PriceCodeRegistry.
     * If an instance does not exist, it will be created on the first call.
     * @returns {PriceCodeRegistry} The single instance of the PriceCodeRegistry.
     */
    static getInstance(): PriceCodeRegistry {
        if (!PriceCodeRegistry._instance) {
            PriceCodeRegistry._instance = new PriceCodeRegistry();
        }
        return PriceCodeRegistry._instance;
    }

    /**
     * It instantiates the provided class and stores it in the registry. 
     * If a price code of the same type is already registered, it will be overwritten.
     * @param {PriceCodeType} type The class of the price code to register.
     */
    register(type: PriceCodeType): void {
        if (this._priceCodes.has(type)) {
            console.warn(`Price code '${type.name}' is already registered. Overwriting.`);
        }
        this._priceCodes.set(type, new type());
    }

    /**
     * Retrieves a registered price code instance by its type.
     * @param {PriceCodeType} type The class of the price code to retrieve.
     * @returns {IPriceCode} The instance of the requested price code.
     * @throws {Error} Throws an error if the price code type has not been registered.
     * @example
     * try {
     *   const priceCode = registry.getPriceCode(NewReleasePriceCode);
     *   const charge = priceCode.getCharge(3); // Get charge for 3 days
     * } catch (e) {
     *   console.error(e.message);
     * }
     */
    getPriceCode(type: PriceCodeType): IPriceCode {
        const priceCode = this._priceCodes.get(type);
        if (!priceCode) {
            throw new Error(`Price code '${type.name}' is not registered.`);
        }
        return priceCode;
    }

    /**
     * Clears all registered price codes from the registry.
     * @returns {void}
     */
    clear(): void {
        this._priceCodes.clear();
    }
}