import { NextResponse } from 'next/server';
import { createListWithItems } from '../../../database/lib/database';

export async function POST(request: Request) {
    try {
        const { title, items, userSub } = await request.json();

        if (!title || !items || !userSub) {
            return NextResponse.json({ message: 'Title, items, and userSub are required' }, { status: 400 });
        }

        const result = await createListWithItems(userSub, title, items);
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    }
}
