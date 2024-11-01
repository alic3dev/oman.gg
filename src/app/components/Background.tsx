import React from 'react'
import Image from 'next/image'

import styles from '@/app/components/Background.module.css'

export function Background(): React.ReactNode {
  return (
    <div className={styles.background}>
      <Image src={'/1.jpeg'} alt="1" width={768} height={1024} />
      <Image src={'/2.jpeg'} alt="2" width={768} height={1024} />
      <Image src={'/3.jpeg'} alt="3" width={1024} height={768} />
      <Image src={'/4.jpeg'} alt="4" width={768} height={1024} />
      <Image src={'/5.jpeg'} alt="5" width={768} height={1024} />
      <Image src={'/6.jpeg'} alt="6" width={768} height={1024} />
      <Image src={'/7.jpeg'} alt="7" width={1024} height={768} />
      <Image src={'/8.jpeg'} alt="8" width={768} height={1024} />
      <Image src={'/9.jpeg'} alt="9" width={768} height={1024} />

      <div>👻</div>
    </div>
  )
}
