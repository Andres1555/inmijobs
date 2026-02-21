import { Info, MessageCircle, MoreHorizontal, ThumbsUp, X } from "lucide-react"

export const ShowPosts = () => {
    return (
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
            {/* Header del Post */}
            <div className="p-4 flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=400&fit=crop"
                        className="w-10 h-10 rounded-full object-cover border border-gray-100"
                        alt="Logo"
                    />
                    <div>
                        <h4 className="font-bold text-gray-800 text-sm leading-none mb-1">¿Qué hay Venezolana?</h4>
                        <p className="text-[10px] text-gray-400">Vereshodloak · 🌎</p>
                    </div>
                </div>
                <div className="flex gap-2 text-gray-400">
                    <MoreHorizontal size={20} className="cursor-pointer hover:text-gray-600 transition-colors" />
                    <X size={20} className="cursor-pointer hover:text-gray-600 transition-colors" />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-0.5 bg-gray-200 w-full">
                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/612539413.jpg?k=694c6b6a195695d8a7c92c6ba197401ff1505769d97c9d7844dde8154bfb32f7&o=" className="w-full aspect-square object-cover bg-gray-300" alt="Casa 1" />
                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/405785137.jpg?k=185cdd5402bf9e37423490236ae3f5e350577a4a563d2a40d33aeefe7b4d634c&o=" className="w-full aspect-square object-cover bg-gray-300" alt="Casa 2" />
                <img src="https://www.corpovigui.com/exportacao/fotos/20210308T1814500400-261089679.jpg" className="w-full aspect-square object-cover bg-gray-300" alt="Casa 3" />
            </div>

            <div className="p-4">
                <p className="text-sm text-gray-800 leading-relaxed">
                    ¡Familia! ¿Listos para invertir? Casa en Mérida, full equipada.
                    <span className="block mt-1 font-medium text-blue-600">¡Nuevo hogar, nuevas oportunidades!</span>
                </p>
            </div>

            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-50 bg-gray-50/30">
                <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-all active:scale-95">
                    <div className="bg-blue-600 p-1 rounded-full shadow-sm">
                        <ThumbsUp size={12} className="text-white fill-current" />
                    </div>
                    <span className="text-sm font-medium">Me gusta</span>
                </button>

                <div className="flex gap-2">
                    <button className="p-2.5 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors rounded-full border border-blue-100 bg-white">
                        <MessageCircle size={18} />
                    </button>
                    <button className="p-2.5 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors rounded-full border border-blue-100 bg-white">
                        <Info size={18} />
                    </button>
                </div>
            </div>
        </article>
    )
}