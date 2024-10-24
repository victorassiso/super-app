export type Camera = {
  CameraCode: string
  CameraName: string
  CameraZone: string
  Latitude: number
  Longitude: number
  Streamming: string
}

export type Project = {
  id: string
  name: string
  model: string
  cameras: Camera[]
}
