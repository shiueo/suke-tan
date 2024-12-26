import CourseEditor from '@/components/CourseEditor'
import TimeTable from '@/components/TimeTable'

export default function Home() {
  return (
    <div className="flex h-full flex-col lg:flex-row">
      {/* 왼쪽: 시간표 */}
      <div className="flex-1 overflow-x-auto p-4">
        <TimeTable courses={[]} />
      </div>

      {/* 오른쪽: 과목 찾기 */}
      <div className="flex-1 overflow-x-auto p-4">
        <CourseEditor />
      </div>
    </div>
  )
}
