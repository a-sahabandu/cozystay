/**
 * Global functions defined by Revoise|SEYOL are started with underscore 
 */

// create element
const _e = (e, t = "", o = null, c = null) => {
	var el = document.createElement(e);
	if (t !== "") el.textContent = t;
	if (o != null) for (var i in Object.keys(o)) el.setAttribute(Object.keys(o)[i], Object.values(o)[i]);
	if (c != null) for (var i in Object.keys(c)) el.appendChild(Object.values(c)[i]);
	return el;
}

// get element by id
const _ = (e, s = document) => s.getElementById(e);

// query selector
const _q = (e, s = document) => s.querySelector(e);

// query selectorAll
const _a = (e, s = document) => s.querySelectorAll(e);

// eventlisteners
const _event = (e, es, f) => _$(es, (el) => el.addEventListener(e, (x) => f(x)));

const _zall = (s, f) => _a(s).forEach(el => f(el));

const __ = (v) => console.log(v);

const _$ = (es, f) => Array.isArray(es) ? es.forEach(i => typeof i == 'string' ? _zall(i, (el) => f(el)) : f(i)) : typeof es == 'string' ? _zall(es, (el) => f(el)) : f(es);

// to get a value of single element or set values on single or multi elements
const _value = (es, v = null) => v == null ? (typeof es == 'string' ? _q(es).value : es.value) : _$(es, (el) => el.value = v);

const _show = (es, v = "block") => _$(es, (el) => el.style.display = v);
const _hide = (es, v = "none") => _$(es, (el) => el.style.display = v);
const _remove = (es) => _$(es, (el) => { if (el) el.remove() });
const _text = (es, v = null) => v == null ? (typeof es == 'string' ? _q(es).textContent : es.textContent) : _$(es, (el) => el.textContent = v);

// hasOwnProperty of object or element
const _has = (o, k, n = null) => o.hasOwnProperty(k) ? o[k] : n;

// get & set attributes
/***
 * (es,a,v) = (element or selector, attribute, value)
 */
const _attr = (es, a, v = null) => {
	// select element if es is a selector name
	let el = typeof es == 'string' ? _q(es) : es;

	if (v == '_exist_') return el.hasAttribute(a);
	else if (el.hasAttribute(a)) {
		if (v == null) return el.getAttribute(a);
		else el.setAttribute(a, v);
	}
	else console.log('ERROR : Attribute does not exist in the element');
}


// get parent element by level
const _parent = (el, level = 1) => {
	let el2 = null;
	if (el) {
		for (let i = 0; i < level; i++) {
			if (el.parentNode) el = el.parentNode;
		}
		el2 = el;
	}
	return el2;
}

///ajx 
/// u = url, d = form_id, f = success func, m = method
const _ajx = (u, d, f, m = 'POST') => {
	const x = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	x.onreadystatechange = function () {
		if (x.readyState > 3 && x.status == 200) { f(x.responseText); }
	};
	if (m == 'POST') {
		x.open(m, u);
		if (d == "") x.send();
		else if (_(d)) {
			var fm = _(d);
			var fd = new FormData(fm);
			x.send(fd);
		} else if (typeof d === 'string') {
			x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			x.send(d);
		}
	} else if (m == 'GET') {
		x.open(m, u + '?' + d);
		x.send();
	}
	return x;
}