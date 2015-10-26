'use strict';

class RoutesClient {
  constructor(request) {
    this.request = request;
  }

  list(query) {
    return this.request.get('/v3/routes', query)
      .then(response => response.body.items);
  }

  get(id) {
    return this.request.get(`/v3/routes/${id}`)
      .then(response => response.body.route);
  }

  create(data) {
    return this.request.post('/v3/routes', data)
      .then(response => response.body.route);
  }

  update(id, data) {
    return this.request.put(`/v3/routes/${id}`, data)
      .then(response => response.body);
  }

  destroy(id) {
    return this.request.delete(`/v3/routes/${id}`)
      .then(response => response.body);
  }
}

module.exports = RoutesClient;
