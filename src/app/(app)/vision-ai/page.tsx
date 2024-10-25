'use client'
import { Pencil } from 'lucide-react'
import Link from 'next/link'

import { projects } from '@/assets/projects'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToastHandler } from '@/utils/others/toast-handler'

export default function SidePanel() {
  useToastHandler()

  return (
    <div className="w-full px-4 py-2 space-y-4">
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
                {project.active ? (
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
                <Link href={`/vision-ai/${project.id}`}>
                  <Pencil className="size-4 shrink-0" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
