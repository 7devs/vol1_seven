var router = require('express').Router()
    songs = require('../../models/albums.js');

router.route('/')
    .get(function(req, res, next) {
        res.status(200).send(songs);
    })

router.route('/longerSong')
    .get(function(req, res, next) {
        longer_songs = get_longer_songs(songs);
        res.status(200).send(longer_songs);
    })

router.route('/search')
    .get(function(req, res, next) {
        var type = req.query.type;
        var songs = get_songs_by_type(type);
        if(songs.length>0) {
            res.status(200).send(songs);
        } else {
            res.status(404).send('No songs for ' + type);
        }
    })

router.route('/:key')
    .get(function(req, res, next) {
        var song_id = req.params.key-1;
        if(songs[song_id]) {
            res.status(200).send(songs[song_id]);
        } else {
            res.status(404).send('The album is not found.');
        }
    })
    .put(function(req, res, next) {
        var song = songs[req.params.key-1];
        if(song) {
          var length = song.length;
          var title = song.title;
          // var new_title = title + '(cover)';
          var new_title = req.body['title'];
          var new_length = req.body['length'];
          song.title = new_title;
          song.length = parseInt(new_length);
          res.status(200).send(song);
        } else {
            res.status(404).send('The song is not found.')
        }
    })

router.route('/singer/:name')
    .get(function(req, res, next) {
        var singer = req.params.name;
        console.log(singer);
        var songs = get_songs_by_singer(singer);
        if(songs.length>0) {
            res.status(200).send(songs);
        } else {
            res.status(404).send('No songs by ' + singer)
        }
    })

var get_longer_songs = function(songs) {
    var longer_songs = new Array();
    for(i=0; i<songs.length; i++) {
        var song = songs[i];
        if(song.length>180) {
            longer_songs.push(song);
        }
    }
    return longer_songs;
}

var get_songs_by_singer = function(singer) {
    var the_songs = new Array();
    for(i=0; i<songs.length; i++) {
        var song = songs[i];
        if(song.singer == singer) {
            the_songs.push(song);
        }
    }
    return the_songs;
}

var get_songs_by_type = function(type) {
    var the_songs = new Array();
    for(i=0; i<songs.length; i++) {
        var song = songs[i];
        if(song.type == type) {
            the_songs.push(song);
        }
    }
    return the_songs;
}

module.exports = router;
