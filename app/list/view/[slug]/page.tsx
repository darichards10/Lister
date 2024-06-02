'use client'
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchList = async () => {
      try {
        if (user) {
          const response = await fetch(`/api/lists/${params.slug}&user_sub=${user.sub}`);
          if (response.ok) {
            const data = await response.json();
            setList(data);
          } else {
            throw new Error('Failed to fetch list');
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [params.slug, user]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/lists/${params.slug}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Handle success
      } else {
        throw new Error('Failed to delete list');
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleEdit = () => {
    // Handle edit
  };

  const handleShare = () => {
    // Handle share
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-end space-x-4">
        <button className="flex-1 bg-orange hover:bg-dark-orange text-white rounded px-4 py-2" onClick={handleDelete}>Delete</button>
        <button className="flex-1 bg-orange hover:bg-dark-orange text-white rounded px-4 py-2" onClick={handleEdit}>Edit</button>
        <button className="flex-1 bg-orange hover:bg-dark-orange text-white rounded px-4 py-2" onClick={handleShare}>Share</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : list ? (
        <div className="container mx-auto">
          <h1 className="text-2xl mb-4">{params.slug}</h1>
          <ul>
            {list.map((item: any) => (
              <li className="py-1" key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>

      ) : (
        <p>Loading again...</p>
      )}
    </div>
  );
}
