"use strict";

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
  }, 2000);
  var height = window.innerHeight;
  document.documentElement.style.setProperty('--h', height + "px");
  var searchMenu = document.querySelector(".menu__search");
  var searchField = document.querySelector(".search-field");
  var inputSearch = document.querySelector(".search-field__inp");
  function openSearch() {
    searchMenu.classList.toggle("open");
    searchField.classList.toggle("open");
    inputSearch.focus();
    if (window.innerWidth <= 1024) {
      scrollLock.addScrollableSelector('.search-result');
      scrollLock.disablePageScroll(searchField);
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
      }
    } else {
      bodyTag.classList.add("menu-open");
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
  var searchBtn = document.querySelector(".search__button");
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

  var scrToBtn = document.querySelectorAll('.submenu__link[href^="#"]');
  var velocity = .1;
  var pos = 0,
    topOffset = 0;
  var elemToScr;
  var start;
  if (scrToBtn.length > 0) {
    scrToBtn.forEach(function (btn) {
      btn.onclick = function (e) {
        e.preventDefault();
        var winYOffset = window.pageYOffset,
          hash = btn.getAttribute("href");
        elemToScr = document.querySelector(hash).getBoundingClientRect().top - topOffset, start = null;
        requestAnimationFrame(step);
        function step(time) {
          if (start === null) start = time;
          var progress = time - start,
            r = elemToScr < 0 ? Math.max(winYOffset - progress / velocity, winYOffset + elemToScr) : Math.min(winYOffset + progress / velocity, winYOffset + elemToScr);
          window.scrollTo(0, r);
          if (r != winYOffset + elemToScr) {
            requestAnimationFrame(step);
          } else return;
        }
      };
    });
  }
  if (searchForm) {
    searchForm.onsubmit = function (e) {
      e.preventDefault();
      if (!inputSearch.value && !searchBtn.classList.contains("show")) {
        return;
      }
      if (!searchBtn.classList.contains("show")) {
        searchBtn.classList.add("show");
        searchField.classList.add("show-results");
        scrollLock.enablePageScroll(searchResults);
        if (window.innerWidth <= 1024) {
          getHeight();
        }
      } else {
        searchField.className = "search-field";
        searchField.classList.add("open");
        searchBtn.classList.remove("show");
        searchResults.removeAttribute("style");
        hideResults();
        //searchMenu.classList.remove("open");
        searchForm.reset();
        //bodyTag.classList.remove("menu-open");
        //scrollLock.enablePageScroll(menu); 
        //menu.classList.remove("open");
      }
    };
  }

  var colorsEl = document.querySelectorAll(".colors__el");
  if (colorsEl && colorsEl.length > 0) {
    colorsEl.forEach(function (el) {
      el.onmouseenter = function (e) {
        if (!el.classList.contains("active")) {
          var prev = document.querySelector(".colors__el.active");
          prev.classList.remove("active");
          el.classList.add("active");
        }
      };
      el.onclick = function (e) {
        if (!el.classList.contains("active")) {
          var prev = document.querySelector(".colors__el.active");
          prev.classList.remove("active");
          el.classList.add("active");
        }
      };
    });
  }
  function hideResults() {
    var results = document.querySelectorAll(".search-result__el");
    if (results && results.length > 0 && window.innerWidth > 1024) {
      for (var i = 0; i < results.length; i++) {
        if (i >= 3) {
          results[i].classList.add("hide");
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
      showResults();
    };
  }
  var sliders = document.querySelectorAll(".swiper-container");
  if (sliders && sliders.length > 0) {
    sliders.forEach(function (slider) {
      var btnPrev = slider.querySelector(".swiper-button-prev");
      var btnNext = slider.querySelector(".swiper-button-next");

      /*let sectionSlider = slider.closest(".section-slider");
      let pag = sectionSlider.querySelector(".swiper-fr");
      let active = pag.querySelector(".active");
      let common = pag.querySelector(".common");
      let allTabs = slider.querySelectorAll(".swiper-slide").length;
      let commonSlides;
      if(allTabs < 10) {
          commonSlides = "0" + allTabs;
      } else {
          commonSlides = allTabs;
      }
      common.innerHTML = commonSlides;*/

      var swiper = new Swiper(slider, {
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev
        },
        loop: false,
        slidesPerView: "auto",
        spaceBetween: 60,
        freeMode: false,
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
      item.onclick = function (e) {
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
      searchField.className = "search-field";
      searchBtn.classList.remove("show");
      searchResults.removeAttribute("style");
      searchMenu.classList.remove("open");
      bodyTag.classList.remove("menu-open");
      searchForm.reset();
      menuClose();
    }
  };
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