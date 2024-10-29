'use server'

import { env } from '@/env'
import type { Camera, RawCamera } from '@/models/entities'

export async function getCamerasAction() {
  const data = await fetch(`${env.VISION_AI_API_URL}/camera`)

  const rawCameras: RawCamera[] = await data.json()

  const cameras: Camera[] = rawCameras.map((rawCamera) => ({
    id: rawCamera.CameraCode,
    name: rawCamera.CameraName,
    zone: rawCamera.CameraZone,
    latitude: Number(rawCamera.Latitude),
    longitude: Number(rawCamera.Longitude),
    streamingUrl: rawCamera.Streamming,
  }))

  return cameras
}
