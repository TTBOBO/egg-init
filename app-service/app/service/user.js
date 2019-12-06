'use strict';

const Service = require('egg').Service;
class User extends Service {
  async getUserList() {
    const { app } = this;
    const sequelize = app.Sequelize;
    // const { Op } = sequelize;
    // return await app.model.UserInfo.grid({
    //   type: 'findAll',
    //   include: {
    //     model: app.model.User,
    //     as: 'userTable'
    //   }
    // });
    return await app.model.User.grid({
      type: 'findAll',
      // pagination: { page: 1, size: 1000 },
      attributes: [
        'name',
        'createdTime',
        [
          sequelize.fn('COUNT', sequelize.col('taskdata.taskname')),
          'tasknamecount'
        ]
      ],
      // attributes: {
      //   include: [
      //     sequelize.col('taskdata.taskname')

      //     // sequelize.fn('COUNT', sequelize.col('taskdata.taskname')),
      //     // 'tasknamecount'
      //   ]
      // },
      // where: {
      //   uuid: '$taskdata.userid$'
      // },
      // distinct: true
      // attributes: {
      //   exclude: [ 'password', 'address' ],
      //   include:
      // },
      include: [
        {
          model: this.app.model.Task,
          as: 'taskdata'
          // attributes: [
          //   // [ sequelize.fn('COUNT', sequelize.col('taskname')), 'tasknamecount' ]
          // ]
          // attributes: {
          //   include: [
          //     [
          //       sequelize.fn('COUNT', sequelize.col('taskdata.taskname')),
          //       'tasknamecount'
          //     ]
          //   ]
          // }
          // where: {
          //   taskname: '测试name'
          // }
        }
        // {
        //   model: this.app.model.UserInfo,
        //   // required: true,
        //   where: {
        //     age: {
        //       [Op.gte]: 18
        //     }
        //   },
        //   attributes: {
        //     exclude: [ 'createdTime' ]
        //   }
        // }
      ]
    });
  }
  async updateUser() {
    return await this.app.model.User.update(
      { uuid: 'bf724940-bffd-11e9-8b24-31e475a8a316' },
      {
        where: {
          uuid: 'bf724940-bffd-11e9-8b24-31e475a8a315'
        }
      }
    );
  }

  async createUser() {
    const { User } = this.app.model;
    const uuidv1 = require('uuid/v1');
    const createTime = new Date();
    let data = await User.findOrCreate({
      where: { name: 6665 },
      defaults: {
        uuid: uuidv1(),
        name: '6665',
        password: '123456',
        createdTime: createTime,
        lastModifierTime: createTime,
        lastModifierName: '',
        creatorName: '',
        enableStatus: 1,
        mobilPhone: ''
      }
    });
    return data;
  }

  async addUserAndTask() {
    const createTime = new Date();
    const { User, UserInfo, Task } = this.app.model;
    const uuidv1 = require('uuid/v1');
    return await User.createOne(
      {
        uuid: uuidv1(),
        name: '6664',
        password: '123456',
        createdTime: createTime,
        lastModifierTime: createTime,
        lastModifierName: '',
        creatorName: '',
        enableStatus: 1,
        mobilPhone: '',
        userinfo: {
          // userinfo   对应的是 model  define 的一个参数或者是 as 的  字符串
          age: 22,
          address: '江西南昌市'
        },
        taskdata: [
          // 因为task 对象user模型的关系是  hasMany  所以要加上 s
          {
            taskname: '任务一',
            taskInfo: '任务一详情',
            createdTime: createTime
          },
          {
            taskname: '任务二',
            taskInfo: '任务二详情',
            createdTime: createTime
          }
        ]
      },
      {
        include: [
          UserInfo,
          { model: Task, as: 'taskdata' } // 如果使用as 设置别名的话 这里也要设置as 别名
          // Task
        ]
      }
    );
  }

  async createTasks() {
    let createTime = new Date();
    let data = await this.app.model.Task.bulkCreate([
      {
        taskname: '任务三',
        taskInfo: '任务三详情',
        createdTime: createTime
      },
      {
        taskname: '任务四',
        taskInfo: '任务四详情',
        createdTime: createTime
      }
    ]);
    console.log(JSON.stringify(data));
    await this.app.model.Task.update(
      { taskname: '任务四修改' },
      {
        where: { taskname: '任务四' }
      }
    );
    return this.app.model.Task.findAll();
  }
}
module.exports = User;
