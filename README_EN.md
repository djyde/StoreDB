StoreDB
=======

StoreDB is a local data store based on HTML5 LocalStorage. It makes up some shortages of native LocalStorage and extends LocalStorage functionality by providing MogonDB-Style APIs and using concepts like `collection`, `document`, etc.

Why StoreDB?
------
* StoreDB supports large data store and interaction in static webpage without database configuration. Anyone could easily build a powerful SPA(Single Page Application) with StoreDB.

* StoreDB is suitable for the development of demo production. Imagine that you are participating in a marathon programming and time is so running out that you do not have time to set up a local/remote server and database configuration, all your team need is a show demo. Using StoreDB to implement data interaction could be a much better solution.

* combination of AngularJS and StoreDB would be a much more powerful solution.

Example
------
[EverFeed](http://djyde.github.io/everfeed)：Simple RSS reader

Tutorial
------
[入门指南](http://www.cnblogs.com/Randylu/p/3523680.html)

Install
------

###bower:
```
$ bower install storedb
```

###HTML:
```html
<script type="text/javascript" src="/path/to/storedb.js"></script>
```

Quick Start
------

###Insert
Insert data into `players` set:
```javascript
storedb('players').insert({"name":"Randy","sex":"male","score":20},function(err,result){
  if(!err){
    //do sth...
  } else //do sth...
})
```

###Find
query data with the `name` as `Randy` in `players` collection
```javascript
storedb('players').find({"name":"Randy"},function(err,result){
  if(!err){
    //use result to do sth...
  } else //do sth...
})
```
find all data by passing no parameter to the function
```javascript
storedb('players').find()
```
List-type data would be returned from function

###Update
update `score` value by increasing 10 with the `name` as `Randy` in `player` collection
```javascript
storedb('players').update({"name":"Randy"},{"$inc":{"score":"10"}},function(err){
  if(!err){
    //do sth...
  } else //do sth...
})
```
You may have noticed that StoreDB has the MongoDB-style modifier! Check the modifier type out in [API](#apis).


###Remove
remove data with the `name` as `Randy` in `players` collection
```javascript
storedb('players').remove({"name":"Randy"},function(err){
  if(!err){
    //do sth...
  } else //do sth...
})
```
remove all data in collection by passing no parameter to the function
```javascript
storedb('players').remove()
```

APIs
------

####storedb(collectionName)
* `collectionName`：`string`，automatically create if not exist。

#####.insert(newObj,callback)
* `newObj`：`JSON object`，插入的文档。
* `callback`：`function`，包含参数`err`和`result`：无错误时`err`返回`undefined`。`result`返回此次创建的文档对象。
* **系统会自动为每一条文档创建unix时间戳id——`_id`**，可通过callback中的result._id查看插入文档时所创建的id。

#####.find()
* return `Array`，该集合所有文档。

#####.find(matchObj,callback)
* `matchObj`：`JSON object`，匹配的文档
* `callback`：`function`，包含参数`err`和`result`：无错误时`err`返回`undefined`。`result`返回查询结果数组。

#####.update(matchObj,upsert,callback)
* `matchObj`：`JSON object`，匹配的文档
* `upsert`：`JSON object`，对象中key应为修改器类型，value为修改对象。例如：
```
storedb('collectionA').update({"foo":"hi"},{"$set":{"bar":"hello"}},function(err){})
```
* `callback`：`function`，包含参数`err`：无错误时`err`返回`undefined`。

修改器类型：
- `$inc`：为目标增加（或减小）对应数值
- `$set`: 修改目标内容
- `$push`：为目标数组插入对应元素

#####.remove()
* 移除该集合所有文档

#####.remove(matchObj,callback)
* `matchObj`：`JSON object`，匹配的对应要删除的文档。
* `callback`：`function`，包含参数`err`：无错误时`err`返回`undefined`。

Donate
------
 <a href='http://me.alipay.com/djyde'> <img src='https://img.alipay.com/sys/personalprod/style/mc/btn-index.png' /> </a>
