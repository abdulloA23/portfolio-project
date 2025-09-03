import {
    DotSquareIcon, Facebook,
    FacebookIcon, Github,
    GithubIcon, Instagram,
    InstagramIcon,
    Linkedin,
    LinkedinIcon,
    LucideIcon, Mail,
    MailIcon, SquareDot,
    TwitchIcon, Twitter
} from 'lucide-react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

export interface ILanguageProficiency{
    id:number;
    title:string;
    level:string
}
export const languageProficiency = [
    {id:1,title:"Beginner - A1"},
    {id:2,title:"Elementary - B2"},
    {id:3,title:"Pre-Intermediate - B1"},
    {id:4,title:"Intermediate - B2"},
    {id:5,title:"Upper-Intermediate - C1"},
    {id:6,title:"Pro - C2"},
    {id:7,title:"Родной"},
]
const languages:Record<number, string> = {
    1:'Beginner - A1',
    2:'Elementary - B2',
    3:'Pre-Intermediate - B1',
    4:'Intermediate - B2',
    5:'Upper-Intermediate - C1',
    6:'Pro - C2',
    7:'Родной',

}
const categories:Record<number, string> = {
    1:'Резюме',
    2:'Сертификат',
    3:'Портфолио',
    4:'Диплом',
    5:'Проект',
    6:'Достижения',
}
export const additionCategory = [
    {id:1,value:'Резюме'},
    {id:2,value:'Сертификат'},
    {id:3,value:'Портфолио'},
    {id:4,value:'Диплом'},
    {id:5,value:'Проект'},
    {id:6,value:'Достижения'}
]

const linkIcons: Record<string, LucideIcon> = {
    github: Github,
    x: Twitter,
    instagram: Instagram,
    facebook: Facebook,
    linkedin: Linkedin,
    email: Mail,
}

export const getLinkIcon = (id:string):LucideIcon =>{
    return linkIcons[id!] || DotsHorizontalIcon
}

export const getCategoryName = (id: number): string => {
    return categories[id!] || 'Резюме';
};

export const getLanguageLevel = (id:number):string => {
    return languages[id!] || 'Родной'
}
