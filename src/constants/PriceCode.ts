export const PriceCode = {
  REGULAR: "REGULAR",
  NEW_RELEASE: "NEW_RELEASE",
  CHILDREN: "CHILDREN",
} as const;

export type PriceCode = (typeof PriceCode)[keyof typeof PriceCode];
