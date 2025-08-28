import type { BreadcrumbItem, SharedData } from '@/types';
import { Addition, JobSeekerProfile } from '@/types/jobseeker';
import AppLayout from '@/layouts/app-layout';
import { Form, Head, useForm, usePage } from '@inertiajs/react';
import HeadingSmall from '@/components/heading-small';
import SettingsLayout from '@/layouts/settings/layout';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Award, AwardIcon, Briefcase,
    ChevronDownIcon, CircleCheckIcon,
    Edit,
    Eye, FileText, FolderKanban,
    GraduationCap,
    Languages, Link2Icon, Linkedin, MoreHorizontal,
    Plus,
    Save, Trash,
    Trash2,
    UserIcon,
    UserRound
} from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Link1Icon, LinkBreak1Icon } from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Настройки резюме (CV)',
        href: '/settings/jobseeker/edit',
    },
];



interface Props {
    profile: JobSeekerProfile;
    message?:string,
    type?:"success"|'info'|'error'
}

export default function EditPage({ profile,message,type }: Props) {
    const { auth } = usePage<SharedData>().props
    const [isEditing, setIsEditing] = useState(false)
    const { data, setData, patch, processing, errors } = useForm<JobSeekerProfile>(profile);
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [gender, setGender] = useState<string>("") // "" | "male" | "female"
    const [url, setUrl] = useState("");


    function submit(e: FormEvent) {
        e.preventDefault();

        // Validate required fields
        if (!data.first_name || !data.last_name) {
            toast.error("Пожалуйста, заполните обязательные поля");
            return;
        }

        patch(route('profile.update'), {
            onSuccess: () => {
                toast.success("Резюме успешно обновлён");
                setIsEditing(false);
            },
            onError: (errors) => {
                toast.error("Произошла ошибка при сохранении");
                console.error(errors);
            },
            preserveScroll: true,
        });
    }

    const [cvData, setCvData] = useState({
        skills: ["React", "TypeScript", "Node.js", "Python", "PostgreSQL"],
        languages: [
            { language: "Русский", level: "Родной" },
            { language: "Английский", level: "B2 - Upper Intermediate" },
            { language: "Немецкий", level: "A2 - Elementary" },
        ],
        education: [
            {
                institution: "МГУ им. М.В. Ломоносова",
                degree: "Бакалавр прикладной математики и информатики",
                year: "2008-2012",
                description: "Специализация: Программная инженерия и базы данных",
            },
            {
                institution: "Яндекс.Практикум",
                degree: "Веб-разработчик",
                year: "2018",
                description: "Интенсивный курс по современным веб-технологиям",
            },
        ],
        experience: [
            {
                company: "ТехКорп",
                position: "Senior Frontend Developer",
                duration: "2020 - настоящее время",
                description:
                    "Разработка и поддержка крупных веб-приложений на React. Руководство командой из 4 разработчиков. Внедрение современных практик разработки и CI/CD процессов.",
                achievements: [
                    "Увеличил производительность приложения на 40%",
                    "Внедрил TypeScript в проект с 200k+ строк кода",
                    "Обучил 3 junior разработчиков",
                ],
            },
            {
                company: "СтартапXYZ",
                position: "Full Stack Developer",
                duration: "2018 - 2020",
                description:
                    "Разработка MVP продукта с нуля. Работа с React, Node.js, PostgreSQL. Настройка инфраструктуры на AWS.",
                achievements: [
                    "Создал архитектуру приложения с нуля",
                    "Привлек первых 1000 пользователей",
                    "Настроил автоматизированное тестирование",
                ],
            },
        ],
        projects: [
            {
                name: "E-commerce платформа",
                description: "Полнофункциональная платформа электронной коммерции с микросервисной архитектурой",
                technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
                link: "https://github.com/ivan/ecommerce",
                achievements: ["10k+ активных пользователей", "99.9% uptime", "Обработка 1M+ транзакций"],
            },
            {
                name: "Система управления задачами",
                description: "Корпоративная система для управления проектами и задачами команды",
                technologies: ["Vue.js", "Python", "Django", "PostgreSQL"],
                link: "https://github.com/ivan/task-manager",
                achievements: ["Используется в 5 компаниях", "Сокращение времени планирования на 30%"],
            },
        ],
        certifications: [
            {
                name: "AWS Certified Solutions Architect",
                issuer: "Amazon Web Services",
                date: "2023",
                link: "https://aws.amazon.com/certification/",
            },
            {
                name: "React Developer Certification",
                issuer: "Meta",
                date: "2022",
                link: "https://developers.facebook.com/",
            },
        ],
    })

    const addSkill = () => {
        setCvData({ ...cvData, skills: [...cvData.skills, ""] })
    }

    const addLanguage = () => {
        setCvData({ ...cvData, languages: [...cvData.languages, { language: "", level: "" }] })
    }

    const addEducation = () => {
        setCvData({
            ...cvData,
            education: [...cvData.education, { institution: "", degree: "", year: "", description: "" }],
        })
    }

    const addExperience = () => {
        setCvData({
            ...cvData,
            experience: [
                ...cvData.experience,
                { company: "", position: "", duration: "", description: "", achievements: [] },
            ],
        })
    }
    const removeSkill = (index: number) => {
        setCvData({ ...cvData, skills: cvData.skills.filter((_, i) => i !== index) })
    }

    const removeLanguage = (index: number) => {
        setCvData({ ...cvData, languages: cvData.languages.filter((_, i) => i !== index) })
    }

    const removeEducation = (index: number) => {
        if (window.confirm("Вы уверены, что хотите удалить?")) {
            setCvData({ ...cvData, education: cvData.education.filter((_, i) => i !== index) })
        }
    }

    const removeExperience = (index: number) => {
        if (window.confirm("Вы уверены, что хотите удалить?")) {
            setCvData({ ...cvData, experience: cvData.experience.filter((_, i) => i !== index) })
        }
    }

    // const addProject = () => {
    //     setCvData({
    //         ...cvData,
    //         projects: [...cvData.projects, { name: "", description: "", technologies: [], link: "", achievements: [] }],
    //     })
    // }
    //
    // const addCertification = () => {
    //     setCvData({
    //         ...cvData,
    //         certifications: [...cvData.certifications, { name: "", issuer: "", date: "", link: "" }],
    //     })
    // }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={breadcrumbs[0].title} />

            <SettingsLayout size={'full'}>
                <Form onSubmit={submit} className="space-y-6">
                    <>
                        <div className="flex items-center justify-between">
                            <HeadingSmall title="Информация о резюме" description="Редактируйте ваше резюме" />
                            <div className="flex gap-3">
                                <Button type="button" variant="outline">
                                    <Eye className={'mr-2 h-4 w-4'} />
                                    Предпросмотр
                                </Button>
                                <Button onClick={() => setIsEditing((p) => !p)} variant={isEditing ? 'default' : 'outline'} type="button">
                                    {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                                    {isEditing ? 'Сохранить' : 'Редактировать'}
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2">
                                            <UserIcon className="h-5 w-5" />
                                            Личная информация
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <Label>Имя</Label>
                                                <Input disabled={!isEditing} placeholder="Имя" />
                                            </div>
                                            <div>
                                                <Label>Фамилия</Label>
                                                <Input disabled={!isEditing} placeholder="Фамилия" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <Label>Отчество</Label>
                                                <Input disabled={!isEditing} placeholder="Отчество" />
                                            </div>
                                            <div className="flex w-full flex-col gap-4 md:flex-row md:gap-6">
                                                {/* Дата рождения */}
                                                <div className="w-full">
                                                    <Label htmlFor="date">Дата рождения</Label>
                                                    <Popover open={open} onOpenChange={setOpen}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                id="date"
                                                                disabled={!isEditing}
                                                                className={cn('w-full justify-between font-normal', !date && 'text-muted-foreground')}
                                                            >
                                                                {date ? date.toLocaleDateString() : 'Выбрать дату'}
                                                                <ChevronDownIcon />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-full overflow-hidden p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={date}
                                                                captionLayout="dropdown"
                                                                fromYear={1950}
                                                                toYear={new Date().getFullYear() - 18}
                                                                onSelect={(d) => {
                                                                    setDate(d);
                                                                    setOpen(false);
                                                                }}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>

                                                {/* Пол */}
                                                <div className="w-full">
                                                    <Label htmlFor="gender">Пол</Label>
                                                    <Select disabled={!isEditing} value={gender} onValueChange={setGender}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Выберите пол" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="male">Мужской</SelectItem>
                                                            <SelectItem value="female">Женский</SelectItem>
                                                            <SelectItem value="other">Другой</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <Label>Локация</Label>
                                                <Input disabled={!isEditing} placeholder="Локация" />
                                            </div>
                                            <div>
                                                <Label>Адрес</Label>
                                                <Input disabled={!isEditing} placeholder="Адрес" />
                                            </div>
                                        </div>
                                        <div>
                                            <Label>Описание</Label>
                                            <Textarea disabled={!isEditing} placeholder="Дополнительная информация об образовании" rows={2} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Skills */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2">
                                            <Award className="h-5 w-5" />
                                            Навыки
                                        </CardTitle>
                                        {isEditing && (
                                            <Button onClick={addSkill} type="button" size="sm" variant="outline">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Добавить навык
                                            </Button>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {cvData.skills.map((skill, index) => (
                                            <div key={index} className="flex items-center">
                                                {isEditing ? (
                                                    <>
                                                        <Input
                                                            value={skill}
                                                            onChange={(e) => {
                                                                const newSkills = [...cvData.skills];
                                                                newSkills[index] = e.target.value;
                                                                setCvData({ ...cvData, skills: newSkills });
                                                            }}
                                                            className="w-32"
                                                            placeholder="Навык"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className=" "
                                                            onClick={() => removeSkill(index)}
                                                        >
                                                            <Trash className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <Badge variant="secondary" className="px-3 py-1 text-sm">
                                                        {skill}
                                                    </Badge>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Languages */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2">
                                            <Languages className="h-5 w-5" />
                                            Языки
                                        </CardTitle>
                                        {isEditing && (
                                            <Button type="button" onClick={addLanguage} size="sm" variant="outline">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Добавить язык
                                            </Button>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {cvData.languages.map((lang, index) => (
                                        <>
                                            <div className="relative grid grid-cols-12 items-start">
                                                <div
                                                    key={index}
                                                    className={`mx-auto grid w-full grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-2 ${isEditing ? 'col-span-11 max-w-full sm:max-w-2xl lg:max-w-4xl' : 'col-span-12'}`}
                                                >
                                                    <div>
                                                        <Label>Язык</Label>
                                                        <Input
                                                            value={lang.language}
                                                            onChange={(e) => {
                                                                const newLanguages = [...cvData.languages];
                                                                newLanguages[index].language = e.target.value;
                                                                setCvData({ ...cvData, languages: newLanguages });
                                                            }}
                                                            disabled={!isEditing}
                                                            placeholder="Название языка"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Уровень</Label>
                                                        <Input
                                                            value={lang.level}
                                                            onChange={(e) => {
                                                                const newLanguages = [...cvData.languages];
                                                                newLanguages[index].level = e.target.value;
                                                                setCvData({ ...cvData, languages: newLanguages });
                                                            }}
                                                            disabled={!isEditing}
                                                            placeholder="Уровень владения"
                                                        />
                                                    </div>
                                                </div>

                                                {isEditing && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute top-2 right-2 col-span-1 p-1"
                                                        onClick={() => removeLanguage(index)}
                                                    >
                                                        <Trash className="h-3 w-3 text-red-500" />
                                                    </Button>
                                                )}
                                            </div>
                                        </>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Education */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2">
                                            <GraduationCap className="h-5 w-5" />
                                            Образование
                                        </CardTitle>
                                        {isEditing && (
                                            <Button type="button" onClick={addEducation} size="sm" variant="outline">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Добавить образование
                                            </Button>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {cvData.education.map((edu, index) => (
                                        <div key={index} className="space-y-4 rounded-lg border p-4">
                                            {isEditing && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute top-2 right-2"
                                                    onClick={() => removeEducation(index)}
                                                >
                                                    <Trash className="h-4 w-4 text-red-500" />
                                                </Button>
                                            )}
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                    <Label>Учебное заведение</Label>
                                                    <Input
                                                        value={edu.institution}
                                                        onChange={(e) => {
                                                            const newEducation = [...cvData.education];
                                                            newEducation[index].institution = e.target.value;
                                                            setCvData({ ...cvData, education: newEducation });
                                                        }}
                                                        disabled={!isEditing}
                                                        placeholder="Название учебного заведения"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Период обучения</Label>
                                                    <Input
                                                        value={edu.year}
                                                        onChange={(e) => {
                                                            const newEducation = [...cvData.education];
                                                            newEducation[index].year = e.target.value;
                                                            setCvData({ ...cvData, education: newEducation });
                                                        }}
                                                        disabled={!isEditing}
                                                        placeholder="2018-2022"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Label>Специальность/Степень</Label>
                                                <Input
                                                    value={edu.degree}
                                                    onChange={(e) => {
                                                        const newEducation = [...cvData.education];
                                                        newEducation[index].degree = e.target.value;
                                                        setCvData({ ...cvData, education: newEducation });
                                                    }}
                                                    disabled={!isEditing}
                                                    placeholder="Специальность или степень"
                                                />
                                            </div>
                                            <div>
                                                <Label>Описание</Label>
                                                <Textarea
                                                    value={edu.description}
                                                    onChange={(e) => {
                                                        const newEducation = [...cvData.education];
                                                        newEducation[index].description = e.target.value;
                                                        setCvData({ ...cvData, education: newEducation });
                                                    }}
                                                    disabled={!isEditing}
                                                    placeholder="Дополнительная информация об образовании"
                                                    rows={2}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Work Experience */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2">
                                            <Briefcase className="h-5 w-5" />
                                            Опыт работы
                                        </CardTitle>
                                        {isEditing && (
                                            <Button type="button" onClick={addExperience} size="sm" variant="outline">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Добавить опыт
                                            </Button>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {cvData.experience.map((exp, index) => (
                                        <div key={index} className="space-y-4 rounded-lg border bg-muted/20 p-6">
                                            {isEditing && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute top-2 right-2"
                                                    onClick={() => removeExperience(index)}
                                                >
                                                    <Trash className="h-4 w-4 text-red-500" />
                                                </Button>
                                            )}
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                    <Label>Компания</Label>
                                                    <Input
                                                        value={exp.company}
                                                        onChange={(e) => {
                                                            const newExperience = [...cvData.experience];
                                                            newExperience[index].company = e.target.value;
                                                            setCvData({ ...cvData, experience: newExperience });
                                                        }}
                                                        disabled={!isEditing}
                                                        placeholder="Название компании"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Должность</Label>
                                                    <Input
                                                        value={exp.position}
                                                        onChange={(e) => {
                                                            const newExperience = [...cvData.experience];
                                                            newExperience[index].position = e.target.value;
                                                            setCvData({ ...cvData, experience: newExperience });
                                                        }}
                                                        disabled={!isEditing}
                                                        placeholder="Название должности"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Label>Период работы</Label>
                                                <Input
                                                    value={exp.duration}
                                                    onChange={(e) => {
                                                        const newExperience = [...cvData.experience];
                                                        newExperience[index].duration = e.target.value;
                                                        setCvData({ ...cvData, experience: newExperience });
                                                    }}
                                                    disabled={!isEditing}
                                                    placeholder="2020 - настоящее время"
                                                />
                                            </div>
                                            <div>
                                                <Label>Описание обязанностей</Label>
                                                <Textarea
                                                    value={exp.description}
                                                    onChange={(e) => {
                                                        const newExperience = [...cvData.experience];
                                                        newExperience[index].description = e.target.value;
                                                        setCvData({ ...cvData, experience: newExperience });
                                                    }}
                                                    disabled={!isEditing}
                                                    placeholder="Опишите ваши обязанности и достижения..."
                                                    rows={4}
                                                />
                                            </div>
                                            {!isEditing && exp.achievements && exp.achievements.length > 0 && (
                                                <div>
                                                    <Label>Ключевые достижения</Label>
                                                    <ul className="mt-2 list-inside list-disc space-y-1">
                                                        {exp.achievements.map((achievement, achIndex) => (
                                                            <li key={achIndex} className="text-sm text-muted-foreground">
                                                                {achievement}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2">
                                            <Link1Icon className="h-5 w-5" />
                                            Ссылки
                                        </CardTitle>
                                        {isEditing && (
                                            <Button size="sm" variant="outline">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Добавить ссылку
                                            </Button>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="rounded-lg border p-4">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 md:col-span-3">
                                                <Label className="">Тип ссылки</Label>
                                                <Select disabled={!isEditing}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Выберите тип ссылки" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Типы</SelectLabel>
                                                            <SelectItem value="github">Github</SelectItem>
                                                            <SelectItem value="instagram">Instagram</SelectItem>
                                                            <SelectItem value="facebook">Facebook</SelectItem>
                                                            <SelectItem value="x">X</SelectItem>
                                                            <SelectItem value="linkedin">Linkedin</SelectItem>
                                                            <SelectItem value="email">Email</SelectItem>
                                                            <SelectItem value="phone">Номер</SelectItem>
                                                            <SelectItem value="other">Другое</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="col-span-12 md:col-span-9">
                                                <Label>Ссылка</Label>
                                                <Input
                                                    value={url}
                                                    onChange={(e) => setUrl(e.target.value)}
                                                    disabled={!isEditing}
                                                    placeholder="URL ссылки"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/*                            <div className="flex items-center justify-between">*/}
                            {/*                                <span className="text-xl font-medium">*/}
                            {/*                                    Дополнительно*/}
                            {/*                                </span>*/}
                            {/*                                {isEditing && (*/}
                            {/*                                    <Button*/}
                            {/*    size="sm"*/}
                            {/*    variant="outline"*/}
                            {/*    onClick={() => {*/}
                            {/*        const newAdd = {*/}
                            {/*            id: (data.additions?.length || 0) + 1,*/}
                            {/*            title: 'Новое достижение',*/}
                            {/*            description: '',*/}
                            {/*            addition_category_id: 1,*/}
                            {/*            sort_order: (data.additions?.length || 0) + 1*/}
                            {/*        };*/}
                            {/*        setData('additions', [...(data.additions || []), newAdd]);*/}

                            {/*        toast.success("Дополнение добавлено");*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    <Plus className="mr-2 h-4 w-4" />*/}
                            {/*    Добавить*/}
                            {/*</Button>*/}
                            {/*                                )}*/}
                            {/*                            </div>*/}

                            {data.additions?.map((a, index) => {
                                return (
                                    <Card key={a.id}>
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="flex items-center gap-2">
                                                    <Award className="h-5 w-5" />
                                                    {a.title}
                                                </CardTitle>
                                                {isEditing && (
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => {
                                                                const newAdditions = [...data.additions];
                                                                newAdditions.splice(index, 1);
                                                                setData('additions', newAdditions);
                                                                toast.success('Дополнение удалено');
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => {
                                                                // Implement edit logic
                                                            }}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="space-y-2">
                                                <h4 className="font-medium">{a.title}</h4>
                                                <p className="text-sm text-muted-foreground">{a.description}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </>
                </Form>
            </SettingsLayout>
        </AppLayout>
    );
}
