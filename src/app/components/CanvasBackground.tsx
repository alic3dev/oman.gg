'use client'

import React from 'react'

import styles from '@/app/components/CanvasBackground.module.css'

export function CanvasBackground(): React.ReactElement {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const secondCanvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect((): void | (() => void) => {
    if (!canvasRef.current || !secondCanvasRef.current) return

    const ctx: CanvasRenderingContext2D | null = canvasRef.current.getContext(
      '2d',
      // { willReadFrequently: true },
    )
    const ctxSecond: CanvasRenderingContext2D | null =
      secondCanvasRef.current.getContext('2d', { willReadFrequently: true })

    if (!ctx || !ctxSecond) return

    const imageData: ImageData = ctxSecond.getImageData(
      0,
      0,
      ctxSecond.canvas.width,
      ctxSecond.canvas.height,
    )

    imageData.data.fill(0)

    const totalPixels: number = ctxSecond.canvas.width * ctxSecond.canvas.height

    let animationFrameHandle: number

    const corruptColors: string[] = ['#FF000001', '#00FF0001', '#0000FF01']

    let prevTime: DOMHighResTimeStamp = 0

    function animateFrame(time: DOMHighResTimeStamp): void {
      if (!ctx || !ctxSecond) return

      if (time - prevTime >= Math.random() * 150 + 100) {
        //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        const corruptionCount: number = Math.random() * 9000 + 1000

        for (let i = 0; i < corruptionCount; i++) {
          const x: number = Math.floor(Math.random() * ctx.canvas.width)
          const y: number = Math.floor(Math.random() * ctx.canvas.height)
          const w: number = Math.floor(Math.random() * 10)
          const h: number = Math.floor(Math.random() * 10)

          ctx.fillStyle =
            corruptColors[Math.floor(Math.random() * corruptColors.length)]
          ctx.beginPath()
          ctx.rect(x, y, w, h)
          ctx.fill()
        }

        prevTime = time
      }

      ctxSecond.clearRect(0, 0, ctxSecond.canvas.width, ctxSecond.canvas.height)

      for (let i: number = 0; i < 10; i++) {
        const randomPixel = Math.floor(Math.random() * totalPixels) * 4

        const colorVal: number = Math.min(
          255,
          imageData.data[randomPixel] + Math.floor(Math.random() * 255),
        )
        const opacityVal: number = Math.min(
          255,
          imageData.data[randomPixel + 3] + Math.floor(Math.random() * 255),
        )

        imageData.data[randomPixel] = colorVal
        imageData.data[randomPixel + 1] = colorVal
        imageData.data[randomPixel + 2] = colorVal
        imageData.data[randomPixel + 3] = opacityVal
      }

      ctxSecond.putImageData(imageData, 0, 0)

      animationFrameHandle = window.requestAnimationFrame(animateFrame)
    }

    animationFrameHandle = window.requestAnimationFrame(animateFrame)

    return (): void => {
      window.cancelAnimationFrame(animationFrameHandle)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        height={1080}
        width={1920}
        className={styles.canvas}
      ></canvas>
      <canvas
        ref={secondCanvasRef}
        height={1080}
        width={1920}
        className={styles.canvas}
      ></canvas>
    </>
  )
}
