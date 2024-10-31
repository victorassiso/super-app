'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Spinner } from '@/components/custom/spinner'
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
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { VisionAIMapContext } from '@/contexts/vision-ai/map-context'
import type { Model, Project } from '@/models/entities'
import { getModelsAction } from '@/server-cache/models'
import { getProjectAction } from '@/server-cache/project'
import { setToastDataCookie } from '@/utils/others/cookie-handlers'
import { redirect } from '@/utils/others/redirect'

import {
  type ProjectForm,
  projectFormSchema,
} from '../../components/schemas/project-schema'
import { updateProjectAction } from './actions'

export default function ProjectDetails() {
  const {
    layers: {
      cameras: { setSelectedCameras, selectedCameras },
    },
  } = useContext(VisionAIMapContext)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const id = pathname.replace('/vision-ai/project/', '')
  const [project, setProject] = useState<Project | undefined>(undefined)
  const [models, setModels] = useState<Model[] | undefined>(undefined)

  const { handleSubmit, register, control, setValue } = useForm<ProjectForm>({
    resolver: zodResolver(projectFormSchema),
  })

  // TODO: Implementar a lógica de busca do projeto
  useEffect(() => {
    async function handleRedirect() {
      await setToastDataCookie({
        type: 'error',
        message: `O projeto de id=${id} não existe.`,
      })

      await redirect('/vision-ai')
    }

    async function initializeData() {
      getModelsAction().then((data) => {
        setModels(data)
      })

      const projectsResponse = await getProjectAction(id)

      if (projectsResponse) {
        setProject(projectsResponse)

        setValue('name', projectsResponse.name)
        setValue('description', projectsResponse.description)
        setValue('model', projectsResponse.model)
        setValue('enabled', projectsResponse.enabled)
        setSelectedCameras(projectsResponse.camera_ids)
        setLoading(false)
      } else {
        await handleRedirect()
      }
    }

    initializeData()
  }, [id, setValue])

  async function onSubmit(data: ProjectForm) {
    // TODO: Implementar a lógica de atualização do projeto
    await updateProjectAction({
      id,
      name: data.name,
      model: data.model,
      cameras_id: selectedCameras,
      enable: data.enabled,
    })
  }

  return loading ? (
    <Spinner />
  ) : (
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
              <BreadcrumbPage>{project?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h3 className="mt-4 mb-2 text-2xl font-bold">Editar Projeto</h3>
        <div className="flex flex-col gap-2">
          <div className="space-y-0.5">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register('name')} />
          </div>
          <div className="space-y-0.5">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" {...register('description')} />
          </div>
          <div className="space-y-0.5">
            <Label htmlFor="model">Modelo</Label>
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
                      {models?.map((model, index) => (
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
          <div className="space-y-0.5 flex items-center gap-2">
            <Label htmlFor="active">Ativo</Label>
            <Controller
              control={control}
              name="enabled"
              render={({ field }) => (
                <Switch
                  id="enabled"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Label>Câmeras</Label>
          <div className="flex flex-col gap-1">
            {selectedCameras.map((cameraId, index) => (
              <span key={index}>{cameraId}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="secondary" type="submit">
          Atualizar Projeto
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/vision-ai">Candelar Edição</Link>
        </Button>
      </div>
    </form>
  )
}
