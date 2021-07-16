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

// const secret = 'abcdefg';
// const hash = createHmac('sha256', secret)
//   .update('I love cupcakes')
//   .digest('hex');
// console.log(hash);
// 打印:
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e
