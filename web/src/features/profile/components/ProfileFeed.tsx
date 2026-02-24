import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FaFaceLaughSquint } from "react-icons/fa6";
import { FaLightbulb, FaSadTear } from "react-icons/fa";
import { 
    Heart, 
    Image as ImageIcon, 
    MessageCircle, 
    MoreHorizontal, 
    Share2, 
    ThumbsUp, 
    Video 
} from "lucide-react";
import type { Post, User } from "../types";
import { Button } from "@/components/ui/button";

const REACTIONS = [
    { id: 'like', icon: ThumbsUp, color: 'text-blue-600', bg: 'bg-blue-600', label: 'Me gusta', library: 'lucide' },
    { id: 'love', icon: Heart, color: 'text-red-500', bg: 'bg-red-500', label: 'Me encanta', library: 'lucide' },
    { id: 'inspiring', icon: FaLightbulb, color: 'text-yellow-500', bg: 'bg-yellow-500', label: 'Inspirador', library: 'fa' },
    { id: 'funny', icon: FaFaceLaughSquint, color: 'text-orange-400', bg: 'bg-orange-400', label: 'Me divierte', library: 'fa' },
    { id: 'sad', icon: FaSadTear, color: 'text-gray-500', bg: 'bg-gray-500', label: 'Me entristece', library: 'fa' },
];

