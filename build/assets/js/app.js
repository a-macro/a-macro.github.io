"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
document.addEventListener("DOMContentLoaded", function () {
  var bodyTag = document.querySelector("body");
  function calcSubMenuH(subMenu) {
    subMenu.forEach(function (el) {
      el.style.setProperty("--maxH", el.scrollHeight + "px");
    });
  }
  setTimeout(function () {
    var main = document.querySelector("main");
    var preloader = document.querySelector(".preloader");
    if (preloader) {
      main.style.display = "flex";
      bodyTag.classList.add("ready");
    }
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
    if (checkHash && checkHash != "#") {
      var winYOffset = window.pageYOffset,
        hash = checkHash.split("#")[1];
      var el = document.getElementById(hash);
      elemToScr = el.getBoundingClientRect().top - topOffset, start = null;
      window.scrollTo(0, elemToScr);
      var newCurrentTab;
      allLinks.forEach(function (link) {
        var href = link.getAttribute("href");
        if (href.includes(hash)) {
          newCurrentTab = link;
        }
      });
      var prev = document.querySelector(".currentTab");
      if (prev && newCurrentTab != prev) {
        prev.classList.remove("currentTab");
      }
      newCurrentTab.classList.add("currentTab");
      setTimeout(function () {
        new StickyNavigation();
      }, 500);

      /*requestAnimationFrame(step); 
      function step(time) {
          if (start === null) start = time;
          let progress = time - start,
              r = (elemToScr < 0 ? Math.max(winYOffset - progress / velocity, winYOffset + elemToScr) : Math.min(winYOffset + progress / velocity, winYOffset + elemToScr));
          window.scrollTo(0, r);
          if (r != winYOffset + elemToScr) {
              requestAnimationFrame(step)
          } else 	{
              let newCurrentTab;
              allLinks.forEach(link => {
                  let href = link.getAttribute("href");
                  if(href.includes(hash)) {
                      newCurrentTab = link;
                  }
              });
              let prev = document.querySelector(".currentTab");
              if(prev && newCurrentTab != prev) {
                  prev.classList.remove("currentTab");
              }
              newCurrentTab.classList.add("currentTab");
              setTimeout(() => {
                  new StickyNavigation();
              }, 500);
              return;
          };
      }*/
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
    bodyTag.classList.remove("menu-open");
  }
  function getHeight() {
    if (window.innerWidth <= 1024) {
      var hFromTop = searchResults.getBoundingClientRect().top;
      searchResults.style.cssText = "max-height: ".concat(height - hFromTop, "px");
    } else {
      var _hFromTop = searchResults.getBoundingClientRect().top;
      var hFromBottom = showResultsAll.getBoundingClientRect().height;
      searchResults.style.cssText = "max-height: ".concat(height - _hFromTop - hFromBottom, "px");
    }
  }
  var searchForm = document.querySelector(".search-field__form");
  var searchResults = document.querySelector(".search-result");

  /*if(searchResults) {
      const config = {
          childList: true,
          subtree: true
      };
      const callback = function(mutationsList, observer) {
          mutationsList.forEach(list => {
              //console.log(1);
              observer.disconnect();
              observer.observe(searchResults, config);
          });
      };
      let observer = new MutationObserver(callback);
      observer.observe(searchResults, config);    
  }
  //searchResults*/

  /*const smoothLinks = document.querySelectorAll('.submenu__link[href^="#"]');
  for (let smoothLink of smoothLinks) {
      smoothLink.addEventListener('click', function (e) {
          e.preventDefault();
          const id = smoothLink.getAttribute('href');
          window.location.hash = id;
          menuClose();
  
          document.querySelector(id).scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      });
  };*/

  /*
  if(scrToBtn.length > 0) {
    scrToBtn.forEach(btn => {
          btn.onclick = (e) => {
              e.preventDefault();
              menuClose();
              let winYOffset = window.pageYOffset, 
              hash = btn.getAttribute("href");
              elemToScr = document.querySelector(hash).getBoundingClientRect().top-topOffset,
                  start = null;
              window.location.hash = hash;
                requestAnimationFrame(step); 
              function step(time) {
                  if (start === null) start = time;
                  let progress = time - start,
                      r = (elemToScr < 0 ? Math.max(winYOffset - progress / velocity, winYOffset + elemToScr) : Math.min(winYOffset + progress / velocity, winYOffset + elemToScr));
                  window.scrollTo(0, r);
                  if (r != winYOffset + elemToScr) {
                      requestAnimationFrame(step)
                  } else 	return;
              }
          }
      });
  }*/

  var velocity = .1;
  var pos = 0,
    topOffset = 0;
  var elemToScr;
  var start;
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
      $(window).resize(function () {
        _this.onResize();
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
          var step = function step(time) {
            if (start === null) start = time;
            var progress = time - start,
              r = elemToScr < 0 ? Math.max(winYOffset - progress / velocity, winYOffset + elemToScr) : Math.min(winYOffset + progress / velocity, winYOffset + elemToScr);
            window.scrollTo(0, r);
            if (r != winYOffset + elemToScr) {
              requestAnimationFrame(step);
            } else {
              var newCurrentTab = document.querySelector("a[href='".concat(hash, "']"));
              var prev = document.querySelector(".currentTab");
              if (prev && newCurrentTab != prev) {
                prev.classList.remove("currentTab");
              }
              newCurrentTab.classList.add("currentTab");
              /*self.onScroll = function () {
                  this.checkTabContainerPosition();
                  this.findCurrentTabSelector();
              };*/
              return;
            }
          };
          elemToScr = el.getBoundingClientRect().top - topOffset + 2, start = null;
          window.location.hash = "#" + stringHash;
          //this.onScroll = function () {};

          requestAnimationFrame(step);
        }
      }
    }, {
      key: "onScroll",
      value: function onScroll() {
        this.checkTabContainerPosition();
        this.findCurrentTabSelector();
      }
    }, {
      key: "onResize",
      value: function onResize() {
        if (this.currentId) {
          this.setSliderCss();
        }
      }
    }, {
      key: "checkTabContainerPosition",
      value: function checkTabContainerPosition() {
        /*let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
        if($(window).scrollTop() > offset) {
            $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
        } 
        else {
            $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
        }*/
      }
    }, {
      key: "findCurrentTabSelector",
      value: function findCurrentTabSelector(element) {
        var newCurrentId;
        var newCurrentTab;
        var self = this;
        $('.current .submenu__link').each(function () {
          var id = $(this).attr('href');
          var stringId = id.split("#")[1];
          var newId = "#" + stringId;
          if (id != "#" && document.getElementById(stringId)) {
            var offsetTop = $(newId).offset().top;
            var offsetBottom = $(newId).offset().top + $(newId).height();
            if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
              newCurrentId = id;
              newCurrentTab = document.querySelector("a[href='".concat(id, "']"));
              var prev = document.querySelector(".currentTab");
              if (prev && newCurrentTab != prev) {
                prev.classList.remove("currentTab");
              }
              newCurrentTab.classList.add("currentTab");
            }
          }
        });
        if (this.currentId != newCurrentId || this.currentId === null) {
          this.currentId = newCurrentId;
          this.currentTab = newCurrentTab;
          this.setSliderCss();
        }
      }
    }, {
      key: "setSliderCss",
      value: function setSliderCss() {
        /*let width = 0;
        let left = 0;
        if(this.currentTab) {
            width = this.currentTab.css('width');
            left = this.currentTab.offset().left;
        }
        $('.et-hero-tab-slider').css('width', width);
        $('.et-hero-tab-slider').css('left', left);*/
      }
    }]);
    return StickyNavigation;
  }();
  var searchBtnRes = document.querySelector(".search__button_res");
  var searchBtnSub = document.querySelector(".search__button_sub");
  inputSearch.oninput = function (e) {
    if (!inputSearch.value) {
      searchResults = document.querySelector(".search-result");
      searchField.className = "search-field";
      searchField.classList.add("open");
    }
  };
  if (searchForm) {
    searchForm.onsubmit = function (e) {
      e.preventDefault();
      searchResults = document.querySelector(".search-result");
      if (!inputSearch.value) {
        return;
      }
      searchField.classList.add("show-results");
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
      var btnPrev = slider.querySelector(".swiper-button-prev");
      var btnNext = slider.querySelector(".swiper-button-next");
      var swiper = new Swiper(slider, {
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev
        },
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 60,
        freeMode: true,
        preloadImages: false,
        centeredSlides: false,
        lazy: {
          loadPrevNext: false,
          loadOnTransitionStart: false
        },
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        initialSlide: 0,
        breakpoints: {
          300: {
            spaceBetween: 20
          },
          501: {
            spaceBetween: 30
          },
          1023: {
            spaceBetween: 40
          },
          1435: {
            spaceBetween: 60
          }
        }
      });
      /*swiper.on("slideChange", function() {
          let curSlide = swiper.realIndex;
          let curSlideString;
          if(curSlide + 1 < 10) {
              curSlideString = "0" + (curSlide + 1);
          } else {
              curSlideString = curSlide + 1;
          }
          active.innerHTML = curSlideString;
      });*/
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
  var menuItems = document.querySelectorAll(".nav__link");
  if (menuItems && menuItems.length > 0) {
    menuItems.forEach(function (item) {
      /*item.onclick = (e) => {
          e.preventDefault();
          let parent = item.closest(".nav__item");
          if(!parent.classList.contains("active")) {
              let prevActive = document.querySelector(".active.nav__item");
              if(prevActive) {
                  prevActive.classList.remove("active");
              }
              parent.classList.add("active");
          } else {
              parent.classList.remove("active");
          }
      }*/
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
          observer.disconnect();
          observer.observe(containerJs, config);
        }
      });
    };
    var observer = new MutationObserver(callback);
    observer.observe(containerJs, config);
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