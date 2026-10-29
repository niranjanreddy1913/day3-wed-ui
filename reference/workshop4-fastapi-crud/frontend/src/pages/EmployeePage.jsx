import { useState, useEffect } from 'react'
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api/employeeApi'
import EmployeeTable from '../components/EmployeeTable'
import EmployeeForm from '../components/EmployeeForm'

function EmployeePage() {
  const [employees, setEmployees]   = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState('')
  const [search, setSearch]         = useState('')
  const [showForm, setShowForm]     = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [toast, setToast]           = useState('')

  useEffect(() => { fetchEmployees() }, [])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const res = await getEmployees()
      setEmployees(res.data)
      setError('')
    } catch {
      setError('Failed to load employees. Is the backend running on port 8011?')
    } finally {
      setLoading(false)
    }
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const handleSave = async (form) => {
    try {
      if (editTarget) {
        await updateEmployee(editTarget.id, form)
        showToast('Employee updated successfully')
      } else {
        await createEmployee(form)
        showToast('Employee added successfully')
      }
      setShowForm(false)
      setEditTarget(null)
      fetchEmployees()
    } catch {
      setError('Failed to save. Please try again.')
    }
  }

  const handleEdit = (emp) => {
    setEditTarget(emp)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return
    try {
      await deleteEmployee(id)
      showToast('Employee deleted')
      fetchEmployees()
    } catch {
      setError('Failed to delete.')
    }
  }

  const handleCancel = () => { setShowForm(false); setEditTarget(null) }

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.role.toLowerCase().includes(search.toLowerCase()) ||
    e.department.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      {toast && <div className="toast">{toast}</div>}

      <div className="page-header">
        <div>
          <h1>Employee Management</h1>
          <p className="subtitle">Full CRUD via FastAPI on port 8011</p>
        </div>
        <button className="btn-add" onClick={() => { setEditTarget(null); setShowForm(true) }}>
          + Add Employee
        </button>
      </div>

      {showForm && (
        <EmployeeForm
          initial={editTarget}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, role or department…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="result-count">{filtered.length} employee{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {loading && <div className="status-msg loading">Loading employees…</div>}
      {error   && <div className="status-msg error">{error}</div>}

      {!loading && !error && (
        <EmployeeTable
          employees={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default EmployeePage
