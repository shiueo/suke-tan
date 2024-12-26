import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Noto_Sans, Noto_Serif } from 'next/font/google'
import './globals.css'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // 필요한 가중치를 개별적으로 지정
  variable: '--font-noto-sans',
})

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // 필요한 가중치를 개별적으로 지정
  variable: '--font-noto-serif',
})

export const metadata: Metadata = {
  title: 'スケたん (Suke-tan) - TimeTable Manager for KAIST Students | by shiüo (Levi Lim)',
  description:
    'Suke-tan is a user-friendly timetable manager designed specifically for KAIST undergraduates, helping you efficiently organize and manage your class schedules.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} ${notoSerif.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          themes={['light', 'dark']}
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
