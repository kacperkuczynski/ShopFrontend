import { Payment } from "./payment";
import { Shipment } from "./shipment";

export interface InitData{
    shipment: Array<Shipment>,
    payment: Array<Payment>
}