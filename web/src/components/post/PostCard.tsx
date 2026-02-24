import React, { useState } from 'react'
import { MessageSquare, MoreHorizontal, ThumbsUp, X } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import PostOpenModal from './modals/PostOpenModal'

export interface PostData {
    id: string;
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
    likes: number;
    comments: number;
}

interface PostCardProps {
    post: PostData;
}

const twoGridClass = "grid gap-0.5 grid-cols-2 border-y border-[#646464]"
const threeGridClass = "grid gap-0.5 grid-cols-3 border-y border-[#646464]"

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();

    const handleOpenDetail = () => {

        navigate({ 
            to: '/posts/$postId' as any, 
            params: { postId: post.id } as any 
        });
    }

    return (
        <div className="bg-white border-[#bbd5f5] max-w-150 mx-auto my-2.5 rounded-xl shadow-sm border overflow-hidden">
            <div className="flex items-center justify-between px-3 pt-3">
                <div className="flex items-center space-x-2">
                    <img src={post.user.avatar} alt="avatar" className="w-10 h-10 rounded-full border object-cover" />
                    <div>
                        <h3 className="font-bold text-[15px] leading-tight hover:underline cursor-pointer">{post.user.name}</h3>
                        <p className="text-[13px] text-[#333333]/50">{post.user.timestamp}</p>
                    </div>
                </div>
                <div className="flex space-x-2 text-[#333333]/50">
                    <MoreHorizontal className="w-5 h-5 cursor-pointer hover:bg-[#ebebeb] rounded-full" />
                    <X className="w-5 h-5 cursor-pointer hover:bg-[#ebebeb] rounded-full" />
                </div>
            </div>

            <div className="px-4 pb-4 pt-2 cursor-pointer" onClick={handleOpenDetail}>
                <h2 className="text-xl font-bold text-[#333333] leading-tight">{post.content.title}</h2>
                <p className="text-md text-[#4B5563] mt-1">{post.content.description}</p>
            </div>

            <div className={post.images.length === 3 ? threeGridClass : twoGridClass}>
                {post.images.slice(0, 4).map((img, index) => {
                    const isLastVisible = index === 3;
                    const hasMore = post.images.length > 4;
                    return (
                        <div key={index} onClick={() => setSelectedImage(img)} className="relative aspect-square overflow-hidden group">
                            <img src={img} alt={`Post`} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
                            {isLastVisible && hasMore && (
                                <div className="flex items-center justify-center absolute inset-0 bg-black/50 cursor-pointer">
                                    <span className="text-white text-3xl font-bold">+{post.images.length - 4}</span>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <div className="flex items-center justify-between px-4 py-2 border-t border-gray-50">
                <div className="flex w-full gap-2">
                    <button 
                        onClick={() => setLiked(!liked)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition ${liked ? 'bg-[#FFF3E6] text-[#F97316]' : 'hover:bg-[#ebebeb] text-[#6B7280]'}`}
                    >
                        <ThumbsUp size={18} fill={liked ? "currentColor" : "none"} />
                        <span className="font-semibold text-sm">Me gusta ({post.likes + (liked ? 1 : 0)})</span>
                    </button>

                    <button 
                        onClick={handleOpenDetail}
                        className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-[#F3E8FF] rounded-xl transition text-[#6B7280] hover:text-[#8B5CF6]"
                    >
                        <MessageSquare size={18} />
                        <span className="font-semibold text-sm">Comentar ({post.comments})</span>
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
    )
}

export default PostCard;