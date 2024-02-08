import express from 'express';
import fetchProduct from './FetchProduct/index.js';

const router = express.Router();

router.get("/products/:handle", (request, response, next) => {
	const {
		params: {
			handle,
		},
	} = request;

	return response.json(fetchProduct(handle));
});

export default router;
