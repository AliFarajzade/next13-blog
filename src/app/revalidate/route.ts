import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret')

    if (secret !== process.env.SECRET)
        return NextResponse.json(
            { message: 'Invalid token' },
            {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

    const path = request.nextUrl.searchParams.get('path') ?? '/'

    revalidatePath(path)

    return NextResponse.json(
        { revalidate: true },
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
}
