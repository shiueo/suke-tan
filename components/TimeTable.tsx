'use client'

import { cn } from '@/lib/utils'
import { Course } from '@/types/schedule'
import React from 'react'

interface TimetableGridProps {
  courses: Course[]
}

export default function TimeTable({ courses }: TimetableGridProps) {
  const days = ['월', '화', '수', '목', '금']
  const times = Array.from({ length: 12 }, (_, i) => `${i + 9}:00`)

  return (
    <div className="overflow-auto">
      <div className="grid min-w-[600px] grid-cols-6 gap-1 rounded-lg bg-card p-4 shadow-md">
        <div className="py-2 text-center font-semibold"></div>
        {days.map((day) => (
          <div key={day} className="py-2 text-center font-semibold">
            {day}
          </div>
        ))}
        {times.map((time, index) => (
          <React.Fragment key={time}>
            <div className="py-2 pr-2 text-right text-sm text-muted-foreground">{time}</div>
            {days.map((day) => (
              <div
                key={`${day}-${time}`}
                className={cn(
                  'relative h-16 rounded-md transition-colors',
                  index % 2 === 0 ? 'bg-muted/30' : 'bg-background'
                )}
              >
                {courses
                  .flatMap((course) =>
                    course.schedule
                      .filter((s) => s.day === day && isTimeInRange(time, s.startTime, s.endTime))
                      .map((schedule) => ({
                        ...course,
                        startTime: schedule.startTime,
                        endTime: schedule.endTime,
                        day: schedule.day,
                      }))
                  )
                  .map((course) => (
                    <div
                      key={`${course.subject}-${course.day}-${course.startTime}`}
                      className="absolute inset-0 m-0.5 overflow-hidden rounded-md p-1 text-xs shadow-sm transition-all hover:shadow-md"
                      style={{
                        background: `linear-gradient(135deg, ${course.color}, ${adjustColor(course.color, -20)})`,
                        color: getContrastColor(course.color),
                      }}
                    >
                      <div className="font-medium">{course.subject}</div>
                      <div className="text-[10px] opacity-75">{course.professor}</div>
                      <div className="text-[10px]">{course.room}</div>
                    </div>
                  ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

function adjustColor(color: string, amount: number): string {
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, (color) =>
        ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
      )
  )
}

function getContrastColor(hexcolor: string): string {
  const r = parseInt(hexcolor.substr(1, 2), 16)
  const g = parseInt(hexcolor.substr(3, 2), 16)
  const b = parseInt(hexcolor.substr(5, 2), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#000000' : '#ffffff'
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
