// 'use strict';
// const concatModel = require('../core/concatModel');
// module.exports = app => {
//   const { model } = app;
//   const { schema } = require('../schema/comment')(app);
//   let Comment = model.define('comment', schema);
//   Comment = concatModel(Comment);
//   Comment.associate = () => {
//     // Remark.belongsTo(app.model.Customer, {
//     //   foreignKey: 'customerId',
//     //   targetKey: 'id'
//     // });
//     // Remark.belongsTo(app.model.Order, {
//     //   foreignKey: 'orderId',
//     //   targetKey: 'orderId'
//     // });
//     Comment.belongsTo(app.model.Customer, {
//       foreignKey: 'testId',
//       targetKey: 'id'
//     });
//   };
//   return Comment;
// };
'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/comment.js')(app);

  let Comment = model.define('comment', schema);
  Comment = concatModel(Comment);
  Comment.associate = () => {
    Comment.belongsTo(app.model.Order, {
      foreignKey: 'orderId',
      targetKey: 'orderId'
    });
    Comment.belongsTo(app.model.Customer, {
      foreignKey: 'uuid',
      targetKey: 'uuid'
    });
  };
  return Comment;
};
