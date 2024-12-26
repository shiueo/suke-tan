import React from 'react';
import { cn } from '@/lib/utils';

interface TimetableGridProps {
  courses: Course[];
}

export default function TimeTable({ courses }: TimetableGridProps) {
  const days = ['월', '화', '수', '목', '금'];
  const times = Array.from({ length: 28 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9;
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minute}`;
  });

  return (
    <div className="overflow-y-auto max-h-screen">
      <div className="grid min-w-[500px] grid-cols-[80px_repeat(5,1fr)] gap-[0.5px] rounded-lg bg-card p-2 shadow-sm">
        {/* Header */}
        <div className="py-2 text-center font-bold text-sm bg-background">시간</div>
        {days.map((day) => (
          <div key={day} className="py-2 text-center font-bold text-sm bg-background">
            {day}
          </div>
        ))}

        {/* Time slots */}
        {times.map((time, index) => (
          <React.Fragment key={time}>
            <div className={cn('py-2 text-right pr-2 text-sm text-muted-foreground', index % 2 === 0 ? 'bg-muted/10' : 'bg-muted/20')}>
              {time}
            </div>
            {days.map((day) => (
              <div
                key={`${day}-${time}`}
                className={cn('relative border-l border-muted', index % 2 === 0 ? 'bg-muted/10' : 'bg-muted/20')}
              >
                {courses
                  .filter((course) => course.schedule.some((s) => s.day === day))
                  .map((course) => {
                    const schedule = course.schedule.find((s) => s.day === day && isInTimeRange(time, s.startTime, s.endTime));
                    if (!schedule) return null;

                    const courseDuration = getCourseDuration(schedule.startTime, schedule.endTime);
                    const startOffset = getTimeOffset(schedule.startTime);

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
                        <div className="font-medium text-base whitespace-normal">{course.subject}</div>
                        <div className="text-xs opacity-80 whitespace-normal">{course.professor}</div>
                        <div className="text-xs whitespace-normal">{course.room}</div>
                      </div>
                    );
                  })}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// 시간 차이를 구해 수업이 차지할 셀의 수를 반환
function getCourseDuration(startTime: string, endTime: string): number {
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);

  const start = sh * 60 + sm;
  const end = eh * 60 + em;

  return (end - start) / 30; // 30분 단위로 반환
}

// 시작 시간을 기준으로 위치를 결정
function getTimeOffset(startTime: string): number {
  const [sh, sm] = startTime.split(':').map(Number);
  return (sh - 9) * 2 + (sm / 30);
}

// 특정 시간이 일정 범위에 속하는지 확인
function isInTimeRange(time: string, startTime: string, endTime: string): boolean {
  const [h, m] = time.split(':').map(Number);
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);

  const current = h * 60 + m;
  const start = sh * 60 + sm;
  const end = eh * 60 + em;

  return current >= start && current < end;
}
