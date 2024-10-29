'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { VisionAIMapContext } from '@/contexts/vision-ai/map-context'
import { createProject } from '@/http/projects/create-project'
import type { Model } from '@/models/entities'
import { getModelsAction } from '@/server-cache/models'
import { redirect } from '@/utils/others/redirect'

import {
  type ProjectForm,
  projectFormSchema,
} from '../components/schemas/project-schema'

export default function Page() {
  const {
    layers: {
      cameras: { selectedCameras },
    },
  } = useContext(VisionAIMapContext)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectForm>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      enabled: true,
    },
  })

  const [models, setModels] = useState<Model[]>([])

  async function onSubmit(data: ProjectForm) {
    // TODO: Implementar a lógica de criação do projeto
    console.log(data)
    const project = await createProject({
      name: data.name,
      model: data.model,
      cameras_id: selectedCameras.map((camera) => camera.id),
    })
    await redirect(`/vision-ai/project/${project.id}`)
  }

  useEffect(() => {
    async function fetchModels() {
      const data = await getModelsAction()
      setModels(data)
    }
    fetchModels()
  }, [])
  return (
    <form
      className="flex flex-col gap-2 h-full px-1 py-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="h-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/vision-ai">Projetos</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Novo Projeto</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h3 className="mt-4 mb-2 text-2xl font-bold">Novo Projeto</h3>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 h-3.5">
                <Label htmlFor="name">Nome</Label>
                {errors.name && (
                  <span className="text-xs text-destructive">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <Input id="name" {...register('name')} />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" {...register('description')} />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 h-3.5">
                <Label htmlFor="model">Modelo</Label>
                {errors.model && (
                  <span className="text-xs text-destructive">
                    {errors.model.message}
                  </span>
                )}
              </div>
              <Controller
                control={control}
                name="model"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="model" className="w-full">
                      <SelectValue placeholder="Selecione um modelo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {models.map((model, index) => (
                          <SelectItem key={index} value={model.name}>
                            {model.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Câmeras</Label>
              <div className="flex flex-col gap-1">
                {selectedCameras.map((camera) => (
                  <span key={camera.id}>{camera.id}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="">
            {/* TODO: Tabela/Lista de câmeras + botão para navegar para localização */}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="secondary">Criar Projeto</Button>
        <Button variant="ghost" asChild>
          <Link href="/vision-ai">Candelar</Link>
        </Button>
      </div>
    </form>
  )
}
