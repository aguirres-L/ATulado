import { useState } from "react";

export default function InputChildrenCount({ handleChildren }) {
  // Estado para la cantidad de niños
  const [childrenCount, setChildrenCount] = useState(0);
  // Estado para los datos de cada niño
  const [childrenData, setChildrenData] = useState([]);

  // Función para manejar el cambio en la entrada de cantidad de niños
  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setChildrenCount(value);
      // Crear un nuevo array vacío para cada niño con campos adicionales
      setChildrenData(
        Array(value).fill({
          name: "",
          age: "",
          takesMedication: false,
          specialCare: "",
        })
      );
    } else {
      setChildrenCount(0); // Manejo de valores inválidos
    }
  };

  // Función para manejar los cambios en los datos de cada niño
  const handleChildDataChange = (index, field, value) => {
    const updatedChildrenData = [...childrenData];
    updatedChildrenData[index][field] = value;
    setChildrenData(updatedChildrenData);
    handleChildren(updatedChildrenData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <label
          htmlFor="childrenCount"
          className="block text-gray-700 font-medium mb-2"
        >
          Cantidad de niños:
        </label>
        <input
          type="number"
          id="childrenCount"
          value={childrenCount}
          onChange={handleInputChange}
          min="0"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-gray-500 mt-2">Has ingresado: {childrenCount} niño(s).</p>
      </div>

      {childrenCount > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Información de los niños</h3>
          {childrenData.map((children, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
              <h4 className="font-medium mb-2">Niño {index + 1}</h4>
              <div className="mb-2">
                <label className="block text-gray-700">Nombre:</label>
                <input
                  type="text"
                  onChange={(e) =>
                    handleChildDataChange(index, "name", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Edad:</label>
                <input
                  type="number"
                  onChange={(e) =>
                    handleChildDataChange(index, "age", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">
                  ¿Toma Medicamento?
                </label>
                <select
                  onChange={(e) =>
                    handleChildDataChange(index, "takesMedication", e.target.value === "true")
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="false">No</option>
                  <option value="true">Sí</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">
                  ¿Posee un cuidado "especial"?
                </label>
                <textarea
                  onChange={(e) =>
                    handleChildDataChange(index, "specialCare", e.target.value)
                  }
                  placeholder="Ej: Alimentación especial, alergias, etc."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
