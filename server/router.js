import bodyParser from 'body-parser';
import controller from '../controller';

const router = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.get('/health', (req, res) => {
        res.send({time: Date.now()});
    });
    app.get('/jobs', (req, res) => {
        let { skills, availability, jobType, payRate } = req.query;
        let tags = [];
        if (skills) {
            tags = skills.split(',').map(each => new RegExp(each, "i"))
        }
        if(availability) availability = new RegExp(availability, "i")
        if(jobType) jobType = new RegExp(jobType, "i")
        controller.readController.readData('jobModel', {tags: {"$in": tags}, availability, jobType}, res);
    });
}

export default router;
