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
      dialogOpen : function(event){
        try{
          event.preventDefault ? event.preventDefault() : event.returnValue = false;
          if(window.clipboardData){
            window.clipboardData.clearData();
          }else if(event.clipboardData){
            event.clipboardData.clearData();
          }
        }catch(err){}

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
        lisence.classList.add("show");
        lisence.focus();
        
        document.addEventListener("keydown", agree.dialogClose, false);
        document.addEventListener("mousedown", agree.dialogClose, false);
      },
      dialogClose : function(event){
        event = event || window.event;
        if(event.type === 'keydown' && event.keyCode !== 27) return;
        if(event.type === 'mousedown' && (event.target || event.srcElement) !== dimed) return;
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

        document.removeEventListener("keydown", agree.dialogClose, false);
        document.removeEventListener("mousedown", agree.dialogClose, false);
      },
      dialogToggle : function(event){
        event = event || window.event;

        if(state === false){
          agree.dialogOpen(event);
        }
      }
    }
  })();

  function agreeLisence(event){
    event = event || window.event;
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    event.stopPropagation();
    if(this.checked === true){
      agree._set(true);
      document.execCommand("copy");
      agree.dialogClose();
    }
  }

  document.addEventListener("copy", agree.dialogToggle, false);
  document.getElementById("agree-lisence").addEventListener("click", agreeLisence, false);
}());