const url = "http://localhost:3000/products";
// let data;
async function getData() {
  try {
    let apifetch = await fetch(url);
    let data = await apifetch.json();
    productDetails(data);
  } catch (error) {
    console.log(error);
  }
}


function productDetails(data) {
  let productdisplay = document.getElementById("productdisplay");
 
}

getData();