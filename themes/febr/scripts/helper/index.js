"use strict";

hexo.extend.helper.register("json_stringify", function (value) {
  return value ? JSON.stringify(value) : value;
});
