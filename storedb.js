var storedb = function(collectionName){
  
  var cache = [], err, ls; 
  if(localStorage[collectionName]){
    ls = JSON.parse(localStorage[collectionName]);
  }

  return {
    insert: function(obj,callback){
      if(ls){
        obj["_id"] = new Date().valueOf();
        for(var i = 0; i < ls.length; i++){
          cache.push(ls[i])
        }
        cache.push(obj);
        localStorage.setItem(collectionName,JSON.stringify(cache));
        if(callback)
          callback(err,obj);
      } else {
        obj["_id"] = new Date().valueOf();
        cache.push(obj);
        localStorage.setItem(collectionName,JSON.stringify(cache));
        if(callback)
          callback(err,obj);
      }
    },

    find: function(obj,callback){
      if(arguments.length == 0){
        if(ls){
          var result = [];
          for(var i = 0; i < ls.length; i++){
            cache.push(ls[i]);
          }
          return cache;
        }
      } else {
        if(ls){
          var result = [];
          for(var i = 0; i < ls.length; i++){
            cache.push(ls[i]);
          }
          for(var key in obj){
            for(var i = 0; i < cache.length; i++){
              if(cache[i][key] == obj[key]){
                result.push(cache[i]);
              }
            }
          }
          if(callback)
            callback(err,result);
          else
            return result;
        } else {
          err = 'collection not exist';
          if(callback)
            callback(err,result);
          else
            return result;
        }
      }     
    },

    update: function(obj,upsert,callback){
      if(ls){
        for(var i = 0; i < ls.length; i++){
          cache.push(ls[i]);
        }
        for(var key in obj){
          for(var i = 0; i < cache.length; i++){
            if(cache[i][key] == obj[key]){
              for(var upsrt in upsert){
                switch(upsrt){
                  case "$inc":
                  for(var newkey in upsert[upsrt]){
                    cache[i][newkey] = cache[i][newkey] + upsert[upsrt][newkey]
                  }
                  break;

                  case "$set":
                  for(var newkey in upsert[upsrt]){
                    cache[i][newkey] = upsert[upsrt][newkey]
                  }
                  break;

                  case "$push":
                  for(var newkey in upsert[upsrt]){
                    cache[i][newkey].push(upsert[upsrt][newkey])
                  }
                  break;

                  default:
                  err = 'unknown upsert';

                }
              }

              if(err == 'unknown upsert') {
                cache[i] = upsert;
              }
            }
          }
        }
        localStorage.setItem(collectionName,JSON.stringify(cache))
        if(callback)
          callback(err)

      } else {
        err = 'collection not exist';
        if(callback)
          callback(err);
      }
    },

    remove: function(obj,callback){
      if(arguments.length == 0){
        localStorage.removeItem(collectionName)
      } else {
        if(ls){
          for(var i = 0; i < ls.length; i++){
            cache.push(ls[i]);
          }
          for(var key in obj){
            for(var i = 0; i < cache.length; i++){
              if(cache[i][key] == obj[key]){
                cache.splice(i,1)
              }
            }
          }
          localStorage.setItem(collectionName,JSON.stringify(cache));
          if(callback)
            callback(err);
        } else {
          err = 'collection not exist';
          if(callback)
            callback(err);
        }
      }
    },

  }
}