'use server'

import { env } from '@/env'
import type { Model, RawModel } from '@/models/entities'

export async function getModelsAction() {
  const data = await fetch(`${env.VISION_AI_API_URL}/model`)

  const rawModels: RawModel[] = await data.json()

  const models: Model[] = rawModels.map((rawModel) => ({
    name: rawModel.model,
    description: rawModel.description,
  }))

  return models
}
