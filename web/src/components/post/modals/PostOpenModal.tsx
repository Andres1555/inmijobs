import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Info, MessageSquare, Share2, ThumbsUp, X } from 'lucide-react';

interface PostData{
    user: {
        name: string;
        avatar: string;
        timestamp: string;
    }

    content: {
        title: string;
        description: string;
    }

    images: Array<string>;
}

interface ModalProps{
    isOpen: boolean
    onClose: () => void
    imageSrc: string
    postData: PostData
}

const PostOpenModal: React.FC<ModalProps> = ({ isOpen, onClose, imageSrc, postData }) => {
    if (!isOpen) return null;

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const index = postData.images.indexOf(imageSrc);
        if(index !== -1){
            setCurrentIndex(index);
        }
    }, [imageSrc, postData.images]);

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % postData.images.length);
    };

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + postData.images.length) % postData.images.length);
    };

    return (
        <div className="flex fixed inset-0 z-100 bg-black/60 overflow-hidden">
            <button 
                onClick={onClose}
                className="absolute top-4 left-4 z-110 p-2 text-white bg-[#616161]/50 hover:bg-[#8d8d8d]/50 rounded-full transition cursor-pointer"
            >
                <X size={24} />
            </button>

            <div className="flex-1 flex relative items-center justify-center bg-black/60 select-none">
                {postData.images.length > 1 && (
                    <button 
                        onClick={handlePrev}
                        className="absolute left-4 p-3 rounded-full text-white hover:bg-[#333333]/80 z-10 transition"
                    >
                        <ChevronLeft size={32} />
                    </button>
                )}
                
                <img 
                    src={postData.images[currentIndex]} 
                    alt="Imagen en vista completa" 
                    className="max-w-full max-h-screen object-contain"
                />

                {postData.images.length > 1 && (
                    <button 
                        onClick={handleNext}
                        className="absolute right-4 p-3 rounded-full text-white hover:bg-[#333333]/80 z-10 transition"
                    >
                        <ChevronRight size={32} />
                    </button>
                )}
            </div>

            <div className="flex flex-col w-110 bg-white h-full">
                <div className="flex items-center justify-between px-4 pt-4 pb-2">
                    <div className="flex items-center gap-3">
                        <img 
                            src={postData.user.avatar} 
                            alt="avatar" 
                            className="w-10 h-10 rounded-full border"
                        />
                        <div>
                            <h3 className="font-bold text-[15px] hover:underline cursor-pointer">{postData.user.name}</h3>
                            <p className="text-xs text-[#333333]/50">{postData.user.timestamp}</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4">
                    <h2 className="text-[18px] font-semibold text-[#333333]">{postData.content.title}</h2>
                    <p className="text-[14px] text-[#333333] -my-1">{postData.content.description}</p>
                    
                    <div className="mt-8 text-center border-t border-[#c6c6c7] ">
                        <div className="flex items-center justify-between text-gray-600 mb-3 px-2">
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 hover:bg-[#ebebeb] rounded-[10px] transition group">
                                <span className="p-1 rounded-full border border-[#4add6e] text-[#4add6e]">
                                    <ThumbsUp size={18} />
                                </span>
                                <span className="font-medium text-[#333333]/70">Me Gusta</span>
                            </button>

                            <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 hover:bg-[#ebebeb] rounded-[10px] transition group">
                                <span className="p-2 bg-[#296dbb] text-white rounded-full">
                                    <MessageSquare size={18} />
                                </span>
                                <span className="font-medium text-[#333333]/70"> Comentar</span>
                            </button>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center py-10 text-[#626770]">
                            <Info size={64} />
                            <p className="text-sm font-semibold pt-2.5">Todavía no hay comentarios</p>
                            <p className="text-xs">Sé la primera persona en comentar.</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2 items-center">
                        <img 
                            src={postData.user.avatar} 
                            alt="avatar" 
                            className="w-9 h-9 rounded-full border"
                        />
                        <div className="flex-1 flex items-center justify-between  px-4 py-2 bg-[#c6c6c7]/30 rounded-full">
                            <input 
                                type="text" 
                                placeholder="Escribe un comentario..." 
                                className="bg-transparent border-none outline-none text-sm w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostOpenModal