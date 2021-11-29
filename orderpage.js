const form = document.querySelector('#order-form');
let fullname = document.querySelector('#fullname');
let phoneno = document.querySelector('#phoneno');
let caketype = document.querySelector('#caketype');
let quantity = document.querySelector('#quantity');
let submitBtn = document.querySelector('#submitBtn');

const postOrderData = (postData) => {
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(postData),
  };

  let fetchRes = fetch(
    'https://cake-shop-assignment.herokuapp.com/api/orderCake',
    options
  );
  fetchRes
    .then((res) => res.json())
    .then((d) => {
      if (d.success === true) {

        document.getElementById('toastBody').innerHTML = 'Order submitted successfully!';
        var toastLiveExample = document.getElementById('liveToast');
        var toast = new bootstrap.Toast(toastLiveExample);
        toast.show();

        console.log(d);
      } else {
        document.getElementById('toastBody').innerHTML = 'An error occured while ordering!';
        var toastLiveExample = document.getElementById('liveToast');
        var toast = new bootstrap.Toast(toastLiveExample);
        toast.show();

        console.log('Error occured!');
      }
    });

  // console.log(fetchRes);
};

const formSubmit = (e) => {
  e.preventDefault();
  fullname = fullname.value;
  phoneno = phoneno.value;
  caketype = caketype.value;
  quantity = quantity.value;
  let postData = {
    name: fullname,
    phone: phoneno,
    cakeType: caketype,
    quantity: quantity,
  };
  console.log(postData);
  postOrderData(postData);
};

form.addEventListener('submit', formSubmit);
