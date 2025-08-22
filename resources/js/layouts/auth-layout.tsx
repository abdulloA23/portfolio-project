import AuthSplitCardLayout from '@/layouts/auth/auth-split-card-layout';
import AuthCardLayout from '@/layouts/auth/auth-card-layout';
import AuthSimpleLayout from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <AuthSimpleLayout  title={title} description={description} {...props}>
            {children}
        </AuthSimpleLayout>
    );
}
