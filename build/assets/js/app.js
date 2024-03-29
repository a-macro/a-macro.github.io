"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
document.addEventListener("DOMContentLoaded", function () {
  var bodyTag = document.querySelector("body");
  var intro = document.querySelector(".intro");
  function calcSubMenuH(subMenu) {
    subMenu.forEach(function (el) {
      el.style.setProperty("--maxH", el.scrollHeight + "px");
    });
  }
  setTimeout(function () {
    var main = document.querySelector("main");
    //let preloader = document.querySelector(".preloader");
    //if(preloader) {
    main.style.display = "flex";
    //bodyTag.classList.add("ready");
    //}

    var subMenu = document.querySelectorAll(".submenu");
    if (subMenu && subMenu.length > 0) {
      calcSubMenuH(subMenu);
    }
    var velocity = .1;
    var pos = 0,
      topOffset = 0;
    var elemToScr;
    var start;
    var checkHash = window.location.hash;
    var newHash;
    var allLinks = document.querySelectorAll(".current .submenu__link");
    var currentLink = document.querySelector(".current");
    var menuInner = document.querySelector('.menu__inner');
    var linkFromTop;
    var delta;
    if (linkFromTop) {
      linkFromTop = currentLink.getBoundingClientRect().top + currentLink.getBoundingClientRect().height;
      delta = window.innerHeight - linkFromTop;
    }
    if (delta && delta < 0) {
      if (currentLink.getBoundingClientRect().height < window.innerHeight) {
        menuInner.scrollTop = delta * -1 + 10;
      } else {
        menuInner.scrollTop = currentLink.getBoundingClientRect().top - 20;
      }
    }
    if (checkHash && checkHash != "#") {
      var winYOffset = window.pageYOffset,
        hash = checkHash.split("#")[1];
      var el = document.getElementById(hash);
      if (el) {
        elemToScr = el.getBoundingClientRect().top - topOffset, start = null;
        var newCurrentTab;
        allLinks.forEach(function (link) {
          var href = link.getAttribute("href");
          if (href.includes(hash)) {
            newCurrentTab = link;
            /*setTimeout(() => {
                let machineEvent = new Event('click', {bubbles:true});
                newCurrentTab.dispatchEvent(machineEvent);    
            }, 500)*/
          }
        });

        var prev = document.querySelector(".currentTab");
        if (prev && newCurrentTab != prev) {
          prev.classList.remove("currentTab");
        }
        newCurrentTab.classList.add("currentTab");
      }
      setTimeout(function () {
        new StickyNavigation();
      }, 300);
    } else {
      new StickyNavigation();
    }
  }, 0);
  var height = window.innerHeight;
  document.documentElement.style.setProperty('--h', height + "px");
  var searchMenu = document.querySelector(".menu__search");
  var searchField = document.querySelector(".search-field");
  var inputSearch = document.querySelector(".search-field__inp");
  function openSearch() {
    searchMenu.classList.toggle("open");
    searchField.classList.toggle("open");
    inputSearch.focus();
    scrollLock.addScrollableSelector('.search-result');
    scrollLock.disablePageScroll(document.querySelector(".search-result-container"));
    if (window.innerWidth <= 1024) {
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
      }
    } else {
      bodyTag.classList.toggle("menu-open");
    }
  }
  if (searchMenu) {
    searchMenu.onclick = function (e) {
      e.preventDefault();
      openSearch();
    };
  }
  var burger = document.querySelector(".burger");
  var menu = document.querySelector(".menu");
  if (burger) {
    burger.onclick = function (e) {
      menuOpen();
    };
  }
  function menuOpen() {
    menu.classList.add("open");
    scrollLock.disablePageScroll(menu);
    bodyTag.classList.add("menu-open");
  }
  function menuClose() {
    menu.classList.remove("open");
    scrollLock.enablePageScroll(menu);
    scrollLock.enablePageScroll(document.querySelector(".search-result-container"));
    bodyTag.classList.remove("menu-open");
  }
  function getHeight() {
    if (window.innerWidth <= 1024) {
      searchResults = document.querySelector(".search-result");
      if (searchResults) {
        var hFromTop = searchResults.getBoundingClientRect().top;
        searchResults.style.cssText = "max-height: ".concat(height - hFromTop, "px");
      }
    } else {
      var _hFromTop = searchResults.getBoundingClientRect().top;
      var hFromBottom = showResultsAll.getBoundingClientRect().height;
      searchResults.style.cssText = "max-height: ".concat(height - _hFromTop - hFromBottom, "px");
    }
  }
  var searchForm = document.querySelector(".search-field__form");
  var searchResults = document.querySelector(".search-result");
  var velocity = .03;
  var pos = 0,
    topOffset = 0;
  var elemToScr;
  var start;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var el = entry.target;
      if (el.classList.contains("video")) {
        if (entry.isIntersecting) {
          el.play();
        } else {
          el.pause();
        }
      }
      /*if(el.classList.contains("intro")) {
          if(entry.isIntersecting) {
              setTimeout(() => {
                  history.pushState("", document.title, window.location.pathname);
              }, 10);
          } 
      }*/
    });
  });

  var videos = document.querySelectorAll("video");
  if (videos.length > 0) {
    videos.forEach(function (video) {
      observer.observe(video);
    });
  }
  var StickyNavigation = /*#__PURE__*/function () {
    function StickyNavigation() {
      var _this = this;
      _classCallCheck(this, StickyNavigation);
      this.currentId = null;
      this.currentTab = null;
      this.tabContainerHeight = 70;
      var self = this;
      $('.current .submenu__link').click(function () {
        self.onTabClick(event, event.target);
      });
      $(window).scroll(function () {
        _this.onScroll();
      });
      this.findCurrentTabSelector();
    }
    _createClass(StickyNavigation, [{
      key: "onTabClick",
      value: function onTabClick(event, element) {
        event.preventDefault();
        menuClose();
        var winYOffset = window.pageYOffset,
          hash = element.getAttribute("href");
        var stringHash = hash.split("#")[1];
        var el = document.getElementById(stringHash);
        if (el) {
          elemToScr = el.getBoundingClientRect().top - topOffset + 2, start = null;
          window.location.hash = "#" + _stringHash;
          var scroll = new SmoothScroll();
          var options = {
            speed: 1500,
            speedAsDuration: true,
            easing: 'easeOutQuint',
            updateURL: false
          };
          var _hash = element.getAttribute("href");
          var _stringHash = _hash.split("#")[1];
          var anchor = document.getElementById(_stringHash);
          scroll.animateScroll(anchor, element, options);
          var logScrollEvent = function logScrollEvent(event) {
            var fromTop = event.detail.anchor.getBoundingClientRect().top;
            if (fromTop > 10) {
              scroll.animateScroll(anchor, element, options);
            }
          };

          // Listen for scroll events
          document.addEventListener('scrollStop', logScrollEvent, false);
          var newCurrentTab = document.querySelector("a[href='".concat(_hash, "']"));
          var prev = document.querySelector(".currentTab");
          if (prev && newCurrentTab != prev) {
            prev.classList.remove("currentTab");
          }
          newCurrentTab.classList.add("currentTab");
        }
      }
    }, {
      key: "onScroll",
      value: function onScroll() {
        this.findCurrentTabSelector();
      }
    }, {
      key: "findCurrentTabSelector",
      value: function findCurrentTabSelector(element) {
        var newCurrentId;
        var newCurrentTab;
        var self = this;
        var targetPosition = {
            top: window.pageYOffset + intro.getBoundingClientRect().top,
            bottom: window.pageYOffset + intro.getBoundingClientRect().bottom
          },
          windowPosition = {
            top: window.pageYOffset,
            bottom: window.pageYOffset + document.documentElement.clientHeight
          };
        $('.current .submenu__link').each(function () {
          var id = $(this).attr('href');
          var stringId = id.split("#")[1];
          var newId = "#" + stringId;
          if (id != "#" && document.getElementById(stringId)) {
            var offsetTop = $(newId).offset().top;
            var offsetBottom = $(newId).offset().top + $(newId).height();
            var winCalc = $(window).scrollTop() + height + 200;
            if (winCalc > offsetTop && winCalc < offsetBottom) {
              newCurrentId = id;
              newCurrentTab = document.querySelector("a[href='".concat(id, "']"));
              var prev = document.querySelector(".currentTab");
              if (prev && newCurrentTab != prev) {
                prev.classList.remove("currentTab");
              }
              if (newCurrentTab) {
                newCurrentTab.classList.add("currentTab");
                var el = document.getElementById(stringId);
                el.id = "";
                if (targetPosition.bottom > windowPosition.top && targetPosition.top < windowPosition.bottom) {
                  history.pushState("", document.title, window.location.pathname);
                } else {
                  window.location.hash = stringId;
                }
                el.id = stringId;
              }
            }
          }
        });
      }
    }]);
    return StickyNavigation;
  }();
  var searchBtnRes = document.querySelector(".search__button_res");
  var searchBtnSub = document.querySelector(".search__button_sub");
  inputSearch.oninput = function (e) {
    if (!inputSearch.value) {
      searchResults = document.querySelector(".search-result");
      if (searchResults) {
        if (searchField) {
          searchField.className = "search-field";
          searchField.classList.add("open");
        }
      }
    }
  };
  if (searchForm) {
    searchForm.onsubmit = function (e) {
      e.preventDefault();
      searchResults = document.querySelector(".search-result");
      if (!inputSearch.value) {
        return;
      }
      searchField = document.querySelector(".search-field");
      if (searchField) {
        searchField.classList.add("show-results");
      }
      if (window.innerWidth <= 1024) {
        getHeight();
      }
    };
    searchForm.onreset = function (e) {
      e.preventDefault();
      searchResults = document.querySelector(".search-result");
      if (searchResults) {
        searchResults.removeAttribute("style");
      }
      searchField.classList.remove("show-results");
      hideResults();
      //searchMenu.classList.remove("open");
      searchForm.reset();
      //bodyTag.classList.remove("menu-open");
      //scrollLock.enablePageScroll(menu); 
      //menu.classList.remove("open");
    };
  }

  var colorsParent = document.querySelectorAll(".colors__block");
  if (colorsParent.length > 0) {
    colorsParent.forEach(function (el) {
      var len = el.querySelectorAll(".colors__el").length;
      el.setAttribute("data-num", len);
      el.style.cssText = "--len: ".concat(len);
    });
  }
  var colorsEl = document.querySelectorAll(".colors__el");
  if (colorsEl && colorsEl.length > 0) {
    colorsEl.forEach(function (el) {
      var parent = el.closest(".colors__block");
      el.onmouseenter = function (e) {
        if (!el.classList.contains("active")) {
          var prev = parent.querySelector(".colors__el.active");
          prev.classList.remove("active");
          el.classList.add("active");
        }
      };
      el.onclick = function (e) {
        if (!el.classList.contains("active")) {
          var prev = parent.querySelector(".colors__el.active");
          prev.classList.remove("active");
          el.classList.add("active");
        }
      };
    });
  }
  function hideResults() {
    var results = document.querySelectorAll(".search-result__el");
    if (results && results.length > 0 && window.innerWidth > 1919) {
      for (var i = 0; i < results.length; i++) {
        if (i >= 3) {
          results[i].classList.add("hide");
        }
      }
    } else if (results && results.length > 0 && window.innerWidth > 1024) {
      for (var _i = 0; _i < results.length; _i++) {
        if (_i >= 2) {
          results[_i].classList.add("hide");
        }
      }
    }
  }
  hideResults();
  function showResults() {
    getHeight();
    searchField.classList.add("show-all");
    var resultsHidden = document.querySelectorAll(".search-result__el.hide");
    if (resultsHidden && resultsHidden.length > 0) {
      resultsHidden.forEach(function (el) {
        el.classList.remove("hide");
      });
    }
  }
  var showResultsAll = document.querySelector(".search-result__show");
  if (showResultsAll) {
    showResultsAll.onclick = function (e) {
      e.preventDefault();
      document.querySelector(".search-result__show").style.display = "none";
      showResults();
    };
  }
  var sliders = document.querySelectorAll(".swiper-container");
  if (sliders && sliders.length > 0) {
    sliders.forEach(function (slider) {
      setTimeout(function () {
        var _Swiper;
        var btnPrev = slider.querySelector(".swiper-button-prev");
        var btnNext = slider.querySelector(".swiper-button-next");
        var swiper = new Swiper(slider, (_Swiper = {
          navigation: {
            nextEl: btnNext,
            prevEl: btnPrev
          },
          loop: false,
          freeMode: true,
          spaceBetween: 0,
          slidesPerView: "auto",
          watchSlidesProgress: true
        }, _defineProperty(_Swiper, "freeMode", false), _defineProperty(_Swiper, "allowTouchMove", true), _Swiper));
      }, 500);
    });
  }
  var copyColors = document.querySelectorAll(".color-copy");
  if (copyColors && copyColors.length > 0) {
    copyColors.forEach(function (copy) {
      copy.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText("".concat(copy.getAttribute("data-copy")));
      };
    });
  }
  var lightB = document.querySelector('[data-lightbox]');
  if (lightB) {
    lightbox.option({
      'alwaysShowNavOnTouchDevices': true,
      'fitImagesInViewport': true,
      'disableScrolling': true,
      'positionFromTop': 0,
      'imageFadeDuration': 100
    });
  }

  /*let fancies = document.querySelectorAll("[data-fancybox='gallery']");
  if(fancies.length > 0) {
      fancies.forEach(fancy => {
          let parent = fancy.closest(".swiper-slide");
          let hidden = parent.querySelector(".slide-img__hidden");
          if(hidden) {
              let sources = hidden.querySelectorAll('source');
              let xxl, xl, mid, sm, tel;
              sources.forEach(source => {
                  let media = source.getAttribute("media");
                  if(media.includes(1920)) {
                      let xxl = source.getAttribute("data-srcset").split(" 1x")[0];
                  }
                  if(media.includes(1440)) {
                      let xl = source.getAttribute("data-srcset").split(" 1x")[0];
                  } 
                  if(media.includes(1024)) {
                      let mid = source.getAttribute("data-srcset").split(" 1x")[0];
                  } 
                  if(media.includes("min-width:501px")) {
                      let sm = source.getAttribute("data-srcset").split(" 1x")[0];
                  } 
                  if(media.includes("max-width:501px")) {
                      let tel = source.getAttribute("data-srcset").split(" 1x")[0];
                  } 
                  console.log(source.getAttribute("data-srcset"));
              });
              if(window.innerWidth < 501) {
                  fancy.href = tel;
              }
              if(window.innerWidth >= 501 && window.innerWidth < 768) {
                  fancy.href = sm;
              }
              if(window.innerWidth >= 768 && window.innerWidth < 1024) {
                  fancy.href = mid;
              }
              if(window.innerWidth >= 1024 && window.innerWidth < 1440) {
                  fancy.href = xl;
              }
              if(window.innerWidth >= 1440) {
                  fancy.href = xxl;
              }    
          }
      });
  }*/

  var arrows = document.querySelectorAll(".search-result__el_arrow");
  if (arrows) {
    arrows.forEach(function (arrow) {
      arrow.onclick = function (e) {
        searchField.className = "search-field";
        searchField.classList.remove("open");
        if (searchResults) {
          searchResults.removeAttribute("style");
        }
        searchMenu.classList.remove("open");
        bodyTag.classList.remove("menu-open");
        searchForm.reset();
        menuClose();
      };
    });
  }
  var arrowsL = document.querySelectorAll(".search-result__el_body");
  if (arrowsL) {
    arrowsL.forEach(function (arrow) {
      arrow.onclick = function (e) {
        searchField.className = "search-field";
        searchField.classList.remove("open");
        if (searchResults) {
          searchResults.removeAttribute("style");
        }
        searchMenu.classList.remove("open");
        bodyTag.classList.remove("menu-open");
        searchForm.reset();
        menuClose();
      };
    });
  }
  var menuItems = document.querySelectorAll(".nav__link");
  if (menuItems && menuItems.length > 0) {
    menuItems.forEach(function (item) {
      var arr = document.createElement("span");
      arr.className = "nav__link_arr";
      item.appendChild(arr);
      item.onclick = function (e) {
        if (e.target.classList.contains("nav__link_arr")) {
          e.preventDefault();
          var parent = item.closest(".nav__item");
          if (!parent.classList.contains("active")) {
            var prevActive = document.querySelector(".active.nav__item");
            if (prevActive) {
              prevActive.classList.remove("active");
            }
            parent.classList.add("active");
          } else {
            parent.classList.remove("active");
          }
        }
      };
    });
  }
  bodyTag.onclick = function (e) {
    var checkMenu = e.target.closest(".menu");
    var checkSearch = e.target.closest(".search-field");
    if (bodyTag.classList.contains("menu-open") && !e.target.classList.contains("burger") && !e.target.classList.contains("burger__svg") && !checkMenu && !e.target.classList.contains("menu") && !e.target.classList.contains("search-field") && !checkSearch) {
      e.preventDefault();
      menuClose();
    }
    if (searchField && searchField.classList.contains("open") && !e.target.classList.contains("burger") && !e.target.classList.contains("burger__svg") && !checkMenu && !e.target.classList.contains("menu") && !e.target.classList.contains("search-field") && !checkSearch) {
      e.preventDefault();
      searchField.className = "search-field";
      searchField.classList.remove("open");
      if (searchResults) {
        searchResults.removeAttribute("style");
      }
      searchMenu.classList.remove("open");
      bodyTag.classList.remove("menu-open");
      searchForm.reset();
      menuClose();
    }
  };
  var containerJs = document.querySelector('.search-result-container');
  if (containerJs) {
    var config = {
      childList: true,
      subtree: true
    };
    var callback = function callback(mutationsList, observer) {
      mutationsList.forEach(function (list) {
        if (list.target == containerJs) {
          var _showResultsAll = document.querySelector(".search-result__show");
          searchField = document.querySelector(".search-field");
          searchResults = document.querySelector(".search-result");
          hideResults();
          if (_showResultsAll) {
            _showResultsAll.onclick = function (e) {
              e.preventDefault();
              if (window.innerWidth <= 1024) {
                var hFromTop = searchResults.getBoundingClientRect().top;
                searchResults.style.cssText = "max-height: ".concat(window.innerHeight - hFromTop, "px");
              } else {
                var _hFromTop2 = searchResults.getBoundingClientRect().top;
                var hFromBottom = _showResultsAll.getBoundingClientRect().height;
                searchResults.style.cssText = "max-height: ".concat(window.innerHeight - _hFromTop2 - hFromBottom, "px");
              }
              searchField.classList.add("show-all");
              _showResultsAll.style.display = "none";
              var resultsHidden = document.querySelectorAll(".search-result__el.hide");
              if (resultsHidden && resultsHidden.length > 0) {
                resultsHidden.forEach(function (el) {
                  el.classList.remove("hide");
                });
              }
            };
          }
          var _arrows = document.querySelectorAll(".search-result__el_arrow");
          if (_arrows) {
            _arrows.forEach(function (arrow) {
              arrow.onclick = function (e) {
                searchField.className = "search-field";
                searchField.classList.remove("open");
                if (searchResults) {
                  searchResults.removeAttribute("style");
                }
                searchMenu.classList.remove("open");
                bodyTag.classList.remove("menu-open");
                searchForm.reset();
                menuClose();
              };
            });
          }
          var _arrowsL = document.querySelectorAll(".search-result__el_body");
          if (_arrowsL) {
            _arrowsL.forEach(function (arrow) {
              arrow.onclick = function (e) {
                searchField.className = "search-field";
                searchField.classList.remove("open");
                if (searchResults) {
                  searchResults.removeAttribute("style");
                }
                searchMenu.classList.remove("open");
                bodyTag.classList.remove("menu-open");
                searchForm.reset();
                menuClose();
              };
            });
          }
          observer.disconnect();
          observer.observe(containerJs, config);
        }
      });
    };
    var _observer = new MutationObserver(callback);
    _observer.observe(containerJs, config);
  }
  window.onresize = function (e) {
    var subMenu = document.querySelectorAll(".submenu");
    if (subMenu && subMenu.length > 0) {
      subMenu.forEach(function (el) {
        el.style.setProperty("--maxH", el.scrollHeight + "px");
      });
    }
    height = window.innerHeight;
    document.documentElement.style.setProperty('--h', height + "px");
  };
});