import { Review } from "./review";

export interface ProductDetails{
    id:number,
    name: string,
    description: string,
    category: string,
    price: number,
    currency: string,
    image: string,
    slug:string,
    fullDescription: string,
    reviews: Array<Review>
}