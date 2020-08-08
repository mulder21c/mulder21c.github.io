Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),function(e,t){"function"==typeof define&&define.amd?define([],function(){return e.Object.assign=t(e.Object)}):e.Object.assign=t(e.Object)}(this,function(i){return void 0!==i.assign?i.assign:function(e){null!=e&&void 0!==e||(e={}),e=i(e);for(var t=1;t<arguments.length;t++){var n=arguments[t];if(null!=n)for(var a in n)i.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}});var b=function e(a,i){var r;return function(){var t=arguments,n=this,e=function e(){return a.apply(n,t)};clearTimeout(r),r=setTimeout(e,i)}},e=function(){"use strict";var i=document.documentElement,r='button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])',m={trigger:null,panel:null,tabbableEls:null,firstTabbable:null,lastTabbable:null,inertOmmits:null},e=function e(t){var n=t.trigger,a=t.panel,i=t.inertOmmits;if(!n||!a)throw new Error("SlidingMenu can't initialized.\ncheck your options");m.trigger=n,m.panel=a,m.tabbableEls=a.querySelectorAll(r),m.firstTabbable=m.tabbableEls&&m.tabbableEls[0],m.lastTabbable=m.tabbableEls&&m.tabbableEls[m.tabbableEls.length-1],m.inertOmmits=i,a.addEventListener("transitionend",o,!1),n.addEventListener("click",s,!1)},f=function e(){var t;return m.panel.classList.contains("nav--animate")},s=function e(){(f()?v:t)()},t=function e(){var t=m.panel,n=m.trigger;i.classList.add("sidebar-opened"),document.addEventListener("keydown",l,!1),b(function(){t.classList.add("nav--animate"),t.setAttribute("aria-hidden","false"),n.lastChild.textContent="close",n.setAttribute("aria-expanded","true"),a(t)},50)()},v=function e(){var t=m.panel;n(),t.classList.remove("nav--animate"),document.removeEventListener("keydown",l,!1)},a=function e(){for(var t=m.inertOmmits,n=m.panel,a=-1,i;i=n.parentNode.children[++a];)i===n||i.matches(t)||(i.setAttribute("aria-hidden","true"),i.setAttribute("inert",""))},n=function e(){for(var t=document.querySelectorAll("[inert]"),n=-1,a;a=t[++n];)a.removeAttribute("aria-hidden"),a.removeAttribute("inert")},o=function e(){var t=m.firstTabbable,n=m.trigger,a=m.panel;b(function(){f()?t.focus():(n.lastChild.textContent="menu",n.setAttribute("aria-expanded","false"),i.classList.remove("sidebar-opened"),a.setAttribute("aria-hidden","true"),n.focus())},20)()},l=function e(t){var n,a=(t=t||window.event).keyCode,i=t.which,r=t.target,s=t.srcElement,o=t.shiftKey,l=m.lastTabbable,c=m.firstTabbable,u=m.trigger,b,d=r||s;switch(a||i){case 27:f()&&v();break;case 9:f()&&d===u&&o?(t.preventDefault(),t.stopPropagation(),l.focus()):f()&&d===u&&!o?(t.preventDefault(),t.stopPropagation(),c.focus()):(d===c&&o||d===l&&!o)&&(t.preventDefault(),t.stopPropagation(),u.focus());break}};return{init:e,isVisible:f}}();e.init({trigger:document.getElementsByClassName("nav-toggle")[0],panel:document.getElementsByClassName("nav")[0],inertOmmits:".gnb, style, meta, link, base, script, .nav"});var t=function(){"use strict";var i=document.documentElement,r='button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])',m={dialog:null,firstTabbable:null,lastTabbable:null,inertOmmits:null},s=function e(){for(var t=m.inertOmmits,n=m.dialog,a=-1,i;i=n.parentNode.children[++a];)i===n||i.matches(t)||(i.setAttribute("aria-hidden","true"),i.setAttribute("inert",""))},o=function e(){for(var t=document.querySelectorAll("[inert]"),n=-1,a;a=t[++n];)a.removeAttribute("aria-hidden"),a.removeAttribute("inert")},l=function e(t){var n=m.dialog,a;!0!==JSON.parse(sessionStorage.getItem("copyright-agree"))&&(i.classList.add("open-license-dialog"),n.hidden=!1,i.addEventListener("keydown",u,!1),b(function(){n.classList.add("dialog--animate"),n.setAttribute("aria-hidden","false"),s(n)},50)())},f=function e(t){var n=m.dialog,a=m.agree;a.checked?(sessionStorage.setItem("copyright-agree",JSON.stringify(!0)),a.checked=!1):alert("저작권 침해에 따른 법적인 책임은 사용자에게 있습니다.\n저작권 침해시 법적인 절차에 따라 조치할 예정이니 유의하시기 바랍니다."),o(),n.classList.remove("dialog--animate"),i.removeEventListener("keydown",u,!1)},v=function e(){var t;return m.dialog.classList.contains("dialog--animate")},c=function e(t){var n=m.keyTabbable,a=m.dialog;b(function(){v()?n.focus():(i.classList.remove("open-license-dialog"),a.setAttribute("aria-hidden","true"),a.hidden=!0)},20)()},u=function e(t){var n,a=(t=t||window.event).keyCode,i=t.which,r=t.target,s=t.srcElement,o=t.shiftKey,l=m.lastTabbable,c=m.firstTabbable,u=m.agree,b,d=r||s;switch(a||i){case 27:u.checked=!1,v()&&f();break;case 9:d===c&&o?(t.preventDefault(),t.stopPropagation(),l.focus()):d!==l||o||(t.preventDefault(),t.stopPropagation(),c.focus());break}},e;return{init:function e(t){var n=t.dialog,a=t.inertOmmits;if(!n)throw new Error("LicenseDialog can't initialized.\ncheck your options");m.dialog=n,m.tabbableEls=n.querySelectorAll(r),m.firstTabbable=m.tabbableEls&&m.tabbableEls[0],m.keyTabbable=m.tabbableEls&&m.tabbableEls[2],m.lastTabbable=m.tabbableEls&&m.tabbableEls[m.tabbableEls.length-1],m.closeBtn=n.querySelector(".btn-close"),m.agree=n.querySelector("#license-agree"),m.inertOmmits=a,i.addEventListener("copy",l,!1),m.dialog.addEventListener("transitionend",c,!1),m.closeBtn.addEventListener("click",f,!1)}}}();t.init({dialog:document.getElementsByClassName("license-notation")[0],inertOmmits:"style, meta, link, base, script"});var n=function(){"use strict";var i;function r(e){(e=e||window.event).stopPropagation(),i.classList.add("in-focus")}function s(e){var t=(e=e||window.event).relatedTarget;("focusout"!=e.type||t)&&t.matches(".toc a")||i.classList.remove("in-focus")}var o=new IntersectionObserver(function(e,t){var n;e[0].isIntersecting?i.classList.remove("sticky"):i.classList.add("sticky")},{root:null,rootMargin:"0px",threshold:0}),e;return{init:function e(t){var n=t.rootEl,a=t.targetEl;n&&((i=n).addEventListener("focusin",r,!1),i.addEventListener("focusout",s,!1),o.observe(a))}}}();n.init({rootEl:document.getElementsByClassName("toc")[0],targetEl:document.getElementsByClassName("header")[0]});