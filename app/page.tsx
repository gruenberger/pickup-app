import Image from 'next/image'
import styles from './page.module.css'
import * as React from 'react';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <main className={styles.main}>
      <Button variant="contained">Hello world</Button>;
    </main>
  )
}
