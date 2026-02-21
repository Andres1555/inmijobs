import { Button } from "@/components/ui/button";
import type { User } from "../types";
import { MapPin, Briefcase, Edit, Plus, GraduationCap, ChevronDown } from "lucide-react";

interface ProfileHeaderProps {
    user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
    return (
        <div className="bg-white dark:bg-card rounded-xl shadow-sm overflow-hidden border dark:border-border flex flex-col shrink-0">
            {/* Banner: fondo + tagline en zona derecha (izquierda libre para avatar) */}
            <div className="h-28 md:h-40 bg-gray-100 relative shrink-0">
                {user.coverUrl && (
                    <img
                        src={user.coverUrl}
                        alt="Cover"
                        className="w-full h-full object-cover opacity-90"
                    />
                )}
                {user.tagline && (
                    <div className="absolute right-4 md:right-6 bottom-3 md:bottom-4 max-w-[16rem] text-right">
                        <p className="text-white/95 text-sm md:text-base font-medium drop-shadow-lg">
                            {user.tagline}
                        </p>
                    </div>
                )}
            </div>

            {/* Content: avatar circular con banderas superpuestas (estilo referencia) */}
            <div className="flex gap-4 px-4 md:px-5 pt-4 pb-3 items-center">
                <div className="relative shrink-0">
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-muted/80 ring-2 ring-violet-200 dark:ring-violet-800 shadow-md overflow-hidden flex items-center justify-center">
                        <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {user.flags && user.flags.length > 0 && (
                        <div className="absolute bottom-0 right-0 flex -space-x-1.5" title="Ubicación · Mercado internacional">
                            {user.flags.slice(0, 3).map((code) => (
                                <img
                                    key={code}
                                    src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
                                    alt={code}
                                    className="w-6 h-6 md:w-7 md:h-7 rounded-full object-cover border-2 border-white dark:border-card shadow-md ring-1 ring-black/10"
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start justify-between gap-3">
                        <div className="min-w-0">
                            <h1 className="text-xl font-bold truncate">{user.name}</h1>
                            <p className="text-muted-foreground text-sm mt-0.5">{user.friendsCount} conexiones</p>
                            <p className="text-primary font-medium text-sm mt-1">{user.role}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-2">
                                {user.location.split(' · ').map((part, i) => (
                                    <span key={i} className="flex items-center gap-1">
                                        {i === 0 ? <MapPin className="w-3.5 h-3.5 shrink-0" /> : <GraduationCap className="w-3.5 h-3.5 shrink-0" />}
                                        {part.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 shrink-0">
                            <Button size="sm"><Plus className="w-4 h-4 sm:mr-1" />Agregar a historia</Button>
                            <Button variant="outline" size="sm"><Edit className="w-4 h-4 sm:mr-1" />Editar perfil</Button>
                            <Button variant="outline" size="icon" className="h-9 w-9 shrink-0"><ChevronDown className="w-4 h-4" /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
