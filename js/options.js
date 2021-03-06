window.addEventListener('load', function() {
   waitingAnimation(1);
});


function waitingAnimation(state, callback = null) {
  var $preloader = $('#p_prldr'),
      $svg_anm   = $preloader.find('.svg_eye');
  if (state){
      $svg_anm.fadeOut();
      $preloader.fadeOut('slow', callback);
  }else{
      $svg_anm.fadeIn();
      $preloader.fadeIn('slow', callback);
  }
};

if (localStorage["ColorOn1"] == undefined) {
	clear_options();
}

function clear_options() {
  localStorage["ColorOn1"] = ""
  localStorage["ColorOn1"] = ""
  localStorage["ColorOn2"] = ""
  localStorage["ColorOn3"] = ""
  localStorage["ColorOn4"] = ""
  localStorage["ColorOn5"] = ""
  localStorage["ColorOn6"] = ""
  localStorage["ColorOn7"] = ""

  localStorage["color1"] = ""
  localStorage["color2"] = ""
  localStorage["color3"] = ""
  localStorage["color4"] = ""
  localStorage["color5"] = ""
  localStorage["color6"] = ""
  localStorage["color7"] = ""

  localStorage["mode1"] = ""
  localStorage["mode2"] = ""
  localStorage["mode3"] = ""
  localStorage["mode4"] = ""
  localStorage["mode5"] = ""
  localStorage["mode6"] = ""
  localStorage["mode7"] = ""

	localStorage["online_on"] = ""
	localStorage["mobile_online_on"] = ""

	localStorage["popup_notify"] = "true"
	localStorage["console_log"] = "true"
  restore_options()
}

function restore_options() {
  document.getElementById("ColorOn1").checked = checkBool(localStorage["ColorOn1"])
  document.getElementById("ColorOn2").checked = checkBool(localStorage["ColorOn2"])
  document.getElementById("ColorOn3").checked = checkBool(localStorage["ColorOn3"])
  document.getElementById("ColorOn4").checked = checkBool(localStorage["ColorOn4"])
  document.getElementById("ColorOn5").checked = checkBool(localStorage["ColorOn5"])
  document.getElementById("ColorOn6").checked = checkBool(localStorage["ColorOn6"])
  document.getElementById("ColorOn7").checked = checkBool(localStorage["ColorOn7"])

  for (var i = 1; i <= 7; i++) {
    if(!checkBool(localStorage["ColorOn"+i])){
      document.getElementById("menu"+i).style.display = "none";
    }
  }

  document.getElementById("textcolor1").style.color = localStorage["color1"]
  document.getElementById("textcolor2").style.color = localStorage["color2"]
  document.getElementById("textcolor3").style.color = localStorage["color3"]
  document.getElementById("textcolor4").style.color = localStorage["color4"]
  document.getElementById("textcolor5").style.color = localStorage["color5"]
  document.getElementById("textcolor6").style.color = localStorage["color6"]
  document.getElementById("textcolor7").style.color = localStorage["color7"]

  document.getElementById("textcolor1").style.textDecoration = localStorage["mode1"]
  document.getElementById("textcolor2").style.textDecoration = localStorage["mode2"]
  document.getElementById("textcolor3").style.textDecoration = localStorage["mode3"]
  document.getElementById("textcolor4").style.textDecoration = localStorage["mode4"]
  document.getElementById("textcolor5").style.textDecoration = localStorage["mode5"]
  document.getElementById("textcolor6").style.textDecoration = localStorage["mode6"]
  document.getElementById("textcolor7").style.textDecoration = localStorage["mode7"]

	document.getElementById("PopUpNotify").checked = checkBool(localStorage["popup_notify"])
	document.getElementById("ConsoleLog").checked = checkBool(localStorage["console_log"])

	if(checkBool(localStorage["online_on"])){
		document.getElementById("OnlineOn").checked = true
		document.getElementsByClassName("vk_online")[0].style.display = "inline-block";
		document.getElementById("MobileOnlineOn_Container").style.display = "block";
	}else{
		document.getElementById("OnlineOn").checked = false
		document.getElementsByClassName("vk_online")[0].style.display = "none";
		document.getElementById("MobileOnlineOn_Container").style.display = "none";
	}

	if(checkBool(localStorage["mobile_online_on"])){
		document.getElementById("MobileOnlineOn").checked = true
		document.getElementsByClassName("vk_mobile_online")[0].style.display = "inline-block";
	}else{
		document.getElementById("MobileOnlineOn").checked = false
		document.getElementsByClassName("vk_mobile_online")[0].style.display = "none";
	}

  switch (localStorage["mode1"]) {
	case "none":
		document.getElementById("none1").checked = true
		break;
	case "underline":
		document.getElementById("under_line1").checked = true
		break;
	case "line-through":
		document.getElementById("through_line1").checked = true
		break;
	default:
		document.getElementById("none1").checked = true
  }

  switch (localStorage["mode2"]) {
	case "none":
		document.getElementById("none2").checked = true
		break;
	case "underline":
		document.getElementById("under_line2").checked = true
		break;
	case "line-through":
		document.getElementById("through_line2").checked = true
		break;
	default:
		document.getElementById("none2").checked = true
  }

  switch (localStorage["mode3"]) {
	case "none":
		document.getElementById("none3").checked = true
		break;
	case "underline":
		document.getElementById("under_line3").checked = true
		break;
	case "line-through":
		document.getElementById("through_line3").checked = true
		break;
	default:
		document.getElementById("none3").checked = true
  }

  switch (localStorage["mode4"]) {
	case "none":
		document.getElementById("none4").checked = true
		break;
	case "underline":
		document.getElementById("under_line4").checked = true
		break;
	case "line-through":
		document.getElementById("through_line4").checked = true
		break;
	default:
		document.getElementById("none4").checked = true
  }

  switch (localStorage["mode5"]) {
	case "none":
		document.getElementById("none5").checked = true
		break;
	case "underline":
		document.getElementById("under_line5").checked = true
		break;
	case "line-through":
		document.getElementById("through_line5").checked = true
		break;
	default:
		document.getElementById("none5").checked = true
  }

  switch (localStorage["mode6"]) {
	case "none":
		document.getElementById("none6").checked = true
		break;
	case "underline":
		document.getElementById("under_line6").checked = true
		break;
	case "line-through":
		document.getElementById("through_line6").checked = true
		break;
	default:
		document.getElementById("none6").checked = true
  }

  switch (localStorage["mode7"]) {
	case "none":
		document.getElementById("none7").checked = true
		break;
	case "underline":
		document.getElementById("under_line7").checked = true
		break;
	case "line-through":
		document.getElementById("through_line7").checked = true
		break;
	default:
		document.getElementById("none7").checked = true
  }

  consolem("Настройки загружены!")
}

