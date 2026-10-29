import { useState, useEffect } from 'react'

const EMPTY = { name: '', role: '', department: '', email: '' }

function EmployeeForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => { setForm(initial || EMPTY) }, [initial])

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())       e.name       = 'Name is required'
    if (!form.role.trim())       e.role       = 'Role is required'
    if (!form.department.trim()) e.department = 'Department is required'
    if (!form.email.includes('@')) e.email    = 'Valid email required'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSave(form)
  }

  const fields = [
    { key: 'name',       label: 'Full Name',   placeholder: 'e.g. Ravi Kumar' },
    { key: 'role',       label: 'Role',        placeholder: 'e.g. React Intern' },
    { key: 'department', label: 'Department',  placeholder: 'e.g. Engineering' },
    { key: 'email',      label: 'Email',       placeholder: 'e.g. ravi@actoryx.com' },
  ]

  return (
    <form className="emp-form" onSubmit={handleSubmit} noValidate>
      <h3>{initial ? 'Edit Employee' : 'Add New Employee'}</h3>
      {fields.map(({ key, label, placeholder }) => (
        <div className="form-group" key={key}>
          <label>{label}</label>
          <input
            type={key === 'email' ? 'email' : 'text'}
            placeholder={placeholder}
            value={form[key]}
            onChange={e => set(key, e.target.value)}
            className={errors[key] ? 'input-error' : ''}
          />
          {errors[key] && <span className="field-error">{errors[key]}</span>}
        </div>
      ))}
      <div className="form-actions">
        <button type="submit" className="btn-save">
          {initial ? 'Update' : 'Add Employee'}
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default EmployeeForm
