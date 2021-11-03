const data = require('../config/data.config')

module.exports.getEmployees = (req, res, next) => {
    //console.log('req>>', req.query);

    let page = req.query.page;
    let user = req.query.user;
    let badges = req.query.badges;
    let filterData = [];

    if (page=== undefined && user === undefined && badges === undefined){
        res.status(200).json(data);
    }else{

        if(page !== undefined){
            switch(page){
                case 1:
                    for(let i = page -1; i<= page; i++){
                        filterData.push(data[i]);
                    }
                    res.status(200).json(filterData);
                break;
                case 2:
                    for(let i = page; i<= page + 1; i++){
                        filterData.push(data[i]);
                    }
                    res.status(200).json(filterData);
                break;
                default:
                    for(let i = (2 * ( page -1) ); i<= (2 * ( page -1) ) +1; i++){
                        filterData.push(data[i]);
                    }
                    res.status(200).json(filterData);
                break;
            }
        }
        else if(user !== undefined && user === 'true'){
            filterData = data.filter(employee => employee.privileges === 'user');
            res.status(200).json(filterData);
        }
        else if (badges !== undefined){
            const blackBadges = [];
            filterData = data.filter(employee => {
                if(employee.badges.length > 0 ){
                    employee.badges.forEach(element => {
                        if(element === 'black'){
                            blackBadges.push(employee)
                        }
                    });
                }
            });
            res.status(200).json(blackBadges);
        }

    }
    
}

module.exports.getOldest = (req, res, next) => {
    let oldest = data.sort((a,b) =>
        a.age > b.age ? -1: 1
    );
    res.status(200).json(oldest[0]);

}

module.exports.getEmployeeByName = (req, res, next) => {
    let name = req.params.NAME;

    if(name === undefined){
        res.status(404).json({"code": "not_found"});
    }else {
        let filterData = data.filter(employee => employee.name === name);
        res.status(200).json(filterData);
    }
}