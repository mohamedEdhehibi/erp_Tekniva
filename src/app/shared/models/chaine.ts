

export interface Chaine {
  
    id?: number
    designation: string,
    code: number,
    barCode: number,
    type: string,
    qualityGoal: string,
    performanceGoal: string,
    availabilityDate?: string,
     createdBy?: number,
    isActive?: boolean,
    createdAt?: string,
    updatedAt?:string,
    groupeChaine: number ,
    chaine_machine: [],
    employee_chaine:[]
    workshop: number,
    posteCle: number
      
}