export function ProfileFeed({ user, posts }: { user: User; posts: Array<Post> }) {
    const [postContent, setPostContent] = useState("");

    return (
        <div className="flex-1">
            {/* Creador de Publicaciones */}
            <div className="bg-white dark:bg-card rounded-xl shadow-sm p-3 mb-4 border dark:border-border">
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0 border">
                        <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <textarea
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            placeholder="Comparte una actualización, artículo o proyecto..."
                            className="w-full bg-muted/50 rounded-lg p-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 resize-none min-h-20 mb-2 transition-all"
                        />
                        <div className="flex justify-between items-center">
                            <div className="flex gap-1">
                                <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
                                    <ImageIcon className="w-4 h-4" />
                                    <span className="hidden sm:inline text-xs">Multimedia</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
                                    <Video className="w-4 h-4" />
                                    <span className="hidden sm:inline text-xs">Video</span>
                                </Button>
                            </div>
                            <Button size="sm" className="bg-primary text-primary-foreground" disabled={!postContent.trim()}>
                                Publicar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Listado de Posts */}
            <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-lg px-1 text-foreground">Actividad reciente</h3>
                {posts.map(post => (
                    <ProfilePostItem key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}

function ProfilePostItem({ post }: { post: Post }) {
    const [selectedReaction, setSelectedReaction] = useState<typeof REACTIONS[0] | null>(null);
    const [showReactions, setShowReactions] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes);
    const navigate = useNavigate();

    const handleGoToDetail = () => {
        navigate({ to: '/posts/$postId' as any, params: { postId: post.id } as any });
    };

    // LÓGICA CORREGIDA PARA EL BOTÓN PRINCIPAL
    const handleMainButtonClick = () => {
        if (selectedReaction) {
            setSelectedReaction(null);
            setLikesCount(prev => prev - 1);
        } else {
            setSelectedReaction(REACTIONS[0]);
            setLikesCount(prev => prev + 1);
        }
    };

    // LÓGICA PARA SELECCIONAR DESDE EL MENÚ
    const handleSelectReaction = (reac: typeof REACTIONS[0]) => {
        if (selectedReaction?.id === reac.id) {
            setSelectedReaction(null);
            setLikesCount(prev => prev - 1);
        } else {
            if (!selectedReaction) setLikesCount(prev => prev + 1);
            setSelectedReaction(reac);
        }
        setShowReactions(false);
    };

    return (
        <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-100 dark:border-border overflow-hidden mb-1 relative">
            {/* Header */}
            <div className="p-4 flex justify-between items-center">
                <div className="flex gap-3 items-center cursor-pointer" onClick={handleGoToDetail}>
                    <img src={post.author.avatarUrl} alt={post.author.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                    <div>
                        <h4 className="font-bold text-gray-800 dark:text-foreground text-sm leading-none mb-1">{post.author.name}</h4>
                        <p className="text-[10px] text-gray-400">Publicado · {post.timestamp}</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </div>

            {/* Contenido */}
            <div className="px-4 pb-3 cursor-pointer" onClick={handleGoToDetail}>
                <p className="text-sm text-gray-800 dark:text-foreground leading-relaxed whitespace-pre-line mb-3">{post.content}</p>
                {post.imageUrl && (
                    <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-border bg-gray-50">
                        <img src={post.imageUrl} alt="Post content" className="w-full h-auto max-h-70 object-contain mx-auto" />
                    </div>
                )}
            </div>

            {/* BARRA DE RESUMEN DE REACCIONES */}
            <div className="px-4 py-2 flex items-center justify-between border-t border-gray-50 dark:border-border">
                <div className="flex items-center gap-1.5">
                    <div className="flex -space-x-1">
                        <div className="bg-blue-500 rounded-full p-1 border border-white">
                            <ThumbsUp size={8} className="text-white fill-current" />
                        </div>
                        <div className="bg-red-500 rounded-full p-1 border border-white">
                            <Heart size={8} className="text-white fill-current" />
                        </div>
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium dark:text-gray-400">
                        {likesCount}
                    </span>
                </div>
                <div className="text-[11px] text-gray-400">{post.comments} comentarios</div>
            </div>

            {/* Footer e Interacciones */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-50 dark:border-border bg-gray-50/30 relative">
                
                {/* Menú de Reacciones Flotante */}
                <div 
                    className={`absolute bottom-full left-4 mb-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-border rounded-full shadow-2xl p-1.5 flex gap-2 transition-all duration-300 origin-bottom-left z-20 ${showReactions ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-4'}`}
                    onMouseLeave={() => setShowReactions(false)}
                >
                    {REACTIONS.map((reac) => (
                        <button
                            key={reac.id}
                            onClick={() => handleSelectReaction(reac)}
                            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-all hover:scale-150 ${reac.color} cursor-pointer group relative`}
                        >
                            <reac.icon 
                                size={reac.library === 'fa' ? 20 : 22} 
                                {...(reac.library === 'lucide' ? { fill: selectedReaction?.id === reac.id ? 'currentColor' : 'none' } : {})} 
                            />
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {reac.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Botón Principal (Círculo de color dinámico) */}
                <button 
                    onMouseEnter={() => setShowReactions(true)}
                    onClick={handleMainButtonClick}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer ${selectedReaction ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                >
                    <div className={`${selectedReaction ? selectedReaction.bg : 'bg-gray-400'} p-1 rounded-full shadow-sm transition-colors flex items-center justify-center`}>
                        {selectedReaction ? (
                            <selectedReaction.icon size={12} className="text-white fill-current" />
                        ) : (
                            <ThumbsUp size={12} className="text-white fill-current" />
                        )}
                    </div>
                    <span className={`text-sm font-bold ${selectedReaction?.color || 'text-gray-600 dark:text-gray-400'}`}>
                        {selectedReaction ? selectedReaction.label : 'Me gusta'}
                    </span>
                </button>

                <div className="flex gap-2">
                    <button 
                        onClick={handleGoToDetail}
                        className="p-2.5 text-blue-600 hover:bg-blue-600 hover:text-white transition-all rounded-full border border-blue-100 dark:border-blue-900 bg-white dark:bg-slate-800 shadow-sm cursor-pointer"
                        title="Comentar"
                    >
                        <MessageCircle size={18} />
                    </button>
                    <button 
                        className="p-2.5 text-blue-600 hover:bg-blue-600 hover:text-white transition-all rounded-full border border-blue-100 dark:border-blue-900 bg-white dark:bg-slate-800 shadow-sm cursor-pointer"
                        title="Compartir"
                    >
                        <Share2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}