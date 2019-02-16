// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/account/myinfo': (req, res) => {
    res.send({
      code: 0,
      account: {
        id: 1,
        username: 'abcd',
        createtime: '2019-02-14T22:19:44.000Z',
      },
    });
  },
  // // GET POST 可省略
  // 'GET /api/users': [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //   },
  // ],
  'POST /api/account/login': (req, res) => {
    const { email, password } = req.body;
    if (email === 'zhs007@heyalgo.io' && password === '12345678') {
      res.send({
        code: 0,
        account: {
          id: 1,
          username: 'abcd',
          createtime: '2019-02-14T22:19:44.000Z',
        },
      });

      return;
    }

    res.send({ code: 1 });

    // const { password, userName, type } = req.body;
    // if (password === 'ant.design' && userName === 'admin') {
    //   res.send({
    //     status: 'ok',
    //     type,
    //     currentAuthority: 'admin',
    //   });
    //   return;
    // }
    // if (password === 'ant.design' && userName === 'user') {
    //   res.send({
    //     status: 'ok',
    //     type,
    //     currentAuthority: 'user',
    //   });
    //   return;
    // }
    // res.send({
    //   status: 'error',
    //   type,
    //   currentAuthority: 'guest',
    // });
  },
  'POST /api/account/register': (req, res) => {
    res.send({ code: 1 });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};
