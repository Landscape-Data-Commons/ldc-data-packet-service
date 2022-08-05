
import fs from 'fs';


const dockerSecret:any = {};

dockerSecret.read = function read(secretName:any) {
  try {
    return fs.readFileSync(`/run/secrets/${secretName}`, 'utf8');
  } catch(err) {
    if (err.code !== 'ENOENT') {
      console.error(`An error occurred while trying to read the secret: ${secretName}. Err: ${err}`);
    } else {
      console.debug(`Could not find the secret, probably not running in swarm mode: ${secretName}. Err: ${err}`);
    }    
    return false;
  }
};

export default dockerSecret