export interface UserJobInterest {
  userId: number
  job: Job
  jobId: number
}

interface Job {
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

interface Area {
  id: number
  name: string
  areaPhoto: AreaPhoto
}

interface AreaPhoto {
  areaId: number
  photoId: number
  photo: Photo
}

interface Photo {
  id: number
  url: string
}

interface UserJob {
  userId: number
  user: any
  jobId: number
}
