// TODO: ADD MORE ERROR HANDLING HERE
const log = require('./logger');

const handleError = (res, code, errorMsg) => {
	let statusCode = 400;
	let name = 'Error handler';
	let error;

	if (typeof errorMsg === 'object') {
		if (errorMsg.name) {
			name = errorMsg.name;
		}

		statusCode = errorMsg.statusCode;
		error = errorMsg;
	} else if (typeof errorMsg === 'string') {
		error = { msg: errorMsg };
	}

	statusCode = code || statusCode;

	if (errorMsg instanceof Error) {
		log.error(errorMsg);
	} else {
		log.error({
			msg: name,
			statusCode,
			error,
		});
	}

	res.status(statusCode).send({
		statusCode,
		error,
	});
};

module.exports = {
	handleError,
};
