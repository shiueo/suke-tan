import { cn } from '@/lib/utils'
import { Course } from '@/types/schedule'
import React from 'react'

interface TimetableGridProps {
  courses: Course[]
}

export default function TimeTable({ courses }: TimetableGridProps) {
  const days = ['월', '화', '수', '목', '금']
  const times = Array.from({ length: 16 }, (_, i) => {
    const hour = 9 + i
    return `${hour}:00`
  })

  return (
    <div className="max-h-screen overflow-x-auto">
      <div className="grid auto-rows-[3rem] grid-cols-6 gap-[0.5px] rounded-lg bg-card p-2 shadow-sm">
        {/* Header Row */}
        <div className="py-2 text-center text-sm font-bold"></div>
        {days.map((day) => (
          <div key={day} className="py-2 text-center text-sm font-bold">
            {day}
          </div>
        ))}

        {/* Time Rows */}
        {times.map((time) => (
          <React.Fragment key={time}>
            {/* Time Column */}
            <div className="py-2 pr-2 text-right text-sm text-muted-foreground">{time}</div>
            {days.map((day) => (
              <div key={`${day}-${time}`} className={cn('relative h-full border border-muted bg-muted/10')}>
                {courses
                  .filter((course) =>
                    course.schedule.some((s) => s.day === day && isTimeInRange(time, s.startTime, s.endTime))
                  )
                  .map((course) => {
                    const schedule = course.schedule.find((s) => s.day === day)
                    if (!schedule) return null

                    const courseDuration = getCourseDuration(schedule.startTime, schedule.endTime)
                    const startOffset = getTimeOffset(schedule.startTime)

                    return (
                      <div
                        key={`${course.subject}-${schedule.day}-${schedule.startTime}`}
                        className={cn(
                          'absolute left-0 right-0 m-[2px] rounded p-[4px] text-sm shadow transition-all hover:shadow-md',
                          'bg-primary text-white'
                        )}
                        style={{
                          top: `${startOffset * 4}rem`,
                          height: `${courseDuration * 4}rem`,
                        }}
                      >
                        <div className="whitespace-normal text-base font-medium">{course.subject}</div>
                        <div className="whitespace-normal text-xs opacity-80">{course.professor}</div>
                        <div className="whitespace-normal text-xs">{course.room}</div>
                      </div>
                    )
                  })}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

// 시간 차이를 구해 수업이 차지할 셀의 수를 반환
function getCourseDuration(startTime: string, endTime: string): number {
  const [sh, sm] = startTime.split(':').map(Number)
  const [eh, em] = endTime.split(':').map(Number)

  const start = sh * 60 + sm
  const end = eh * 60 + em

  return (end - start) / 60 // 시간 차이를 시간 단위로 반환
}

// 시작 시간을 기준으로 위치를 결정
function getTimeOffset(startTime: string): number {
  const [sh, sm] = startTime.split(':').map(Number)
  return sh - 9 + sm / 60
}

function isTimeInRange(time: string, startTime: string, endTime: string): boolean {
  const [h, m] = time.split(':').map(Number)
  const [sh, sm] = startTime.split(':').map(Number)
  const [eh, em] = endTime.split(':').map(Number)

  const current = h * 60 + m
  const start = sh * 60 + sm
  const end = eh * 60 + em

  return current >= start && current < end
}
