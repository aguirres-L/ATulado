import React, { useEffect, useState } from "react";
import useDepartamentos from "../../hooks/useDepartamentos";

function BarrioSelector({handleZone}) {
  const dataCba = useDepartamentos(); // Hook para obtener los barrios
/* console.log(dataCba,'dataCBA'); */

  const [barriosDisponibles, setBarriosDisponibles] = useState([]);
  const [barriosSeleccionados, setBarriosSeleccionados] = useState([]);

  useEffect(() => {
    async function zone() {
      try {
        // You can perform some actions here, such as sending data to a parent component
        if (barriosDisponibles) {
          // Maybe update the parent with selected barrios
         /*  handleZone(barriosSeleccionados); */
          setBarriosDisponibles(dataCba)
        }
      } catch (error) {
        console.log(error);
      }
    }
    zone();
  }, [barriosSeleccionados, barriosDisponibles, handleZone]);


  const addBarrio = (barrio) => {
    if (!barriosSeleccionados.includes(barrio)) {
      setBarriosSeleccionados([...barriosSeleccionados, barrio]);
      handleZone([...barriosSeleccionados, barrio]);
    }
  };

  const removeBarrio = (barrio) => {
    setBarriosSeleccionados(
      barriosSeleccionados.filter((b) => b !== barrio)
    );
    handleZone(
      barriosSeleccionados.filter((b) => b !== barrio)
    );
  };

  return (
    <section className="p-4 bg-gray-100 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Seleccionar tus Barrios de Preferencia</h2>
      
      {/* Select */}
      <div className="relative mb-4">
        <select
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          onChange={(e) => addBarrio(e.target.value)}
        >
          <option value="">Seleccione un barrio</option>
          {barriosDisponibles.map((barrio) => (
            <option key={barrio} value={barrio}>
              {barrio}
            </option>
          ))}
        </select>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {barriosSeleccionados.map((barrio) => (
          <div
            key={barrio}
            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full shadow"
          >
            <span>{barrio}</span>
            <button
              className="ml-2 text-blue-500 hover:text-blue-700"
              onClick={() => removeBarrio(barrio)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BarrioSelector;
