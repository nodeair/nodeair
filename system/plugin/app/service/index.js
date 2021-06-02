class Service {
  constructor() {}
  async getCategories() {
    const { db } = this;
    const { model } = db;
    const { models } = model;
    const { Category } = models;
    return Category.findAll();
  }
}

module.exports = Service;
