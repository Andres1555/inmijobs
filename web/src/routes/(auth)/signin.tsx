import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from "react"
import type { SubmitEventHandler } from "react";
import { authClient } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import GoogleIcon from '@/components/svg/GoogleIcon'
import LinkedInIcon from '@/components/svg/LinkedInIcon'

const inputClass = "w-full px-4 py-3.5 border-2 border-[#E5E7EB] rounded-xl text-[16px] bg-white text-[#1F2937] placeholder:text-[#9CA3AF] focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/10 transition-all"
const btnPrimaryClass = "w-full py-4 rounded-xl font-bold text-base cursor-pointer bg-linear-to-r from-[#F97316] to-[#8B5CF6] text-white hover:from-[#EA580C] hover:to-[#7C3AED] shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200"
const btnOutlineClass = "py-3.5 rounded-xl border-2 border-[#E5E7EB] bg-white text-[#1F2937] hover:border-[#F97316] hover:bg-[#FFF3E6] font-medium transition-all group"

export const Route = createFileRoute('/(auth)/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await authClient.signIn.email({ ...form }, {
        onSuccess: () => navigate({ to: "/" }),
        onError: (ctx) => setError(ctx.error.message),
      })
    } catch {
      setError("Correo o contraseña inválidos. Por favor, intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: "google" | "linkedin") => {
    try { await authClient.signIn.social({ provider }) }
    catch { setError(`Error al iniciar sesión con ${provider === "linkedin" ? "LinkedIn" : "Google"}. Por favor, intenta de nuevo.`) }
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

            <div>
              <label className="block text-sm font-semibold text-[#6B7280] mb-2">Correo Electrónico</label>
              <Input type="email" placeholder="ejemplo@correo.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#6B7280] mb-2">Contraseña</label>
              <Input type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required className={inputClass} />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 text-[#F97316] border-[#E5E7EB] rounded focus:ring-[#F97316]" />
                <span className="text-sm text-[#6B7280]">Recordarme</span>
              </label>
              <span className="text-sm font-semibold text-[#F97316] hover:text-[#8B5CF6] transition-colors cursor-pointer">¿Olvidaste tu contraseña?</span>
            </div>
            {error && <div className="bg-[#FEF2F2] border border-[#EF4444]/30 rounded-xl p-4"><p className="text-[#EF4444] text-sm text-center">{error}</p></div>}
            <Button type="submit" disabled={loading} className={btnPrimaryClass}>{loading ? "Iniciando sesión..." : "Iniciar Sesión"}</Button>
          </form>

          <div className="mt-6">
            <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E5E7EB]"></div></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-[#6B7280] font-medium">O continúa con</span></div></div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button type="button" variant="outline" onClick={() => handleSocialLogin("google")} className={btnOutlineClass}><GoogleIcon />Google</Button>
              <Button type="button" variant="outline" onClick={() => handleSocialLogin("linkedin")} className={btnOutlineClass}><LinkedInIcon />LinkedIn</Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[#6B7280]">¿No tienes una cuenta?{" "}<Link to="/signup" className="font-bold bg-linear-to-r from-[#F97316] to-[#8B5CF6] bg-clip-text text-transparent hover:from-[#EA580C] hover:to-[#7C3AED]">Regístrate gratis</Link></p>
          </div>
        </div>
        <p className="text-center text-xs text-[#9CA3AF] mt-6">Protegemos tus datos como si fueran nuestros.</p>
      </div>
    </div>
  )
}
