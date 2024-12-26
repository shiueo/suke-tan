import CourseEditor from '@/components/CourseEditor'
import TimeTable from '@/components/TimeTable'
import { Button } from '@/components/ui/button'
import { Course } from '@/types/schedule'

const dummyCourses: Course[] = [
  {
    subject: '알고리즘',
    professor: '김철수',
    schedule: [
      { day: '월', startTime: '9:00', endTime: '10:30' },
      { day: '수', startTime: '9:00', endTime: '10:30' },
    ],
    room: '101호',
  },
  {
    subject: '자료구조',
    professor: '이영희',
    schedule: [
      { day: '화', startTime: '10:30', endTime: '12:00' },
      { day: '목', startTime: '10:30', endTime: '12:00' },
    ],
    room: '202호',
  },
  {
    subject: '운영체제',
    professor: '박민수',
    schedule: [
      { day: '금', startTime: '13:00', endTime: '14:30' },
    ],
    room: '303호',
  },
  {
    subject: '컴퓨터 네트워크',
    professor: '정다영',
    schedule: [
      { day: '화', startTime: '15:00', endTime: '16:30' },
      { day: '목', startTime: '15:00', endTime: '16:30' },
    ],
    room: '404호',
  },
]

export default function Home() {
  return (
    <div className="relative  flex flex-col">
      <div className="flex-grow">
      <TimeTable courses={dummyCourses} />
      </div>

    </div>
  )
}
