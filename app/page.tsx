import * as React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/authOptions';


export default async function Home() {
  const user = await getServerSession(authOptions)
    .then((session) =>{
      return session?.user;
    });

  if(user){
    return <h2>Hello, {user?.name}. Welcome to Pickup App.</h2>;
  } else{
    return <h2>Welcome to Pickup App.</h2>;
  }
}
