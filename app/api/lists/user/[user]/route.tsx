import { getUsersLists } from '../../../../database/lib/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }) {
    const user = params.user;

    if (!user) {
        return NextResponse.json({ error: 'User parameter is missing' }, { status: 400 });
    }

    try {
        const lists = await getUsersLists(user);
        return NextResponse.json(lists, { status: 200 });
    } catch (error) {
        console.error('Error fetching lists:', error);
        return NextResponse.json({ error: 'Internal Server Error: ' + error }, { status: 500 });
    }
}