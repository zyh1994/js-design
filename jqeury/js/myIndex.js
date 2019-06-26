$(function () {
    var MyIndex, number, printNum, modelArr;
    $.getJSON("data/index.json", "", function (data) {
        //each循环 使用$.each方法遍历返回的数据date
        printNum = number = data.order_no;
        $("input[name='order_no']").val("NO." + number);

    });
    $.getJSON("data/model.json", "", function (data) {
        modelArr = JSON.parse(data);
        console.log(modelArr);
        // //each循环 使用$.each方法遍历返回的数据date
        // $.each(data,function(index,value){
        //     console.log(value);
        // });
    });

    var saveToFile = function (path, data) {
        // console.log(data);
        var blob = new Blob([JSON.stringify(data)], {type: ""});
        saveAs(blob, path);

    }


    $("#save").click(function () {
        if (!number)
            return;
        Array.prototype.forEach.call($("input[disabled='disabled']"), function (ele) {
            ele.removeAttribute("disabled");
            ele.setAttribute("special", "special");
        });

        MyIndex = $("#myform").serializeObject(); //将表单序列化为JSON对象
        printNum = ++number;
        console.log(MyIndex);
        Array.prototype.forEach.call($("input[special='special']"), function (ele) {
            ele.removeAttribute("special");
            ele.setAttribute("disabled", "disabled");
        });

        alert("保存成功！")
    })
    $("#explore").click(function () {
        if (number)
            saveToFile("index.json", {'order_no': number});

    });
    $("#print-c").click(function () {
        console.log(number + "  " + printNum);
        if (!MyIndex || printNum != number) {
            alert("请先保存，然后在打印数据");
            return;
        } else if (!modelArr) {
            alert("模板为载入，请等待。。");
            return;
        }
        myPrint();
        printNum++;
    })
    var myPrint = function () {
        var table = $("<table></table>");
        $.each(modelArr, function (index, value) {
            var tr = $("<tr></tr>"), temArr = [], lable = value[1], tem = value[0], inputValue = MyIndex[tem];
            if (!inputValue || tem === "split") {//分隔符
                temArr[0] = lable;
                temArr[1] = "&nbsp;&nbsp;"

            } else {
                temArr[0] = lable;
                temArr[1] = inputValue;
                temArr[2] = "&nbsp;&nbsp;"
            }

            for (var i = 0,len=temArr.length; i <  len* 4 - 1; i++) {
                var td = $("<td></td>");
                var temI=i%len;
                if(len<3){//分隔符
                    if(temI==0){
                        td.attr("colspan", 2);
                    }
                }
                var temV=temArr[temI];
                td.html(temV);
                tr.append(td);
            }
            table.append(tr);
        });
        // for (var i = 0; i < 17; i++) {
        //     var tr = $("<tr></tr>");
        //     if (i == 3 || i == 12 || i == 16) {
        //         for (var j = 0; j < 7; j++) {
        //             var td = $("<td></td>");
        //             if (j % 2 == 0) {
        //                 td.attr("colspan", 2);
        //                 td.text();
        //             } else {
        //                 td.html("&nbsp;&nbsp;");
        //             }
        //             tr.append(td);
        //         }
        //     }
        //     else {
        //         for (var j = 0; j < 11; j++) {
        //             var td = $("<td></td>");
        //             if (j % 2 != 0) {
        //                 td.text("&nbsp;&nbsp;");
        //             } else {
        //                 td.text();
        //             }
        //             tr.append(td);
        //         }
        //     }
        //
        //     table.append(tr);
        // }
        // console.log(table);
        table .jqprint();
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