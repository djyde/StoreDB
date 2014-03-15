StoreDB
=======

[English version](https://github.com/djyde/StoreDB/blob/master/README_EN.md)


StoreDB是一个基于localStorage的本地储存库，通过模拟MongoDB的一些API和概念（如“集(`collection`)”和“文档(`document`)”），弥补了原生localStorage的多处不足，大大增强了localStorage的功能。

Why StoreDB?
------
* StoreDB使你在无须配置数据库的情况下，在静态页面中也能实现大量数据储存和交互。这意味着你能用StoreDB非常简便地建立一个功能强大的SPA（单页面应用，Single Page Application）。

* StoreDB也适用于demo产品的开发。比如，假定你正在参加编程马拉松，你的团队只不过是想做出一个用以展示的demo，却不得不花费时间在远程或本地架设server，再配置数据库，白白浪费了宝贵的时间。使用StoreDB，你只需嵌入一段javascript代码就能实现丰富的数据交互。

* 使用AngularJS配合StoreDB更是如虎添翼。

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

###插入（Insert）
向名为`players`的集合中插入一条文档：
```javascript
storedb('players').insert({"name":"Randy","sex":"male","score":20},function(err,result){
  if(!err){
    //do sth...
  } else //do sth...
})
```

###查询（Find）
查询`players`集合中`name`为`Randy`的文档：
```javascript
storedb('players').find({"name":"Randy"},function(err,result){
  if(!err){
    //use result to do sth...
  } else //do sth...
})
```
如果需要查询集合中所有文档，将参数设置为空即可：
```javascript
storedb('players').find()
```
函数将返回一个数组类型。

###更新（Update）
为`players`集合中`name`为`Randy`的`score`增加`10`：
```javascript
storedb('players').update({"name":"Randy"},{"$inc":{"score":"10"}},function(err){
  if(!err){
    //do sth...
  } else //do sth...
})
```
你可能已经注意到，StoreDB拥有和MongoDB一样的修改器！关于修改器类型请查看[API](#apis)。

如果修改器为空，则默认为`$set`修改器：
```javascript
storedb('players').update({"name":"Randy"}, {"sex":"male","name":"kriss"})
```

###删除（Remove）
删除在`players`集合中`name`为`Randy`的一条文档：
```javascript
storedb('players').remove({"name":"Randy"},function(err){
  if(!err){
    //do sth...
  } else //do sth...
})
```
如果要把整个集合删除，把参数设置为空：
```javascript
storedb('players').remove()
```

APIs
------

####storedb(collectionName)
* `collectionName`：`string`，需要操作的集合名。如果集合不存在，则自动创建。

#####.insert(newObj,callback)
* `newObj`：`JSON object`，插入的文档。
* `callback`：`function`，包含参数`err`和`result`：无错误时`err`返回`undefined`。`result`返回此次创建的文档对象。
* **系统会自动为每一条文档创建unix时间戳id——`_id`**，可通过callback中的result._id查看插入文档时所创建的id。

#####.find()
* 返回`Array`，该集合所有文档。

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
