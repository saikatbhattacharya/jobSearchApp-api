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
            const availabilities = availability.split(',').map(each => new RegExp(each, "i"));
            queryCond.availability = {"$in": availabilities};
        }
        if(jobType) {
            queryCond.jobType = new RegExp(jobType, "i");
        }
        if(payRate) {
            queryCond.payRate = { $gte: payRate.split(',')[0], $lte: payRate.split(',')[1]}
        }
        controller.readController.readData('jobModel', queryCond, res);
    });
    app.get('/jobs/search', (req, res) => {
        let { searchText } = req.query;
        controller.readController.searchData('jobModel', searchText, res);
    })
}

export default router;
