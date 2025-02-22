import { useState } from "react";

export default function InputAcompanadoInfo({ handleAcompanadoData }) {
  // Estado para los datos del acompañado
  const [acompanadoData, setAcompanadoData] = useState({
    name: "",
    age: "",
    condition: "", // Condición o diagnóstico del acompañado
    requiresMedication: false, // ¿Requiere medicación?
    specialNeeds: "", // Necesidades especiales
  });

  // Función para manejar los cambios en los datos del acompañado
  const handleInputChange = (field, value) => {
    const updatedData = { ...acompanadoData, [field]: value };
    setAcompanadoData(updatedData);
    handleAcompanadoData(updatedData); // Pasar los datos actualizados al componente padre
  };

  return (
    <div className="max-w-lg mx-auto ">
      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <div className="mb-2">
          <label className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            value={acompanadoData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Edad:</label>
          <input
            type="number"
            value={acompanadoData.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Condición o diagnóstico:</label>
          <input
            type="text"
            value={acompanadoData.condition}
            onChange={(e) => handleInputChange("condition", e.target.value)}
            placeholder="Ej: Autismo, Alzheimer, etc."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">¿Requiere medicación?</label>
          <select
            value={acompanadoData.requiresMedication ? "true" : "false"}
            onChange={(e) =>
              handleInputChange("requiresMedication", e.target.value === "true")
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Necesidades especiales:</label>
          <textarea
            value={acompanadoData.specialNeeds}
            onChange={(e) => handleInputChange("specialNeeds", e.target.value)}
            placeholder="Ej: Movilidad reducida, alimentación especial, etc."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>
    </div>
  );
}