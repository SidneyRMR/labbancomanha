const os = require('os');

function getLocalIpAddress() {
  const networkInterfaces = os.networkInterfaces();
  let ipAddress = null;

  for (const interfaceName in networkInterfaces) {
    const interface = networkInterfaces[interfaceName];
    for (const address of interface) {
      if (address.family === 'IPv4' && !address.internal) {
        ipAddress = address.address;
        break;
      }
    }

    if (ipAddress) {
      break;
    }
  }

  return ipAddress;
}

module.exports = getLocalIpAddress;
