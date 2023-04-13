export interface Job {
  id: number
  name: string
  description: string
  salary: number
  jobArea: JobArea
  userJob: UserJob
}

interface JobArea {
  jobId: number
  areaId: number
  area: Area
}

export interface Area {
  id: number
  name: string
}

interface UserJob {
  userId: number
  user: User
  jobId: number
}

interface User {
  id: number
  phoneNumber: string
  email: string
  firstName: string
  lastName: string
  dateOfBirth: string
  facebook: string
  instagram: string
}
