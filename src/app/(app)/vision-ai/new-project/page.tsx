'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { models } from '@/assets/models'
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

import {
  type ProjectForm,
  projectFormSchema,
} from '../components/schemas/project-schema'

export default function Page() {
  const { register, control } = useForm<ProjectForm>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      active: true,
    },
  })
  return (
    <form className="flex flex-col gap-2 h-full px-1 py-2">
      <div className="h-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/vision-ai">Projetos</BreadcrumbLink>
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
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="secondary">Criar Projeto</Button>
        <Button variant="ghost">Candelar</Button>
      </div>
    </form>
  )
}
