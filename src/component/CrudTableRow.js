import React from 'react'

function CrudTableRow({ el, setDataToEdit, deleteData }) {
  let { name, section, chapters } = el
  return (
    <tr>
      <td>{name}</td>
      <td>{section}</td>
      <td>{chapters}</td>
      <td>
        <button onClick={() => setDataToEdit(el)}>Editar</button>
        <button onClick={() => deleteData(el)}>Eliminar</button>
      </td>
    </tr>
  )
}

export default CrudTableRow
