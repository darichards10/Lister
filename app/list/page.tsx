'use client'
import { useUser } from '@auth0/nextjs-auth0/client';

export default function List() {
    const { user, error, isLoading } = useUser();

    return (
        <div className="container mx-auto px-4 py-12">
            <h1>Account Page</h1>
            {user ? (
                <div>
                    <p>Welcome, {user.name}!</p>
                    {Object.entries(user).map(([key, value]) => (
                        <p key={key}>{key}: {value}</p>
                    ))}
                </div>
            ) : (
                <p>Please log in to view your account.</p>
            )}
        </div>)
}