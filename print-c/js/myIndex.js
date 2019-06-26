$(function () {
    var MyIndex, number,showNum, modelArr, inputArr = [];
    $.getJSON("data/index.json", "", function (data) {
        //each循环 使用$.each方法遍历返回的数据date
        number = data.order_no;
		showNum=data.order_no;
		
        $("input[name='order_no']").val("NO." + number);

    });
    $.getJSON("data/model.json", "", function (data) {
        modelArr = JSON.parse(data);
        // console.log(modelArr);
    });

    var saveToFile = function (path, data) {
        var blob = new Blob([JSON.stringify(data)], {type: ""});
        saveAs(blob, path);

    };


    $("#save").click(function () {
        if (!number)
            return;
        Array.prototype.forEach.call($("input[disabled='disabled']"), function (ele) {
            ele.removeAttribute("disabled");
            ele.setAttribute("special", "special");
        });

        MyIndex = $("#myform").serializeObject(); //将表单序列化为JSON对象
        // console.log(MyIndex);
        Array.prototype.forEach.call($("input[special='special']"), function (ele) {
            ele.removeAttribute("special");
            ele.setAttribute("disabled", "disabled");
        });
        // totalNum += parseInt(MyIndex["size"]);
        inputArr.push(MyIndex);//加入打印队列
        alert("保存成功！")
		showNum+=MyIndex["size"]*2;
		$("input[name='order_no']").val("NO." + showNum);
		//console.log(inputArr);
    });
    $("#explore").click(function () {
        if (number)
            saveToFile("index.json", {'order_no': number});

    });
    $("#print").click(function () {
        if (!MyIndex) {
            alert("请先保存，然后在打印数据");
            return;
        } else if (!modelArr) {
            alert("模板为载入，请等待。。");
            return;
        }
        //console.log(inputArr);
        myPrint(inputArr);
        MyIndex=null;
        inputArr.length=0;
        $("input[name='order_no']").val("NO." + number);
    });

    var printProgress=function (printIndexs,model,arr,i) {//给定打印角标数组，给定标准模板，和打印队列
            var table = $("<table></table>");
            if (table) {
                $.each(model, function (index, value) {
                    var tr = $("<tr></tr>");
                    $.each(printIndexs, function (innerindex, innervalue) {
                        var td = $("<td></td>"), label = value[1], tem = value[0], inputValue = arr[innervalue][tem];
                        td.html(label);
                        tr.append(td);
                        if(!inputValue){//分隔符
                            td.attr("colspan", 2);
                        }else{
                            td = $("<td></td>");
                            var val=inputValue.split(".");
                            if(val.length===2){
                                //inputValue=val[0]+"."+(parseInt(val[1])+i+innerindex+1-printIndexs.length);
								inputValue=val[0]+"."+(parseInt(val[1])+innerindex);
								//console.log(i);
								inputValue=val[0]+"."+(number+i-printIndexs.length+innerindex+1);
								//console.log(number+i-printIndexs.length+innerindex+1);
                            }
                            td.html(inputValue);
                            tr.append(td);
                        }
                        if (innerindex != printIndexs.length - 1) {
                            td = $("<td></td>");
                            td.html("&nbsp;&nbsp;");
                            tr.append(td);
                        }
                    });
                    table.append(tr);
                });
                return table.jqprint();//是就继续，否就回滚
				//return true;
            }
    }
    var test=function () {
        var a=[true,false];
        return a[Math.round(Math.random())]
    }
    var getPosition=function (arr,index) {
        for(var i in arr){
            // console.log(i);
            index-=(arr[i].size*2);
            if(index<0){
                var  pos=i;//为所属的数组角标
                return pos;
            }
        }
    }

    var getTotalNum=function (arr) {
        var totalNum =0;
        for(var i in arr){
            totalNum+=(arr[i].size*2);
        }
        return totalNum;
    }

    var myPrint = function (arr) {
        var totalNum=getTotalNum(arr);

        for (var i = 0, teA = []; i < totalNum; i++) {
            var pos=getPosition(arr,i);
            if(pos){
                teA.push(pos);
            }
            console.log(i+ " ------- "+pos);
            if ((i+1) % 4 === 0 || i === totalNum-1) {
                //依据封装数组和总size，每四份打印一张纸，或者为最后一页
                var flag= printProgress(teA,modelArr,arr,i);
                // var flag=test();//如果为真继续执行，如果为假回滚。
                console.log(flag);
                if(!flag){
                    i=i-teA.length;
                }
                teA.length=0;
            }

        }
        number+=totalNum

    }
});


$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}