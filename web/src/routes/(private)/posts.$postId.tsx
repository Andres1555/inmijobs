import { useState } from 'react'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, Info, Send, X } from 'lucide-react'
import { authClient } from '@/lib/auth'

export const Route = createFileRoute('/(private)/posts/$postId')({
  component: PostDetailPage,
})

const MOCK_POST = {
  author: {
    name: "¿Qué hay Venezolana?",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300"
  },
  content: "¡Familia! ¿Listos para invertir? Casa en Mérida, full equipada.",
  highlight: "¡Nuevo hogar, nuevas oportunidades!",
  images: [
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/612539413.jpg?k=694c6b6a195695d8a7c92c6ba197401ff1505769d97c9d7844dde8154bfb32f7&o=",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/405785137.jpg?k=185cdd5402bf9e37423490236ae3f5e350577a4a563d2a40d33aeefe7b4d634c&o=",
    "https://www.corpovigui.com/exportacao/fotos/20210308T1814500400-261089679.jpg"
  ]
}

function PostDetailPage() {
  const { postId } = Route.useParams()
  const router = useRouter()
  
  // 1. Obtenemos los datos del usuario logueado
  const { data: session } = authClient.useSession()
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState<Array<string>>([])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MOCK_POST.images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + MOCK_POST.images.length) % MOCK_POST.images.length)
  }

  const handleSendComment = () => {
    if (!commentText.trim()) return
    setComments([...comments, commentText])
    setCommentText("")
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col md:flex-row overflow-hidden">
      <button 
        onClick={() => router.history.back()}
        className="absolute top-4 left-4 z-10 p-2 bg-gray-800/50 hover:bg-gray-800 text-white rounded-full transition cursor-pointer"
      >
        <X size={24} />
      </button>

      <div className="flex-1 bg-black flex items-center justify-center p-4 relative group">
        {MOCK_POST.images.length > 1 && (
          <>
            <button onClick={handlePrev} className="absolute left-4 p-3 rounded-full text-white bg-black/20 hover:bg-black/40 z-10 transition cursor-pointer">
              <ChevronLeft size={32} />
            </button>
            <button onClick={handleNext} className="absolute right-4 p-3 rounded-full text-white bg-black/20 hover:bg-black/40 z-10 transition cursor-pointer">
              <ChevronRight size={32} />
            </button>
          </>
        )}
        <img src={MOCK_POST.images[currentIndex]} alt="Post" className="max-w-full max-h-screen object-contain shadow-2xl" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
          {currentIndex + 1} / {MOCK_POST.images.length}
        </div>
      </div>

      <div className="w-full md:w-112.5 flex flex-col h-full bg-white border-l border-gray-100">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3 mb-4">
            <img src={MOCK_POST.author.avatar} className="w-10 h-10 rounded-full border" alt="Avatar" />
            <div>
              <h3 className="font-bold text-sm leading-tight">{MOCK_POST.author.name}</h3>
              <p className="text-xs text-gray-400">ID de publicación: {postId}</p>
            </div>
          </div>
          <div className="text-sm text-gray-800">
            <p>{MOCK_POST.content}</p>
            <p className="font-medium text-blue-600">{MOCK_POST.highlight}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 flex flex-col gap-3">
          {comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Info size={48} className="mb-2 opacity-20" />
              <p className="text-sm font-semibold text-gray-500">Todavía no hay comentarios</p>
            </div>
          ) : (
            comments.map((text, index) => (
              <div key={index} className="flex gap-2 animate-in fade-in slide-in-from-bottom-2">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-200">
                   <img 
                    src={session?.user.image || `https://ui-avatars.com/api/?name=${session?.user.name}`} 
                    alt="User" 
                    className="w-full h-full object-cover"
                   />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm max-w-[85%]">
                  <p className="text-xs font-bold text-gray-700 mb-0.5">{session?.user.name || 'Usuario'}</p>
                  <p className="text-sm text-gray-800 wrap-break-word">{text}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <input 
              type="text" 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendComment()}
              placeholder="Escribe un comentario..." 
              className="flex-1 bg-transparent border-none outline-none text-sm"
            />
            <button 
              onClick={handleSendComment}
              disabled={!commentText.trim()}
              className="text-blue-600 hover:scale-110 transition-transform disabled:text-gray-300 cursor-pointer"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}