import fetchProduct from "../routes/shopify/FetchProduct/index.js";

fetchProduct('sock').then(function(response){
	console.log(response);
});
