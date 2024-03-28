// Payment.js
class Payment {
    constructor(id, amount, userId, status) {
        this.id = id;
        this.amount = amount;
        this.userId = userId;
        this.status = status;
    }
}

module.exports = Payment;
