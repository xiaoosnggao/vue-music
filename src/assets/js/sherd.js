/**
 * Created by Administrator on 2016/6/14.
 */
var $ = require('expose?jQuery!jquery')
$(function () {
  $('.gxs-body').height(window.innerHeight - $('.gxs-header').height() - $('.gxs-footer').height())
})
