const REQUEST = {
  login: '/user/login',
  get_code_img: '/user/get_code_img',
  index: '/',
  order_week_data: '/order/order_week_data', //近7天订单数
  user_list: '/user/get_user_list',
  address_list: '/user/get_user_addressList',
  orderList: '/order/orderList',
  categoryList: '/goods/categoryList',
  addCategory: '/category/addCategory',
  deleteCategory: '/category/deleteCategory',
  updateCateGory: '/category/updateCateGory',
  goodsList: '/goods/goodsList',
  addGoods: '/goods/addGoods',
  updateGoods: '/goods/updateGoods',
  goodsAttributeCategoryList: '/category/goodsAttributeCategoryList',
  addUpdateGoodsAttribute: '/category/addUpdateGoodsAttribute',
  GoodsAttributeList: '/category/GoodsAttributeList',
  GoodsAttributeInfo: '/category/GoodsAttributeInfo',
  getSTS: '/getSTS',
  changeGoodsStatus: '/goods/changeGoodsStatus',
  addComment: '/order/addComment', //添加评论
  CommerList: '/order/CommerList',
  addRemark: '/order/addRemark',
  diverGoods: '/order/diverGoods',
  getMessageList: '/message/getMessageList',
  changeMessageStatus: '/message/changeMessageStatus'
};
export default REQUEST;
