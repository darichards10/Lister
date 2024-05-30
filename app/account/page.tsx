'use client'
import { useUser } from '@auth0/nextjs-auth0/client';

export default function AccountPage() {
    const { user, error, isLoading } = useUser();

    if (isLoading) {
        return <div></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-2xl pb-6">Account Page</h1>
            {user ? (
                <div className="space-y-6">
                    <img src={user.picture || ''} alt="" />
                    <p>Welcome, {user.name}!</p>
                    <p>Nickname: {user.nickname}</p>
                </div>
                
            ) : (
                <p>Please log in to view your account.</p>
            )}
        </div>
    );
}
