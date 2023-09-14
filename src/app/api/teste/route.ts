
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    // const url = 'http://localhost:8983/solr/authority/select?fl=*%2C%5Bchild%5D&q=id%3Abka-1'
    const url = 'http://localhost:8000/items/next_id'
    const res = await fetch(url)
    const data = await res.json()
   
    return NextResponse.json({ data })
  }

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    return NextResponse.json(body)
}