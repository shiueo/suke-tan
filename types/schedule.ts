export interface ClassSchedule {
  subject: string
  professor: string
  schedule: {
    day: string
    startTime: string
    endTime: string
  }[]
  room: string
}

export interface TimeTableState {
  schedule: ClassSchedule[]
  addClass: (course: ClassSchedule) => void
  removeClass: (course: ClassSchedule) => void
}
