import { Button } from "@/components/ui/button";
import type { User, Friend, Photo } from "../types";
import { MapPin, GraduationCap, Users, Image as ImageIcon } from "lucide-react";

interface ProfileSidebarProps {
    user: User;
    friends: Friend[];
    photos: Photo[];
}

function SidebarSection({ title, action, children }: { title: string, action?: React.ReactNode, children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-card rounded-lg shadow-sm p-3">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-lg">{title}</h3>
                {action}
            </div>
            {children}
        </div>
    );
}

export function ProfileSidebar({ user, friends, photos }: ProfileSidebarProps) {
    return (
        <div className="w-full lg:w-1/3 flex flex-col gap-2 shrink-0">
            {/* About Section */}
            <SidebarSection title="Acerca de">
                <div className="text-sm text-muted-foreground mb-2">
                    <p className="mb-2">Diseñador UI/UX apasionado por crear experiencias digitales intuitivas y atractivas.</p>
                </div>
                <div className="flex flex-col gap-2 text-sm text-foreground/80">
                    <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{user.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <GraduationCap className="w-4 h-4 text-muted-foreground" />
                        <span>UNEGInforma (2021 - 2027)</span>
                    </div>
                </div>
            </SidebarSection>

            {/* Skills / Highlights (Replaced the "Destacado" button) */}
            <SidebarSection title="Habilidades principales">
                <div className="flex flex-wrap gap-2">
                    {['Figma', 'React', 'Tailwind', 'UI Design', 'Prototyping'].map(skill => (
                        <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full cursor-default hover:bg-secondary/80">
                            {skill}
                        </span>
                    ))}
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-1 text-primary">Ver todas</Button>
            </SidebarSection>

            {/* Portfolio / Photos (Replaced Photos Grid with List) */}
            <SidebarSection title="Portafolio reciente">
                <div className="space-y-3">
                    {photos.slice(0, 3).map((photo, i) => (
                        <div key={photo.id} className="flex gap-3 items-center group cursor-pointer p-1 rounded-md hover:bg-muted/50 transition-colors">
                            <div className="w-16 h-12 rounded-md overflow-hidden bg-gray-200 shrink-0">
                                <img src={photo.url} alt="Project" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <div className="min-w-0">
                                <p className="font-medium text-sm truncate">Proyecto Destacado {i + 1}</p>
                                <p className="text-xs text-muted-foreground">Ver detalles</p>
                            </div>
                        </div>
                    ))}
                </div>
            </SidebarSection>
        </div>
    );
}
