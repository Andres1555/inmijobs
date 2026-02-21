import { createFileRoute } from '@tanstack/react-router'
import { Aside1 } from '@/components/home/aside1'
import { Aside2 } from '@/components/home/aside2'
import { Main } from '@/components/home/main'

export const Route = createFileRoute('/(private)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="flex-1 grid grid-cols-2 md:grid-cols-[2fr_6fr_auto]">
      <Aside1 />
      <Main />
      <Aside2 />
    </main>
  )
}
