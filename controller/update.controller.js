import db from '../DB';

const updateData = (modelName, query, update, options, res) => {
    db.model[modelName].update(query, update, options, (err, data) => {
        if (err) {
          res.send(err);
        }
        else {
            res.send(data);
        }
    })
};


export default {
    updateData
}