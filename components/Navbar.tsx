import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">suke-tan</span>
            </Link>
            <div className="ml-10 flex hidden items-baseline space-x-4 md:block">
              <Link
                href="guide"
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:text-primary"
              >
                이용 가이드
              </Link>
              <Link
                href="https://github.com/shiueo/suke-tan"
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                레포지토리
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
                  <Link href="/guide" className="w-full">
                    이용 가이드
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="https://github.com/shiueo/suke-tan"
                    className="w-full"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    래포지토리
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
