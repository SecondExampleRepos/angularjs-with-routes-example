// react/src/services/$routeParams.ts

interface RouteParams {
  [key: string]: any;
}

class RouteParamsService {
  private params: RouteParams = {};

  getParams(): RouteParams {
    return this.params;
  }

  setParams(newParams: RouteParams): void {
    this.params = { ...this.params, ...newParams };
  }

  clearParams(): void {
    this.params = {};
  }
}

const routeParamsService = new RouteParamsService();
export default routeParamsService;