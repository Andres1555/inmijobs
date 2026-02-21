import { authClient } from "@/lib/auth"

export const Stories = () => {
  const session = authClient.useSession()
  const user = session.data?.user

  return (
    <section className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      <section className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <div className="min-w-27.5 w-27.5 h-45 shrink-0 relative rounded-2xl overflow-hidden border border-gray-200 group cursor-pointer bg-gray-100">

          <div className="h-[75%] w-full overflow-hidden">
            <img
              src={user?.image || undefined}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 text-transparent"
              alt="Tu perfil"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
          </div>

          <div className="absolute bottom-0 inset-x-0 h-[25%] bg-white flex flex-col items-center justify-end pb-2">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 p-1.5 rounded-full border-4 border-white shadow-sm transition-transform group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>

            <span className="text-[11px] font-semibold text-gray-800">Crear historia</span>
          </div>
        </div>

      </section>
      <div className="min-w-27.5 w-27.5 h-45 shrink-0 relative rounded-2xl overflow-hidden cursor-pointer group bg-gray-200">

        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=400&fit=crop"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          alt="Story"
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/40" />

        <div className="absolute top-2 left-2">
          <div className="border-2 border-blue-600 rounded-full p-0.5 bg-white">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=400&fit=crop"
              className="w-8 h-8 rounded-full object-cover"
              alt="Avatar"
            />
          </div>
        </div>

        <span className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-bold leading-tight drop-shadow-md">
          No soy una multicuentas
        </span>
      </div>

    </section>
  )
}
