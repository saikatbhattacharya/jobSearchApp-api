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
        let queryCond = {};
        if (skills) {
            const tags = skills.split(',').map(each => new RegExp(each, "i"));
            queryCond.tags = {"$in": tags};
        }
        if(availability) {
            queryCond.availability = new RegExp(availability, "i");
        }
        if(jobType) {
            queryCond.jobType = new RegExp(jobType, "i");
        }
        controller.readController.readData('jobModel', queryCond, res);
    });
    app.get('/jobs/search', (req, res) => {
        let { searchText } = req.query;
        controller.readController.searchData('jobModel', searchText, res);
    })
}

export default router;
