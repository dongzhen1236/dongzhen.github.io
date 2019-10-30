
//Navbar悬停展开
$(".dropdown").mouseenter(function(){
    _dropdown_obj = this;
    setTimeout(function (){
        $(".navbar-top-links .dropdown").removeClass("open")
        $(_dropdown_obj).addClass("open")
    }, 200);
});
$(".dropdown").mouseleave(function(){
    $(this).removeClass("open");
});

function _openTool(name){
    $.get("runtime/open/" + name, function (data,status,xhr) {
        if (data.status){
            // success
        } else {
            alert(data.message ? data.message : "failed");
        }

    });
}
$("#open-note").click(function () {
    _openTool("note");
});
$("#open-calc").click(function () {
    _openTool("calc");
});
$("#open-cmd").click(function () {
    _openTool("cmd");
});

//显示遮罩层
function showMask() {
    $(document.body).css({
        'overflow-x': 'hidden',
        'overflow-y': 'hidden'
    });
    $('.mask').show();
}
//隐藏遮罩层
function hideMask() {
    $(document.body).css({
        'overflow-x': 'auto',
        'overflow-y': 'auto'
    });
    $('.mask').hide();
}

//  切换主题
function setTheme(name){
    var theme = document.getElementById('theme-css');
    var style = 'assets/css/theme/theme-' + name + '.css';
    if(theme){
        theme.setAttribute('href', style);
    } else {
        var head = document.getElementsByTagName('head')[0];
        theme = document.createElement("link");
        theme.setAttribute('rel', 'stylesheet');
        theme.setAttribute('href', style);
        theme.setAttribute('id', 'theme-css');
        head.appendChild(theme);
    }
    window.localStorage.setItem('lumino-theme', name);
}
var selectedTheme = window.localStorage.getItem('lumino-theme');
if(selectedTheme) {
    setTheme(selectedTheme);
}
window.setTimeout(function(){
    var el = document.getElementById('hide-theme');
    if (el && el.parentNode){
        el.parentNode.removeChild(el);
    }
}, 5);

// bootstrap提示框
function showTip(title, message){
    if (arguments.length == 1) {
        $(".bs-example-modal-sm").find("#mySmallModalLabel").html("信息");
        $(".bs-example-modal-sm").find(".modal-body").html(title);
    } else if (arguments.length == 2) {
        $(".bs-example-modal-sm").find("#mySmallModalLabel").html(title);
        $(".bs-example-modal-sm").find(".modal-body").html(message);
    }
    $(".bs-example-modal-sm").modal("show");
}

// 转换KB 到MB，GB
function changeKB(limit){
    var size = "";
    if (limit < 1024){                             // 小于1MB，则转化成KB
        size = limit.toFixed(2) + " KB";
    } else if(limit < 1024 * 1024){                // 小于1GB，则转化成MB
        size = (limit/1024).toFixed(2) + " MB";
    } else if(limit < 1024 * 1024 * 1024){         // 小于1TB，则转化成GB
        size = (limit/(1024 * 1024)).toFixed(2) + " GB";
    } else{
        size = (limit/(1024 * 1024 * 1024)).toFixed(2) + " TB";
    }
    var sizeStr = size + "";                            // 转成字符串
    var index = sizeStr.indexOf(".");                   // 获取小数点处的索引
    var dou = sizeStr.substr(index + 1 ,2)              // 获取小数点后两位的值
    if (dou == "00"){                                    // 判断后两位是否为00，如果是则删除00
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }
    if (index == 2){    // 小数点在第3位只保留1位小数
        return size.substring(0, index+2) + size.substring(index+3);
    }
    if (index == 3){    // 小数点在第4位,不保留小数
        return size.substring(0, index) + size.substring(index+3);
    }
    return size;
}

// var m = Math.ceil(value/1024);
// var g = Math.ceil(value/1024/1024);
// if (value < 10) {
//     return value.toFixed(2) + " KB";
// } else if (value < 100){
//     return value.toFixed(1) + " KB";
// } else if (value < 1000) {
//     return Math.ceil(value) + " KB";
// } else if (m < 10) {
//     return (value/1024).toFixed(2) + " MB";
// } else if (m < 100) {
//     return (value/1024).toFixed(1) + " MB";
// } else if (m < 1000) {
//     return m + " MB";
// } else if (g < 10){
//     return (m/1024).toFixed(2) + " GB";
// } else if (g < 100){
//     return (m/1024).toFixed(1) + " GB";
// } else if (g < 1000){
//     return g + " GB";
// } else {
//     return g + " GB";
// }


$(function (){

    // 左侧菜单栏展开和合并样式
    // 在调用 show 方法后触发该事件
    $('.nav.menu').on('show.bs.collapse', function () {
        //alert("123");
    });
    // Collapse 当折叠元素对用户可见时触发该事件（将等待 CSS 过渡效果完成）。
    $('.nav.menu').on('shown.bs.collapse', function () {
        $("a[aria-expanded='true']").find("i").removeClass();
        $("a[aria-expanded='true']").find("i").addClass("fa fa-chevron-up");
    });
    // Collapse 当折叠元素对用户隐藏时触发该事件（将等待 CSS 过渡效果完成）。
    $('.nav.menu').on('hidden.bs.collapse', function () {
        $("a[aria-expanded='false']").find("i").removeClass();
        $("a[aria-expanded='false']").find("i").addClass("fa fa-chevron-down");
    });

    // 加载登录用户
    // $(".profile-usertitle-name").load("system/user/loginUser");

    // 判断是否显示系统菜单
    // $.get("system/user/loginUserInfo",null,function (user) {
    //     console.log(user);
    //     if (user && user.pagesStr){
    //         $("#sidebar-system").css("display", "block");
    //         var pages = user.pagesStr.split(",");
    //         for (var i = 0; i < pages.length; i++) {
    //             $("#sidebar-system").find("li#li-" + pages[i]).css("display", "block");
    //         }
    //     }
    // })
});

