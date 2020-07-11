require('dotenv').config()

const server = require('./src/api/server');
const PORT = process.env.PORT || 4000;
//Start server 
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});

