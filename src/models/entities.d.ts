export type RawCamera = {
  CameraCode: string
  CameraName: string
  CameraZone: string
  Latitude: number
  Longitude: number
  Streamming: string
}

export type Camera = {
  id: string
  name: string
  zone: string
  latitude: number
  longitude: number
  streamingUrl: string
}

export type RawProject = {
  id: string
  name: string
  model: string
  model_config: Record<string, string>[] | null
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
  model: string
  model_config: Record<string, string>[] | null
  camera_ids: string[]
  start_time: string | null
  end_time: string | null
  discord_webhook_id: string
  discord_webhook_token: string
  enabled: true
}

export type RawModel = {
  model: string
  description: string
}

export type Model = {
  name: string
  description: string
}
