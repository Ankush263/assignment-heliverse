class APIFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	filter() {
		const queryObj = { ...this.queryString };
		const excludeFields = ['page', 'sort', 'limit', 'fields'];
		excludeFields.forEach((el) => delete queryObj[el]);

		Object.keys(queryObj).forEach((key) => {
			if (queryObj[key] === '') {
				delete queryObj[key];
			}
		});

		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	}

	pagination() {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 20;
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);

		return this;
	}
}

module.exports = APIFeatures;
