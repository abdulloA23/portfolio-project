export interface Employer {
    id:number,
    type:"individual"|"company",
    company_name?:string,
    company_address?:string,
    company_website?:string,
    description?:string,
    contact_email?:string,
    contact_phone?:string,
}
