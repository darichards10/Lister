'use client'
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';


export default function Page({ params }: { params: { slug: string } }) {
  const [list, setList] = useState<any[]>([]);
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(true);
  const [list_id, setList_id] = useState("");
  const [showDialog, setShowDialog] = useState<{ show: boolean, index: number | null, action: string }>({ show: false, index: null, action:"" });
  const { user } = useUser();
  const router = useRouter();


  useEffect(() => {
    const fetchList = async () => {
      try {
        if (user) {
          const response = await fetch(`/api/lists/${params.slug}&user_sub=${user.sub}`);
          if (response.ok) {
            const data = await response.json();
            setList_id(data[0].list_id)
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
    setShowDialog({ show: true, index: null, action: 'edit' });
  };

  const handleShare = () => {
    // Handle share
  };

  const handleItemClick = (index: number) => {
    setShowDialog({ show: true, index, action: 'updateItem' });
  };

  const handleDelete = (index: number) => {
    setShowDialog({ show: true, index, action: 'delete' });
  };

  const markItemAsComplete = async (index: number) => {
    try {
      const updatedList = [...list];
      updatedList[index].status = 'complete';
      setList(updatedList);
      await fetch(`/api/items/${updatedList[index].id}?owner_sub=${user?.sub}&status=complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setShowDialog({ show: false, index: null, action: 'updateItem' });

    } catch (error) {
      console.error('Failed to mark item as complete:', error);
    }
  };

  const deleteList = async () => {
    if (showDialog.index !== null) {
      try {
        const response = await fetch(`/api/lists/${params.slug}?owner_sub=${user?.sub}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setShowDialog({ show: false, index: null, action: 'delete' });
          router.push('/list');
        } else {
          throw new Error('Failed to delete item');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addItem = () => {
    if (newItem.trim()) {
      console.log('Adding item', list);
      setList([...list, {id: 0, list_id: list_id, name: newItem, status: 'new', owner_sub: user?.sub }]);
      setNewItem("");
      console.log('Added item', list);

    }
  };

  const saveList = async () => {
    try {
      const response = await fetch(`/api/lists/${params.slug}?owner_sub=${user?.sub}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(list),
      });
      if (response.ok) {
        setShowDialog({ show: false, index: null, action: 'edit' });
      } else {
        throw new Error('Failed to save list');
      }
    } catch (error) {
      console.error('Failed to save list:', error);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-center md:justify-end space-x-4">
        <button className="flex-1 bg-orange hover:bg-dark-orange text-white rounded px-4 py-2 max-w-20" onClick={handleDelete}>Delete</button>
        <button className="flex-1 bg-orange hover:bg-dark-orange text-white rounded px-4 py-2 max-w-20" onClick={handleEdit}>Add</button>
        <button className="flex-1 bg-orange hover:bg-dark-orange text-white rounded px-4 py-2 max-w-20" onClick={handleShare}>Share</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : list.length ? (
        <div className="container mx-auto">
          <div className="text-white mx-auto justify-center align-center flex">
            <p className="">Click on item to mark it as complete</p>
          </div>
          <h1 className="text-2xl mb-4">{decodeURIComponent(params.slug)}</h1>
          <ul className="list-disc list-inside">
            {list.map((item, index) => (
              <li
                key={item.id}
                onClick={() => handleItemClick(index)}
                className={`py-1 cursor-pointer ${item.status === 'complete' ? 'text-dark-orange' : 'hover:text-orange'
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
      {(showDialog.show && showDialog.action === 'delete') && (
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
                    onClick={() => setShowDialog({ show: false, index: null, action: "delete" })}
                    className="bg-light-gray hover:bg-light-gray rounded px-4 py-2"
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
      {(showDialog.show && showDialog.action === 'updateItem') && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            {showDialog.index !== null ? (
              <>
                <p className="text-dark">Mark item as complete?</p>
                <div className="flex justify-around mt-4 gap-4">
                  <button
                    onClick={() => markItemAsComplete(showDialog.index || 0)}
                    className="bg-orange hover:bg-dark-orange text-white rounded px-4 py-2"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowDialog({ show: false, index: null, action: "updateItem" })}
                    className="bg-light-gray hover:bg-light-gray rounded px-4 py-2"
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
      {(showDialog.show && showDialog.action === 'edit') && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-dark">Add Item To list</p>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="New item"
                className="border border-orange text-black rounded px-4 py-2"
              />
              <button
                onClick={addItem}
                className="bg-orange hover:bg-dark-orange text-white rounded px-4 py-2"
              >
                Add Item
              </button>
              <div className="flex justify-around gap-4">
                <button
                  onClick={saveList}
                  className="bg-orange hover:bg-dark-orange text-white rounded px-4 py-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowDialog({ show: false, index: null, action: 'edit' })}
                  className="bg-light-gray hover:bg-light-gray rounded px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
