'use client'
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';


export default function Page({ params }: { params: { slug: string } }) {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState<{ show: boolean, index: number | null }>({ show: false, index: null });
  const { user } = useUser();
  const router = useRouter();


  useEffect(() => {
    const fetchList = async () => {
      try {
        if (user) {
          const response = await fetch(`/api/lists/${params.slug}&user_sub=${user.sub}`);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
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

  const handleEdit = () => {
    // Handle edit
  };

  const handleShare = () => {
    // Handle share
  };

  const handleItemClick = (index: number) => {
    setShowDialog({ show: true, index });
  };

  const handleDelete = (index: number) => {
    setShowDialog({ show: true, index });
  };

  const deleteList = async () => {
    if (showDialog.index !== null) {
      try {
        const response = await fetch(`/api/lists/${params.slug}?owner_sub=${user?.sub}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setShowDialog({ show: false, index: null });
          router.push('/list');
        } else {
          throw new Error('Failed to delete item');
        }
      } catch (error) {
        console.error(error);
      }
    }
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
      ) : list.length ? (
        <div className="container mx-auto">
          <h1 className="text-2xl mb-4">{decodeURIComponent(params.slug)}</h1>
          <ul className="list-disc list-inside">
            {list.map((item, index) => (
              <li
                key={item.id}
                onClick={() => handleItemClick(index)}
                className={`py-1 cursor-pointer ${item.status === 'complete' ? 'text-dark' : 'hover:text-dark-orange'
                  }`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No items found.</p>
      )}
      {showDialog.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            {showDialog.index !== null ? (
              <>
                <p className="text-dark">Delete list?</p>
                <div className="flex justify-around mt-4 gap-4">
                  <button
                    onClick={deleteList}
                    className="bg-orange hover:bg-dark-orange text-white rounded px-4 py-2"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowDialog({ show: false, index: null })}
                    className="bg-light-gray hover:bg-gray-300 rounded px-4 py-2"
                  >
                    No
                  </button>
                </div>
              </>
            ) : (
              <p className="text-dark">Mark item as complete?</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
