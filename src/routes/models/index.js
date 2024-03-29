import express from 'express';
import errorHandler from './errorHandler.js';
import * as modelsDao from '../dao/models.js';
import * as configurationsDao from '../dao/configurations.js';

const router = express.Router();
router.get("/", async function (request, response, next) {
	try {
		const models = await modelsDao.getAllModels();
		return response.json({ models });
	} catch (error) {
		return errorHandler.handlePostgresError(error, response);
	}
});

router.get("/:model_id", async function (request, response, next) {
	const { params: { model_id } } = request;
	try {
		const model = await modelsDao.getModelById(model_id);
		if (!model) {
			return response.status(404).json({ error: 'Model not found' });
		}
		return response.json({ model });
	} catch (error) {
		return errorHandler.handlePostgresError(error, response);
	}
});

router.get("/:model_id/configurations", async function (request, response, next) {
	const { params: { model_id }, query: { published } } = request;
	try {
		let configurations;
		if (published === 'true') {
			configurations = await configurationsDao.getPublishedConfigurations(model_id);
		} else {
			configurations = await configurationsDao.getAllConfigurations(model_id);
		}
		return response.json({ configurations });
	} catch (error) {
		return errorHandler.handlePostgresError(error, response);
	}
});

router.get("/:model_id/configurations/:configuration_id", async function (request, response, next) {
	const { params: { model_id, configuration_id } } = request;
	try {
		const configuration = await configurationsDao.getConfigurationById(model_id, configuration_id);
		if (!configuration) {
			return response.status(404).json({ error: 'Configuration not found' });
		}
		return response.json({ configuration });
	} catch (error) {
		return errorHandler.handlePostgresError(error, response);
	}
});

export default router;