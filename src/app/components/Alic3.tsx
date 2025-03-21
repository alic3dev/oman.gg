import type React from 'react'

import styles from '@/app/components/Alic3.module.css'

export function Alic3({
  header = false,
}: {
  header?: boolean
}): React.ReactElement {
  return (
    <h1 className={`${styles.title} ${header ? styles.header : ''}`}>
      <a className={styles['title-header']} href="https://alic3.dev">
        <div className={styles['title-main']}>
          <span className={styles['title-main-start']}>A</span>
          <div className={styles['title-main-part']}>l</div>
          <div
            className={`${styles['title-main-middle']} ${styles['title-main-part']}`}
          >
            i
          </div>
          <div
            className={`${styles['title-main-c']} ${styles['title-main-part']}`}
          >
            c
          </div>
          <div
            className={`${styles['title-main-end']} ${styles['title-main-part']}`}
          >
            3
          </div>
        </div>
        {header ? (
          <div className={styles['title-secondary']} aria-hidden="true">
            L<span className={styles['title-emphasis']}>I</span>C3
          </div>
        ) : (
          <></>
        )}
      </a>
    </h1>
  )
}