function change_color(num) {
  current_color = document.getElementById("out_html_color").innerText
  localStorage["color" + num] = current_color
  document.getElementById("textcolor" + num).style.color = current_color
}

function change_mode(num, mode) {
  switch (mode) {
	case 0:
		localStorage["mode" + num] = "none"
		document.getElementById("textcolor" + num).style.textDecoration = "none"
		break;
	case 1:
		localStorage["mode" + num] = "underline"
		document.getElementById("textcolor" + num).style.textDecoration = "underline"
		break;
	case 2:
		localStorage["mode" + num] = "line-through"
		document.getElementById("textcolor" + num).style.textDecoration = "line-through"
		break;
	default:
		localStorage["mode" + num] = "none"
		document.getElementById("textcolor" + num).style.textDecoration = "none"
  }
}


function checkBool(x) { if(x == "true") {return true;} else {return false;} }

function consolem(text_in){
  document.getElementById("console").innerText = text_in;
}

document.addEventListener("DOMContentLoaded", restore_options)

document.getElementById("clear").addEventListener("click", clear_options)

document.getElementById("color1").addEventListener("click", function() {change_color(1); consolem("Цвет 1 изменен!")}, false)
document.getElementById("color2").addEventListener("click", function() {change_color(2); consolem("Цвет 2 изменен!")}, false)
document.getElementById("color3").addEventListener("click", function() {change_color(3); consolem("Цвет 3 изменен!")}, false)
document.getElementById("color4").addEventListener("click", function() {change_color(4); consolem("Цвет 4 изменен!")}, false)
document.getElementById("color5").addEventListener("click", function() {change_color(5); consolem("Цвет 5 изменен!")}, false)
document.getElementById("color6").addEventListener("click", function() {change_color(6); consolem("Цвет 6 изменен!")}, false)
document.getElementById("color7").addEventListener("click", function() {change_color(7); consolem("Цвет 7 изменен!")}, false)

document.getElementById("none1").addEventListener("click", function() {change_mode(1, 0); consolem("Модификатор 1 убран!")}, false)
document.getElementById("none2").addEventListener("click", function() {change_mode(2, 0); consolem("Модификатор 2 убран!")}, false)
document.getElementById("none3").addEventListener("click", function() {change_mode(3, 0); consolem("Модификатор 3 убран!")}, false)
document.getElementById("none4").addEventListener("click", function() {change_mode(4, 0); consolem("Модификатор 4 убран!")}, false)
document.getElementById("none5").addEventListener("click", function() {change_mode(5, 0); consolem("Модификатор 5 убран!")}, false)
document.getElementById("none6").addEventListener("click", function() {change_mode(6, 0); consolem("Модификатор 6 убран!")}, false)
document.getElementById("none7").addEventListener("click", function() {change_mode(7, 0); consolem("Модификатор 7 убран!")}, false)

