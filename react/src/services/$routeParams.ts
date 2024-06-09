// react/src/services/$routeParams.ts

class RouteParamsService {
  private params: { [key: string]: any } = {};

  constructor() {
    // Initialize with empty params
    this.params = {};
  }

  // Method to get a parameter by name
  getParam(name: string): any {
    return this.params[name];
  }

  // Method to set a parameter
  setParam(name: string, value: any): void {
    this.params[name] = value;
  }

  // Method to get all parameters
  getAllParams(): { [key: string]: any } {
    return this.params;
  }

  // Method to clear all parameters
  clearParams(): void {
    this.params = {};
  }
}

export default new RouteParamsService();