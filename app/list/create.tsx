'use client'
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function List() {
    const { user, error, isLoading } = useUser();
    const [title, setTitle] = useState('');
    const [items, setItems] = useState<string[]>([]);
    const [newItem, setNewItem] = useState('');

    const addItem = () => {
        if (newItem.trim() !== '' && items.length < 15) {
            setItems([...items, newItem]);
            setNewItem('');
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            {user ? (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Create a New List</h1>
                    <input
                        type="text"
                        placeholder="List Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border rounded p-2 mb-4 w-full"
                    />
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Add an item"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            className="border rounded p-2 mr-2"
                        />
                        <button
                            onClick={addItem}
                            className="bg-blue-500 text-white rounded px-4 py-2"
                        >
                            Add Item
                        </button>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{title}</h2>
                    <ul className="list-disc list-inside">
                        {items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Please log in to view and manage your lists.</p>
            )}
        </div>
    );
}
