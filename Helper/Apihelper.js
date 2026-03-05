class APIHELPER {
  constructor(query, querystr) {
    this.query = query; // mongoose query
    this.querystr = querystr; // query string from URL
  }

  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this; // 🔥 chaining fix
  }

  filter() {
    const querycopy = { ...this.querystr };

    // remove special fields
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete querycopy[key]);

    // advanced filter (gt, gte, lt, lte)
    let queryStr = JSON.stringify(querycopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this; // 🔥 chaining fix
  }

  pagination(resultPerPage = 10) {
    const currentPage = Number(this.querystr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

export default APIHELPER;
