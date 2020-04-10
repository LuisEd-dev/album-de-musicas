const express = require('express');
const routes = express.Router();

const VideoController = require('./controllers/VideoController')

routes.get('/');
routes.get('/videos', VideoController.Index);
routes.get('/videos/:id', VideoController.Show);
routes.post('/videos', VideoController.Storage);
routes.put('/videos/:id', VideoController.Update);
routes.delete('/videos/:id', VideoController.Delete);

module.exports = routes;