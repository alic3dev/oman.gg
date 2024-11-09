import React from 'react'

import { Alic3 } from '@/app/components/Alic3'
import { Background } from '@/app/components/Background'

import styles from './page.module.css'

export default function Home(): React.ReactElement {
  return (
    <>
      <Background />

      <main className={styles.page}>
        Oh..
        <br />
        Hey!!
        <br />
        I know you!!!!
        <br />
        ((&ldquo;Hey!!!!&rdquo;))
        <br />
        ((&ldquo;I know you too!!!!&rdquo;))
        <br />
        Wait...
        <br />
        <br />
        <br />
        Who are you..?
        <br />
        ((&ldquo;I don&apos;t know you&rdquo;))
        <a className={styles.alice} href="https://alic3.dev">
          I&apos;m Alic3...
        </a>
      </main>

      <div className={styles.alic3}>
        <Alic3 />
      </div>
    </>
  )
}
