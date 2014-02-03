// Generated by CoffeeScript 1.6.3
var storedb;

storedb = function(collectionName) {
  var cache, ls;
  cache = [];
  if (localStorage[collectionName]) {
    ls = JSON.parse(localStorage[collectionName]);
  }
  return {
    insert: function(obj, callback) {
      var data, _i, _len;
      if (ls) {
        for (_i = 0, _len = ls.length; _i < _len; _i++) {
          data = ls[_i];
          cache.push(data);
        }
      }
      obj["_id"] = new Date().valueOf();
      cache.push(obj);
      localStorage.setItem(collectionName, JSON.Stringify(cache));
      return callback(err, obj);
    },
    find: function(obj, callback) {
      var data, key, result, value, _i, _j, _len, _len1;
      if (!ls) {
        callback("collection not exist", []);
        return;
      }
      if (ls) {
        for (_i = 0, _len = ls.length; _i < _len; _i++) {
          data = ls[_i];
          cache.push(data);
        }
      }
      if (arguments.length === 0) {
        return cache;
      }
      result = [];
      for (key in obj) {
        value = obj[key];
        if (data[key] === value) {
          for (_j = 0, _len1 = cache.length; _j < _len1; _j++) {
            data = cache[_j];
            result.push(data);
          }
        }
      }
      return callback(err, result);
    },
    update: function(obj, upsert, callback) {
      var data, err, index, key, newkey, newval, upsrt, upsrt_val, value, _i, _j, _len, _len1;
      if (!ls) {
        callback("collection not exist", []);
        return;
      }
      if (ls) {
        for (_i = 0, _len = ls.length; _i < _len; _i++) {
          data = ls[_i];
          cache.push(data);
        }
      }
      for (key in obj) {
        value = obj[key];
        for (index = _j = 0, _len1 = cache.length; _j < _len1; index = ++_j) {
          data = cache[index];
          if (data[key] === value) {
            for (upsrt in upsert) {
              upsrt_val = upsert[upsrt];
              switch (upsrt) {
                case "$inc":
                  for (newkey in upsrt_val) {
                    newval = upsrt_val[newkey];
                    data[newkey] += newval;
                  }
                  break;
                case "$set":
                  for (newkey in upsrt_val) {
                    newval = upsrt_val[newkey];
                    data[newkey] = newval;
                  }
                  break;
                case "$push":
                  for (newkey in upsrt_val) {
                    newval = upsrt_val[newkey];
                    data[newkey].push(newval);
                  }
                  break;
                default:
                  err = 'unknown upsert';
              }
            }
          }
        }
      }
      localStorage.setItem(collectionName, JSON.Stringify(cache));
      return callback(err);
    },
    remove: function(obj, callback) {
      var data, i, key, value, _i, _j, _len, _ref;
      if (!ls) {
        callback("collection not exist", []);
        return;
      }
      if (arguments.length === 0) {
        return localStorage.removeItem(collectionName);
      } else {
        if (ls) {
          for (_i = 0, _len = ls.length; _i < _len; _i++) {
            data = ls[_i];
            cache.push(data);
          }
        }
        for (key in obj) {
          value = obj[key];
          for (i = _j = 0, _ref = cache.length; 0 <= _ref ? _j <= _ref : _j >= _ref; i = 0 <= _ref ? ++_j : --_j) {
            if (cache[i][key] === value) {
              cache.splice(i, 1);
            }
          }
        }
        localStorage.setItem(collectionName(JSON.Stringify(cache)));
        return callback(err);
      }
    }
  };
};
