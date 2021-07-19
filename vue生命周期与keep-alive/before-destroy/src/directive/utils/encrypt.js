// crypto加密
let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}

export const encrypt = (secret) => {
  const hash = crypto
    .createHmac('sha256', secret)
    .update('I love cupcakes')
    .digest('hex');
  return hash;
};

