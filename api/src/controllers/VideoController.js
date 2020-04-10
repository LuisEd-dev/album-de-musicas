const moongose = require('mongoose');

const Video = moongose.model('Video')

module.exports = {
    async Index(req, res){
        //const { page = 1 } = req.query;
        videos = await Video.find() //.paginate({}, {page, limit: 10});
        return res.json(videos);
    },

    async Storage(req, res){
        const videos = await Video.create(req.body);

        return res.json(videos);
    }, 
    async Show(req, res){
        const videos = await Video.findById(req.params.id);

        return res.json(videos)
    },
    async Update(req, res){
        const videos = await Video.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.json(videos);
    },
    async Delete(req, res){
        await Video.findByIdAndRemove(req.params.id);

        return res.send();
    }
}