import * as React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/authOptions';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if(session){
    <h2>Hello, {session?.user?.name}. Welcome to Pickup App.</h2>
  } else{
    return <h2>Welcome to Pickup App.</h2>
  }
}
