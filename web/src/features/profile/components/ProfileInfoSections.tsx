import { 
    Briefcase, Cake, Clapperboard, Gamepad2, Globe, GraduationCap, Hand, 
    Heart, Home, Link as LinkIcon, Lock, Mail, MapPin, MessageSquare, Mic, 
    Music, Pencil, Phone, Pin, Plane, Plus, Shirt, Tv, User as UserIcon, Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- COMPONENTE BASE PARA CADA FILA (Reutilizable) ---
interface InfoRowProps {
    icon: React.ElementType;
    label?: string;
    value: React.ReactNode;
    subValue?: string;
    action?: boolean; // Si es true, se ve como un botón de "Agregar..."
    rightElement?: React.ReactNode; // Para los iconos de candado/lápiz
}

function InfoRow({ icon: Icon, label, value, subValue, action, rightElement }: InfoRowProps) {
    return (
        <div className={`flex items-start gap-4 p-2 -ml-2 rounded-lg transition-colors ${action ? 'cursor-pointer hover:bg-muted/50 group' : ''}`}>
            {/* Icono Principal */}
            <div className="w-9 h-9 mt-0.5 rounded-full bg-secondary/50 flex items-center justify-center shrink-0 text-muted-foreground">
                <Icon className="w-5 h-5" />
            </div>

            {/* Contenido Central */}
            {/* Corregido: min-h-[2.25rem] -> min-h-9 */}
            <div className="flex-1 min-w-0 flex flex-col justify-center min-h-9">
                {label && <p className="text-sm font-semibold text-foreground mb-0.5">{label}</p>}
                
                <div className={`${action ? 'text-blue-600 group-hover:underline font-medium' : 'text-foreground text-sm'}`}>
                    {value}
                </div>
                
                {subValue && <p className="text-xs text-muted-foreground mt-0.5">{subValue}</p>}
            </div>

            {/* Elementos a la derecha (Candado, Lápiz) */}
            {rightElement && (
                <div className="flex items-center gap-2 text-muted-foreground">
                    {rightElement}
                </div>
            )}
        </div>
    );
}

// --- HELPER PARA ICONOS DE EDICIÓN (Candado/Lápiz) ---
function EditActions() {
    return (
        <>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/60 hover:text-foreground">
                <Lock className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/60 hover:text-foreground">
                <Pencil className="w-4 h-4" />
            </Button>
        </>
    );
}

// ================= SECCIONES ESPECÍFICAS =================

export function DetailsSection() {
    return (
        <div className="space-y-6 animate-in fade-in">
            <div>
                <h3 className="text-lg font-bold mb-4">Presentación</h3>
                <InfoRow icon={Hand} value="Información sobre ti" subValue="" />
            </div>
            <div>
                <h3 className="text-lg font-bold mb-4">Detalles fijados</h3>
                <InfoRow icon={Pin} value="Detalles fijados" />
            </div>
        </div>
    );
}

export function PersonalDataSection() {
    return (
        <div className="space-y-6 animate-in fade-in">
            {/* Ubicación */}
            <div>
                <h3 className="font-semibold mb-3">Ubicación</h3>
                <InfoRow icon={MapPin} value="Ciudad o localidad actual" />
            </div>
            
            {/* Ciudad de origen */}
            <div>
                <h3 className="font-semibold mb-3">Ciudad de origen</h3>
                <InfoRow icon={Home} value="Ciudad de origen" />
            </div>

            {/* Fecha de nacimiento */}
            <div>
                <h3 className="font-semibold mb-3">Fecha de nacimiento</h3>
                <InfoRow 
                    icon={Cake} 
                    value="10 de agosto" 
                    subValue="2004 (Año de nacimiento)"
                    rightElement={<EditActions />}
                />
            </div>

            {/* Situación sentimental */}
            <div>
                <h3 className="font-semibold mb-3">Situación sentimental</h3>
                <InfoRow icon={Heart} value="Situación sentimental" />
            </div>

            {/* Familiares */}
            <div>
                <h3 className="font-semibold mb-3">Familiares</h3>
                <InfoRow icon={Users} value="Familia" />
            </div>

            {/* Género */}
            <div>
                <h3 className="font-semibold mb-3">Género</h3>
                <InfoRow 
                    icon={UserIcon} 
                    value="Hombre" 
                    subValue="Género"
                    rightElement={<EditActions />}
                />
            </div>

            {/* Pronombres */}
            <div>
                <h3 className="font-semibold mb-3">Pronombres</h3>
                <InfoRow 
                    icon={MessageSquare} 
                    value="masculino" 
                    subValue="Pronombres del sistema"
                    rightElement={<EditActions />} 
                />
            </div>
             {/* Idiomas */}
             <div>
                <h3 className="font-semibold mb-3">Idiomas</h3>
                <InfoRow icon={Globe} value="Idiomas" />
            </div>
        </div>
    );
}

export function EmploymentSection() {
    return (
        <div className="animate-in fade-in">
            <h3 className="text-lg font-bold mb-4">Empleo</h3>
            <InfoRow icon={Briefcase} value="Experiencia laboral" />
        </div>
    );
}

export function EducationSection() {
    return (
        <div className="space-y-6 animate-in fade-in">
            <div>
                <h3 className="text-lg font-bold mb-4">Universidad</h3>
                <InfoRow icon={GraduationCap} value="Universidad" />
            </div>
            <div>
                <h3 className="text-lg font-bold mb-4">Escuela secundaria</h3>
                <InfoRow icon={Home} value="Escuela secundaria" />
            </div>
        </div>
    );
}

export function HobbiesSection() {
    return (
        <div className="animate-in fade-in">
            <h3 className="text-lg font-bold mb-4">Pasatiempos</h3>
            {/* Corregido: Eliminado atributo icon duplicado */}
            <InfoRow icon={Heart} value="Pasatiempos" /> 
        </div>
    );
}

export function InterestsSection() {
    // Mapeo simple para la lista de intereses
    const items = [
        { label: 'Música', icon: Music },
        { label: 'Programas de TV', icon: Tv },
        { label: 'Películas', icon: Clapperboard },
        { label: 'Juegos', icon: Gamepad2 },
        { label: 'Deportistas y equipos deportivos', icon: Shirt },
    ];

    return (
        <div className="space-y-6 animate-in fade-in">
            {items.map((item) => (
                <div key={item.label}>
                    <h3 className="font-semibold mb-3">{item.label}</h3>
                    <InfoRow icon={item.icon} value={item.label} />
                </div>
            ))}
        </div>
    );
}

export function TravelSection() {
    return (
        <div className="animate-in fade-in">
            <h3 className="text-lg font-bold mb-1">Viajes</h3>
            <p className="text-sm text-muted-foreground mb-4">Agrega hasta 450 lugares que hayas visitado.</p>
            <InfoRow icon={Plane} value="Lugares" />
        </div>
    );
}

export function LinksSection() {
    return (
        <div className="animate-in fade-in">
            <h3 className="text-lg font-bold mb-1">Enlaces</h3>
            <p className="text-sm text-muted-foreground mb-4">Agrega hasta 10 enlaces.</p>
            <InfoRow icon={LinkIcon} value="Sitios web, blogs, portfolios" action />
        </div>
    );
}

export function ContactSection() {
    return (
        <div className="space-y-6 animate-in fade-in">
            {/* Medios sociales */}
            <div>
                <h3 className="font-semibold mb-3">Medios sociales</h3>
                <InfoRow icon={LinkIcon} value="Medios sociales" action />
            </div>

            {/* Teléfono */}
            <div>
                <h3 className="font-semibold mb-3">Teléfono</h3>
                <div className="flex items-start gap-4 p-2 -ml-2">
                    <div className="w-9 h-9 mt-0.5 rounded-full bg-secondary/50 flex items-center justify-center shrink-0 text-muted-foreground">
                        <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                         <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="text-sm font-medium">0414-9917818</p>
                                <p className="text-xs text-muted-foreground">Celular</p>
                            </div>
                            <div className="flex gap-2"><EditActions /></div>
                         </div>
                         <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium">+86 176 7731 8240</p>
                                <p className="text-xs text-muted-foreground">Celular</p>
                            </div>
                            <div className="flex gap-2"><Button variant="ghost" size="icon" className="h-8 w-8"><Lock className="w-4 h-4 text-muted-foreground" /></Button></div>
                         </div>
                    </div>
                </div>
            </div>

            {/* Correo */}
            <div>
                <h3 className="font-semibold mb-3">Correo electrónico</h3>
                <InfoRow 
                    icon={Mail} 
                    value="hectorantonio1008@gmail.com" 
                    subValue="Correo electrónico"
                    rightElement={<EditActions />}
                />
            </div>
        </div>
    );
}
export function NamesSection() {
    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            {/* Bloque 1: Pronunciación */}
            <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Pronunciación del nombre</h3>
                <div className="flex items-center gap-4 group cursor-pointer p-2 -ml-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                        <Mic className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-blue-600 group-hover:underline">
                            Pronunciación del nombre
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Añade una guía de audio para que sepan cómo decir tu nombre.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bloque 2: Otros nombres */}
            <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Otros nombres</h3>
                <div className="flex items-center gap-4 group cursor-pointer p-2 -ml-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                        <span className="text-lg font-serif font-bold text-foreground">Aa</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-blue-600 group-hover:underline flex items-center gap-2">
                            <Plus className="w-3 h-3" /> Agregar otros nombres
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Apodos, nombre de soltera, nombre alternativo...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}