// 排序时动态切换图标
function _initTheadSort(tableId){
    // 点击排序字段切换排序图标（不同版本bootstrap-table.js 文件支持不同，部分版本可以实现自动切换）
    // $("thead th .sortable").on("click",function () {
    // post-header.bs.table 在表格列头渲染完成，并在 DOM 中可见后触发
    $('#'+tableId).on("post-header.bs.table",function () {
        $(this).find("thead th .sortable:not(.desc):not(.asc) i").removeClass();
        $(this).find("thead th .sortable:not(.desc):not(.asc) i").addClass("fa fa-fw fa-sort");
        $(this).find("thead th .sortable.desc i").removeClass();
        $(this).find("thead th .sortable.desc i").addClass("glyphicon glyphicon-triangle-bottom");
        $(this).find("thead th .sortable.asc i").removeClass();
        $(this).find("thead th .sortable.asc i").addClass("glyphicon glyphicon-triangle-top");
    });
}
// 初始化bootstrap-table
function initTable(tableId, dataUrl){
    _initTheadSort(tableId);    // 初始化排序图标
    // $('#'+tableId).bootstrapTable({
    //     method: 'get',				//使用get请求到服务器获取数据
    //     url: dataUrl,		//url一般是请求后台的url地址,调用ajax获取数据。
    //     striped: true,				// 隔行加亮
    //     dataType: "json",
    //     queryParamsType: "limit",	//设置为"undefined",可以获取pageNumber，pageSize，searchText，sortName，sortOrder
    //     //设置为"limit",符合 RESTFul 格式的参数,可以获取limit, offset, search, sort, order
    //     singleSelect: true,
    //     showToggle: true,    		//是否显示详细视图和列表视图
    //     clickToSelect: true,        //是否启用点击选中行
    //     contentType: "application/x-www-form-urlencoded",
    //     pageSize: 10,				//每页的记录行数（*）
    //     pageList: [10, 25, 50],     //可供选择的每页的行数（*）
    //     smartDisplay: false,		//解决pageList只显示前两个参数
    //     pageNumber:1,				//初始化加载第一页，默认第一页
    //     pagination: true,   		//是否显示分页（*）
    //     sortable: true,         	//是否启用排序
    //     search: true,				//是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
    //     showColumns: true,			//是否显示所有的列
    //     minimumCountColumns: 2,     //最少允许的列数
    //     showRefresh: true,			//是否显示刷新按钮
    //     sidePagination: "server", 	//分页方式：client客户端分页，server服务端分页（*）
    //     queryParams: function(params) {
    //         return {
    //             search: $(".search").find("input").val(),
    //             offset: params.offset / params.limit,
    //             limit: params.limit,
    //             sort: params.sort,
    //             order: params.order
    //         };
    //     },
    //     responseHandler: function(res) {
    //         return {
    //             "rows": res.data,
    //             "total": res.total
    //         };
    //     }
    // });
}
// 显示行号
function _showNum(tableId, index) {
    //获取每页显示的数量
    // （部分bootstrap-table.js 文件不支持getOptions 属性）
    var pageSize=$('#'+tableId).bootstrapTable('getOptions').pageSize;
    //获取当前是第几页
    var pageNumber=$('#'+tableId).bootstrapTable('getOptions').pageNumber;
    //返回序号，注意index是从0开始的，所以要加上1
    return pageSize * (pageNumber - 1) + index + 1;
}

// toastr（提示框）参数设置，若用默认值可以省略以下面代
toastr.options = {
    "closeButton": true,        //是否显示关闭按钮
    "debug": false,              //是否使用debug模式
    "progressBar": false,        //是否显示进度条，当为false时候不显示；当为true时候，显示进度条，当进度条缩短到0时候，消息通知弹窗消失
    "positionClass": "toast-top-center",//弹出窗的位置 toast-top-full-width
                                // toast-top-center  toast-top-right
                                // toast-top-right
                                // toast-botton-right
                                // toash-bottom-left
                                // toast-top-left
                                // toast-top-full-width 这个是在网页顶端，宽度铺满整个屏幕
                                // toast-bottom-full-width
                                // toast-top-center 顶端中间
                                // toast-bottom-center
    "newestOnTop": false,       //新消息是否排在最上层
    "preventDuplicates": false,//是否阻止弹出多个消息框
    "onclick": null,            //点击回调函数
    "showDuration": "300",      //显示的动画时间
    "hideDuration": "500",     //消失的动画时间
    "timeOut": "2000",          //展现时间
    "extendedTimeOut": "200",  //加长展示时间
    "showEasing": "swing",      //显示时的动画缓冲方式
    "hideEasing": "linear",     //消失时的动画缓冲方式 swing and linear are built into jQuery
    "showMethod": "fadeIn",     //显示时的动画方式 fadeIn, slideDown, and show are built into jQuery
    "hideMethod": "fadeOut"     //消失时的动画方式
};
// toastr.success('提交数据成功');
// toastr.xxx()方法有三个参数，
// 第一个是显示的信息，第二个是标题，第三个是默认属性的重写(当然这个实现是局部的)。例子如下：
// toastr.info('hello world.', '标题', {positionClass: 'toast-top-center'});
// toastr.error("failed", "error");

//刷新bootstrap-table
function refleshTable(tableId) {
    $("#" + tableId).bootstrapTable('refresh');
}
