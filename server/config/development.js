module.exports = {
  // enabled logging for development
  logging: true,
  seed: true,
  // db: {
  //   user: "abhinav",
  //   server: "183.82.123.102",
  //   password: "mcbitss100",
  //   database: "MENA_TRAN_OVERSIGHT",
  //   port: '1533'
  // },
  db: {
    user: "abhinav",
    server: "mcbitsstech.dyndns.biz",
    password: "mcbitss100",
    database: "MENA_TRAN_OVERSIGHT",
    port: '1533',
    connectionTimeout: 60000
  },
  saveUrl: '../mena/assets/template/xlsTemp'
};
