const { print } = require('./AnnouncementController')


const router = require('express').Router()

module.exports = (app) => {
    
    router.get('/print',print)

	return app.use('/api/admin/announcement', router)
}