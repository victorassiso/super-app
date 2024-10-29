'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Navigation } from 'lucide-react'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { VisionAIMapContext } from '@/contexts/vision-ai/map-context'
import { Camera, type Model } from '@/models/entities'
import { getCamerasAction } from '@/server-cache/cameras'
import { getModelsAction } from '@/server-cache/models'
import { redirect } from '@/utils/others/redirect'

import {
  type ProjectForm,
  projectFormSchema,
} from '../components/schemas/project-schema'
import { createProjectAction } from './actions'

export default function Page() {
  const {
    layers: {
      cameras: { selectedCameras: selectedCameraIds },
    },
    flyTo,
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
  const [cameras, setCameras] = useState<Camera[]>([])
  const [selectedCameras, setSelectedCameras] = useState<Camera[]>([])

  async function onSubmit(data: ProjectForm) {
    // TODO: Implementar a lógica de criação do projeto
    console.log(data)
    const project = await createProjectAction({
      name: data.name,
      model: data.model,
      cameras_id: selectedCameras.map((camera) => camera.id),
    })
    await redirect(`/vision-ai/project/${project.id}`)
  }

  useEffect(() => {
    async function fetchModels() {
      getModelsAction().then((data) => setModels(data))
      getCamerasAction().then((data) => setCameras(data))
    }
    fetchModels()
  }, [])

  useEffect(() => {
    const filtered = cameras.filter((camera) =>
      selectedCameraIds.includes(camera.id),
    )
    setSelectedCameras(filtered)
  }, [selectedCameraIds])

  return (
    <form
      className="flex flex-col gap-2 h-full max-h-screen px-1 py-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="h-full flex flex-col overflow-hidden">
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
        <div className="flex flex-col gap-2 flex-1 overflow-hidden">
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
          <div className="flex flex-col gap-1 flex-1 overflow-hidden">
            <Label>Câmeras</Label>
            <div className="gap-1 flex flex-col overflow-y-scroll">
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Zona</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedCameras.map((camera, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{camera.id}</TableCell>
                      <TableCell>{camera.zone}</TableCell>
                      <TableCell>{camera.name}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="icon"
                          variant="ghost"
                          type="button"
                          onClick={() =>
                            flyTo({
                              latitude: camera.latitude,
                              longitude: camera.longitude,
                              zoom: 16,
                            })
                          }
                        >
                          <Navigation className="size-3.5 shrink-0" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
