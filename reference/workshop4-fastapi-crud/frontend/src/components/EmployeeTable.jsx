function EmployeeTable({ employees, onEdit, onDelete }) {
  if (!employees.length) {
    return (
      <div className="empty-state">
        <p>No employees found. Add one above!</p>
      </div>
    )
  }

  return (
    <div className="table-wrap">
      <table className="emp-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Role</th>
            <th>Department</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td className="id-cell">{emp.id}</td>
              <td><strong>{emp.name}</strong></td>
              <td>{emp.role}</td>
              <td><span className="dept-badge">{emp.department}</span></td>
              <td className="email-cell">{emp.email}</td>
              <td className="actions-cell">
                <button className="btn-edit"   onClick={() => onEdit(emp)}>Edit</button>
                <button className="btn-delete" onClick={() => onDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeTable
