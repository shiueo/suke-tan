import CourseEditor from '@/components/CourseEditor'
import TimeTable from '@/components/TimeTable'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="relative  flex flex-col">
      <div className="flex-grow">
      <TimeTable courses={[]} />
      </div>

    </div>
  )
}
