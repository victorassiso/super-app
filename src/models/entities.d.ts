export type Camera = {
  CameraCode: string
  CameraName: string
  CameraZone: string
  Latitude: number
  Longitude: number
  Streamming: string
}

export type RawProject = {
  id: string
  name: string
  model: string
  config: Record<string, string>[] | null
  cameras_id: string[]
  time_start: string | null
  time_end: string | null
  discord_webhook_id: string
  discord_webhook_token: string
  enable: true
}

export type Project = {
  id: string
  name: string
  description: string
  model: {
    id: string
    name: string
  }
  config: Record<string, string>[] | null
  camera_ids: string[]
  start_time: string | null
  end_time: string | null
  discord_webhook_id: string
  discord_webhook_token: string
  enabled: true
}
