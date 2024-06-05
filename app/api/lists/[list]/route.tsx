import { getList, deleteList, addItemsToList } from '../../../database/lib/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { list: string } }) {
    const [list, user] = params.list.split('&user_sub=');

    if (!list || !user) {
        return NextResponse.json({ error: 'List or user_sub parameter is missing' }, { status: 400 });
    }

    try {
        const lists = await getList(list, user);
        return NextResponse.json(lists, { status: 200 });
    } catch (error) {
        console.error('Error fetching lists:', error);
        return NextResponse.json({ error: 'Internal Server Error: ' + error }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params, query }: { params: { list: string }, query: { owner_sub: string } }) {

    try {
        let sub = request.nextUrl.searchParams.get("owner_sub") || '';
        let list = params.list;
        await deleteList(list, sub)
        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error('Error fetching lists:', error);
        return NextResponse.json({ error: 'Internal Server Error: ' + error }, { status: 500 });
    }
}


export async function POST(request: NextRequest, { params, query }: { params: { list: string }, query: { owner_sub: string } }) {

    try {
        let sub = request.nextUrl.searchParams.get("owner_sub") || '';
        let listId = "";
        const body = await request.json();
        for (let item of body) {
            if (item.list_id != null) {
                listId = item.list_id;
                break;
            }
        }
       
        let newItems = body.filter(item => item.status == 'new')
        await addItemsToList( listId, sub, newItems); 

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error('Error fetching lists:', error);
        return NextResponse.json({ error: 'Internal Server Error: ' + error }, { status: 500 });
    }
}

