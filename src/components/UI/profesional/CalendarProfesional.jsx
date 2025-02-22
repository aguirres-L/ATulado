export default function CalendarProfesional({ filteredData }) {
  // Definir colores para cada horario
  const scheduleColors = {
    mañana: "bg-yellow-300",
    tarde: "bg-blue-300",
    noche: "bg-purple-300",
  };

  // Mapear los nombres de los días a índices para compararlos con los días del calendario
  const daysMap = {
    D: 0,
    L: 1,
    M: 2,
    MI: 3,
    J: 4,
    V: 5,
    S: 6,
  };

  // Consolidar los días destacados y sus horarios desde filteredData
  const consolidatedDays = filteredData.flatMap((item) => {
    const services = item?.mother?.services || [];
    return services.map((service) => ({
      days: service.days || [], // Ej: ['L', 'M', 'J']
      schedule: service.schedule || "mañana", // Ej: "mañana"
    }));
  });

  // Crear un mapa de días y sus colores en función del horario
  const dayColorMap = {};
  consolidatedDays.forEach(({ days, schedule }) => {
    days.forEach((day) => {
      const dayName = Object.keys(daysMap).find((key) => key.startsWith(day));
      if (dayName) {
        if (!dayColorMap[dayName]) {
          dayColorMap[dayName] = [];
        }
        if (!dayColorMap[dayName].includes(schedule)) {
          dayColorMap[dayName].push(schedule);
        }
      }
    });
  });

  // Obtener el número total de días en el mes actual
  const currentMonth = new Date().getMonth(); // Diciembre = 11
  const currentYear = new Date().getFullYear();
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Obtener el día de la semana en el que comienza el mes (0 = Domingo, 1 = Lunes, etc.)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Calendario</h3>
      <div className="grid grid-cols-7 gap-2 text-center">
        {/* Header del calendario */}
        {["D", "L", "M", "MI", "J", "V", "S"].map((day) => (
          <div key={day} className="font-medium text-gray-600">
            {day}
          </div>
        ))}
        {/* Espacios en blanco para los días anteriores al primer día del mes */}
        {[...Array(firstDayOfMonth).keys()].map((blankDay) => (
          <div key={`blank-${blankDay}`} className="p-2 aspect-square"></div>
        ))}
        {/* Días del mes */}
        {[...Array(totalDaysInMonth).keys()].map((day) => {
          const date = new Date(currentYear, currentMonth, day + 1);
          const dayOfWeek = date.getDay(); // Índice del día de la semana
          const dayName = Object.keys(daysMap).find(
            (_, idx) => idx === dayOfWeek
          );
          const daySchedules = dayColorMap[dayName] || [];

          return (
            <div
              key={day + 1}
              className="relative p-2 rounded-lg border aspect-square flex items-center justify-center"
            >
              {/* Colores de los horarios */}
              {daySchedules.map((schedule, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full ${scheduleColors[schedule]}`}
                  style={{
                    height: `${100 / daySchedules.length}%`, // Dividir la altura según la cantidad de horarios
                    top: `${(100 / daySchedules.length) * index}%`, // Ajustar la posición según el índice
                  }}
                ></div>
              ))}
              {/* Día del mes */}
              <span className="relative z-10 text-gray-800">{day + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}