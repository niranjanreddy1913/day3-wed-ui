import { useState } from 'react'

const OPERATIONS = [
  { value: 'add', label: '+', name: 'Add' },
  { value: 'subtract', label: '−', name: 'Subtract' },
  { value: 'multiply', label: '×', name: 'Multiply' },
  { value: 'divide', label: '÷', name: 'Divide' },
  { value: 'modulus', label: '%', name: 'Modulus' },
]

function opSymbol(op) {
  return OPERATIONS.find(o => o.value === op)?.label || op
}

function calculate(a, b, op) {
  switch (op) {
    case 'add':      return a + b
    case 'subtract': return a - b
    case 'multiply': return a * b
    case 'divide':   return a / b
    case 'modulus':  return a % b
    default:         return null
  }
}

function Calculator() {
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [operation, setOperation] = useState('add')
  const [result, setResult] = useState(null)
  const [expression, setExpression] = useState('')
  const [error, setError] = useState('')

  const handleCalculate = () => {
    const a = parseFloat(num1)
    const b = parseFloat(num2)

    if (isNaN(a) || isNaN(b)) {
      setError('Please enter valid numbers in both fields.')
      setResult(null)
      return
    }
    if ((operation === 'divide' || operation === 'modulus') && b === 0) {
      setError(`Cannot ${operation} by zero.`)
      setResult(null)
      return
    }

    setError('')
    const res = calculate(a, b, operation)
    setResult(res)
    setExpression(`${a} ${opSymbol(operation)} ${b} = ${res}`)
  }

  const handleClear = () => {
    setNum1('')
    setNum2('')
    setOperation('add')
    setResult(null)
    setExpression('')
    setError('')
  }

  return (
    <div className="calculator">
      <div className="op-tabs">
        {OPERATIONS.map(op => (
          <button
            key={op.value}
            className={`op-tab ${operation === op.value ? 'active' : ''}`}
            onClick={() => { setOperation(op.value); setResult(null); setError('') }}
          >
            <span className="op-symbol">{op.label}</span>
            <span className="op-name">{op.name}</span>
          </button>
        ))}
      </div>

      <div className="inputs-row">
        <input
          type="number"
          placeholder="First number"
          value={num1}
          onChange={(e) => { setNum1(e.target.value); setResult(null); setError('') }}
        />
        <span className="op-badge">{opSymbol(operation)}</span>
        <input
          type="number"
          placeholder="Second number"
          value={num2}
          onChange={(e) => { setNum2(e.target.value); setResult(null); setError('') }}
        />
      </div>

      <div className="btn-row">
        <button className="btn-calc" onClick={handleCalculate}>Calculate</button>
        <button className="btn-clear" onClick={handleClear}>Clear</button>
      </div>

      {error && (
        <div className="error-box">
          <span>⚠</span> {error}
        </div>
      )}

      {result !== null && !error && (
        <div className="result-box">
          <div className="expression">{expression}</div>
          <div className="result-value">{result}</div>
        </div>
      )}
    </div>
  )
}

export default Calculator
