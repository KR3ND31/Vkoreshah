var currenturl,
    lasturl,
    temparray,
    settings,

    previousLinks = [],
    currentLinks = [],
    newLinks = [],

    previousHrefCount = 0,
    currentHrefCount = 0,
    chunk = 900
	  vkApiVersion = "5.199",
    allowed_classes_list = ['author', 'author_highlighted', 'PostHeaderTitle__authorLink', 'fans_fan_lnk', 'mem_link']; // в каких классах можно изменять ссылку
    online_permitted_classes_list = []; // в каких классах нельзя показывать онлайн


init()

function init(){
  chrome.storage.local.get(
    ['ColorOn1', 'ColorOn2', 'ColorOn3','ColorOn4','ColorOn5','ColorOn6','ColorOn7',
    'color1','color2','color3','color4','color5','color6','color7',
    'mode1','mode2','mode3','mode4','mode5','mode6','mode7',
    'online_on', 'mobile_online_on',
    'popup_notify', 'console_log',
    'vkaccess_token'],
    (response) => {
      settings = response

      window.addEventListener('load', function() {
        setInterval(checkLinksCount, 1000);
      });
      
    }
  );
}

function showfriends() {
  if (settings.vkaccess_token.length === undefined) {
    sendInfoToUser("Авторизуйтесь! Для авторизации зайдите в параметры и нажмите кнопку Авторизации.")
  } else {
      newLinks = checkForNewLinks();

      if (newLinks.length > 0) {
        let correct_links = filterLinks(newLinks)
        
        coloringAllUsers(correct_links);
      }
  }
}

function filterLinks(Links){
  var regex = /vk.com\/([|.|_|\w]+)/;
  var correct_href = [];
  for (var i = 0; i < Links.length; i++) {
    var href = Links[i]['href']
    var match = regex.exec(href);
    if (match !== null && match.length > 1) {
      correct_href.push(match[1]);
    }
  }
  return correct_href
}

function sendInfoToUser(Message) {
  if (settings.popup_notify == true) showPopUp(Message)
  if (settings.console_log == true) console.log(Message);
}

function showPopUp(Message) {
  var element = document.createElement('div');
  element.innerHTML = '<style type="text/css">#msg_pop{color: white;background-color: rgba(0, 0, 0, 0.7);display: none;position: fixed;z-index: 99999;bottom: 30px;left:30px;width: 250px;padding: 10px;font-size:13px;-webkit-box-shadow: 0px 0px 10px #999;-moz-box-shadow: 0px 0px 10px #999;box-shadow: 0px 0px 10px #999;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;}#msg_pop h4{margin:0;text-align:center;font-size:15px;}#msg_close{display:block;position:absolute;top:5px;right:10px;line-height:15px;width:16px;height:16px;text-align:center;color:#fff;cursor:pointer;-webkit-border-radius: 10px;-moz-border-radius: 10px;-ms-border-radius: 10px;-o-border-radius: 10px;border-radius: 10px;}#msg_close:hover {background-color:#fff;color:#000;}.fadeIn{animation-name: fadeIn;-webkit-animation-name: fadeIn; animation-duration: 0.4s; -webkit-animation-duration: 0.4s;animation-timing-function: ease-in-out; -webkit-animation-timing-function: ease-in-out;     visibility: visible !important; }@keyframes fadeIn {0% {transform: scale(0.7);opacity: 0.5;}80% {transform: scale(1.1);}       100% {transform: scale(1);opacity: 1;}       }@-webkit-keyframes fadeIn {0% {-webkit-transform: scale(0.7);opacity: 0.5;}80% {-webkit-transform: scale(1.1);}       100% {-webkit-transform: scale(1);opacity: 1;}       }</style><div id="msg_pop"><h4>ВКОРЕШАХ</h4>' + Message + '</div>';
  document.body.appendChild(element);

  var msg_pop = document.getElementById('msg_pop');
  document.getElementById('msg_pop').style.display='block';document.getElementById('msg_pop').className += 'fadeIn';
  setTimeout(function() {
      element.parentNode.removeChild(element);
    }, 2000);
}

