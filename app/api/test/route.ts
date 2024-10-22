import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){
    const{url} = request;
    return NextResponse.json({url});
}

export async function POST(request: NextRequest){
    const {wish} = await request.json();
    console.log(wish);
    return new Response(wish);
}