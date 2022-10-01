import  express from 'express' ;
import { router } from './routes/getRoutes.js';
import generateMetadataXmlFiles from './metadata-generator/generate/metadata-generator'

// 2022-09-29-CMF: To generate metadata files . . .
generateMetadataXmlFiles().catch((err) => console.log(err))

// 2022-02-14-CMF: Mini-API entry point
const app = express();
app.use('/api', router);
app.listen(8081); 