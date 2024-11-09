'use client'

import React from 'react'
import Image from 'next/image'

import styles from '@/app/components/Background.module.css'

interface Size2D {
  x: number
  y: number
}

const imageSizes: {
  portrait: Size2D
  landscape: Size2D
} = {
  portrait: { x: 768, y: 1024 },
  landscape: { x: 1024, y: 768 },
}

interface ImageData {
  src: string
  size?: Size2D
}

const images: ImageData[] = [
  {
    src: '1',
  },
  {
    src: '2',
  },
  {
    src: '3',
    size: imageSizes.landscape,
  },
  {
    src: '4',
  },
  {
    src: '5',
  },
  {
    src: '6',
  },
  {
    src: '7',
    size: imageSizes.landscape,
  },
  {
    src: '8',
  },
  {
    src: '9',
  },
]

export function Background(): React.ReactNode {
  const dataRef = React.useRef<{ deg: number }>({
    deg: 0,
  })

  const imageElements = React.useMemo<React.ReactElement[]>(
    (): React.ReactElement[] =>
      images.map(
        (imageData: ImageData): React.ReactElement => (
          <Image
            src={`/${imageData.src}.jpeg`}
            alt={imageData.src}
            width={imageData.size?.x ?? imageSizes.portrait.x}
            height={imageData.size?.y ?? imageSizes.portrait.y}
            key={imageData.src}
          />
        ),
      ),
    [],
  )

  const [startingIndex, setStartingIndex] = React.useState<number>(0)

  const sortedElements = React.useMemo<
    React.ReactElement[]
  >((): React.ReactElement[] => {
    const res: React.ReactElement[] = []

    for (let i: number = 0; i < imageElements.length; i++) {
      res.push(
        <div key={`${i}: ${startingIndex}`}>
          {imageElements[(i + startingIndex) % 8]}
        </div>,
      )
    }

    return res
  }, [startingIndex, imageElements])

  const nextSortedElements = React.useMemo<
    React.ReactElement[]
  >((): React.ReactElement[] => {
    const res: React.ReactElement[] = []

    for (let i: number = 0; i < imageElements.length; i++) {
      res.push(
        <div
          key={`${i}: ${startingIndex}`}
          style={{ filter: `hue-rotate(${dataRef.current.deg}deg)` }}
        >
          {imageElements[(i + startingIndex + 1) % 8]}
        </div>,
      )
    }

    return res
  }, [startingIndex, imageElements])

  React.useEffect((): (() => void) => {
    function progressImages(): void {
      dataRef.current.deg = (dataRef.current.deg + 9) % 360

      setStartingIndex(
        (prevValue: number): number => (prevValue + 1) % imageElements.length,
      )
    }

    const interval: number = window.setInterval(progressImages, 10)

    return (): void => {
      window.clearInterval(interval)
    }
  }, [imageElements])

  return (
    <div className={styles.background}>
      {sortedElements}
      {nextSortedElements}
    </div>
  )
}
