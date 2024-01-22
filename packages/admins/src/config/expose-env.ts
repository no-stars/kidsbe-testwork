import dotenv from 'dotenv'
import path from 'path'

console.log(path.resolve(__dirname, '../../local.env'))
dotenv.config({ path: path.resolve(__dirname, '../../local.env') })
