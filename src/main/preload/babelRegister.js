process.env.NODE_ENV = 'development'

require('@babel/register')({
  ignore: [/\/node_modules\//]
})

require('./preload.js')
