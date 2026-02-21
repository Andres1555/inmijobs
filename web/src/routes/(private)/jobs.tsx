import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/jobs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(private)/jobs"!</div>
}
