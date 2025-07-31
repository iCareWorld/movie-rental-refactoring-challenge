export class PriceCode {
    static readonly REGULAR = new PriceCode('REGULAR');
    static readonly CHILDREN = new PriceCode('CHILDREN');
    static readonly NEW_RELEASE = new PriceCode('NEW RELEASE');

    constructor(public readonly name: string) {}
}
