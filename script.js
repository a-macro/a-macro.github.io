    const body = document.getElementsByTagName("body")[0];
    const Form = document.getElementById("form");

    class Inp {
        constructor(_parent) {
            this.parent = _parent;
            this.tags = [];
            this.tagInput = "";
            this.tagArea = "";
            this.block = "";
            this.createForm();
            this.createBlock();
            this.findInput();
            this.btnsEvents();
            this.sendToLocalStorage(this.tags.length);
        }

        createForm() {
            this.parent.innerHTML = `<form id = ${this.parent}>
                                        <input class = "set-elem" type="text" value = "" placeholder = 'Enter you tags with SPACE to devide'/>
                                        <div class = "tag-area"></div>
                                        <div>
                                            <input class = "readonly" type = "checkbox" name = "readonly">readonly
                                        </div>
                                        <div class = "btns">
                                            <button class = "btn print" type = "button">print list of tags</button>
                                            <button class = "btn exchange" type = "button">exchange list of tags</button>
                                            <button class = "btn add" type = "button">add one tag</button>
                                            <button class = "btn add_few" type = "button">add few tags</button>
                                            <button class = "btn del_all" type = "button">delete all tags</button>
                                            <button class = "btn del_last" type = "button">delete last tag</button>
                                        </div>
                                    </form>
                                    `;
            this.tagArea = this.parent.querySelector(".tag-area");
            for (let tag of this.tags) {
                this.addTagBlock(tag);
            }
        }
        createBlock() {
            this.block = document.createElement("div");
            this.block.className = "block";
            this.block.innerHTML = `<div>
                                    <span class = "tags_list"></span>
                                    <span class = "close_block"></span>
                                </div>
                                `;
            this.parent.appendChild(this.block); 
            
            this.block.addEventListener("click", (event) => {
                let targ = event.target;
                if( targ.classList.contains("show") ) {
                    targ.classList.remove("show");
                }
            });
        }
        btnsEvents() {
            const btnPrint = this.parent.querySelector(".print");
            btnPrint.addEventListener("click", (event) => {
                this.showAllTags();
            });
            
            const closeBtn = this.parent.querySelector(".close_block");
            closeBtn.addEventListener("click", (event) => {
                this.block.classList.remove("show");
            });

            const addBtn = this.parent.querySelector(".add");
            addBtn.addEventListener("click", (event) => {
                let tag = this.tagInput.value;
                this.addTagBlock(tag);
                this.clearInp();
            });

            const addFewTagsBtn = this.parent.querySelector(".add_few");
            addFewTagsBtn.addEventListener("click", (event) => {
                this.addFewTags();
                this.clearInp();
            });

            const exchBtn = this.parent.querySelector(".exchange");
            exchBtn.addEventListener("click", (event) => {
                this.exchangeTags(this.tagInput.value); 
            });

            const delAll = this.parent.querySelector(".del_all");
            delAll.addEventListener("click", (event) => {
                this.deleteAllTags();
            });

            const delLast = this.parent.querySelector(".del_last");
            delLast.addEventListener("click", (event) => {
                this.deleteLastTag();
            });

            const readonly = this.parent.querySelector(".readonly");
            readonly.addEventListener("change", (event) => {
                this.readonly();
            });

        }
        showAllTags() {
            this.block.classList.add("show");
            const list = this.parent.querySelector(".tags_list");
            list.innerHTML = this.printTags;
        }
        get printTags() {
            if(this.tags.length === 0) {
                return "List of tags is empty";
            } else {
                console.log(this.tags);
                return this.tags;
            }
        }
        findInput() {
            this.tagInput = this.parent.querySelector(".set-elem");
        }
        tagEvent(block) {
            block.addEventListener("click", (event) => {
                if( event.target.className == "del_tag" ) {
                    let curTarg = event.currentTarget.innerHTML.split("span>")[1];
                    let targ = this.tags.indexOf(curTarg);
                    event.currentTarget.remove();
                    localStorage.removeItem( (this.parent.id + "-" + targ) );
                    this.tags.splice(targ, 1);      
                };
            });
        }
        addFewTags(_tags) {
            let length = this.tags.length;
            let tagString = _tags || this.tagInput.value;
            if(!tagString) {
                throw new Error("You didn't enter anything");
            } else if (!tagString.includes(" ")) {
                throw new Error("You entered only one tag anything. Try one more time");
            } else {
                let tags = tagString.split(" ");
                for(let tag of tags) {
                    this.addTagBlock(tag);
                }
            }
            this.sendToLocalStorage(length);
        }
        addTagBlock(_tag) {
            if(!_tag) {
                throw new Error("You didn't enter anything. Try one more time");
            } else {
                let length = this.tags.length;
                let tagBlock = document.createElement("span");
                tagBlock.classList = "tag-block";
                tagBlock.innerHTML = `<span class = "del_tag"></span>${_tag}`;
                this.tagArea.appendChild(tagBlock); 
                this.tagEvent(tagBlock);
                this.tags.push(_tag);
            }
            this.sendToLocalStorage(length);
        }
        exchangeTags(_tagList) {
            if(!_tagList) {
                throw new Error("You didn't enter anything. Try one more time");
            } else {
                let length = this.tags.length;
                this.deleteAllTags();  
                _tagList = _tagList.split(" ");

                for(let tag of _tagList) {
                    this.addTagBlock(tag);
                }
                this.clearInp();  
            }
            this.sendToLocalStorage(length);
        }
        deleteAllTags() {
            if(this.tags.length === 0) {
                throw new Error("List of tags is empty");
            } else {
                let length = this.tags.length;
                this.tags.length = 0;
                this.tagArea.innerHTML = "";
            }
            this.sendToLocalStorage(length);
        }
        deleteLastTag() {
            if(this.tags.length === 0) {
                throw new Error("List of tags is empty");
            } else {
                let length = this.tags.length;
                this.tags.pop();
                this.tagArea.lastChild.remove();
            }
            this.sendToLocalStorage(length);
        }
        clearInp() {
            this.tagInput.value = "";
        }
        readonly() {
            const delBtns = this.parent.querySelectorAll(".del_tag");
            for(let btn of delBtns) {
                btn.classList.toggle("hide");
                let localParent = btn.closest(".tag-block");
                localParent.classList.toggle("readonly");
            }
            const btns = this.parent.querySelectorAll(".btn");
            for(let btn of btns) {
                btn.toggleAttribute("disabled");
            }
        }
        sendToLocalStorage(length) {
            for(let i = 0; i < length; i++) {
                localStorage.removeItem( (this.parent.id + "-" + i) );
            }
            for(let i = 0; i < this.tags.length; i++) {
                localStorage.setItem((this.parent.id + "-" + i), this.tags[i]);
            }
        }
        readFromLocalStorage() {
            for(let i = 0; i < this.tags.length; i++) {
                console.log( "tag " + (i + 1) + " - " + localStorage.getItem(this.parent.id + "-" + i) );
            }
        }
    } 

    const form = new Inp(Form);
    form.addFewTags("abc def ghi");
    form.printTags;
    form.readFromLocalStorage();

    const a = new Inp(test);
    a.addFewTags("1 2 3");

