export default async function obtenerDepartamentos() {
    try {
      const response = await fetch('https://apis.datos.gob.ar/georef/api/departamentos?provincia=14');
      const data = await response.json();
      const departamentos = data.departamentos.map(depto => depto.nombre);
      console.log(departamentos);
    } catch (error) {
      console.error('Error al obtener los departamentos:', error);
    }
  }
  
  