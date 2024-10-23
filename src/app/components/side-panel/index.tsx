'use client'
import { Edit, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Camera, Project } from '@/models/entities'

const models = [
  { id: '4', name: 'Detecção de Pessoas' },
  { id: '1', name: 'Detecção de Veículos' },
  { id: '2', name: 'Reconhecimento Facial' },
  { id: '3', name: 'Contagem de Pessoas' },
]

interface SidePanelProps {
  selectedCameras: Camera[]
  setSelectedCameras: (cameras: Camera[]) => void
  projects: Project[]
  setProjects: (projects: Project[]) => void
  iconColors: Record<string, { label: string; hex: string }>
}
export function SidePanel({
  selectedCameras,
  setSelectedCameras,
  projects,
  setProjects,
  iconColors,
}: SidePanelProps) {
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [projectName, setProjectName] = useState<string>('')
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('#4f4f4f')

  const handleCreateOrUpdateProject = () => {
    if (
      projectName &&
      selectedModel &&
      selectedCameras.length > 0 &&
      selectedColor
    ) {
      if (editingProject) {
        setProjects(
          projects.map((p) =>
            p.id === editingProject.id
              ? {
                  ...p,
                  name: projectName,
                  model: selectedModel,
                  cameras: selectedCameras,
                  color: selectedColor,
                }
              : p,
          ),
        )
        setEditingProject(null)
      } else {
        const newProject = {
          id: (projects.length + 1).toString(),
          name: projectName,
          model: selectedModel,
          cameras: selectedCameras,
          color: selectedColor,
        }
        setProjects([...projects, newProject])
      }
      setProjectName('')
      setSelectedModel(null)
      setSelectedCameras([])
    }
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setProjectName(project.name)
    setSelectedModel(project.model)
    setSelectedCameras(project.cameras)
  }

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((p) => p.id !== projectId))
  }

  useEffect(() => {
    if (!editingProject) {
      setProjectName('')
      setSelectedModel(null)
      setSelectedCameras([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingProject])

  return (
    <div className="w-[600px] px-4 py-2">
      <h2 className="text-xl font-semibold mb-4">
        {editingProject ? 'Editar Projeto' : 'Criar Projeto'}
      </h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="projectName">Nome do Projeto</Label>
          <Input
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Digite o nome do projeto"
          />
        </div>
        <div>
          <Label htmlFor="modelSelect">Selecione o Modelo</Label>
          <Select
            onValueChange={(value) => setSelectedModel(value)}
            value={selectedModel || undefined}
          >
            <SelectTrigger id="modelSelect">
              <SelectValue placeholder="Selecione um modelo" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id.toString()}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="modelSelect">Selecione a Cor</Label>
          <Select
            onValueChange={(value) => setSelectedColor(value)}
            value={selectedColor || undefined}
          >
            <SelectTrigger id="colorSelect">
              <SelectValue placeholder="Selecione uma cor" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {Object.entries(iconColors).map(([key, value]) => (
                <SelectItem key={key} value={key} className="">
                  <div className="flex gap-2 items-center">
                    <div
                      className="size-3.5 bg-red-500 flex items-center justify-center"
                      style={{ backgroundColor: value.hex }}
                    />
                    <span className="font-medium inline-block">
                      {value.label}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* <div>
          <Label htmlFor="color">Cor</Label>
          <Input
            id="color"
            type="color"
            defaultValue={selectedColor}
            onChange={(e) => {
              setSelectedColor(e.target.value)
            }}
          />
        </div> */}
        <div>
          <Label>Câmeras Selecionadas: {selectedCameras.length}</Label>
        </div>
        <Button
          onClick={handleCreateOrUpdateProject}
          disabled={
            !projectName || !selectedModel || selectedCameras.length === 0
          }
        >
          {editingProject ? 'Atualizar Projeto' : 'Criar Projeto'}
        </Button>
        {editingProject && (
          <Button variant="outline" onClick={() => setEditingProject(null)}>
            Cancelar Edição
          </Button>
        )}
      </div>

      <ScrollArea className="h-[calc(100vh-400px)] mt-8">
        <h2 className="text-xl font-semibold mb-2">Projetos</h2>
        <div className="space-y-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 bg-card rounded flex justify-between items-center"
              style={{
                backgroundColor: `${iconColors[project.color as keyof typeof iconColors].hex}80`, // Adding opacity
              }}
            >
              <div>
                <h3 className="font-semibold">{project.name}</h3>
                <p>
                  Modelo:{' '}
                  {models.find((m) => m.id.toString() === project.model)?.name}
                </p>
                <p>Câmeras: {project.cameras.length}</p>
              </div>
              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditProject(project)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
