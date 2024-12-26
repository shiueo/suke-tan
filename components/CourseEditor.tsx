'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils' // ShadCN의 클래스 결합 유틸리티
import { Course } from '@/types/schedule'
import { useState } from 'react'
import { Input } from './ui/input'

const dummyCourses: Course[] = Array.from({ length: 1500 }, (_, index) => ({
  subject: `과목 ${index + 1}`,
  professor: `교수 ${index + 1}`,
  department: `학과 ${index % 5}`,
  type: `ㅇㅇ`,
  schedule: [
    { day: '월', startTime: '9:00', endTime: '10:30' },
    { day: '수', startTime: '9:00', endTime: '10:30' },
  ],
  room: `${index + 1}호`,
}))

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const getPages = () => {
    const totalNumbers = 6 // 항상 표시될 페이지 버튼 수
    const sideNumbers = Math.floor(totalNumbers / 2) // 현재 페이지 기준으로 양쪽에 표시할 수

    let start = Math.max(currentPage - sideNumbers, 1)
    let end = Math.min(currentPage + sideNumbers, totalPages)

    // totalNumbers만큼 항상 표시하려면 start와 end의 범위가 정확해야 함
    if (end - start < totalNumbers - 1) {
      if (start === 1) {
        end = Math.min(totalPages, start + totalNumbers - 1)
      } else if (end === totalPages) {
        start = Math.max(1, end - totalNumbers + 1)
      }
    }

    const pages = []

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <nav className="mt-4 flex items-center justify-center space-x-2">
      {/* 이전 버튼 */}
      <Button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        className={cn(
          'rounded-md border px-3 py-1',
          currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'
        )}
        disabled={currentPage === 1}
      >
        이전
      </Button>

      {/* 동적 페이지 번호 */}
      {getPages().map((page, index) =>
        page === -1 ? (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'rounded-md border px-3 py-1',
              currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            )}
          >
            {page}
          </Button>
        )
      )}

      {/* 다음 버튼 */}
      <Button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        className={cn(
          'rounded-md border px-3 py-1',
          currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'
        )}
        disabled={currentPage === totalPages}
      >
        다음
      </Button>
    </nav>
  )
}

export default function CourseEditor() {
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10 // 한 페이지에 표시할 과목 수
  const totalPages = Math.ceil(dummyCourses.length / itemsPerPage)

  // 필터링된 데이터
  const filteredCourses = dummyCourses.filter((course) => {
    const matchesType = typeFilter ? course.type === typeFilter : true
    const matchesDepartment = departmentFilter ? course.department === departmentFilter : true
    return matchesType && matchesDepartment
  })

  const paginatedCourses = filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const courseTypes = ['전공필수', '전공선택']
  const departments = ['컴퓨터공학과', '전자공학과', '기계공학과']

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-semibold">과목 찾기</h2>
      <Input type="text" placeholder="과목을 검색하세요" className="rounded-md border p-2" />

      {/* 필터 드롭다운 */}
      <div className="flex space-x-4">
        {/* 수업 유형 필터 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{typeFilter || '수업 유형 선택'}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {courseTypes.map((type) => (
              <DropdownMenuItem key={type} onClick={() => setTypeFilter(type)}>
                {type}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={() => setTypeFilter(null)}>모두 보기</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 학과 필터 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{departmentFilter || '학과 선택'}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {departments.map((department) => (
              <DropdownMenuItem key={department} onClick={() => setDepartmentFilter(department)}>
                {department}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={() => setDepartmentFilter(null)}>모두 보기</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 과목 목록 */}
      <div className="max-h-[60vh] overflow-y-auto">
        <ul>
          {paginatedCourses.map((course, index) => (
            <li key={index} className="border-b p-2">
              <div className="font-semibold">{course.subject}</div>
              <div className="text-sm">{course.professor}</div>
              <div className="text-xs opacity-80">{course.department}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* 페이지네이션 */}
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />
    </div>
  )
}
