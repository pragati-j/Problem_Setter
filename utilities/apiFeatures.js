class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // filtering 1
    // const tours = await Tour.find({
    //   difficulty: req.query.difficulty
    // });
    // filtering 2
    // const query = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');
    //(1)FILTERING
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "limit", "sort", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    //ADVANCED_FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    //(2)SORTING
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("createdAt");
    }
    return this;
  }

  limit() {
    //(3)LIMITING
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      // no need to be visible to user.
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    //(4)PAGINATION
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;
