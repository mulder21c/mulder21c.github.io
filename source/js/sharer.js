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
    var firstElem,
        lastElem,
        popup;

    return {
      set_popup : function(el){
        popup = el;
      },
      set_firstElem : function(el){
        firstElem = el;
      },
      set_lastElem : function(el){
        lastElem = el;
      },
      focuslockKeyDown : function(event){
        event = event || window.event;
        var keycode = event.which || event.keyCode;
        if(event.shiftKey && keycode === 9 && event.target === firstElem){
          event.preventDefault ? event.preventDefault() : event.returnValue = false;
          lastElem.focus();
        }else if(!event.shiftKey && keycode === 9 && event.target === lastElem){
          event.preventDefault ? event.preventDefault() : event.returnValue = false;
          firstElem.focus();
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
        return sessionStorage ? Boolean(JSON.parse(sessionStorage.getItem("lisence-agreed"))) : state;
      },
      _set : function(bool){
        if(sessionStorage){
          sessionStorage.setItem("lisence-agreed", bool);
        }else{
          state = bool;
        }
      },
      dialogOpen : function(event){
        for( var i = -1, item = null, nodes = prevSiblings(lisence) ; item = nodes[++i];){
          item.setAttribute("aria-hidden", "true");
        }

        var placeholder = lisence.querySelector(".placeholder")
        var firstTabbable = lisence.querySelector("a[href]");
        var lastTabbable = lisence.querySelector("input");

        focuslock.set_popup(lisence);
        focuslock.set_firstElem(firstTabbable);
        focuslock.set_lastElem(lastTabbable);
        lisence.setAttribute("tabindex", "-1");
        lisence.setAttribute("aria-hidden", "false");
        dimed.style.display = "block";
        document.documentElement.style.overflow = "hidden";
        lisence.classList.add("show");
        lisence.addEventListener("keydown", focuslock.focuslockKeyDown, false);
        lastTabbable.focus();
        
        document.addEventListener("keydown", agree.dialogClose, false);
        document.addEventListener("mousedown", agree.dialogClose, false);
      },
      dialogClose : function(event){
        event = event || window.event;
        if(event){
          if(event.type === 'keydown' && event.keyCode !== 27) return;
          if(event.type === 'mousedown' && (event.target || event.srcElement) !== dimed) return;
        }
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
        document.getElementById("agree-lisence").checked = false;

        document.removeEventListener("keydown", agree.dialogClose, false);
        document.removeEventListener("mousedown", agree.dialogClose, false);
      },
      dialogToggle : function(event){
        event = event || window.event;

        if(agree._get() === false){
          agree.dialogOpen(event);
        }
      }
    }
  })();

  function agreeLisence(event){
    event = event || window.event;
    event.stopPropagation();
    if(this.checked === true){
      agree._set(true);
      document.execCommand("copy");
      agree.dialogClose();
    }
  }

  document.addEventListener("copy", agree.dialogToggle, false);
  document.getElementById("agree-lisence").addEventListener("change", agreeLisence, false);
}());