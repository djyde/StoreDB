var storedb = function(collectionName){
    collectionName = collectionName ? collectionName : 'default';
    
    var err;
    var cache = localStorage[collectionName] ? JSON.parse(localStorage[collectionName]) : [];

    return {

        insert: function(obj,callback){
            obj["_id"] = new Date().valueOf();          
            cache.push(obj);
            localStorage.setItem(collectionName,JSON.stringify(cache));
            if(callback)
                callback(err,obj);
        },

        find: function(obj, callback){
            if(arguments.length == 0){
                return cache;
            } else {
                var result = [];

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
            }     
        },

        update: function(obj,upsert,callback){

            for(var key in obj){
                for(var i = 0; i < cache.length; i++){
                    if(cache[i][key] == obj[key]){

                        end_loops:
                        for(var upsrt in upsert){
                            switch(upsrt){
                            case "$inc":
                                for(var newkey in upsert[upsrt]){
                                    cache[i][newkey] = parseInt(cache[i][newkey]) + parseInt(upsert[upsrt][newkey]);
                                }
                                break;

                            case "$set":
                                for(var newkey in upsert[upsrt]){
                                    cache[i][newkey] = upsert[upsrt][newkey];
                                }
                                break;

                            case "$push":
                                for(var newkey in upsert[upsrt]){
                                    cache[i][newkey].push(upsert[upsrt][newkey]);
                                }
                                break;

                            default:
                                upsert['_id'] = cache[i]['_id'];
                                cache[i] = upsert;
                                break end_loops;
                            }
                        }
                    }
                }
            }
            localStorage.setItem(collectionName,JSON.stringify(cache));
            if(callback)
                callback(err);

        },

        remove: function(obj,callback){
            if(arguments.length == 0){
                localStorage.removeItem(collectionName);
            } else {

                for(var key in obj){
                    for(var i = 0; i < cache.length; i++){
                        if(cache[i][key] == obj[key]){
                            cache.splice(i,1);
                        }
                    }
                }
                localStorage.setItem(collectionName, JSON.stringify(cache));
            }
            
            if(callback)
                callback(err);
            
        }

    };
};
