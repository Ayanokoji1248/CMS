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

export interface FacultyProps{
    id:string,
    full_name:string,
    email:string,
    department:DepartmentProps,
    designation:string,
    is_active:boolean
}

export interface StudentProps{
    id:string,
    full_name:string,
    email:string,
    enrollment_no:string,
    semester:number,
    is_active:boolean,
    department:DepartmentProps
}

export interface ClassProps{
    id:string,
    subject:SubjectProps,
    faculty:FacultyProps,
    academic_year:string,
    semester:number,
    is_active:boolean,
    capacity:number
}