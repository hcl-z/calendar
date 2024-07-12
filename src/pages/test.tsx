'use client';
import { useRouter } from 'next/router';
import styles from '../styles/index.module.scss'

import style from '../styles/page.module.scss'

export default function Home() {    
    const router=useRouter()

  return (
    <div className={style.main}>
    <div className={styles.cardContainer} ><div
                className={styles.card} style={{background:router.query.color as string||'red'}}>
                <span>Card</span>
            </div>
        </div>
    </div>
  )
}
