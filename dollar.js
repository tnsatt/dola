var $ = function (els) {
    return new $.init(els);
}
$.init = function (els) {
    if (els === undefined || els === null) {
        this.length = 0;
        return this;
    }
    if (typeof els === 'string') {
        if (els === 'body') {
            this[0] = document.body;
            this.length = 1;
            return this;
        }
        try {
            els = document.querySelectorAll(els);
            for (var i = 0; i < els.length; i++) {
                this[i] = els[i];
            }
            this.length = els.length;
            return this;
        } catch (e) {
            return $.create(els);
        }
    }
    if (window===els ||document===els || els instanceof HTMLElement) {
        this[0] = els;
        this.length = 1;
        return this;
    }
    for (var i = 0; i < els.length; i++) {
        this[i] = els[i];
    }
    this.length = els.length;
    return this;
};
$.init.prototype.each = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback.bind(this[i])(i) === false) break;
    }
    return this;
}
$.init.prototype.text = function (text) {
    if (text !== undefined) {
        return this.each(function () {
            this.innerText = text;
        });
    } else if (this.length > 0) {
        return this[0].innerText;
    }
    return null;
}
$.init.prototype.val = function (text) {
    if (text !== undefined) {
        return this.each(function () {
            this.value = text;
        });
    } else if (this.length > 0) {
        return this[0].value;
    }
    return null;
}
$.init.prototype.html = function (text) {
    if (text !== undefined) {
        return this.each(function () {
            this.innerHTML = text;
            Array.from(this.querySelectorAll("script")).forEach(oldScript => {
                const newScript = document.createElement("script");
                Array.from(oldScript.attributes)
                    .forEach(attr => newScript.setAttribute(attr.name, attr.value));
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
        });
    } else if (this.length > 0) {
        return this[0].innerHTML;
    }
    return null;
}
$.init.prototype.attr = function (name, value) {
    if (value !== undefined) {
        return this.each(function () {
            this.setAttribute(name, value);
        });
    } else if (this.length > 0) {
        return this[0].getAttribute(name);
    }
    return null;
}
$.init.prototype.removeAttr = function (name) {
    name=name.split(/\s+/);
    return this.each(function () {
        for(let item of name){
            this.removeAttribute(item);
        }
    });
}
$.init.prototype.click = function () {
    return this.each(function () {
        this.click();
    });
}
$.init.prototype.prop = function (name, value) {
    if (value !== undefined) {
        return this.each(function () {
            this[name] = value;
        });
    } else if (this.length > 0) {
        return this[0][name];
    }
    return null;
}
$.init.prototype.data = function (name, value) {
    if (value !== undefined) {
        return this.each(function () {
            this.dataset[name] = value;
        });
    } else if (this.length > 0) {
        return this[0].dataset[name];
    }
    return null;
}
$.init.prototype.get = function (i) {
    if (this[i] === undefined) return null;
    return this[i];
}
$.init.prototype.show = function () {
    for (let i = 0; i < this.length; i++) {
        this[i].style.display = 'block';
    }
    return this;
}
$.init.prototype.hide = function () {
    for (let i = 0; i < this.length; i++) {
        this[i].style.display = 'none';
    }
    return this;
}
$.init.prototype.toggle = function () {
    for (let i = 0; i < this.length; i++) {
        if (this[i].style.display == 'none') {
            this[i].style.display = 'block'
        } else {
            this[i].style.display = 'none';
        }
    }
    return this;
}
$.init.prototype.addClass = function (text) {
    let split = text.split(/\s+/);
    for (let i = 0; i < this.length; i++) {
        for (let j = 0; j < split.length; j++) {
            this[i].classList.add(split[j]);
        }
    }
    return this;
}
$.init.prototype.removeClass = function (text) {
    if (!text) {
        for (let i = 0; i < this.length; i++) {
            this[i].className = "";
        }
        return this;
    }
    let split = text.split(/\s+/);
    for (let i = 0; i < this.length; i++) {
        for (let j = 0; j < split.length; j++) {
            this[i].classList.remove(split[j]);
        }
    }
    return this;
}
$.init.prototype.toggleClass = function (text) {
    if (!text) return;
    let split = text.split(/\s+/);
    for (let i = 0; i < this.length; i++) {
        for (let j = 0; j < split.length; j++) {
            this[i].classList.toggle(split[j]);
        }
    }
    return this;
}
$.init.prototype.toArray = function (elm) {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        arr.push(this[i]);
    }
    return arr;
}
$.init.prototype.toNode = function (elm) {
    if (typeof elm === 'string') return document.querySelector(elm);
    if (elm instanceof HTMLElement) return elm;
    if (elm instanceof NodeList) return elm[0];
    return elm;
}
$.init.prototype.toNodeList = function (elm) {
    if (typeof elm === 'string') return document.querySelectorAll(elm);
    if (elm instanceof HTMLElement) return [elm];
    if (elm instanceof NodeList) return elm;
    return elm;
}
$.create = function (els) {
    let dom = new $.init();
    if (els instanceof HTMLElement) {
        dom[0] = els;
        dom.length = 1;
        return dom;
    }
    if (typeof els === 'string') {
        let node = document.createElement('template');
        node.innerHTML = els;
        let childNodes=node.content.children;
        for (let i = 0; i < childNodes.length; i++) {
            dom[i] = childNodes[i];
        }
        dom.length = childNodes.length;
        return dom;
    }
    for (var i = 0; i < els.length; i++) {
        dom[i] = els[i];
    }
    dom.length = els.length;
    return dom;
}
$.parseHtml = function (html) {
    let node = document.createElement('template');
    node.innerHTML = html;
    let arr=[];
    for(let item of node.content.childNodes){
        arr.push(item);
    }
    return arr;
}
$.parseHTML = function (html) {
    let node = document.createElement('template');
    node.innerHTML = html;
    let arr=[];
    for(let item of node.content.childNodes){
        arr.push(item);
    }
    return arr;
}
$.createNodes = function (els) {
    if (typeof els === 'string') {
        return $.parseHtml(els);
    }
    let arr = [];
    if (els instanceof HTMLElement) {
        arr.push(els);
        return arr;
    }
    for (var i = 0; i < els.length; i++) {
        arr.push(els[i]);
    }
    return arr;
}
$.init.prototype.append = function (elm) {
    if (!elm) return;
    if (typeof elm === 'string') {
        for (let i = 0; i < this.length; i++) {
            let list = $.parseHtml(elm);
            for (let j = 0; j < list.length; j++) {
                this[i].appendChild(list[j]);
            }
        }
    } else {
        let list;
        if (elm.length === undefined) list = [elm];
        else list = elm;
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < list.length; j++) {
                if (i == 0) {
                    this[i].appendChild(list[j]);
                } else {
                    this[i].appendChild(list[j].cloneNode(true));
                }
            }
        }
    }
    return this;
}
$.init.prototype.prepend = function (elm) {
    if (!elm) return;
    if (typeof elm === 'string') {
        for (let i = 0; i < this.length; i++) {
            let list = $.parseHtml(elm);
            for (let j = 0; j < list.length; j++) {
                this[i].prepend(list[j]);
            }
        }
    } else {
        let list;
        if (elm.length === undefined) list = [elm];
        else list = elm;
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < list.length; j++) {
                if (i == 0) {
                    this[i].prepend(list[j]);
                } else {
                    this[i].prepend(list[j].cloneNode(true));
                }
            }
        }
    }
    return this;
}
$.init.prototype.appendTo = function (elm) {
    if (!elm) return;
    let dom = new $.init(elm);
    for (let i = 0; i < dom.length; i++) {
        for (let j = 0; j < this.length; j++) {
            if (i == 0) {
                dom[i].appendChild(this[j]);
            } else {
                dom[i].appendChild(this[j].cloneNode(true));
            }
        }
    }
    return this;
}
$.init.prototype.prependTo = function (elm) {
    if (!elm) return;
    let dom = new $.init(elm);
    for (let i = 0; i < dom.length; i++) {
        for (let j = 0; j < this.length; j++) {
            if (i == 0) {
                dom[i].prepend(this[j]);
            } else {
                dom[i].prepend(this[j].cloneNode(true));
            }
        }
    }
    return this;
}
$.init.prototype.after = (function (elm) {
    if (!elm) return;
    if (typeof elm === 'string') {
        for (let i = 0; i < this.length; i++) {
            let list = $.parseHtml(elm);
            for (let j = 0; j < list.length; j++) {
                this[i].parentNode.insertBefore(list[j], this[i].nextSibling);
            }
        }
    } else {
        let list;
        if (elm.length === undefined) list = [elm];
        else list = elm;
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < list.length; j++) {
                if (i == 0) {
                    this[i].parentNode.insertBefore(list[j], this[i].nextSibling);
                } else {
                    this[i].parentNode.insertBefore(list[j].cloneNode(true), this[i].nextSibling);
                }
            }
        }
    }
    return this;
});
$.init.prototype.before = (function (elm) {
    if (!elm) return;
    if (typeof elm === 'string') {
        for (let i = 0; i < this.length; i++) {
            let list = $.parseHtml(elm);
            for (let j = 0; j < list.length; j++) {
                this[i].parentNode.insertBefore(list[j], this[i]);
            }
        }
    } else {
        let list;
        if (elm.length === undefined) list = [elm];
        else list = elm;
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < list.length; j++) {
                if (i == 0) {
                    this[i].parentNode.insertBefore(list[j], this[i].nextSibling);
                } else {
                    this[i].parentNode.insertBefore(list[j].cloneNode(true), this[i]);
                }
            }
        }
    }
    return this;
});
$.init.prototype.trigger = function (name) {
    name = name.trim();
    return this.each(function () {
        var event = document.createEvent('Event');
        event.initEvent(name, true, true);
        this.dispatchEvent(event);
    });
}
$.init.prototype.remove = function () {
    return this.each(function () {
        this.remove();
    });
}
$.init.prototype.closest = function (selector) {
    let dom = new $.init();
    this.each(function () {
        let elm = this.closest(selector);
        if (elm === null) return true;
        for (let j = 0; j < dom.length; j++) {
            if (dom[j] === elm) return true;
        }
        dom[dom.length] = elm;
        dom.length++;
    });
    return dom;
}
$.init.prototype.contains = function (elm) {
    if (!elm) return false;
    if (typeof elm === 'string') {
        for (let i = 0; i < this.length; i++) {
            if (this[i].matches(elm)) return true;
        }
    } else {
        for (let i = 0; i < this.length; i++) {
            if (this[i] === elm) return true;
        }
    }
    return false;
}
$.init.prototype.add = function (elm) {
    if (!elm) return;
    if (typeof elm === 'string') {
        elm = document.querySelectorAll(elm);
    } else if (elm instanceof HTMLElement) {
        elm = [elm];
    }
    big:
    for (let i = 0; i < elm.length; i++) {
        for (let j = 0; j < this.length; j++) {
            if (this[j] === elm[i]) continue big;
        }
        this[this.length] = elm[i];
        this.length++;
    }
    return this;
}
$.init.prototype.find = function (selector) {
    let dom = new $.init();
    for (let i = 0; i < this.length; i++) {
        let nodes = this[i].querySelectorAll(selector);
        big:
        for (let j = 0; j < nodes.length; j++) {
            for (let k = 0; k < dom.length; k++) {
                if (dom[k] === nodes[j]) continue big;
            }
            dom[dom.length] = nodes[j];
            dom.length++;
        }
    }
    return dom;
}
$.init.prototype.eq = function (index) {
    let dom = new $.init();
    for (let i = 0; i < this.length; i++) {
        let nodes = this[i].parentNode.children;
        if (nodes[index] == this[i]) {
            dom[dom.length] = nodes[index];
            dom.length++;
        }
    }
    return dom;
}
$.init.prototype.children = function (selector) {
    selector = selector.trim();
    if (!selector) return;
    selector = ':scope > ' + selector.split(',').join(', :scope>');
    let dom = new $.init();
    for (let i = 0; i < this.length; i++) {
        let nodes = this[i].querySelectorAll(selector);
        for (let j = 0; j < nodes.length; j++) {
            dom[dom.length] = nodes[j];
            dom.length++;
        }
    }
    return dom;
}
$.init.prototype.siblings = function (selector) {
    if (selector) {
        selector = selector.trim();
        selector = ':scope > ' + selector.split(',').join(', :scope>');
    } else {
        selector = ':scope > *';
    }
    let dom = new $.init();
    for (let i = 0; i < this.length; i++) {
        let nodes = this[i].parentNode.querySelectorAll(selector);
        big:
        for (let j = 0; j < nodes.length; j++) {
            if (this[i] === nodes[j]) continue;
            for (let k = 0; k < dom.length; k++) {
                if (dom[k] === nodes[j]) continue big;
            }
            dom[dom.length] = nodes[j];
            dom.length++;
        }
    }
    return dom;
}
$.init.prototype.parent = function (selector) {
    if (selector) selector = selector.trim();
    let dom = new $.init();
    big:
    for (let i = 0; i < this.length; i++) {
        let parentNode = this[i].parentNode;
        if (!selector || parentNode.matches(selector)) {
            for (let k = 0; k < dom.length; k++) {
                if (dom[k] === parentNode) continue big;
            }
            dom[dom.length] = parentNode;
            dom.length++;
        }
    }
    return dom;
}
$.init.prototype.index = function () {
    if (this.length == 0) return null;
    let nodes = this[0].parentNode.querySelectorAll(':scope>*');
    for (let j = 0; j < nodes.length; j++) {
        if (this[0] === nodes[j]) {
            return j;
        }
    }
    return null;
}
$.init.prototype.empty = function (selector) {
    for (let i = 0; i < this.length; i++) {
        this[i].innerHTML = '';
    }
    return this;
}
$.init.prototype.css = function (css, value=null) {
    if (!css) {
        if (this.length == 0) return {};
        return getComputedStyle(this[0]);
    }
    if (typeof css === 'string') {
        if(value){
            for (let i = 0; i < this.length; i++) {
                this[i].style.setProperty(css, value);
            }
            return this;
        }
        if (this.length == 0) return null;
        return getComputedStyle(this[0])[css];
    }
    for (let i = 0; i < this.length; i++) {
        for (let j in css) {
            this[i].style.setProperty(j, css[j]);
        }
    }
    return this;
}
$.init.prototype.slideDown = function (miliseconds) {
    for (let i = 0; i < this.length; i++) {
        this[i].style.transition = 'none';
        this[i].style.display = 'block';
        let h = this[i].offsetHeight;
        this[i].style.height = 0;
        this[i].offsetHeight;
        this[i].style.height = h;
        this[i].style.transition = 'height ' + (miliseconds / 1000) + 's linear';
    }
    return this;
}
$.init.prototype.select = function () {
    if (this.length > 0) this[0].select();
    return this;
}
$.init.prototype.isHidden = function () {
    if (this.length == 0) return true;
    return !(this[0].offsetWidth || this[0].offsetHeight || this[0].getClientRects().length);
}
$.init.prototype.on = (function () {
    if (document.addEventListener) {
        return function (evt, de, fn, save=true) {
            return addEvent.bind(this)(evt, de, fn, function (evt, cb) {
                this.addEventListener(evt, cb, false);
            }, save);
        };
    } else if (document.attachEvent) {
        return function (evt, de, fn, save=true) {
            return addEvent.bind(this)(evt, de, fn, function (evt, cb) {
                this.attachEvent("on" + evt, cb);
            }, save);
        };
    } else {
        return function (evt, de, fn, save=true) {
            return addEvent.bind(this)(evt, de, fn, function (evt, cb) {
                this["on" + evt] = cb;
            }, save);
        };
    }

    function addEvent(evt, de, fn, cb, save) {
        evt = evt.trim().split(/\s+/);
        if (typeof de === 'function') {
            this.each(function () {
                if (this['event'] == undefined) this['event'] = {};
                for (let item of evt) {
                    if(save){
                        if (this.event[item] == undefined) this.event[item] = [];
                        this.event[item].push(de);
                    }
                    cb.bind(this)(item, de);
                }
            });

        } else if (typeof de === 'string' && typeof fn === 'function') {
            this.each(function () {
                if (this['event'] == undefined) this['event'] = {};
                for (let item of evt) {
                    let func=function (e) {
                        let target = e.target.closest(de);
                        if (!target) return;
                        if (!this.contains(target)) return;
                        fn.bind(target)(e);
                    }
                    if(save){
                        if (this.event[item] == undefined) this.event[item] = [];
                        this.event[item].push(func);
                    }
                    cb.bind(this)(item, func);
                }
            });
        }
        return this;
    }
}());
$.init.prototype.off = (function () {
    if (document.removeEventListener) {
        return function (evt, fn) {
            return removeEvent.bind(this)(evt, fn, function (evt, fn) {
                this.removeEventListener(evt, fn, false);
            });
        };
    } else if (document.detachEvent) {
        return function (evt, fn) {
            return removeEvent.bind(this)(evt, fn, function (evt, fn) {
                this.detachEvent("on" + evt, fn);
            });
        };
    } else {
        return function (evt, fn) {
            return removeEvent.bind(this)(evt, fn, function (evt, fn) {
                //this["on" + evt] = null;
            });
        };
    }
    function removeEvent(event, fn, cb) {
        if (!event) {
            let root = this;
            return this.each(function (i) {
                let newNode = this.cloneNode(true);
                newNode.innerHTML = '';
                this.parentNode.replaceChild(newNode, this);
                while (this.childNodes.length > 0) {
                    newNode.append(this.childNodes[0]);
                }
                root[i] = newNode;
            });
        }
        event = event.trim().split(/\s+/);
        if (!fn) {
            return this.each(function () {
                for (let evt of event) {
                    if (this.event!==undefined && this.event[evt] !== undefined) {
                        for (let item of this.event[evt]) {
                            cb.bind(this)(evt, item);
                        }
                        this.event[evt] = [];
                    }
                    this["on" + evt] = null;
                }
            });
        }
        return this.each(function () {
            for (let evt of event) {
                cb.bind(this)(evt, fn);
            }
        });
    }
}());
