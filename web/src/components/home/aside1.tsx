import { Link } from '@tanstack/react-router'
import {
  Image as ImageIcon,
  MessageSquare,
  Newspaper,
  Settings,
  UserCircle,
  Users
} from 'lucide-react'
import { authClient } from '@/lib/auth'

export const Aside1 = () => {
  const session = authClient.useSession()
  const user = session.data?.user

  const menuItems = [
    { label: 'News Feed', icon: Newspaper, to: '/home', badge: 1 },
    { label: 'Messages', icon: MessageSquare, to: '/messages', badge: 6 },
    { label: 'Forums', icon: Users, to: '/forums', badge: 2 },
    { label: 'Friends', icon: UserCircle, to: '/friends', badge: 3 },
    { label: 'Media', icon: ImageIcon, to: '/media', badge: 1 },
    { label: 'Settings', icon: Settings, to: '/settings' },
  ]

  return (
    <aside className="w-full flex flex-col gap-4 p-4 sticky top-0 h-full border-r border-[#E5E7EB] bg-white/80 backdrop-blur-md">
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-35 mb-4">
          <div className="absolute">
            <div className="rounded-full w-20 h-20 bg-linear-to-tr from-purple-400/50 to-blue-400/50" />
          </div>
          <div className="w-fit ml-auto relative">
            <div
              className="w-20 h-20 rounded-full border-0 bg-linear-to-tr from-purple-400/50 to-blue-400/50 text-transparent p-1"
            >
              <img
                src={user?.image || undefined}
                className="w-full h-full rounded-full object-cover opacity-100"
                alt="Profile"
              />
            </div>
            <img className="object-cover absolute bottom-0 translate-y-1/2 left-1/2 size-10 rounded-full border border-white" src="https://upload.wikimedia.org/wikipedia/commons/0/06/Flag_of_Venezuela.svg" alt="Badge 1" />
            <img className="object-cover absolute bottom-0 translate-y-1/2 left-3/4 size-10 rounded-full border border-white" src="https://s1.significados.com/foto/bandera-de-canada-cke.jpg?class=article" alt="Badge 2" />
          </div>

        </div>
        <h2 className="font-bold mt-2 text-gray-800">{user?.name}</h2>
        <p className="text-sm text-gray-400">@{user?.name}</p>
      </div>

      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium text-gray-600 hover:bg-gray-100"
            activeProps={{
              className: "!bg-black !text-white",
            }}
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} />
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${'bg-gray-200 text-gray-700 group-active:bg-white'
                }`}>
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="mt-auto p-4 bg-gray-50 rounded-3xl border border-dashed border-gray-300 flex flex-col items-center text-center">
        <div className="inline-flex items-center justify-center relative size-16 mb-6">
          <img src="/imagotipo.png" className="w-20" />
        </div>
        <p className="font-bold text-gray-800">Download</p>
      </div>
    </aside>
  )
}
