export interface Order{
    id? :string
    designation: string,
    client: number,
    saleConditions: number,
    orderCategory: number,
    paymentMethod: number,
    deliveryAddress: [],
    billingAddress: [],
    createdAt?:string,
    updatedAt?:string,
}