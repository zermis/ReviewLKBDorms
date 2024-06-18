import os

'''
Function to get the file path
Arguments
    filename    - name of the file
Returns the file path
'''
def get_file_path(filename):
    current_dir = os.getcwd()
    file_path = os.path.join(current_dir, filename)
    return file_path
