import instance from "../config/axiosConf";
import _ from "lodash";

export default {
  Get(url, data, callback) {
    instance({
      url: url,
      params:data,
    }).then((res) => {
        if (_.isNull(res.errmsg)) {
          callback(null, res);
        } else {
          callback(res.errmsg, null);
        }
      })
      .catch((err) => {
        callback(err.message, null);
      });
  },
  Post(url, data, callback) {
    instance
      .post(url, _.isNull(data) ? null : data)
      .then((res) => {
        if (_.isNull(res.errmsg)) {
          callback(null, res);
        } else {
          callback(res.errmsg, null);
        }
      })
      .catch((err) => {
        callback(err.message, null);
      });
  },
  // Post(url, data, callback) {
  //     instance.post(
  //         url,
  //         data,
  //     ).then(res => {
  //         callback(null, res)
  //     }).catch(err => {
  //         callback(err.message, null)
  //     })
  // },
  Put(url, data, callback) {
    instance
      .put(url, _.isNull(data) ? null : data)
      .then((res) => {
        if (_.isNull(res.errmsg)) {
          callback(null, res);
        } else {
          callback(res.errmsg, null);
        }
      })
      .catch((err) => {
        callback(err.message, null);
      });
  },
  Delete(url, data, callback) {
    instance
      .delete(url, _.isNull(data) ? null : data)
      .then((res) => {
        if (_.isNull(res.errmsg)) {
          callback(null, res);
        } else {
          callback(res.errmsg, null);
        }
      })
      .catch((err) => {
        callback(err.message, null);
      });
  },
};
