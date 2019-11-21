/*  前端埋点解决方案   */
var serverUrl="http://wu-admin-server.wuliang666.com";
var applicationId = "A6012445050426";
var deviceModel = localStorage.getItem('deviceModel') || "";  // 比如iPhone X的型号： iPhone10,3
var deviceId = localStorage.getItem('deviceId') || "";
var userId = localStorage.getItem('userId') || "";
/*  节点类型  mon-log  data-log="log"  */
function getLog(){
    try {
        var monLog = document.getElementsByClassName('mon-log');
        for(var i = 0;i < monLog.length;i++){
            monLog[i].addEventListener('click',function(){
                var log = this.dataset.log;
                log ?  monAjax(log) : "";
            },false);
        }
    } catch (error) {
        
    }
}
// 上报日志
function monAjax(log){
    try {
        // api.ajax({
        //     url: serverUrl+'/monitor/savelog?appid='+applicationId+'&log='+log+'&deviceModel='+deviceModel+'&deviceId='+deviceId+'&userId'+userId,
        //     method: 'get',
        //     data: {
        //         value: {}
        //     },
        // }, function(ret, err) {});
    } catch (error) {
       
    }
}