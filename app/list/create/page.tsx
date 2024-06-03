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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addItem();
        }
    };

    const handleItemClick = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const createList = async () => {
        if (!title || items.length === 0) {
            alert('Title and at least one item are required');
            return;
        }

        try {
            console.log('Creating list');
            const response = await fetch('/api/lists/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, items, userSub: user?.sub })
            });

            if (response.ok) {
                alert('List created successfully');
                setTitle('');
                setItems([]);
            } else {
                const data = await response.json();
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Failed to create list:', error);
            alert(`Failed to create list: ${error.message}`);
        }
    };

    return (
        <div className="p-4">
            {user ? (
                <div>
                    <h1 className="text-2xl font-bold mb-4 text-center">Create a New List</h1>
                    <p className="text-sm mb-4 text-center">Enter the &quot; , &quot; or hit the enter/return key to quickly add item to list. Click on the item to remove it from the list.</p>
                    <div className="flex flex-col items-center gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="List Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border rounded p-2 w-full sm:w-3/4 text-darkest-orange"
                        />
                        <input
                            type="text"
                            placeholder="Add an item"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="border rounded p-2 w-full sm:w-3/4 text-darkest-orange"
                        />
                        <div className="flex w-full sm:w-3/4 justify-between gap-4">
                            <button
                                onClick={addItem}
                                className="flex-1 bg-orange hover:bg-dark-orange text-white rounded px-4 py-2"
                            >
                                Add Item
                            </button>
                            <button
                                onClick={createList}
                                className="flex-1 bg-orange hover:bg-dark-orange text-white rounded px-4 py-2"
                            >
                                Create List
                            </button>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{title}</h2>
                    <ul className="list-disc list-inside px-4">
                        {items.map((item, index) => (
                            <li key={index}
                            onClick={() => handleItemClick(index)}
                            className="cursor-pointer hover:text-dark-orange"
                            >{item}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-center">Please log in to view and manage your lists.</p>
            )}
        </div>
    );
}
