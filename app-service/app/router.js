'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;
  // app.beforeStart(async () => {
  //   await app.model.sync({
  //     alter: true
  //   });
  // });
  // if (app.env === 'prod') {
  //   app.beforeStart(async () => {
  //     await app.model.sync({
  //       alter: true
  //     });
  //   });
  // }
  router.get('/', controller.home.index);
  router.post('/user/login', controller.user.common.login);
  router.post('/user/register', controller.user.common.register);
  router.post('/upload', controller.home.uploadFile);
  router.get('/user/get_user_addressList', controller.user.address.getAddressList);
  router.post('/user/updateAddress', controller.user.address.updateAddress);
  router.post('/user/deleteAddress', controller.user.address.deleteAddress);
  router.post('/user/addAddress', controller.user.address.addAddress);
  router.post('/user/setDefaltStatus', controller.user.address.setDefaltStatus);
  router.get('/user/login_out', controller.user.common.loginOut);
  router.get('/order/order_week_data', controller.order.weekCount);
  router.get('/user/get_code_img', controller.user.common.getCodeImg);
  router.get('/user/get_user_list', controller.user.common.getUserList);
  router.get('/deleteAdmin', controller.home.deleteAdmin);
  router.get('/os/get_network_io', controller.os.getNetworkIo);
  router.get('/exec', controller.home.exec);
  router.get('/order/orderList', controller.order.orderList);
  router.post('/order/changeOrderStatus', controller.order.changeOrderStatus);
  router.post('/order/diverGoods', controller.order.diverGoods);
  router.get('/goods/goodsList', controller.goods.goodsList);
  router.get('/goods/getSkuList', controller.goods.getSkuList);
  router.post('/goods/changeSku', controller.goods.changeSku);
  router.post('/goods/addVertifyRecord', controller.goods.addVertifyRecord);
  // router.post('/goods/addGoods', controller.goods.addGoods);
  router.post('/goods/addGoods', controller.goods.addGoods);
  router.post('/goods/deleteGoods', controller.goods.deleteGoods);
  router.get('/goods/updateGoodsInfo', controller.goods.updateGoodsInfo);
  // router.post('/goods/updateGoods', controller.goods.updateGoods);
  router.post('/goods/changeGoodsStatus', controller.goods.changeGoodsStatus);
  router.get('/goods/categoryList', controller.goods.categoryList);
  router.get('/categary/getCategoryTree', controller.goods.getCategoryTree);
  router.get('/category/goodsAttributeCategoryList', controller.goods.goodsAttributeCategoryList);
  router.post('/category/addGoodsAttributeCategory', controller.goods.addGoodsAttributeCategory);
  router.post('/category/updateGoodsAttributeCategory', controller.goods.updateGoodsAttributeCategory);
  router.get('/category/GoodsAttributeList', controller.goods.GoodsAttributeList);
  router.post('/category/deleteGoodsAttributeCategory', controller.goods.deleteGoodsAttributeCategory);
  router.post('/category/addUpdateGoodsAttribute', controller.goods.addUpdateGoodsAttribute);
  router.get('/category/GoodsAttributeInfo', controller.goods.GoodsAttributeInfo);
  router.delete('/categary/deleteGoodsAttribute', controller.goods.deleteGoodsAttribute);
  router.post('/category/addCategory', controller.goods.addCategory);
  router.post('/category/deleteCategory', controller.goods.deleteCategory);
  router.post('/category/updateCateGory', controller.goods.updateCateGory);
  router.post('/order/addComment', controller.order.addComment);
  router.get('/order/CommerList', controller.order.CommerList);
  router.post('/order/addRemark', controller.order.addRemark);
  router.get('/getSTS', controller.home.getSTS);
  router.get('/message/getMessageList', controller.message.getMessageList);
  router.post('/message/changeMessageStatus', controller.message.changeMessageStatus);
  router.post('/wechart/wechartLogin', controller.user.common.wechartLogin);
  router.get('/flash/getFlashList', controller.flash.getFlashList);
  router.post('/flash/crateFlashPromotion', controller.flash.crateFlashPromotion);
  router.post('/flash/delFlashPromotion', controller.flash.delFlashPromotion);
  router.get('/flash/getFlashPromotionGoodsList', controller.flash.getFlashPromotionGoodsList);
  router.post('/flash/crateFlashPromotionGoods', controller.flash.crateFlashPromotionGoods);
  router.post('/flash/delFlashPromotionGoods', controller.flash.delFlashPromotionGoods);
  router.post('/flash/updateFlashPromotionGoods', controller.flash.updateFlashPromotionGoods);
  router.get('/smsHome/getSmsList', controller.smsHome.getSmsList);
  router.post('/smsHome/delSms', controller.smsHome.delSms);
  router.post('/smsHome/updateSms', controller.smsHome.updateSms);
  router.post('/smsHome/createdSms', controller.smsHome.createdSms);
  router.get('/smsHome/getAdvList', controller.smsHome.getAdvList);
  router.get('/smsHome/getAdvInfo', controller.smsHome.getAdvInfo);
  router.post('/smsHome/createdAndUpdateAdv', controller.smsHome.createdAndUpdateAdv);
  router.post('/smsHome/delAdv', controller.smsHome.delAdv);


  router.get('/grpc', controller.home.grpc);
};
