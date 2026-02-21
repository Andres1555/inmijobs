import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from "react"
import type { SubmitEventHandler } from "react";
import { authClient } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const inputClass = "w-full px-4 py-3.5 border-2 border-[#E5E7EB] rounded-xl text-[16px] bg-white text-[#1F2937] placeholder:text-[#9CA3AF] focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/10 transition-all"
const btnPrimaryClass = "w-full py-4 rounded-xl font-bold text-base cursor-pointer bg-linear-to-r from-[#F97316] to-[#8B5CF6] text-white hover:from-[#EA580C] hover:to-[#7C3AED] shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200"

export const Route = createFileRoute('/(auth)/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await authClient.signUp.email({ ...form }, {
        onSuccess: () => navigate({ to: "/signin" }),
        onError: (ctx) => alert(ctx.error.message),
      })
    } catch {
      setError("Error al crear la cuenta. Por favor, intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#FFF3E6] to-[#F3E8FF] flex items-center justify-center p-4 relative">
      <div className="w-full max-w-md relative">
        <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center mb-4 relative">
                <img src="/imagotipo.png" className="w-20" />
              </div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-[#F97316] to-[#8B5CF6] bg-clip-text text-transparent">InmiJobs</h1>
              <p className="text-[#6B7280] mt-3 text-lg">Conectando talento con oportunidades</p>
            </div>
            {["name", "email", "password"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-[#6B7280] mb-2">
                  {field === "name" ? "Nombre de Usuario" : field === "email" ? "Correo Electrónico" : "Contraseña"}
                </label>
                <Input
                  type={field === "email" ? "email" : field === "password" ? "password" : "text"}
                  placeholder={field === "name" ? "Juan Pérez" : field === "email" ? "ejemplo@correo.com" : "••••••••"}
                  value={form[field as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  required
                  className={inputClass}
                />
              </div>
            ))}
            {error && <div className="bg-[#FEF2F2] border border-[#EF4444]/30 rounded-xl p-4"><p className="text-[#EF4444] text-sm text-center">{error}</p></div>}
            <Button type="submit" disabled={loading} className={btnPrimaryClass}>
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-[#6B7280]">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/signin" className="font-bold bg-linear-to-r from-[#F97316] to-[#8B5CF6] bg-clip-text text-transparent hover:from-[#EA580C] hover:to-[#7C3AED]">Iniciar Sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
