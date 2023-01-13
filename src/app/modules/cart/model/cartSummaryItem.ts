import { CartProduct } from "./cartProduct";

export interface CartSummaryItem{
    id:number;
    quantity:number,
    product: CartProduct,
    lineValue:number
}