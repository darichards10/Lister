'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import Card from './components/cards/list';

export default function Home() {

  const [lists, setLists] = useState([]);

  useEffect(() => {
    
    const fetchLists = async () => {
      try {
        const response = await fetch('/api/lists/getAll'); 
        if (response.ok) {
          const data = await response.json();
          setLists(data);
        } else {
          throw new Error('Failed to fetch lists');
        }
      } catch (error) { 
        console.error(error);
      }
    };

    fetchLists();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lists.map((data, index) => (
          <Card
            key={index}
            listName={data.name}
            //author={data.author}
            createdDate={data.created_at}
          />
        ))}
      </div>
    </div>
  );
}
