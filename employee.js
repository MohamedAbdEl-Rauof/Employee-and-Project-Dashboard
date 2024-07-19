const tableBody = document.querySelector('tbody');

// function to fetch employee data from the server and populate the table
async function getEmployees() {
  try {
    const response = await fetch('/employees');
    const employees = await response.json();
    // clear previous table data
    tableBody.innerHTML = '';
    // append new data to the table
    employees.forEach((employee) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${employee.eno}</td>
        <td>${employee.ename}</td>
        <td>${employee.bdate}</td>
        <td>${employee.salary}</td>
        <td>${employee.city}</td>
        <td>${employee.dno}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}

// call getEmployees() function on page load
window.addEventListener('load', getEmployees);

// handle form submission for creating an employee
const createForm = document.querySelector('form[action="/create_employee"]');
createForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(createForm);
  try {
    const response = await fetch('/create_employee', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      console.log('Employee created successfully.');
      getEmployees();
    } else {
      console.error('Error creating employee.');
    }
  } catch (error) {
    console.error(error);
  }
});

// handle form submission for updating an employee
const updateForm = document.querySelector('form[action="/update_employee"]');
updateForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(updateForm);
  try {
    const response = await fetch('/update_employee', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      console.log('Employee updated successfully.');
      getEmployees();
    } else {
      console.error('Error updating employee.');
    }
  } catch (error) {
    console.error(error);
  }
});

// handle form submission for deleting an employee
const deleteForm = document.querySelector('form[action="/delete_employee"]');
deleteForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(deleteForm);
  try {
    const response = await fetch('/delete_employee', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      console.log('Employee deleted successfully.');
      getEmployees();
    } else {
      console.error('Error deleting employee.');
    }
  } catch (error) {
    console.error(error);
  }
});
