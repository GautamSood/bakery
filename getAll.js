const form = document.querySelector('#order-form');
let username = document.querySelector('#username');
let password = document.querySelector('#password');
let submitBtn = document.querySelector('button');

let headers = ['Name', 'Phone No', 'CakeType', 'Quantity'];

const getAllOrders = (postData) => {
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(postData),
  };

  let fetchRes = fetch(
    'https://cake-shop-assignment.herokuapp.com/api/getAllOrders',
    options
  );

  fetchRes
    .then((res) => res.json())
    .then((d) => {
      if (d.success === false) {
        document.getElementById('toastBody').innerHTML = 'User not authorized!';
        var toastLiveExample = document.getElementById('liveToast');
        var toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
      } else {
        let orders = d.data;

        // orders = [];

        let myTable = document.querySelector('#table');

        let table = document.createElement('table');
        let tableBody = document.createElement('tbody');
        let headerRow = document.createElement('tr');
        headers.forEach((headerText) => {
          let header = document.createElement('th');
          let textNode = document.createTextNode(headerText);
          header.appendChild(textNode);
          headerRow.appendChild(header);
        });

        table.appendChild(headerRow);
        table.appendChild(tableBody);

        if (orders.length > 0) {
          orders.forEach((emp) => {
            let row = document.createElement('tr');
            Object.keys(emp).forEach((text) => {
              if (text !== '_id' && text !== '__v') {
                console.log(emp[text]);
                let cell = document.createElement('td');
                let textNode = document.createTextNode(emp[text]);
                cell.appendChild(textNode);
                row.appendChild(cell);
              }
            });
            tableBody.appendChild(row);
          });
        }
        myTable.appendChild(table);
        table.classList.add('table');
        table.classList.add('table-striped');

        document.getElementById('toastBody').innerHTML =
          'All orders fetched successfully!';
        var toastLiveExample = document.getElementById('liveToast');
        var toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
      }
    })
    .catch(() => {
      document.getElementById('toastBody').innerHTML = 'An error occured!';
      var toastLiveExample = document.getElementById('liveToast');
      var toast = new bootstrap.Toast(toastLiveExample);
      toast.show();
    });
};

const formSubmit = (e) => {
  e.preventDefault();
  username = username.value;
  password = password.value;
  let postData = {
    username: username,
    password: password,
  };
  console.log(postData);
  getAllOrders(postData);
};

form.addEventListener('submit', formSubmit);
