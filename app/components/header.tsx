'use client'
import Link from 'next/link'
import Image from 'next/image'

import { useUser } from '@auth0/nextjs-auth0/client';


export default function Header() {
    const { user, isLoading } = useUser();
    return (
        <header className="bg-dark text-orange">
            <div className="flex justify-between items-center pr-8">
                <div className="text-3xl">
                    <Link href="/">
                        <Image src="/clearBg.png" alt="Lister logo" width={150} height={150}>
                        </Image>
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
