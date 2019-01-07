const Project = require('../../models/projects')

module.exports = function (router) {
    // GET: List of active projects
    const qry = {
        isActive: { $eq: true }
    }
    router.get('/projects', function (req, res) {
        Project.find(qry)
            .sort({ 'name': 1 })
            .exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding active Projects',
                    error: err
                }))
    })


     //POST: Create new Project
     router.post('/projects', function (req, res) {
        let member = new Project(req.body)
        member.save(function (err, member) {
            if(err) {
                return res.status(400).json(err)
            }
            res.status(200).json(member)
        })
    })
}