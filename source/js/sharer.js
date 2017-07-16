(function(window, document) {

  var shareUrls = {
    facebook:  '//www.facebook.com/sharer.php?u=',
    twitter:   '//twitter.com/intent/tweet?url=',
    pinterest: '//pinterest.com/pin/create/button/?url=',
    pocket:    '//getpocket.com/save?url='
  };
  var sharers = Object.keys(shareUrls);

  var url = encodeURIComponent([
    window.location.protocol,
    '//',
    window.location.host,
    window.location.pathname
  ].join(''));

  sharers.forEach(function(sharer) {
    var elem = document.getElementById('sharer-' + sharer);
    if (!elem) return;

    elem.addEventListener('click', function() {
      window.open(
        shareUrls[sharer] + url,
        'Share to ' + sharer,
        'toolbar=0,location=0,menubar=0,height=400,width=600'
      );
    });
  });

})(window, document);

function prevSiblings(target) {
   var siblings = [], n = target;
   while(n = n.previousElementSibling) siblings.push(n);
   return siblings;
}

(function(){
  var focuslock = (function(){
    var shiftPressed = false,
        firstBtn,
        lastBtn,
        popup;

    return {
      set_popup : function(el){
        popup = el;
      },
      set_firstBtn : function(el){
        firstBtn = el;
      },
      set_lastBtn : function(el){
        lastBtn = el;
      },
      focuslockKeyUp  : function(event){
        event = event || window.event;
        var keycode = event.which || event.keyCode;
        if( event.shiftKey ){
          shiftPressed = false;
        }
      },
      focuslockKeyDown : function(event){
        event = event || window.event;
        var keycode = event.which || event.keyCode;
        if(event.shiftKey){
          shiftPressed = true;
        }
        if(shiftPressed && keycode === 9 && event.target === popup){
          event.preventDefault ? event.preventDefault() : event.returnValue = false;
          lastBtn.focus();
        }else if(shiftPressed && keycode === 9 && event.target === firstBtn){
          event.preventDefault ? event.preventDefault() : event.returnValue = false;
          popup.focus();
        }else if(!shiftPressed && keycode === 9 && event.target === lastBtn){
          event.preventDefault ? event.preventDefault() : event.returnValue = false;
          popup.focus();
        }
      }
    };
  }());

  window.focuslock = window.focuslock || focuslock;
}());

(function(){
  var agree = (function(){
    var state = false,
        lisence = document.getElementById("lisence"),
		dimed = lisence.nextSibling;
    return {
      _get : function(){
        return state;
      },
      _set : function(bool){
        state = bool;
      },
      dialogToggle : function(){
        if(state === false){
          lisence.classList.add("show");
          for( var i = -1, item = null, nodes = prevSiblings(lisence) ; item = nodes[++i];){
            item.setAttribute("aria-hidden", "true");
          }

          focuslock.set_popup(lisence);
          focuslock.set_firstBtn(lisence.querySelector("a"));
          focuslock.set_lastBtn(lisence.querySelector("input"));

          lisence.addEventListener("keydown", focuslock.focuslockKeyDown, false);
          lisence.addEventListener("keyup", focuslock.focuslockKeyUp, false);
          lisence.setAttribute("tabindex", "-1");
          lisence.setAttribute("aria-hidden", "false");
          dimed.style.display = "block";
          document.documentElement.style.overflow = "hidden";
          lisence.focus();
        }else{
          for( var i = -1, item = null, nodes = prevSiblings(lisence) ; item = nodes[++i];){
            item.removeAttribute("aria-hidden");
          }

          lisence.removeEventListener("keydown", focuslock.focuslockKeyDown, false);
          lisence.removeEventListener("keyup", focuslock.focuslockKeyUp, false);

          lisence.removeAttribute("tabindex");
          lisence.setAttribute("aria-hidden", "true");
		      dimed.removeAttribute("style");
          document.documentElement.removeAttribute("style");
          lisence.classList.remove("show");
        }
      }
    }
  })();
  function agreeLisence(event){
    if(this.checked === true){
      agree._set(true);
      agree.dialogToggle();
    }
  }
  document.addEventListener("copy", agree.dialogToggle, false);
  document.getElementById("agree-lisence").addEventListener("click", agreeLisence, false);
}());