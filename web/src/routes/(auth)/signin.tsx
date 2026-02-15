import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from "react"
import { authClient } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const inputClass = "w-full px-4 py-3.5 border-2 border-[#E5E7EB] rounded-xl text-[16px] bg-white text-[#1F2937] placeholder:text-[#9CA3AF] focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/10 transition-all"
const btnPrimaryClass = "w-full py-4 rounded-xl font-bold text-base cursor-pointer bg-gradient-to-r from-[#F97316] to-[#8B5CF6] text-white hover:from-[#EA580C] hover:to-[#7C3AED] shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200"
const btnOutlineClass = "py-3.5 rounded-xl border-2 border-[#E5E7EB] bg-white text-[#1F2937] hover:border-[#F97316] hover:bg-[#FFF3E6] font-medium transition-all group"

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

const GoogleIcon = () => <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>

const LinkedInIcon = () => <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>

export const Route = createFileRoute('/(auth)/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
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
            <p className="text-[#6B7280]">¿No tienes una cuenta?{" "}<Link to="/signup" className="font-bold bg-gradient-to-r from-[#F97316] to-[#8B5CF6] bg-clip-text text-transparent hover:from-[#EA580C] hover:to-[#7C3AED]">Regístrate gratis</Link></p>
          </div>
        </div>
        <p className="text-center text-xs text-[#9CA3AF] mt-6">Protegemos tus datos como si fueran nuestros.</p>
      </div>
    </div>
  )
}
