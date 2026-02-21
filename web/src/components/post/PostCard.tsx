import React, { useState } from 'react'
import { Info, MessageSquare, MoreHorizontal, ThumbsUp, X } from 'lucide-react'
import PostOpenModal from './modals/PostOpenModal'

interface PostData{
    user:{
        name: string;
        avatar: string;
        timestamp: string;
    }

    content:{
        title: string;
        description: string;
    }

    images: Array<string>;
}

const twoGridClass = "grid gap-0.5 grid-cols-2 border-y border-[#646464]"
const threeGridClass = "grid gap-0.5 grid-cols-3 border-y border-[#646464]"

const PostCard: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const post: PostData = {
        user:{
            name: "María Rondón",
            avatar: "https://fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_11368.png",
            timestamp: "Viernes a las 10:00 AM",
        },

        content:{
            title: "Lista para la busqueda de un nuevo trabajo",
            description: "¡Abierta a nuevas oportuniades!",
        },

        images:[
            "https://cdn.stocksnap.io/img-thumbs/280h/business-meeting_Z1ZIMB54UM.jpg",
            "https://media.istockphoto.com/id/1481370371/photo/portrait-of-enthusiastic-hispanic-young-woman-working-on-computer-in-a-modern-bright-office.jpg?s=612x612&w=0&k=20&c=8kNce9Ruc9F2KXvnwf0stWQXCwwQTBCrW8efrqhUIa4=",
            "https://media.istockphoto.com/id/1443245439/photo/business-meeting-businesswoman-woman-office-portrait-job-career-happy-businessman-teamwork.jpg?s=612x612&w=0&k=20&c=1ZR02c1UKfGdBCNWzzKlrwrVZuEiOqnAKcKF4V_t038=",
            "https://media.istockphoto.com/id/1443245439/photo/business-meeting-businesswoman-woman-office-portrait-job-career-happy-businessman-teamwork.jpg?s=612x612&w=0&k=20&c=1ZR02c1UKfGdBCNWzzKlrwrVZuEiOqnAKcKF4V_t038=",
            "https://media.istockphoto.com/id/1443245439/photo/business-meeting-businesswoman-woman-office-portrait-job-career-happy-businessman-teamwork.jpg?s=612x612&w=0&k=20&c=1ZR02c1UKfGdBCNWzzKlrwrVZuEiOqnAKcKF4V_t038=",
            "https://media.istockphoto.com/id/1443245439/photo/business-meeting-businesswoman-woman-office-portrait-job-career-happy-businessman-teamwork.jpg?s=612x612&w=0&k=20&c=1ZR02c1UKfGdBCNWzzKlrwrVZuEiOqnAKcKF4V_t038=",
        ],
    };

    return (
        <div className="bg-white border-[#bbd5f5] max-w-150 mx-auto my-2.5 rounded-lg shadow-sm border">

            <div className="flex items-center justify-between px-3 pt-3">
                <div className="flex items-center space-x-2">
                    <img 
                        src={post.user.avatar} 
                        alt="avatar" 
                        className="w-10 h-10 rounded-full border"
                    />
                    <div>
                        <h3 className="font-bold text-[15px] leading-tight hover:underline cursor-pointer">{post.user.name}</h3>
                        <p className="flex items-center text-[13px] text-[#333333]/50">{post.user.timestamp} </p>
                    </div>
                </div>
                
                <div className="flex space-x-2 text-[#333333]/50">
                    <MoreHorizontal className="w-5 h-5 cursor-pointer hover:bg-[#ebebeb] rounded-full" />
                    <X className="w-5 h-5 cursor-pointer hover:bg-[#ebebeb] rounded-full" />
                </div>
            </div>

            <div className="px-4 pb-4 pt-2">
                <h2 className="text-[24px] font-semibold text-[#333333]">{post.content.title}</h2>
                <p className="text-[18px] text-[#333333] -my-1">{post.content.description}</p>
            </div>

            <div className={post.images.length === 3 ? threeGridClass : twoGridClass}>
                {post.images.slice(0, 4).map((img, index) => {
                    const isLastVisible = index === 3;
                    const hasMore = post.images.length > 4;

                    return(
                        <div 
                            key={index} 
                            onClick={() => setSelectedImage(img)}
                            className="relative aspect-square overflow-hidden group">
                            <img 
                                src={img} 
                                alt={`Imagen ${index}`} 
                                className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
                            />

                            {isLastVisible && hasMore && (
                                <div className="flex items-center justify-center absolute inset-0 bg-black/50 cursor-pointer">
                                    <span className="text-white text-3xl font-bold">+{post.images.length - 4}</span>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex w-full">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 hover:bg-[#ebebeb] rounded-[10px] transition group">
                        <span className="p-1 rounded-full border border-[#4add6e] text-[#4add6e]">
                            <ThumbsUp size={18} />
                        </span>
                        <span className="text-[#333333] font-medium text-[16px]">Me gusta</span>
                    </button>

                    <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 hover:bg-[#ebebeb] rounded-[10px] transition group">
                        <span className="p-2 bg-[#296dbb] text-white rounded-full">
                            <MessageSquare size={18} fill="currentColor" />
                        </span>
                        <span className="text-[#333333] font-medium text-[15px]">Comentar</span>
                    </button>
                </div>
            </div>
            <PostOpenModal
                isOpen={!!selectedImage} 
                onClose={() => setSelectedImage(null)} 
                imageSrc={selectedImage || ''}
                postData={post}
            />
        </div>
    );
};

export default PostCard;