document.getElementById("under_line1").addEventListener("click", function() {change_mode(1, 1); consolem("Модификатор 1 изменен на подчеркивание!")}, false)
document.getElementById("under_line2").addEventListener("click", function() {change_mode(2, 1); consolem("Модификатор 2 изменен на подчеркивание!")}, false)
document.getElementById("under_line3").addEventListener("click", function() {change_mode(3, 1); consolem("Модификатор 3 изменен на подчеркивание!")}, false)
document.getElementById("under_line4").addEventListener("click", function() {change_mode(4, 1); consolem("Модификатор 4 изменен на подчеркивание!")}, false)
document.getElementById("under_line5").addEventListener("click", function() {change_mode(5, 1); consolem("Модификатор 5 изменен на подчеркивание!")}, false)
document.getElementById("under_line6").addEventListener("click", function() {change_mode(6, 1); consolem("Модификатор 6 изменен на подчеркивание!")}, false)
document.getElementById("under_line7").addEventListener("click", function() {change_mode(7, 1); consolem("Модификатор 7 изменен на подчеркивание!")}, false)

document.getElementById("through_line1").addEventListener("click", function() {change_mode(1, 2); consolem("Модификатор 1 изменен на зачеркивание!")}, false)
document.getElementById("through_line2").addEventListener("click", function() {change_mode(2, 2); consolem("Модификатор 2 изменен на зачеркивание!")}, false)
document.getElementById("through_line3").addEventListener("click", function() {change_mode(3, 2); consolem("Модификатор 3 изменен на зачеркивание!")}, false)
document.getElementById("through_line4").addEventListener("click", function() {change_mode(4, 2); consolem("Модификатор 4 изменен на зачеркивание!")}, false)
document.getElementById("through_line5").addEventListener("click", function() {change_mode(5, 2); consolem("Модификатор 5 изменен на зачеркивание!")}, false)
document.getElementById("through_line6").addEventListener("click", function() {change_mode(6, 2); consolem("Модификатор 6 изменен на зачеркивание!")}, false)
document.getElementById("through_line7").addEventListener("click", function() {change_mode(7, 2); consolem("Модификатор 7 изменен на зачеркивание!")}, false)

document.getElementById("ColorOn1").addEventListener("change", function() {
  localStorage["ColorOn1"] = document.getElementById("ColorOn1").checked;
  if(document.getElementById("ColorOn1").checked){
    document.getElementById("menu1").style.display = "block";
  }else{
    document.getElementById("menu1").style.display = "none";
  }
  consolem("Выделение 1 изменено!")}, false)

document.getElementById("ColorOn2").addEventListener("change", function() {
  localStorage["ColorOn2"] = document.getElementById("ColorOn2").checked;
  if(document.getElementById("ColorOn2").checked){
    document.getElementById("menu2").style.display = "block";
  }else{
    document.getElementById("menu2").style.display = "none";
  }
  consolem("Выделение 2 изменено!")}, false)

document.getElementById("ColorOn3").addEventListener("change", function() {
  localStorage["ColorOn3"] = document.getElementById("ColorOn3").checked;
  if(document.getElementById("ColorOn3").checked){
    document.getElementById("menu3").style.display = "block";
  }else{
    document.getElementById("menu3").style.display = "none";
  }
  consolem("Выделение 3 изменено!")}, false)

document.getElementById("ColorOn4").addEventListener("change", function() {
  localStorage["ColorOn4"] = document.getElementById("ColorOn4").checked;
  if(document.getElementById("ColorOn4").checked){
    document.getElementById("menu4").style.display = "block";
  }else{
    document.getElementById("menu4").style.display = "none";
  }
  consolem("Выделение 4 изменено!")}, false)

document.getElementById("ColorOn5").addEventListener("change", function() {
  localStorage["ColorOn5"] = document.getElementById("ColorOn5").checked;
  if(document.getElementById("ColorOn5").checked){
    document.getElementById("menu5").style.display = "block";
  }else{
    document.getElementById("menu5").style.display = "none";
  }
  consolem("Выделение 5 изменено!")}, false)

document.getElementById("ColorOn6").addEventListener("change", function() {
  localStorage["ColorOn6"] = document.getElementById("ColorOn6").checked;
  if(document.getElementById("ColorOn6").checked){
    document.getElementById("menu6").style.display = "block";
  }else{
    document.getElementById("menu6").style.display = "none";
  }
  consolem("Выделение 6 изменено!")}, false)

