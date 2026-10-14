async function fetchUsers() {
  const response = await fetch("/api/users");

  const users = await response.json();

  const tableBody = document.querySelector("#users-table-body");

  for (const user of users) {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.age}</td>
                    <td>${user.role}</td>
                    <td>${user.department}</td>
                    <td>${user.active}</td>
    `;
    tableBody.appendChild(row);
  }
}

fetchUsers();
