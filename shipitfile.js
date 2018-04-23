'use strict';
module.exports = function(shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-cnpmjs')(shipit);
  require('shipit-pm2')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/github-monitor',
      repositoryUrl: 'https://github.com/Fantasy9527/ding-news-server.git',
      ignores: [
        '.git', 'node_modules',
      ],
      keepReleases: 1,
      deleteOnRollback: false,
      shallowClone: true,
      cnpm: {},
    },
    Production: {
      env: 'prod',
      pm2: {
        json: '/root/ding-news-server/current/pm2.json',
      },
      deployTo: '/root/ding-news-server/',

      servers: [ 'root@10.0.21.105' ],
      branch: 'master',
    },
    Development: {
      env: 'dev',
      isDevelopment: true,
      pm2: {
        json: '/root/ding-news-server/current/pm2.test.json',
      },
      deployTo: '/root/ding-news-server/',
      servers: [ 'root@10.0.21.105' ],
      branch: 'master',
    },
  });

  var bootstrap = function() {
    const baseDir = '/root/ding-news-server/current';
    // shipit.remote(`mkdir ${baseDir}/public;`);

    // shipit.remote(`ln -nfs /root/ding-news-server-project ${baseDir}/project`);
    // shipit.remote(`ln -nfs /root/project/Attachments ${baseDir}/app/static/Attachments`);
    // shipit.remote(`cd ${baseDir}; npm stop`);
    // setTimeout(function() {
    //   switch (shipit.config.env) {
    //     case 'dev':
    //       shipit.remote(`cd ${baseDir}; npm run start:dev`);
    //       break;
    //     case 'test':
    //       shipit.remote(`cd ${baseDir}; npm run start:test`);
    //       break;
    //     case 'prod':
    //       shipit.remote(`cd ${baseDir}; npm run start`);
    //       break;
    //     default:
    //       shipit.remote(`cd ${baseDir}; npm run start:dev`);
    //       break;
    //   }
    // }, 10000);

  };

  shipit.on('published', bootstrap);

  if (shipit.config.isDevelopment) {
    // 开发环境
    // 发布完成之后建立视图的链接
    shipit.on('rollbacked', () => {
      bootstrap();
    });

  } else {
    // 生产环境
    // 发布完成之后建立视图的链接
    shipit.on('rollbacked', () => {
      bootstrap();
    });
  }
};
