import 'whatwg-fetch'


class DataHub {
  constructor() {
    this.requests = {};
    this.responses = {};
  }

  get(url, {cache: cache, json: json} = {cache: true, json: true}, callback) {
    if (!cache) {
      fetch(url).then(callback);
      return;
    }

    if (this.requests[url]) {
      this.requests[url].push(callback);
      return;
    }

    if (this.responses[url]) {
      callback(this.responses[url]);
      return;
    }

    const req = fetch(url);
    if (json) {
      req.then((response) => response.json());
    }

    req.then(this.callback.bind(this, url));

    this.requests[url] = [callback];
  }

  callback(url, response) {
    for (const callback of this.requests[url]) {
      callback(response);
    }

    delete this.requests[url];
    this.responses[url] = response;
  }
}

window.dataHub = new DataHub();
