import { useState } from 'react';
import { Image as ImageIcon, MessageCircle, MoreHorizontal, Share2, Smile, ThumbsUp, Video} from "lucide-react";
import type { Post, User } from "../types";
import { Button } from "@/components/ui/button";

interface ProfileFeedProps {
    user: User;
    posts: Post[];
}



export function ProfileFeed({ user, posts }: ProfileFeedProps) {
    const [postContent, setPostContent] = useState("");
    return (
        <div className="flex-1">
            {/* Create Post - Simplified */}
            <div className="bg-white dark:bg-card rounded-xl shadow-sm p-3 mb-4 border dark:border-border">
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0 border">
                        <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        {/* ÁREA DE TEXTO (TEXTAREA) */}
                        <textarea
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            placeholder="Comparte una actualización, artículo o proyecto..."
                            className="w-full bg-muted/50 rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 resize-none min-h-[80px] mb-2 transition-all"
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
                            {/* Botón Publicar (Deshabilitado si está vacío) */}
                            <Button 
                                size="sm" 
                                className="bg-primary text-primary-foreground"
                                disabled={!postContent.trim()} 
                            >
                                Publicar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts */}
            <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-lg px-1">Actividad reciente</h3>
                {posts.map(post => (
                    <div key={post.id} className="bg-white dark:bg-card rounded-xl shadow-sm p-4 border dark:border-border">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border">
                                    <img src={post.author.avatarUrl} alt={post.author.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">{post.author.name}</h3>
                                    <p className="text-xs text-muted-foreground">Publicado • {post.timestamp}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </div>

                        <p className="mb-3 text-sm leading-relaxed whitespace-pre-line">{post.content}</p>

                        {post.imageUrl && (
                            <div className="rounded-lg overflow-hidden mb-3 border dark:border-border bg-gray-50">
                                <img src={post.imageUrl} alt="Post content" className="w-full h-auto max-h-[280px] object-contain" />
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t dark:border-border">
                            <div className="flex gap-4">
                                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span className="text-xs">{post.likes}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
                                    <MessageCircle className="w-4 h-4" />
                                    <span className="text-xs">{post.comments}</span>
                                </Button>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                                <Share2 className="w-4 h-4" />
                                <span className="text-xs">Compartir</span>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
