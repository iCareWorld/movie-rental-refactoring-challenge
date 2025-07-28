export class PriceCode {
    readonly type: PriceCodeType;
    
    constructor(type: PriceCodeType) {
        this.type = type;
    }

    get name(): string {
        switch (this.type) {
            case PriceCodeType.Regular:
                return 'REGULAR';
            case PriceCodeType.NewRelease:
                return 'NEW RELEASE';
            case PriceCodeType.Children:
                return 'CHILDREN';
        }
    }
}

export enum PriceCodeType {
    Regular,
    NewRelease,
    Children
}
