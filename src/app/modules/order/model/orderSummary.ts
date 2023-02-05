import { Payment } from "./payment";

export interface OrderSummary{
    id:number,
    placeDate: Date,
    status: string,
    grossValue: number,
    payment: Payment
}