const tableBody = document.querySelector('#table-body');
let data = [];

// Fetch data from JSON file and render table
fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
    renderTable();
  })
  .catch(error => console.error(error));

// Render table
function renderTable() {
  tableBody.innerHTML = '';

  data.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.id}</td>
      <td><img src="${student.image}" alt="image">${student.first_name} ${student.last_name}</td>
      <td>${student.gender}</td>
      <td>${student.class}</td>
      <td>${student.marks}</td>
      <td>${student.passing ? 'Passing' : 'Failed'}</td>
      <td>${student.email}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Search function
function searchTable() {
  const query = document.querySelector('#search-input').value.trim().toLowerCase();
  if (!query) {
    renderTable();
    return;
  }

  const filteredData = data.filter(student => {
    const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
    const email = student.email.toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });

  data = filteredData;
  renderTable();
}

// Sort functions
function sortByNameAsc() {
  data.sort((a, b) => {
    if (a.first_name.toLowerCase() + ' ' + a.last_name.toLowerCase() < b.first_name.toLowerCase() + ' ' + b.last_name.toLowerCase()) {
      return -1;
    } else if (a.first_name.toLowerCase() + ' ' + a.last_name.toLowerCase() > b.first_name.toLowerCase() + ' ' + b.last_name.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  });
  renderTable();
}

function sortByNameDesc() {
  data.sort((a, b) => {
    if (a.first_name.toLowerCase() + ' ' + a.last_name.toLowerCase() > b.first_name.toLowerCase() + ' ' + b.last_name.toLowerCase()) {
      return -1;
    } else if (a.first_name.toLowerCase() + ' ' + a.last_name.toLowerCase() < b.first_name.toLowerCase() + ' ' + b.last_name.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  });
  renderTable();
}

function sortByMarks() {
  data.sort((a, b) => a.marks - b.marks);
  renderTable();
}

function sortByPassing() {
  data = data.filter(student => student.passing);
  renderTable();
}

function sortByClass() {
  data.sort((a, b) => a.class - b.class);
  renderTable();
}

// Event listeners for sorting and search buttons
document.querySelector('#sort-name-asc').addEventListener('click', sortByNameAsc);
document.querySelector('#sort-name-desc').addEventListener('click', sortByNameDesc);
document.querySelector('#sort-marks').addEventListener('click', sortByMarks);
document.querySelector('#sort-passing').addEventListener('click', sortByPassing);
document.querySelector('#sort-class').addEventListener('click', sortByClass);
document.querySelector('#search-btn').addEventListener('click', searchTable);
``
