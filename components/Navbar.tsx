import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">suke-tan</span>
            </Link>
            <div className="ml-10 flex hidden items-baseline space-x-4 md:block">
              <Link href="/" className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:text-primary">
                홈
              </Link>
              <Link
                href="/courses"
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:text-primary"
              >
                과목 목록
              </Link>
              <Link
                href="/schedule"
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:text-primary"
              >
                시간표 보기
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <ThemeToggle />
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="ml-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">메뉴 열기</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link href="/" className="w-full">
                    홈
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/courses" className="w-full">
                    과목 목록
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/schedule" className="w-full">
                    시간표 보기
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
