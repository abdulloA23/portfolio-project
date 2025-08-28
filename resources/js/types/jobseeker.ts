export type Gender = 'male' | 'female' | 'unspecified';

export interface JobSeekerProfile {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    middle_name?: string;
    birth_date?: string;
    gender: Gender;
    location: string;
    address: string;
    education: Education[];
    experiences: Experience[];
    skills: Skill[];
    languages: Language[];
    additions: Addition[];
    links: Link[];
}

export interface BaseItem {
    id: number;
    sort_order: number;
}

export interface Education extends BaseItem {
    institution: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date?: string;
    description?: string;
    is_current: boolean;
}

export interface Experience extends BaseItem {
    job_title: string;
    company_name: string;
    company_address: string;
    start_date: string;
    end_date?: string;
    description?: string;
    is_current: boolean;
}

export interface Skill extends BaseItem {
    name: string;
    sort_order: number;
}

export interface Language extends BaseItem {
    name: string;
    language_proficiency_id: number;
}

export type AdditionCategory = 'achievement' | 'project' | 'education' | 'portfolio';

export interface Addition extends BaseItem {
    category: AdditionCategory;
    title: string;
    description: string;
}

export interface Link extends BaseItem {
    url: string;
    type: string;
}
