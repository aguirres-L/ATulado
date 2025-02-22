export default function ServiceFiltrados([filteredData]){
    return(
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Datos Filtrados</h3>
          {filteredData.length > 0 ? (
            <ul className="space-y-4">
              {filteredData.map((item, index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg shadow-md"
                >
                  <p className="text-lg font-semibold">
                  Padres: {item.mother.name}
                  </p>
                  <p>Dirección: {item.mother.address}</p>
                  <p>Email: {item.mother.email}</p>
                  <p>Teléfono: {item.mother.phone}</p>
                  <p>Número de Hijos: {item.mother.numberOfChildren}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No se encontraron datos.</p>
          )}
        </div>
    )
}