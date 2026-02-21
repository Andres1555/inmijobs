import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { BriefcaseBusiness, ChevronDown, LogOut, Search, Settings, User, Users } from 'lucide-react'
import { authClient } from "@/lib/auth"

export function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()

  const { data: session } = authClient.useSession()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: "/signin" })
        }
      }
    })
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#E5E7EB] bg-white/80 backdrop-blur-md px-4 md:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-6 flex-1">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="inline-flex items-center justify-center relative size-10">
            <img src="/imagotipo.png" className="w-20" />
          </div>
          <span className="text-xl font-bold hidden md:block bg-linear-to-r from-[#F97316] to-[#8B5CF6] bg-clip-text text-transparent">
            InmiJobs
          </span>
        </Link>

        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Buscar empleos, comunidades..."
            className="w-full bg-[#F3F4F6] border-2 border-transparent rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#F97316] focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <nav className="flex items-center gap-1 md:gap-2 mr-2">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#FFF3E6] text-[#6B7280] hover:text-[#F97316] text-sm font-semibold transition-all">
            <Users className="h-4 w-4" />
            <span className="hidden lg:block">Comunidades</span>
          </Link>
          <Link to="/jobs" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#F3E8FF] text-[#6B7280] hover:text-[#8B5CF6] text-sm font-semibold transition-all">
            <BriefcaseBusiness className="h-4 w-4" />
            <span className="hidden lg:block">Empleos</span>
          </Link>
        </nav>

        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 rounded-full border-2 border-[#E5E7EB] hover:border-[#F97316] transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-[#F97316]/20 to-[#8B5CF6]/20 flex items-center justify-center">
              <User className="h-5 w-5 text-[#F97316]" />
            </div>
            <p className="text-sm font-bold text-gray-500">
              {session?.user.name || 'Mi Perfil'}
            </p>
            <ChevronDown className={`h-4 w-4 text-[#6B7280] transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
              <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-[#E5E7EB] bg-white shadow-2xl z-20 py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-3 border-b border-[#E5E7EB] bg-[#F9FAFB]">
                  <p className="text-sm font-bold text-[#1F2937]">
                    {session?.user.name || 'Mi Perfil'}
                  </p>
                  <p className="text-xs text-[#6B7280] truncate">
                    {session?.user.email || 'Cargando correo...'}
                  </p>
                </div>

                <div className="p-2 space-y-1">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl hover:bg-[#F3F4F6] transition-colors text-left text-[#4B5563]">
                    <Settings className="h-4 w-4" />
                    Configuración de cuenta
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold rounded-xl text-[#EF4444] hover:bg-[#FEF2F2] transition-colors text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
