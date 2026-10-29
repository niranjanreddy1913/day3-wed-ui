


import streamlit as st

# streamlit run 2_Hello.py

st.title('String Operations')

firstName = st.text_input('Enter your first name: ')
lastName = st.text_input('Enter your second name: ')

def display_fullname(firstName, lastName):
    fullname = f"{firstName} {lastName}"

    st.write(f"Full name: {fullname}")

if st.button("Submit"):
        if firstName and lastName:
            display_fullname(firstName, lastName)
        else:
            st.write("Please enter both first name and last name.")