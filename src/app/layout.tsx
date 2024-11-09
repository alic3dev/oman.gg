import type { Metadata } from 'next'

import { LXGW_WenKai_TC } from 'next/font/google'

import './globals.css'

const bodyFont = LXGW_WenKai_TC({
  weight: '400',
  fallback: [
    'ヒラギノ角ゴ Pro W3',
    'Hiragino Kaku Gothic Pro',
    'Osaka',
    'メイリオ',
    'Meiryo',
    'ＭＳ Ｐゴシック',
    'MS PGothic',
    'sans-serif',
  ],
  preload: true,
  subsets: ['lisu'],
})

export const metadata: Metadata = {
  title: 'Oman —— 暎 田水十口人宦䬤㫨晏尸木火十晔䣝',
  description:
    'Oman —— 日人戈尸日中戈水心日中女戈釣畹䞎尸日人機尸火田日塌口日心水歇日十田戈水水心日口㫬水日口㫬水心日口級',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={bodyFont.className}>{children}</body>
    </html>
  )
}
