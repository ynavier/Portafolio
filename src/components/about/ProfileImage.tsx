import React from "react";

const ProfileImage: React.FC = () => {
  return (
    <div className="flex justify-center lg:justify-end">
      <div className="relative group cursor-pointer">
        {/* Ondas de colores */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 opacity-0 group-hover:opacity-100 pointer-events-none animate-wave-1"></div>
        <div className="absolute inset-0 rounded-full border-2 border-purple-400/25 opacity-0 group-hover:opacity-100 pointer-events-none animate-wave-2"></div>
        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 opacity-0 group-hover:opacity-100 pointer-events-none animate-wave-3"></div>
        <div className="absolute inset-0 rounded-full border-2 border-indigo-400/15 opacity-0 group-hover:opacity-100 pointer-events-none animate-wave-4"></div>

        {/* Efecto continuo */}
        <div className="absolute inset-0 rounded-full border border-white/10 animate-wave-continuous"></div>

        {/* Sombra flotante */}
        <div className="absolute inset-0 bg-black/20 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000 animate-pulse"></div>

        {/* Imagen principal */}
        <div className="relative w-96 h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-1000 ease-out">
          <img
            src="/imageme.jpg"
            alt="Perfil profesional"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1500 ease-out"
          />
        </div>

        {/* CSS de animaciones */}
        <style>{`
          @keyframes wave-expand {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1.4); opacity: 0; }
          }
          @keyframes wave-continuous {
            0%, 100% { transform: scale(1); opacity: 0.1; }
            50% { transform: scale(1.1); opacity: 0.3; }
          }
          .animate-wave-1 { animation: wave-expand 4s ease-out infinite; animation-delay: 0s; }
          .animate-wave-2 { animation: wave-expand 4s ease-out infinite; animation-delay: 1s; }
          .animate-wave-3 { animation: wave-expand 4s ease-out infinite; animation-delay: 2s; }
          .animate-wave-4 { animation: wave-expand 4s ease-out infinite; animation-delay: 3s; }
          .animate-wave-continuous { animation: wave-continuous 8s ease-in-out infinite; }
        `}</style>
      </div>
    </div>
  );
};

export default ProfileImage;
