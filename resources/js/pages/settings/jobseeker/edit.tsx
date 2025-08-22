import type { BreadcrumbItem, SharedData } from '@/types';
import { JobSeekerProfile } from '@/types/jobseeker';
import AppLayout from '@/layouts/app-layout';
import { Form, Head, useForm, usePage } from '@inertiajs/react';
import HeadingSmall from '@/components/heading-small';
import SettingsLayout from '@/layouts/settings/layout';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Award, ChevronDownIcon, Edit, Eye, Plus, Save, UserIcon, UserRound } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';


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


    function submit(e: FormEvent) {
        e.preventDefault();
        patch(route('profile.update'), {
            onSuccess: () => toast.success("Резюме успешно обновлён"),
            preserveScroll: true,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={breadcrumbs[0].title} />

            <SettingsLayout size={'3xl'}>
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
                        <div>
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
                                                <Input
                                                    disabled={!isEditing}
                                                    placeholder="Имя"
                                                />
                                            </div>
                                            <div>
                                                <Label>Фамилия</Label>
                                                <Input
                                                    disabled={!isEditing}
                                                    placeholder="Фамилия"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <Label>Отчество</Label>
                                                <Input
                                                    disabled={!isEditing}
                                                    placeholder="Отчество"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-4 md:flex-row md:gap-6 w-full">
                                                {/* Дата рождения */}
                                                <div className="w-full">
                                                    <Label htmlFor="date">Дата рождения</Label>
                                                    <Popover open={open} onOpenChange={setOpen}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                id="date"
                                                                disabled={!isEditing}
                                                                className={cn(
                                                                    "w-full justify-between font-normal",
                                                                    !date && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {date ? date.toLocaleDateString() : "Выбрать дату"}
                                                                <ChevronDownIcon />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-full overflow-hidden p-0"
                                                                        align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={date}
                                                                captionLayout="dropdown"
                                                                fromYear={1950}
                                                                toYear={new Date().getFullYear() - 18}
                                                                onSelect={(d) => {
                                                                    setDate(d)
                                                                    setOpen(false)
                                                                }}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>

                                                {/* Пол */}
                                                <div className="w-full">
                                                    <Label htmlFor="gender">Пол</Label>
                                                    <Select
                                                        disabled={!isEditing}
                                                        value={gender}
                                                        onValueChange={setGender}
                                                    >
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
                                        <div>
                                            <Label>Специальность/Степень</Label>
                                            <Input
                                                disabled={!isEditing}
                                                placeholder="Специальность или степень"
                                            />
                                        </div>
                                        <div>
                                            <Label>Описание</Label>
                                            <Textarea
                                                disabled={!isEditing}
                                                placeholder="Дополнительная информация об образовании"
                                                rows={2}
                                            />
                                        </div>

                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </>
                </Form>
            </SettingsLayout>
        </AppLayout>
    );
}
