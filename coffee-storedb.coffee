storedb = (collectionName) ->
	cache = []
	ls = JSON.parse localStorage[collectionName] if localStorage[collectionName]
	return {
		insert: (obj, callback) ->
			cache.push data for data in ls if ls
			obj["_id"] = new Date().valueOf()
			cache.push obj
			localStorage.setItem collectionName, JSON.Stringify cache
			callback err,obj
		find: (obj, callback) ->
			if not ls
				callback?("collection not exist", [])
				return
			cache.push data for data in ls if ls
			return cache if arguments.length is 0
			result = []
			for key, value of obj
				result.push data for data in cache if data[key] is value
			callback(err,result)
		update: (obj, upsert, callback) ->
			if not ls
				callback("collection not exist", [])
				return
			cache.push data for data in ls if ls
			for key, value of obj
				for data, index in cache
					if data[key] is value
						for upsrt, upsrt_val of upsert
							switch upsrt
								when "$inc" then data[newkey] += newval for newkey, newval of upsrt_val
								when "$set" then data[newkey] = newval for newkey, newval of upsrt_val
								when "$push" then data[newkey].push newval for newkey, newval of upsrt_val
								else err = 'unknown upsert'
			localStorage.setItem collectionName, JSON.Stringify cache
			callback(err)
		remove: (obj, callback) ->
			if not ls
				callback("collection not exist", [])
				return
			if arguments.length is 0
				localStorage.removeItem(collectionName)
			else
				cache.push data for data in ls if ls
				for key, value of obj
					for i in [0..cache.length]
						cache.splice(i,1) if cache[i][key] is value
				localStorage.setItem collectionName JSON.Stringify cache
				callback err
	}