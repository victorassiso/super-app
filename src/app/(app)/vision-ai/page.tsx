import { Pencil, Plus } from 'lucide-react'
import Link from 'next/link'

import { Tooltip } from '@/components/custom/tooltip'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getProjectsAction } from '@/server-cache/projects'
import { ToastHandler } from '@/utils/others/toast-handler'

export default async function SidePanel() {
  const projects = await getProjectsAction()

  return (
    <div className="relative w-full h-full px-1 py-2 space-y-4">
      <ToastHandler />
      <h3 className="text-2xl font-bold">Projetos</h3>
      <div className="space-y-2">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="p-6 flex justify-between items-center"
          >
            <div className="flex gap-1 flex-col">
              <span className="block">{project.name}</span>
              <span className="block">{project.model}</span>
              <div>
                {project.enabled ? (
                  <span className="bg-emerald-600 px-2 py-1 rounded-full">
                    Ativo
                  </span>
                ) : (
                  <span className="bg-orange-600 px-2 py-1 rounded-full">
                    Inativo
                  </span>
                )}
              </div>
            </div>
            <div>
              <Button className="" variant="outline" size="icon" asChild>
                <Link href={`/vision-ai/project/${project.id}`}>
                  <Pencil className="size-4 shrink-0" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <Tooltip asChild text="Novo Projeto">
        <Button
          className="absolute right-0 bottom-2"
          variant="secondary"
          size="icon"
          asChild
        >
          <Link href="/vision-ai/new-project">
            <Plus className="size-4 shrink-0" />
          </Link>
        </Button>
      </Tooltip>
    </div>
  )
}
