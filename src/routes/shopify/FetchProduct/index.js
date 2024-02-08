const endpoint	=   `https://${process.env.SHOPIFY_SHOP_NAME}.myshopify.com/api/${process.env.SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`;

const Query = {};

export default function(given_handle){
	Query.q = `
	{
		product(
			handle: "${given_handle}"
		){
			id
			handle
			title
			tags
			priceRange {
				minVariantPrice {
					amount
					currencyCode
				}
			}
			variants(first: 250) {
				edges {
					node {
						id
						title
						selectedOptions {
							name
							value
						}
					}
				}
			}
		}
	}
	`.trim();

	return fetch(endpoint, {
		method: 'POST',
		headers: {
			'Accept'							:	'application/json',
			'Content-Type'						:	'application/json',
			'X-Shopify-Storefront-Access-Token'	:	process.env.SHOPIFY_STOREFRONT_API_TOKEN,
		},
		body: JSON.stringify({
			query:	Query.q
		})
	})
	.then(response=>response.json())
	.then(response=>{
		const {
			data:{
				product
			},
			extensions
		} = response;
		return product;
	});
};
