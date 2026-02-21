import { Bell, Briefcase, ChevronDown, MoreHorizontal, Plus, Search } from 'lucide-react'

export const Aside2 = () => {
  return (
    <aside className="w-80 hidden lg:flex flex-col gap-6 pl-2 h-full sticky top-0 border-l border-[#E5E7EB] bg-white/80 backdrop-blur-md">
      <section className="flex flex-col gap-1 p-4">
        <div className="flex items-center justify-between text-gray-500 mb-2">
          <h3 className="font-semibold">Contactos</h3>
          <div className="flex gap-2">
            <Search size={18} className="cursor-pointer hover:text-black" />
            <MoreHorizontal size={18} className="cursor-pointer hover:text-black" />
          </div>
        </div>
        <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
          <div className="relative">
            <img src="https://images.mubicdn.net/images/cast_member/159438/cache-430279-1556077245/image-w856.jpg?size=300x" className="w-10 h-10 rounded-full" alt="Eduardo" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <span className="font-medium text-gray-700 text-sm">Eduardo Crespo</span>
        </div>
        <hr className="border-gray-300" />
        <div className="flex items-center justify-between text-gray-500 mb-2">
          <h3 className="font-semibold">Amigos</h3>
        </div>
        <div className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
          <div className="flex items-center gap-3">
            <img src="https://fotografias.lasexta.com/clipping/cmsimages01/2023/10/02/E7633736-8F43-46EF-AB0E-169330813188/amigos_97.jpg?crop=1254,705,x0,y65&width=1600&height=900&optimize=high&format=webply" className="w-10 h-10 rounded-full" alt="Chat" />
            <span className="font-medium text-gray-700 text-sm">Chat de npo</span>
          </div>
          <ChevronDown size={18} />
        </div>
        <hr className="border-gray-300" />
        <div className="flex justify-end gap-4 mt-2 text-gray-400">
          <Bell size={18} className="hover:text-blue-600" />
          <Plus size={18} className="hover:text-blue-600" />
        </div>
      </section>
      <section className="flex flex-col gap-3 pl-2">
        <div className="flex items-center justify-between text-gray-500 mb-2">
          <h3 className="font-semibold">Chats</h3>
        </div>
        <div className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
          <div className="flex items-center gap-3">
            <img src="https://fotografias.lasexta.com/clipping/cmsimages01/2023/10/02/E7633736-8F43-46EF-AB0E-169330813188/amigos_97.jpg?crop=1254,705,x0,y65&width=1600&height=900&optimize=high&format=webply" className="w-10 h-10 rounded-full" alt="Chat" />
            <span className="font-medium text-gray-700 text-sm">Chear chat en grupo</span>
          </div>
          <ChevronDown size={18} />
        </div>

        <hr className="border-gray-300" />
        <h3 className="font-bold text-gray-800">Oportunidades Destacadas</h3>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Briefcase size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm leading-tight">
                Desarrollador Web - Remoto 🇻🇪
              </h4>
              <p className="text-xs text-gray-400 mt-1">Full-time</p>
            </div>
          </div>
          <div className="flex justify-end">
            <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Híbrido
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2">
          <div className="flex gap-3">
            <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
              <Briefcase size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 text-sm">Gerente de Proyectos</h4>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs font-semibold text-gray-500">$35-45/hora</span>
                <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-1 rounded-full">
                  Híbrido
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </aside>
  )
}
