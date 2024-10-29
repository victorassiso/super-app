'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { models } from '@/assets/models'
import { projects } from '@/assets/projects'
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
import { redirect } from '@/utils/others/redirect'

import {
  type ProjectForm,
  projectFormSchema,
} from '../../components/schemas/project-schema'
import { setToastDataCookie } from './actions'

export default function ProjectDetails() {
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const id = pathname.replace('/vision-ai/project/', '')
  const project = projects.find((project) => project.id === id)

  // TODO: Implementar a lógica de busca do projeto
  useEffect(() => {
    async function handleRedirect() {
      await setToastDataCookie({
        type: 'error',
        message: `O projeto de id=${id} não existe.`,
      })

      redirect('/vision-ai')
      setLoading(false)
    }

    if (!project) {
      handleRedirect()
    } else {
      setLoading(false)
    }
  }, [])

  const { handleSubmit, register, control } = useForm<ProjectForm>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: project!.name,
      description: project!.description,
      model: {
        id: project!.model!.id,
        name: project!.model!.name,
      },
    },
  })

  function onSubmit(data: ProjectForm) {
    // TODO: Implementar a lógica de atualização do projeto
    console.log(data)
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
              <BreadcrumbLink href="/vision-ai">Projetos</BreadcrumbLink>
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
                  defaultValue={field.value?.id}
                >
                  <SelectTrigger id="model" className="w-full">
                    <SelectValue placeholder="Selecione um modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {models.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
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
              name="active"
              render={({ field }) => (
                <Switch
                  id="active"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
        <div className="">
          {/* TODO: Tabela/Lista de câmeras + botão para navegar para localização */}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="secondary">Atualizar Projeto</Button>
        <Button variant="ghost">Candelar Edição</Button>
      </div>
    </form>
  )
}
