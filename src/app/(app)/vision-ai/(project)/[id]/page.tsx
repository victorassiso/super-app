'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

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
import { redirect } from '@/utils/others/redirect'

import { setToastDataCookie } from './actions'

export default function ProjectDetails() {
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const id = pathname.replace('/vision-ai/', '')
  const project = projects.find((project) => project.id === id)

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

  return loading ? (
    <Spinner />
  ) : (
    <div>
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
    </div>
  )
}
