var sUserAgent=navigator.userAgent;
var fAppVersion=parseFloat(navigator.appVersion);
function compareVersions(sVersion1,sVersion2){
	var aVersion1=sVersion1.split(".");
	var aVersion2=sVersion2.split(".");
	if(aVersion1.length>aVersion2.length){
		for(var i=0;i<aVersion1.length-aVersion2.length;i++){
			aVersion2.push("0");
		
		}
	
	}else if(aVersion1.length<aVersion2.length){
			for(var i=0;i<aVersion2.length-aVersion1.length;i++){
				aVersion1.push("0");
			
			}
		
	}
	for(var i=0;i<aVersion1.length;i++){
		if(aVersion1[i]<aVersion2[i]){
				return -1;
			}else if(aVersion1[i]>aVersion2[i]){
				return 1;
			}
	}
	
	return 0;

}

var isOpera=sUserAgent.indexOf("Opera")>-1;

var isMinOpera4=isMinOpera5=isMinOpera6=isMinOpera7=isMinOpera7_5=false;

if(isOpera){
	var fOperaVersion;
	if(navigator.appName=="Opera"){
		fOperaVersion=fAppVersion;
	}else{
		var reOperaVersion=new RegExp("Opera(\\d+\\.\\d+)");
		reOperaVersion.test(sUserAgent);
		fOperaVersion=parseFloat(RegExp["$1"]);
	}
	isMinOpera4=fOperaVersion>=4;
	isMinOpera5=fOperaVersion>=5;
	isMinOpera6=fOperaVersion>=6;
	isMinOpera7=fOperaVersion>=7;
	isMinOpera7_5=fOperaVersion>=7.5;
}

var isKHTML=sUserAgent.indexOf("KHTML")>-1
			||sUserAgent.indexOf("Konqueror")>-1
			||sUserAgent.indexOf("AppleWebKit")>-1;
			
var isMinSafari1=isMinSafari1_2=false;//377-45  534-11

var isMinKonq2_2=isMinKonq3=isMinKonq3_1=isMinKonq3_2=false;

if(isKHTML){
	isSafari=sUserAgent.indexOf("AppleWebKit")>-1;
	isKonq=sUserAgent.indexOf("Konqueror")>-1;
	if(isSafari){
		var reAppleWebKit=new RegExp("AppleWebKit\\/(\\d+(?:\\.\\d*)?)");
		reAppleWebKit.test(sUserAgent);
		var fAppleWebKitVersion=parseFloat(RegExp("$1"));
		isMinSafari1=fAppleWebKitVersion>=85;
		isMinSafari1_2=fAppleWebKitVersion>=124;
				
	}else if(isKonq){
		var reKonq=new RegExp("Konqueror\\/(\\d+(?:\\.\\d+(?:\\.\\d)?)?)");
		reKonq.test(sUserAgent);
		isMinKonq2_2=compareVersions(RegExp["$1"],"2.2")>=0;
		isMinKonq3=compareVersions(RegExp["$1"],"3.0")>=0;
		isMinKonq3_1=compareVersions(RegExp["$1"],"3.1")>=0;
		isMinKonq3_2=compareVersions(RegExp["$1"],"3.2")>=0;
		}
	
}
var isIE=sUserAgent.indexof("compatible")>-1
			&&sUserAgent.indexof("MSIE")>-1
			&&!isOpera
var isMinIE4=isMinIE5=isMinIE5_5=isMinIE6=false;

if(isIE){
	var reIE=new RegExp("MSIE(\\d+\\.\\d+);");
}










