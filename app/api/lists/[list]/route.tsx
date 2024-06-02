import { getList } from '../../../database/lib/database';
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
