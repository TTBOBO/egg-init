'use strict';
const TRANSACTIONNAME = Symbol('Application#transaction');
module.exports = {
  async getTransaction() {
    if (!this[TRANSACTIONNAME]) {
      this[TRANSACTIONNAME] = await this.model.transaction();
    }
    return this[TRANSACTIONNAME];
  },
  deleteTransaction() {
    this[TRANSACTIONNAME] = null;
  }
};
