var should = require('chai').should,
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:3000'),
    users = require('../models/users.js'),
    albums = require('../models/albums.js'),
    users_geek = [
      {
        "firstName": "Python",
        "lastName": "Do",
        "age": 15,
        "sex": "male",
        "company": "GeekPark Inc."
      },
      {
        "firstName": "Java",
        "lastName": "La",
        "age": 38,
        "sex": "male",
        "company": "GeekPark Inc."
      }
    ],
    users_beijing = [
      {
        "firstName": "Ruby",
        "lastName": "Mi",
        "age": 5,
        "sex": "male",
        "company": "YoKeNeng BeiJing"
      },
      {
        "firstName": "JavaScript",
        "lastName": "Fa",
        "age": 15,
        "sex": "female",
        "company": "YoKeNeng BeiJing"
      },
      {
        "firstName": "Basic",
        "lastName": "Sol",
        "age": 28,
        "sex": "male",
        "company": "YoKeNeng BeiJing"
      },
      {
        "firstName": "Go",
        "lastName": "Ti",
        "age": 17,
        "sex": "female",
        "company": "YoKeNeng BeiJing"
      }
    ],
    album_4 = {
      "title": "别让我心疼",
      "type": "流行",
      "length": 182,
      "singer": "郑中基"
    },
    longer_songs = [
      {
        "title": "私奔",
        "type": "摇滚",
        "length": 203,
        "singer": "郑钧"
      },
      {
        "title": "去大理",
        "type": "民谣",
        "length": 353,
        "singer": "黄渤"
      },
      {
        "title": "别让我心疼",
        "type": "流行",
        "length": 182,
        "singer": "郑中基"
      },
      {
        "title": "商品社会",
        "type": "摇滚",
        "length": 243,
        "singer": "郑钧"
      },
      {
        "title": "狐狸",
        "type": "民谣",
        "length": 369,
        "singer": "万晓利"
      }
    ],
    zhengjun_songs = [
      {
        "title": "私奔",
        "type": "摇滚",
        "length": 203,
        "singer": "郑钧"
      },
      {
        "title": "商品社会",
        "type": "摇滚",
        "length": 243,
        "singer": "郑钧"
      }
    ],
    yaogun_songs = [
      {
        'title': "私奔",
        'type': "摇滚",
        'length': 203,
        'singer': "郑钧"
      },
      {
        'title': "无地自容",
        'type': "摇滚",
        'length': 127,
        'singer': "黑豹乐队"
      },
      {
        'title': "Don't Break My Heart",
        'type': "摇滚",
        'length': 158,
        'singer': "黑豹乐队"
      },
      {
        'title': "商品社会",
        'type': "摇滚",
        'length': 243,
        'singer': "郑钧"
      }
    ],
    minyao_songs = [
      {
        "title": "去大理",
        "type": "民谣",
        "length": 353,
        "singer": "黄渤"
      },
      {
        "title": "女儿情",
        "type": "民谣",
        "length": 92,
        "singer": "万晓利"
      },
      {
        "title": "狐狸",
        "type": "民谣",
        "length": 369,
        "singer": "万晓利"
      }
    ],
    find_singer_uri = encodeURI('/album/singer/郑钧'),
    find_yaogun_uri = '/album/search?type=' + encodeURI('摇滚'),
    find_minyao_uri = '/album/search?type=' + encodeURI('民谣')

