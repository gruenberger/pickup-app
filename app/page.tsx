import Image from 'next/image'
import styles from './page.module.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import PickupsMap from './map/page';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect('/api/auth/signin');
  }
  return (
    <main className={styles.main}>
      <PickupsMap/> 
    </main>
  )
}
