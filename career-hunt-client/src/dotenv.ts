import * as dotenv from 'src/dotenv';
import * as fs from 'fs';

const envConfig = dotenv.parse(fs.readFileSync('.env'));

for (const k in envConfig) {
  process.env[k] = envConfig[k];
}
