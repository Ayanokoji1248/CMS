export interface DepartmentProps {
    id:string,
    name:string,
    code:string,
    is_active:boolean
}

export interface SubjectProps{
    id:string,
    name:string,
    code:string,
    credits:number,
    department:DepartmentProps,
    is_active:boolean
}