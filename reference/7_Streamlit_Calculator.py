import streamlit as st

# streamlit run 7_Streamlit_Calculator.py

# Function to perform calculations
def calculate(num1, num2, operation):
    if operation == 'ADD':
        return num1 + num2
    elif operation == 'SUB':
        return num1 - num2
    elif operation == 'MUL':
        return num1 * num2
    elif operation == 'DIV':
        if num2 == 0:
            return "Cannot divide by zero"
        return num1 / num2
    else:
        return "Invalid operation"

# Streamlit app
st.title("Simple Calculator")

# Input numbers
num1 = st.number_input("Enter the first number", value=0.0)
num2 = st.number_input("Enter the second number", value=0.0)

# Select operation
operation = st.selectbox("Select Operation", ('ADD', 'SUB', 'MUL', 'DIV'))

# Calculate and display result
if st.button("Calculate"):
    result = calculate(num1, num2, operation)
    st.write(f"The result of {operation} operation is: {result}")
