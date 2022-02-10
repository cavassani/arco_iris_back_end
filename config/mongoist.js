import debug from 'debug'
import mongoist from 'mongoist'
import config from 'config'


const log = debug('arco_iris_back_end:config:mongoist')
const db = mongoist(config.get('mongo.uri'))
db.on('error', (err) => log('mongodb err', err))

export default db