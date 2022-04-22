import React, { useState, useEffect } from 'react'

const initialForm = {
  id: null,
  name: '',
  section: '',
  chapters: '',
}

function CrudForm({ createData, updateData, dataToEdit, setDataToEdit }) {
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit)
    } else {
      setForm(initialForm)
    }
  }, [dataToEdit])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name || !form.section || !form.chapters) {
      alert('Datos incompletos')
      return
    }

    if (form.id === null) {
      createData(form)
    } else {
      updateData(form)
    }

    handleReset()
  }

  const handleReset = (e) => {
    setForm(initialForm)
    setDataToEdit(null)
  }

  return (
    <div>
      <h3>{dataToEdit ? 'Editar' : 'Agregar'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          value={form.name}
        />
        <input
          type="text"
          name="section"
          placeholder="Sección"
          onChange={handleChange}
          value={form.section}
        />
        <input
          type="number"
          name="chapters"
          placeholder="Capítulos"
          onChange={handleChange}
          value={form.chapters}
        />
        <input type="submit" value="Guardar" />
        <input type="reset" value="Limpiar" onClick={handleReset} />
      </form>
    </div>
  )
}

export default CrudForm
