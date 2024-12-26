import { Button } from '@/components/ui/button'
import { Github, Twitter, Youtube } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">suke-tan</h3>
            <p className="text-sm text-muted-foreground">
              suke-tan is a user-friendly timetable manager designed specifically for KAIST undergraduates, helping you
              efficiently organize and manage your class schedules.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">기타 정보</h3>
            <ul className="space-y-2">
              <li>
                <a href="guide" className="text-sm text-muted-foreground hover:text-primary">
                  이용 가이드
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  자주 묻는 질문
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  개인정보 처리방침
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  이용약관
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">개발자 팔로우하기</h3>
            <div className="flex space-x-4">
            <Link href="https://www.youtube.com/@shiueo" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
              <Link href="https://x.com/shiueo_csh" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
              <Link href="https://github.com/shiueo" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} shiüo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
