export interface Course {
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
  schedule: Course[]
  addClass: (course: Course) => void
  removeClass: (course: Course) => void
}
