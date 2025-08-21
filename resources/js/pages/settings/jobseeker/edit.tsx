import type { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import HeadingSmall from '@/components/heading-small';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Настройки резюме (CV)',
        href: '/settings/jobseeker/edit',
    },
];
export default function Edit(){
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={breadcrumbs[0].title} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Информация о резюме"
                        description="Редактируйте ваше резюме"
                    />
                </div>
            </SettingsLayout>
        </AppLayout>
    )
}
