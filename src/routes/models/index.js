import express from 'express';

const router = express.Router();

router.get("/:model_id", function(request, response, next) {
	const {
		params: {
			model_id,
		},
	} = request;

	//	-----
	//	To-Do
	//	-----
	//	Query Postgres database for a model and return it in the response.


	return response.json( {} );
});

router.get("/:model_id/configurations", function(request, response, next) {
	const {
		params: {
			model_id,
		},
	} = request;

	//	-----
	//	To-Do
	//	-----
	//	Query Postgres database for a model's configurations and return them in the response.


	return response.json( {} );
});

router.get("/:model_id/configurations/:configuration_id", function(request, response, next) {
	const {
		params: {
			model_id,
			configuration_id,
		},
	} = request;

	//	-----
	//	To-Do
	//	-----
	//	Query Postgres database for a model's configuration and return it in the response.


	return response.json( {} );
});

export default router;