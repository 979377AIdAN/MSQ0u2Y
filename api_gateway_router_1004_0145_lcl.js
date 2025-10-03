// 代码生成时间: 2025-10-04 01:45:18
import { Router } from 'svelte-routing';

// 定义API网关路由器
class ApiGatewayRouter extends Router {

  // 构造函数，注册路由
  constructor() {
    super({
      // 基础路由配置
      routes: [
        { path: '/', handler: () => import('./home.svelte') },
        { path: '/about', handler: () => import('./about.svelte') },
        // 更多的路由可以在这里添加
      ],
      // 错误处理
      onError: (error) => {
        console.error('Routing error:', error);
        // 可以在这里添加错误页面的逻辑
      },
      // 匹配不到路由时的处理
      onNotFound: () => {
        // 可以在这里添加404页面的逻辑
      },
    });
  }

  // 启动路由器
  start() {
    this.listen();
  }
}

// 创建API网关路由器实例并启动
const apiGatewayRouter = new ApiGatewayRouter();
apiGatewayRouter.start();

// 导出路由器实例，以便在其他部分的应用程序中使用
export default apiGatewayRouter;