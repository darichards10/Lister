'use client'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import Card from '../components/cards/list';

export default function List() {
    const { user, error, isLoading } = useUser();
    const [lists, setLists] = useState([]);
    const [loadingLists, setLoadingLists] = useState(true);
   
    useEffect(() => {
        if (user) {
            const fetchLists = async () => {
                try {
                    const response = await fetch('/api/lists/user/' + user.sub);
                    if (response.ok) {
                        const data = await response.json();
                        setLists(data);
                    } else {
                        throw new Error('Failed to fetch lists');
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoadingLists(false);
                }
            };

            fetchLists();
        }
    }, [user]);


    return (
        <div className="container mx-auto px-4 py-2">
            {isLoading ? (
                <p>Loading...</p>
            ) : user ? (
                <div className="container mx-auto p-4">
                    <a className="flex-1 bg-orange hover:bg-dark-orange text-white rounded px-4 py-2 ml-4 mb-2"
                        href="/list/create">
                        Create List
                    </a>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-2 py-2">
                        {lists.map((data, index) => (
                            <Card
                                key={index}
                                listName={(data as any).name}
                                createdDate={(data as any).created_at}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <p>Please log in to view and manage your lists.</p>
            )}
        </div>
    );
}
