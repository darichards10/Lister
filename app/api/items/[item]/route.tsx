import { getItem, updateItem, deleteItem } from '../../../database/lib/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params, query }: { params: { item: string }, query: { user_sub: string } }) {
    try {
        const item = await getItem(params.item, query.user_sub);
        return NextResponse.json(item);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error: ' + error }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { item: string } }) {
    try {
        let status = request.nextUrl.searchParams.get("status") || '';
        let user_sub = request.nextUrl.searchParams.get("owner_sub") || '';
        await updateItem(params.item, status, user_sub);
        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error: ' + error }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params, body, query }: { params: { item: string }, body: { status: string }, query: { user_sub: string } }) {
    // Handle POST request if needed
}

export async function DELETE(request: NextRequest, { params, query }: { params: { item: string }, query: { user_sub: string } }) {
    try {
        await deleteItem(params.item, query.user_sub);
        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error: ' + error }, { status: 500 });
    }
}
