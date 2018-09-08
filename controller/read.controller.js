import db from '../DB';

const readData = (modelName, query, res) => {
    db.model[modelName].find(query)
        .then(data => res.send(data))
        .catch(e => res.send(e))
};

const searchData = (modelName, searchphrase, res) => {
    db.model[modelName].find({
        $text:{$search: searchphrase}
    }).then(data => res.send(data))
    .catch(e => res.send(e))
}

export default {
    readData,
    searchData
}