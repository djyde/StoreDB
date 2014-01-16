var storedb = function(collectionName){
  
  var cache = [], err, ls; 
  if(localStorage[collectionName]){
    ls = JSON.parse(localStorage[collectionName]);
  }
  return {
    insert: function(obj,callback){
      if(ls){
        for(var i = 0; i < ls.length; i++){
          cache.push(ls[i])
        }
        cache.push(obj);
        localStorage.setItem(collectionName,JSON.stringify(cache));
        callback(err);
        //document.write(cache)
      } else {
        cache.push(obj);
        localStorage.setItem(collectionName,JSON.stringify(cache));
        callback(err);
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
          callback(err,result)
        } else {
          err = 'collection not exist';
          callback(err,result);
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
                  case '$set':
                  for(newkey in upsert[upsrt]){
                    cache[i][newkey] = upsert[upsrt][newkey];
                  }

                  case '$inc':
                  for(newkey in upsert[upsrt]){
                    cache[i][newkey] = cache[i][newkey] + upsert[upsrt][newkey];
                  }

                  case '$push':
                  for(newkey in upsert[upsrt]){
                    cache[i][newkey].push(upsert[upsrt][newkey])
                  }

                  default: err = 'unknown upsert';
                }
              }
            }
          }
        }
        document.write(JSON.stringify(cache))
        callback(err)

      } else {
        err = 'collection not exist';
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
        } else {
          err = 'collection not exist';
          callback(err);
        }
      }
    },

  }
}