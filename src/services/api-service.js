class ApiService {

  constructor() {
    this._apiPath = '/data/';
  }

  getLords() {
    return this.get('lordsmembers');
  }

  getLordsInterests() {
    return this.get('lordsregisteredinterests');
  }

  /**
   * Temp, todo
   * @param  {string} entityName e.g. users, models
   * @return {object}            Promise
   */
  get(entityName) {

    return new Promise((resolve, reject) => {
      let path = `${this._apiPath}/${entityName}.json`;
      fetch(path)
        .then(response => response.json())
        .then(json => resolve(json.result.items))
        .catch(error => reject(error));
    });
  }
}

export const apiService = new ApiService();
