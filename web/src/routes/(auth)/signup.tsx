import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from "react"
import { authClient } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const inputClass = "w-full px-4 py-3.5 border-2 border-[#E5E7EB] rounded-xl text-[16px] bg-white text-[#1F2937] placeholder:text-[#9CA3AF] focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/10 transition-all"
const btnPrimaryClass = "w-full py-4 rounded-xl font-bold text-base cursor-pointer bg-gradient-to-r from-[#F97316] to-[#8B5CF6] text-white hover:from-[#EA580C] hover:to-[#7C3AED] shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200"

const GeometricPattern = () => (
  <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none overflow-hidden">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="geometric-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="2" fill="#F97316" />
          <circle cx="40" cy="30" r="3" fill="#8B5CF6" />
          <path d="M30 10L35 20L25 20L30 10Z" fill="#F97316" opacity="0.3" />
          <path d="M50 40L55 50L45 50L50 40Z" fill="#8B5CF6" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
    </svg>
  </div>
)

const WaveDecoration = () => (
  <div className="absolute bottom-0 left-0 right-0 -z-10">
    <svg viewBox="0 0 1440 320" className="w-full h-auto opacity-10">
      <path fill="#F97316" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
      <path fill="#8B5CF6" d="M0,192L48,197.3C96,203,192,213,288,197.3C384,181,480,139,576,128C672,117,768,139,864,154.7C960,171,1056,181,1152,176C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" opacity="0.5" />
    </svg>
  </div>
)

export const Route = createFileRoute('/(auth)/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
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
    <div className="min-h-screen bg-gradient-to-br from-[#FFF3E6] to-[#F3E8FF] flex items-center justify-center p-4 relative">
      <GeometricPattern />
      <WaveDecoration />
      <div className="w-full max-w-md relative">
        <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#F97316] to-[#8B5CF6] rounded-2xl blur-xl opacity-30"></div>
                <div className="w-20 h-20 bg-gradient-to-br from-[#F97316] to-[#8B5CF6] rounded-2xl shadow-xl flex items-center justify-center relative">
                  <span className="text-white text-4xl font-bold">IJ</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#F97316] to-[#8B5CF6] bg-clip-text text-transparent">InmiJobs</h1>
              <p className="text-[#6B7280] mt-3 text-lg">Crea tu cuenta</p>
            </div>
            {["name", "email", "password"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-[#6B7280] mb-2">
                  {field === "name" ? "Nombre Completo" : field === "email" ? "Correo Electrónico" : "Contraseña"}
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
              <Link to="/signin" className="font-bold bg-gradient-to-r from-[#F97316] to-[#8B5CF6] bg-clip-text text-transparent hover:from-[#EA580C] hover:to-[#7C3AED]">Iniciar Sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
