import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { FaLightbulb, FaSadTear } from "react-icons/fa"
import { FaFaceLaughSquint } from "react-icons/fa6"
import { Heart, Info, MessageCircle, MoreHorizontal, ThumbsUp } from "lucide-react"

const REACTIONS = [
    { id: 'like', icon: ThumbsUp, color: 'text-blue-600', bg: 'bg-blue-600', label: 'Me gusta', library: 'lucide' },
    { id: 'love', icon: Heart, color: 'text-red-500', bg: 'bg-red-500', label: 'Me encanta', library: 'lucide' },
    { id: 'inspiring', icon: FaLightbulb, color: 'text-yellow-500', bg: 'bg-yellow-500', label: 'Inspirador', library: 'fa' },
    { id: 'funny', icon: FaFaceLaughSquint, color: 'text-orange-400', bg: 'bg-orange-400', label: 'Me divierte', library: 'fa' },
    { id: 'sad', icon: FaSadTear, color: 'text-gray-500', bg: 'bg-gray-500', label: 'Me entristece', library: 'fa' },
]

export const ShowPosts = () => {
    const [selectedReaction, setSelectedReaction] = useState<typeof REACTIONS[0] | null>(null)
    const [showReactions, setShowReactions] = useState(false)
    const [totalLikes, setTotalLikes] = useState(12)
    const navigate = useNavigate()

    const handleViewDetail = () => {
        navigate({ to: '/posts/$postId' as any, params: { postId: '1' } as any })
    }

    const handleMainButtonClick = () => {
        if (selectedReaction) {
            setSelectedReaction(null)
            setTotalLikes(prev => prev - 1)
        } else {
            setSelectedReaction(REACTIONS[0])
            setTotalLikes(prev => prev + 1)
        }
    }

    const handleSelectReaction = (reac: typeof REACTIONS[0]) => {
        if (selectedReaction?.id === reac.id) {
            setSelectedReaction(null)
            setTotalLikes(prev => prev - 1)
        } else {
            if (!selectedReaction) setTotalLikes(prev => prev + 1)
            setSelectedReaction(reac)
        }
        setShowReactions(false)
    }

    return (
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
            <div className="p-4 flex justify-between items-center">
                <div className="flex gap-3 items-center cursor-pointer" onClick={handleViewDetail}>
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300" className="w-10 h-10 rounded-full object-cover border border-gray-100" alt="Avatar" />
                    <div>
                        <h4 className="font-bold text-gray-800 text-sm leading-none mb-1">¿Qué hay Venezolana?</h4>
                        <p className="text-[10px] text-gray-400">Vereshodloak · 🌎</p>
                    </div>
                </div>
                <MoreHorizontal size={20} className="text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>

            <div className="grid grid-cols-3 gap-0.5 bg-gray-200 w-full cursor-pointer" onClick={handleViewDetail}>
                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/612539413.jpg?k=694c6b6a195695d8a7c92c6ba197401ff1505769d97c9d7844dde8154bfb32f7&o=" className="w-full aspect-square object-cover" alt="img1" />
                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/405785137.jpg?k=185cdd5402bf9e37423490236ae3f5e350577a4a563d2a40d33aeefe7b4d634c&o=" className="w-full aspect-square object-cover" alt="img2" />
                <img src="https://www.corpovigui.com/exportacao/fotos/20210308T1814500400-261089679.jpg" className="w-full aspect-square object-cover" alt="img3" />
            </div>

            <div className="p-4 text-sm text-gray-800">
                <p>¡Familia! ¿Listos para invertir? Casa en Mérida, full equipada.</p>
                <p className="font-medium text-blue-600">¡Nuevo hogar, nuevas oportunidades!</p>
            </div>

            <div className="px-4 py-2 flex items-center justify-between border-t border-gray-50">
                <div className="flex items-center gap-1.5">
                    <div className="flex -space-x-1">
                        <div className="bg-blue-500 rounded-full p-1 border border-white z-10 shadow-sm">
                            <ThumbsUp size={10} className="text-white fill-current" />
                        </div>
                        <div className="bg-red-500 rounded-full p-1 border border-white z-0 shadow-sm">
                            <Heart size={10} className="text-white fill-current" />
                        </div>
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium">{totalLikes}</span>
                </div>
                <div className="text-[11px] text-gray-400">5 comentarios</div>
            </div>

            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-50 bg-gray-50/30 relative">
                
                <div 
                    className={`absolute bottom-full left-4 mb-2 bg-white border border-gray-100 rounded-full shadow-2xl p-1.5 flex gap-2 transition-all duration-300 origin-bottom-left z-20 ${showReactions ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-4'}`}
                    onMouseLeave={() => setShowReactions(false)}
                >
                    {REACTIONS.map((reac) => (
                        <button
                            key={reac.id}
                            onClick={() => handleSelectReaction(reac)}
                            className={`p-2 rounded-full hover:bg-gray-100 transition-all hover:scale-150 ${reac.color} cursor-pointer group flex flex-col items-center`}
                        >
                            <reac.icon 
                                size={reac.library === 'fa' ? 20 : 22} 
                                {...(reac.library === 'lucide' ? { fill: selectedReaction?.id === reac.id ? 'currentColor' : 'none' } : {})} 
                            />
                            <span className="absolute -top-8 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {reac.label}
                            </span>
                        </button>
                    ))}
                </div>

                <button 
                    onMouseEnter={() => setShowReactions(true)}
                    onClick={handleMainButtonClick}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all active:scale-95 cursor-pointer ${selectedReaction ? 'bg-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    <div className={`${selectedReaction ? selectedReaction.bg : 'bg-gray-400'} p-1 rounded-full shadow-sm transition-colors flex items-center justify-center`}>
                        {selectedReaction ? (
                            <selectedReaction.icon size={12} className="text-white fill-current" />
                        ) : (
                            <ThumbsUp size={12} className="text-white fill-current" />
                        )}
                    </div>
                    <span className={`text-sm font-bold ${selectedReaction?.color || 'text-gray-600'}`}>
                        {selectedReaction ? selectedReaction.label : 'Me gusta'}
                    </span>
                </button>

                <div className="flex gap-2">
                    <button onClick={handleViewDetail} className="p-2.5 text-blue-600 hover:bg-blue-600 hover:text-white transition-all rounded-full border border-blue-100 bg-white shadow-sm cursor-pointer">
                        <MessageCircle size={18} />
                    </button>
                    <button className="p-2.5 text-blue-600 hover:bg-blue-600 hover:text-white transition-all rounded-full border border-blue-100 bg-white shadow-sm cursor-pointer">
                        <Info size={18} />
                    </button>
                </div>
            </div>
        </article>
    )
}