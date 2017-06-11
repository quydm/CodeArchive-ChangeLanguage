function getUrl(){
    // Các phương thức khác để lấy url
    // url=parent.document.URL;
    // url=window.location.href;
    var tmp=window.location;
    var url = new String(tmp);
    url=url.toLowerCase();
    return url;
}
// Tra ve url voi ngon ngu
function changeLang(lang){
    var url=getUrl();
    var i=url.indexOf('lang');
    if(i==-1){
        url=url+"?lang="+lang;
    }else{
        url=url.substr(0,(i+5));
        url=url+lang;
    }
    window.location=url;
}
// Lay ngon ngu cua url
function getLanguage(){
    var url =getUrl();
    var i=url.indexOf('lang');
    var language="en";
    var languages=new Array("vn","en");
    if(i>-1){
        i+=5;
        language=url.substr(i,2);
    }
    var flag=false;
    for(i=0;i<languages.length;i++){
        if(language==languages[i]){
            flag=true;
            break;
        }
    }
    if(!flag){
        language="en"
    }
    return language;
}
// Tra ve doi tuong XMLHttpRequest
function getXMLHttpRequest(){
    var xmlhttp=null;
    if (window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }
    else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}
// Tra ve doi tuong xmlObject
function getXmlObject(file){
    var xmlhttp=getXMLHttpRequest();
    xmlhttp.open("GET",file,false);
    xmlhttp.send();
    xmlObj=xmlhttp.responseXML;
    return xmlObj;
}
xmlDoc=getXmlObject('Language.xml');
lang=getLanguage();
// Tra ve 1 mang cac note con theo id
function getArrayByTagName(id){
    var x=xmlDoc.getElementsByTagName(id);
    return x;
}
// Doi ngon ngu cho 1 phan tu html
function changeLangById(id){
    var x=getArrayByTagName(id);
    document.getElementById(id).innerHTML+=x[0].getElementsByTagName(lang)[0].childNodes[0].nodeValue;
}
// Doi ngon ngu cho rieng menu
function changeLangForMenu(id){
    var x=getArrayByTagName(id);
    var list="<ul>";
    for(var i=0;i<x.length;i++){
        list+="<li>"+x[i].getElementsByTagName(lang)[0].childNodes[0].nodeValue+"</li>";
    }
    list+="</ul>";
    document.getElementById(id).innerHTML=list;
}
// Doi ngon ngu cho 1 bien
function changeLangForVar(note){
	var x=getArrayByTagName(note);
	return x[0].getElementsByTagName(lang)[0].childNodes[0].nodeValue;
}
function reload(){
	changeLangForMenu('menu');
	changeLangById('heading');
}
function checkForm(frm){
	if(frm.txt.value==""){
		alert(changeLangForVar('blankUserName'));
		frm.txt.focus();
		return false;
	}
	return true;
}