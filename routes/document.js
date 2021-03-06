var express = require('express');
var router = express.Router();
const DocumentService=require('../Service/DocumentService');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '欢迎光临' })
})


//获取文档列表
router.get('/list',function (req,res,next) {
  // if(req.query.draft&&req.query.draft=='true'){
  //   DocumentService.listdraft(req.query,function(data){
  //     return res.json(data);
  //   })
  // }else{
  //   DocumentService.list(req.query,function(data){
  //     return res.json(data);
  //   })
  // }
  if(req.query.page){
    DocumentService.list(req,function(data){
      return res.json(data)
    })
  }else{
    DocumentService.listdraft(req,function(data){
      return res.json(data)
    })
  }
})


//保存文档
// router.post('/add',function (req,res,next) {
//   DocumentService.create(req.body,function (data) {
//     return res.json(data);
//   })
// })
router.post('/add',function (req,res,next) {
  DocumentService.create(req,function (data) {
    return res.json(data);
  })
})


//查看某篇文章
router.get('/view',function(req,res,next){
  DocumentService.search(req.query,function (data) {
    return res.json(data);
  })
})


//删除文档
router.delete('/delete',function (req,res,next) {
  DocumentService.delete(req.query,function (data) {
    return res.json(data);
  })
});

module.exports = router;