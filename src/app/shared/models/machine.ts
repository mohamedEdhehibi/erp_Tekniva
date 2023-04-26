import { FamilleMachine } from "./familleMachine";

export interface Machine {
    id?:string,           
    designation: string,
    code?: string,
    barcode?: number,
    nSerie?:number,
    purchaseDate?:string,
    price?:number,
    supplier?:string,
    photo?:string,
    createdBy?:string,
    createAt?:string,
    isActive?:string,
    updateAt?:string,
    machineFamily?: string,
  chaine_machine?:number[]
  machine_type: number[]
  purchaseState?:string,
  
}