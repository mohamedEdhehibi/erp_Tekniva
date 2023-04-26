export interface Article {
  id?: number;
  designation: string;
  reference: string;
  subFamilyArticleId?: string;
  brandId?: number;
  sizeChartId?: number;
  articleParentId?: number;
  picture?: string;
  type: string;
  barCode?: string;
  complexityId?: string;
  categorieDecontrole?: string;
  AQLCritique?: string;
  AQLMajeur?: string;
  AQLMineur?: string;
  attachement?: string;
  gamme?: string;
  phase?: number;
  familyArticle?:string;
  code:string
  marque?:string
  temps?:string
  client?:string
 bar_code?:string,
 model?:any ,
 color?:number 
}
