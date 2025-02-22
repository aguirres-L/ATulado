import { useEffect } from "react";
// Todavia no lo uso ya que el otro funciona 
export default function ReelsInsta({ embedId }) {
    useEffect(() => {
      // Crear e insertar el script de SociableKIT
      const script = document.createElement('script');
      script.src = "https://widgets.sociablekit.com/instagram-reels/widget.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
  
      // Opcional: limpiar el script si el componente se desmonta
      return () => {
        document.body.removeChild(script);
      };
    }, []);
  
    return (
    <div className="justify-center">
    
    <h2>Servicios Realizados</h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <div style={{border:"solid 2px red"}} className='sk-ww-instagram-reels' data-embed-id={embedId}></div>
    </div>
    </div>
    );
  }
  