describe('User', function(){
    it('/user should return all users', function(done){
        api.get('/user')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
            expect(res.body).to.deep.equal(users);
            done();
        })
    })

    it('/user/3 should return Ruby Mi', function(done){
        api.get('/user/3')
        .set('Accept', 'text/html')
        .expect(200)
        .end(function(err, res){
            expect(res.text).to.equal('Ruby Mi');
            done();
        })
    })

    it('/user/20 should return 404 Not Found', function(done){
        api.get('/user/20')
        .expect(404, done);
    })

    it('/user/20 PUT should return 404 Not Found', function(done){
        api.put('/user/20')
        .expect(404, done);
    })

    it('/user/count/male should return 5', function(done){
        api.get('/user/count/male')
        .expect(200)
        .end(function(err, res){
            expect(res.text).to.equal('5');
            done();
        })
    })

    it('/user/count/famale should return 3', function(done){
        api.get('/user/count/female')
        .expect(200)
        .end(function(err, res){
            expect(res.text).to.equal('3');
            done();
        })
    })

    it('/user/ageAvg should return 20', function(done){
        api.get('/user/ageAvg')
        .expect(200)
        .end(function(err, res){
            expect(res.text).to.equal('20');
            done();
        })
    })

    it('/user/search?company=geek should return Python and Java', function(done){
        api.get('/user/search?company=geek')
        .expect(200)
        .end(function(err, res){
            expect(res.body).to.not.equal(null);
            expect(res.body).to.deep.equal(users_geek);
            done();
        })
    })

    it('/user/search?company=baidu should return 404 Not Found', function(done){
        api.get('/user/search?company=baidu')
        .expect(404, done)
    })

    it('/user/search?company=beijing should return Ruby, Javascript, Basic and Go', function(done){
        api.get('/user/search?company=beijing')
        .expect(200)
        .end(function(err, res){
            expect(res.body).to.not.equal(null);
            expect(res.body).to.deep.equal(users_beijing);
            done();
        })
    })

    it('/user/2 PUT should return new user with diffrent age', function(done){
        api.put('/user/2')
        // .type('x-www-form-urlencoded')
        .set('Accept', 'application/x-www-form-urlencoded')
        .type('form')
        .send({
          age: 18
        })
        .expect(200)
        .end(function(err, res){
            expect(res.body['age']).to.equal(18);
            done();
        })
    })

})

describe('Album', function(){
  it('/album should return all albums', function(done){
      api.get('/album')
      .expect(200)
      .end(function(err, res){
          expect(res.body).to.not.equal('null');
          expect(res.body).to.deep.equal(albums);
          done();
      })
  })

  it('/album/4 should return 别让我心疼', function(done){
      api.get('/album/4')
      .expect(200)
      .end(function(err, res){
          expect(res.body).to.not.equal('null');
          expect(res.body).to.deep.equal(album_4);
          done();
      })
  })

  it('/album/20 should return 404 Not Found', function(done){
      api.get('/album/20')
      .expect(404, done)
  })

  it('/album/longerSong should return 私奔、去大理、别让我心疼、商品社会、狐狸', function(done){
      api.get('/album/longerSong')
      .expect(200)
      .end(function(err, res){
          expect(res.body).to.not.equal('null');
          expect(res.body).to.deep.equal(longer_songs);
          done();
      })
  })

  it('/album/singer/郑钧 should return 私奔、商品社会', function(done){
      api.get(find_singer_uri)
      .expect(200)
      .end(function(err, res){
          expect(res.body).to.not.equal('null');
          expect(res.body).to.deep.equal(zhengjun_songs);
          done();
      })
  })

  it('/album/singer/beatles should return 404 Not Found', function(done){
      api.get('/album/singer/beatles')
      .expect(404, done)
  })

  it('/album/search?type=摇滚 should return 私奔、无地自容、Don\'t break my heart、商品社会', function(done){
      api.get(find_yaogun_uri)
      .expect(200)
      .end(function(err, res){
          expect(res.body).to.not.equal('null');
          expect(res.body).to.deep.equal(yaogun_songs);
          done();
      })
  })

  it('/album/search?type=民谣 should return 去大理、女儿情、狐狸', function(done){
      api.get(find_minyao_uri)
      .expect(200)
      .end(function(err, res){
          expect(res.body).to.not.equal('null');
          expect(res.body).to.deep.equal(minyao_songs);
          done();
      })
  })

  it('/album/search?type=jazz should return 404 Not Found', function(done){
      api.get('/album/search?type=jazz')
      .expect(404, done)
  })

  it('/album/4 PUT should return new album with title: 北方的北方, length: 123', function(done){
      api.put('/album/4')
      .type('form')
      .send({
          title: '北方的北方',
          length: 123
      })
      .expect(200)
      .end(function(err, res){
          expect(res.body['title']).to.equal('北方的北方');
          expect(res.body['length']).to.equal('123');
          done();
      })
  })

  it('/album/20 PUT should return 404 Not Found', function(done){
      api.put('/album/20')
      .expect(404, done)
  })

})