function coloringAllUsers(Links) {
    // Links - новые найденные ссылки
    UniqueLinks = [...new Set(Links)];

    

    for (let i = 0; i < UniqueLinks.length; i += chunk) {
      let temparray = UniqueLinks.slice(i, i + chunk);

      let documentSaveRequest = new XMLHttpRequest();
      let getAreFriendsUrl = 'user_ids=' + temparray + '&fields=online, domain, friend_status, blacklisted, blacklisted_by_me&v=' + vkApiVersion + '&access_token=' + settings.vkaccess_token;

      documentSaveRequest.open('POST', 'https://api.vk.com/method/users.get', true);
      documentSaveRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      documentSaveRequest.onreadystatechange = function() {
        if (documentSaveRequest.readyState === 4) {

          let friendsList = JSON.parse(documentSaveRequest.responseText);

          console.log(friendsList)

          if(typeof(friendsList.response) == "undefined"){
            sendInfoToUser("Произошла ошибка! Скорее всего мы не можем получить ответ от VK.COM")
          }else{

            for (var i = 0; i < document.links.length; i++) {

              if(document.links[i].tagName == "A" && (allowed_classes_list.some(cls => document.links[i].classList.contains(cls)) || document.links[i].childElementCount == 0)){

                var href = document.links[i].href;

                for (var l = 0; l < friendsList.response.length; l++){
                  var friendID = 'vk.com\/id' + friendsList.response[l].id;
                  var friendDomain = 'vk.com\/' + friendsList.response[l].domain;
                  if (href.includes(friendID) || href.includes(friendDomain)) {

                    if (href.includes('id30667548')){
                      console.log(href)
                    }
                    if (href.includes('alina_kalinina0')){
                      console.log(href)
                    }

                    if(!online_permitted_classes_list.some(cls => document.links[i].classList.contains(cls))){
                      let linkLastElement = document.links[i].lastElementChild;

                      if (linkLastElement && linkLastElement.getAttribute('name') === 'online'){
                        continue;
                      }
                      if(settings.online_on == true && friendsList.response[l].online == 1){
                        if(settings.mobile_online_on == true && friendsList.response[l].online_mobile == 1){
                          document.links[i].insertAdjacentHTML('beforeend','<div name="online" style="display: inline-block;margin-left: 4px;border-radius: 3px;bottom: 0;width: 8px;height: 12px;background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgNyAxMSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDxnIGlkPSJTeW1ib2xzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0iIzhBQzE3NiIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0ib25saW5lIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAzLjAwMDAwMCwgLTQyMi4wMDAwMDApIj4KICAgICAgICAgICAgPHBhdGggZD0iTTIwMyw0MjMuNTA2NDM5IEMyMDMsNDIyLjY3NDQ1NiAyMDMuNjcxMTg5LDQyMiAyMDQuNTAxNjc2LDQyMiBMMjA4LjQ5ODMyNCw0MjIgQzIwOS4zMjc2NzcsNDIyIDIxMCw0MjIuNjcxNTQxIDIxMCw0MjMuNTA2NDM5IEwyMTAsNDMxLjQ5MzU2MSBDMjEwLDQzMi4zMjU1NDQgMjA5LjMyODgxMSw0MzMgMjA4LjQ5ODMyNCw0MzMgTDIwNC41MDE2NzYsNDMzIEMyMDMuNjcyMzIzLDQzMyAyMDMsNDMyLjMyODQ1OSAyMDMsNDMxLjQ5MzU2MSBMMjAzLDQyMy41MDY0MzkgWiBNMjA0LDQyNCBMMjA5LDQyNCBMMjA5LDQzMCBMMjA0LDQzMCBMMjA0LDQyNCBaIiBpZD0ibW9iaWxlX20iLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==);"></div>')
                        }else{
                          document.links[i].insertAdjacentHTML('beforeend','<div name="online" style="background: #8ac176;display: inline-block;bottom: 0;width: 8px;margin-left: 4px;border-radius: 100%;height: 8px;"></div>')
                        }
                      }
                    }

                    switch(friendsList.response[l].friend_status) {
                      case 0:  //когда не в друзьях
                      if (friendsList.response[l].blacklisted == 1 && friendsList.response[l].blacklisted_by_me == 0 && settings.ColorOn6 == true){ //вы в чс
                        document.links[i].style.color = settings.color6;
                        document.links[i].style.textDecoration = settings.mode6;
                      } else if (friendsList.response[l].blacklisted == 0 && friendsList.response[l].blacklisted_by_me == 1 && settings.ColorOn5 == true){ //он в чс
                        document.links[i].style.color = settings.color5;
                        document.links[i].style.textDecoration = settings.mode5;
                      } else if (friendsList.response[l].blacklisted == 1 && friendsList.response[l].blacklisted_by_me == 1 && settings.ColorOn7 == true){ //взаимный чс в чс
                        document.links[i].style.color = settings.color7;
                        document.links[i].style.textDecoration = settings.mode7;
                      } else if (settings.ColorOn4 == true){
                        document.links[i].style.color = settings.color4;
                        document.links[i].style.textDecoration = settings.mode4;
                      }
                      break

                      case 1:  //когда вы подписаны
                        if (settings.ColorOn2 == true){
                          document.links[i].style.color = settings.color2;
                          document.links[i].style.textDecoration = settings.mode2;
                        }
                      break

                      case 2:  //когда он на нас подписан
                        if (settings.ColorOn3 == true){
                          document.links[i].style.color = settings.color3;
                          document.links[i].style.textDecoration = settings.mode3;
                        }
                      break

                      case 3:  // когда в друзьях
                        if (settings.ColorOn1 == true){
                        document.links[i].style.color = settings.color1;
                        document.links[i].style.textDecoration = settings.mode1;
                        }
                      break

                      default:
                    }
                  }
                  if (href == "https://vk.com/kr3nd31." || href == "https://vk.com/id59234599.") {
                    document.links[i].style.color = "#FFC300";
                    document.links[i].style.fontWeight = "bold";
                  }
                }
              }
            }

          }
        }
      }
      documentSaveRequest.send(getAreFriendsUrl);

    }
    sendInfoToUser("Все друзья показаны!")     
}

function checkLinksCount() {
  currenturl = window.location.pathname;
  currentHrefCount = document.links.length;

  if (currenturl != lasturl){ //если перешли на новую страницу
    lasturl = window.location.pathname;
    previousHrefCount = 0; // обнуляем количество ссылок
    previousLinks = []; // обнуляем все ссылки
    showfriends();
    return;
  }
  if (currentHrefCount != previousHrefCount){ //если не перешли на новую страницу, но колличество ссылко изменилось
      previousHrefCount = document.links.length;
      showfriends();
  }
}

// Функция для получения списка всех ссылок с индексами
function getLinksWithIndex() {
  let links = Array.from(document.links);
  return links.map((link, index) => ({ href: link.href, index: index }));
}

// Функция для сравнения текущих и предыдущих ссылок
function checkForNewLinks() {
  currentLinks = getLinksWithIndex();
  newLinks = currentLinks.filter(link => {
    return !previousLinks.some(prevLink => prevLink.href === link.href && prevLink.index === link.index);
  });

  previousLinks = currentLinks;

  return newLinks;
}