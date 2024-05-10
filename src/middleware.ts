import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Authentication from './lib/Authentication'
 



export async function middleware(request: NextRequest) {
  
  // const isAuthenticated = await Authentication.instance.isAuthenticated()

  // if(!isAuthenticated) return NextResponse.redirect(new URL(`/login?redirect=${request.url}`, request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:route*',
}