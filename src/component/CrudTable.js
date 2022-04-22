import React from 'react'
import CrudTableRow from './CrudTableRow'

function CrudTable({ data, setDataToEdit, deleteData }) {
  return (
    <div>
      <h3>Tabla de datos</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Sección</th>
            <th>Capítulos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => (
              <CrudTableRow
                key={el.id}
                el={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            ))
          ) : (
            <tr>
              <td>No hay datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CrudTable
