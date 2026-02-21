// Imports actualizados
import { useState } from 'react';
import type { User } from '../types';
import { 
    User as UserIcon, Briefcase, GraduationCap, Heart, 
    Plane, Link as LinkIcon, Phone, FileText, Type, 
    Smile
} from "lucide-react";

// IMPORTA AQUÍ LOS COMPONENTES QUE CREAMOS ARRIBA
import { 
    DetailsSection, PersonalDataSection, EmploymentSection, 
    EducationSection, HobbiesSection, InterestsSection, 
    TravelSection, LinksSection, ContactSection, NamesSection
} from './ProfileInfoSections'; // O el nombre de archivo donde los guardaste

// ... (El array INFO_SECTIONS se mantiene igual, asegúrate que los IDs coincidan) ...
const INFO_SECTIONS = [
    { id: 'detalles', label: 'Detalles', icon: FileText },
    { id: 'datos_personales', label: 'Datos personales', icon: UserIcon },
    { id: 'empleo', label: 'Empleo', icon: Briefcase },
    { id: 'formacion', label: 'Formación académica', icon: GraduationCap },
    { id: 'pasatiempos', label: 'Pasatiempos', icon: Heart },
    { id: 'intereses', label: 'Intereses', icon: Smile }, // Icono cambiado para variar
    { id: 'viajes', label: 'Viajes', icon: Plane },
    { id: 'enlaces', label: 'Enlaces', icon: LinkIcon },
    { id: 'contacto', label: 'Información de contacto', icon: Phone },
    { id: 'nombres', label: 'Nombres', icon: Type },
    { id: 'informacion_ti', label: 'Información sobre ti', icon: UserIcon },
] as const;


export function ProfileTabInfo({ user }: { user?: User }) {
    const [activeSection, setActiveSection] = useState<string>('detalles'); // Cambiado a string genérico o el tipo SectionId

    const renderContent = () => {
        switch (activeSection) {
            case 'detalles': return <DetailsSection />;
            case 'datos_personales': return <PersonalDataSection />;
            case 'empleo': return <EmploymentSection />;
            case 'formacion': return <EducationSection />;
            case 'pasatiempos': return <HobbiesSection />;
            case 'intereses': return <InterestsSection />;
            case 'viajes': return <TravelSection />;
            case 'enlaces': return <LinksSection />;
            case 'contacto': return <ContactSection />;
            case 'nombres': return <NamesSection/>;
            case 'informacion_ti': return <DetailsSection />; // Reusa Detalles o crea uno nuevo
            default: return <div>Sección no encontrada</div>;
        }
    };

    // ... (El return del componente principal con el menú lateral se mantiene igual) ...
    return (
        <div className="bg-white dark:bg-card rounded-xl shadow-sm border dark:border-border mt-4 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
            {/* Sidebar */}
            <div className="w-full md:w-1/3 lg:w-1/4 border-r dark:border-border bg-gray-50/50 dark:bg-muted/10 p-2 py-4">
                 <h2 className="text-xl font-bold mb-4 px-4">Información</h2>
                 {/* ... Loop de botones ... */}
                 <nav className="flex flex-col gap-0.5">
                    {INFO_SECTIONS.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`flex items-center gap-3 px-4 py-2 text-sm font-medium transition-all text-left border-l-4
                                ${activeSection === section.id 
                                    ? 'border-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                                    : 'border-transparent text-muted-foreground hover:bg-gray-100 dark:hover:bg-muted hover:text-foreground'
                                }`}
                        >
                            {section.label}
                        </button>
                    ))}
                 </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-8">
                {renderContent()}
            </div>
        </div>
    );
}