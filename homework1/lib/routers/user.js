var router = require('express').Router();
    users = require('../../models/users.js');

router.route('/')
// 获取全部用户
    .get(function(req, res, next) {
        // console.log(res);
        res.status(200).send(users);
    })

router.route('/ageAvg')
    .get(function(req, res, next) {
        age_avg = clac_age_avg();
        res.status(200).send(age_avg);
    })

router.route('/search')
    .get(function(req, res, next) {
        var company = req.query.company;
        search_results = search_company(company);
        if(search_results.length > 0) {
            res.status(200).send(search_results);
        } else {
            res.status(404).send('No Results.');
        }
    })

router.route('/:id')
// 获取指定用户的全名
    .get(function(req, res, next) {
        var user = get_user(req);
        if(user) {
          full_name = get_full_name(user);
          res.status(200).send(full_name);
        } else {
          res.status(404).send('User is Not Found.');
        }
    })

// router.route('/:id/age/plus/:year')
router.route('/:id')
// 修改指定用户的年龄
    .put(function(req, res, next) {
        var user = get_user(req);
        if(user) {
            var current_age = parseInt(user.age);
            console.log(req.body);
            var age = parseInt(req.body['age']);
            console.log(age);
            if(typeof(age) == 'number' && age > 0) {
                // var full_name = get_full_name(user);
                // response = full_name + '\'s age changed from ' + current_age + ' to ' + new_age;
                user.age = age;
                res.status(200).send(user);
            } else {
                res.status(400).send('bad request.')
            }
        } else {
            res.status(404).send('User is not Found.')
        }
    })

router.route('/count/:sex')
    .get(function(req, res, next) {
        var sex = req.params.sex;
        if(['male', 'female'].indexOf(sex) != -1) {
            var count  = calc_sex_count(sex);
            res.status(200).send(count);
        } else {
            res.status(400).send('sex should be MALE or FEMALE.');
        }
    })

var get_user = function(req) {
    var user_id = req.params.id - 1;
    var user = users[user_id];
    if(user) {
        return user;
    } else {
        return null;
    }
}

var get_full_name = function(user) {
    var is_chinese_name = function(user) {
        if(escape(user.firstName).indexOf("%u")<0) {
            is_chinese = false;
        } else {
            is_chinese = true;
        }
        return is_chinese;
    }
    if(is_chinese_name(user) == true) {
        full_name = user.firstName + user.lastName;
    } else {
        full_name = user.firstName + ' ' + user.lastName;
    }
    return full_name;
}

var calc_sex_count = function(sex) {
    count = 0;
    for(i=0; i<users.length; i++) {
        var user = users[i];
        if(user.sex == sex) {
            count++;
        }
    }
    count = String(count);
    return count;
}

var clac_age_avg = function() {
    age_total = 0;
    people_count = 0;
    for(i=0; i<users.length; i++) {
        var user = users[i];
        var age = parseInt(user.age);
        // console.log(age);
        age_total += age;
        // console.log(age_total);
        people_count++;
    }
    age_avg = String(age_total / people_count)
    return age_avg;
}

var search_company = function(company) {
    var new_users = JSON.parse(JSON.stringify(users));
    var company = company.toLocaleLowerCase();
    // console.log(new_users.length);
    for(i=0; i<new_users.length; i++) {
        // console.log('i is:' + i);
        var user = new_users[i];
        // console.log(user);
        var user_company = user.company.toLocaleLowerCase();
        if(user_company.indexOf(company) < 0) {
            delete new_users[i];
        }
    }
    new_users = cleanArray(new_users);
    // console.log(new_users.length);
    return new_users;
}

function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

module.exports = router;
