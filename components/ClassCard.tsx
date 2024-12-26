import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, MapPin, User } from 'lucide-react'
import { Course } from '../types/schedule'

export default function ClassCard({ course }: { course: Course }) {
  return (
    <Card className="max-w-3xl shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-primary">{course.subject}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <span>{course.professor}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <span>{course.room}</span>
          </div>
          <div className="col-span-full">
            <Clock className="mr-2 inline-block h-5 w-5 text-muted-foreground" />
            <span className="font-medium">수업 시간:</span>
            <ul className="mt-2 list-inside list-disc space-y-1">
              {course.schedule.map((item, index) => (
                <li key={index} className="text-sm">
                  {item.day} - {item.startTime} ~ {item.endTime}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
