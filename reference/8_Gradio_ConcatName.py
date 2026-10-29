import gradio as gr

# Define the function to concatenate first and last name
def get_full_name(first_name, last_name):
    return f"{first_name} {last_name}"

# Create the Gradio interface
with gr.Blocks() as demo:
    gr.Markdown("# Full Name Concatenator")

    # Input fields for first name and last name
    first_name = gr.Textbox(label="Enter your first name")
    last_name = gr.Textbox(label="Enter your last name")

    # Output for displaying the full name
    output = gr.Textbox(label="Full Name")

    # Button to trigger the function
    concat_button = gr.Button("Generate Full Name")

    # Set up the button to call get_full_name when clicked
    concat_button.click(get_full_name, inputs=[first_name, last_name], outputs=output)

# Launch the Gradio app
demo.launch()
