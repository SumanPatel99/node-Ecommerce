const fs = require('fs');

// Helper function to read and write to JSON file
function readData() {
  const data = fs.readFileSync('data/payments.json', 'utf8');
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync('data/payments.json', JSON.stringify(data, null, 2));
}

// Sample secret key (Replace this with your actual secret key)
const SECRET_KEY = 'your_sample_secret_key';

// Payment Controller
const paymentController = {
  processPayment: (req, res) => {
    const { amount, cardNumber, expiryDate, cvv } = req.body;

    // Mock payment processing logic
    // Replace this with actual payment processing logic using payment gateway SDKs

    // Sample: Check if the secret key matches
    if (req.headers['x-api-key'] !== SECRET_KEY) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Mock success response
    const payment = { amount, cardNumber, expiryDate, cvv, status: 'success' };
    const payments = readData();
    payments.push(payment);
    writeData(payments);

    res.json({ message: 'Payment processed successfully', payment });
  }
};

module.exports = paymentController;
