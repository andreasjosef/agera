import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/today')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/today"!</div>
}
