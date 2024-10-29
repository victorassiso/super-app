'use server'
import { env } from '@/env'
import type { Project } from '@/models/entities'

interface CreateProject {
  name: string
  model: string
  config?: Record<string, string> | null
  cameras_id: string[]
  time_start?: string
  time_end?: string
}

export async function createProject(props: CreateProject) {
  const response = await fetch(`${env.VISION_AI_API_URL}/project`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: props.name,
      model: props.model,
      config: props.config,
      cameras_id: props.cameras_id,
      time_start: props.time_start,
      time_end: props.time_end,
      discord_webhook_id: env.DISCORD_WEBHOOK_ID,
      discord_webhook_token: env.DISCORD_WEBHOOK_TOKEN,
    }),
  })
  const project: Project = await response.json()

  return project
}
