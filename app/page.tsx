import * as React from 'react';
import { auth } from '@/auth';


export default async function Home() {
  const session = await auth();

  if(session){
    return <h2>Hello, {session.user?.name}. Welcome to Pickup App.</h2>;
  } else{
    return <h2>Welcome to Pickup App.</h2>;
  }
}
