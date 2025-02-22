export default function Calendar({ service }) {
  // Días del mes (supongamos que es diciembre de 2024)
  const daysInMonth = 31; // Cambiar si el mes varía
  const month = 11; // Diciembre (0-indexed en JS)
  const year = 2024;

  // Convertir datos del servicio a un Set para facilitar la búsqueda
  const serviceDates = new Set(service?.map((item) => item.date));
/* console.log(service,'serviceDates');
 */
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Agendar un Servicio</h3>
      <div className="grid grid-cols-7 gap-2 text-center">
        {/* Header del calendario */}
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
          <div key={day} className="font-medium text-gray-600">
            {day}
          </div>
        ))}
        {/* Días del mes */}
        {[...Array(daysInMonth).keys()]?.map((day) => {
          const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day + 1).padStart(2, "0")}`;
          const isAvailable = serviceDates.has(date);

          return (
            <div
              key={day + 1}
              className={`p-2 rounded-lg cursor-pointer ${
                isAvailable
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              title={isAvailable ? "Disponible" : "No disponible"}
            >
              {day + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}