document.getElementById("ColorOn7").addEventListener("change", function() {
  localStorage["ColorOn7"] = document.getElementById("ColorOn7").checked;
  if(document.getElementById("ColorOn7").checked){
    document.getElementById("menu7").style.display = "block";
  }else{
    document.getElementById("menu7").style.display = "none";
  }
  consolem("Выделение 7 изменено!")}, false)


document.getElementById("OnlineOn").addEventListener("change", function() {
	localStorage["online_on"] = document.getElementById("OnlineOn").checked;
	if(document.getElementById("OnlineOn").checked){
		document.getElementById("MobileOnlineOn_Container").style.display = "block";
		document.getElementsByClassName("vk_online")[0].style.display = "inline-block";
	}else{
		document.getElementsByClassName("vk_online")[0].style.display = "none";
		document.getElementById("MobileOnlineOn_Container").style.display = "none";
	}
	consolem("Показывать онлайн изменено!")
}, false)

document.getElementById("MobileOnlineOn").addEventListener("change", function() {
	localStorage["mobile_online_on"] = document.getElementById("MobileOnlineOn").checked;
	if(document.getElementById("MobileOnlineOn").checked){
		document.getElementsByClassName("vk_mobile_online")[0].style.display = "inline-block";
	}else{
		document.getElementsByClassName("vk_mobile_online")[0].style.display = "none";
	}
	consolem("Показывать мобильный онлайн отдельно изменено!")
}, false)

document.getElementById("PopUpNotify").addEventListener("change", function() {localStorage["popup_notify"] = document.getElementById("PopUpNotify").checked; consolem("Всплывающее окно изменено!")}, false)
document.getElementById("ConsoleLog").addEventListener("change", function() {localStorage["console_log"] = document.getElementById("ConsoleLog").checked; consolem("Отображение в консоли изменено!")}, false)

document.getElementById("deautorization").addEventListener("click", function() {
	chrome.storage.local.set({'vkaccess_token': 0});
	consolem("Деавторизация прошла успешно! Что бы авторизоваться нажмите кнопку Авторизации!")
})

document.getElementById("autorization").addEventListener("click", getClickHandler())


//Функция для проверки авторизации в ВКорешах
function getClickHandler() {
    "use strict";

    return function (info, tab) {

        var	vkCLientId           = '5956086',
            vkRequestedScopes    = 'friends,offline',
            vkAuthenticationUrl  = 'https://oauth.vk.com/authorize?client_id=' + vkCLientId + '&scope=' + vkRequestedScopes + '&redirect_uri=http%3A%2F%2Foauth.vk.com%2Fblank.html&display=page&response_type=token';

		chrome.storage.local.get({'vkaccess_token': {}}, function (items) {

            if (items.vkaccess_token.length === undefined) {
                chrome.tabs.create({url: vkAuthenticationUrl, selected: true}, function (tab) {
                    chrome.tabs.onUpdated.addListener(listenerHandler(tab.id));
                });

                return;
            }else{
				alert("Вы уже авторизированы!");
			}

        });
    };
}

//Функция для вытаскивания Access Token из URL строки и последующая запись в локальное хранилище
function listenerHandler(authenticationTabId) {
    "use strict";

    return function tabUpdateListener(tabId, changeInfo, tabInfo) {
        var vkAccessToken,
            vkAccessTokenExpiredFlag;

        if (tabId === authenticationTabId && changeInfo.url !== undefined && changeInfo.status === "loading") {

            if (changeInfo.url.indexOf('oauth.vk.com/blank.html') > -1) {
                authenticationTabId = null;
                chrome.tabs.onUpdated.removeListener(tabUpdateListener);

                vkAccessToken = getUrlParameterValue(changeInfo.url, 'access_token');

                if (vkAccessToken === undefined || vkAccessToken.length === undefined) {
                    displayeAnError('vk auth response problem', 'access_token length = 0 or vkAccessToken == undefined');
                    return;
                }

                vkAccessTokenExpiredFlag = Number(getUrlParameterValue(changeInfo.url, 'expires_in'));

                if (vkAccessTokenExpiredFlag !== 0) {
                    displayeAnError('vk auth response problem', 'vkAccessTokenExpiredFlag != 0' + vkAccessToken);
                    return;
                }
                chrome.storage.local.set({'vkaccess_token': vkAccessToken});
								consolem("Авторизация прошла успешно! Что бы деавторизоваться нажмите кнопку Деавторизации!")
            }
        }
    };
}

//Функция для получения параметра из URL строки
function getUrlParameterValue(url, parameterName) {
    "use strict";

    var urlParameters  = url.substr(url.indexOf("#") + 1),
        parameterValue = "",
        index,
        temp;

    urlParameters = urlParameters.split("&");

    for (index = 0; index < urlParameters.length; index += 1) {
        temp = urlParameters[index].split("=");

        if (temp[0] === parameterName) {
            return temp[1];
        }
    }

    return parameterValue;
}
