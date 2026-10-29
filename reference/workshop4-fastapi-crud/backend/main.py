from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn

app = FastAPI(title="Actoryx Employee API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5184", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory database
_next_id = 6
employees_db = [
    {"id": 1, "name": "Ravi Kumar",    "role": "React Intern",    "department": "Engineering", "email": "ravi@actoryx.com"},
    {"id": 2, "name": "Priya Sharma",  "role": "UI Intern",       "department": "Design",      "email": "priya@actoryx.com"},
    {"id": 3, "name": "Arun Patel",    "role": "Fullstack Intern", "department": "Engineering", "email": "arun@actoryx.com"},
    {"id": 4, "name": "Sneha Reddy",   "role": "Data Intern",     "department": "Analytics",   "email": "sneha@actoryx.com"},
    {"id": 5, "name": "Kiran Mehta",   "role": "DevOps Intern",   "department": "Infra",       "email": "kiran@actoryx.com"},
]

class EmployeeCreate(BaseModel):
    name: str
    role: str
    department: str
    email: str

class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    department: Optional[str] = None
    email: Optional[str] = None


@app.get("/")
def root():
    return {"message": "Actoryx Employee API is running", "docs": "/docs"}


@app.get("/employees")
def get_employees():
    return employees_db


@app.get("/employees/{emp_id}")
def get_employee(emp_id: int):
    emp = next((e for e in employees_db if e["id"] == emp_id), None)
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return emp


@app.post("/employees", status_code=201)
def create_employee(emp: EmployeeCreate):
    global _next_id
    new_emp = {"id": _next_id, **emp.model_dump()}
    _next_id += 1
    employees_db.append(new_emp)
    return new_emp


@app.put("/employees/{emp_id}")
def update_employee(emp_id: int, emp: EmployeeUpdate):
    for i, e in enumerate(employees_db):
        if e["id"] == emp_id:
            updated = {**e, **{k: v for k, v in emp.model_dump().items() if v is not None}}
            employees_db[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Employee not found")


@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: int):
    for i, e in enumerate(employees_db):
        if e["id"] == emp_id:
            employees_db.pop(i)
            return {"message": f"Employee {emp_id} deleted"}
    raise HTTPException(status_code=404, detail="Employee not found")


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8011, reload=True)
