import express from 'express';
import UserModel from './UserModel/index.js';

const router = express.Router();

router.get("/:name", function(request, response, next) {
	const {
		params: {
			name,
		},
	} = request;
	return response.json(UserModel.from({name}));
});

export default router;