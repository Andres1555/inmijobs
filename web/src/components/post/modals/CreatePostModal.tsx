import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Image, MapPin, Smile, UserPlus, Video, X } from 'lucide-react';
import { authClient } from '@/lib/auth';

const FeelingIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F7B928" width={size} height={size} className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
  </svg>
);

const FriendsIcon = ({ size = 12, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width={size} height={size} className={className}>
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
  </svg>
);

const IconButton = ({ icon, color = "", title }: { icon: React.ReactNode; color?: string; title: string }) => (
  <button type="button" className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${color} focus:outline-none`} title={title}>
    {icon}
  </button>
);

export const CreatePostModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [postText, setPostText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const session = authClient.useSession();
  const user = session.data?.user;

  const handlePublish = async () => {
    if (!postText.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: postText,
          authorId: user?.id,
        }),
      });

      if (response.ok) {
        setPostText('');
        onClose();
        window.location.reload();
      } else {
        const errorData = await response.text();
        console.error("Error en el servidor:", errorData);
        alert("No se pudo publicar. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error al conectar con el servidor de Inmijobs.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-125 mx-auto relative flex flex-col max-h-[90vh] animate-scale-in">

        {/* Encabezado */}
        <div className="flex items-center justify-center p-4 border-b border-gray-200 relative shrink-0">
          <h2 className="text-[20px] font-bold text-gray-900">Crear publicación</h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">

          <div className="flex items-center space-x-3 mb-4">
            <img 
              src={user?.image || `https://ui-avatars.com/api/?name=${user?.name}`} 
              className="w-10 h-10 rounded-full border object-cover" 
              alt="Avatar"
            />
            <div>
              <h3 className="font-semibold text-[15px] text-gray-900 leading-tight">{user?.name}</h3>
              <button className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 rounded-md px-2 py-0.5 text-[13px] font-semibold text-gray-600 transition-colors mt-1">
                <FriendsIcon className="text-gray-500" />
                <span>Amigos</span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>
            </div>
          </div>

          <div className="relative mb-4">
            <textarea
              ref={textareaRef}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder={`¿Qué estás pensando, ${user?.name.split(' ')[0]}?`}
              className="w-full text-gray-900 text-xl sm:text-2xl placeholder-gray-500 resize-none outline-none min-h-37.5 py-2"
              autoFocus
            />
            
            <div className="flex justify-between items-center mt-2">
              <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="w-9 h-9 bg-linear-to-br from-green-400 via-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">Aa</div>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                <Smile size={28} />
              </button>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-2.5 flex items-center justify-between mb-2 shadow-sm">
            <span className="font-semibold text-[15px] text-gray-900 pl-2">Agregar a tu publicación</span>
            <div className="flex -space-x-1">
              <IconButton icon={<Image size={24} />} color="text-green-500" title="Foto/video" />
              <IconButton icon={<UserPlus size={24} />} color="text-blue-500" title="Etiquetar personas" />
              <IconButton icon={<FeelingIcon size={24} />} title="Sentimiento/actividad" />
              <IconButton icon={<MapPin size={24} />} color="text-red-500" title="Estoy aquí" />
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-teal-500 font-bold text-xs" title="GIF">
                <span className="bg-teal-500 text-white px-1 py-0.5 rounded-lg">GIF</span>
              </button>
              <IconButton icon={<Video size={24} />} color="text-red-500" title="Video en vivo" />
            </div>
          </div>
        </div>

        {/* Pie del Modal */}
        <div className="p-4 border-t border-gray-200 shrink-0">
          <button
            disabled={!postText.trim() || isLoading}
            onClick={handlePublish}
            className={`w-full py-2.5 px-4 rounded-lg font-semibold text-[15px] transition-colors focus:outline-none ${
              postText.trim() && !isLoading
                ? 'bg-[#1877F2] hover:bg-[#166FE5] text-white cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? "Publicando..." : "Publicar"}
          </button>
        </div>

      </div>
    </div>
  );
};