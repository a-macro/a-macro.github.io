document.addEventListener("DOMContentLoaded", () => {
    let bodyTag = document.querySelector("body");

    function calcSubMenuH(subMenu) {
        subMenu.forEach(el => {
            el.style.setProperty("--maxH", el.scrollHeight + "px");
        });    
    }
    setTimeout(() => {
        let main = document.querySelector("main");
        //let preloader = document.querySelector(".preloader");
        //if(preloader) {
            main.style.display = "flex";
            //bodyTag.classList.add("ready");
        //}

        let subMenu = document.querySelectorAll(".submenu");
        if(subMenu && subMenu.length > 0) {
            calcSubMenuH(subMenu); 
        }

        let velocity = .1; 
        let pos = 0,
        topOffset = 0;
        let elemToScr;
        let start;
        let checkHash = window.location.hash;
        let newHash;
        let allLinks = document.querySelectorAll(".current .submenu__link");
        let currentLink = document.querySelector(".current");
        currentLink.scrollIntoView({block: "start", behavior: "smooth"});
        if(checkHash && checkHash != "#") {
            let winYOffset = window.pageYOffset, 
            hash = checkHash.split("#")[1];
            let el = document.getElementById(hash);
            elemToScr = el.getBoundingClientRect().top-topOffset,
                start = null;
            let newCurrentTab;
            allLinks.forEach(link => {
                let href = link.getAttribute("href");
                if(href.includes(hash)) {
                    newCurrentTab = link;
                    setTimeout(() => {
                        let machineEvent = new Event('click', {bubbles:true});
                        newCurrentTab.dispatchEvent(machineEvent);    
                    }, 500)
                }
            });
            let prev = document.querySelector(".currentTab");
            if(prev && newCurrentTab != prev) {
                prev.classList.remove("currentTab");
            }
            newCurrentTab.classList.add("currentTab");
            setTimeout(() => {
                new StickyNavigation();
            }, 300);
            

        } else {
            new StickyNavigation();
        }

    }, 0);

    let height = window.innerHeight;
    document.documentElement.style.setProperty('--h', height + "px");

    let searchMenu = document.querySelector(".menu__search");
    let searchField = document.querySelector(".search-field");
    let inputSearch = document.querySelector(".search-field__inp");

    function openSearch() {
        searchMenu.classList.toggle("open");
        searchField.classList.toggle("open");
        inputSearch.focus();
        scrollLock.addScrollableSelector('.search-result');
        scrollLock.disablePageScroll(document.querySelector(".search-result-container")); 
        if(window.innerWidth <= 1024) {
            if(menu.classList.contains("open")) {
                menu.classList.remove("open");
            }
        } else {
            bodyTag.classList.toggle("menu-open");
        }
    }

    if(searchMenu) {
        searchMenu.onclick = (e) => {
            e.preventDefault();
            openSearch();
        }
    }
    

    let burger = document.querySelector(".burger");
    let menu = document.querySelector(".menu");
    if(burger) {
        burger.onclick = (e) => {
            menuOpen();
        }
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
        if(window.innerWidth <= 1024) {
            let hFromTop = searchResults.getBoundingClientRect().top;
            searchResults.style.cssText = `max-height: ${height - hFromTop}px`;
        } else {
            let hFromTop = searchResults.getBoundingClientRect().top;
            let hFromBottom = showResultsAll.getBoundingClientRect().height;
            searchResults.style.cssText = `max-height: ${height - hFromTop - hFromBottom}px`;
        }
    }

    let searchForm = document.querySelector(".search-field__form");
    let searchResults = document.querySelector(".search-result");

    let velocity = .1; 
    let pos = 0,
    topOffset = 0;
    let elemToScr;
    let start;


    class StickyNavigation {
	
        constructor() {
            this.currentId = null;
            this.currentTab = null;
            this.tabContainerHeight = 70;
            let self = this;
            $('.current .submenu__link').click(function() { 
                self.onTabClick(event, event.target); 
            });
            $(window).scroll(() => { this.onScroll(); });
            $(window).resize(() => { this.onResize(); });
            this.findCurrentTabSelector();
        }
        
        onTabClick(event, element) {
            event.preventDefault();
            menuClose();
            let winYOffset = window.pageYOffset, 
            hash = element.getAttribute("href");
            let stringHash = hash.split("#")[1];
            let el = document.getElementById(stringHash);
            if(el) {
                elemToScr = el.getBoundingClientRect().top-topOffset + 2,
                start = null;
            window.location.hash = "#" + stringHash;

            let animScr = requestAnimationFrame(step); 
            function step(time) {
                if (start === null) start = time;
                let progress = time - start,
                    r = (elemToScr < 0 ? Math.max(winYOffset - progress / velocity, winYOffset + elemToScr) : Math.min(winYOffset + progress / velocity, winYOffset + elemToScr));
                window.scrollTo(0, r);
                if (r != winYOffset + elemToScr) {
                    requestAnimationFrame(step)
                } else 		{
                    cancelAnimationFrame(animScr);
                    let newCurrentTab = document.querySelector(`a[href='${hash}']`);
                    let prev = document.querySelector(".currentTab");
                    if(prev && newCurrentTab != prev) {
                        prev.classList.remove("currentTab");
                    }
                    newCurrentTab.classList.add("currentTab");
                    return;
                }
            }
            }

        }
        
        onScroll() {
            this.checkTabContainerPosition();
            this.findCurrentTabSelector();
        }
        
        onResize() {
            if(this.currentId) {
                this.setSliderCss();
            }
        }
        
        checkTabContainerPosition() {
        }
        
        findCurrentTabSelector(element) {
            let newCurrentId;
            let newCurrentTab;
            let self = this;
            $('.current .submenu__link').each(function() {
                let id = $(this).attr('href');
                let stringId = id.split("#")[1];
                let newId = "#" + stringId;
                if(id != "#" && document.getElementById(stringId)) {
                    let offsetTop = $(newId).offset().top;
                    let offsetBottom = $(newId).offset().top + $(newId).height();
                    if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
                        newCurrentId = id;
                        newCurrentTab = document.querySelector(`a[href='${id}']`);
                        let prev = document.querySelector(".currentTab");
                        if(prev && newCurrentTab != prev) {
                            prev.classList.remove("currentTab");
                        }
                        if(newCurrentTab) {
                            newCurrentTab.classList.add("currentTab");
                            let el = document.getElementById(stringId);
                            el.id = "";
                            window.location.hash = stringId;
                            el.id = stringId;                            
                        }
                    }  
                }
            });
        }
        
        setSliderCss() {
        }
        
    }

    let searchBtnRes = document.querySelector(".search__button_res");
    let searchBtnSub = document.querySelector(".search__button_sub");

    inputSearch.oninput = (e) => {
        if(!inputSearch.value) {
            searchResults = document.querySelector(".search-result");
            searchField.className = "search-field";
            searchField.classList.add("open");
        }
    }
    

    if(searchForm) {
        searchForm.onsubmit = (e) => {
            e.preventDefault();
            searchResults = document.querySelector(".search-result");
            if(!inputSearch.value) {
                return;
            }
            searchField.classList.add("show-results");  
            if(window.innerWidth <= 1024) {
                getHeight();
            } 
        }
        searchForm.onreset = (e) => {
            e.preventDefault();
            searchResults = document.querySelector(".search-result");
            if(searchResults) {
                searchResults.removeAttribute("style");
            }
            searchField.classList.remove("show-results");
            hideResults();
            //searchMenu.classList.remove("open");
            searchForm.reset();
            //bodyTag.classList.remove("menu-open");
            //scrollLock.enablePageScroll(menu); 
            //menu.classList.remove("open");
        }
    }

    let colorsParent = document.querySelectorAll(".colors__block");
    if(colorsParent.length > 0) {
        colorsParent.forEach(el => {
            let len = el.querySelectorAll(".colors__el").length;
            el.setAttribute("data-num", len);
            el.style.cssText = `--len: ${len}`;    
        });
    }
    
    let colorsEl = document.querySelectorAll(".colors__el");
    if(colorsEl && colorsEl.length > 0) {
        colorsEl.forEach(el => {
            let parent = el.closest(".colors__block");
            el.onmouseenter = (e) => {
                if(!el.classList.contains("active")) {
                    let prev = parent.querySelector(".colors__el.active");
                    prev.classList.remove("active");
                    el.classList.add("active");
                }
            }
            el.onclick = (e) => {
                if(!el.classList.contains("active")) {
                    let prev = parent.querySelector(".colors__el.active");
                    prev.classList.remove("active");
                    el.classList.add("active");
                }
            }
        });
    }

    function hideResults() {
        let results = document.querySelectorAll(".search-result__el");
        if(results && results.length > 0 && window.innerWidth > 1919) {
            for (let i = 0; i < results.length; i++) {
                if(i >= 3) {
                    results[i].classList.add("hide");
                }
            }
        } else if(results && results.length > 0 && window.innerWidth > 1024) {
            for (let i = 0; i < results.length; i++) {
                if(i >= 2) {
                    results[i].classList.add("hide");
                }
            }
        }
    }

    hideResults();

    function showResults() {
        getHeight();
        searchField.classList.add("show-all");
        let resultsHidden = document.querySelectorAll(".search-result__el.hide");
        if(resultsHidden && resultsHidden.length > 0) {
            resultsHidden.forEach(el => {
                el.classList.remove("hide");
            });
        }
    }

    let showResultsAll = document.querySelector(".search-result__show");
    if(showResultsAll) {
        showResultsAll.onclick = (e) => {
            e.preventDefault();
            document.querySelector(".search-result__show").style.display = "none";
            showResults();
        }
    }

    let sliders = document.querySelectorAll(".swiper-container");
    if(sliders && sliders.length > 0) {
        sliders.forEach(slider => {
            setTimeout(() => {
                let btnPrev = slider.querySelector(".swiper-button-prev");
                let btnNext = slider.querySelector(".swiper-button-next");
    
                let swiper = new Swiper(slider, {
                    navigation: {
                        nextEl: btnNext,
                        prevEl: btnPrev
                    },
                    loop: true,
                    slidesPerView: "auto",
                    spaceBetween: 60,
                    freeMode: true,
                    watchSlidesProgress: true,
                    allowTouchMove: true,
                    initialSlide: 0,
                    breakpoints: {
                        300: {
                            spaceBetween: 20,
                        },
                        501: {
                            spaceBetween: 30,
                        },
                        1023: {
                            spaceBetween: 40,
                        },
                        1435: {
                            spaceBetween: 60,
                        },
                    },
                }); 
            }, 1000);

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

    let copyColors = document.querySelectorAll(".color-copy");
    if(copyColors && copyColors.length > 0) {
        copyColors.forEach(copy => {
            copy.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                navigator.clipboard.writeText(`${copy.getAttribute("data-copy")}`);
            };        
        });
    }

    let menuItems = document.querySelectorAll(".nav__link");
    if(menuItems && menuItems.length > 0) {
        menuItems.forEach(item => {
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

    bodyTag.onclick = (e) => {
        let checkMenu = e.target.closest(".menu");
        let checkSearch = e.target.closest(".search-field");
        if(bodyTag.classList.contains("menu-open") && 
        !e.target.classList.contains("burger") &&
        !e.target.classList.contains("burger__svg") && 
        !checkMenu && 
        !e.target.classList.contains("menu") &&
        !e.target.classList.contains("search-field") && 
        !checkSearch) {
            e.preventDefault();
            menuClose();
        }
        if(searchField && searchField.classList.contains("open") && 
        !e.target.classList.contains("burger") && 
        !e.target.classList.contains("burger__svg") && 
        !checkMenu && 
        !e.target.classList.contains("menu") &&
        !e.target.classList.contains("search-field") && 
        !checkSearch) {
            searchField.className = "search-field";
            searchField.classList.remove("open");
            if(searchResults) {
                searchResults.removeAttribute("style");
            }
            searchMenu.classList.remove("open");
            bodyTag.classList.remove("menu-open");
            searchForm.reset();
            menuClose();
        }
    }

    let containerJs = document.querySelector('.search-result-container');
    if(containerJs) {
        const config = {
            childList: true,
            subtree: true
        };
        const callback = function(mutationsList, observer) {
            mutationsList.forEach(list => {
                if(list.target == containerJs) {
                    let showResultsAll = document.querySelector(".search-result__show");
                    searchField = document.querySelector(".search-field");
                    searchResults = document.querySelector(".search-result");
                    hideResults();
                    if(showResultsAll) {
                        showResultsAll.onclick = (e) => {
                            e.preventDefault();
                            if(window.innerWidth <= 1024) {
                                let hFromTop = searchResults.getBoundingClientRect().top;
                                searchResults.style.cssText = `max-height: ${window.innerHeight - hFromTop}px`;
                            } else {
                                let hFromTop = searchResults.getBoundingClientRect().top;
                                let hFromBottom = showResultsAll.getBoundingClientRect().height;
                                searchResults.style.cssText = `max-height: ${window.innerHeight - hFromTop - hFromBottom}px`;
                            }
                            searchField.classList.add("show-all");
                            showResultsAll.style.display = "none";
                            let resultsHidden = document.querySelectorAll(".search-result__el.hide");
                            if(resultsHidden && resultsHidden.length > 0) {
                                resultsHidden.forEach(el => {
                                    el.classList.remove("hide");
                                });
                            }
                        }
                    }    
                    let arrows = document.querySelectorAll(".search-result__el_arrow");
                    if(arrows) {
                        arrows.forEach(arrow => {
                            arrow.onclick = (e) => {
                                searchField.className = "search-field";
                                searchField.classList.remove("open");
                                if(searchResults) {
                                    searchResults.removeAttribute("style");
                                }
                                searchMenu.classList.remove("open");
                                bodyTag.classList.remove("menu-open");
                                searchForm.reset();
                                menuClose();
                            }
                        });
                    }
                    
                    observer.disconnect();
                    observer.observe(containerJs, config);
                }            
            });
        };
        let observer = new MutationObserver(callback);
        observer.observe(containerJs, config);    
    }

    window.onresize = (e) => {
        let subMenu = document.querySelectorAll(".submenu");
        if(subMenu && subMenu.length > 0) {
            subMenu.forEach(el => {
                el.style.setProperty("--maxH", el.scrollHeight + "px");
            });    
        }
        height = window.innerHeight;
        document.documentElement.style.setProperty('--h', height + "px");
    }
});




