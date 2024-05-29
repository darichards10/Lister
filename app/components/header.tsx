'use client'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client';


export default function Header() {
    const { user, isLoading } = useUser();
    return (
        <header className="bg-dark text-orange p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-3xl">
                    <Link href="/">
                        Lister
                    </Link>
                </div>
                <div className="text-lg">
                    {isLoading ? (
                        <p></p>
                    ) : user ? (
                        <div className="space-x-4">   
                            <a href="/account">Account</a>
                            <a href="/list">Lists</a>
                        </div>
                    ) : (
                        <a href="/api/auth/login">Login</a>
                    )}
                </div>
            </div>
        </header>
    )
}
