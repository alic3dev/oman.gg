'use client'

import React from 'react'

import styles from '@/app/components/Background.module.css'

interface Size2D {
  x: number
  y: number
}

const image_sizes: {
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
    size: image_sizes.landscape,
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
    size: image_sizes.landscape,
  },
  {
    src: '8',
  },
  {
    src: '9',
  },
]

function image_element_create(image_data: ImageData): HTMLImageElement {
  const image_element = document.createElement('img')
  image_element.src = `${image_data.src}.jpeg`
  image_element.width = image_data.size?.x ?? image_sizes.portrait.x
  image_element.height = image_data.size?.y ?? image_sizes.portrait.y

  return image_element
}

export function Background(): React.ReactNode {
  const reference_sorted_elements = React.useRef<HTMLDivElement>(null)
  const reference_sorted_elements_next = React.useRef<HTMLDivElement>(null)
  const reference_degrees = React.useRef<{ degrees: number }>({
    degrees: 0,
  })

  React.useEffect((): void => {
    if (reference_sorted_elements.current) {
      reference_sorted_elements.current.innerHTML = ''

      for (let images_index = 0; images_index < images.length; ++images_index) {
        const image_data: ImageData = images[images_index]
        const image_element: HTMLImageElement = image_element_create(image_data)
        reference_sorted_elements.current.append(image_element)
      }
    }

    if (reference_sorted_elements_next.current) {
      reference_sorted_elements_next.current.innerHTML = ''

      for (let images_index = 0; images_index < images.length; ++images_index) {
        const image_data: ImageData = images[images_index]
        const image_element: HTMLImageElement = image_element_create(image_data)
        reference_sorted_elements_next.current.append(image_element)
      }

      const element_last: Element =
        reference_sorted_elements_next.current.children[
          reference_sorted_elements_next.current.children.length - 1
        ]
      reference_sorted_elements_next.current.removeChild(element_last)
      reference_sorted_elements_next.current.prepend(element_last)
    }
  }, [])

  React.useEffect((): (() => void) => {
    let animation_frame_handle: number = 0
    let time_previous: DOMHighResTimeStamp = 0
    function animation_frame(time_current: DOMHighResTimeStamp): void {
      const time_delta: DOMHighResTimeStamp = time_current - time_previous

      if (time_current !== 0 && time_delta < 50) {
        animation_frame_handle = window.requestAnimationFrame(animation_frame)
        return
      }

      time_previous = time_current

      reference_degrees.current.degrees =
        (reference_degrees.current.degrees + 9) % 360

      if (reference_sorted_elements.current) {
        const element_last: Element =
          reference_sorted_elements.current.children[
            reference_sorted_elements.current.children.length - 1
          ]
        reference_sorted_elements.current.removeChild(element_last)
        reference_sorted_elements.current.prepend(element_last)
      }

      if (reference_sorted_elements_next.current) {
        const element_last: Element =
          reference_sorted_elements_next.current.children[
            reference_sorted_elements_next.current.children.length - 1
          ]
        reference_sorted_elements_next.current.removeChild(element_last)
        reference_sorted_elements_next.current.prepend(element_last)

        reference_sorted_elements_next.current.style.filter = `hue-rotate(${reference_degrees.current.degrees}deg) contrast(2) blur(20px)`
      }

      animation_frame_handle = window.requestAnimationFrame(animation_frame)
    }
    animation_frame(time_previous)

    return (): void => {
      window.cancelAnimationFrame(animation_frame_handle)
    }
  }, [])

  return (
    <div className={styles.background}>
      <div ref={reference_sorted_elements} />
      <div ref={reference_sorted_elements_next} />
    </div>
  )
}
