v71 = function () {
	return js.Boot.__string_rec(this, '');
};
if (typeof com == 'undefined') com = {};
if (!com.wiris) com.wiris = {};
if (!com.wiris.editor) com.wiris.editor = {};
com.wiris.editor.GraphicsContext = function () {};
com.wiris.editor.GraphicsContext.__name__ = ["com", "wiris", "editor", "GraphicsContext"];
com.wiris.editor.GraphicsContext.prototype.beginTranslate = null;
com.wiris.editor.GraphicsContext.prototype.drawText = null;
com.wiris.editor.GraphicsContext.prototype.drawHorizontalLine = null;
com.wiris.editor.GraphicsContext.prototype.drawVerticalLine = null;
com.wiris.editor.GraphicsContext.prototype.drawLine = null;
com.wiris.editor.GraphicsContext.prototype.endTranslate = null;
com.wiris.editor.GraphicsContext.prototype.getBaseline = null;
com.wiris.editor.GraphicsContext.prototype.getColor = null;
com.wiris.editor.GraphicsContext.prototype.getHeight = null;
com.wiris.editor.GraphicsContext.prototype.getLength = null;
com.wiris.editor.GraphicsContext.prototype.getMiddle = null;
com.wiris.editor.GraphicsContext.prototype.getStyle = null;
com.wiris.editor.GraphicsContext.prototype.getWidth = null;
com.wiris.editor.GraphicsContext.prototype.setBracketsSmaller = null;
com.wiris.editor.GraphicsContext.prototype.setColor = null;
com.wiris.editor.GraphicsContext.prototype.setStyle = null;
com.wiris.editor.GraphicsContext.prototype.__class__ = com.wiris.editor.GraphicsContext;
if (!com.wiris.jsEditor) com.wiris.jsEditor = {};
com.wiris.v = function (v81, resourceLoader)
{
    if (v81 === v91) return;
    {
        com.wiris.v.vA1(resourceLoader);
        this.browser = new com.wiris.vv();
        this.v81 = v81;
        this.fontFamily = null;
        this.vB1 = "rgb(0, 0, 0)";
        this.vC1 = new Hash();
        this.vD1 = "";
        this.vE1 = com.wiris.vy.vF1(100);
        this.vG1 = false;
        this.resourceLoader = resourceLoader;
        this.vH1 = false;
        this.style = this.vE1;
        this.vI1 = "";
        this.vJ1 = "";
        this.x = 0;
        this.vK1 = 0;
        com.wiris.vh.vL1(this.v81);
        this.vM1 = js.Lib.document.createElement("div");
        this.vM1.style.position = "absolute";
        this.vM1.style.top = "-100px";
        this.vM1.style.whiteSpace = "nowrap";
        this.vN1 = js.Lib.document.createElement("div");
        this.vN1.style.position = "fixed";
        this.vN1.style.top = "-100px";
        this.vN1.style.left = "0";
        this.vN1.style.margin = "0";
        this.vN1.style.padding = "0";
        this.vN1.style.overflow = 'hidden';
        this.vN1.style.visibility = 'hidden';
        this.vN1.style.zindex = '-999';
        this.vO1 = js.Lib.document.createTextNode("x");
        this.vN1.appendChild(this.vO1);
        this.vP1 = js.Lib.document.createElement("img");
        this.vP1.setAttribute("src", this.resourceLoader.vQ1("decoration/baseline_mark.png"));
        this.vP1.style.height = "0";
        this.vP1.style.width = "0";
        this.vP1.style.overflow = 'hidden';
        this.vP1.style.display = 'inline';
        this.vN1.appendChild(this.vP1);
        this.vM1.appendChild(this.vN1);
        this.v81.appendChild(this.vM1);
        this.setColor(0);
        this.setFontFamily("arial");
        this.setFontSize(16);
    }
};
com.wiris.v.__name__ = ["com", "wiris", "v"];
com.wiris.v.vR1 = null;
com.wiris.v.vA1 = function (resourceLoader) {
	if (com.wiris.v.vR1 == null) {
		com.wiris.v.vR1 = new Hash();
		com.wiris.v.vS1(Xml.parse(resourceLoader.vT1("characters.xml")));
	};
};
com.wiris.v.vS1 = function (node) {
	if ("" + node.nodeType == "element" && node.getNodeName() == "char") {
		var charCode = Std.parseInt(node.get("c"));
		var type = node.get("t");
		var vU1 = String.fromCharCode(charCode);
		if (type != null && type.length > 0) {
			vU1 += ":" + type;
		};
		com.wiris.v.vR1.set(vU1, true);
	};
	if ("" + node.nodeType == "element" || "" + node.nodeType == "document") {
		var i = node.iterator();
		while (i.hasNext()) {
			com.wiris.v.vS1(i.next());
		};
	};
};
com.wiris.v.prototype.color = null;
com.wiris.v.prototype.v81 = null;
com.wiris.v.prototype.fontFamily = null;
com.wiris.v.prototype.vB1 = null;
com.wiris.v.prototype.vC1 = null;
com.wiris.v.prototype.vM1 = null;
com.wiris.v.prototype.vN1 = null;
com.wiris.v.prototype.vO1 = null;
com.wiris.v.prototype.vP1 = null;
com.wiris.v.prototype.vD1 = null;
com.wiris.v.prototype.vE1 = null;
com.wiris.v.prototype.vG1 = null;
com.wiris.v.prototype.resourceLoader = null;
com.wiris.v.prototype.vV1 = null;
com.wiris.v.prototype.vH1 = null;
com.wiris.v.prototype.style = null;
com.wiris.v.prototype.vI1 = null;
com.wiris.v.prototype.vJ1 = null;
com.wiris.v.prototype.x = null;
com.wiris.v.prototype.vK1 = null;
com.wiris.v.prototype.browser = null;
com.wiris.v.prototype.vW1 = function () {
	return com.wiris.vh.vX1(js.Lib.document.body, this.v81);
};
com.wiris.v.prototype.beginTranslate = function (x, vK1, width, height) {
	this.x += x;
	this.vK1 += vK1;
};
com.wiris.v.prototype.vY1 = function (color) {
	var vZ1 = color >> 16 & 255;
	var va1 = color >> 8 & 255;
	var vb1 = color & 255;
	return "rgb(" + vZ1 + "," + va1 + "," + vb1 + ")";
};
com.wiris.v.prototype.drawHorizontalLine = function (id, x, vK1, width)
{
    x += this.x;
    vK1 += this.vK1;
    var line = js.Lib.document.createElement("div");
    line.style.position = "absolute";
    line.style.background = this.vV1;
    line.style.top = vK1 + "px";
    line.style.left = x + "px";
    line.style.width = com.wiris.vh.vc1(width) + "px";
    line.style.height = "1px";
    line.style.overflow = 'hidden';
    this.v81.appendChild(line);
};
com.wiris.v.prototype.drawLine = function (vd1, ve1, vf1, vg1) {
	if (!this.browser.isIE() || Std.parseFloat(this.browser.vh1()) >= 9) {
		this.vi1(vd1, ve1, vf1, vg1);
	} else {
		this.vj1(vd1, ve1, vf1, vg1);
	};
};
com.wiris.v.prototype.vi1 = function (vd1, ve1, vf1, vg1) {
	var div = js.Lib.document.createElement("div");
	div.setAttribute("class", "wrs_svg");
	var top = this.vK1;
	var left = this.x;
	if (this.browser.vk1()) {
		top += 1;
		left += 1;
	};
	div.style.top = top + "px";
	div.style.left = left + "px";
	div.style.width = Math.max(vd1, vf1) + 1 + "px";
	div.style.height = Math.max(ve1, vg1) + 1 + "px";
	div.style.position = "absolute";
	div.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">" + "<line x1=\"" + vd1 + "\" y1=\"" + ve1 + "\" x2=\"" + vf1 + "\" y2=\"" + vg1 + "\" style=\"stroke:" + this.vV1 + ";stroke-width:1;\"/>" + "</svg>";
	this.v81.appendChild(div);
};
com.wiris.v.prototype.vj1 = function (vd1, ve1, vf1, vg1) {
	var vl1 = vd1 < vf1 ? vd1 : vf1;
	var vm1 = ve1 < vg1 ? ve1 : vg1;
	vd1 = vd1 - vl1;
	vf1 = vf1 - vl1;
	ve1 = ve1 - vm1;
	vg1 = vg1 - vm1;
	var div = js.Lib.document.createElement("div");
	div.setAttribute("class", "wrs_vml");
	div.style.top = this.vK1 + vm1 - 1 + "px";
	div.style.left = this.x + vl1 - 1 + "px";
	div.style.position = "absolute";
	this.v81.appendChild(div);
	div.innerHTML = "<line xmlns=\"urn:schemas-microsoft-com:vml\" " + "style=\"behavior: url(#default#VML);display:inline-block;margin:0;padding:0;\" " + "from=\"" + vd1 + "," + ve1 + "\" to=\"" + vf1 + "," + vg1 + "\"></line>";
};
com.wiris.v.prototype.drawText = function (id, text, x, vK1, baseline) {
	x += this.x;
	vK1 += this.vK1;
	if (text.length == 1 && text.charCodeAt(0) >= com.wiris.vQ.vn1 && text.charCodeAt(0) <= com.wiris.vQ.vo1) {
		var vp1 = js.Lib.document.createElement("img");
		var src = this.resourceLoader.vQ1("charImages/" + StringTools.hex(text.charCodeAt(0)).toLowerCase() + ".png");
		var vq1 = this.vr1(text, true);
		vp1.setAttribute("src", src);
		vp1.style.position = "absolute";
		vp1.style.top = vK1 + baseline - vq1[2] + "px";
		vp1.style.left = x + "px";
		vp1.style.width = vq1[0] + "px";
		vp1.style.height = vq1[1] + "px";
		this.v81.appendChild(vp1);
	} else {
		var vs1 = js.Lib.document.createElement("span");
		this.vt1(vs1);
		var vu1 = this.vv1(text);
		var className = "";
		if (vu1 != null) {
			className = vu1;
		} else if (this.vw1(text)) {
			className = "wrs_mathChar";
		};
		com.wiris.vh.vx1(vs1, className);
		com.wiris.vh.vx1(vs1, this.vI1);
		vs1.style.fontSize = this.style.getP() + "%";
		vs1.style.position = "absolute";
		vs1.style.left = x + "px";
		vs1.style.top = vK1 + baseline - this.vr1(text, true)[2] + "px";
		var vy1 = js.Lib.document.createTextNode(text);
		vs1.appendChild(vy1);
		this.v81.appendChild(vs1);
	};
};
com.wiris.v.prototype.drawVerticalLine = function (id, x, vK1, height) {
	x += this.x;
	vK1 += this.vK1;
	var line = js.Lib.document.createElement("div");
	line.style.position = "absolute";
	line.style.background = this.vV1;
	line.style.top = vK1 + "px";
	line.style.left = x + "px";
	line.style.width = "1px";
	line.style.height = com.wiris.vh.vc1(height) + "px";
	line.style.overflow = 'hidden';
	this.v81.appendChild(line);
};
com.wiris.v.prototype.endTranslate = function (x, vK1, width, height) {
	this.x -= x;
	this.vK1 -= vK1;
};
com.wiris.v.prototype.getBaseline = function (text) {
	return this.vr1(text, false)[2];
};
com.wiris.v.prototype.getColor = function () {
	return this.color;
};
com.wiris.v.prototype.vz1 = function (fontFamily) {
	var i = fontFamily.split(" ").iterator();
	fontFamily = i.next();
	while (i.hasNext()) {
		var v02 = i.next();
		if (v02.length > 0) {
			fontFamily += v02.toUpperCase().charAt(0);
			if (v02.length > 1) {
				fontFamily += v02.substr(1, v02.length - 1);
			};
		};
	};
	return "wrs_font_" + fontFamily;
};
com.wiris.v.prototype.getHeight = function (text) {
	return this.vr1(text, false)[1];
};
com.wiris.v.prototype.getLength = function (x) {
	return Math.round(this.getHeight("x") * x);
};
com.wiris.v.prototype.v12 = function () {
	if (!this.vW1()) {
		return null;
	};
	return this.vC1;
};
com.wiris.v.prototype.getMiddle = function () {
	return this.getLength(0.30);
};
com.wiris.v.prototype.vv1 = function (text) {
	var v22 = com.wiris.v.vR1.get(text + ":s") != null;
	var v32 = com.wiris.v.vR1.get(text) != null;
	if (!v22 && !v32) {
		return null;
	};
	if (!v32 || v22 && this.vH1) {
		return "wrs_specialSmallChar";
	};
	return "wrs_specialChar";
};
com.wiris.v.prototype.getStyle = function () {
	return this.style;
};
com.wiris.v.prototype.vr1 = function (text, v42) {
	var v52 = text + ":" + this.style.getP() + ":" + this.style.getFontSize() + ":" + this.fontFamily + this.vJ1;
	if (this.vH1) {
		v52 += ":s";
	};
	if (v42) {
		v52 += ":d";
	};
	var v62 = this.vC1.get(v52);
	if (v62 != null) {
		return v62;
	};
	if (text.length == 1 && text.charCodeAt(0) >= com.wiris.vQ.vn1 && text.charCodeAt(0) <= com.wiris.vQ.vo1) {
		var charCode = text.charCodeAt(0);
		var v72 = this.getLength(0.1);
		var vq1 = [0, 0, 0];
		if (charCode >= com.wiris.vQ.vn1 && charCode <= com.wiris.vQ.v82) {
			var height = 14 + (charCode - com.wiris.vQ.vn1) * 2;
			vq1 = [13, height, height - v72];
		};
		if (charCode >= com.wiris.vQ.v92 && charCode <= com.wiris.vQ.vA2) {
			var height = 14 + (charCode - com.wiris.vQ.v92) * 2;
			vq1 = [13, height, height - v72];
		};
		if (charCode == com.wiris.vQ.vB2 || charCode == com.wiris.vQ.vo1) {
			vq1 = [2, 10, 10];
		};
		return vq1;
	};
	var vC2 = true;
	this.vN1.className = this.vI1;
	var className = "";
	var vD2 = false;
	if (text.length == 1 && text.charCodeAt(0) == 61442) {
		vC2 = false;
		className = this.vD1;
		vD2 = true;
	} else {
		var vu1 = this.vv1(text);
		if (vu1 != null) {
			vD2 = true;
			className = vu1;
		} else if (this.vw1(text)) {
			vD2 = true;
			className = "wrs_mathChar";
		};
		if (vD2 && !this.vE2(className)) {
			this.vG1 = true;
			vC2 = false;
		};
	};
	com.wiris.vh.vx1(this.vN1, className);
	this.vN1.style.fontSize = this.style.getP() + "%";
	var vy1 = js.Lib.document.createTextNode(text);
	this.vN1.replaceChild(vy1, this.vO1);
	this.vO1 = vy1;
	var baseline = this.vP1.offsetTop;
	if (this.vP1.offsetHeight > 0) {
		vC2 = false;
		this.vG1 = true;
		baseline = this.vP1.offsetHeight;
	};
	var vF2 = v42 ? v52 : v52 + ":d";
	var vG2 = !v42 ? v52 : v52.substr(0, v52.length - 2);
	var vq1 = [this.vN1.offsetWidth, this.vN1.offsetHeight, baseline];
	var vH2 = vD2 ? vq1 : this.vI2(text, vq1);
	if (vC2) {
		this.vC1.set(vF2, vq1);
		this.vC1.set(vG2, vH2);
	};
	if (v42) {
		return vq1;
	};
	return vH2;
};
com.wiris.v.prototype.getWidth = function (text) {
	return this.vr1(text, false)[0];
};
com.wiris.v.prototype.vE2 = function (className) {
	this.vD1 = className;
	return this.getWidth(String.fromCharCode(61442)) > this.getWidth("x") * 2;
};
com.wiris.v.prototype.vw1 = function (text) {
	return text.length > 0 && com.wiris.v.vR1.get(text.charAt(0) + ":m") != null;
};
com.wiris.v.prototype.vJ2 = function () {
	var vK2 = js.Lib.document.createElement("span");
	vK2.className = "wrs_mathChar";
	vK2.appendChild(js.Lib.document.createTextNode("+"));
	var vL2 = js.Lib.document.createElement("span");
	vL2.className = "wrs_specialChar";
	vL2.appendChild(js.Lib.document.createTextNode(String.fromCharCode(8214)));
	var vM2 = js.Lib.document.createElement("span");
	vM2.className = "wrs_specialSmallChar";
	vM2.appendChild(js.Lib.document.createTextNode(String.fromCharCode(8214)));
	var vN2 = js.Lib.document.createElement("div");
	vN2.style.position = "absolute";
	vN2.style.top = "-1000px";
	vN2.style.left = "-1000px";
	vN2.appendChild(vK2);
	vN2.appendChild(vL2);
	vN2.appendChild(vM2);
	this.v81.parentNode.appendChild(vN2);
};
com.wiris.v.prototype.vO2 = function () {
	return this.vG1 || !this.vW1();
};
com.wiris.v.prototype.setBracketsSmaller = function (b) {
	this.vH1 = b;
};
com.wiris.v.prototype.setColor = function (color) {
	this.vV1 = this.vY1(color);
	this.color = color;
};
com.wiris.v.prototype.setFontFamily = function (fontFamily) {
	if (this.fontFamily != fontFamily) {
		if (this.fontFamily != null) {
			var vP2 = this.vz1(this.fontFamily);
			com.wiris.vh.vQ2(this.v81, vP2);
		};
		var vR2 = this.vz1(fontFamily);
		com.wiris.vh.vx1(this.v81, vR2);
		this.fontFamily = fontFamily;
	};
};
com.wiris.v.prototype.setFontSize = function (fontSize) {
	this.v81.style.fontSize = fontSize + "px";
};
com.wiris.v.prototype.getFontSize = function () {
	var fontSize = this.v81.style.fontSize;
	fontSize = fontSize.substr(0, fontSize.length - 2);
	return Std.parseInt(fontSize);
};
com.wiris.v.prototype.vS2 = function (vC1) {
	if (vC1 != null) {
		this.vC1 = vC1;
	};
};
com.wiris.v.prototype.setStyle = function (style) {
	this.style = style;
	var vT2 = new Array();
	this.vJ1 = "";
	if (style.isFlagMask(com.wiris.vy.vU2)) {
		if (style.isFlag(com.wiris.vy.vU2)) {
			vT2.push("wrs_italic");
			this.vJ1 += ":italic";
		} else {
			vT2.push("wrs_notItalic");
			this.vJ1 += ":notItalic";
		};
	};
	if (style.isFlagMask(com.wiris.vy.vV2)) {
		if (style.isFlag(com.wiris.vy.vV2)) {
			vT2.push("wrs_bold");
			this.vJ1 += ":bold";
		} else {
			vT2.push("wrs_notBold");
			this.vJ1 += ":notBold";
		};
	};
	if (style.isFlagMask(com.wiris.vy.vW2)) {
		this.setFontFamily(style.getFontFamily());
	};
	if (style.isFlagMask(com.wiris.vy.vX2)) {
		this.setFontSize(style.getFontSize());
	};
	this.vI1 = vT2.join(" ");
	this.vB1 = this.vY1(style.getColor());
};
com.wiris.v.prototype.vI2 = function (text, vY2) {
	if (text != "x" || this.vI1 != "") {
		var vZ2 = this.getStyle();
		var va2 = com.wiris.vy.vF1(vZ2.getP());
		if (vZ2.isFlagMask(com.wiris.vy.vX2)) {
			va2.setFontSize(vZ2.getFontSize());
		};
		this.setStyle(va2);
		var vb2 = this.vr1("x", true);
		this.setStyle(vZ2);
		return [vY2[0], vb2[1], vb2[2]];
	} else {
		return vY2;
	};
};
com.wiris.v.prototype.vt1 = function (c) {
	c.style.color = this.vB1;
};
com.wiris.v.prototype.__class__ = com.wiris.v;
com.wiris.v.__interfaces__ = [com.wiris.editor.GraphicsContext];
if (!com.wiris.editor.formula) com.wiris.editor.formula = {};
if (!com.wiris.editor.formula.box) com.wiris.editor.formula.box = {};
com.wiris.v1 = function (p) {
	if (p === v91) return; {
		this.vc2 = new Array();
		this.vd2 = new com.wiris.vy();
		this.x = this.vK1 = 0;
		this.ve2 = false;
		this.vf2 = false;
		this.vg2 = false;
	}
};
com.wiris.v1.__name__ = ["com", "wiris", "v1"];
com.wiris.v1.prototype.vc2 = null;
com.wiris.v1.prototype.x = null;
com.wiris.v1.prototype.vK1 = null;
com.wiris.v1.prototype.width = null;
com.wiris.v1.prototype.height = null;
com.wiris.v1.prototype.baseline = null;
com.wiris.v1.prototype.parent = null;
com.wiris.v1.prototype.vh2 = null;
com.wiris.v1.prototype.ve2 = null;
com.wiris.v1.prototype.vd2 = null;
com.wiris.v1.prototype.vi2 = null;
com.wiris.v1.prototype.vf2 = null;
com.wiris.v1.prototype.vj2 = null;
com.wiris.v1.prototype.vg2 = null;
com.wiris.v1.prototype.vk2 = null;
com.wiris.v1.prototype.vl2 = function (vm2) {
	null;
};
com.wiris.v1.prototype.vn2 = function (vm2) {
	return false;
};
com.wiris.v1.prototype.vo2 = function () {
	null;
};
com.wiris.v1.prototype.vp2 = function (vm2) {
	null;
};
com.wiris.v1.prototype.vq2 = function (i, b) {
	this.vc2.insert(i, b);
	this.vr2();
};
com.wiris.v1.prototype["delete"] = function (i, len) {
	var vs2;
	vs2 = this.vc2.splice(i, len);
	var vt2 = vs2.iterator();
	while (vt2.hasNext()) {
		var b = vt2.next();
		b.vh2 = 0;
		b.parent = null;
	};
	this.vr2();
	return vs2;
};
com.wiris.v1.prototype.replace = function (i, vu2) {
	var vv2;
	vv2 = this.vw2(i);
	this.vc2.splice(i, 1);
	this.vc2.insert(i, vu2);
	vv2.vh2 = 0;
	vv2.parent = null;
	this.vr2();
	return vv2;
};
com.wiris.v1.prototype.vx2 = function (b) {
	this.vq2(this.vy2(), b);
};
com.wiris.v1.prototype.vr2 = function () {
	var i; {
		var vz2 = 0,
			v03 = this.vc2.length;
		while (vz2 < v03) {
				var v13 = vz2++;
				this.vc2[v13].vh2 = v13;
				this.vc2[v13].parent = this;
			};
	};
	if (!this.ve2) {
		this.ve2 = true;
		this.v23();
		this.ve2 = false;
	};
	this.v33();
};
com.wiris.v1.prototype.vy2 = function () {
	return this.vc2.length;
};
com.wiris.v1.prototype.vw2 = function (i) {
	return this.vc2[i];
};
com.wiris.v1.prototype.v43 = function () {
	return this.height - this.baseline;
};
com.wiris.v1.prototype.getParent = function () {
	return this.parent;
};
com.wiris.v1.prototype.v53 = function (s) {
	s.v63(this);
};
com.wiris.v1.prototype.v73 = function () {
	null;
};
com.wiris.v1.prototype.v23 = function () {
	null;
};
com.wiris.v1.prototype.v83 = function (b) {
	var i;
	b.x = this.x;
	b.vK1 = this.vK1;
	b.width = this.width;
	b.height = this.height;
	b.baseline = this.baseline;
	b.vh2 = this.vh2;
	com.wiris.vm.v93(this, b);
	com.wiris.vm.vA3(this, b);
	var n = this.vy2(); {
		var v03 = 0;
		while (v03 < n) {
			var v13 = v03++;
			b.vx2(this.vw2(v13).vB3());
		};
	};
};
com.wiris.v1.prototype.vB3 = function () {
	return null;
};
com.wiris.v1.prototype.vC3 = function () {
	var i;
	var parent = this.getParent();
	i = 0;
	while (parent != null) {
		i++;
		parent = parent.getParent();
	};
	return i;
};
com.wiris.v1.prototype.vD3 = function () {
	if (this.vf2) return;
	var i;
	this.vj2 = 0; {
		var vz2 = 0,
			v03 = this.vy2();
		while (vz2 < v03) {
				var v13 = vz2++;
				var vE3 = this.vw2(v13);
				vE3.vD3();
				this.vj2 += vE3.vj2;
			};
	};
	this.vf2 = true;
};
com.wiris.v1.prototype.v33 = function () {
	this.vF3();
	this.vG3();
	this.vH3();
};
com.wiris.v1.prototype.vF3 = function () {
	if (!this.vf2) return;
	this.vf2 = false;
	if (this.getParent() != null) this.getParent().vF3();
};
com.wiris.v1.prototype.vG3 = function () {
	if (!this.vg2) return;
	this.vg2 = false;
	if (this.getParent() != null) this.getParent().vG3();
};
com.wiris.v1.prototype.vH3 = function () {
	if (!this.vk2) return;
	this.vk2 = false;
	if (this.getParent() != null) this.getParent().vH3();
};
com.wiris.v1.prototype.vI3 = function (a, vJ3, rec) {
	if (vJ3) {
		this.vd2 = com.wiris.vy.join(this.vd2, a);
	} else {
		this.vd2 = com.wiris.vy.join(a, this.vd2);
	};
	if (rec) {
		var i; {
			var vz2 = 0,
				v03 = this.vy2();
			while (vz2 < v03) {
					var v13 = vz2++;
					this.vw2(v13).vI3(a, vJ3, rec);
				};
		};
	};
	this.vH3();
	this.vG3();
};
com.wiris.v1.prototype.vK3 = function (pos) {
	return this.vw2(pos).width;
};
com.wiris.v1.prototype.vL3 = function () {
	return null;
};
com.wiris.v1.prototype.vM3 = function (vm2, vN3) {
	return 0;
};
com.wiris.v1.prototype.__class__ = com.wiris.v1;
com.wiris.v2 = function (p) {
	if (p === v91) return; {
		com.wiris.v1.call(this);
		this.center = false;
	}
};
com.wiris.v2.__name__ = ["com", "wiris", "v2"];
com.wiris.v2.__super__ = com.wiris.v1;
for (var k in com.wiris.v1.prototype) com.wiris.v2.prototype[k] = com.wiris.v1.prototype[k];
com.wiris.v2.prototype.open = null;
com.wiris.v2.prototype.close = null;
com.wiris.v2.prototype.center = null;
com.wiris.v2.prototype.vl2 = function (vm2) {
	this.height = this.vw2(0).height;
	this.baseline = this.vw2(0).baseline;
	this.vw2(0).vK1 = 0;
	if (this.center) {
		var top = this.baseline - vm2.getMiddle();
		var bottom = this.height - top;
		var m = com.wiris.vS.max(top, bottom);
		if (bottom > top) {
			this.baseline += bottom - top;
			this.vw2(0).vK1 = bottom - top;
		};
		this.height = 2 * m;
	};
	var vO3;
	vO3 = this.vP3(vm2, this.open);
	this.vw2(0).x = vO3;
	this.width = this.vw2(0).width + vO3 + this.vP3(vm2, this.close);
};
com.wiris.v2.prototype.vp2 = function (vm2) {
	var vQ3 = new com.wiris.v11();
	if (this.open != null && this.open.length > 0) vQ3.vR3(vm2, this.open.charCodeAt(0), 0, 0, this.baseline, 0, this.height);
	if (this.close != null && this.close.length > 0) vQ3.vR3(vm2, this.close.charCodeAt(0), this.width - this.vP3(vm2, this.close), 0, this.baseline, 0, this.height);
};
com.wiris.v2.prototype.vP3 = function (vm2, s) {
	if (s == null || s.length == 0) return vm2.getLength(0.2);
	var vQ3 = new com.wiris.v11();
	return vQ3.getWidth(vm2, s.charCodeAt(0), 0, this.height);
};
com.wiris.v2.prototype.v53 = function (s) {
	s.vS3(this, "mfenced");
	this.open = s.vT3("open", this.open, "(");
	this.close = s.vT3("close", this.close, ")");
	s.v63(this);
	s.vU3("mfenced");
};
com.wiris.v2.prototype.v23 = function () {
	com.wiris.vm.vV3(this);
};
com.wiris.v2.prototype.vB3 = function () {
	var vW3;
	vW3 = new com.wiris.v2();
	this.v83(vW3);
	return vW3;
};
com.wiris.v2.prototype.__class__ = com.wiris.v2;
com.wiris.v3 = function (p) {
	if (p === v91) return; {
		com.wiris.v1.call(this);
	}
};
com.wiris.v3.__name__ = ["com", "wiris", "v3"];
com.wiris.v3.__super__ = com.wiris.v1;
for (var k in com.wiris.v1.prototype) com.wiris.v3.prototype[k] = com.wiris.v1.prototype[k];
com.wiris.v3.vX3 = function (vm2, b, vY3) {
	var vZ3;
	var va3;
	var middle = vm2.getLength(0.4);
	if (vY3 != null) {
		vZ3 = vY3.baseline;
		va3 = vY3.vM3(vm2, com.wiris.v1.vb3);
	} else {
		vZ3 = vm2.getLength(0.75);
		va3 = 0;
	};
	var vc3 = -(vZ3 - vm2.getLength(0.60)) + va3;
	var bottom = vc3 + b.v43();
	bottom = com.wiris.vS.min(bottom, -middle);
	vc3 = bottom - b.v43();
	return vc3;
};
com.wiris.v3.vd3 = function (vm2, b, vY3) {
	var ve3;
	var va3;
	var middle = vm2.getLength(0.5);
	if (vY3 != null) {
		ve3 = vY3.v43();
		va3 = vY3.vM3(vm2, com.wiris.v1.vf3);
	} else {
		ve3 = vm2.getLength(0.25);
		va3 = 0;
	};
	var vg3 = ve3 + va3;
	var top = vg3 - b.baseline;
	top = com.wiris.vS.max(-middle, top);
	vg3 = top + b.baseline;
	return vg3;
};
com.wiris.v3.prototype.type = null;
com.wiris.v3.prototype.vY3 = null;
com.wiris.v3.prototype.vl2 = function (vm2) {
	this.vY3 = this.vh3();
	var vi3 = new Array();
	if (this.type == com.wiris.v3.vj3 || this.type == com.wiris.v3.vk3) {
		this.vw2(0).x = this.vY3 != null ? this.vY3.vM3(vm2, com.wiris.v1.vl3) : 0;
		vi3[0] = com.wiris.v3.vd3(vm2, this.vw2(0), this.vY3);
	};
	if (this.type == com.wiris.v3.vm3 || this.type == com.wiris.v3.vk3) {
		var vt2 = this.type == com.wiris.v3.vk3 ? 1 : 0;
		this.vw2(vt2).x = this.vY3 != null ? this.vY3.vM3(vm2, com.wiris.v1.vn3) : 0;
		vi3[vt2] = com.wiris.v3.vX3(vm2, this.vw2(vt2), this.vY3);
	};
	this.width = 0;
	var i; {
		var vz2 = 0,
			v03 = this.vy2();
		while (vz2 < v03) {
				var v13 = vz2++;
				this.width = com.wiris.vS.max(this.width, this.vw2(v13).width + this.vw2(v13).x);
			};
	};
	com.wiris.vm.vo3(vm2, this, vi3);
};
com.wiris.v3.prototype.vn2 = function (vm2) {
	if (this.vY3 != this.vh3()) {
		vm2.setStyle(this.vi2);
		this.vl2(vm2);
		return true;
	};
	return false;
};
com.wiris.v3.prototype.v23 = function () {
	com.wiris.vm.vV3(this);
};
com.wiris.v3.prototype.vh3 = function () {
	if (this.vh2 > 0) {
		var vY3 = this.getParent().vw2(this.vh2 - 1);
		return vY3;
	};
	return null;
};
com.wiris.v3.prototype.vB3 = function () {
	var b;
	b = new com.wiris.v3();
	b.type = this.type;
	this.v83(b);
	return b;
};
com.wiris.v3.prototype.v53 = function (s) {
	s.vp3();
	this.type = s.vq3(this, "sub", this.type, com.wiris.v3.vj3);
	this.type = s.vq3(this, "sup", this.type, com.wiris.v3.vm3);
	this.type = s.vq3(this, "subsup", this.type, com.wiris.v3.vk3);
	s.vr3(this);
	s.v63(this);
	s.vs3();
};
com.wiris.v3.prototype.__class__ = com.wiris.v3;
com.wiris.v4 = function () {};
com.wiris.v4.__name__ = ["com", "wiris", "v4"];
com.wiris.v4.vt3 = function (vu3, height) {
	var vv3 = vu3.getHeight("x");
	var vZ2 = vu3.getStyle();
	var va2 = com.wiris.vy.vF1(height * vZ2.getP() / vv3);
	return va2;
};
com.wiris.v4.vw3 = function (vm2, name, vx3) {
	return vx3;
};
com.wiris.v4.vy3 = function (vm2, size) {
	return 0;
};
com.wiris.v4.prototype.__class__ = com.wiris.v4;
com.wiris.v5 = function (p) {
	if (p === v91) return; {
		com.wiris.v3.call(this);
	}
};
com.wiris.v5.__name__ = ["com", "wiris", "v5"];
com.wiris.v5.__super__ = com.wiris.v3;
for (var k in com.wiris.v3.prototype) com.wiris.v5.prototype[k] = com.wiris.v3.prototype[k];
com.wiris.v5.prototype.vl2 = function (vm2) {
	var p;
	p = this.type == com.wiris.v5.vz3 ? 0 : 1;
	com.wiris.vm.v04(vm2, this, com.wiris.v5.center, p, 0);
	var vY3 = this.vw2(p);
	var v14 = 0;
	var v24 = 0;
	if (this.type == com.wiris.v5.v34 || this.type == com.wiris.v5.v44) {
		var c = this.vw2(0);
		var v54 = vY3.vM3(vm2, com.wiris.v1.v64);
		v14 = com.wiris.vS.min(v54, c.height);
		vY3.vK1 -= v14;
		this.height -= v14;
		this.baseline -= v14;
		if (v14 < v54) {
			c.vK1 += v54 - v14;
		};
	};
	if (this.type == com.wiris.v5.vz3 || this.type == com.wiris.v5.v44) {
		var c = this.vw2(this.type == com.wiris.v5.vz3 ? 1 : 2);
		v24 = vY3.vM3(vm2, com.wiris.v1.v74);
		c.vK1 += -v14 + v24;
		this.height -= com.wiris.vS.min(-v24, c.height);
	};
};
com.wiris.v5.prototype.v53 = function (s) {
	s.vp3();
	this.type = s.vq3(this, "munder", this.type, com.wiris.v5.vz3);
	this.type = s.vq3(this, "mover", this.type, com.wiris.v5.v34);
	this.type = s.vq3(this, "munderover", this.type, com.wiris.v5.v44);
	s.vr3(this);
	var v84;
	if (this.type == com.wiris.v5.vz3) v84 = com.wiris.v5.v94;
	else if (this.type == com.wiris.v5.v34) v84 = com.wiris.v5.vA4;
	else v84 = com.wiris.v5.vB4;
	s.vC4(this, v84);
	s.vs3();
};
com.wiris.v5.prototype.v23 = function () {
	com.wiris.vm.vV3(this);
};
com.wiris.v5.prototype.vB3 = function () {
	var b;
	b = new com.wiris.v5();
	b.type = this.type;
	this.v83(b);
	return b;
};
com.wiris.v5.prototype.vK3 = function (pos) {
	return this.width;
};
com.wiris.v5.prototype.vG3 = function () {
	com.wiris.v3.prototype.vG3.call(this);
	var i; {
		var vz2 = 0,
			v03 = this.vy2();
		while (vz2 < v03) {
				var v13 = vz2++;
				var c = this.vw2(v13);
				if (c.vg2) c.vG3();
			};
	};
};
com.wiris.v5.prototype.__class__ = com.wiris.v5;
if (typeof haxe == 'undefined') haxe = {};
haxe.Http = function (url) {
	if (url === v91) return; {
		this.url = url;
		this.headers = new Hash();
		this.params = new Hash();
		this.async = true;
	}
};
haxe.Http.__name__ = ["haxe", "Http"];
haxe.Http.requestUrl = function (url) {
	var h = new haxe.Http(url);
	h.async = false;
	var r = null;
	h.onData = function (d) {
		r = d;
	};
	h.onError = function (e) {
		throw e;
	};
	h.request(false);
	return r;
};
haxe.Http.prototype.url = null;
haxe.Http.prototype.async = null;
haxe.Http.prototype.postData = null;
haxe.Http.prototype.headers = null;
haxe.Http.prototype.params = null;
haxe.Http.prototype.setHeader = function (vD4, value) {
	this.headers.set(vD4, value);
};
haxe.Http.prototype.setParameter = function (param, value) {
	this.params.set(param, value);
};
haxe.Http.prototype.setPostData = function (vE4) {
	this.postData = vE4;
};
haxe.Http.prototype.request = function (vF4) {
	var vG4 = this;
	var r = new js.XMLHttpRequest();
	var onreadystatechange = function () {
		if (r.readyState != 4) return;
		var s = (function (vH4) {
			var vI4;
			try {
				vI4 = r.status;
			} catch (vJ4) {
				{
					var e = vJ4;
					vI4 = null;
				};
			};
			return vI4;
		}(this));
		if (s == undefined) s = null;
		if (s != null) vG4.onStatus(s);
		if (s != null && s >= 200 && s < 400) vG4.onData(r.responseText);
		else switch (s) {
		case null:
		case undefined:
			{
				vG4.onError("Failed to connect or resolve host");
			}
			break;
		case 12029:
			{
				vG4.onError("Failed to connect to host");
			}
			break;
		case 12007:
			{
				vG4.onError("Unknown host");
			}
			break;
		default:
			{
				vG4.onError("Http Error #" + r.status);
			}
			break;
		};
	};
	if (this.async) r.onreadystatechange = onreadystatechange;
	var vK4 = this.postData;
	if (vK4 != null) vF4 = true;
	else {
		var vL4 = this.params.keys();
		while (vL4.hasNext()) {
			var p = vL4.next(); {
				if (vK4 == null) vK4 = "";
				else vK4 += "&";
				vK4 += StringTools.urlDecode(p) + "=" + StringTools.urlEncode(this.params.get(p));
			};
		}
	};
	try {
		if (vF4) r.open("POST", this.url, this.async);
		else if (vK4 != null) {
			var vM4 = this.url.split("?").length <= 1;
			r.open("GET", this.url + (vM4 ? "?" : "&") + vK4, this.async);
			vK4 = null;
		} else r.open("GET", this.url, this.async);
	} catch (vN4) {
		{
			var e = vN4; {
				this.onError(e.toString());
				return;
			};
		};
	};
	if (this.headers.get("Content-Type") == null && vF4 && this.postData == null) r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); {
		var vO4 = this.headers.keys();
		while (vO4.hasNext()) {
			var h = vO4.next();
			r.setRequestHeader(h, this.headers.get(h));
		}
	};
	r.send(vK4);
	if (!this.async) onreadystatechange();
};
haxe.Http.prototype.onData = function (vE4) {
	null;
};
haxe.Http.prototype.onError = function (vP4) {
	null;
};
haxe.Http.prototype.onStatus = function (status) {
	null;
};
haxe.Http.prototype.__class__ = haxe.Http;
com.wiris.editor.EditorListener = function () {};
com.wiris.editor.EditorListener.__name__ = ["com", "wiris", "editor", "EditorListener"];
com.wiris.editor.EditorListener.prototype.caretPositionChanged = null;
com.wiris.editor.EditorListener.prototype.clipboardChanged = null;
com.wiris.editor.EditorListener.prototype.contentChanged = null;
com.wiris.editor.EditorListener.prototype.styleChanged = null;
com.wiris.editor.EditorListener.prototype.mathmlSetted = null;
com.wiris.editor.EditorListener.prototype.__class__ = com.wiris.editor.EditorListener;
if (!com.wiris.editor.toolbar) com.wiris.editor.toolbar = {};
com.wiris.v6 = function (title, vQ4, vR4) {
	if (title === v91) return; {
		this.panel = new com.wiris.vZ();
		this.vQ4 = vQ4;
		this.title = title;
		this.vR4 = vR4;
	}
};
com.wiris.v6.__name__ = ["com", "wiris", "v6"];
com.wiris.v6.prototype.panel = null;
com.wiris.v6.prototype.vQ4 = null;
com.wiris.v6.prototype.title = null;
com.wiris.v6.prototype.vR4 = null;
com.wiris.v6.prototype.__class__ = com.wiris.v6;
List = function (p) {
	if (p === v91) return; {
		this.length = 0;
	}
};
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function (vS4) {
	var x = [vS4];
	if (this.h == null) this.h = x;
	else this.q[1] = x;
	this.q = x;
	this.length++;
};
List.prototype.push = function (vS4) {
	var x = [vS4, this.h];
	this.h = x;
	if (this.q == null) this.q = x;
	this.length++;
};
List.prototype.first = function () {
	return this.h == null ? null : this.h[0];
};
List.prototype.last = function () {
	return this.q == null ? null : this.q[0];
};
List.prototype.pop = function () {
	if (this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if (this.h == null) this.q = null;
	this.length--;
	return x;
};
List.prototype.isEmpty = function () {
	return this.h == null;
};
List.prototype.clear = function () {
	this.h = null;
	this.q = null;
	this.length = 0;
};
List.prototype.remove = function (v) {
	var vT4 = null;
	var l = this.h;
	while (l != null) {
		if (l[0] == v) {
			if (vT4 == null) this.h = l[1];
			else vT4[1] = l[1];
			if (this.q == l) this.q = vT4;
			this.length--;
			return true;
		};
		vT4 = l;
		l = l[1];
	};
	return false;
};
List.prototype.iterator = function () {
	return {
		h: this.h,
		hasNext: function () {
			return this.h != null;
		},
		next: function () {
			if (this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}
	};
};
List.prototype.toString = function () {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{";
	while (l != null) {
		if (first) first = false;
		else s.b[s.b.length] = ", ";
		s.b[s.b.length] = Std.string(l[0]);
		l = l[1];
	};
	s.b[s.b.length] = "}";
	return s.b.join("");
};
List.prototype.join = function (vU4) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while (l != null) {
		if (first) first = false;
		else s.b[s.b.length] = vU4;
		s.b[s.b.length] = l[0];
		l = l[1];
	};
	return s.b.join("");
};
List.prototype.filter = function (f) {
	var vV4 = new List();
	var l = this.h;
	while (l != null) {
		var v = l[0];
		l = l[1];
		if (f(v)) vV4.add(v);
	};
	return vV4;
};
List.prototype.map = function (f) {
	var b = new List();
	var l = this.h;
	while (l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	};
	return b;
};
List.prototype.__class__ = List;
com.wiris.v7 = function (p) {
	if (p === v91) return; {
		com.wiris.v1.call(this);
	}
};
com.wiris.v7.__name__ = ["com", "wiris", "v7"];
com.wiris.v7.__super__ = com.wiris.v1;
for (var k in com.wiris.v1.prototype) com.wiris.v7.prototype[k] = com.wiris.v1.prototype[k];
com.wiris.v7.prototype.vL3 = function () {
	return this;
};
com.wiris.v7.prototype.vW4 = function () {
	return 0;
};
com.wiris.v7.prototype.vX4 = function (vY4, vd1, left, right) {
	return null;
};
com.wiris.v7.prototype.vZ4 = function (x, va4) {
	return false;
};
com.wiris.v7.prototype.vb4 = function (x) {
	if (x < 0 || x >= this.vW4()) {
		throw "Invalid position";
	};
	return com.wiris.vz.vc4(this, x);
};
com.wiris.v7.prototype.vd4 = function (ve4) {
	return 0;
};
com.wiris.v7.prototype.vf4 = function (ve4, vg4) {
	if (vg4 > 0) return this.vd4(ve4) - 1;
	else return this.vd4(ve4);
};
com.wiris.v7.prototype.vh4 = function (x, vg4) {
	var c = x;
	var n = this.vy2();
	if (c >= n) c = n - 1;
	var p = this.vf4(c, vg4);
	while (p > x && c >= 0) {
		c--;
		if (c >= 0) p = this.vf4(c, vg4);
	};
	while (p < x && c < n) {
		c++;
		if (c < n) p = this.vf4(c, vg4);
	};
	if (p == x) return c;
	return -1;
};
com.wiris.v7.prototype.getSelectionRectangles = function (vY4, vd1) {
	return null;
};
com.wiris.v7.prototype.vD3 = function () {
	if (this.vf2) return;
	com.wiris.v1.prototype.vD3.call(this);
	this.vj2 += this.vW4();
};
com.wiris.v7.prototype.__class__ = com.wiris.v7;
com.wiris.v8 = function (p) {
	if (p === v91) return; {
		com.wiris.v7.call(this);
	}
};
com.wiris.v8.__name__ = ["com", "wiris", "v8"];
com.wiris.v8.__super__ = com.wiris.v7;
for (var k in com.wiris.v7.prototype) com.wiris.v8.prototype[k] = com.wiris.v7.prototype[k];
com.wiris.v8.vi4 = function (top, c) {
	var vj4 = com.wiris.vm.vk4(top, c);
	var box = vj4.b;
	var i = 0;
	while (box != null && !Std["is"](box, com.wiris.v8)) {
		i = box.vh2;
		box = box.getParent();
	};
	if (box != null) {
		var vl4 = (function (vH4) {
			var vI4;
			var vm4 = box;
			if (Std["is"](vm4, com.wiris.v8)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this));
		var vn4 = i % vl4.vo4;
		var vp4 = (function (vH4) {
			var vI4;
			var vm4 = Math.floor(i / (function (vH4) {
				var vI4;
				var vm4 = vl4.vo4;
				if (Std["is"](vm4, Float)) vm4;
				else throw "Class cast error";
				vI4 = vm4;
				return vI4;
			}(vH4)));
			if (Std["is"](vm4, Int)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this));
		var vq4 = new Array();
		vq4[0] = vl4;
		vq4[1] = vp4;
		vq4[2] = vn4;
		return vq4;
	};
	return null;
};
com.wiris.v8.prototype.vr4 = null;
com.wiris.v8.prototype.vo4 = null;
com.wiris.v8.prototype.vs4 = null;
com.wiris.v8.prototype.vt4 = null;
com.wiris.v8.prototype.vu4 = null;
com.wiris.v8.prototype.vv4 = null;
com.wiris.v8.prototype.vw4 = null;
com.wiris.v8.prototype.vx4 = null;
com.wiris.v8.prototype.vy4 = null;
com.wiris.v8.prototype.vz4 = null;
com.wiris.v8.prototype.v05 = null;
com.wiris.v8.prototype.v15 = null;
com.wiris.v8.prototype.v25 = null;
com.wiris.v8.prototype.v35 = null;
com.wiris.v8.prototype.v45 = null;
com.wiris.v8.prototype.v55 = null;
com.wiris.v8.prototype.v65 = null;
com.wiris.v8.prototype.vl2 = function (vm2) {
	if (this.vr4 == 0 || this.vo4 == 0) return;
	this.v45 = com.wiris.v4.vw3(vm2, this.vx4, 0);
	this.v75(vm2);
	this.v85(vm2);
	this.v95(vm2);
};
com.wiris.v8.prototype.v75 = function (vm2) {
	var i, vt2;
	this.vy4 = new Array();
	this.vz4 = new Array();
	this.v05 = new Array(); {
		var vz2 = 0,
			v03 = this.vo4;
		while (vz2 < v03) {
				var v13 = vz2++;
				this.vy4[v13] = 0;
			};
	}; {
		var vz2 = 0,
			v03 = this.vr4;
		while (vz2 < v03) {
				var vA5 = vz2++;
				this.vz4[vA5] = 0;
				this.v05[vA5] = 0;
			};
	};
	this.v15 = 0; {
		var vz2 = 0,
			v03 = this.vo4;
		while (vz2 < v03) {
				var v13 = vz2++; {
					var vB5 = 0,
						vC5 = this.vr4;
					while (vB5 < vC5) {
							var vA5 = vB5++;
							var c;
							c = this.vw2(v13 + vA5 * this.vo4);
							this.vy4[v13] = com.wiris.vS.max(this.vy4[v13], c.width);
							this.vz4[vA5] = com.wiris.vS.max(this.vz4[vA5], c.height - c.baseline);
							this.v05[vA5] = com.wiris.vS.max(this.v05[vA5], c.baseline);
						};
				};
				this.v15 = com.wiris.vS.max(this.v15, this.vy4[v13]);
			};
	}; {
		var vz2 = 0,
			v03 = this.vr4;
		while (vz2 < v03) {
				var vA5 = vz2++;
				this.vz4[vA5] += this.v05[vA5];
			};
	};
};
com.wiris.v8.prototype.v85 = function (vm2) {
	var i, vt2;
	this.v25 = new Array();
	this.v35 = new Array();
	this.v25[0] = this.vD5(vm2, 0) + this.v45; {
		var vz2 = 1,
			v03 = this.vo4;
		while (vz2 < v03) {
				var v13 = vz2++;
				this.v25[v13] = this.v25[v13 - 1] + this.vy4[v13 - 1] + this.vD5(vm2, v13);
			};
	};
	this.v25[this.vo4] = this.v25[this.vo4 - 1] + this.vy4[this.vo4 - 1];
	this.v35[0] = this.vE5(vm2, 0) + this.v45; {
		var vz2 = 1,
			v03 = this.vr4;
		while (vz2 < v03) {
				var vA5 = vz2++;
				this.v35[vA5] = this.v35[vA5 - 1] + this.vz4[vA5 - 1] + this.vE5(vm2, vA5);
			};
	};
	this.v35[this.vr4] = this.v35[this.vr4 - 1] + this.vz4[this.vr4 - 1]; {
		var vz2 = 0,
			v03 = this.vr4;
		while (vz2 < v03) {
				var vA5 = vz2++; {
					var vB5 = 0,
						vC5 = this.vo4;
					while (vB5 < vC5) {
							var v13 = vB5++;
							var c;
							c = this.vw2(v13 + vA5 * this.vo4);
							var vF5;
							if (this.vw4 == null || this.vw4.length == 0) vF5 = this.vs4;
							else {
								if (v13 < this.vw4.length) vF5 = this.vw4[v13];
								else vF5 = this.vw4[this.vw4.length - 1];
							};
							if (vF5 == com.wiris.v4.vG5) c.x = this.v25[v13] + Math.round(Math.floor((this.vy4[v13] - c.width) / 2.0));
							else if (vF5 == com.wiris.v4.vH5) c.x = this.v25[v13];
							else if (vF5 == com.wiris.v4.vI5) c.x = this.v25[v13] + (this.vy4[v13] - c.width);
							c.vK1 = this.v35[vA5] + this.v05[vA5] - c.baseline;
						};
				};
			};
	};
	this.width = this.v25[this.vo4] + this.vD5(vm2, this.vo4) + this.v45;
	this.height = this.v35[this.vr4] + this.vE5(vm2, this.vr4) + this.v45;
};
com.wiris.v8.prototype.v95 = function (vm2) {
	var vJ5;
	var vK5;
	var vL5;
	if (this.vu4 < 0 || this.vu4 >= this.vr4) {
		vJ5 = 0;
		vK5 = this.height;
		vL5 = Math.round(Math.floor(vK5 / 2.0));
	} else {
		vJ5 = this.v35[this.vu4];
		vK5 = this.vz4[this.vu4];
		vL5 = this.v05[this.vu4];
	};
	if (this.vt4 == com.wiris.v4.vM5) {
		this.baseline = vJ5 + Math.round(Math.floor(vK5 / 2.0)) + vm2.getMiddle();
	} else if (this.vt4 == com.wiris.v4.vN5) {
		this.baseline = vJ5 + vL5;
	} else if (this.vt4 == com.wiris.v4.vG5 || this.vt4 == com.wiris.v4.vO5) {
		this.baseline = vJ5 + Math.round(Math.floor(vK5 / 2.0)) + vm2.getMiddle();
	} else if (this.vt4 == com.wiris.v4.vP5) {
		this.baseline = vJ5;
	} else if (this.vt4 == com.wiris.v4.vQ5) {
		this.baseline = vJ5 + vK5 - 1;
	};
};
com.wiris.v8.prototype.vD5 = function (vm2, i) {
	if (i == 0 || i == this.vo4) return vm2.getLength(0.2);
	if (this.v55 != null && this.v55.length > 0) {
		var n = this.v55.length;
		var s;
		if (i - 1 >= n) {
			s = this.v55[n - 1];
		} else {
			s = this.v55[i - 1];
		};
		return com.wiris.v4.vy3(vm2, s);
	};
	return vm2.getLength(0.4);
};
com.wiris.v8.prototype.vE5 = function (vm2, i) {
	if (i == 0 || i == this.vr4) return vm2.getLength(0.25 / 2);
	if (this.v65 != null && this.v65.length > 0) {
		var n = this.v65.length;
		var s;
		if (i - 1 >= n) {
			s = this.v65[n - 1];
		} else {
			s = this.v65[i - 1];
		};
		return com.wiris.v4.vy3(vm2, s);
	};
	return vm2.getLength(0.5 / 2);
};
com.wiris.v8.prototype.v53 = function (s) {
	s.vS3(this, "mtable");
	this.vt4 = s.vR5("align", this.vt4, com.wiris.v4.vS5, com.wiris.v4.vM5);
	this.vo4 = s.vT5("#columnes", this.vo4, 0);
	this.vr4 = s.vT5("#files", this.vr4, 0);
	this.vs4 = com.wiris.v4.vG5;
	this.vx4 = null;
	this.vu4 = -1;
	if (s.vU5 == com.wiris.vX.vV5) {
		var i, vt2, k;
		k = 0; {
			var vz2 = 0,
				v03 = this.vr4;
			while (vz2 < v03) {
					var v13 = vz2++;
					s.vS3(this, "mtr"); {
						var vB5 = 0,
							vC5 = this.vo4;
						while (vB5 < vC5) {
								var vA5 = vB5++;
								s.vS3(this, "mtd");
								s.vW5(this.vw2(k++));
								s.vU3("mtd");
							};
					};
					s.vU3("mtr");
				};
		};
	} else if (s.vU5 == com.wiris.vX.vX5) {
		this.vr4 = 0;
		while (s.vY5(this, "mtr")) {
			this.vr4++;
			this.vo4 = 0;
			while (s.vY5(this, "mtd")) {
				this.vo4++;
				s.v63(this);
				s.vU3("mtd");
			};
			s.vU3("mtr");
		};
	};
	s.vU3("mtable");
};
com.wiris.v8.prototype.vB3 = function () {
	var vW3;
	vW3 = new com.wiris.v8();
	this.v83(vW3);
	return vW3;
};
com.wiris.v8.prototype.insertRow = function (i, n) {
	var vt2;
	this.vr4 += n; {
		var vz2 = 0,
			v03 = this.vo4 * n;
		while (vz2 < v03) {
				var vA5 = vz2++;
				this.vq2(i * this.vo4, new com.wiris.vP());
			};
	};
};
com.wiris.v8.prototype.insertColumn = function (vt2, n) {
	var i;
	var vZ5;
	this.vo4 += n; {
		var vz2 = 0,
			v03 = this.vr4;
		while (vz2 < v03) {
				var v13 = vz2++; {
					var vC5 = 0;
					while (vC5 < n) {
						var va5 = vC5++;
						this.vq2(v13 * this.vo4 + vt2 + va5, new com.wiris.vP());
					};
				};
			};
	};
};
com.wiris.v8.prototype.vb5 = function (i, n) {
	if (this.vr4 == 1) return;
	this.vr4 -= n;
	this["delete"](i * this.vo4, n * this.vo4);
};
com.wiris.v8.prototype.vc5 = function (vt2, m) {
	if (this.vo4 == 1) return;
	this.vo4 -= m;
	var i; {
		var vz2 = 0,
			v03 = this.vr4;
		while (vz2 < v03) {
				var v13 = vz2++;
				this["delete"](v13 * this.vo4 + vt2, m);
			};
	};
};
com.wiris.v8.prototype.vd5 = function (i, vt2) {
	return this.vw2(i * this.vo4 + vt2);
};
com.wiris.v8.prototype.vW4 = function () {
	return this.vy2() + 1;
};
com.wiris.v8.prototype.vd4 = function (ve4) {
	return ve4 + 1;
};
com.wiris.v8.prototype.vX4 = function (vY4, vd1, left, right) {
	return com.wiris.vU.ve5(this, vY4, vd1, 0, left, right);
};
com.wiris.v8.prototype.getSelectionRectangles = function (vY4, vd1) {
	var a = new Array();
	var vs2 = this.vf5(vY4, vd1);
	var vg5 = vs2[0];
	var vh5 = vs2[1];
	a.push(com.wiris.vp.vi5(vg5.x, vg5.vK1, vh5.x - vg5.x + vh5.width, vh5.vK1 - vg5.vK1 + vh5.height));
	return a;
};
com.wiris.v8.prototype.vj5 = function (n) {
	var c = new Array();
	c[0] = n % this.vo4;
	c[1] = (function (vH4) {
		var vI4;
		var vm4 = Math.floor(n / (function (vH4) {
			var vI4;
			var vm4 = vH4.vo4;
			if (Std["is"](vm4, Float)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(vH4)));
		if (Std["is"](vm4, Int)) vm4;
		else throw "Class cast error";
		vI4 = vm4;
		return vI4;
	}(this));
	return c;
};
com.wiris.v8.prototype.vk5 = function (vY4, vd1) {
	var vg5;
	var r = new Array();
	if (vd1 > this.vy2()) {
		return r;
	};
	if (vY4 < this.vy2()) {
		vg5 = this.vw2(vY4);
	} else {
		vg5 = this.vw2(vY4 - 1);
	};
	var vh5;
	if (vd1 > 0) {
		vh5 = this.vw2(vd1 - 1);
	} else {
		vh5 = this.vw2(vd1);
	};
	r[0] = vg5;
	r[1] = vh5;
	return r;
};
com.wiris.v8.prototype.vf5 = function (vY4, vd1) {
	var r = this.vk5(vY4, vd1);
	if (r.length < 2) {
		return r;
	};
	var vl5 = this.vj5(r[0].vh2);
	var vm5 = this.vj5(r[1].vh2);
	if (vl5[0] > vm5[0]) {
		r[0] = this.vd5(vl5[1], vm5[0]);
		r[1] = this.vd5(vm5[1], vl5[0]);
	};
	return r;
};
com.wiris.v8.prototype.vn5 = function (vY4, vd1) {
	var vo5 = this.vf5(vY4, vd1);
	var vl5 = this.vj5(vo5[0].vh2);
	var vm5 = this.vj5(vo5[1].vh2);
	var vl4 = new com.wiris.v8();
	com.wiris.vm.vp5(vl4);
	vl4.vr4 = vm5[1] - vl5[1] + 1;
	vl4.vo4 = vm5[0] - vl5[0] + 1;
	var i;
	var vt2; {
		var vz2 = 0,
			v03 = vl4.vr4;
		while (vz2 < v03) {
				var vA5 = vz2++; {
					var vB5 = 0,
						vC5 = vl4.vo4;
					while (vB5 < vC5) {
							var v13 = vB5++;
							var b = this.vd5(vA5 + vl5[1], v13 + vl5[0]);
							vl4.vx2(b.vB3());
						};
				};
			};
	};
	com.wiris.vm.vA3(this, vl4);
	return vl4;
};
com.wiris.v8.prototype.vq5 = function (vY4, vd1, vU5, vr5) {
	var vo5 = this.vf5(vY4, vd1);
	var vl5 = this.vj5(vo5[0].vh2);
	var vm5 = this.vj5(vo5[1].vh2);
	var n = vm5[0] - vl5[0] + 1;
	var m = vm5[1] - vl5[1] + 1;
	var empty = this.vs5(vl5, vm5);
	if (empty || vU5 != 0) {
		if (vU5 != 2 && vl5[1] == 0 && vm5[1] == this.vr4 - 1) {
			if (vr5) {
				return -1;
			};
			this.vc5(vl5[0], n);
			return -2;
		};
		if (vU5 != 1 && vl5[0] == 0 && vm5[0] == this.vo4 - 1) {
			if (vr5) {
				return -1;
			};
			this.vb5(vl5[1], m);
			return -3;
		};
	};
	if (empty) return -1;
	var i;
	var vt2; {
		var v03 = 0;
		while (v03 < n) {
			var v13 = v03++; {
				var vz2 = 0;
				while (vz2 < m) {
					var vA5 = vz2++;
					var b = this.vd5(vA5 + vl5[1], v13 + vl5[0]);
					this.replace(b.vh2, new com.wiris.vP());
				};
			};
		};
	};
	return vd1;
};
com.wiris.v8.prototype.vt5 = function (vY4, vd1, vU5, b) {
	if (vU5 == 1) {
		if (b.vr4 == this.vr4) {
			this.insertColumn(vY4, b.vo4);
			vd1 = this.vo4 * (this.vr4 - 1) + vY4 + b.vo4;
		};
	};
	if (vU5 == 2) {
		if (b.vo4 == this.vo4) {
			var vK1 = (function (vH4) {
				var vI4;
				var vm4 = Math.floor(vd1 / (function (vH4) {
					var vI4;
					var vm4 = b.vo4;
					if (Std["is"](vm4, Float)) vm4;
					else throw "Class cast error";
					vI4 = vm4;
					return vI4;
				}(vH4)));
				if (Std["is"](vm4, Int)) vm4;
				else throw "Class cast error";
				vI4 = vm4;
				return vI4;
			}(this));
			this.insertRow(vK1, b.vr4);
			vd1 = this.vo4 * (vK1 + b.vr4);
		};
	};
	var vo5 = this.vf5(vY4, vd1);
	var vl5 = this.vj5(vo5[0].vh2);
	var i;
	var vt2;
	var v13;
	var vA5; {
		var vz2 = 0,
			v03 = b.vo4;
		while (vz2 < v03) {
				var vu5 = vz2++; {
					var vB5 = 0,
						vC5 = b.vr4;
					while (vB5 < vC5) {
							var vv5 = vB5++;
							var c = b.vd5(vv5, vu5);
							v13 = vu5 + vl5[0];
							vA5 = vv5 + vl5[1];
							if (v13 < this.vo4 && vA5 < this.vr4) {
								this.replace(vA5 * this.vo4 + v13, c);
							};
						};
				};
			};
	};
	return vd1;
};
com.wiris.v8.prototype.vs5 = function (vl5, vm5) {
	var n = vm5[0] - vl5[0] + 1;
	var m = vm5[1] - vl5[1] + 1;
	var i;
	var vt2; {
		var v03 = 0;
		while (v03 < n) {
			var v13 = v03++; {
				var vz2 = 0;
				while (vz2 < m) {
					var vA5 = vz2++;
					var b = this.vd5(vA5 + vl5[1], v13 + vl5[0]);
					if (Std["is"](b, com.wiris.vP) && b.vy2() != 0) {
						return false;
					};
				};
			};
		};
	};
	return true;
};
com.wiris.v8.prototype.vw5 = function (i, n) {
	var vY4;
	var vd1;
	vY4 = i * this.vo4;
	vd1 = vY4 + n * this.vo4;
	return com.wiris.vU.ve5(this, vY4, vd1, 2, null, null);
};
com.wiris.v8.prototype.vx5 = function (vt2, m) {
	var vY4;
	var vd1;
	vY4 = vt2;
	if (m > 0) vd1 = this.vo4 * (this.vr4 - 1) + vt2 + m;
	else vd1 = vY4;
	return com.wiris.vU.ve5(this, vY4, vd1, 1, null, null);
};
com.wiris.v8.prototype.vu2 = function (rows, vy5) {
	var vl4 = new com.wiris.v8();
	com.wiris.vm.vp5(vl4);
	vl4.vr4 = rows;
	vl4.vo4 = vy5;
	var i;
	var vt2; {
		var vz2 = 0,
			v03 = vl4.vo4 * vl4.vr4;
		while (vz2 < v03) {
				var v13 = vz2++;
				vl4.vx2(new com.wiris.vP());
			};
	};
	return vl4;
};
com.wiris.v8.prototype.vK3 = function (pos) {
	return this.vy4[pos % this.vo4];
};
com.wiris.v8.prototype.__class__ = com.wiris.v8;
com.wiris.v9 = function (copy) {
	if (copy === v91) return; {
		if (copy == null) {
			this.form = 0;
			this.vz5 = false;
			this.v06 = false;
			this.largeop = false;
			this.v16 = 0;
			this.v26 = false;
			this.v36 = false;
			this.v46 = false;
			this.v56 = true;
			this.lspace = com.wiris.v9.v66;
			this.rspace = com.wiris.v9.v66;
		} else {
			this.form = copy.form;
			this.vz5 = copy.vz5;
			this.v06 = copy.v06;
			this.largeop = copy.largeop;
			this.v16 = copy.v16;
			this.v26 = copy.v26;
			this.v36 = copy.v36;
			this.v46 = copy.v46;
			this.v56 = copy.v56;
			this.lspace = copy.lspace;
			this.rspace = copy.rspace;
		};
	}
};
com.wiris.v9.__name__ = ["com", "wiris", "v9"];
com.wiris.v9.prototype.form = null;
com.wiris.v9.prototype.vz5 = null;
com.wiris.v9.prototype.v06 = null;
com.wiris.v9.prototype.largeop = null;
com.wiris.v9.prototype.v16 = null;
com.wiris.v9.prototype.v26 = null;
com.wiris.v9.prototype.v36 = null;
com.wiris.v9.prototype.v46 = null;
com.wiris.v9.prototype.v56 = null;
com.wiris.v9.prototype.lspace = null;
com.wiris.v9.prototype.rspace = null;
com.wiris.v9.prototype.v76 = function () {
	return this.v86(this.lspace);
};
com.wiris.v9.prototype.v96 = function () {
	return this.v86(this.rspace);
};
com.wiris.v9.prototype.v86 = function (vA6) {
	switch (vA6) {
	case com.wiris.v9.vB6:
		{
			return com.wiris.v9.vC6;
		}
		break;
	case com.wiris.v9.vD6:
		{
			return com.wiris.v9.vE6;
		}
		break;
	case com.wiris.v9.vF6:
		{
			return com.wiris.v9.vG6;
		}
		break;
	case com.wiris.v9.vH6:
		{
			return com.wiris.v9.vI6;
		}
		break;
	case com.wiris.v9.v66:
		{
			return com.wiris.v9.vJ6;
		}
		break;
	case com.wiris.v9.vK6:
		{
			return com.wiris.v9.vL6;
		}
		break;
	case com.wiris.v9.vM6:
		{
			return com.wiris.v9.vN6;
		}
		break;
	default:
		{
			return "0";
		}
		break;
	};
};
com.wiris.v9.prototype.vO6 = function (vA6) {
	if (vA6 == com.wiris.v9.vC6) return com.wiris.v9.vB6;
	if (vA6 == com.wiris.v9.vE6) return com.wiris.v9.vD6;
	if (vA6 == com.wiris.v9.vG6) return com.wiris.v9.vF6;
	if (vA6 == com.wiris.v9.vI6) return com.wiris.v9.vH6;
	if (vA6 == com.wiris.v9.vJ6) return com.wiris.v9.v66;
	if (vA6 == com.wiris.v9.vL6) return com.wiris.v9.vK6;
	if (vA6 == com.wiris.v9.vN6) return com.wiris.v9.vM6;
	return 0;
};
com.wiris.v9.prototype.vP6 = function (lspace) {
	this.lspace = this.vO6(lspace);
};
com.wiris.v9.prototype.vQ6 = function (rspace) {
	this.rspace = this.vO6(rspace);
};
com.wiris.v9.prototype.merge = function (vR6, vS6) {
	if (vR6.form != vS6.form) this.form = vS6.form;
	if (vR6.vz5 != vS6.vz5) this.vz5 = vS6.vz5;
	if (vR6.v06 != vS6.v06) this.v06 = vS6.v06;
	if (vR6.largeop != vS6.largeop) this.largeop = vS6.largeop;
	if (vR6.v16 != vS6.v16) this.v16 = vS6.v16;
	if (vR6.v26 != vS6.v26) this.v26 = vS6.v26;
	if (vR6.v36 != vS6.v36) this.v36 = vS6.v36;
	if (vR6.v46 != vS6.v46) this.v46 = vS6.v46;
	if (vR6.v56 != vS6.v56) this.v56 = vS6.v56;
	if (vR6.lspace != vS6.lspace) this.lspace = vS6.lspace;
	if (vR6.rspace != vS6.rspace) this.rspace = vS6.rspace;
};
com.wiris.v9.prototype.__class__ = com.wiris.v9;
if (!com.wiris.system) com.wiris.system = {};
com.wiris.vA = function () {};
com.wiris.vA.__name__ = ["com", "wiris", "vA"];
com.wiris.vA.prototype.serviceAnswerReceived = null;
com.wiris.vA.prototype.__class__ = com.wiris.vA;
com.wiris.vB = function (layout, vT6, rows) {
	if (layout === v91) return; {
		this.vU6 = new Array();
		this.vT6 = vT6;
		this.layout = layout;
		this.vV6 = new Array();
		this.rows = rows;
	}
};
com.wiris.vB.__name__ = ["com", "wiris", "vB"];
com.wiris.vB.prototype.vU6 = null;
com.wiris.vB.prototype.vT6 = null;
com.wiris.vB.prototype.vV6 = null;
com.wiris.vB.prototype.layout = null;
com.wiris.vB.prototype.rows = null;
com.wiris.vB.prototype.vW6 = function (vX6, extra) {
	if (extra) {
		this.vU6.push(vX6);
	} else {
		this.vV6.push(vX6);
	};
};
com.wiris.vB.prototype.vY6 = function (vZ6, extra) {
	if (extra) {
		return this.vU6[vZ6];
	};
	return this.vV6[vZ6];
};
com.wiris.vB.prototype.va6 = function (extra) {
	if (extra) {
		return this.vU6.length;
	};
	return this.vV6.length;
};
com.wiris.vB.prototype.__class__ = com.wiris.vB;
com.wiris.vC = function () {};
com.wiris.vC.__name__ = ["com", "wiris", "vC"];
com.wiris.vC.prototype.vb6 = null;
com.wiris.vC.prototype.vc6 = null;
com.wiris.vC.prototype.vd6 = null;
com.wiris.vC.prototype.ve6 = null;
com.wiris.vC.prototype.vf6 = null;
com.wiris.vC.prototype.__class__ = com.wiris.vC;
com.wiris.vD = function (p) {
	if (p === v91) return; {
		com.wiris.vD.vA1();
		this.vg6 = "";
	}
};
com.wiris.vD.__name__ = ["com", "wiris", "vD"];
com.wiris.vD.vh6 = null;
com.wiris.vD.vA1 = function () {
	if (com.wiris.vD.vh6 == null) {
		com.wiris.vD.vh6 = new Hash();
	};
};
com.wiris.vD.newInstance = function (vg6) {
	var resourceLoader = new com.wiris.vD();
	if (vg6.length > 0 && !StringTools.endsWith(vg6, "/")) {
		vg6 += "/";
	};
	resourceLoader.vg6 = vg6;
	return resourceLoader;
};
com.wiris.vD.prototype.vg6 = null;
com.wiris.vD.prototype.vT1 = function (path) {
	var vi6 = this.vj6(path);
	if (vi6 != null) {
		return vi6;
	};
	path = this.vQ1(path);
	var content = com.wiris.vD.vh6.get(path);
	if (content != null) {
		return content;
	};
	try {
		content = haxe.Http.requestUrl(path);
		com.wiris.vD.vh6.set(path, content);
		return content;
	} catch (vJ4) {
		{
			var e = vJ4; {
				return null;
			};
		};
	};
};
com.wiris.vD.prototype.vj6 = function (path) {
	if (path == "editor_definition.xml") {
		return com.wiris.vD.vk6;
	};
	if (path == "characters.xml") {
		return com.wiris.vD.vl6;
	};
	if (path == "lang/en.xml") {
		return com.wiris.vD.vm6;
	};
	if (path == "lang/es.xml") {
		return com.wiris.vD.vn6;
	};
	return null;
};
com.wiris.vD.prototype.vQ1 = function (path) {
	if (StringTools.startsWith(path, "http://") || StringTools.startsWith(path, "https://")) {
		return path;
	};
	return this.vg6 + path;
};
com.wiris.vD.prototype.__class__ = com.wiris.vD;
com.wiris.vE = function () {};
com.wiris.vE.__name__ = ["com", "wiris", "vE"];
com.wiris.vE.prototype.vo6 = null;
com.wiris.vE.prototype.getDefaultStyles = null;
com.wiris.vE.prototype.setDefaultStyles = null;
com.wiris.vE.prototype.getDesiredDefaultStyles = null;
com.wiris.vE.prototype.__class__ = com.wiris.vE;
com.wiris.vF = function (p) {
	if (p === v91) return; {
		var s;
		s = new com.wiris.vX();
		s.vp6(com.wiris.vX.vq6);
		new com.wiris.vY().v53(s);
		new com.wiris.vR().v53(s);
		new com.wiris.vP().v53(s);
		new com.wiris.vw().v53(s);
		new com.wiris.v3().v53(s);
		new com.wiris.vl().v53(s);
		new com.wiris.v2().v53(s);
		new com.wiris.v8().v53(s);
		new com.wiris.v5().v53(s);
		new com.wiris.vL().v53(s);
		this.vr6 = new com.wiris.vc();
		this.vs6 = new com.wiris.vy();
		this.vs6.vt6(100);
		this.vu6 = new com.wiris.vy();
		this.vu6.vt6(100);
		this.vu6.setFontSize(16);
		this.vu6.setColor(0);
		this.vu6.setFontFamily("SansSerif");
		this.vu6.vv6(com.wiris.vy.vU2, false);
		this.vu6.vv6(com.wiris.vy.vV2, false);
		this.vu6.vw6(true);
		this.reset();
	}
};
com.wiris.vF.__name__ = ["com", "wiris", "vF"];
com.wiris.vF.prototype.box = null;
com.wiris.vF.prototype.vx6 = null;
com.wiris.vF.prototype.vy6 = null;
com.wiris.vF.prototype.vz6 = null;
com.wiris.vF.prototype.v07 = null;
com.wiris.vF.prototype.v17 = null;
com.wiris.vF.prototype.v27 = null;
com.wiris.vF.prototype.v37 = null;
com.wiris.vF.prototype.v47 = null;
com.wiris.vF.prototype.contentChanged = null;
com.wiris.vF.prototype.caretPositionChanged = null;
com.wiris.vF.prototype.clipboardChanged = null;
com.wiris.vF.prototype.styleChanged = null;
com.wiris.vF.prototype.vr6 = null;
com.wiris.vF.prototype.vs6 = null;
com.wiris.vF.prototype.vu6 = null;
com.wiris.vF.prototype.v57 = null;
com.wiris.vF.prototype.v67 = null;
com.wiris.vF.prototype.v77 = function (b, vm2) {
	var n;
	var i;
	var vE3;
	n = b.vy2();
	vm2.beginTranslate(b.x, b.vK1, b.width, b.height);
	vm2.setStyle(b.vi2);
	b.vp2(vm2); {
		var v03 = 0;
		while (v03 < n) {
			var v13 = v03++;
			vE3 = b.vw2(v13);
			this.v77(vE3, vm2);
		};
	};
	vm2.endTranslate(b.x, b.vK1, b.width, b.height);
};
com.wiris.vF.prototype.v87 = function (b, vm2) {
	this.v97(b);
	this.vA7(b, vm2);
	this.vB7();
	this.vC7();
};
com.wiris.vF.prototype.paint = function (vu3) {
	vu3.setStyle(this.getDefaultStyles());
	this.v77(this.vD7(), vu3);
};
com.wiris.vF.prototype.recalc = function (vu3) {
	vu3.setStyle(this.getDefaultStyles());
	this.v87(this.vD7(), vu3);
};
com.wiris.vF.prototype.vA7 = function (b, vm2) {
	var n;
	var i;
	var vE3;
	n = b.vy2();
	if (!b.vg2) {
		b.vg2 = true; {
			var v03 = 0;
			while (v03 < n) {
				var v13 = v03++;
				vE3 = b.vw2(v13);
				this.vA7(vE3, vm2);
			};
		};
		vm2.setStyle(b.vi2);
		b.vl2(vm2);
		var vE7 = false; {
			var v03 = 0;
			while (v03 < n) {
				var v13 = v03++;
				vE3 = b.vw2(v13);
				if (vE3.vn2(vm2)) {
					vE7 = true;
				};
			};
		};
		if (vE7) b.vl2(vm2);
	};
};
com.wiris.vF.prototype.v97 = function (b) {
	var n;
	var i;
	var vE3;
	if (b.vg2) return;
	b.vi2 = this.vF7(b.vd2, b, b.getParent());
	n = b.vy2(); {
		var v03 = 0;
		while (v03 < n) {
			var v13 = v03++;
			vE3 = b.vw2(v13);
			this.v97(vE3);
		};
	};
};
com.wiris.vF.prototype.vF7 = function (vd2, b, parent) {
	var vi2 = vd2.vG7();
	var vH7 = this.vo6(b);
	vi2 = com.wiris.vy.join(vH7, vi2);
	var vI7;
	if (parent != null) {
		vI7 = parent.vi2.getScriptLevel();
	} else {
		vI7 = 0;
	};
	vi2.vJ7(vi2.getScriptLevel() + vI7);
	var n;
	var vK7;
	n = vi2.getScriptLevel();
	vK7 = n > 0;
	if (!vK7) n = -n;
	var vL7 = 1;
	if (n == 1) vL7 = 0.75;
	else if (n == 2) vL7 = 0.625;
	else if (n >= 3) vL7 = 0.5;
	vi2.vt6(vi2.getP() * vL7);
	return vi2;
};
com.wiris.vF.prototype.vD7 = function () {
	return this.box;
};
com.wiris.vF.prototype.vM7 = function (b) {
	this.vN7();
	if (!Std["is"](b, com.wiris.vw)) {
		var vO7;
		vO7 = new com.wiris.vw();
		vO7.vq2(0, b);
		this.vM7(vO7);
	} else {
		this.box = b;
	};
	this.vP7(this.box);
	this.vQ7();
};
com.wiris.vF.prototype.vP7 = function (b) {
	var n;
	var i;
	var vE3;
	if (b.vk2) return;
	b.vk2 = true;
	var parent = b.getParent();
	if (parent != null) {
		b.vd2 = com.wiris.vy.join(parent.vd2, b.vd2);
	};
	b.vo2();
	n = b.vy2(); {
		var v03 = 0;
		while (v03 < n) {
			var v13 = v03++;
			vE3 = b.vw2(v13);
			this.vP7(vE3);
		};
	};
};
com.wiris.vF.prototype.getWidth = function () {
	this.vC7();
	return this.box.width;
};
com.wiris.vF.prototype.getHeight = function () {
	this.vC7();
	return this.box.height;
};
com.wiris.vF.prototype.getBaseline = function () {
	this.vC7();
	return this.box.baseline;
};
com.wiris.vF.prototype.getCaret = function () {
	return this.vx6;
};
com.wiris.vF.prototype.getCaretLength = function () {
	return this.vy6;
};
com.wiris.vF.prototype.setCaret = function (vx6, length) {
	this.vR7(vx6, length, 0);
};
com.wiris.vF.prototype.vR7 = function (vx6, length, vU5) {
	this.vx6 = vx6;
	this.vy6 = length;
	this.vz6 = vU5;
	this.vS7();
};
com.wiris.vF.prototype.vT7 = function (pos, shift) {
	if (pos == 0) return;
	if (!shift) {
		var n = com.wiris.vm.vU7(this.box);
		var vg4 = pos >= 0 ? 1 : -1;
		var vV7 = this.vx6 + pos;
		vV7 = com.wiris.vS.min(com.wiris.vS.max(vV7, 0), n - 1);
		var vW7 = false;
		while (!this.vX7(vV7, 0).vY7()) {
			vV7 += vg4;
			if (vV7 < 0 || vV7 >= n) {
				if (vW7) {
					vV7 = this.vx6;
					break;
				} else {
					vg4 = -vg4;
					vV7 = this.vx6 + pos;
					vV7 = com.wiris.vS.min(com.wiris.vS.max(vV7, 0), n - 1);
					vW7 = true;
				};
			};
		};
		this.setCaret(vV7, 0);
		return;
	} else {
		var n = com.wiris.vm.vU7(this.box);
		var s = this.vX4();
		var vZ7 = s.va7() - s.vb7();
		var vl5 = -1;
		var vY4 = this.vx6;
		var vd1 = this.vx6 + this.vy6;
		var vc7 = vY4;
		var vd7 = false;
		var ve7 = false;
		var vf7 = false;
		do {
			vY4 += pos;
			if (vY4 < 0 || vY4 >= n) break;
			s = this.vX7(vY4, vd1 - vY4);
			var c = s.va7() - s.vb7();
			if (!ve7 && c != vZ7) {
				ve7 = true;
				vl5 = c;
			};
			if (ve7 && c != vl5) {
				vf7 = true;
			};
			if (ve7 && !vf7) {
				if (this.vY7(vY4, false)) {
					this.setCaret(vY4, vd1 - vY4);
					vd7 = true;
				};
				vc7 = vY4;
			};
		} while (!vf7);
		if (!vd7) {
			this.setCaret(vc7, vd1 - vc7);
		};
	};
};
com.wiris.vF.prototype.vY7 = function (vY4, va4) {
	var vj4 = com.wiris.vm.vk4(this.box, vY4);
	return vj4.b.vZ4(vj4.x, va4);
};
com.wiris.vF.prototype.selectWord = function (position) {
	var vg7 = this.vh7(position);
};
com.wiris.vF.prototype.vh7 = function (position) {
	var va4 = this.vX7(position, 0);
	return va4.vD7();
};
com.wiris.vF.prototype.vi7 = function () {
	if (this.vy6 != 0) {
		return null;
	};
	return this.vh7(this.vx6);
};
com.wiris.vF.prototype.vX7 = function (vj7, length) {
	if (length > 0) return com.wiris.vm.select(this.box, vj7, length);
	else return com.wiris.vm.select(this.box, vj7 + length, -length);
};
com.wiris.vF.prototype.vX4 = function () {
	var s = this.vX7(this.vx6, this.vy6);
	s.vp6(this.vz6);
	return s;
};
com.wiris.vF.prototype.vk7 = function (s) {
	var vY4 = s.vb7();
	this.vR7(vY4, s.va7() - vY4, s.vl7());
};
com.wiris.vF.prototype.vm7 = function (n) {
	var s;
	s = this.vX7(n, 0);
	this.vC7();
	if (s.vY7()) return s.vn7()[0];
	else return null;
};
com.wiris.vF.prototype.getCaretRectangle = function () {
	return this.vm7(this.vx6);
};
com.wiris.vF.prototype.getSelectionRectangles = function () {
	if (this.vy6 == 0) return null;
	var s;
	s = this.vX4();
	this.vC7();
	return s.vn7();
};
com.wiris.vF.prototype.vq2 = function (box, vo7, vp7) {
	this.vq7();
	this.vr7(box, vo7, vp7, this.getCurrentStyles(), null);
	this.vs7();
};
com.wiris.vF.prototype.vr7 = function (box, vo7, vp7, vd2, vt7) {
	var vu7 = null;
	var vv7;
	if (vo7 == com.wiris.vF.vw7) {
		vv7 = this.vy6 < 0;
	} else {
		vv7 = vp7 <= 0;
	};
	vu7 = this.vx7(true);
	if (box != null) {
		this.vy7(box, vv7, vd2, vo7);
	};
	if (vp7 > 0) {
		this.vT7(vp7, false);
	};
	if (vu7 != null && (vo7 == com.wiris.vF.vw7 || com.wiris.vm.vU7(box) >= 1 && vo7 == com.wiris.vF.vz7)) {
		this.vy7(vu7, vv7, vt7, vo7);
	};
};
com.wiris.vF.prototype.vy7 = function (box, vv7, vd2, vo7) {
	var v08;
	var s;
	var v18, v28, v38;
	v08 = new com.wiris.v41();
	s = this.vX4();
	v18 = s.vb7();
	s = v08.vq2(s, this.vD7(), box.vB3(), vd2, vo7);
	if (s == null) return;
	v28 = s.vb7();
	v38 = s.va7();
	v08.v48(this.vD7(), v28, v38, com.wiris.vF.vz7);
	if (vo7 != com.wiris.vF.vw7 && !s.v58()) {
		if (vv7) {
			this.setCaret(v38, 0);
		} else {
			this.setCaret(v28, 0);
		};
	} else {
		if (vv7) this.setCaret(v38, v28 - v38);
		else this.setCaret(v28, v38 - v28);
	};
	this.v68(v28, v38, s.vl7());
	this.vP7(s.vD7());
	this.vQ7();
};
com.wiris.vF.prototype.v78 = function () {
	this.vq7();
	var b;
	b = this.vx7(false);
	if (b != null) {
		var s = this.vX4();
		var v88 = s.vb7();
		var v98 = s.va7();
		if (!s.v58()) {
			this.setCaret(v88, 0);
		} else {
			if (v98 - v88 == 0 && !s.vY7()) {
				this.setCaret(v88, 0);
				this.vT7(1, false);
			} else {
				this.setCaret(v88, v98 - v88);
			};
		};
	};
	this.vs7();
	return b;
};
com.wiris.vF.prototype.vx7 = function (vr5) {
	var s;
	var b;
	s = this.vX4();
	b = s.vn5();
	if (s.vb7() == s.va7()) return null;
	if (!s.v78(vr5)) return null;
	var v88 = s.vb7();
	var v98 = s.va7();
	new com.wiris.v41().v48(this.vD7(), v88, v98, com.wiris.vF.vA8);
	this.setCaret(v88, v98 - v88);
	this.vB8(v88, v98, s.vl7(), b);
	this.vP7(this.box);
	this.vQ7();
	return b;
};
com.wiris.vF.prototype.vC8 = function (vD8) {
	var vE8 = this.vF8();
	if (vE8.length > this.v27) {
		var last = vE8.pop();
		this.vC8(com.wiris.vJ.vG8(last, vD8));
	} else {
		this.vF8().push(vD8);
	};
};
com.wiris.vF.prototype.v68 = function (i, vt2, vU5) {
	this.vC8(com.wiris.vJ.vH8(i, vt2, vU5));
};
com.wiris.vF.prototype.vB8 = function (i, vt2, vU5, b) {
	this.vC8(com.wiris.vJ.vI8(i, vt2, vU5, b));
};
com.wiris.vF.prototype.vJ8 = function () {
	this.v27 = this.vF8().length;
};
com.wiris.vF.prototype.vF8 = function () {
	if (this.v37 == com.wiris.editor.formula.UndoState.UNDO_NORMAL) this.v17 = new Array();
	if (this.v37 == com.wiris.editor.formula.UndoState.UNDO_UNDO) return this.v17;
	return this.v07;
};
com.wiris.vF.prototype.undo = function () {
	if (this.v07.length == 0) return;
	var vD8 = this.v07.pop();
	this.v37 = com.wiris.editor.formula.UndoState.UNDO_UNDO;
	this.vq7();
	vD8.vK8(this);
	this.vs7();
	this.v37 = com.wiris.editor.formula.UndoState.UNDO_NORMAL;
};
com.wiris.vF.prototype.redo = function () {
	if (this.v17.length == 0) return;
	var vD8 = this.v17.pop();
	this.v37 = com.wiris.editor.formula.UndoState.UNDO_REDO;
	this.vq7();
	vD8.vK8(this);
	this.vs7();
	this.v37 = com.wiris.editor.formula.UndoState.UNDO_NORMAL;
};
com.wiris.vF.prototype.copy = function () {
	if (this.vy6 == 0) {
		return;
	};
	this.v47 = this.vX4().vn5();
	this.vL8();
};
com.wiris.vF.prototype.paste = function () {
	if (this.v47 != null) this.vq2(this.v47.vB3(), com.wiris.vF.vM8, 0);
};
com.wiris.vF.prototype.cut = function () {
	this.copy();
	this.v78();
};
com.wiris.vF.prototype.vN8 = function (shift) {
	if (shift) {
		this.setCaret(0, this.vx6 + this.vy6);
	} else {
		this.setCaret(0, 0);
	};
};
com.wiris.vF.prototype.vO8 = function (shift) {
	var vP8 = com.wiris.vm.vU7(this.box) - 1;
	if (shift) {
		this.setCaret(vP8, this.vx6 + this.vy6 - vP8);
	} else {
		this.setCaret(vP8, 0);
	};
};
com.wiris.vF.prototype["delete"] = function (x) {
	if (this.vy6 != 0) {
		this.v78();
	} else {
		var vQ8 = this.vx6;
		this.vT7(x, true);
		if (vQ8 == this.vx6) {
			return;
		};
		this.setCaret(this.vx6 + this.vy6, -this.vy6);
		var va4 = this.vX4();
		if (va4.va7() - va4.vb7() != 1) {
			return;
		};
		this.v78();
	};
};
com.wiris.vF.prototype.vR8 = function (x, vK1) {
	this.vC7();
	var p = com.wiris.vm.getPositionFromPoint(this.box, false, com.wiris.vg.vS8(x, vK1));
	this.setCaret(p, 0);
};
com.wiris.vF.prototype.getPositionFromPoint = function (x, vK1) {
	this.vC7();
	var p = com.wiris.vm.getPositionFromPoint(this.box, false, com.wiris.vg.vS8(x, vK1));
	return p;
};
com.wiris.vF.prototype.vT8 = function (vU8, shift) {
	this.vC7();
	var p = com.wiris.vm.vT8(this.box, this.vx6, vU8, false);
	if (p >= 0) {
		if (shift) {
			var vd1 = this.vx6 + this.vy6;
			this.setCaret(p, vd1 - p);
		} else {
			this.setCaret(p, 0);
		};
	};
};
com.wiris.vF.prototype.vV8 = function (b) {
	var s = new com.wiris.vX();
	s.vW8(this);
	s.vp6(com.wiris.vX.vV5);
	var xml = s.vX8(b);
	xml = this.vr6.formulaToStandard(xml);
	return xml;
};
com.wiris.vF.prototype.vY8 = function (xml) {
	var s = new com.wiris.vX();
	s.vW8(this);
	s.vp6(com.wiris.vX.vX5);
	xml = this.vr6.standardToFormula(xml);
	var b = s.vZ8(xml);
	return b;
};
com.wiris.vF.prototype.va8 = function () {
	return this.vV8(this.vD7());
};
com.wiris.vF.prototype.vb8 = function (xml) {
	var b = this.vY8(xml);
	this.vM7(b);
	this.vO8(false);
};
com.wiris.vF.prototype.vc8 = function (vd8) {
	if (vd8 == " ") {
		vd8 = String.fromCharCode(160);
	};
	var ve8 = new com.wiris.vR();
	ve8.vf8(vd8);
	com.wiris.vm.vp5(ve8);
	this.vq2(ve8, com.wiris.vF.vz7, 1);
};
com.wiris.vF.prototype.insertText = function (text) {
	var vg8 = text.length;
	var i; {
		var v03 = 0;
		while (v03 < vg8) {
			var v13 = v03++;
			this.vc8("" + text.charAt(v13));
		};
	};
};
com.wiris.vF.prototype.vh8 = function (xml, vp7) {
	this.vq2(this.vY8(xml), com.wiris.vF.vz7, vp7);
};
com.wiris.vF.prototype.insertMathML = function (vi8, vp7) {
	this.vh8(com.wiris.v21.vj8(vi8), vp7);
};
com.wiris.vF.prototype.vo6 = function (b) {
	var tag = com.wiris.vm.vk8(b);
	var s = this.vs6.vG7();
	if (tag == "sub" || tag == "sup" || tag == "subsup") s.vJ7(1);
	if (tag == "mi") {
		s.vv6(com.wiris.vy.vU2, true);
		s.vv6(com.wiris.vy.vV2, false);
	} else {
		s.vv6(com.wiris.vy.vU2, false);
		s.vv6(com.wiris.vy.vV2, false);
	};
	var box = b.getParent();
	if (box != null) {
		var script = false;
		tag = com.wiris.vm.vk8(box);
		if (tag == "munder") {
			script = b.vh2 == 1;
		};
		if (tag == "mover") {
			script = b.vh2 == 0;
		};
		if (tag == "munderover") {
			script = b.vh2 == 0 || b.vh2 == 2;
		};
		if (tag == "mroot") {
			script = b.vh2 == 0;
		};
		if (tag == "mfrac") {
			if (box.vi2 != null) {
				script = !box.vi2.getDisplayStyle();
				if (!script) s.vw6(false);
			};
		};
		if (script) s.vJ7(1);
	};
	return s;
};
com.wiris.vF.prototype.vq7 = function () {
	this.vJ8();
};
com.wiris.vF.prototype.vs7 = function () {
	null;
};
com.wiris.vF.prototype.vl8 = function (style) {
	this.vq7();
	this.vr7(null, com.wiris.vF.vw7, 0, null, style);
	this.vs7();
};
com.wiris.vF.prototype.vS7 = function () {
	this.caretPositionChanged = true;
	this.v57 = null;
	this.v67 = null;
};
com.wiris.vF.prototype.vQ7 = function () {
	this.contentChanged = true;
};
com.wiris.vF.prototype.vL8 = function () {
	this.clipboardChanged = true;
};
com.wiris.vF.prototype.vm8 = function () {
	this.styleChanged = true;
};
com.wiris.vF.prototype.vn8 = function () {
	this.contentChanged = false;
	this.caretPositionChanged = false;
	this.clipboardChanged = false;
	this.styleChanged = false;
};
com.wiris.vF.prototype.vo8 = function () {
	return this.contentChanged;
};
com.wiris.vF.prototype.vp8 = function () {
	return this.caretPositionChanged;
};
com.wiris.vF.prototype.vq8 = function () {
	return this.clipboardChanged;
};
com.wiris.vF.prototype.vr8 = function () {
	return this.styleChanged;
};
com.wiris.vF.prototype.handleKeyEvent = function (keyCode, shiftKey, ctrlKey) {
	var vs8 = true;
	if (keyCode == 39) {
		this.vT7(1, shiftKey);
	} else if (keyCode == 37) {
		this.vT7(-1, shiftKey);
	} else if (keyCode == 38) {
		this.vT8(true, shiftKey);
	} else if (keyCode == 40) {
		this.vT8(false, shiftKey);
	} else if (keyCode == 8) {
		this["delete"](-1);
	} else if (keyCode == 127) {
		this["delete"](1);
	} else if (keyCode == 36) {
		this.vN8(shiftKey);
	} else if (keyCode == 35) {
		this.vO8(shiftKey);
	} else if (keyCode == 90 && ctrlKey) {
		this.undo();
	} else if (keyCode == 89 && ctrlKey) {
		this.redo();
	} else if (keyCode == 67 && ctrlKey) {
		this.copy();
	} else if (keyCode == 86 && ctrlKey) {
		this.paste();
	} else if (keyCode == 88 && ctrlKey) {
		this.cut();
	} else if (keyCode == 49 && ctrlKey) {
		this.prependRow();
	} else if (keyCode == 50 && ctrlKey) {
		vs8 = this.appendRow();
	} else if (keyCode == 51 && ctrlKey) {
		vs8 = this.prependColumn();
	} else if (keyCode == 52 && ctrlKey) {
		vs8 = this.appendColumn();
	} else if (keyCode == 53 && ctrlKey) {
		vs8 = this.removeRow();
	} else if (keyCode == 54 && ctrlKey) {
		vs8 = this.removeColumn();
	} else if (keyCode == 55 && ctrlKey) {
		this.testGetPathsOfBoxes();
	} else {
		vs8 = false;
	};

	return vs8;
};
com.wiris.vF.prototype.vt8 = function () {
	com.wiris.vm.vt8(this.box);
};
com.wiris.vF.prototype.isEmpty = function () {
	return com.wiris.vm.vU7(this.box) == 1;
};
com.wiris.vF.prototype.vu8 = function () {
	this.vv6(com.wiris.vy.vV2);
};
com.wiris.vF.prototype.vv8 = function () {
	this.vv6(com.wiris.vy.vU2);
};
com.wiris.vF.prototype.setFontFamily = function (str) {
	var vs2 = new com.wiris.vy();
	if (str.toLowerCase() == "inherit") {
		vs2.vv6(com.wiris.vy.vw8, false);
	} else {
		vs2.setFontFamily(str);
	};
	this.vx8(vs2);
};
com.wiris.vF.prototype.setFontSize = function (i) {
	var vs2 = new com.wiris.vy();
	if (i < 0) {
		vs2.vv6(com.wiris.vy.vy8, false);
	} else {
		vs2.setFontSize(i);
	};
	this.vx8(vs2);
};
com.wiris.vF.prototype.setColor = function (str) {
	if (this.vy6 != 0) {
		var b = new com.wiris.vy();
		b.setColor(com.wiris.v31.vz8(str));
		this.vl8(b);
		this.v09(b);
	} else {
		var b = new com.wiris.vy();
		b.setColor(com.wiris.v31.vz8(str));
		this.v09(b);
	};
};
com.wiris.vF.prototype.v19 = function () {
	var v29 = this.v57;
	if (this.getCurrentStyles().isFlagMask(com.wiris.vy.vU2)) {
		this.vv6(com.wiris.vy.v39);
	} else {
		this.getCurrentStyles().vv6(com.wiris.vy.vU2, true);
		this.vv6(com.wiris.vy.vU2);
	};
};
com.wiris.vF.prototype.vv6 = function (v49) {
	if (this.vy6 != 0) {
		var vT4 = this.getCurrentStyles().isFlag(v49);
		var b = new com.wiris.vy();
		b.vv6(v49, !vT4);
		this.vl8(b);
		this.v09(b);
	} else {
		var vT4 = this.getCurrentStyles().isFlag(v49);
		var b = new com.wiris.vy();
		b.vv6(v49, !vT4);
		this.v09(b);
	};
};
com.wiris.vF.prototype.vx8 = function (vs2) {
	this.vq7();
	this.box.vI3(vs2, true, true);
	this.vQ7();
	this.v57 = null;
	this.v67 = null;
	this.vm8();
	this.vs7();
};
com.wiris.vF.prototype.v59 = function () {
	return this.v07.length > 0;
};
com.wiris.vF.prototype.v69 = function () {
	return this.v17.length > 0;
};
com.wiris.vF.prototype.v79 = function () {
	return this.v47 != null;
};
com.wiris.vF.prototype.v89 = function () {
	return this.vy6 != 0;
};
com.wiris.vF.prototype.v99 = function () {
	return com.wiris.vm.v99(this.vi7());
};
com.wiris.vF.prototype.testGetPathsOfBoxes = function () {
	var a = this.v99();
	var i; {
		var vz2 = 0,
			v03 = a.length;
		while (vz2 < v03) {
				var v13 = vz2++;
				haxe.Log.trace(a[v13].vA9, {
					fileName: "FormulaModel.hx",
					lineNumber: 1144,
					className: "com.wiris.editor.formula.FormulaModel",
					methodName: "testGetPathsOfBoxes"
				});
			};
	};
};
com.wiris.vF.prototype.prependRow = function () {
	return this.vB9("insertRow", 0, 0);
};
com.wiris.vF.prototype.appendRow = function () {
	return this.vB9("insertRow", 1, 0);
};
com.wiris.vF.prototype.prependColumn = function () {
	return this.vB9("insertColumn", 0, 0);
};
com.wiris.vF.prototype.appendColumn = function () {
	return this.vB9("insertColumn", 0, 1);
};
com.wiris.vF.prototype.removeRow = function () {
	return this.vB9("removeRow", 0, 0);
};
com.wiris.vF.prototype.removeColumn = function () {
	return this.vB9("removeColumn", 0, 0);
};
com.wiris.vF.prototype.vB9 = function (maction, vC9, vD9) {
	var vq4;
	vq4 = com.wiris.v8.vi4(this.box, this.vx6);
	if (vq4 != null) {
		this.vq7();
		var vl4 = (function (vH4) {
			var vI4;
			var vm4 = vq4[0];
			if (Std["is"](vm4, com.wiris.v8)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this));
		var vp4 = (function (vH4) {
			var vI4;
			var vm4 = vq4[1];
			if (Std["is"](vm4, Int)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this));
		var vE9 = (function (vH4) {
			var vI4;
			var vm4 = vq4[2];
			if (Std["is"](vm4, Int)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this));
		vp4 += vC9;
		vE9 += vD9;
		if (maction == "insertRow") {
			var b = vl4.vu2(1, vl4.vo4);
			var s = vl4.vw5(vp4, 0);
			this.vk7(s);
			this.vq2(b, com.wiris.vF.vz7, 0);
		};
		if (maction == "insertColumn") {
			var b = vl4.vu2(vl4.vr4, 1);
			var s = vl4.vx5(vE9, 0);
			this.vk7(s);
			this.vq2(b, com.wiris.vF.vz7, 0);
		};
		if (maction == "removeRow") {
			var s = vl4.vw5(vp4, 1);
			this.vk7(s);
			this.v78();
		};
		if (maction == "removeColumn") {
			var s = vl4.vx5(vE9, 1);
			this.vk7(s);
			this.v78();
		};
		if (vp4 >= vl4.vr4) vp4--;
		if (vE9 >= vl4.vo4) vE9--;
		var a = vl4.vd5(vp4, vE9);
		var vj4 = com.wiris.vz.vF9(a, 1);
		this.setCaret(vj4.vG9(), 0);
		this.vs7();
		this.vQ7();
		return true;
	} else {
		return false;
	};
};
com.wiris.vF.prototype.vN7 = function () {
	this.vx6 = 0;
	this.vy6 = 0;
	this.vz6 = 0;
	this.v07 = new Array();
	this.v17 = new Array();
	this.v37 = com.wiris.editor.formula.UndoState.UNDO_NORMAL;
	this.v27 = 0;
	this.v67 = null;
	this.v57 = null;
};
com.wiris.vF.prototype.reset = function () {
	this.vM7(new com.wiris.vP());
};
com.wiris.vF.prototype.vC7 = function () {
	if (this.isRecalcNeeded()) throw "Formula needs recalc.";
};
com.wiris.vF.prototype.isRecalcNeeded = function () {
	return !this.box.vg2;
};
com.wiris.vF.prototype.getDefaultStyles = function () {
	return this.vs6;
};
com.wiris.vF.prototype.setDefaultStyles = function (vd2) {
	this.vs6 = com.wiris.vy.vH9(vd2);
};
com.wiris.vF.prototype.getDesiredDefaultStyles = function () {
	return this.vu6;
};
com.wiris.vF.prototype.getCurrentStyles = function () {
	this.vI9();
	return this.v57;
};
com.wiris.vF.prototype.vJ9 = function () {
	var c;
	if (this.vy6 > 0) c = this.vx6 + this.vy6;
	else c = this.vx6;
	return c;
};
com.wiris.vF.prototype.v09 = function (vd2) {
	var vK9 = this.getCurrentStyles();
	var vL9 = com.wiris.vy.join(vK9, vd2);
	this.v57 = vL9;
	this.vS7();
	this.v57 = vL9;
};
com.wiris.vF.prototype.vI9 = function () {
	if (this.v57 != null) return;
	var v08 = new com.wiris.v41();
	this.v57 = v08.vM9(this.vD7(), this.vJ9()).vG7();
	this.v67 = null;
};
com.wiris.vF.prototype.getCurrentActualStyles = function () {
	this.vB7();
	return this.v67;
};
com.wiris.vF.prototype.vB7 = function () {
	this.vI9();
	var v08 = new com.wiris.v41();
	var top = this.vD7();
	var box;
	box = v08.vN9(top, this.vJ9());
	if (box == null) box = top;
	var b = this.vo6(box);
	this.v67 = com.wiris.vy.join(b, this.v57);
};
com.wiris.vF.prototype.__class__ = com.wiris.vF;
com.wiris.vF.__interfaces__ = [com.wiris.vE];
com.wiris.vG = function (p) {
	if (p === v91) return; {
		this.vU5 = 0;
	}
};
com.wiris.vG.__name__ = ["com", "wiris", "vG"];
com.wiris.vG.prototype.left = null;
com.wiris.vG.prototype.right = null;
com.wiris.vG.prototype.vY4 = null;
com.wiris.vG.prototype.vd1 = null;
com.wiris.vG.prototype.vU5 = null;
com.wiris.vG.prototype.vq2 = function (box) {
	null;
};
com.wiris.vG.prototype.v78 = function (vr5) {
	return false;
};
com.wiris.vG.prototype.vD7 = function () {
	return null;
};
com.wiris.vG.prototype.vY7 = function () {
	return false;
};
com.wiris.vG.prototype.vb7 = function () {
	return 0;
};
com.wiris.vG.prototype.va7 = function () {
	return 0;
};
com.wiris.vG.prototype.vn7 = function () {
	var vO9;
	var vP9;
	var p;
	var i;
	vO9 = new Array();
	if (this.left != null) vO9 = vO9.concat(this.left.vn7());
	vP9 = this.vD7().getSelectionRectangles(this.vY4, this.vd1);
	p = com.wiris.vm.vQ9(null, this.vD7()); {
		var vz2 = 0,
			v03 = vP9.length;
		while (vz2 < v03) {
				var v13 = vz2++;
				vP9[v13].x += p.x;
				vP9[v13].vK1 += p.vK1;
			};
	};
	vO9 = vO9.concat(vP9);
	if (this.right != null) vO9 = vO9.concat(this.right.vn7());
	return vO9;
};
com.wiris.vG.prototype.vR9 = function () {
	if (this.right != null) this.right.vR9();
	this.vY4 = 0;
	return true;
};
com.wiris.vG.prototype.vS9 = function () {
	if (this.left != null) this.left.vS9();
	this.vd1 = this.vD7().vW4() - 1;
	return true;
};
com.wiris.vG.prototype.vn5 = function () {
	return null;
};
com.wiris.vG.prototype.v58 = function () {
	return false;
};
com.wiris.vG.prototype.vp6 = function (m) {
	this.vU5 = m;
};
com.wiris.vG.prototype.vl7 = function () {
	return this.vU5;
};
com.wiris.vG.prototype.__class__ = com.wiris.vG;
com.wiris.vH = function (p) {
	if (p === v91) return; {
		com.wiris.vG.call(this);
	}
};
com.wiris.vH.__name__ = ["com", "wiris", "vH"];
com.wiris.vH.__super__ = com.wiris.vG;
for (var k in com.wiris.vG.prototype) com.wiris.vH.prototype[k] = com.wiris.vG.prototype[k];
com.wiris.vH.vT9 = function (box, vY4, vd1, left, right) {
	var t;
	t = new com.wiris.vH();
	t.box = box;
	t.vY4 = vY4;
	t.vd1 = vd1;
	t.left = left;
	t.right = right;
	return t;
};
com.wiris.vH.prototype.box = null;
com.wiris.vH.prototype.vq2 = function (b) {
	var t;
	t = (function (vH4) {
		var vI4;
		var vm4 = b;
		if (Std["is"](vm4, com.wiris.vR)) vm4;
		else throw "Class cast error";
		vI4 = vm4;
		return vI4;
	}(this));
	this.box.vf8(this.box.vU9(this.vY4) + t.vV9() + this.box.vW9(this.vd1));
	this.vd1 = this.vY4 + t.vV9().length;
	this.box.v73();
};
com.wiris.vH.prototype.v78 = function (vr5) {
	this.box.vf8(this.box.vU9(this.vY4) + this.box.vW9(this.vd1));
	this.vd1 = this.vY4;
	this.box.v73();
	return true;
};
com.wiris.vH.prototype.vD7 = function () {
	return this.box;
};
com.wiris.vH.prototype.vb7 = function () {
	return com.wiris.vm.vX9(this.box) + this.vY4;
};
com.wiris.vH.prototype.va7 = function () {
	return com.wiris.vm.vX9(this.box) + this.vd1;
};
com.wiris.vH.prototype.vY7 = function () {
	return true;
};
com.wiris.vH.prototype.vR9 = function () {
	this.vY4 = -1;
	return true;
};
com.wiris.vH.prototype.vS9 = function () {
	this.vd1 = this.box.vV9().length - 1;
	return true;
};
com.wiris.vH.prototype.vn5 = function () {
	var t = new com.wiris.vR();
	t.vf8(this.box.vY9(this.vY4, this.vd1));
	com.wiris.vm.vA3(this.box, t);
	return t;
};
com.wiris.vH.prototype.__class__ = com.wiris.vH;
com.wiris.editor.BoxStyleInterface = function () {};
com.wiris.editor.BoxStyleInterface.__name__ = ["com", "wiris", "editor", "BoxStyleInterface"];
com.wiris.editor.BoxStyleInterface.prototype.isFlagMask = null;
com.wiris.editor.BoxStyleInterface.prototype.isFlag = null;
com.wiris.editor.BoxStyleInterface.prototype.getColor = null;
com.wiris.editor.BoxStyleInterface.prototype.setColor = null;
com.wiris.editor.BoxStyleInterface.prototype.getP = null;
com.wiris.editor.BoxStyleInterface.prototype.getFontFamily = null;
com.wiris.editor.BoxStyleInterface.prototype.getFontSize = null;
com.wiris.editor.BoxStyleInterface.prototype.getScriptLevel = null;
com.wiris.editor.BoxStyleInterface.prototype.getDisplayStyle = null;
com.wiris.editor.BoxStyleInterface.prototype.getFlags = null;
com.wiris.editor.BoxStyleInterface.prototype.getFlagsMask = null;
com.wiris.editor.BoxStyleInterface.prototype.__class__ = com.wiris.editor.BoxStyleInterface;
com.wiris.vI = function () {};
com.wiris.vI.__name__ = ["com", "wiris", "vI"];
com.wiris.vI.vZ9 = null;
com.wiris.vI.va9 = function (serviceName, parameters, listener) {
	var servicesPackage = eval("c" + "om.wiris.editor.formula.services");
	if (servicesPackage != null) {
		if (serviceName == "mathml2internal") {
			var vb9 = eval("new servicesPackage.MathMLToInternalService()");
			var vc9 = vb9.toInternal(parameters.get("mml")) + "";
			listener.serviceAnswerReceived(serviceName, parameters, vc9);
		};
	} else {
		var vd9 = new Hash();
		vd9.set("id", com.wiris.vI.ve9);
		vd9.set("serviceName", serviceName);
		vd9.set("parameters", parameters);
		vd9.set("listener", listener);
		com.wiris.vI.remainingCalls.push(vd9);
		if (com.wiris.vI.vZ9 == null) {
			com.wiris.vI.vZ9 = new haxe.Timer(100);
			com.wiris.vI.vZ9.run = vf9(com.wiris.vI, "tick");
		};
		var url = com.wiris.vI.vg9(serviceName) + "?jsonp=" + Type.getClassName(com.wiris.vI) + ".answer_" + com.wiris.vI.ve9;
		var i = parameters.keys();
		while (i.hasNext()) {
			var vU1 = i.next();
			url += "&" + StringTools.urlEncode(vU1) + "=" + StringTools.urlEncode(parameters.get(vU1));
		};
		var script = js.Lib.document.createElement("script");

		script.setAttribute("src", url);
		js.Lib.document.body.appendChild(script);
		++com.wiris.vI.ve9;
	};
};
com.wiris.vI.vg9 = function (serviceName) {
	var vg6 = "http://localhost:8080/formula-swf";
	if (com.wiris.jsEditor.defaultBasePath) {
		vg6 = com.wiris.jsEditor.defaultBasePath;
		var vh9 = vg6.split("/");
		vh9.pop();
		vg6 = vh9.join("/");
	};
	return vg6 + "/" + serviceName;
};
com.wiris.vI.tick = function () {
	var i = 0;
	while (i < com.wiris.vI.remainingCalls.length) {
		var vi9 = com.wiris.vI.remainingCalls[i].get("id");
		if (com.wiris.vI["answer_" + vi9]) {
			var serviceName = com.wiris.vI.remainingCalls[i].get("serviceName");
			var parameters = com.wiris.vI.remainingCalls[i].get("parameters");
			var listener = com.wiris.vI.remainingCalls[i].get("listener");
			listener.serviceAnswerReceived(serviceName, parameters, com.wiris.vI["answer_" + vi9]);
			com.wiris.vI.remainingCalls.splice(i, 1);
		} else {
			++i;
		};
	};
	if (com.wiris.vI.remainingCalls.length == 0) {
		com.wiris.vI.vZ9.stop();
		com.wiris.vI.vZ9 = null;
	};
};
com.wiris.vI.prototype.__class__ = com.wiris.vI;
com.wiris.vJ = function (p) {
	if (p === v91) return; {
		null;
	}
};
com.wiris.vJ.__name__ = ["com", "wiris", "vJ"];
com.wiris.vJ.vH8 = function (i, vt2, vU5) {
	var vD8 = new com.wiris.vJ();
	vD8.vj9 = com.wiris.vJ.vk9;
	vD8.vY4 = i;
	vD8.vd1 = vt2;
	vD8.vU5 = vU5;
	return vD8;
};
com.wiris.vJ.vI8 = function (i, vt2, vU5, b) {
	var vD8 = new com.wiris.vJ();
	vD8.vj9 = com.wiris.vJ.vl9;
	vD8.vY4 = i;
	vD8.vd1 = vt2;
	vD8.vU5 = vU5;
	vD8.b = b;
	return vD8;
};
com.wiris.vJ.vG8 = function (vm9, vn9) {
	var vD8 = new com.wiris.vJ();
	vD8.vj9 = com.wiris.vJ.vo9;
	vD8.vm9 = vm9;
	vD8.vn9 = vn9;
	return vD8;
};
com.wiris.vJ.prototype.vj9 = null;
com.wiris.vJ.prototype.vY4 = null;
com.wiris.vJ.prototype.vd1 = null;
com.wiris.vJ.prototype.vU5 = null;
com.wiris.vJ.prototype.b = null;
com.wiris.vJ.prototype.vm9 = null;
com.wiris.vJ.prototype.vn9 = null;
com.wiris.vJ.prototype.vK8 = function (f) {
	if (this.vj9 == com.wiris.vJ.vl9) {
		f.vR7(this.vY4, this.vd1 - this.vY4, this.vU5);
		f.vr7(this.b, com.wiris.vF.vp9, 0, null, null);
	} else if (this.vj9 == com.wiris.vJ.vk9) {
		f.vR7(this.vY4, this.vd1 - this.vY4, this.vU5);
		f.vx7(false);
	} else if (this.vj9 == com.wiris.vJ.vo9) {
		this.vn9.vK8(f);
		this.vm9.vK8(f);
	};
};
com.wiris.vJ.prototype.__class__ = com.wiris.vJ;
com.wiris.vK = function (p) {
	if (p === v91) return; {
		this.vq9 = null;
		this.vr9 = new Array();
		this.links = new Array();
		this.listeners = new Array();
		this.vs9 = new Array();
		this.vt9 = -1;
	}
};
com.wiris.vK.__name__ = ["com", "wiris", "vK"];
com.wiris.vK.prototype.vq9 = null;
com.wiris.vK.prototype.vr9 = null;
com.wiris.vK.prototype.links = null;
com.wiris.vK.prototype.listeners = null;
com.wiris.vK.prototype.vs9 = null;
com.wiris.vK.prototype.vt9 = null;
com.wiris.vK.prototype.vu9 = function (tab) {
	this.vr9.push(tab);
	var i = this.listeners.iterator();
	while (i.hasNext()) {
		i.next().contextTabAdded(this, tab);
	};
	if (this.vs9.length == 0 && this.vr9.length == 1) {
		this.vf6(0);
	};
};
com.wiris.vK.prototype.vv9 = function (link) {
	this.links.push(link);
};
com.wiris.vK.prototype.vb6 = function (listener) {
	this.listeners.push(listener);
};
com.wiris.vK.prototype.vw9 = function (tab) {
	this.vs9.push(tab);
	if (this.vs9.length == 1) {
		this.vf6(0);
	};
};
com.wiris.vK.prototype.vx9 = function (vX6) {
	var i = this.listeners.iterator();
	while (i.hasNext()) {
		i.next().componentFired(this, vX6);
	};
};
com.wiris.vK.prototype.vy9 = function (action) {
	if (this.vq9 == null) {
		this.vq9 = new Hash();
		var i = this.vs9.iterator();
		while (i.hasNext()) {
			var tab = i.next();
			var vz9 = tab.panel.v0A();
			var vt2 = 0;
			while (vt2 < vz9) {
				var section = tab.panel.v1A(vt2);
				this.v2A(section, false);
				this.v2A(section, true);
				++vt2;
			};
		};
	};
	var v3A = this.vq9.get(action);
	if (v3A == null) {
		return new Array();
	};
	return v3A;
};
com.wiris.vK.prototype.vc6 = function () {
	return this.vr9;
};
com.wiris.vK.prototype.vd6 = function () {
	return this.links;
};
com.wiris.vK.prototype.ve6 = function () {
	return this.vs9;
};
com.wiris.vK.prototype.v2A = function (section, extra) {
	var v4A = section.va6(extra);
	var i = 0;
	while (i < v4A) {
		var vX6 = section.vY6(i, extra);
		if (vX6.action.id != null) {
			var stack = this.vq9.get(vX6.action.id);
			if (stack == null) {
				stack = new Array();
				this.vq9.set(vX6.action.id, stack);
			};
			stack.push(vX6);
		};
		++i;
	};
};
com.wiris.vK.prototype.v5A = function () {
	var v6A = this.vs9.length;
	if (this.vt9 >= v6A) {
		this.vf6(v6A - 1);
	};
	var i = v6A + this.vr9.length - 1;
	while (i >= v6A) {
		this.vr9.pop();
		var vt2 = this.listeners.iterator();
		while (vt2.hasNext()) {
			vt2.next().tabRemoved(this, i);
		};
		--i;
	};
};
com.wiris.vK.prototype.vf6 = function (index) {
	var v7A = this.vt9;
	this.vt9 = index;
	var i = this.listeners.iterator();
	while (i.hasNext()) {
		i.next().tabChanged(this, v7A, this.vt9);
	};
};
com.wiris.vK.prototype.v8A = function (action, enabled) {
	var i = this.vy9(action).iterator();
	while (i.hasNext()) {
		i.next().v9A(enabled);
	};
};
com.wiris.vK.prototype.vAA = function (action, value) {
	var i = this.vy9(action).iterator();
	while (i.hasNext()) {
		i.next().vBA(value);
	};
};
com.wiris.vK.prototype.vCA = function (action, vDA) {
	var i = this.vy9(action).iterator();
	while (i.hasNext()) {
		((function (vH4) {
			var vI4;
			var vm4 = i.next();
			if (Std["is"](vm4, com.wiris.vN)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this))).vEA(vDA);
	};
};
com.wiris.vK.prototype.vFA = function (vX6) {
	var i = this.listeners.iterator();
	while (i.hasNext()) {
		i.next().componentUpdated(this, vX6);
	};
};
com.wiris.vK.prototype.__class__ = com.wiris.vK;
com.wiris.vK.__interfaces__ = [com.wiris.vC];
com.wiris.vL = function (p) {
	if (p === v91) return; {
		com.wiris.v1.call(this);
		this.va4 = 0;
	}
};
com.wiris.vL.__name__ = ["com", "wiris", "vL"];
com.wiris.vL.__super__ = com.wiris.v1;
for (var k in com.wiris.v1.prototype) com.wiris.vL.prototype[k] = com.wiris.v1.prototype[k];
com.wiris.vL.prototype.actiontype = null;
com.wiris.vL.prototype.va4 = null;
com.wiris.vL.prototype.vl2 = function (vm2) {
	if (this.vy2() > 0) {
		var c = this.vw2(0);
		this.height = c.height;
		this.width = c.width;
		this.baseline = c.baseline;
		c.x = 0;
		c.vK1 = 0;
	};
};
com.wiris.vL.prototype.v53 = function (s) {
	s.vS3(this, "maction");
	this.actiontype = s.vT3("actiontype", this.actiontype, null);
	s.v63(this);
	s.vU3("maction");
};
com.wiris.vL.prototype.v83 = function (b) {
	com.wiris.v1.prototype.v83.call(this, b);
};
com.wiris.vL.prototype.vB3 = function () {
	var b;
	b = new com.wiris.vL();
	this.v83(b);
	return b;
};
com.wiris.vL.prototype.__class__ = com.wiris.vL;
com.wiris.vM = function (vGA, action) {
	if (vGA === v91) return; {
		this.action = action;
		this.enabled = true;
		this.vGA = vGA;
		this.value = null;
	}
};
com.wiris.vM.__name__ = ["com", "wiris", "vM"];
com.wiris.vM.prototype.action = null;
com.wiris.vM.prototype.enabled = null;
com.wiris.vM.prototype.vGA = null;
com.wiris.vM.prototype.value = null;
com.wiris.vM.prototype.vHA = function (value) {
	return false;
};
com.wiris.vM.prototype.vIA = function () {
	return null;
};
com.wiris.vM.prototype.vJA = function () {
	return null;
};
com.wiris.vM.prototype.vKA = function () {
	return null;
};
com.wiris.vM.prototype.vLA = function () {
	return null;
};
com.wiris.vM.prototype.v9A = function (enabled) {
	if (this.enabled != enabled) {
		this.enabled = enabled;
		this.vGA.vFA(this);
	};
};
com.wiris.vM.prototype.vBA = function (value) {
	if (this.vHA(value)) {
		this.value = value;
		this.vGA.vFA(this);
	};
};
com.wiris.vM.prototype.__class__ = com.wiris.vM;
com.wiris.vN = function (vGA, vMA, icon) {
	if (vGA === v91) return; {
		com.wiris.vM.call(this, vGA, null);
		this.icon = icon;
		this.vNA = false;
		this.vDA = false;
		this.vMA = vMA;
	}
};
com.wiris.vN.__name__ = ["com", "wiris", "vN"];
com.wiris.vN.__super__ = com.wiris.vM;
for (var k in com.wiris.vM.prototype) com.wiris.vN.prototype[k] = com.wiris.vM.prototype[k];
com.wiris.vN.prototype.icon = null;
com.wiris.vN.prototype.vNA = null;
com.wiris.vN.prototype.vDA = null;
com.wiris.vN.prototype.vMA = null;
com.wiris.vN.prototype.click = function () {
	if (this.enabled) {
		this.vGA.vx9(this);
	};
};
com.wiris.vN.prototype.vIA = function () {
	return this;
};
com.wiris.vN.prototype.vEA = function (vDA) {
	if (this.vNA && this.vDA != vDA) {
		this.vDA = vDA;
		this.vGA.vFA(this);
	};
};
com.wiris.vN.prototype.__class__ = com.wiris.vN;
com.wiris.vO = function () {};
com.wiris.vO.__name__ = ["com", "wiris", "vO"];
com.wiris.vO.prototype.componentFired = null;
com.wiris.vO.prototype.componentUpdated = null;
com.wiris.vO.prototype.contextTabAdded = null;
com.wiris.vO.prototype.tabChanged = null;
com.wiris.vO.prototype.tabRemoved = null;
com.wiris.vO.prototype.__class__ = com.wiris.vO;
com.wiris.vP = function (p) {
	if (p === v91) return; {
		com.wiris.v7.call(this);
	}
};
com.wiris.vP.__name__ = ["com", "wiris", "vP"];
com.wiris.vP.__super__ = com.wiris.v7;
for (var k in com.wiris.v7.prototype) com.wiris.vP.prototype[k] = com.wiris.v7.prototype[k];
com.wiris.vP.vOA = function (b) {
	var t;
	t = new com.wiris.vP();
	t.vx2(b);
	return t;
};
com.wiris.vP.prototype.vp2 = function (vm2) {
	if (this.vy2() == 0) {
		com.wiris.vm.vPA(vm2, this, 0, vm2.getLength(0.2), 0, vm2.getLength(0.05));
	};
};
com.wiris.vP.prototype.vl2 = function (vm2) {
	if (this.vy2() == 0) {
		this.width = vm2.getWidth("x");
		this.height = vm2.getHeight("x");
		this.baseline = vm2.getBaseline("x");
	} else {
		var vQA;
		var i;
		vQA = new Array();
		this.width = 0; {
			var vz2 = 0,
				v03 = this.vy2();
			while (vz2 < v03) {
					var v13 = vz2++;
					vQA[v13] = 0;
					this.vw2(v13).x = this.width;
					this.width += this.vw2(v13).width;
				};
		};
		com.wiris.vm.vo3(vm2, this, vQA);
	};
};
com.wiris.vP.prototype.vn2 = function (vm2) {
	return false;
};
com.wiris.vP.prototype.vW4 = function () {
	return this.vy2() + 1;
};
com.wiris.vP.prototype.vd4 = function (n) {
	return n + 1;
};
com.wiris.vP.prototype.vX4 = function (vY4, vd1, left, right) {
	return com.wiris.vT.vRA(this, vY4, vd1, left, right);
};
com.wiris.vP.prototype.vZ4 = function (x, va4) {
	var n = this.vy2();
	if (n == 0) {
		return true;
	} else if (x == 0) {
		return !this.vSA(0);
	} else if (x == n) {
		return !this.vSA(n - 1);
	} else {
		return !this.vSA(x - 1) && !this.vSA(x);
	};
};
com.wiris.vP.prototype.vSA = function (x) {
	var b = this.vw2(x);
	if (Std["is"](b, com.wiris.vL)) {
		var a = (function (vH4) {
			var vI4;
			var vm4 = b;
			if (Std["is"](vm4, com.wiris.vL)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this));
		return a.actiontype == com.wiris.vL.vTA;
	};
	return false;
};
com.wiris.vP.prototype.getSelectionRectangles = function (vY4, vd1) {
	var vO9 = new Array();
	if (vY4 == vd1 && vY4 == 0 && this.vj2 == 1) {
		var vUA = Math.round(Math.ceil(this.width / 2.0)) - 1;
		vO9.push(com.wiris.vp.vi5(vUA, 2, 1, this.height - 3));
		return vO9;
	};
	var vt2;
	var vC9;
	var length;
	vC9 = 0; {
		var v03 = 0;
		while (v03 < vY4) {
			var vA5 = v03++;
			vC9 += this.vw2(vA5).width;
		};
	};
	if (vY4 == vd1) length = 1;
	else {
		length = 0; {
			var v03 = vY4;
			while (v03 < vd1) {
				var vA5 = v03++;
				length += this.vw2(vA5).width;
			};
		};
	};
	vO9[0] = com.wiris.vp.vi5(vC9, 0, length, this.height);
	return vO9;
};
com.wiris.vP.prototype.v23 = function () {
	var n = this.vy2();
	var i = 0;
	while (i < n) {
		var c = this.vw2(i);
		if (Std["is"](c, com.wiris.vP)) {
			this["delete"](i, 1);
			var m = c.vy2();
			var vt2; {
				var v03 = 0;
				while (v03 < m) {
					var vA5 = v03++;
					var vVA = c.vw2(vA5);
					vVA.vd2 = com.wiris.vy.join(c.vd2, vVA.vd2);
					this.vq2(i + vA5, vVA);
				};
			};
			n += -1 + m;
			i--;
		};
		i++;
	};
};
com.wiris.vP.prototype.v53 = function (s) {
	s.vp3();
	s.vq3(this, "mrow", 1, 1);
	s.vq3(this, "mstyle", 1, 0);
	s.vr3(this);
	s.v63(this);
	s.vs3();
};
com.wiris.vP.prototype.v83 = function (b) {
	com.wiris.v7.prototype.v83.call(this, b);
};
com.wiris.vP.prototype.vB3 = function () {
	var vO7;
	vO7 = new com.wiris.vP();
	this.v83(vO7);
	return vO7;
};
com.wiris.vP.prototype.vM3 = function (vm2, vWA) {
	if (this.vy2() > 0) {
		if (vWA == com.wiris.v1.vn3 || vWA == com.wiris.v1.vb3 || vWA == com.wiris.v1.vl3 || vWA == com.wiris.v1.vf3) {
			return this.vw2(this.vy2() - 1).vM3(vm2, vWA);
		} else if (vWA == com.wiris.v1.v64) {
			var m = 1073741824;
			var i; {
				var vz2 = 0,
					v03 = this.vy2();
				while (vz2 < v03) {
						var v13 = vz2++;
						var offset = this.vw2(v13).vM3(vm2, vWA);
						if (offset < m) m = offset;
					};
			};
			return m;
		} else if (vWA == com.wiris.v1.v74) {
			var m = -1073741824;
			var i; {
				var vz2 = 0,
					v03 = this.vy2();
				while (vz2 < v03) {
						var v13 = vz2++;
						var offset = this.vw2(v13).vM3(vm2, vWA);
						if (offset > m) m = offset;
					};
			};
			return m;
		};
	};
	return 0;
};
com.wiris.vP.prototype.vK3 = function (pos) {
	if (this.vy2() == 1 && pos == 0) return this.getParent().vK3(this.vh2);
	else return com.wiris.v7.prototype.vK3.call(this, pos);
};
com.wiris.vP.prototype.__class__ = com.wiris.vP;
Reflect = function () {};
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function (o, field) {
	if (o.vXA != null) return o.vXA(field);
	var arr = Reflect.fields(o); {
		var vYA = arr.iterator();
		while (vYA.hasNext()) {
			var t = vYA.next();
			if (t == field) return true;
		}
	};
	return false;
};
Reflect.field = function (o, field) {
	var v = null;
	try {
		v = o[field];
	} catch (vJ4) {
		{
			var e = vJ4;
			null;
		};
	};
	return v;
};
Reflect.setField = function (o, field, value) {
	o[field] = value;
};
Reflect.callMethod = function (o, vZA, args) {
	return vZA.apply(o, args);
};
Reflect.fields = function (o) {
	if (o == null) return new Array();
	var a = new Array();
	if (o.vXA) {
		for (var i in o) if (o.vXA(i)) a.push(i);;
	} else {
		var t;
		try {
			t = o.__proto__;
		} catch (vJ4) {
			{
				var e = vJ4; {
					t = null;
				};
			};
		};
		if (t != null) o.__proto__ = null;
		for (var i in o) if (i != "__proto__") a.push(i);;
		if (t != null) o.__proto__ = t;
	};
	return a;
};
Reflect.isFunction = function (f) {
	return typeof(f) == "function" && f.__name__ == null;
};
Reflect.compare = function (a, b) {
	return a == b ? 0 : a > b ? 1 : -1;
};
Reflect.compareMethods = function (vaA, vbA) {
	if (vaA == vbA) return true;
	if (!Reflect.isFunction(vaA) || !Reflect.isFunction(vbA)) return false;
	return vaA.scope == vbA.scope && vaA.method == vbA.method && vaA.method != null;
};
Reflect.isObject = function (v) {
	if (v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.vcA || t == "function" && v.__name__ != null;
};
Reflect.deleteField = function (o, f) {
	if (!Reflect.hasField(o, f)) return false;
	delete(o[f]);
	return true;
};
Reflect.copy = function (o) {
	var vdA = {}; {
		var v03 = 0,
			vz2 = Reflect.fields(o);
		while (v03 < vz2.length) {
				var f = vz2[v03];
				++v03;
				vdA[f] = Reflect.field(o, f);
			};
	};
	return vdA;
};
Reflect.makeVarArgs = function (f) {
	return function () {
		var a = new Array(); {
			var vz2 = 0,
				v03 = arguments.length;
			while (vz2 < v03) {
					var i = vz2++;
					a.push(arguments[i]);
				};
		};
		return f(a);
	};
};
Reflect.prototype.__class__ = Reflect;
com.wiris.vQ = function () {};
com.wiris.vQ.__name__ = ["com", "wiris", "vQ"];
com.wiris.vQ.veA = function (c) {
	if (48 <= c && c <= 57) return true;
	if (1632 <= c && c <= 1641) return true;
	if (1776 <= c && c <= 1785) return true;
	return false;
};
com.wiris.vQ.vfA = function (c) {
	if (com.wiris.vQ.veA(c)) return false;
	if (65 <= c && c <= 90) return true;
	if (97 <= c && c <= 122) return true;
	if (192 <= c && c <= 696 && c != 215 && c != 247) return true;
	if (867 <= c && c <= 1521) return true;
	if (1552 <= c && c <= 8188) return true;
	if (c == 8450 || c == 8461 || c == 8469 || c == 8473 || c == 8474 || c == 8477 || c == 8484) return true;
	return false;
};
com.wiris.vQ.v32 = function (c) {
	return com.wiris.vQ.vgA(com.wiris.vQ.vhA, c);
};
com.wiris.vQ.viA = function (c) {
	return com.wiris.vQ.vgA(com.wiris.vQ.vjA, c);
};
com.wiris.vQ.vkA = function (c) {
	return com.wiris.vQ.vgA(com.wiris.vQ.vlA, c);
};
com.wiris.vQ.vmA = function (c) {
	return com.wiris.vQ.vgA(com.wiris.vQ.vnA, c);
};
com.wiris.vQ.vgA = function (v, c) {
	var min = 0;
	var max = v.length - 1;
	do {
		var voA = Math.round((min + max) / 2);
		var vpA = v[voA];
		if (c == vpA) return true;
		else if (c < vpA) max = voA - 1;
		else min = voA + 1;
	} while (min <= max);
	return false;
};
com.wiris.vQ.vqA = function (c) {
	return com.wiris.vQ.vfA(c);
};
com.wiris.vQ.vrA = function (c) {
	return c >= 97 && c <= 122 || c >= 224 && c <= 255 || c >= 591 && c >= 659 || c >= 661 && c <= 687 || c >= 940 && c <= 974;
};
com.wiris.vQ.prototype.__class__ = com.wiris.vQ;
com.wiris.vR = function (p) {
	if (p === v91) return; {
		com.wiris.v7.call(this);
		this.type = com.wiris.vR.vsA;
	}
};
com.wiris.vR.__name__ = ["com", "wiris", "vR"];
com.wiris.vR.__super__ = com.wiris.v7;
for (var k in com.wiris.v7.prototype) com.wiris.vR.prototype[k] = com.wiris.v7.prototype[k];
com.wiris.vR.vtA = function (text) {
	var vO7 = new com.wiris.vR();
	vO7.vf8(text);
	return vO7;
};
com.wiris.vR.prototype.text = null;
com.wiris.vR.prototype.vuA = null;
com.wiris.vR.prototype.type = null;
com.wiris.vR.prototype.vvA = null;
com.wiris.vR.prototype.vwA = null;
com.wiris.vR.prototype.vxA = null;
com.wiris.vR.prototype.vl2 = function (vm2) {
	this.width = vm2.getWidth(this.text);
	this.height = vm2.getHeight(this.text);
	this.baseline = vm2.getBaseline(this.text);
	if (this.type == com.wiris.vR.vyA) {
		if (this.vvA.largeop) {
			if (this.width == 0) {
				this.width = vm2.getLength(0.5);
				this.height = vm2.getLength(1.0);
				this.baseline = vm2.getLength(0.85);
			};
			this.baseline -= vm2.getLength(0.1);
		} else {
			this.width += this.vzA(vm2, this.vvA.lspace);
			this.width += this.vzA(vm2, this.vvA.rspace);
		};
	};
	if (this.vi2.isFlag(com.wiris.vy.vU2)) {
		this.vxA = this.v0B(1);
		if (this.vxA == null || !this.vxA.vi2.isFlag(com.wiris.vy.vU2)) {
			this.width += vm2.getLength(0.05);
		};
	};
	var i;
	this.vuA = new Array();
	this.vuA.push(0); {
		var vz2 = 1,
			v03 = this.text.length;
		while (vz2 < v03) {
				var v13 = vz2++;
				this.vuA.push(vm2.getWidth(this.text.substr(0, v13)));
			};
	};
	this.vuA.push(this.width);
};
com.wiris.vR.prototype.vn2 = function (vm2) {
	var v1B = false;
	if (this.type == com.wiris.vR.vyA) {
		if (this.vvA.form != this.v2B()) {
			this.v3B();
			vm2.setStyle(this.vi2);
			this.vl2(vm2);
			v1B = true;
		};
		if (this.vvA.v46) {
			if (new com.wiris.v11().v4B(this.text.charCodeAt(0))) {
				var p = this.getParent();
				this.height = p.height;
				this.baseline = p.baseline;
				this.width = p.vK3(this.vh2);
				v1B = true;
			};
		};
	};
	if (this.vxA != this.v0B(1) && this.vi2.isFlag(com.wiris.vy.vU2)) {
		vm2.setStyle(this.vi2);
		this.vl2(vm2);
		v1B = true;
	};
	return v1B;
};
com.wiris.vR.prototype.vp2 = function (vm2) {
	var v5B = this.baseline;
	if (this.type == com.wiris.vR.vyA && this.vvA.largeop) this.baseline += vm2.getLength(0.1);
	if (this.text.length == 0) {
		com.wiris.vm.vPA(vm2, this, 0, vm2.getLength(0.1), 0, 0);
		return;
	};
	var x = this.type == com.wiris.vR.vyA && !this.vvA.largeop ? this.vzA(vm2, this.vvA.lspace) : 0;
	if (this.type == com.wiris.vR.vyA && this.vvA.v46) {
		var vQ3 = new com.wiris.v11();
		vQ3.vR3(vm2, this.text.charCodeAt(0), x, 0, this.baseline, this.width, this.height);
	} else {
		vm2.drawText(0, this.text, x, 0, this.baseline);
	};
	this.baseline = v5B;
};
com.wiris.vR.prototype.vo2 = function () {
	com.wiris.v7.prototype.vo2.call(this);
	if (this.type == com.wiris.vR.vyA && this.vvA.largeop) {
		var size = this.text != null && this.text.length > 0 && com.wiris.vQ.viA(this.text.charCodeAt(0)) ? 200 : 150;
		this.vd2 = com.wiris.vy.join(this.vd2, com.wiris.vy.vF1(size));
	};
};
com.wiris.vR.prototype.vf8 = function (t) {
	this.v33();
	if (t.length > 0) {
		var c = t.charCodeAt(0);
		if (this.type == com.wiris.vR.vyA && this.vvA.largeop && this.text.length == 0) {
			this.type = com.wiris.vR.vyA;
		} else {
			if (com.wiris.vQ.veA(c)) this.type = com.wiris.vR.v6B;
			else if (com.wiris.vQ.vfA(c)) {
				this.type = com.wiris.vR.v7B;
			} else {
				this.type = com.wiris.vR.vyA;
			};
		};
	} else {
		this.type = com.wiris.vR.vsA;
	};
	this.v8B(t);
};
com.wiris.vR.prototype.vW4 = function () {
	return this.text.length - 1;
};
com.wiris.vR.prototype.vX4 = function (vY4, vd1, left, right) {
	return com.wiris.vH.vT9(this, vY4, vd1, left, right);
};
com.wiris.vR.prototype.vZ4 = function (x, va4) {
	return x >= 0 && x < this.text.length - 1;
};
com.wiris.vR.prototype.getSelectionRectangles = function (vY4, vd1) {
	var vj7;
	var length;
	vj7 = this.getWidth(0, vY4 + 1);
	if (vY4 == vd1) length = 1;
	else length = this.getWidth(vY4 + 1, vd1 - vY4);
	var vO9 = new Array();
	vO9[0] = com.wiris.vp.vi5(vj7, 0, length, this.height);
	return vO9;
};
com.wiris.vR.prototype.getWidth = function (x, vK1) {
	this.v9B(x);
	this.v9B(x + vK1);
	return this.vuA[x + vK1] - this.vuA[x];
};
com.wiris.vR.prototype.v9B = function (x) {
	if (this.vuA == null) {
		var k;
		k = 33;
	};
	if (0 > x || x > this.vuA.length) {
		var k;
		k = 33;
	};
};
com.wiris.vR.prototype.v8B = function (t) {
	this.text = t;
	if (this.type == com.wiris.vR.vyA) {
		this.v3B();
	};
};
com.wiris.vR.prototype.v3B = function () {
	var vAB = new com.wiris.v51().vBB(this.text, this.v2B());
	var vCB = new com.wiris.v9(vAB);
	if (this.vwA != null) vCB.merge(this.vwA, this.vvA);
	this.vwA = vAB;
	this.vvA = vCB;
};
com.wiris.vR.prototype.v2B = function () {
	if (this.vh2 == 0 || this.getParent() == null) return com.wiris.v9.vDB;
	if (this.vh2 == this.getParent().vy2() - 1) return com.wiris.v9.vEB;
	return com.wiris.v9.vFB;
};
com.wiris.vR.prototype.v53 = function (s) {
	s.vp3();
	this.type = s.vq3(this, "mtext", this.type, com.wiris.vR.vsA);
	this.type = s.vq3(this, "mi", this.type, com.wiris.vR.v7B);
	this.type = s.vq3(this, "mn", this.type, com.wiris.vR.v6B);
	this.type = s.vq3(this, "mo", this.type, com.wiris.vR.vyA);
	s.vr3(this);
	this.type = s.vT5("#type", this.type, com.wiris.vR.vsA);
	this.v8B(s.vGB(this.text, ""));
	if (this.type == com.wiris.vR.vyA) {
		this.vvA.v46 = s.vHB("strechy", this.vvA.v46, this.vwA.v46);
		this.vvA.largeop = s.vHB("largeop", this.vvA.largeop, this.vwA.largeop);
		this.vvA.vP6(s.vT3("lspace", this.vvA.v76(), this.vwA.v76()));
		this.vvA.vQ6(s.vT3("rspace", this.vvA.v96(), this.vwA.v96()));
	};
	s.vs3();
};
com.wiris.vR.prototype.v83 = function (b) {
	com.wiris.v7.prototype.v83.call(this, b);
};
com.wiris.vR.prototype.vB3 = function () {
	var t;
	t = new com.wiris.vR();
	this.v83(t);
	return t;
};
com.wiris.vR.prototype.vM3 = function (vm2, vN3) {
	if (this.type == com.wiris.vR.vyA && this.vvA.largeop && this.text.length > 0) {
		if (com.wiris.vQ.viA(this.text.charCodeAt(0))) {
			if (vN3 == com.wiris.v1.vl3) return -vm2.getLength(0.3);
			if (vN3 == com.wiris.v1.vn3) return vm2.getLength(0.1);
			if (vN3 == com.wiris.v1.vf3) return vm2.getLength(0.3);
		} else {
			if (vN3 == com.wiris.v1.v74) return -vm2.getLength(0.15);
			if (vN3 == com.wiris.v1.v64) return vm2.getLength(0.1);
			var c = this.text.charCodeAt(this.text.length - 1);
			if (!com.wiris.vQ.veA(c) && !com.wiris.vQ.vfA(c)) {
				if (vN3 == com.wiris.v1.vl3) return -vm2.getLength(0.1);
				if (vN3 == com.wiris.v1.vn3) return -vm2.getLength(0.1);
			};
		};
	};
	if (this.type == com.wiris.vR.v7B && this.text.length > 0) {
		var c = this.text.charCodeAt(0);
		if (com.wiris.vQ.vqA(c)) {
			if (com.wiris.vQ.vrA(c)) {
				if (vN3 == com.wiris.v1.v64) return vm2.getLength(0.3);
			} else {
				if (vN3 == com.wiris.v1.v64) return vm2.getLength(0.1);
			};
		};
	};
	return 0;
};
com.wiris.vR.prototype.vU9 = function (vY4) {
	if (this.text.length == 0) return "";
	return this.text.substr(0, vY4 + 1);
};
com.wiris.vR.prototype.vW9 = function (vY4) {
	if (this.text.length == 0) return "";
	return this.text.substr(vY4 + 1);
};
com.wiris.vR.prototype.vY9 = function (vY4, vd1) {
	if (this.text.length == 0) return "";
	return this.text.substr(vY4 + 1, vd1 - vY4);
};
com.wiris.vR.prototype.vV9 = function () {
	return this.text;
};
com.wiris.vR.prototype.vzA = function (vm2, vA6) {
	var s = vA6 / 18.0;
	var vIB = vm2.getWidth("m");
	return Math.round(Math.round(s * vIB * 0.5));
};
com.wiris.vR.prototype.v0B = function (i) {
	if (this.vh2 + i < this.getParent().vy2() && this.vh2 + i >= 0) {
		return this.getParent().vw2(this.vh2 + 1);
	};
	return null;
};
com.wiris.vR.prototype.vJB = function () {
	return this.type == com.wiris.vR.vyA && this.vvA.largeop;
};
com.wiris.vR.prototype.__class__ = com.wiris.vR;
if (!com.wiris.common) com.wiris.common = {};
com.wiris.vS = function () {};
com.wiris.vS.__name__ = ["com", "wiris", "vS"];
com.wiris.vS.max = function (x, vK1) {
	if (x > vK1) {
		return x;
	};
	return vK1;
};
com.wiris.vS.min = function (x, vK1) {
	if (x < vK1) {
		return x;
	};
	return vK1;
};
com.wiris.vS.vKB = function (x, vLB) {
	var s = "";
	while (x != 0 && vLB-- > 0) {
		var d = x & 15;
		s = String.fromCharCode(d + (d >= 10 ? 55 : 48)) + s;
		x = x >> 4;
	};
	while (vLB-- > 0) {
		s = "0" + s;
	};
	return s;
};
com.wiris.vS.vMB = function (str) {
	return Std.parseInt("0x" + str);
};
com.wiris.vS.prototype.__class__ = com.wiris.vS;
com.wiris.vT = function (p) {
	if (p === v91) return; {
		com.wiris.vG.call(this);
	}
};
com.wiris.vT.__name__ = ["com", "wiris", "vT"];
com.wiris.vT.__super__ = com.wiris.vG;
for (var k in com.wiris.vG.prototype) com.wiris.vT.prototype[k] = com.wiris.vG.prototype[k];
com.wiris.vT.vRA = function (box, vY4, vd1, left, right) {
	var t;
	t = new com.wiris.vT();
	t.box = box;
	t.vY4 = vY4;
	t.vd1 = vd1;
	t.left = left;
	t.right = right;
	return t;
};
com.wiris.vT.vNB = function (vOB) {
	return null;
};
com.wiris.vT.prototype.box = null;
com.wiris.vT.prototype.vq2 = function (b) {
	var n;
	var i;
	n = b.vy2();
	var m = this.box.vy2(); {
		var v03 = 0;
		while (v03 < n) {
			var v13 = v03++;
			var c = b.vw2(n - v13 - 1);
			var vK9 = c.vd2.vG7();
			c.vd2.vPB(b.vd2);
			c.vd2.vPB(vK9);
			this.box.vq2(this.vY4, c);
		};
	};
	this.vd1 = this.vY4 + this.box.vy2() - m;
	this.box.v73();
};
com.wiris.vT.prototype.v78 = function (vr5) {
	if (this.left != null) this.left.v78(vr5);
	if (this.right != null) this.right.v78(vr5);
	this.box["delete"](this.vY4, this.vd1 - this.vY4);
	this.vd1 = this.vY4;
	this.box.v73();
	return true;
};
com.wiris.vT.prototype.vD7 = function () {
	return this.box;
};
com.wiris.vT.prototype.vb7 = function () {
	if (this.left != null) return this.left.vb7();
	var x = 0;
	var i; {
		var vz2 = 0,
			v03 = this.vY4;
		while (vz2 < v03) {
				var v13 = vz2++;
				x += com.wiris.vm.vU7(this.box.vw2(v13));
			};
	};
	return x + com.wiris.vm.vX9(this.box) + this.vY4;
};
com.wiris.vT.prototype.va7 = function () {
	if (this.right != null) return this.right.va7();
	var x = 0;
	var i; {
		var vz2 = 0,
			v03 = this.vd1;
		while (vz2 < v03) {
				var v13 = vz2++;
				x += com.wiris.vm.vU7(this.box.vw2(v13));
			};
	};
	return x + com.wiris.vm.vX9(this.box) + this.vd1;
};
com.wiris.vT.prototype.vY7 = function () {
	return this.box.vZ4(this.vY4, false);
};
com.wiris.vT.prototype.vn5 = function () {
	var t = new com.wiris.vP();
	var i;
	if (this.left != null) t.vx2(this.left.vn5()); {
		var vz2 = this.vY4,
			v03 = this.vd1;
		while (vz2 < v03) {
				var v13 = vz2++;
				t.vx2(this.box.vw2(v13).vB3());
			};
	};
	if (this.right != null) t.vx2(this.right.vn5());
	com.wiris.vm.vA3(this.box, t);
	return t;
};
com.wiris.vT.prototype.__class__ = com.wiris.vT;
com.wiris.vU = function (p) {
	if (p === v91) return; {
		com.wiris.vT.call(this);
	}
};
com.wiris.vU.__name__ = ["com", "wiris", "vU"];
com.wiris.vU.__super__ = com.wiris.vT;
for (var k in com.wiris.vT.prototype) com.wiris.vU.prototype[k] = com.wiris.vT.prototype[k];
com.wiris.vU.ve5 = function (box, vY4, vd1, vU5, left, right) {
	var t;
	t = new com.wiris.vU();
	t.box = box;
	t.vY4 = vY4;
	t.vd1 = vd1;
	if (left != null) {
		t.vY4--;
		if (right == null && t.vd1 - t.vY4 == 1) {
			t.vd1++;
			if (t.vd1 == box.vW4()) {
				t.vY4 = 0;
				t.vd1--;
			};
		};
	};
	if (right != null) {
		t.vd1++;
		if (left == null && t.vd1 - t.vY4 == 1) {
			t.vY4--;
			if (t.vY4 == -1) {
				t.vY4 = 0;
				t.vd1 = box.vW4() - 1;
			};
		};
	};
	t.vU5 = vU5;
	return t;
};
com.wiris.vU.prototype.vY7 = function () {
	return false;
};
com.wiris.vU.prototype.vR9 = function () {
	return false;
};
com.wiris.vU.prototype.vS9 = function () {
	return false;
};
com.wiris.vU.prototype.v78 = function (vr5) {
	var x = ((function (vH4) {
		var vI4;
		var vm4 = vH4.box;
		if (Std["is"](vm4, com.wiris.v8)) vm4;
		else throw "Class cast error";
		vI4 = vm4;
		return vI4;
	}(this))).vq5(this.vY4, this.vd1, this.vU5, vr5);
	if (x == -1) return false;
	this.vU5 = 0;
	if (x == -2) {
		this.vU5 = 1;
		this.vd1 = this.vY4;
		return true;
	};
	if (x == -3) {
		this.vU5 = 2;
		this.vd1 = this.vY4;
		return true;
	};
	this.vd1 = x;
	return true;
};
com.wiris.vU.prototype.vq2 = function (b) {
	this.vd1 = ((function (vH4) {
		var vI4;
		var vm4 = vH4.box;
		if (Std["is"](vm4, com.wiris.v8)) vm4;
		else throw "Class cast error";
		vI4 = vm4;
		return vI4;
	}(this))).vt5(this.vY4, this.vd1, this.vU5, (function (vH4) {
		var vI4;
		var vm4 = b;
		if (Std["is"](vm4, com.wiris.v8)) vm4;
		else throw "Class cast error";
		vI4 = vm4;
		return vI4;
	}(this)));
};
com.wiris.vU.prototype.vn5 = function () {
	return ((function (vH4) {
		var vI4;
		var vm4 = vH4.box;
		if (Std["is"](vm4, com.wiris.v8)) vm4;
		else throw "Class cast error";
		vI4 = vm4;
		return vI4;
	}(this))).vn5(this.vY4, this.vd1);
};
com.wiris.vU.prototype.v58 = function () {
	return true;
};
com.wiris.vU.prototype.__class__ = com.wiris.vU;
com.wiris.vV = function (vGA, action, vMA, vQB) {
	if (vGA === v91) return; {
		com.wiris.vM.call(this, vGA, action);
		this.value = vQB;
		this.vMA = vMA;
	}
};
com.wiris.vV.__name__ = ["com", "wiris", "vV"];
com.wiris.vV.__super__ = com.wiris.vM;
for (var k in com.wiris.vM.prototype) com.wiris.vV.prototype[k] = com.wiris.vM.prototype[k];
com.wiris.vV.prototype.vMA = null;
com.wiris.vV.prototype.vHA = function (value) {
	return true;
};
com.wiris.vV.prototype.vRB = function (color) {
	this.vBA(color);
	this.vGA.vx9(this);
};
com.wiris.vV.prototype.vJA = function () {
	return this;
};
com.wiris.vV.prototype.__class__ = com.wiris.vV;
IntIter = function (min, max) {
	if (min === v91) return; {
		this.min = min;
		this.max = max;
	}
};
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function () {
	return this.min < this.max;
};
IntIter.prototype.next = function () {
	return this.min++;
};
IntIter.prototype.__class__ = IntIter;
com.wiris.vW = function (vX6, element) {
	if (vX6 === v91) return; {
		this.vX6 = vX6;
		this.element = element;
	}
};
com.wiris.vW.__name__ = ["com", "wiris", "vW"];
com.wiris.vW.prototype.vX6 = null;
com.wiris.vW.prototype.element = null;
com.wiris.vW.prototype.__class__ = com.wiris.vW;
Hash = function (p) {
	if (p === v91) return; {
		this.h = {};
		if (this.h.__proto__ != null) {
			this.h.__proto__ = null;
			delete(this.h.__proto__);
		} else null;
	}
};
Hash.__name__ = ["Hash"];
Hash.prototype.h = null;
Hash.prototype.set = function (vU1, value) {
	this.h["$" + vU1] = value;
};
Hash.prototype.get = function (vU1) {
	return this.h["$" + vU1];
};
Hash.prototype.exists = function (vU1) {
	try {
		vU1 = "$" + vU1;
		return this.vXA.call(this.h, vU1);
	} catch (vJ4) {
		{
			var e = vJ4; {
				for (var i in this.h) if (i == vU1) return true;;
				return false;
			};
		};
	};
};
Hash.prototype.remove = function (vU1) {
	if (!this.exists(vU1)) return false;
	delete(this.h["$" + vU1]);
	return true;
};
Hash.prototype.keys = function () {
	var a = new Array();
	for (var i in this.h) a.push(i.substr(1));;
	return a.iterator();
};
Hash.prototype.iterator = function () {
	return {
		ref: this.h,
		vSB: this.keys(),
		hasNext: function () {
			return this.vSB.hasNext();
		},
		next: function () {
			var i = this.vSB.next();
			return this.ref["$" + i];
		}
	};
};
Hash.prototype.toString = function () {
	var s = new StringBuf();
	s.b[s.b.length] = "{";
	var vSB = this.keys(); {
		var vYA = vSB;
		while (vYA.hasNext()) {
			var i = vYA.next(); {
				s.b[s.b.length] = i;
				s.b[s.b.length] = " => ";
				s.b[s.b.length] = Std.string(this.get(i));
				if (vSB.hasNext()) s.b[s.b.length] = ", ";
			};
		}
	};
	s.b[s.b.length] = "}";
	return s.b.join("");
};
Hash.prototype.__class__ = Hash;
com.wiris.vX = function (p) {
	if (p === v91) return; {
		this.vTB = new Array();
		this.vUB = new Array();
		this.vd2 = new Array();
		this.currentStyle = new com.wiris.vy();
		this.vU5 = com.wiris.vX.vq6;
		this.vVB = true;
	}
};
com.wiris.vX.__name__ = ["com", "wiris", "vX"];
com.wiris.vX.prototype.vU5 = null;
com.wiris.vX.prototype.current = null;
com.wiris.vX.prototype.vWB = null;
com.wiris.vX.prototype.vXB = null;
com.wiris.vX.prototype.vYB = null;
com.wiris.vX.prototype.vVB = null;
com.wiris.vX.prototype.vTB = null;
com.wiris.vX.prototype.vUB = null;
com.wiris.vX.prototype.vd2 = null;
com.wiris.vX.prototype.currentStyle = null;
com.wiris.vX.prototype.vZB = null;
com.wiris.vX.prototype.vaB = null;
com.wiris.vX.prototype.vbB = null;
com.wiris.vX.prototype.vcB = null;
com.wiris.vX.prototype.vs6 = null;
com.wiris.vX.prototype.vp6 = function (m) {
	this.vU5 = m;
	if (this.vU5 == com.wiris.vX.vdB) {
		this.vZB = new Hash();
	};
	if (this.vU5 == com.wiris.vX.veB) {
		this.vcB = new com.wiris.vi();
	};
};
com.wiris.vX.prototype.vl7 = function () {
	return this.vU5;
};
com.wiris.vX.prototype.vT3 = function (name, s, vx3) {
	return this.vfB(name, s, vx3, "string");
};
com.wiris.vX.prototype.vgB = function (name, h, vx3) {
	var s = com.wiris.v31.vhB(h);
	var viB = com.wiris.v31.vhB(vx3);
	s = this.vT3(name, s, viB);
	if (s == null) return null;
	return com.wiris.v31.vjB(s);
};
com.wiris.vX.prototype.vfB = function (name, obj, vx3, type) {
	if (this.vU5 == com.wiris.vX.vV5) {
		if (!StringTools.startsWith(name, "#")) {
			if (obj == null || obj == vx3 && obj == null || obj == vx3) this.current.remove(name);
			else this.current.set(name, obj.toString());
		};
	} else if (this.vU5 == com.wiris.vX.vX5) {
		if (!StringTools.startsWith(name, "#")) {
			var v = com.wiris.v21.getAttribute(this.current, name);
			if (v == null) return this.vkB(vx3);
			return v;
		};
	} else if (this.vU5 == com.wiris.vX.vlB) {
		if (!StringTools.startsWith(name, "#")) return this.vkB(vx3);
	} else if (this.vU5 == com.wiris.vX.vmB) {
		var v = this.vZB.get(name);
		if (v == null) return this.vkB(vx3);
		return v;
	} else if (this.vU5 == com.wiris.vX.vdB) {
		if (obj == null) this.vZB.remove(name);
		else this.vZB.set(name, obj.toString());
	} else if (this.vU5 == com.wiris.vX.veB) {
		var vq4 = new Array();
		vq4[0] = name;
		vq4[1] = obj;
		vq4[2] = vx3;
		vq4[3] = type;
		this.vcB.vnB.push(vq4);
	};
	return this.vkB(obj);
};
com.wiris.vX.prototype.vkB = function (obj) {
	if (obj == null) return null;
	return obj.toString();
};
com.wiris.vX.prototype.vHB = function (name, b, vx3) {
	var obj = this.vfB(name, b, vx3, "boolean");
	if (obj == null) return vx3;
	return obj == "true";
};
com.wiris.vX.prototype.vT5 = function (name, b, vx3) {
	var obj = this.vfB(name, b, vx3, "integer");
	if (obj == null) return vx3;
	return Std.parseInt(obj);
};
com.wiris.vX.prototype.vR5 = function (name, v, voB, vx3) {
	if (this.vU5 == com.wiris.vX.vV5) return v;
	return vx3;
};
com.wiris.vX.prototype.vGB = function (s, vx3) {
	if (this.vU5 == com.wiris.vX.vV5) {
		var ve4 = com.wiris.v21.createPCData(this.current, s);
		this.current.addChild(ve4);
	} else if (this.vU5 == com.wiris.vX.vX5) {
		return com.wiris.v21.htmlUnescape(com.wiris.v21.vpB(this.current));
	} else if (this.vU5 == com.wiris.vX.vmB) {
		var v = this.vZB.get("#text");
		if (v == null) return this.vkB(vx3);
		return v;
	} else if (this.vU5 == com.wiris.vX.vdB) {
		if (s == null) this.vZB.remove("#text");
		else this.vZB.set("#text", s);
	};
	return s;
};
com.wiris.vX.prototype.vq3 = function (box, tag, current, vqB) {
	if (this.vU5 == com.wiris.vX.vq6) {
		this.vaB = null;
		com.wiris.vX.vrB.set(tag, box);
	};
	if (this.vU5 == com.wiris.vX.vsB) {
		if (current == vqB) this.vaB = tag;
	};
	if (this.vU5 == com.wiris.vX.veB) {
		if (current == vqB) this.vbB = tag;
	};
	if (this.vU5 == com.wiris.vX.vV5) {
		if (current == vqB) this.vbB = tag;
	};
	if (this.vU5 == com.wiris.vX.vX5) {
		if (this.vYB == tag) {
			this.vbB = tag;
			return vqB;
		};
	};
	return current;
};
com.wiris.vX.prototype.vp3 = function () {
	if (this.vU5 == com.wiris.vX.vX5) {
		var node = this.vXB[this.vWB];
		this.vYB = node.getNodeName();
	};
};
com.wiris.vX.prototype.vr3 = function (box) {
	if (this.vbB != null) this.vS3(box, this.vbB);
};
com.wiris.vX.prototype.vS3 = function (box, tag) {
	var b = this.vY5(box, tag);
	if (!b) throw "Tag " + tag + " not found.";
};
com.wiris.vX.prototype.vY5 = function (box, tag) {
	if (this.vU5 == com.wiris.vX.vq6) {
		com.wiris.vX.vrB.set(tag, box);
	};
	if (this.vU5 == com.wiris.vX.vsB) {
		this.vaB = tag;
	};
	if (this.vU5 == com.wiris.vX.veB) {
		this.vcB.vA9 = tag;
	};
	if (this.vU5 == com.wiris.vX.vV5) {
		var ve4 = Xml.createElement(tag);
		this.current.addChild(ve4);
		this.current = ve4;
		this.vtB(box);
	};
	if (this.vU5 == com.wiris.vX.vX5) {
		if (this.vuB(tag)) {
			this.vtB(box);
		} else {
			return false;
		};
	};
	return true;
};
com.wiris.vX.prototype.vuB = function (tag) {
	if (this.vWB >= this.vXB.length) return false;
	var node = this.vXB[this.vWB];
	if (!(node.getNodeName() == tag)) return false;
	this.vWB++;
	this.vvB();
	this.current = node;
	this.vWB = 0;
	this.vXB = com.wiris.v21.getElements(this.current);
	return true;
};
com.wiris.vX.prototype.vs3 = function () {
	if (this.vU5 == com.wiris.vX.vV5) {
		this.vwB();
		this.current = this.current.getParent();
	} else if (this.vU5 == com.wiris.vX.vX5) {
		this.vwB();
		this.vxB();
	};
};
com.wiris.vX.prototype.vU3 = function (tag) {
	if (this.vU5 == com.wiris.vX.vV5) {
		var name = this.current.getNodeName();
		if (!(name == tag)) throw "Begin and end tags do not match.";
	};
	this.vs3();
};
com.wiris.vX.prototype.vvB = function () {
	this.vUB.push(this.vXB);
	this.vTB.push(this.vWB);
};
com.wiris.vX.prototype.vxB = function () {
	this.vXB = this.vUB.pop();
	this.vWB = this.vTB.pop();
	this.current = this.current.getParent();
};
com.wiris.vX.prototype.v63 = function (box) {
	var vyB = this.vVB;
	this.vVB = false;
	if (this.vU5 == com.wiris.vX.vV5) {
		var i; {
			var vz2 = 0,
				v03 = box.vy2();
			while (vz2 < v03) {
					var v13 = vz2++;
					this.vW5(box.vw2(v13));
				};
		};
	} else if (this.vU5 == com.wiris.vX.vX5) {
		var b;
		do {
			b = this.vzB();
			if (b != null) box.vx2(b);
		} while (b != null);
	};
	this.vVB = vyB;
};
com.wiris.vX.prototype.vC4 = function (box, pos) {
	var i;
	if (this.vU5 == com.wiris.vX.vV5) {
		{
			var vz2 = 0,
				v03 = pos.length;
			while (vz2 < v03) {
					var v13 = vz2++;
					this.vW5(box.vw2(pos[v13]));
				};
		};
	} else if (this.vU5 == com.wiris.vX.vX5) {
		var vs2 = new Array(); {
			var vz2 = 0,
				v03 = pos.length;
			while (vz2 < v03) {
					var v13 = vz2++;
					vs2[pos[v13]] = this.vzB();
				};
		}; {
			var vz2 = 0,
				v03 = pos.length;
			while (vz2 < v03) {
					var v13 = vz2++;
					box.vx2(vs2[v13]);
				};
		};
	};
};
com.wiris.vX.prototype.v0C = function (box) {
	if (this.vU5 == com.wiris.vX.vV5) {
		var i;
		var n = box.vy2(); {
			var vz2 = 0,
				v03 = box.vy2();
			while (vz2 < v03) {
					var v13 = vz2++;
					this.vW5(box.vw2(n - v13 - 1));
				};
		};
	} else if (this.vU5 == com.wiris.vX.vX5) {
		var b;
		do {
			b = this.vzB();
			if (b != null) box.vq2(0, b);
		} while (b != null);
	};
};
com.wiris.vX.prototype.v1C = function (box, i) {
	if (this.vU5 == com.wiris.vX.vV5) {
		this.vW5(box.vw2(i));
	} else if (this.vU5 == com.wiris.vX.vX5) {
		var b = this.vzB();
		box.vx2(b);
	};
};
com.wiris.vX.prototype.vzB = function () {
	if (this.vWB < this.vXB.length) {
		var node = this.vXB[this.vWB];
		var v2C = com.wiris.vX.vrB.get(node.getNodeName());
		if (v2C == null) throw "Unknown node " + node.getNodeName();
		var b = v2C.vB3();
		this.vW5(b);
		return b;
	};
	return null;
};
com.wiris.vX.prototype.vW5 = function (box) {
	if (this.vU5 == com.wiris.vX.veB) {
		this.vcB = new com.wiris.vi();
	};
	box.v53(this);
};
com.wiris.vX.prototype.vX8 = function (box) {
	var top = Xml.createDocument();
	this.current = top;
	this.vW5(box);
	return this.current;
};
com.wiris.vX.prototype.vZ8 = function (xml) {
	this.current = xml;
	this.vXB = com.wiris.v21.getElements(xml);
	this.vWB = 0;
	var vO7 = this.vzB();
	if (vO7 == null) {
		var ve8 = new com.wiris.vR();
		var text = xml.toString();
		ve8.vf8(com.wiris.v21.htmlUnescape(text));
		return ve8;
	};
	return vO7;
};
com.wiris.vX.prototype.vtB = function (box) {
	this.vd2.push(this.currentStyle);
	var v3C;
	if (this.vs6 != null) {
		var v4C = this.vs6.getDefaultStyles();
		var v5C = this.vs6.vo6(box);
		var v6C;
		v6C = com.wiris.vy.join(v4C, v5C);
		v6C = com.wiris.vy.join(v6C, this.currentStyle);
		v6C.v7C(com.wiris.vy.v8C);
		v3C = v6C;
	} else {
		v3C = this.currentStyle;
	};
	v3C = this.v9C(v3C, null);
	var style = com.wiris.vy.vAC(box.vd2, v3C);
	style = this.v9C(style, v3C);
	var v1B = false;
	var bold = false;
	var italic = false;
	if (style.isFlagMask(com.wiris.vy.vV2) || style.isFlagMask(com.wiris.vy.vU2)) {
		v1B = true;
		bold = style.isFlag(com.wiris.vy.vV2);
		italic = style.isFlag(com.wiris.vy.vU2);
	};
	var vBC;
	if (v1B) {
		if (bold && italic) {
			vBC = "bold-italic";
		} else if (bold) {
			vBC = "bold";
		} else if (italic) {
			vBC = "italic";
		} else {
			vBC = "normal";
		};
	} else {
		vBC = "";
	};
	var vCC = null;
	if (this.vU5 == com.wiris.vX.vV5) {
		vCC = com.wiris.vy.vDC(style);
	};
	vCC = this.vgB("style", vCC, null);
	if (vCC != null && this.vU5 == com.wiris.vX.vX5) {
		var vs2 = new com.wiris.vy();
		vs2.setParams(vCC);
		style.vPB(vs2);
	};
	var vEC = this.vT3("mathvariant", vBC, "");
	var color = "";
	if (style.isFlagMask(com.wiris.vy.vFC)) {
		color = "#" + com.wiris.vS.vKB(style.getColor(), 6);
	};
	color = this.vT3("mathcolor", color, "");
	var displaystyle = "";
	if (style.isFlagMask(com.wiris.vy.v8C)) {
		displaystyle = style.getDisplayStyle() ? "true" : "false";
	};
	displaystyle = this.vT3("displaystyle", displaystyle, "");
	if (this.vU5 == com.wiris.vX.vX5) {
		v1B = false;
		if (vEC == "bold-italic") {
			v1B = true;
			bold = true;
			italic = true;
		} else if (vEC == "bold") {
			v1B = true;
			bold = true;
			italic = false;
		} else if (vEC == "italic") {
			v1B = true;
			bold = false;
			italic = true;
		} else if (vEC == "normal") {
			v1B = true;
			bold = false;
			italic = false;
		};
		if (v1B) {
			if (v3C == null || v3C.isFlag(com.wiris.vy.vU2) != italic) style.vv6(com.wiris.vy.vU2, italic);
			if (v3C == null || v3C.isFlag(com.wiris.vy.vV2) != bold) style.vv6(com.wiris.vy.vV2, bold);
		};
		if (color.length > 0) {
			style.setColor(com.wiris.vS.vMB(color.substr(1)));
		};
		if (displaystyle.length > 0) {
			style.vw6(displaystyle == "true" ? true : false);
		};
		box.vd2 = style;
	};
	this.currentStyle = com.wiris.vy.join(this.currentStyle, style);
};
com.wiris.vX.prototype.vwB = function () {
	this.currentStyle = this.vd2.pop();
};
com.wiris.vX.prototype.vGC = function () {
	return this.vaB;
};
com.wiris.vX.prototype.vHC = function () {
	return this.vcB;
};
com.wiris.vX.prototype.vW8 = function (vIC) {
	this.vs6 = vIC;
};
com.wiris.vX.prototype.v9C = function (vJC, vKC) {
	var vs2 = com.wiris.vy.vH9(vJC);
	if (vJC.isFlagMask(com.wiris.vy.vU2)) {
		if (!vJC.isFlagMask(com.wiris.vy.vV2)) {
			var b = vKC == null ? false : vKC.isFlag(com.wiris.vy.vV2);
			vs2.vv6(com.wiris.vy.vV2, b);
		};
	} else {
		if (vJC.isFlagMask(com.wiris.vy.vV2)) {
			var b = vKC == null ? false : vKC.isFlag(com.wiris.vy.vU2);
			vs2.vv6(com.wiris.vy.vU2, b);
		};
	};
	return vs2;
};
com.wiris.vX.prototype.__class__ = com.wiris.vX;
com.wiris.vY = function (p) {
	if (p === v91) return; {
		com.wiris.v1.call(this);
	}
};
com.wiris.vY.__name__ = ["com", "wiris", "vY"];
com.wiris.vY.__super__ = com.wiris.v1;
for (var k in com.wiris.v1.prototype) com.wiris.vY.prototype[k] = com.wiris.v1.prototype[k];
com.wiris.vY.prototype.bevelled = null;
com.wiris.vY.prototype.vl2 = function (vm2) {
	if (this.bevelled) {
		this.vLC(vm2);
	} else {
		this.vMC(vm2);
	};
};
com.wiris.vY.prototype.vMC = function (vm2) {
	com.wiris.vm.vNC(this, vm2.getLength(0.3));
	var vl5;
	var vm5;
	var vs2;
	var voA;
	vl5 = this.vw2(0);
	vm5 = this.vw2(1);
	vs2 = new Array();
	voA = vm2.getMiddle();
	vs2[0] = -voA - vm2.getLength(0.1) - (vl5.height - vl5.baseline);
	vs2[1] = -voA + vm2.getLength(0.1) + vm5.baseline;
	com.wiris.vm.vo3(vm2, this, vs2);
};
com.wiris.vY.prototype.vLC = function (vm2) {
	var vl5 = this.vw2(0);
	var vm5 = this.vw2(1);
	var vg4 = vm2.getLength(0.3);
	this.height = com.wiris.va.max(vl5.height, vm5.height) + vg4;
	vl5.vK1 = Math.round(Math.round((this.height - vg4 - vl5.height) / 2.0));
	vm5.vK1 = vg4 + Math.round(Math.round((this.height - vg4 - vm5.height) / 2.0));
	this.baseline = Math.round(Math.round(this.height / 2.0)) + vm2.getMiddle();
	vl5.x = 0;
	vm5.x = vl5.x + vl5.width + Math.round(Math.floor((vl5.vK1 + vl5.height - vm5.vK1 + 1) / 2.0)) + 1;
	this.width = vm5.x + vm5.width;
};
com.wiris.vY.prototype.vp2 = function (vm2) {
	var vC9 = vm2.getLength(0.1);
	if (this.bevelled) {
		var vg4 = vm2.getLength(0.3);
		var vOC = vm2.getLength(0.06);
		var vl5 = this.vw2(0);
		var vPC = -((vl5.vK1 + vl5.height) / -2.0) + vl5.width;
		vm2.drawLine((function (vH4) {
			var vI4;
			var vm4 = Math.round((vH4.height - vg4) / -2.0 + vPC);
			if (Std["is"](vm4, Int)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this)) - vOC, this.height - vg4 + 2 * vOC, (function (vH4) {
			var vI4;
			var vm4 = Math.round(vg4 / -2.0 + vPC);
			if (Std["is"](vm4, Int)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this)) + vOC, 2 * Math.round(Math.round((vg4 - 1) / 2.0)) - 2 * vOC);
	} else {
		vm2.drawHorizontalLine(0, vC9, this.baseline - vm2.getMiddle(), this.width - 2 * vC9);
	};
};
com.wiris.vY.prototype.v53 = function (s) {
	s.vS3(this, "mfrac");
	this.bevelled = s.vHB("bevelled", this.bevelled, false);
	s.v63(this);
	s.vU3("mfrac");
};
com.wiris.vY.prototype.vo2 = function () {
	com.wiris.v1.prototype.vo2.call(this);
	if (this.vd2.getDisplayStyle()) {
		this.vw2(0).vd2.vw6(false);
		this.vw2(1).vd2.vw6(false);
	};
};
com.wiris.vY.prototype.v23 = function () {
	com.wiris.vm.vV3(this);
};
com.wiris.vY.prototype.vB3 = function () {
	var vW3;
	vW3 = new com.wiris.vY();
	this.v83(vW3);
	return vW3;
};
com.wiris.vY.prototype.__class__ = com.wiris.vY;
com.wiris.vZ = function (p) {
	if (p === v91) return; {
		this.vQC = new Array();
	}
};
com.wiris.vZ.__name__ = ["com", "wiris", "vZ"];
com.wiris.vZ.prototype.vQC = null;
com.wiris.vZ.prototype.vRC = function (section) {
	this.vQC.push(section);
};
com.wiris.vZ.prototype.v0A = function () {
	return this.vQC.length;
};
com.wiris.vZ.prototype.v1A = function (vSC) {
	return this.vQC[vSC];
};
com.wiris.vZ.prototype.__class__ = com.wiris.vZ;
com.wiris.va = function () {};
com.wiris.va.__name__ = ["com", "wiris", "va"];
com.wiris.va.max = function (x, vK1) {
	if (x > vK1) return x;
	return vK1;
};
com.wiris.va.min = function (x, vK1) {
	if (x < vK1) return x;
	return vK1;
};
com.wiris.va.prototype.__class__ = com.wiris.va;
ValueType = {
	vTC: ["ValueType"],
	vUC: ["TNull", "TInt", "TFloat", "TBool", "TObject", "TFunction", "TClass", "TEnum", "TUnknown"]
};
ValueType.TNull = ["TNull", 0];
ValueType.TNull.toString = v71;
ValueType.TNull.vcA = ValueType;
ValueType.TInt = ["TInt", 1];
ValueType.TInt.toString = v71;
ValueType.TInt.vcA = ValueType;
ValueType.TFloat = ["TFloat", 2];
ValueType.TFloat.toString = v71;
ValueType.TFloat.vcA = ValueType;
ValueType.TBool = ["TBool", 3];
ValueType.TBool.toString = v71;
ValueType.TBool.vcA = ValueType;
ValueType.TObject = ["TObject", 4];
ValueType.TObject.toString = v71;
ValueType.TObject.vcA = ValueType;
ValueType.TFunction = ["TFunction", 5];
ValueType.TFunction.toString = v71;
ValueType.TFunction.vcA = ValueType;
ValueType.TClass = function (c) {
	var vVC = ["TClass", 6, c];
	vVC.vcA = ValueType;
	vVC.toString = v71;
	return vVC;
};
ValueType.TEnum = function (e) {
	var vVC = ["TEnum", 7, e];
	vVC.vcA = ValueType;
	vVC.toString = v71;
	return vVC;
};
ValueType.TUnknown = ["TUnknown", 8];
ValueType.TUnknown.toString = v71;
ValueType.TUnknown.vcA = ValueType;
Type = function () {};
Type.__name__ = ["Type"];
Type.getClass = function (o) {
	if (o == null) return null;
	if (o.vcA != null) return null;
	return o.__class__;
};
Type.getEnum = function (o) {
	if (o == null) return null;
	return o.vcA;
};
Type.getSuperClass = function (c) {
	return c.__super__;
};
Type.getClassName = function (c) {
	var a = c.__name__;
	return a.join(".");
};
Type.getEnumName = function (e) {
	var a = e.vTC;
	return a.join(".");
};
Type.resolveClass = function (name) {
	var vWC;
	try {
		vWC = eval(name);
	} catch (vJ4) {
		{
			var e = vJ4; {
				vWC = null;
			};
		};
	};
	if (vWC == null || vWC.__name__ == null) return null;
	return vWC;
};
Type.resolveEnum = function (name) {
	var e;
	try {
		e = eval(name);
	} catch (vJ4) {
		{
			var vXC = vJ4; {
				e = null;
			};
		};
	};
	if (e == null || e.vTC == null) return null;
	return e;
};
Type.createInstance = function (vWC, args) {
	if (args.length <= 3) return new vWC(args[0], args[1], args[2]);
	if (args.length > 8) throw "Too many arguments";
	return new vWC(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
};
Type.createEmptyInstance = function (vWC) {
	return new vWC(v91);
};
Type.createEnum = function (e, vYC, params) {
	var f = Reflect.field(e, vYC);
	if (f == null) throw "No such constructor " + vYC;
	if (Reflect.isFunction(f)) {
		if (params == null) throw "Constructor " + vYC + " need parameters";
		return f.apply(e, params);
	};
	if (params != null && params.length != 0) throw "Constructor " + vYC + " does not need parameters";
	return f;
};
Type.createEnumIndex = function (e, index, params) {
	var c = Type.getEnumConstructs(e)[index];
	if (c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e, c, params);
};
Type.getInstanceFields = function (c) {
	var a = Reflect.fields(c.prototype);
	a.remove("__class__");
	return a;
};
Type.getClassFields = function (c) {
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__super__");
	a.remove("prototype");
	return a;
};
Type.getEnumConstructs = function (e) {
	return e.vUC;
};
Type["typeof"] = function (v) {
	switch (typeof(v)) {
	case "boolean":
		{
			return ValueType.TBool;
		}
		break;
	case "string":
		{
			return ValueType.TClass(String);
		}
		break;
	case "number":
		{
			if (Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
			return ValueType.TFloat;
		}
		break;
	case "object":
		{
			if (v == null) return ValueType.TNull;
			var e = v.vcA;
			if (e != null) return ValueType.TEnum(e);
			var c = v.__class__;
			if (c != null) return ValueType.TClass(c);
			return ValueType.TObject;
		}
		break;
	case "function":
		{
			if (v.__name__ != null) return ValueType.TObject;
			return ValueType.TFunction;
		}
		break;
	case "undefined":
		{
			return ValueType.TNull;
		}
		break;
	default:
		{
			return ValueType.TUnknown;
		}
		break;
	};
};
Type.enumEq = function (a, b) {
	if (a == b) return true;
	try {
		if (a[0] != b[0]) return false; {
			var vz2 = 2,
				v03 = a.length;
			while (vz2 < v03) {
					var i = vz2++;
					if (!Type.enumEq(a[i], b[i])) return false;
				};
		};
		var e = a.vcA;
		if (e != b.vcA || e == null) return false;
	} catch (vJ4) {
		{
			var e = vJ4; {
				return false;
			};
		};
	};
	return true;
};
Type.enumConstructor = function (e) {
	return e[0];
};
Type.enumParameters = function (e) {
	return e.slice(2);
};
Type.enumIndex = function (e) {
	return e[1];
};
Type.prototype.__class__ = Type;
if (typeof js == 'undefined') js = {};
js.Boot = function () {};
js.Boot.__name__ = ["js", "Boot"];
js.Boot.__unhtml = function (s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function (v, i) {
	var vP4 = i != null ? i.fileName + ":" + i.lineNumber + ": " : "";
	vP4 += js.Boot.__unhtml(js.Boot.__string_rec(v, "")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if (d == null) alert("No haxe:trace element defined\n" + vP4);
	else d.innerHTML += vP4;
};
js.Boot.__clear_trace = function () {
	var d = document.getElementById("haxe:trace");
	if (d != null) d.innerHTML = "";
	else null;
};
js.Boot.__closure = function (o, f) {
	var m = o[f];
	if (m == null) return null;
	var vaA = function () {
		return m.apply(o, arguments);
	};
	vaA.scope = o;
	vaA.method = m;
	return vaA;
};
js.Boot.__string_rec = function (o, s) {
	if (o == null) return "null";
	if (s.length >= 5) return "<...>";
	var t = typeof(o);
	if (t == "function" && (o.__name__ != null || o.vTC != null)) t = "object";
	switch (t) {
	case "object":
		{
			if (o instanceof Array) {
				if (o.vcA != null) {
					if (o.length == 2) return o[0];
					var str = o[0] + "(";
					s += "\t"; {
						var vz2 = 2,
							v03 = o.length;
						while (vz2 < v03) {
								var i = vz2++;
								if (i != 2) str += "," + js.Boot.__string_rec(o[i], s);
								else str += js.Boot.__string_rec(o[i], s);
							};
					};
					return str + ")";
				};
				var l = o.length;
				var i;
				var str = "[";
				s += "\t"; {
					var v03 = 0;
					while (v03 < l) {
						var v13 = v03++;
						str += (v13 > 0 ? "," : "") + js.Boot.__string_rec(o[v13], s);
					};
				};
				str += "]";
				return str;
			};
			var vZC;
			try {
				vZC = o.toString;
			} catch (vJ4) {
				{
					var e = vJ4; {
						return "???";
					};
				};
			};
			if (vZC != null && vZC != Object.toString) {
				var vaC = o.toString();
				if (vaC != "[object Object]") return vaC;
			};
			var k = null;
			var str = "{\n";
			s += "\t";
			var vbC = o.vXA != null;
			for (var k in o) {;
				if (vbC && !o.vXA(k)) continue;
				if (k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") continue;
				if (str.length != 2) str += ", \n";
				str += s + k + " : " + js.Boot.__string_rec(o[k], s);
			};
			s = s.vcC(1);
			str += "\n" + s + "}";
			return str;
		}
		break;
	case "function":
		{
			return "<function>";
		}
		break;
	case "string":
		{
			return o;
		}
		break;
	default:
		{
			return String(o);
		}
		break;
	};
};
js.Boot.__interfLoop = function (vpA, vWC) {
	if (vpA == null) return false;
	if (vpA == vWC) return true;
	var vdC = vpA.__interfaces__;
	if (vdC != null) {
		var vz2 = 0,
			v03 = vdC.length;
		while (vz2 < v03) {
				var i = vz2++;
				var v13 = vdC[i];
				if (v13 == vWC || js.Boot.__interfLoop(v13, vWC)) return true;
			};
	};
	return js.Boot.__interfLoop(vpA.__super__, vWC);
};
js.Boot.__instanceof = function (o, vWC) {
	try {
		if (o instanceof vWC) {
			if (vWC == Array) return o.vcA == null;
			return true;
		};
		if (js.Boot.__interfLoop(o.__class__, vWC)) return true;
	} catch (vJ4) {
		{
			var e = vJ4; {
				if (vWC == null) return false;
			};
		};
	};
	switch (vWC) {
	case Int:
		{
			return Math.ceil(o % 2147483648.0) === o;
		}
		break;
	case Float:
		{
			return typeof(o) == "number";
		}
		break;
	case Bool:
		{
			return o === true || o === false;
		}
		break;
	case String:
		{
			return typeof(o) == "string";
		}
		break;
	case Dynamic:
		{
			return true;
		}
		break;
	default:
		{
			if (o == null) return false;
			return o.vcA == vWC || vWC == Class && o.__name__ != null || vWC == Enum && o.vTC != null;
		}
		break;
	};
};
js.Boot.__init = function () {
	js.Lib.isIE = typeof document != 'undefined' && document.all != null && typeof window != 'undefined' && window.opera == null;
	js.Lib.isOpera = typeof window != 'undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function (i, x) {
		this.splice(i, 0, x);
	};
	Array.prototype.remove = Array.prototype.indexOf ?
	function (obj) {
		var veC = this.indexOf(obj);
		if (veC == -1) return false;
		this.splice(veC, 1);
		return true;
	} : function (obj) {
		var i = 0;
		var l = this.length;
		while (i < l) {
			if (this[i] == obj) {
				this.splice(i, 1);
				return true;
			};
			i++;
		};
		return false;
	};
	Array.prototype.iterator = function () {
		return {
			cur: 0,
			arr: this,
			hasNext: function () {
				return this.cur < this.arr.length;
			},
			next: function () {
				return this.arr[this.cur++];
			}
		};
	};
	if (String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function (i) {
		var x = this.cca(i);
		if (x != x) return null;
		return x;
	};
	var vfC = String.prototype.substr;
	String.prototype.substr = function (pos, len) {
		if (pos != null && pos != 0 && len != null && len < 0) return "";
		if (len == null) len = this.length;
		if (pos < 0) {
			pos = this.length + pos;
			if (pos < 0) pos = 0;
		} else if (len < 0) {
			len = this.length + len - pos;
		};
		return vfC.apply(this, [pos, len]);
	};
	vf9 = js.Boot.__closure;
};
js.Boot.prototype.__class__ = js.Boot;
EReg = function (r, opt) {
	if (r === v91) return; {
		opt = opt.split("u").join("");
		this.r = new RegExp(r, opt);
	}
};
EReg.__name__ = ["EReg"];
EReg.prototype.r = null;
EReg.prototype.match = function (s) {
	this.r.m = this.r.exec(s);
	this.r.s = s;
	this.r.l = RegExp.leftContext;
	this.r.r = RegExp.rightContext;
	return this.r.m != null;
};
EReg.prototype.matched = function (n) {
	return this.r.m != null && n >= 0 && n < this.r.m.length ? this.r.m[n] : (function (vH4) {
		var vI4;
		throw "EReg::matched";
		return vI4;
	}(this));
};
EReg.prototype.matchedLeft = function () {
	if (this.r.m == null) throw "No string matched";
	if (this.r.l == null) return this.r.s.substr(0, this.r.m.index);
	return this.r.l;
};
EReg.prototype.matchedRight = function () {
	if (this.r.m == null) throw "No string matched";
	if (this.r.r == null) {
		var vgC = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(vgC, this.r.s.length - vgC);
	};
	return this.r.r;
};
EReg.prototype.matchedPos = function () {
	if (this.r.m == null) throw "No string matched";
	return {
		pos: this.r.m.index,
		len: this.r.m[0].length
	};
};
EReg.prototype.split = function (s) {
	var d = "#__delim__#";
	return s.replace(this.r, d).split(d);
};
EReg.prototype.replace = function (s, vhC) {
	return s.replace(this.r, vhC);
};
EReg.prototype.customReplace = function (s, f) {
	var buf = new StringBuf();
	while (true) {
		if (!this.match(s)) break;
		buf.b[buf.b.length] = this.matchedLeft();
		buf.b[buf.b.length] = f(this);
		s = this.matchedRight();
	};
	buf.b[buf.b.length] = s;
	return buf.b.join("");
};
EReg.prototype.__class__ = EReg;
Xml = function (p) {
	if (p === v91) return; {
		null;
	}
};
Xml.__name__ = ["Xml"];
Xml.Element = null;
Xml.PCData = null;
Xml.CData = null;
Xml.Comment = null;
Xml.DocType = null;
Xml.Prolog = null;
Xml.Document = null;
Xml.parse = function (str) {
	var rules = [Xml.enode, Xml.epcdata, Xml.eend, Xml.ecdata, Xml.edoctype, Xml.ecomment, Xml.eprolog];
	var viC = rules.length;
	var current = Xml.createDocument();
	var stack = new List();
	while (str.length > 0) {
		var i = 0;
		try {
			while (i < viC) {
				var r = rules[i];
				if (r.match(str)) {
					switch (i) {
					case 0:
						{
							var x = Xml.createElement(r.matched(1));
							current.addChild(x);
							str = r.matchedRight();
							while (Xml.eattribute.match(str)) {
								x.set(Xml.eattribute.matched(1), Xml.eattribute.matched(3));
								str = Xml.eattribute.matchedRight();
							};
							if (!Xml.eclose.match(str)) {
								i = viC;
								throw "__break__";
							};
							if (Xml.eclose.matched(1) == ">") {
								stack.push(current);
								current = x;
							};
							str = Xml.eclose.matchedRight();
						}
						break;
					case 1:
						{
							var x = Xml.createPCData(r.matched(0));
							current.addChild(x);
							str = r.matchedRight();
						}
						break;
					case 2:
						{
							if (current._children != null && current._children.length == 0) {
								var e = Xml.createPCData("");
								current.addChild(e);
							} else null;
							if (r.matched(1) != current._nodeName || stack.isEmpty()) {
								i = viC;
								throw "__break__";
							} else null;
							current = stack.pop();
							str = r.matchedRight();
						}
						break;
					case 3:
						{
							str = r.matchedRight();
							if (!Xml.ecdata_end.match(str)) throw "End of CDATA section not found";
							var x = Xml.createCData(Xml.ecdata_end.matchedLeft());
							current.addChild(x);
							str = Xml.ecdata_end.matchedRight();
						}
						break;
					case 4:
						{
							var pos = 0;
							var count = 0;
							var v29 = str;
							try {
								while (true) {
									if (!Xml.edoctype_elt.match(str)) throw "End of DOCTYPE section not found";
									var p = Xml.edoctype_elt.matchedPos();
									pos += p.pos + p.len;
									str = Xml.edoctype_elt.matchedRight();
									switch (Xml.edoctype_elt.matched(0)) {
									case "[":
										{
											count++;
										}
										break;
									case "]":
										{
											count--;
											if (count < 0) throw "Invalid ] found in DOCTYPE declaration";
										}
										break;
									default:
										{
											if (count == 0) throw "__break__";
										}
										break;
									};
								};
							} catch (e) {
								if (e != "__break__") throw e;
							};
							var x = Xml.createDocType(v29.substr(10, pos - 11));
							current.addChild(x);
						}
						break;
					case 5:
						{
							if (!Xml.ecomment_end.match(str)) throw "Unclosed Comment";
							var p = Xml.ecomment_end.matchedPos();
							var x = Xml.createComment(str.substr(4, p.pos + p.len - 7));
							current.addChild(x);
							str = Xml.ecomment_end.matchedRight();
						}
						break;
					case 6:
						{
							var prolog = r.matched(0);
							var x = Xml.createProlog(prolog.substr(2, prolog.length - 4));
							current.addChild(x);
							str = r.matchedRight();
						}
						break;
					};
					throw "__break__";
				};
				i += 1;
			};
		} catch (e) {
			if (e != "__break__") throw e;
		};
		if (i == viC) {
			if (str.length > 10) throw "Xml parse error : Unexpected " + str.substr(0, 10) + "...";
			else throw "Xml parse error : Unexpected " + str;
		};
	};
	if (!stack.isEmpty()) throw "Xml parse error : Unclosed " + stack.last().getNodeName();
	return current;
};
Xml.createElement = function (name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new Hash();
	r.setNodeName(name);
	return r;
};
Xml.createPCData = function (vE4) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.setNodeValue(vE4);
	return r;
};
Xml.createCData = function (vE4) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.setNodeValue(vE4);
	return r;
};
Xml.createComment = function (vE4) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.setNodeValue(vE4);
	return r;
};
Xml.createDocType = function (vE4) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.setNodeValue(vE4);
	return r;
};
Xml.createProlog = function (vE4) {
	var r = new Xml();
	r.nodeType = Xml.Prolog;
	r.setNodeValue(vE4);
	return r;
};
Xml.createDocument = function () {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
};
Xml.prototype.nodeType = null;
Xml.prototype.nodeName = null;
Xml.prototype.nodeValue = null;
Xml.prototype.parent = null;
Xml.prototype._nodeName = null;
Xml.prototype._nodeValue = null;
Xml.prototype._attributes = null;
Xml.prototype._children = null;
Xml.prototype._parent = null;
Xml.prototype.getNodeName = function () {
	if (this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName;
};
Xml.prototype.setNodeName = function (n) {
	if (this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName = n;
};
Xml.prototype.getNodeValue = function () {
	if (this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue;
};
Xml.prototype.setNodeValue = function (v) {
	if (this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue = v;
};
Xml.prototype.getParent = function () {
	return this._parent;
};
Xml.prototype.get = function (att) {
	if (this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.get(att);
};
Xml.prototype.set = function (att, value) {
	if (this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.set(att, value);
};
Xml.prototype.remove = function (att) {
	if (this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.remove(att);
};
Xml.prototype.exists = function (att) {
	if (this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.exists(att);
};
Xml.prototype.attributes = function () {
	if (this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.keys();
};
Xml.prototype.iterator = function () {
	if (this._children == null) throw "bad nodetype";
	return {
		cur: 0,
		x: this._children,
		hasNext: function () {
			return this.cur < this.x.length;
		},
		next: function () {
			return this.x[this.cur++];
		}
	};
};
Xml.prototype.elements = function () {
	if (this._children == null) throw "bad nodetype";
	return {
		cur: 0,
		x: this._children,
		hasNext: function () {
			var k = this.cur;
			var l = this.x.length;
			while (k < l) {
				if (this.x[k].nodeType == Xml.Element) break;
				k += 1;
			};
			this.cur = k;
			return k < l;
		},
		next: function () {
			var k = this.cur;
			var l = this.x.length;
			while (k < l) {
				var n = this.x[k];
				k += 1;
				if (n.nodeType == Xml.Element) {
					this.cur = k;
					return n;
				};
			};
			return null;
		}
	};
};
Xml.prototype.elementsNamed = function (name) {
	if (this._children == null) throw "bad nodetype";
	return {
		cur: 0,
		x: this._children,
		hasNext: function () {
			var k = this.cur;
			var l = this.x.length;
			while (k < l) {
				var n = this.x[k];
				if (n.nodeType == Xml.Element && n._nodeName == name) break;
				k++;
			};
			this.cur = k;
			return k < l;
		},
		next: function () {
			var k = this.cur;
			var l = this.x.length;
			while (k < l) {
				var n = this.x[k];
				k++;
				if (n.nodeType == Xml.Element && n._nodeName == name) {
					this.cur = k;
					return n;
				};
			};
			return null;
		}
	};
};
Xml.prototype.firstChild = function () {
	if (this._children == null) throw "bad nodetype";
	return this._children[0];
};
Xml.prototype.firstElement = function () {
	if (this._children == null) throw "bad nodetype";
	var cur = 0;
	var l = this._children.length;
	while (cur < l) {
		var n = this._children[cur];
		if (n.nodeType == Xml.Element) return n;
		cur++;
	};
	return null;
};
Xml.prototype.addChild = function (x) {
	if (this._children == null) throw "bad nodetype";
	if (x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.push(x);
};
Xml.prototype.removeChild = function (x) {
	if (this._children == null) throw "bad nodetype";
	var b = this._children.remove(x);
	if (b) x._parent = null;
	return b;
};
Xml.prototype.insertChild = function (x, pos) {
	if (this._children == null) throw "bad nodetype";
	if (x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.insert(pos, x);
};
Xml.prototype.toString = function () {
	if (this.nodeType == Xml.PCData) return this._nodeValue;
	if (this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
	if (this.nodeType == Xml.Comment) return "<!--" + this._nodeValue + "-->";
	if (this.nodeType == Xml.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
	if (this.nodeType == Xml.Prolog) return "<?" + this._nodeValue + "?>";
	var s = new StringBuf();
	if (this.nodeType == Xml.Element) {
		s.b[s.b.length] = "<";
		s.b[s.b.length] = this._nodeName; {
			var vYA = this._attributes.keys();
			while (vYA.hasNext()) {
				var k = vYA.next(); {
					s.b[s.b.length] = " ";
					s.b[s.b.length] = k;
					s.b[s.b.length] = "=\"";
					s.b[s.b.length] = this._attributes.get(k);
					s.b[s.b.length] = "\"";
				};
			}
		};
		if (this._children.length == 0) {
			s.b[s.b.length] = "/>";
			return s.b.join("");
		};
		s.b[s.b.length] = ">";
	}; {
		var vL4 = this.iterator();
		while (vL4.hasNext()) {
			var x = vL4.next();
			s.b[s.b.length] = x.toString();
		}
	};
	if (this.nodeType == Xml.Element) {
		s.b[s.b.length] = "</";
		s.b[s.b.length] = this._nodeName;
		s.b[s.b.length] = ">";
	};
	return s.b.join("");
};
Xml.prototype.__class__ = Xml;
haxe.Timer = function (vjC) {
    if (vjC === v91) return;
    {
        this.id = haxe.Timer.arr.length;
        haxe.Timer.arr[this.id] = this;
        //this.timerId = window.setInterval("haxe.Timer.arr[" + this.id + "].run();", vjC);
        //lswweb 2012-08-12 使用上边注释掉的setInterval进行回调，会出现当调用了stop后，haxe.Timer.arr[xxx]已经是空值，但是还在执行，就造成异常报错
        var self = this;
        this.timerId = window.setInterval(function () {
            if (haxe.Timer.arr[self.id]) {
                haxe.Timer.arr[self.id].run();
            }
        }, vjC);
    }
};
haxe.Timer.__name__ = ["haxe", "Timer"];
haxe.Timer.delay = function (f, vjC) {
	var t = new haxe.Timer(vjC);
	t.run = function () {
		t.stop();
		f();
	};
	return t;
};
haxe.Timer.vkC = function (f, pos) {
	var vlC = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - vlC + "s", pos);
	return r;
};
haxe.Timer.stamp = function () {
	return Date.now().getTime() / 1000;
};
haxe.Timer.prototype.id = null;
haxe.Timer.prototype.timerId = null;
haxe.Timer.prototype.stop = function () {
	if (this.id == null) return;
	window.clearInterval(this.timerId);
	haxe.Timer.arr[this.id] = null;
	if (this.id > 100 && this.id == haxe.Timer.arr.length - 1) {
		var p = this.id - 1;
		while (p >= 0 && haxe.Timer.arr[p] == null) p--;
		haxe.Timer.arr = haxe.Timer.arr.slice(0, p + 1);
	};
	this.id = null;
};
haxe.Timer.prototype.run = function () {
	null;
};
haxe.Timer.prototype.__class__ = haxe.Timer;
com.wiris.vb = function (vGA, vMA, vmC, vQ4) {
	if (vGA === v91) return; {
		com.wiris.vM.call(this, vGA, null);
		this.vmC = vmC;
		this.vQ4 = vQ4;
		this.vMA = vMA;
	}
};
com.wiris.vb.__name__ = ["com", "wiris", "vb"];
com.wiris.vb.__super__ = com.wiris.vM;
for (var k in com.wiris.vM.prototype) com.wiris.vb.prototype[k] = com.wiris.vM.prototype[k];
com.wiris.vb.prototype.vmC = null;
com.wiris.vb.prototype.vQ4 = null;
com.wiris.vb.prototype.vMA = null;
com.wiris.vb.prototype.vKA = function () {
	return this;
};
com.wiris.vb.prototype.select = function (index) {
	if (this.enabled) {
		this.vQ4 = index;
		this.vGA.vFA(this);
	};
};
com.wiris.vb.prototype.__class__ = com.wiris.vb;
IntHash = function (p) {
	if (p === v91) return; {
		this.h = {};
		if (this.h.__proto__ != null) {
			this.h.__proto__ = null;
			delete(this.h.__proto__);
		} else null;
	}
};
IntHash.__name__ = ["IntHash"];
IntHash.prototype.h = null;
IntHash.prototype.set = function (vU1, value) {
	this.h[vU1] = value;
};
IntHash.prototype.get = function (vU1) {
	return this.h[vU1];
};
IntHash.prototype.exists = function (vU1) {
	return this.h[vU1] != null;
};
IntHash.prototype.remove = function (vU1) {
	if (this.h[vU1] == null) return false;
	delete(this.h[vU1]);
	return true;
};
IntHash.prototype.keys = function () {
	var a = new Array();
	for (x in this.h) a.push(x);;
	return a.iterator();
};
IntHash.prototype.iterator = function () {
	return {
		ref: this.h,
		vSB: this.keys(),
		hasNext: function () {
			return this.vSB.hasNext();
		},
		next: function () {
			var i = this.vSB.next();
			return this.ref[i];
		}
	};
};
IntHash.prototype.toString = function () {
	var s = new StringBuf();
	s.b[s.b.length] = "{";
	var vSB = this.keys(); {
		var vYA = vSB;
		while (vYA.hasNext()) {
			var i = vYA.next(); {
				s.b[s.b.length] = i;
				s.b[s.b.length] = " => ";
				s.b[s.b.length] = Std.string(this.get(i));
				if (vSB.hasNext()) s.b[s.b.length] = ", ";
			};
		}
	};
	s.b[s.b.length] = "}";
	return s.b.join("");
};
IntHash.prototype.__class__ = IntHash;
com.wiris.vc = function (p) {
	if (p === v91) return; {
		null;
	}
};
com.wiris.vc.__name__ = ["com", "wiris", "vc"];
com.wiris.vc.prototype.standardToFormula = function (n) {
	this.vnC(n, 0);
	return n;
};
com.wiris.vc.prototype.formulaToStandard = function (n) {
	this.voC(n, true);
	this.vpC(n, 0);
	return n;
};
com.wiris.vc.prototype.vnC = function (n, pos) {
	if (n.nodeType == Xml.Element || n.nodeType == Xml.Document) {
		var childs;
		var c;
		childs = n.iterator();
		var i = 0;
		while (childs.hasNext()) this.vnC(childs.next(), i++);
		if (n.nodeType == Xml.Element) {
			var p = n.getParent();
			childs = n.elements();
			if (com.wiris.vc.vqC.indexOf("@" + n.getNodeName() + "@1@") > 0 && (!childs.hasNext() || childs.hasNext() && childs.next() != null && childs.hasNext())) {
				var vrC = Xml.createElement("mrow");
				while ((c = n.firstChild()) != null) vrC.addChild(c);
				n.addChild(vrC);
			};
			if (com.wiris.vc.vqC.indexOf("@" + n.getNodeName() + "@") > 0) {
				childs = n.iterator();
				var vt2 = 0;
				while (childs.hasNext()) {
					c = childs.next();
					if (c.nodeType == Xml.Element && !(c.getNodeName() == "mrow")) {
						var vrC = Xml.createElement("mrow");
						vrC.addChild(c);
						n.insertChild(vrC, vt2);
					};
					vt2++;
				};
			};
			if (com.wiris.vc.vsC.indexOf("@" + n.getNodeName() + "@") != -1) {
				var m = Xml.createElement("mrow");
				c = n.firstChild();
				while (c.nodeType != Xml.Element) {
					m.addChild(c);
					c = n.firstChild();
				};
				m.addChild(c);
				n.removeChild(c);
				var sub = Xml.createElement(n.getNodeName().substr(1));
				this.vtC(sub, n);
				while ((c = n.firstChild()) != null) {
					sub.addChild(c);
				};
				m.addChild(sub);
				p.removeChild(n);
				p.insertChild(m, pos);
				n = m;
			};
			if (n.getNodeName() == "semantics") {
				var m = n.firstElement();
				n.removeChild(m);
				p.removeChild(n);
				p.insertChild(m, pos);
				n = m;
			};
		};
	};
};
com.wiris.vc.prototype.vpC = function (n, pos) {
	if (n.nodeType == Xml.Document || n.nodeType == Xml.Element) {
		var childs;
		if (n.nodeType == Xml.Element) {
			var mathvariant = n.get("mathvariant");
			var mathsize = n.get("mathsize");
			if (com.wiris.vc.vuC.indexOf(n.getNodeName()) == -1 && (mathvariant != null || mathsize != null)) {
				childs = n.iterator();
				while (childs.hasNext()) {
					var c = childs.next();
					if (c.nodeType == Xml.Element) {
						if (mathvariant != null) c.set("mathvariant", mathvariant);
						if (mathsize != null) c.set("mathsize", mathsize);
					};
				};
				n.remove("mathvariant");
				n.remove("mathsize");
			};
		};
		childs = n.iterator();
		var i = 0;
		while (childs.hasNext()) this.vpC(childs.next(), i++);
		if (n.nodeType == Xml.Element) {
			var p = n.getParent();
			if (com.wiris.vc.vqC.indexOf("@" + n.getNodeName() + "@1@") != -1) {
				childs = n.iterator();
				var m = Xml.createElement(n.getNodeName());
				this.vtC(m, n);
				var c;
				while ((c = n.firstChild()) != null) {
					if (c.nodeType == Xml.Element && c.getNodeName() == "mrow" && !c.attributes().hasNext()) {
						n.removeChild(c);
						var vpA;
						while ((vpA = c.firstChild()) != null) m.addChild(vpA);
					} else {
						m.addChild(c);
					};
				};
				p.removeChild(n);
				p.insertChild(m, pos);
				n = m;
			};
			if (n.getNodeName() == "mrow" && n.firstElement() != null) {
				var c;
				var vSB = n.iterator();
				var k = 0;
				while (vSB.hasNext()) {
					var m = vSB.next();
					if (com.wiris.vc.subs.indexOf("@" + m.getNodeName() + "@") != -1) {
						var vvC = Xml.createElement("m" + m.getNodeName());
						this.vtC(vvC, m);
						var vwC = Xml.createElement("mrow");
						childs = n.iterator();
						var vt2; {
							var v03 = 0;
							while (v03 < k) {
								var vA5 = v03++;
								c = childs.next();
								if (c.nodeType == Xml.Element) vwC = c;
							};
						};
						vvC.addChild(vwC);
						while ((c = m.firstChild()) != null) vvC.addChild(c);
						n.removeChild(m);
						n.insertChild(vvC, k - 1);
						vSB = n.iterator();
						k = 0;
					} else {
						k++;
					};
				};
				childs = n.elements();
				c = childs.next();
				if (!childs.hasNext()) {
					p.removeChild(n);
					p.insertChild(c, pos);
					this.vtC(c, n);
				};
			};
			var displaystyle = n.get(com.wiris.vc.vxC);
			if (!(n.getNodeName() == "mstyle") && displaystyle != null) {
				var m = Xml.createElement("mstyle");
				m.set(com.wiris.vc.vxC, displaystyle);
				n.remove(com.wiris.vc.vxC);
				m.addChild(n);
				p.insertChild(m, pos);
				n = m;
			};
		};
	};
};
com.wiris.vc.prototype.voC = function (n, vyC) {
	if (n.nodeType == Xml.Document || n.nodeType == Xml.Element) {
		if (n.nodeType == Xml.Element) {
			var displaystyle = n.get(com.wiris.vc.vxC);
			if (displaystyle != null) {
				var vzC = displaystyle == "true";
				if (vyC == vzC) n.remove(com.wiris.vc.vxC);
				else vyC = vzC;
			};
			if (n.getNodeName() == "mfrac") vyC = false;
		};
		var childs = n.iterator();
		while (childs.hasNext()) {
			this.voC(childs.next(), vyC);
		};
		if (n.nodeType == Xml.Element) {
			var displaystyle;
			childs = n.elements();
			if (com.wiris.vc.vqC.indexOf("@" + n.getNodeName() + "@1@") >= 0 && childs.hasNext() && (displaystyle = childs.next().get(com.wiris.vc.vxC)) != null && !(n.getNodeName() == "math")) {
				var common = n.get(com.wiris.vc.vxC) == null || n.get(com.wiris.vc.vxC) == displaystyle;
				var count = 1;
				while (common && childs.hasNext()) {
					common = displaystyle == childs.next().get(com.wiris.vc.vxC);
					count++;
				};
				if (common && count >= 2) {
					childs = n.elements();
					while (childs.hasNext()) {
						childs.next().remove(com.wiris.vc.vxC);
					};
					n.set(com.wiris.vc.vxC, displaystyle);
				};
			};
		};
	};
};
com.wiris.vc.prototype.vtC = function (m, n) {
	var vZB = n.attributes();
	while (vZB.hasNext()) {
		var name = vZB.next();
		if (m.get(name) == null) m.set(name, n.get(name));
	};
};
com.wiris.vc.prototype.__class__ = com.wiris.vc;
com.wiris.vd = function (v0D) {
	if (v0D === v91) return; {
		this.v0D = v0D;
	}
};
com.wiris.vd.__name__ = ["com", "wiris", "vd"];
com.wiris.vd.prototype.v0D = null;
com.wiris.vd.prototype.caretPositionChanged = function (v1D) {
	null;
};
com.wiris.vd.prototype.clipboardChanged = function (v1D) {
	null;
};
com.wiris.vd.prototype.contentChanged = function (v1D) {
	null;
};
com.wiris.vd.prototype.styleChanged = function (v1D) {
	null;
};
com.wiris.vd.prototype.mathmlSetted = function (v1D) {
	this.v0D();
	v1D.removeEditorListener(this);
};
com.wiris.vd.prototype.__class__ = com.wiris.vd;
com.wiris.vd.__interfaces__ = [com.wiris.editor.EditorListener];
com.wiris.ve = function () {};
com.wiris.ve.__name__ = ["com", "wiris", "ve"];
com.wiris.ve.prototype.action = null;
com.wiris.ve.prototype.blur = null;
com.wiris.ve.prototype.focus = null;
com.wiris.ve.prototype.getEditorModel = null;
com.wiris.ve.prototype.getMathML = null;
com.wiris.ve.prototype.isFormulaEmpty = null;
com.wiris.ve.prototype.isReady = null;
com.wiris.ve.prototype.setMathML = null;
com.wiris.ve.prototype.setToolbarHidden = null;
com.wiris.ve.prototype.__class__ = com.wiris.ve;
com.wiris.jsEditor.JsEditor = function (vg6, params) {
	if (vg6 === v91) return; {
		this.browser = new com.wiris.vv();
		this.element = null;
		this.resourceLoader = com.wiris.vD.newInstance(vg6);
		if (params != null) {
			var v2D = new Hash();
			var i = Reflect.fields(params).iterator();
			while (i.hasNext()) {
				var vU1 = i.next();
				v2D.set(vU1, Reflect.field(params, vU1));
			};
			this.editorModel = com.wiris.editor.EditorModel.getNewInstanceWithParams(v2D);
		} else {
			this.editorModel = com.wiris.editor.EditorModel.getNewInstance();
		};
		this.formulaDisplay = new com.wiris.vj(this.editorModel, this.resourceLoader);
		this.toolbar = new com.wiris.vk(this.editorModel, this.resourceLoader);
		this.toolbarElement = null;
		this.editorModel.getToolbarModel().vb6(this);
	}
};
com.wiris.jsEditor.JsEditor.__name__ = ["com", "wiris", "jsEditor", "JsEditor"];
com.wiris.jsEditor.JsEditor.newInstance = function (params) {
	return new com.wiris.jsEditor.JsEditor(com.wiris.jsEditor.defaultBasePath, params);
};
com.wiris.jsEditor.JsEditor.prototype.browser = null;
com.wiris.jsEditor.JsEditor.prototype.editorModel = null;
com.wiris.jsEditor.JsEditor.prototype.element = null;
com.wiris.jsEditor.JsEditor.prototype.formulaDisplay = null;
com.wiris.jsEditor.JsEditor.prototype.resourceLoader = null;
com.wiris.jsEditor.JsEditor.prototype.toolbar = null;
com.wiris.jsEditor.JsEditor.prototype.toolbarElement = null;
com.wiris.jsEditor.JsEditor.prototype.action = function (action) {
	this.editorModel.action(action);
};
com.wiris.jsEditor.JsEditor.prototype.blur = function () {
	this.formulaDisplay.blur();
};
com.wiris.jsEditor.JsEditor.prototype.componentFired = function (v1D, vX6) {
	if (this.browser.isIE()) {
		{
			var self = this;
//			setTimeout(function () {
//				self.formulaDisplay.focus();
//}, 1); // by cf

self.formulaDisplay.focus();
		};
	} else {
		this.formulaDisplay.focus();
	};
};
com.wiris.jsEditor.JsEditor.prototype.componentUpdated = function (v1D, vX6) {
	null;
};
com.wiris.jsEditor.JsEditor.prototype.contextTabAdded = function (v1D, tab) {
	null;
};
com.wiris.jsEditor.JsEditor.prototype.focus = function () {
	this.formulaDisplay.focus();
};
com.wiris.jsEditor.JsEditor.prototype.getEditorModel = function () {
	return this.editorModel;
};
com.wiris.jsEditor.JsEditor.prototype.getElement = function () {
	if (this.element != null) {
		return this.element;
	};
	this.insertCSS();
	this.element = js.Lib.document.createElement("div");
	com.wiris.vh.vx1(this.element, "wrs_editor");
	this.toolbarElement = this.toolbar.getElement();
	this.toolbarElement.style.display = "none";
	this.element.appendChild(this.toolbarElement);
	this.element.appendChild(this.formulaDisplay.getElement(this.element));
	var vZ9 = new haxe.Timer(100);
	vZ9.run = vf9(this, "resizeFormulaDisplay");
	com.wiris.vs.vA1(this.element);
	var self = this;
	this.onIsReady(function () {
		self.toolbarElement.style.display = "block";
	});
	return this.element;
};
com.wiris.jsEditor.JsEditor.prototype.getMathML = function () {
	return this.editorModel.getMathML();
};
com.wiris.jsEditor.JsEditor.prototype.insertCSS = function () {
	var link = js.Lib.document.createElement("link");
	link.setAttribute("rel", "stylesheet");
	link.setAttribute("type", "text/css");
	link.setAttribute("href", this.resourceLoader.vQ1("template.css"));
	js.Lib.document.getElementsByTagName("head")[0].appendChild(link);
};
com.wiris.jsEditor.JsEditor.prototype.isFormulaEmpty = function () {
	return false;
};
com.wiris.jsEditor.JsEditor.prototype.isReady = function () {
	if (this.toolbarElement == null) {
		return false;
	};
	if (com.wiris.vh.getComputedStyle(this.toolbarElement).marginBottom != "2px") {
		return false;
	};
	return this.editorModel.isReady() && this.toolbar.isReady() && this.formulaDisplay.isReady();
};
com.wiris.jsEditor.JsEditor.prototype.onIsReady = function (v0D) {
	var vZ9 = new haxe.Timer(100);
	var self = this;
	vZ9.run = function () {
		if (self.isReady()) {
			vZ9.stop();
			v0D();
		};
	};
};
com.wiris.jsEditor.JsEditor.prototype.resizeFormulaDisplay = function () {
	if (this.isReady()) {
		var v3D = 0;
		var v4D = 2;
		var v5D = v3D + v4D;
		if (!this.toolbar.v6D) {
			var v7D = 2;
			v5D += this.toolbar.getElement().offsetHeight + v7D;
		};
		this.formulaDisplay.getElement(this.element).style.height = com.wiris.vh.vc1(this.element.offsetHeight - v5D) + "px";
	};
};
com.wiris.jsEditor.JsEditor.prototype.setMathML = function (vi8) {
	this.editorModel.setMathML(vi8);
};
com.wiris.jsEditor.JsEditor.prototype.setMathMLWithCallback = function (vi8, v0D) {
	var listener = new com.wiris.vd(v0D);
	this.editorModel.addEditorListener(listener);
	this.setMathML(vi8);
};
com.wiris.jsEditor.JsEditor.prototype.setToolbarHidden = function (v6D) {
	this.toolbar.v8D(v6D);
};
com.wiris.jsEditor.JsEditor.prototype.tabChanged = function (v1D, v9D, vAD) {
	null;
};
com.wiris.jsEditor.JsEditor.prototype.tabRemoved = function (v1D, index) {
	null;
};
com.wiris.jsEditor.JsEditor.prototype.__class__ = com.wiris.jsEditor.JsEditor;
com.wiris.jsEditor.JsEditor.__interfaces__ = [com.wiris.vO, com.wiris.ve];
com.wiris.vf = function (id, command) {
	if (id === v91) return; {
		this.vp7 = 1;
		this.command = command;
		this.content = null;
		this.description = null;
		this.icon = null;
		this.id = id;
		this.vBD = true;
	}
};
com.wiris.vf.__name__ = ["com", "wiris", "vf"];
com.wiris.vf.prototype.command = null;
com.wiris.vf.prototype.content = null;
com.wiris.vf.prototype.vp7 = null;
com.wiris.vf.prototype.description = null;
com.wiris.vf.prototype.icon = null;
com.wiris.vf.prototype.id = null;
com.wiris.vf.prototype.vBD = null;
com.wiris.vf.prototype.__class__ = com.wiris.vf;
com.wiris.vg = function (p) {
	if (p === v91) return; {
		null;
	}
};
com.wiris.vg.__name__ = ["com", "wiris", "vg"];
com.wiris.vg.vS8 = function (x, vK1) {
	var p;
	p = new com.wiris.vg();
	p.x = x;
	p.vK1 = vK1;
	return p;
};
com.wiris.vg.prototype.x = null;
com.wiris.vg.prototype.vK1 = null;
com.wiris.vg.prototype.__class__ = com.wiris.vg;
StringBuf = function (p) {
	if (p === v91) return; {
		this.b = new Array();
	}
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function (x) {
	this.b[this.b.length] = x;
};
StringBuf.prototype.addSub = function (s, pos, len) {
	this.b[this.b.length] = s.substr(pos, len);
};
StringBuf.prototype.addChar = function (c) {
	this.b[this.b.length] = String.fromCharCode(c);
};
StringBuf.prototype.toString = function () {
	return this.b.join("");
};
StringBuf.prototype.b = null;
StringBuf.prototype.__class__ = StringBuf;
com.wiris.vh = function () {};
com.wiris.vh.__name__ = ["com", "wiris", "vh"];

// add classname

com.wiris.vh.vx1 = function (element, className) {
	if (element.className == "") {
		element.className = className;
	} else if (!com.wiris.vh.vCD(element, className)) {
		element.className += " " + className;
	};
};
com.wiris.vh.addEventListener = function (element, vDD, vED) {
	if (js.Lib.isIE) {
		element.attachEvent("on" + vDD, vED);
	} else {
		element.addEventListener(vDD, vED, false);
	};
};
com.wiris.vh.vFD = function (e) {
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	};
};
com.wiris.vh.getComputedStyle = function (element) {
	if (element.currentStyle) {
		return element.currentStyle;
	};
	return document.defaultView.getComputedStyle(element, null);
};
com.wiris.vh.vGD = function (parent, className, recursive) {
	var returnValue = new Array(); {
		var vz2 = 0,
			v03 = parent.childNodes.length;
		while (vz2 < v03) {
				var i = vz2++;
				if (com.wiris.vh.vCD(parent.childNodes[i], className)) {
					returnValue.push(parent.childNodes[i]);
				};
				if (recursive) {
					returnValue.concat(com.wiris.vh.vGD(parent.childNodes[i], className, true));
				};
			};
	};
	return returnValue;
};
com.wiris.vh.vHD = function (vID) {
	if (js.Lib.isIE) {
		return vID.srcElement;
	};
	return vID.target;
};
com.wiris.vh.getLeft = function (element) {
	var left = element.offsetLeft;
	while (element.offsetParent != null) {
		element = element.offsetParent;
		left += element.offsetLeft;
	};
	return left;
};
com.wiris.vh.getTop = function (element) {
	var top = element.offsetTop;
	while (element.offsetParent != null) {
		element = element.offsetParent;
		top += element.offsetTop;
	};
	return top;
};
com.wiris.vh.vJD = function () {
	var vKD = new Array();
	if (js.Lib.window.pageYOffset == undefined) {
		vKD[0] = js.Lib.document.documentElement.scrollLeft;
		vKD[1] = js.Lib.document.documentElement.scrollTop;
	} else {
		vKD[0] = js.Lib.window.pageXOffset;
		vKD[1] = js.Lib.window.pageYOffset;
	};
	return vKD;
};
com.wiris.vh.vCD = function (element, className) {
	var vT2 = element.className.split(" ");
	var i = vT2.iterator();
	while (i.hasNext()) {
		if (i.next() == className) {
			return true;
		};
	};
	return false;
};
com.wiris.vh.vX1 = function (parent, vLD) {
	if (vLD.parentNode == null) {
		return false;
	};
	if (vLD.parentNode == parent) {
		return true;
	};
	return com.wiris.vh.vX1(parent, vLD.parentNode);
};
com.wiris.vh.vc1 = function (x) {
	return x < 0 || x == null ? 0 : x;
};
com.wiris.vh.vL1 = function (element) {
	while (element.firstChild != null) {
		element.removeChild(element.firstChild);
	};
};
com.wiris.vh.vQ2 = function (element, className) {
	var vT2 = element.className.split(" ");
	vT2.remove(className);
	element.className = vT2.join(" ");
};
com.wiris.vh.removeEventListener = function (element, vDD, vED) {
	if (js.Lib.isIE) {
		element.detachEvent("on" + vDD, vED);
	} else {
		element.removeEventListener(vDD, vED, false);
	};
};
com.wiris.vh.prototype.__class__ = com.wiris.vh;
com.wiris.vi = function (p) {
	if (p === v91) return; {
		this.vnB = new Array();
	}
};
com.wiris.vi.__name__ = ["com", "wiris", "vi"];
com.wiris.vi.prototype.position = null;
com.wiris.vi.prototype.vA9 = null;
com.wiris.vi.prototype.vnB = null;
com.wiris.vi.prototype.__class__ = com.wiris.vi;
com.wiris.vj = function (editorModel, resourceLoader) {
	if (editorModel === v91) return; {
		this.browser = new com.wiris.vv();
		this.vMD = null;
		this.vND = null;
		this.vOD = null;
		this.element = null;
		this.vPD = false;
		this.vQD = false;
		this.vC1 = null;
		this.vRD = false;
		this.vSD = null;
		this.resourceLoader = resourceLoader;
		this.vTD = false;
		this.vUD = new Array();
		this.editorModel = editorModel;
		this.editorModel.addEditorListener(this);
	}
};
com.wiris.vj.__name__ = ["com", "wiris", "vj"];
com.wiris.vj.prototype.browser = null;
com.wiris.vj.prototype.vMD = null;
com.wiris.vj.prototype.vND = null;
com.wiris.vj.prototype.vOD = null;
com.wiris.vj.prototype.v81 = null;
com.wiris.vj.prototype.editorModel = null;
com.wiris.vj.prototype.element = null;
com.wiris.vj.prototype.vPD = null;
com.wiris.vj.prototype.vVD = null;
com.wiris.vj.prototype.vQD = null;
com.wiris.vj.prototype.vC1 = null;
com.wiris.vj.prototype.vRD = null;
com.wiris.vj.prototype.vSD = null;
com.wiris.vj.prototype.resourceLoader = null;
com.wiris.vj.prototype.vTD = null;
com.wiris.vj.prototype.vWD = null;
com.wiris.vj.prototype.vUD = null;
com.wiris.vj.prototype.vXD = null;
com.wiris.vj.prototype.blinkCaret = function () {
	if (this.vMD != null) {
		if (com.wiris.vh.vCD(this.vMD, "wrs_blink")) {
			com.wiris.vh.vQ2(this.vMD, "wrs_blink");
		} else {
			com.wiris.vh.vx1(this.vMD, "wrs_blink");
		};
	};
};
com.wiris.vj.prototype.blur = function () {
	this.vVD.blur();
};
com.wiris.vj.prototype.caretPositionChanged = function (v1D) {
	this.vYD();
	this.vZD();
	this.vaD();
	if (this.vMD != null) {
		com.wiris.vh.vQ2(this.vMD, "wrs_blink");
	};
	this.vbD();
};
com.wiris.vj.prototype.clipboardChanged = function (v1D) {
	null;
};
com.wiris.vj.prototype.vYD = function () {
	if (this.element != null) {
		this.recalc();
		var vcD = this.editorModel.getCaretRectangle();
		if (vcD != null) {
			if (this.browser.vdD()) {
				this.vVD.style.left = com.wiris.vh.getLeft(this.element) + vcD.x + 5 + "px";
				this.vVD.style.top = com.wiris.vh.getTop(this.element) + vcD.vK1 + 5 + "px";
				this.vVD.style.fontSize = vcD.height - 2 + "px";
			} else if (this.vMD != null) {
				this.vMD.style.left = vcD.x + "px";
				this.vMD.style.top = vcD.vK1 + "px";
				this.vMD.style.width = com.wiris.vh.vc1(vcD.width) + "px";
				this.vMD.style.height = com.wiris.vh.vc1(vcD.height) + "px";
			};
		} else if (this.vMD != null) {
			this.vMD.style.left = "-1000px";
			this.vMD.style.top = "-1000px";
			this.vMD.style.width = "0";
			this.vMD.style.height = "0";
		};
	};
};
com.wiris.vj.prototype.vaD = function () {
	this.recalc();
	var veD = this.editorModel.getSelectionRectangles();
	if (veD != null) {
		var i = veD.iterator();
		while (i.hasNext()) {
			var vfD = js.Lib.document.createElement("div");
			com.wiris.vh.vx1(vfD, "wrs_selection");
			var vgD = i.next();
			vfD.style.left = vgD.x + "px";
			vfD.style.top = vgD.vK1 + "px";
			vfD.style.width = com.wiris.vh.vc1(vgD.width) + "px";
			vfD.style.height = com.wiris.vh.vc1(vgD.height) + "px";
			this.v81.insertBefore(vfD, this.v81.firstChild);
			this.vUD.push(vfD);
		};
	};
};
com.wiris.vj.prototype.contentChanged = function (v1D) {
	this.repaintFormula();
};
com.wiris.vj.prototype.fillPopUp = function (e) {
	var textarea = this.vOD.document.createElement("textarea");
	textarea.value = this.editorModel.getMathML();
	var vhD = this.vOD.document.createElement("input");
	vhD.setAttribute("type", "submit");
	var self = this;
	vhD.onclick = function (viD) {
		self.editorModel.setMathML(textarea.value);
		self.vOD.close();
	};
	this.vOD.document.body.appendChild(textarea);
	this.vOD.document.body.appendChild(vhD);
	this.vOD.document.body.parentNode.style.height = "100%";
	this.vOD.document.body.style.margin = "5px";
	this.vOD.document.body.style.height = "100%";
	textarea.style.display = "block";
	textarea.style.width = "100%";
	var vjD = function (viD) {
		textarea.style.height = self.vOD.document.body.offsetHeight - vhD.offsetHeight - 10 + "px";
	};
	this.vOD.document.body.onresize = vjD;
	this.vOD.onresize = vjD;
	vjD(null);
};
com.wiris.vj.prototype.focus = function () {
	this.vVD.focus();
};
com.wiris.vj.prototype.getElement = function (parent) {
	if (this.element != null) {
		return this.element;
	};
	this.element = js.Lib.document.createElement("div");
	com.wiris.vh.vx1(this.element, "wrs_formulaDisplay");
	if (this.browser.vdD()) {
		com.wiris.vh.addEventListener(this.element, "touchstart", vf9(this, "onFormulaDisplayElementTouchStart"));
		com.wiris.vh.addEventListener(this.element, "click", vf9(this, "onFormulaDisplayElementClick"));
	} else {
		com.wiris.vh.addEventListener(this.element, "mousedown", vf9(this, "onFormulaDisplayElementMouseDown"));
		com.wiris.vh.addEventListener(this.element, "click", vf9(this, "onFormulaDisplayElementClick"));
		com.wiris.vh.addEventListener(this.element, "dblclick", vf9(this, "onFormulaDisplayElementDoubleClick"));
		com.wiris.vh.addEventListener(js.Lib.document, "mousemove", vf9(this, "onDocumentMouseMove"));
		com.wiris.vh.addEventListener(js.Lib.document, "mouseup", vf9(this, "onDocumentMouseUp"));
	};
	this.vVD = js.Lib.document.createElement("input");
	this.vVD.setAttribute("autocapitalize", "off");
	this.vVD.setAttribute("autocomplete", "off");
	this.vVD.setAttribute("autocorrect", "off");
	this.vVD.setAttribute("spellcheck", "false");
	this.vVD.setAttribute("type", "text");
	com.wiris.vh.vx1(this.vVD, "wrs_focusElement");
	com.wiris.vh.addEventListener(this.vVD, "focus", vf9(this, "onFocusElementFocus"));
	com.wiris.vh.addEventListener(this.vVD, "blur", vf9(this, "onFocusElementBlur"));
	com.wiris.vh.addEventListener(this.vVD, "keydown", vf9(this, "onFocusElementKeyDown"));
	com.wiris.vh.addEventListener(this.vVD, "keypress", vf9(this, "onFocusElementKeyPress"));
	parent.appendChild(this.vVD);
	this.v81 = js.Lib.document.createElement("span");
	this.v81.className = "wrs_container";
	this.element.appendChild(this.v81);
	this.repaintFormula();
	return this.element;
};
com.wiris.vj.prototype.vkD = function (e) {
	var vlD = com.wiris.vh.vJD();
	var position = new Array();
	position[0] = vlD[0] + e.clientX - com.wiris.vh.getLeft(this.element) - 1 + this.element.scrollLeft;
	position[1] = vlD[1] + e.clientY - com.wiris.vh.getTop(this.element) - 1 + this.element.scrollTop;
	return position;
};
com.wiris.vj.prototype.vmD = function (e) {
	var position = new Array(); {
		position[0] = e.touches[0].clientX - com.wiris.vh.getLeft(this.element) - 1 + this.element.scrollLeft;
		position[1] = e.touches[0].clientY - com.wiris.vh.getTop(this.element) - 1 + this.element.scrollTop;
	};
	return position;
};
com.wiris.vj.prototype.vnD = function (x, vK1) {
	this.recalc();
	this.vWD = this.editorModel.getPositionFromPoint(x - 5, vK1 - 5);
	this.editorModel.setCaret(this.vWD, 0);
};
com.wiris.vj.prototype.isReady = function () {
	return this.vRD;
};
com.wiris.vj.prototype.mathmlSetted = function (v1D) {
	null;
};
com.wiris.vj.prototype.onDocumentMouseMove = function (e) {
	if (this.vTD) {
		this.recalc();
		var voD = this.vkD(e);
		var vpD = this.editorModel.getPositionFromPoint(voD[0] - 5, voD[1] - 5);
		this.editorModel.setCaret(vpD, this.vWD - vpD);
	};
};
com.wiris.vj.prototype.onDocumentMouseUp = function (e) {
	this.vTD = false;
};
com.wiris.vj.prototype.onFocusElementBlur = function (e) {
	this.vPD = false;
	com.wiris.vh.vQ2(this.element, "wrs_focused");
};
com.wiris.vj.prototype.onFocusElementFocus = function (e) {
	this.vPD = true;
	com.wiris.vh.vx1(this.element, "wrs_focused");
	if (this.vMD != null) {
		com.wiris.vh.vQ2(this.vMD, "wrs_blink");
	};
	this.vbD();
};
com.wiris.vj.prototype.onFocusElementKeyDown = function (e) {
	if (e.keyCode == 88 && e.shiftKey && e.ctrlKey) {
		if (this.vOD != null && !this.vOD.closed) {
			this.vOD.close();
		};
		this.vOD = js.Lib.window.open("about:blank", "wrs_code", "width=500, height=300, resizable=1");
		this.vOD.onload = vf9(this, "fillPopUp");
		this.fillPopUp(null);
	};
	if (this.editorModel.handleKeyEvent(this.vqD(e.keyCode), e.shiftKey, e.ctrlKey)) {
		com.wiris.vh.vFD(e);
	};
};
com.wiris.vj.prototype.onFocusElementKeyPress = function (e) {
	if (!this.editorModel.keyEventIsHandled(this.vqD(e.keyCode), e.shiftKey, e.ctrlKey)) {
		var keyCode = e.keyCode; {
			if (e.charCode != null) {
				keyCode = e.charCode;
			} else null;
		};
		if (keyCode >= 32) {
			this.editorModel.insertText(String.fromCharCode(keyCode));
		};
	};
};
com.wiris.vj.prototype.onFormulaDisplayElementClick = function (e) {
	this.focus();
};
com.wiris.vj.prototype.onFormulaDisplayElementDoubleClick = function (e) {
	this.recalc();
	var voD = this.vkD(e);
	var vQ8 = this.editorModel.getPositionFromPoint(voD[0] - 5, voD[1] - 5);
	this.editorModel.selectWord(vQ8);
};
com.wiris.vj.prototype.onFormulaDisplayElementMouseDown = function (e) {
	var voD = this.vkD(e);
	if (voD[0] - this.element.scrollLeft < this.element.clientWidth && voD[1] - this.element.scrollTop < this.element.clientHeight) {
		this.focus();
		this.vnD(voD[0], voD[1]);
		this.vTD = true;
		com.wiris.vh.vFD(e);
	};
};
com.wiris.vj.prototype.onFormulaDisplayElementTouchStart = function (e) {
	var vrD = this.vmD(e);
	this.vnD(vrD[0], vrD[1]);
};
com.wiris.vj.prototype.recalc = function () {
	if (this.editorModel.isRecalcNeeded()) {
		this.v81.className = "wrs_container";
		var vu3 = new com.wiris.v(this.v81, this.resourceLoader);
		vu3.vS2(this.vC1);
		this.editorModel.recalc(vu3);
	};
};
com.wiris.vj.prototype.repaintFormula = function () {
	this.vRD = false;
	if (this.element != null) {
		this.vZD();
		this.vMD = null;
		var scrollLeft = this.element.scrollLeft;
		var scrollTop = this.element.scrollTop;
		this.v81.className = "wrs_container";
		var vu3 = new com.wiris.v(this.v81, this.resourceLoader);
		vu3.vS2(this.vC1);
		this.editorModel.recalc(vu3);
		this.vC1 = vu3.v12();
		var vsD = this.editorModel.getFormulaHeight();
		var vtD = this.editorModel.getFormulaBaseline();
		this.v81.style.width = com.wiris.vh.vc1(this.editorModel.getFormulaWidth()) + "px";
		this.v81.style.height = com.wiris.vh.vc1(vsD) + "px";
		this.v81.style.verticalAlign = 1 - vsD + vtD + "px";
		this.vaD();
		this.editorModel.paint(vu3);
		if (this.browser.vdD()) {
			this.vYD();
		} else {
			this.vMD = js.Lib.document.createElement("div");
			com.wiris.vh.vx1(this.vMD, "wrs_caret");
			this.vYD();
			this.v81.appendChild(this.vMD);
			this.vbD();
		};
		if (vu3.vO2()) {
			this.editorModel.clearMetricsCache();
			if (this.vSD == null) {
				this.vSD = new haxe.Timer(100);
				this.vSD.run = vf9(this, "repaintFormula");
			};
		} else {
			this.vRD = true;
			if (this.vSD != null) {
				this.vSD.stop();
				this.vSD = null;
			};
		};
		this.element.scrollLeft = scrollLeft;
		this.element.scrollTop = scrollTop;
		if (!this.vQD) {
			vu3.vJ2();
			this.vQD = true;
		};
	} else if (this.vSD == null) {
		this.vSD = new haxe.Timer(100);
		this.vSD.run = vf9(this, "repaintFormula");
	};
};
com.wiris.vj.prototype.vZD = function () {
	var i = this.vUD.iterator();
	while (i.hasNext()) {
		var vfD = i.next();
		if (vfD.parentNode != null) {
			vfD.parentNode.removeChild(vfD);
		};
	};
	this.vUD = new Array();
};
com.wiris.vj.prototype.vbD = function () {
	if (this.vND != null) {
		this.vND.stop();
	};
	this.vND = new haxe.Timer(500);
	this.vND.run = vf9(this, "blinkCaret");
};
com.wiris.vj.prototype.styleChanged = function (v1D) {
	null;
};
com.wiris.vj.prototype.vqD = function (k) {
	var vuD = this.vvD();
	return vuD.exists(k) ? vuD.get(k) : k;
};
com.wiris.vj.prototype.vvD = function () {
	if (this.vXD == null) {
		this.vXD = new IntHash();
		this.vXD.set(190, 46);
		this.vXD.set(46, 127);
	};
	return this.vXD;
};
com.wiris.vj.prototype.__class__ = com.wiris.vj;
com.wiris.vj.__interfaces__ = [com.wiris.editor.EditorListener];
com.wiris.vk = function (editorModel, resourceLoader) {
	if (editorModel === v91) return; {
		this.vq9 = new Array();
		this.editorModel = editorModel;
		this.element = null;
		this.v6D = false;
		this.vRD = false;
		this.resourceLoader = resourceLoader;
		this.vs9 = new Array();
		this.editorModel.getToolbarModel().vb6(this);
	}
};
com.wiris.vk.__name__ = ["com", "wiris", "vk"];
com.wiris.vk.prototype.body = null;
com.wiris.vk.prototype.vq9 = null;
com.wiris.vk.prototype.element = null;
com.wiris.vk.prototype.editorModel = null;
com.wiris.vk.prototype.vD4 = null;
com.wiris.vk.prototype.v6D = null;
com.wiris.vk.prototype.vRD = null;
com.wiris.vk.prototype.resourceLoader = null;
com.wiris.vk.prototype.vs9 = null;
com.wiris.vk.prototype.vwD = function (link) {
	var vxD = js.Lib.document.createElement("a");
	vxD.setAttribute("href", this.resourceLoader.vQ1(link.get("url")));
	vxD.setAttribute("target", "_blank");
	vxD.setAttribute("title", link.get("description"));
	vxD.className = "wrs_linkButton";
	this.vyD(vxD, link.get("icon"));
	this.element.appendChild(vxD);
};
/*com.wiris.vk.prototype.vyD = function (element, image)
{
    var vzD = js.Lib.document.createElement("image");
        vzD.setAttribute("src", this.resourceLoader.vQ1(image.filePath));
    com.wiris.vh.vx1(vzD, "wrs_symbimgbox");
    if (image.top != -1)
    {
        vzD.style.left = -image.left + "px";
        vzD.style.top = -image.top + "px";
        element.style.width = image.getWidth() + "px";
        element.style.height = image.getHeight() + "px";
    };
    {
        vzD.removeAttribute("width");
        vzD.removeAttribute("height");
    };
    com.wiris.vh.vL1(element);
    com.wiris.vh.vx1(element, "wrs_imageContainer");
    element.appendChild(vzD);
};*/

com.wiris.vk.prototype.vyD = function (element, image)
{
    var vzD = js.Lib.document.createElement("span");
    com.wiris.vh.vx1(vzD, "wrs_symbimgbox");
    if (image.top != -1)
    {
        element.style.width = image.getWidth() + "px";
        element.style.height = image.getHeight() + "px";
    };
    {		
        vzD.style.width = element.style.width;
        vzD.style.height = element.style.height;
		var str = "url("+ this.resourceLoader.vQ1(image.filePath) + ")";
		str = str.replace(/[\'\"]/gi, '');
        vzD.style.backgroundImage = str;
        vzD.style.backgroundPosition = (-image.left) + "px" + ' ' + (-image.top) + "px";
    };
    com.wiris.vh.vL1(element);
    com.wiris.vh.vx1(element, "wrs_imageContainer");
    element.appendChild(vzD);    
};
com.wiris.vk.prototype.componentFired = function (v1D, vX6) {
	com.wiris.vs.v0E();
};
com.wiris.vk.prototype.componentUpdated = function (v1D, vX6) {
	var i = this.vq9.iterator();
	while (i.hasNext()) {
		var current = i.next();
		if (current.vX6 == vX6) {
			if (vX6.enabled) {
				com.wiris.vh.vQ2(current.element, "wrs_disabled");
			} else {
				com.wiris.vh.vx1(current.element, "wrs_disabled");
			};
			if (vX6.vIA() != null) {
				var button = vX6.vIA();
				if (button.vNA && button.vDA) {
					com.wiris.vh.vx1(current.element, "wrs_toggled");
				} else {
					com.wiris.vh.vQ2(current.element, "wrs_toggled");
				};
			} else if (vX6.vLA() != null) {
				var select = vX6.vLA();
				com.wiris.vh.vL1(current.element.firstChild);
				current.element.firstChild.appendChild(js.Lib.document.createTextNode(select.options.get(select.value)));
			} else if (vX6.vKA() != null) {
				var v1E = vX6.vKA();
				var icon = current.element.firstChild;
				com.wiris.vh.vL1(icon);
				this.vyD(icon, v1E.vmC[v1E.vQ4]);
			};
		};
	};
};
com.wiris.vk.prototype.contextTabAdded = function (v1D, tab) {
	this.v2E(tab, true);
};
com.wiris.vk.prototype.v2E = function (tab, v3E) {
	var v4E = js.Lib.document.createElement("div");
	if (v3E) {
		v4E.className = "wrs_context";
	};
	if (tab.vR4 != null) {
		var v5E = js.Lib.document.createElement("span");
		this.vyD(v5E, tab.vR4);
		v4E.appendChild(v5E);
		v4E.title = tab.title;
	} else {
		v4E.appendChild(js.Lib.document.createTextNode(tab.title));
	};
	com.wiris.vh.addEventListener(v4E, "click", vf9(this, "onTabClick"));
	v4E.className = "sbtabbox";  // by cf
	
	this.vD4.appendChild(v4E);
	var panel = this.v6E(tab.panel);
	this.body.appendChild(panel);
	this.vs9.push(tab);
};
com.wiris.vk.prototype.v7E = function (i)
{
    if (i.hasNext())
    {
        this.v2E(i.next(), false);
        var self = this;
//        haxe.Timer.delay(function ()
//        {
//            self.v7E(i);
//        }, 1);
        self.v7E(i);
    } else
    {
        if (this.vD4.firstChild != null)
        {
            if (this.vs9[0].vQ4 != null)
            {
                this.vyD(this.vD4.firstChild.firstChild, this.vs9[0].vQ4);
            };
            com.wiris.vh.vx1(this.vD4.firstChild, "wrs_selected");
            //com.wiris.vh.vx1(this.body.firstChild, "wrs_selected esymbolbox");
            com.wiris.vh.vx1(this.body.firstChild, "wrs_selected");
            com.wiris.vh.vx1(this.body.firstChild, "esymbolbox");

        };
        this.vRD = true;
    };
};
com.wiris.vk.prototype.vd5 = function (vX6) {
	var v8E = js.Lib.document.createElement("td");
	v8E.appendChild(this.v9E(vX6));
	return v8E;
};


com.wiris.vk.prototype.v9E = function (vX6)
{
    var element = null;
    if (vX6.vIA() != null)
    {
        var button = vX6.vIA();
        element = js.Lib.document.createElement("div");
        if (button.vMA != null)
        {
            element.title = button.vMA;
        };
        if (button.icon != null)
        {
            this.vyD(element, button.icon);
        } else if (button.vMA != null)
        {
            element.appendChild(js.Lib.document.createTextNode(button.vMA));
        };
        com.wiris.vh.vx1(element, "wrs_button");
        if (button.vNA && button.vDA)
        {
            com.wiris.vh.vx1(element, "wrs_toggled");
        };
        com.wiris.vh.addEventListener(element, "click", function (e)
        {
            button.click();
        });
    } else if (vX6.vLA() != null)
    {
        // font-size chooser
        var select = vX6.vLA();
        element = js.Lib.document.createElement("div");
        element.style.position = "absolute"; // by cf
        if (select.vMA != null)
        {
            element.title = select.vMA;
        };
        com.wiris.vh.vx1(element, "wrs_select");
        var vAE = js.Lib.document.createElement("div");
        vAE.className = "wrs_label";
        vAE.appendChild(js.Lib.document.createTextNode(select.options.get(select.value)));
        element.appendChild(vAE);

        var vBE = js.Lib.document.createElement("div"); // 字体选项容器
        vBE.className = "wrs_selectPanel";

        var i = select.options.keys();
        while (i.hasNext())
        {
            var option = [i.next()];
            var label = select.options.get(option[0]);
            var vS4 = js.Lib.document.createElement("div");
            vS4.appendChild(js.Lib.document.createTextNode(label));
            vBE.appendChild(vS4);
            com.wiris.vh.addEventListener(vS4, "click", function (option)
            {
                return function (e)
                {
                    select.select(option[0]);
                    com.wiris.vs.v0E();
                };
            } (option));
            var vCE = js.Lib.document.createElement("div");
            vCE.appendChild(js.Lib.document.createTextNode(label));
            element.appendChild(vCE);
        };
        com.wiris.vh.addEventListener(element, "click", function (e)
        {
            com.wiris.vh.vx1(element, "wrs_pressed");
            
            var x = element.offsetLeft; // com.wiris.vh.getLeft(element);
            var vK1 = element.offsetTop + element.offsetHeight - 1; // com.wiris.vh.getTop(element) + element.offsetHeight - 1; //by cf
            vBE.style.minWidth = element.offsetWidth - 2 + "px";
            com.wiris.vs.vDE(x, vK1, vBE, function ()
            {
                com.wiris.vh.vQ2(element, "wrs_pressed");
            });
        });
    } else if (vX6.vJA() != null)
    {
        // color chooser
        var colorChooser = vX6.vJA();
        element = js.Lib.document.createElement("div");
        element.style.display = "none"; //hide colorchooser
        this.vyD(element, new com.wiris.vo("icons/font_color.png", 0, 0, 18, 18, null));
        if (colorChooser.vMA != null)
        {
            element.title = colorChooser.vMA;
        };
        com.wiris.vh.vx1(element, "wrs_button");
        com.wiris.vh.vx1(element, "wrs_colorChooser");
        /*
        var vEE = js.Lib.document.createElement("div");
        vEE.appendChild(js.Lib.document.createTextNode("Color: "));
        var vFE = js.Lib.document.createElement("input");
        vEE.appendChild(vFE);
        com.wiris.vh.addEventListener(vFE, "keypress", function (e) {
        if (e.keyCode == 13) {
        com.wiris.vs.v0E();
        };
        });
        var vBE = js.Lib.document.createElement("div");
        vBE.className = "wrs_colorChooserPanel";
        var vGE = new Array();
        vGE.push("#ff0000");
        vGE.push("#ff00ff");
        vGE.push("#0000ff");
        vGE.push("#00ffff");
        vGE.push("#00ff00");
        vGE.push("#ffff00");
        vGE.push("#7f0000");
        vGE.push("#e5c304");
        vGE.push("#ae761e");
        vGE.push("#7f007f");
        vGE.push("#00007f");
        vGE.push("#007f7f");
        vGE.push("#007f00");
        vGE.push("#827f00");
        vGE.push("#000000");
        vGE.push("#191919");
        vGE.push("#333333");
        vGE.push("#4c4c4c");
        vGE.push("#666666");
        vGE.push("#7f7f7f");
        vGE.push("#999999");
        vGE.push("#b2b2b2");
        vGE.push("#cccccc");
        vGE.push("#e5e5e5");
        vGE.push("#ffffff");
        var vHE = js.Lib.document.createElement("tbody");
        var vIE = js.Lib.document.createElement("tr");
        var vE9 = 0;
        var i = vGE.iterator();
        while (i.hasNext()) {
        var color = [i.next()];
        var vJE = js.Lib.document.createElement("div");
        vJE.className = "wrs_colorButton";
        vJE.style.background = color[0];
        com.wiris.vh.addEventListener(vJE, "mousedown", function (color) {
        return function (e) {
        vFE.value = color[0];
        com.wiris.vs.v0E();
        };
        }(color));
        var v8E = js.Lib.document.createElement("td");
        v8E.appendChild(vJE);
        vIE.appendChild(v8E);
        ++vE9;
        if (vE9 == 5) {
        vHE.appendChild(vIE);
        vIE = js.Lib.document.createElement("tr");
        vE9 = 0;
        };
        };
        if (vE9 != 0) {
        while (vE9 < 5) {
        vIE.appendChild(js.Lib.document.createElement("td"));
        ++vE9;
        };
        vHE.appendChild(vIE);
        };
        var vKE = js.Lib.document.createElement("table");
        vKE.appendChild(vHE);
        vBE.appendChild(vKE);
        vBE.appendChild(vEE);
        com.wiris.vh.addEventListener(element, "click", function (e) {
        com.wiris.vh.vx1(element, "wrs_pressed");
        var x = com.wiris.vh.getLeft(element);
        var vK1 = com.wiris.vh.getTop(element) + element.offsetHeight - 1;
        vFE.value = colorChooser.vQB;
        com.wiris.vs.vDE(x, vK1, vBE, function () {
        com.wiris.vh.vQ2(element, "wrs_pressed");
        colorChooser.vRB(vFE.value);
        });
        });*/

    } else if (vX6.vKA() != null)
    {
        var v1E = vX6.vKA();
        element = js.Lib.document.createElement("div");
        if (v1E.vMA != null)
        {
            element.title = v1E.vMA;
        };
        com.wiris.vh.vx1(element, "wrs_comboButton");
        var icon = js.Lib.document.createElement("div");
        this.vyD(icon, v1E.vmC[v1E.vQ4]);
        element.appendChild(icon);
        var vLE = js.Lib.document.createElement("div");
        vLE.className = "wrs_comboButtonPanel";
        var i = v1E.vmC.iterator();
        var vt2 = 0;
        while (i.hasNext())
        {
            var vME = js.Lib.document.createElement("div");
            this.vyD(vME, i.next());
            com.wiris.vh.vx1(vME, "wrs_comboButtonItem");
            vLE.appendChild(vME);
            var index = [vt2];
            com.wiris.vh.addEventListener(vME, "click", function (index)
            {
                return function (e)
                {
                    v1E.select(index[0]);
                    com.wiris.vs.v0E();
                };
            } (index));
            ++vt2;
        };
        com.wiris.vh.addEventListener(element, "click", function (e)
        {
            com.wiris.vh.vx1(element, "wrs_pressed");
            var x = com.wiris.vh.getLeft(element);
            var vK1 = com.wiris.vh.getTop(element) + element.offsetHeight;
            com.wiris.vs.vDE(x, vK1, vLE, function ()
            {
                com.wiris.vh.vQ2(element, "wrs_pressed");
            });
        });
    };
    if (!vX6.enabled)
    {
        com.wiris.vh.vx1(element, "wrs_disabled");
    };
    this.vq9.push(new com.wiris.vW(vX6, element));
    return element;
};
com.wiris.vk.prototype.getElement = function ()
{
    if (this.element != null)
    {
        return this.element;
    };
    this.element = js.Lib.document.createElement("div");
    if (this.v6D)
    {
        com.wiris.vh.vx1(this.element, "wrs_hidden");
    };
    com.wiris.vh.vx1(this.element, "wrs_toolbar");
    this.vD4 = js.Lib.document.createElement("div");
    this.vD4.className = "wrs_header";
    this.body = js.Lib.document.createElement("div");
    this.body.className = "wrs_panelContainer";
    this.body.style.padding = '0px';
    //this.body.setAttribute("id", 'symbolpanelcontainer');
    var vNE = this.editorModel.getToolbarModel();
    var i = vNE.ve6().iterator();
    var self = this;
    self.v7E(i);
    //    haxe.Timer.delay(function ()
    //    {
    //        self.v7E(i);
    //    }, 1);
    var vt2 = vNE.vd6().iterator();
    while (vt2.hasNext())
    {
        var link = vt2.next();
        self.vwD(link);
    };
    this.element.appendChild(this.vD4);
    this.element.appendChild(this.body);

    return this.element;
};
com.wiris.vk.prototype.vOE = function () {
	var empty = js.Lib.document.createElement("div");
	com.wiris.vh.vx1(empty, "wrs_empty");
	var v8E = js.Lib.document.createElement("td");
	v8E.appendChild(empty);
	return v8E;
};
com.wiris.vk.prototype.v6E = function (vPE)
{
    var panel = js.Lib.document.createElement("div");
    panel.className = 'esymbolbox';
    panel.style.height = '66px';
    panel.style.padding = '0px';
    panel.style.margin = '0px';

    var vz9 = vPE.v0A();
    {
        var v03 = 0;
        while (v03 < vz9)
        {
            var vSC = v03++;
            var vQE = vPE.v1A(vSC);
            var section = this.v1A(vQE);
            panel.appendChild(section);
            var vRE = vQE.va6(true);
            if (vRE > 0)
            {
                var vSE = [js.Lib.document.createElement("span")];
                vSE[0].className = "wrs_expandButton";
                var vTE = js.Lib.document.createElement("tbody");
                var vUE = Math.ceil(vRE / vQE.rows);
                {
                    var vC5 = 0,
						vz2 = vQE.rows;
                    while (vC5 < vz2)
                    {
                        var vt2 = vC5++;
                        vTE.appendChild(this.vVE(vQE, vt2, vQE.rows, vUE, vRE, true));
                    };
                };
                var vWE = js.Lib.document.createElement("table");
                vWE.setAttribute('cellpadding', '0px');
                vWE.setAttribute('cellmargin', '0px');
                vWE.className = "wrs_layoutFor" + vQE.rows + "Rows wrs_last";
                vWE.appendChild(vTE);
                var vXE = js.Lib.document.createElement("div");
                vXE.className = "wrs_selected esymbolbox";
                vXE.appendChild(vWE);
                var vYE = [js.Lib.document.createElement("div")];
                vYE[0].className = "wrs_panelContainer";
                vYE[0].appendChild(vXE);

                com.wiris.vh.addEventListener(vSE[0], "click", function (vYE, vSE)
                {
                    return function (e)
                    {
                        com.wiris.vh.vx1(vSE[0], "wrs_pressed");
                        var x = vSE[0].offsetLeft; // com.wiris.vh.getLeft(vSE[0]);  by cf
                        var vK1 = vSE[0].offsetTop + vSE[0].offsetHeight; //  com.wiris.vh.getTop(vSE[0]) + vSE[0].offsetHeight;
                        com.wiris.vs.vDE(x, vK1, vYE[0], function (vSE)
                        {
                            return function ()
                            {
                                com.wiris.vh.vQ2(vSE[0], "wrs_pressed");
                            };
                        } (vSE));
                    };
                } (vYE, vSE));
                panel.appendChild(vSE[0]);
            };
            if (vSC != vz9 - 1)
            {
                var line = js.Lib.document.createElement("span");
                com.wiris.vh.vx1(line, "wrs_line");
                panel.appendChild(line);
            } else
            {
                com.wiris.vh.vx1(section, "wrs_last");
            };
        };
    };
    return panel;
};
com.wiris.vk.prototype.v1A = function (vQE)
{
    var vZE = js.Lib.document.createElement("tbody");
    var v4A = vQE.va6(false);
    var vaE = Math.ceil(v4A / vQE.rows);
    {
        var vz2 = 0,
			v03 = vQE.rows;
        while (vz2 < v03)
        {
            var vt2 = vz2++;
            vZE.appendChild(this.vVE(vQE, vt2, vQE.rows, vaE, v4A, false));
        };
    };
    var section = js.Lib.document.createElement("table");
    section.className = "wrs_layoutFor" + vQE.rows + "Rows";
    section.setAttribute('cellpadding', '0px');
    section.setAttribute('cellspacing', '0px');
    section.setAttribute('border', '0');
    section.appendChild(vZE);
    return section;
};
com.wiris.vk.prototype.vVE = function (section, vbE, vcE, vaE, v4A, extra) {
	var vp4 = js.Lib.document.createElement("tr");
	if (!extra && section.layout == com.wiris.vB.vdE || extra && section.vT6 == com.wiris.vB.vdE) {
		var vZ6 = vbE;
		while (vZ6 < v4A) {
			var v8E = this.vd5(section.vY6(vZ6, extra));
			vp4.appendChild(v8E);
			vZ6 += vcE;
		};
		var v6A = vcE * vaE;
		while (vZ6 < v6A) {
			var v8E = this.vOE();
			vp4.appendChild(v8E);
			vZ6 += vcE;
		};
	} else {
		var vZ6 = vaE * vbE;
		var veE = vZ6 + vaE;
		var v6A = veE;
		if (v6A > v4A) {
			v6A = v4A;
		};
		while (vZ6 < v6A) {
			var v8E = this.vd5(section.vY6(vZ6, extra));
			vp4.appendChild(v8E);
			++vZ6;
		};
		while (vZ6 < veE) {
			var v8E = this.vOE();
			vp4.appendChild(v8E);
			++vZ6;
		};
	};
	return vp4;
};
com.wiris.vk.prototype.isReady = function () {
	return this.vRD;
};
com.wiris.vk.prototype.onTabClick = function (e) {
	var vfE = com.wiris.vh.vHD(e);
	while (vfE.nodeName.toLowerCase() != "div") {
		vfE = vfE.parentNode;
	};
	var vgE = 0;
	while (vgE < this.vD4.childNodes.length && this.vD4.childNodes[vgE] != vfE) {
		++vgE;
	};
	if (vgE < this.vD4.childNodes.length) {
		this.editorModel.getToolbarModel().vf6(vgE);
	};
};
com.wiris.vk.prototype.v8D = function (v6D) {
	this.v6D = v6D;
	if (this.element != null) {
		if (v6D) {
			com.wiris.vh.vx1(this.element, "wrs_hidden");
		} else {
			com.wiris.vh.vQ2(this.element, "wrs_hidden");
		};
	};
};
com.wiris.vk.prototype.tabChanged = function (v1D, v9D, vAD)
{
    if (v9D != -1)
    {
        if (this.vs9[v9D].vR4 != null)
        {
            this.vyD(this.vD4.childNodes[v9D].firstChild, this.vs9[v9D].vR4);
        };
        com.wiris.vh.vQ2(this.vD4.childNodes[v9D], "wrs_selected");
        com.wiris.vh.vQ2(this.body.childNodes[v9D], "wrs_selected"); 
    };
    if (this.vs9[vAD].vQ4 != null)
    {
        this.vyD(this.vD4.childNodes[vAD].firstChild, this.vs9[vAD].vQ4);
    };
    com.wiris.vh.vx1(this.vD4.childNodes[vAD], "wrs_selected");
    com.wiris.vh.vx1(this.body.childNodes[vAD], "wrs_selected");
    com.wiris.vh.vx1(this.body.childNodes[vAD], "esymbolbox"); 
};
com.wiris.vh.setElementClassName = function(element, className)
{
    if (element)
    {
        element.className = className;
    }
};
com.wiris.vk.prototype.tabRemoved = function (v1D, index) {
	this.vs9.splice(index, 1);
	this.vD4.removeChild(this.vD4.childNodes[index]);
	this.body.removeChild(this.body.childNodes[index]);
};
com.wiris.vk.prototype.__class__ = com.wiris.vk;
com.wiris.vk.__interfaces__ = [com.wiris.vO];
com.wiris.vl = function (p) {
	if (p === v91) return; {
		com.wiris.v1.call(this);
	}
};
com.wiris.vl.__name__ = ["com", "wiris", "vl"];
com.wiris.vl.__super__ = com.wiris.v1;
for (var k in com.wiris.v1.prototype) com.wiris.vl.prototype[k] = com.wiris.v1.prototype[k];
com.wiris.vl.prototype.vhE = null;
com.wiris.vl.prototype.viE = null;
com.wiris.vl.prototype.v72 = null;
com.wiris.vl.prototype.type = null;
com.wiris.vl.prototype.vl2 = function (vm2) {
	var vjE = this.type == com.wiris.vl.vkE ? 0 : 1;
	this.v72 = vm2.getLength(0.1);
	var vlE = vm2.getWidth(String.fromCharCode(com.wiris.vQ.vn1));
	this.vhE = vlE;
	if (this.type == com.wiris.vl.vmE) {
		var vg4 = this.vw2(0).width - Math.round(Math.round(this.vhE * 0.6));
		if (vg4 > 0) {
			this.vhE += vg4;
			this.vw2(0).x = 0;
		} else {
			this.vw2(0).x = -vg4;
		};
	};
	var vnE = this.vw2(vjE).width + 2 * this.v72;
	this.width = this.vhE + vnE;
	this.vw2(vjE).x = this.vhE + this.v72;
	var voE = new Array();
	this.viE = new com.wiris.v11().vpE(vm2, vlE, this.vw2(vjE).height, com.wiris.vQ.vn1, com.wiris.v11.vqE);
	if (this.type == com.wiris.vl.vmE) {
		var vrE = com.wiris.vS.min(this.viE, vm2.getHeight(String.fromCharCode(com.wiris.vQ.v82)));
		var vsE = Math.round(Math.round(0.6 * (vrE - 1))) + (this.viE - vrE);
		var vtE = vsE - (this.viE - this.vw2(vjE).height);
		var vuE = this.vw2(vjE).baseline - vtE;
		var vD9 = vuE + this.vw2(0).v43();
		voE.push(-vD9);
	};
	voE.push(0);
	com.wiris.vm.vo3(vm2, this, voE);
	com.wiris.vm.vvE(this, vjE, 2 * this.v72);
};
com.wiris.vl.prototype.vp2 = function (vm2) {
	var vjE = this.type == com.wiris.vl.vmE ? 1 : 0;
	var vg4 = this.viE - this.vw2(vjE).height;
	var vQ3 = new com.wiris.v11();
	vQ3.vR3(vm2, com.wiris.vQ.vn1, 0, this.vw2(vjE).vK1 - vg4, this.viE - this.v72, this.vhE, this.viE);
	vm2.drawHorizontalLine(1, this.vhE, this.vw2(vjE).vK1 - vg4, this.width - this.vhE);
};
com.wiris.vl.prototype.v53 = function (s) {
	s.vp3();
	this.type = s.vq3(this, "msqrt", this.type, com.wiris.vl.vkE);
	this.type = s.vq3(this, "mroot", this.type, com.wiris.vl.vmE);
	s.vr3(this);
	s.v0C(this);
	s.vs3();
};
com.wiris.vl.prototype.vB3 = function () {
	var b;
	b = new com.wiris.vl();
	b.type = this.type;
	this.v83(b);
	return b;
};
com.wiris.vl.prototype.__class__ = com.wiris.vl;
com.wiris.vm = function () {};
com.wiris.vm.__name__ = ["com", "wiris", "vm"];
com.wiris.vm.vo3 = function (vm2, b, vs2) {
	var vwE;
	var i;
	vwE = 0;
	b.baseline = 0; {
		var vz2 = 0,
			v03 = vs2.length;
		while (vz2 < v03) {
				var v13 = vz2++;
				b.baseline = com.wiris.va.max(b.vw2(v13).baseline - vs2[v13], b.baseline);
				vwE = com.wiris.va.max(vs2[v13] + b.vw2(v13).v43(), vwE);
			};
	};
	b.height = b.baseline + vwE; {
		var vz2 = 0,
			v03 = vs2.length;
		while (vz2 < v03) {
				var v13 = vz2++;
				b.vw2(v13).vK1 = b.baseline - (b.vw2(v13).baseline - vs2[v13]);
			};
	};
};
com.wiris.vm.v04 = function (vm2, b, align, vxE, margin) {
	var a, i;
	b.height = 0;
	b.width = 0; {
		var vz2 = 0,
			v03 = b.vy2();
		while (vz2 < v03) {
				var v13 = vz2++;
				var c = b.vw2(v13);
				c.x = 0;
				c.vK1 = b.height;
				b.height += c.height + margin;
				b.width = com.wiris.va.max(b.width, c.width);
			};
	}; {
		var vz2 = 0,
			v03 = b.vy2();
		while (vz2 < v03) {
				var v13 = vz2++;
				var c = b.vw2(v13);
				if (align == null || align.length == 0) {
					a = com.wiris.v4.vH5;
				} else if (v13 < align.length) {
					a = align[v13];
				} else {
					a = align[align.length - 1];
				};
				if (a != com.wiris.v4.vH5) {
					if (a == com.wiris.v4.vI5) {
						c.x = b.width - c.width;
					};
					if (a == com.wiris.v4.vG5) {
						c.x = Math.round((b.width - c.width) / 2);
					};
				};
			};
	};
	var p = vxE;
	if (p >= 0) {
		b.baseline = b.vw2(p).vK1 + b.vw2(p).baseline;
	} else {
		if (b.vy2() == 1) b.baseline = b.vw2(0).vK1 + b.vw2(0).baseline;
		else b.baseline = Math.round(b.height / 2) + vm2.getMiddle();
	};
};
com.wiris.vm.vvE = function (b, i, m) {
	var extra = com.wiris.va.max(b.vw2(i).baseline + m - b.baseline, 0);
	com.wiris.vm.vyE(b, extra);
};
com.wiris.vm.vyE = function (b, extra) {
	var vt2; {
		var vz2 = 0,
			v03 = b.vy2();
		while (vz2 < v03) {
				var vA5 = vz2++;
				b.vw2(vA5).vK1 += extra;
			};
	};
	b.baseline += extra;
	b.height += extra;
};
com.wiris.vm.vzE = function (b) {
	var m;
	var i;
	m = -1073741824; {
		var vz2 = 0,
			v03 = b.vy2();
		while (vz2 < v03) {
				var v13 = vz2++;
				m = com.wiris.va.max(b.vw2(v13).width, m);
			};
	};
	return m;
};
com.wiris.vm.vNC = function (b, margin) {
	var m;
	var i;
	m = com.wiris.vm.vzE(b); {
		var vz2 = 0,
			v03 = b.vy2();
		while (vz2 < v03) {
				var v13 = vz2++;
				b.vw2(v13).x = Math.round(Math.round((m - b.vw2(v13).width) / 2.0)) + margin;
			};
	};
	b.width = m + 2 * margin;
};
com.wiris.vm.v0F = function (b, margin) {
	var m;
	var i;
	m = com.wiris.vm.vzE(b); {
		var vz2 = 0,
			v03 = b.vy2();
		while (vz2 < v03) {
				var v13 = vz2++;
				b.vw2(v13).x = 0;
			};
	};
	b.width = m + 2 * margin;
};
com.wiris.vm.vU7 = function (b) {
	b.vD3();
	return b.vj2;
};
com.wiris.vm.vX9 = function (b) {
	var p;
	var i;
	var x;
	p = b.getParent();
	if (p == null) return 0;
	x = 0; {
		var vz2 = 0,
			v03 = b.vh2;
		while (vz2 < v03) {
				var v13 = vz2++;
				x = x + com.wiris.vm.vU7(p.vw2(v13));
			};
	};
	var v1F = p.vL3();
	if (v1F != null) x += v1F.vd4(b.vh2);
	return x + com.wiris.vm.vX9(p);
};
com.wiris.vm.vG9 = function (p, b, left) {
	var v2F;
	v2F = b.getParent();
	while (v2F != null) {
		if (v2F == p) return p.vd4(b.vh2 + (left ? 0 : 1)) - 1;
		b = v2F;
		v2F = v2F.getParent();
	};
	return -1;
};
com.wiris.vm.vQ9 = function (p, c) {
	var x;
	var vK1;
	x = 0;
	vK1 = 0;
	while (c != p) {
		x += c.x;
		vK1 += c.vK1;
		c = c.getParent();
	};
	return com.wiris.vg.vS8(x, vK1);
};
com.wiris.vm.select = function (b, vj7, length) {
	if (length == 0) {
		var vj4;
		vj4 = com.wiris.vm.vk4(b, vj7);
		return vj4.vX4();
	} else {
		var v3F;
		var v4F;
		v3F = com.wiris.vm.select(b, vj7, 0);
		v4F = com.wiris.vm.select(b, vj7 + length, 0);
		return com.wiris.vm.v5F(v3F, v4F);
	};
};
com.wiris.vm.v5F = function (v3F, v4F) {
	var p;
	var s;
	var v1F;
	p = com.wiris.vm.v6F(v3F.vD7(), v4F.vD7());
	while (p != null && !Std["is"](p, com.wiris.v7)) {
		p = p.getParent();
	};
	if (p == null) return null;
	v1F = (function (vH4) {
		var vI4;
		var vm4 = p;
		if (Std["is"](vm4, com.wiris.v7)) vm4;
		else throw "Class cast error";
		vI4 = vm4;
		return vI4;
	}(this));
	var vY4;
	var vd1;
	var left = null;
	var right = null;
	if (v3F.vD7() == p) {
		vY4 = v3F.vY4;
	} else if (v3F.vD7().getParent() == p && v3F.vS9()) {
		vY4 = com.wiris.vm.vG9(v1F, v3F.vD7(), false);
		left = v3F;
	} else {
		vY4 = com.wiris.vm.vG9(v1F, v3F.vD7(), true);
	};
	if (v4F.vD7() == p) {
		vd1 = v4F.vY4;
	} else if (v4F.vD7().getParent() == p && v4F.vR9()) {
		vd1 = com.wiris.vm.vG9(v1F, v4F.vD7(), true);
		right = v4F;
	} else {
		vd1 = com.wiris.vm.vG9(v1F, v4F.vD7(), false);
	};
	return v1F.vX4(vY4, vd1, left, right);
};
com.wiris.vm.vV3 = function (b) {
	var i;
	var n;
	var v2C;
	n = b.vy2(); {
		var v03 = 0;
		while (v03 < n) {
			var v13 = v03++;
			v2C = b.vw2(v13);
			if (!Std["is"](v2C, com.wiris.vP)) {
				var v7F;
				var vO7;
				v7F = b["delete"](v13, 1);
				vO7 = new com.wiris.vP();
				vO7.vq2(0, v7F[0]);
				b.vq2(v13, vO7);
			};
		};
	};
};
com.wiris.vm.vk4 = function (b, x) {
	var n;
	var v8F;
	var v9F;
	var vAF;
	var i;
	var v1F = null;
	v1F = b.vL3();
	n = b.vy2();
	v8F = 0;
	v9F = 0; {
		var v03 = 0;
		while (v03 < n) {
			var v13 = v03++;
			if (v1F != null) v8F = v1F.vd4(v13);
			else v8F = 0;
			if (x < v8F + v9F) {
				return v1F.vb4(x - v9F);
			};
			vAF = v9F + com.wiris.vm.vU7(b.vw2(v13));
			if (x < v8F + vAF) {
				return com.wiris.vm.vk4(b.vw2(v13), x - v8F - v9F);
			};
			v9F = vAF;
		};
	};
	return v1F.vb4(x - v9F);
};
com.wiris.vm.vBF = function (a) {
	var t;
	var i;
	var n;
	t = Type.getClassName(Type.getClass(a));
	if (Std["is"](a, com.wiris.vR)) return t + "[" + ((function (vH4) {
		var vI4;
		var vm4 = a;
		if (Std["is"](vm4, com.wiris.vR)) vm4;
		else throw "Class cast error";
		vI4 = vm4;
		return vI4;
	}(this))).vV9() + "]";
	n = a.vy2();
	if (n > 0) t = t + "("; {
		var v03 = 0;
		while (v03 < n) {
			var v13 = v03++;
			if (v13 > 0) t = t + ",";
			t = t + com.wiris.vm.vBF(a.vw2(v13));
		};
	};
	if (n > 0) t = t + ")";
	return t;
};
com.wiris.vm.v6F = function (vCF, vDF) {
	var vEF;
	var vFF;
	var p;
	var i;
	var vt2;
	vEF = com.wiris.vm.vGF(vCF);
	vFF = com.wiris.vm.vGF(vDF);
	i = vEF.length - 1;
	vt2 = vFF.length - 1;
	p = null;
	while (i >= 0 && vt2 >= 0) {
		if (vEF[i] != vFF[vt2]) return p;
		p = vEF[i];
		i--;
		vt2--;
	};
	return p;
};
com.wiris.vm.vGF = function (a) {
	var vs2;
	var p;
	vs2 = new Array();
	p = a;
	do {
		vs2.push(p);
		p = p.getParent();
	} while (p != null);
	return vs2;
};
com.wiris.vm.vHF = function (a) {
	var t;
	var i;
	var n;
	t = Type.getClassName(Type.getClass(a));
	t += " b=" + a.vb7() + ",e=" + a.va7();
	t += " x0=" + a.vY4 + ",x1=" + a.vd1;
	if (a.left != null) t += " L.$(" + com.wiris.vm.vHF(a.left) + ")";
	if (a.right != null) t += " R.$(" + com.wiris.vm.vHF(a.right) + ")";
	return t;
};
com.wiris.vm.vY7 = function (vj4, va4) {
	return vj4.b.vZ4(vj4.x, va4);
};
com.wiris.vm.vIF = function (top, vj4) {
	var vJF = vj4.b.getSelectionRectangles(vj4.x, vj4.x);
	var p = com.wiris.vm.vQ9(top, vj4.b);
	var r;
	r = vJF[0];
	r.x += p.x;
	r.vK1 += p.vK1;
	return r;
};
com.wiris.vm.vKF = function (top, vj4) {
	var vJF = vj4.b.getSelectionRectangles(vj4.x, vj4.x);
	var p = com.wiris.vm.vQ9(top, vj4.b);
	var r;
	r = vJF[0];
	return com.wiris.vg.vS8(r.x + p.x, p.vK1 + vj4.b.baseline);
};
com.wiris.vm.vLF = function (vK1, r) {
	if (vK1 < r.vK1) return r.vK1 - vK1;
	if (vK1 > r.vK1 + r.height) return vK1 - r.vK1 + r.height;
	return 0;
};
com.wiris.vm.getPositionFromPoint = function (a, va4, p) {
	var n;
	var i;
	var vMF;
	var d;
	var vNF;
	var vD9;
	var vOF;
	var vPF;
	var vQF;
	vMF = -1;
	vPF = null;
	vQF = false;
	n = com.wiris.vm.vU7(a);
	vNF = 0;
	vOF = 0;
	var vRF;
	var vSF = com.wiris.vm.vk4(a, 0); {
		var v03 = 0;
		while (v03 < n) {
			var v13 = v03++;
			vRF = vSF;
			if (v13 + 1 < n) {
				vSF = vRF.next();
			};
			if (!com.wiris.vm.vY7(vRF, va4)) continue;
			var vTF;
			vTF = com.wiris.vm.vIF(a, vRF);
			vD9 = vTF.height;
			vTF.vK1 += Math.round(Math.floor(vTF.height / 2.0));
			vTF.height = 1;
			d = com.wiris.vm.vUF(p, vTF);
			if (vMF == -1 || d < vNF || d == vNF && vD9 > vOF) {
				vMF = v13;
				vPF = vTF;
				vNF = d;
				vOF = vD9;
			};
		};
	};
	return vMF;
};
com.wiris.vm.vUF = function (p, r) {
	var vC9 = 0;
	var vD9 = 0;
	if (p.x < r.x) vC9 += (r.x - p.x) * (r.x - p.x);
	if (p.x > r.x + r.width) vC9 += (r.x + r.width - p.x) * (r.x + r.width - p.x);
	if (p.vK1 < r.vK1) vD9 += (r.vK1 - p.vK1) * (r.vK1 - p.vK1);
	if (p.vK1 > r.vK1 + r.height) vD9 += (r.vK1 + r.height - p.vK1) * (r.vK1 + r.height - p.vK1);
	return vC9 + vD9;
};
com.wiris.vm.vVF = function (p, r) {
	var vC9 = 0;
	var vD9 = 0;
	if (r.x > p.x) vC9 = r.x - p.x;
	if (p.x > r.x + r.width) vC9 = p.x - (r.x + r.width);
	if (r.vK1 > p.vK1) vD9 = r.vK1 - p.vK1;
	if (p.vK1 > r.vK1 + r.height) vD9 = p.vK1 - (r.vK1 + r.height);
	return com.wiris.vS.max(vC9, vD9);
};
com.wiris.vm.vWF = function (a, i, vt2) {
	var vXF = com.wiris.vm.vk4(a, i);
	var vYF = com.wiris.vm.vk4(a, vt2);
	return com.wiris.vm.v6F(vXF.b, vYF.b);
};
com.wiris.vm.vT8 = function (a, k, vU8, va4) {
	var n;
	var i;
	var vMF;
	var vZF;
	var vaF;
	var vbF;
	var vcF;
	vMF = -1;
	vcF = null;
	vaF = 0;
	n = com.wiris.vm.vU7(a);
	var vSF = com.wiris.vm.vk4(a, 0);
	var vRF;
	vbF = com.wiris.vm.vKF(a, com.wiris.vm.vk4(a, k)); {
		var v03 = 0;
		while (v03 < n) {
			var v13 = v03++;
			vRF = vSF;
			if (v13 + 1 < n) {
				vSF = vRF.next();
				var vdF = com.wiris.vm.vk4(a, v13 + 1);
				if (vSF.b != vdF.b || vSF.x != vdF.x) {
					vSF = vRF.next();
				};
			};
			if (!com.wiris.vm.vY7(vRF, va4)) continue;
			var veF;
			veF = com.wiris.vm.vKF(a, vRF);
			if (vU8 && veF.vK1 < vbF.vK1 || !vU8 && veF.vK1 > vbF.vK1) {
				vZF = com.wiris.vm.vWF(a, k, v13).vC3();
				if (vMF == -1 || vZF > vaF || vZF == vaF && (vU8 && veF.vK1 > vcF.vK1 || !vU8 && veF.vK1 < vcF.vK1 || veF.vK1 == vcF.vK1 && Math.abs(veF.x - vbF.x) < Math.abs(vcF.x - vbF.x))) {
					vcF = veF;
					vMF = v13;
					vaF = vZF;
				};
			};
		};
	};
	return vMF;
};
com.wiris.vm.vp5 = function (b) {
	var s = new com.wiris.vX();
	s.vp6(com.wiris.vX.vlB);
	s.vW5(b);
};
com.wiris.vm.v93 = function (src, vfF) {
	var vgF = new com.wiris.vX();
	vgF.vp6(com.wiris.vX.vdB);
	vgF.vW5(src);
	vgF.vp6(com.wiris.vX.vmB);
	vgF.vW5(vfF);
};
com.wiris.vm.vk8 = function (vhF) {
	var vgF = new com.wiris.vX();
	vgF.vp6(com.wiris.vX.vsB);
	vgF.vW5(vhF);
	return vgF.vGC();
};
com.wiris.vm.vt8 = function (box) {
	var i;
	box.v33(); {
		var vz2 = 0,
			v03 = box.vy2();
		while (vz2 < v03) {
				var v13 = vz2++;
				com.wiris.vm.vt8(box.vw2(v13));
			};
	};
};
com.wiris.vm.v99 = function (box) {
	var a = new Array();
	var current = box;
	var viF = null;
	while (current != null) {
		var vgF = new com.wiris.vX();
		vgF.vp6(com.wiris.vX.veB);
		vgF.vW5(current);
		var vjF = vgF.vHC();
		if (Std["is"](current, com.wiris.v7)) viF = (function (vH4) {
			var vI4;
			var vm4 = current;
			if (Std["is"](vm4, com.wiris.v7)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this));
		vjF.position = com.wiris.vm.vX9(viF);
		a.push(vjF);
		current = current.getParent();
	};
	return a;
};
com.wiris.vm.vPA = function (vm2, b, vkF, vlF, vmF, vnF) {
	var c = vm2.getColor();
	vm2.setColor(com.wiris.vm.voF);
	vm2.drawHorizontalLine(0, vkF, vlF, b.width - 2 * vkF);
	vm2.drawHorizontalLine(1, vkF, b.baseline - 1, b.width - 2 * vkF);
	vm2.drawVerticalLine(2, vkF, vlF, b.baseline - vlF);
	vm2.drawVerticalLine(3, b.width - vkF - 1, vlF, b.baseline - vlF);
	vm2.setColor(c);
};
com.wiris.vm.vA3 = function (src, vfF) {
	vfF.vd2 = src.vd2.vG7();
};
com.wiris.vm.prototype.__class__ = com.wiris.vm;
com.wiris.vn = function (vGA, action, vMA, options, vpF) {
	if (vGA === v91) return; {
		com.wiris.vM.call(this, vGA, action);
		this.action = action;
		this.options = options;
		this.vMA = vMA;
		this.value = null;
		if (this.vHA(this.value)) {
			this.value = vpF;
		};
		if (this.value == null) {
			var i = this.options.keys();
			if (i.hasNext()) {
				this.value = i.next();
			};
		};
	}
};
com.wiris.vn.__name__ = ["com", "wiris", "vn"];
com.wiris.vn.__super__ = com.wiris.vM;
for (var k in com.wiris.vM.prototype) com.wiris.vn.prototype[k] = com.wiris.vM.prototype[k];
com.wiris.vn.prototype.options = null;
com.wiris.vn.prototype.vMA = null;
com.wiris.vn.prototype.vHA = function (value) {
	return value != null && this.options.exists(value);
};
com.wiris.vn.prototype.vLA = function () {
	return this;
};
com.wiris.vn.prototype.select = function (option) {
	this.vBA(option);
	this.vGA.vx9(this);
};
com.wiris.vn.prototype.__class__ = com.wiris.vn;
com.wiris.vo = function (filePath, left, top, right, bottom, vi8) {
	if (filePath === v91) return; {
		this.filePath = filePath;
		this.left = left;
		this.top = top;
		this.right = right;
		this.bottom = bottom;
		this.vi8 = vi8;
	}
};
com.wiris.vo.__name__ = ["com", "wiris", "vo"];
com.wiris.vo.prototype.bottom = null;
com.wiris.vo.prototype.filePath = null;
com.wiris.vo.prototype.left = null;
com.wiris.vo.prototype.vi8 = null;
com.wiris.vo.prototype.right = null;
com.wiris.vo.prototype.top = null;
com.wiris.vo.prototype.getHeight = function () {
	return this.bottom - this.top;
};
com.wiris.vo.prototype.getWidth = function () {
	return this.right - this.left;
};
com.wiris.vo.prototype.__class__ = com.wiris.vo;
com.wiris.vp = function (p) {
	if (p === v91) return; {
		null;
	}
};
com.wiris.vp.__name__ = ["com", "wiris", "vp"];
com.wiris.vp.vi5 = function (x, vK1, width, height) {
	var r;
	r = new com.wiris.vp();
	r.x = x;
	r.vK1 = vK1;
	r.width = width;
	r.height = height;
	return r;
};
com.wiris.vp.prototype.x = null;
com.wiris.vp.prototype.vK1 = null;
com.wiris.vp.prototype.width = null;
com.wiris.vp.prototype.height = null;
com.wiris.vp.prototype.__class__ = com.wiris.vp;
haxe.Log = function () {};
haxe.Log.__name__ = ["haxe", "Log"];
haxe.Log.trace = function (v, infos) {
	js.Boot.__trace(v, infos);
};
haxe.Log.clear = function () {
	js.Boot.__clear_trace();
};
haxe.Log.prototype.__class__ = haxe.Log;
if (!com.wiris.util) com.wiris.util = {};
if (!com.wiris.util.xml) com.wiris.util.xml = {};
com.wiris.vq = function () {};
com.wiris.vq.__name__ = ["com", "wiris", "vq"];
com.wiris.vq.prototype.__class__ = com.wiris.vq;
com.wiris.vr = function () {};
com.wiris.vr.__name__ = ["com", "wiris", "vr"];
com.wiris.vr.vqF = function (toolbar, vrF, vsF, vtF, vuF) {
	var vvF = com.wiris.v21.getAttribute(vrF, "action");
	var icon = null;
	var action;
	var vMA;
	if (vvF != null) {
		action = vsF.get(vvF);
		if (action == null) {
			action = new com.wiris.vf(vvF, vvF);
		};
		vMA = action.description;
		if (vMA == null) {
			vMA = vvF;
		};
		vMA = com.wiris.vr.vwF(vMA, vuF);
		var vmC = com.wiris.v21.getElementsByTagName(vrF.iterator(), "icon");
		if (vmC.length == 0) {
			if (action.icon == null) {
				var doc = Xml.createDocument();
				var vxF = Xml.createElement("icon");
				vxF.set("src", vvF);
				icon = com.wiris.vr.vyF(vxF, vtF);
			} else {
				icon = action.icon;
			};
		} else {
			icon = com.wiris.vr.vyF(vmC[0], vtF);
		};
	} else {
		action = new com.wiris.vf(null, "insertion");
		vMA = com.wiris.v21.getAttribute(vrF, "description");
		if (vMA == null) {
			var content = com.wiris.v21.getAttribute(vrF, "content");
			if (vuF.exists(content)) {
				vMA = com.wiris.vr.vwF(content, vuF);
			};
		} else {
			vMA = com.wiris.vr.vwF(vMA, vuF);
		};
		action.content = com.wiris.v21.getAttribute(vrF, "content");
		if (action.content == null) {
			var vzF = com.wiris.v21.getElementsByTagName(vrF.iterator(), "content");
			if (vzF.length == 0) {
				throw "There is not content associated with the button with description \"" + vMA + "\".";
			};
			action.content = com.wiris.v21.vpB(vzF[0]);
		} else {
			action.vBD = false;
		};
		var v0G = com.wiris.v21.getAttribute(vrF, "offset");
		if (v0G != null) {
			action.vp7 = Std.parseInt(v0G);
		};
		var vmC = com.wiris.v21.getElementsByTagName(vrF.iterator(), "icon");
		if (vmC.length == 0) {
			throw "There is not icon associated with the button with description \"" + vMA + "\".";
		};
		icon = com.wiris.vr.vyF(vmC[0], vtF);
	};
	var button = new com.wiris.vN(toolbar, vMA, icon);
	button.action = action;
	if (action.command == "bold" || action.command == "italic" || action.command == "autoItalic") {
		button.vNA = true;
	};
	return button;
};
com.wiris.vr.v1G = function (toolbar, v2G, vsF, vuF) {
	var vvF = com.wiris.v21.getAttribute(v2G, "action");
	if (vvF == null) {
		throw "There is a color chooser widget without an \"action\" attribute.";
	};
	var action = vsF.get(vvF);
	if (action == null) {
		action = new com.wiris.vf(vvF, vvF);
	};
	var vMA = com.wiris.v21.getAttribute(v2G, "description");
	if (vMA == null) {
		vMA = vvF;
	};
	vMA = com.wiris.vr.vwF(vMA, vuF);
	var v3G = com.wiris.v21.getAttribute(v2G, "default");
	if (v3G == null) {
		v3G = "#000000";
	};
	var colorChooser = new com.wiris.vV(toolbar, action, vMA, v3G);
	return colorChooser;
};
com.wiris.vr.v4G = function (v5G, vtF, vuF) {
	var icon = null;
	var description = com.wiris.v21.getAttribute(v5G, "description");
	description = com.wiris.vr.vwF(description, vuF);
	var url = com.wiris.v21.getAttribute(v5G, "url");
	if (url == null) {
		throw "The link with description \"" + description + "\" has not an URL.";
	};
	var vmC = com.wiris.v21.getElementsByTagName(v5G.iterator(), "icon");
	if (vmC.length == 0) {
		throw "There is not icon associated with the button with description \"" + v5G + "\".";
	};
	icon = com.wiris.vr.vyF(vmC[0], vtF);
	var link = new Hash();
	link.set("description", description);
	link.set("url", url);
	link.set("icon", icon);
	return link;
};
com.wiris.vr.v6G = function (toolbar, v7G, vsF, vuF) {
	var vvF = com.wiris.v21.getAttribute(v7G, "action");
	if (vvF == null) {
		throw "There is a select widget without an \"action\" attribute.";
	};
	var action = vsF.get(vvF);
	if (action == null) {
		action = new com.wiris.vf(vvF, vvF);
	};
	var vMA = com.wiris.v21.getAttribute(v7G, "description");
	if (vMA == null) {
		vMA = vvF;
	};
	vMA = com.wiris.vr.vwF(vMA, vuF);
	var vpF = com.wiris.v21.getAttribute(v7G, "selected");
	var options = new Hash();
	var i = v7G.elements();
	if (!i.hasNext()) {
		throw "There is a select node with no options.";
	};
	while (i.hasNext()) {
		var node = i.next();
		if (node.getNodeName() == "option") {
			var id = com.wiris.v21.getAttribute(node, "id");
			if (id == null) {
				throw "There is an option node without the \"id\" attribute.";
			};
			var label = com.wiris.v21.getAttribute(node, "label");
			if (label == null) {
				label = id;
			};
			options.set(id, label);
		} else {
			throw "Unknown node \"" + node.getNodeName() + "\".";
		};
	};
	var select = new com.wiris.vn(toolbar, action, vMA, options, vpF);
	return select;
};
com.wiris.vr.v8G = function (v9G, vsF, vtF, parameters) {
	var language = "en";
	if (parameters != null && parameters.exists("language")) {
		language = parameters.get("language");
	};
	var vuF = com.wiris.vr.vAG(language);
	var toolbar = new com.wiris.vK();
	com.wiris.vr.vBG(toolbar, v9G, vsF, vtF, vuF);
	return toolbar;
};
com.wiris.vr.vyF = function (vxF, vtF) {
	var src = com.wiris.v21.getAttribute(vxF, "src");
	if (src != null) {
		return vtF.vCG(src);
	};
	return vtF.vDG(com.wiris.v21.vpB(vxF));
};
com.wiris.vr.vAG = function (language) {
	var vuF = new Hash();
	var resourceLoader = new com.wiris.vD();
	var vEG = resourceLoader.vT1("lang/" + language + ".xml");
	if (vEG == null) {
		if (language == "en") {
			return vuF;
		};
		return com.wiris.vr.vAG("en");
	};
	var vFG = com.wiris.v21.vj8(vEG);
	var i = vFG.firstChild().elements();
	while (i.hasNext()) {
		var node = i.next();
		if (node.getNodeName() == "t") {
			vuF.set(com.wiris.v21.getAttribute(node, "k"), com.wiris.v21.getAttribute(node, "v"));
		};
	};
	return vuF;
};
com.wiris.vr.vGG = function (vHG, vtF) {
	var vsF = new Hash();
	var i = vHG.elements();
	while (i.hasNext()) {
		var vIG = i.next();
		if (vIG.getNodeName() == "action") {
			var id = com.wiris.v21.getAttribute(vIG, "id");
			if (id == null) {
				throw "There is an action without the \"id\" attribute.";
			};
			var description = com.wiris.v21.getAttribute(vIG, "description");
			var content = null;
			var icon = null;
			var vt2 = vIG.elements();
			while (vt2.hasNext() && content == null) {
				var node = vt2.next();
				if (node.getNodeName() == "content") {
					content = com.wiris.v21.vpB(node);
				} else if (node.getNodeName() == "icon") {
					icon = com.wiris.vr.vyF(node, vtF);
				};
			};
			var command = com.wiris.v21.getAttribute(vIG, "command");
			if (command == null) {
				if (content != null) {
					command = "insertion";
				} else {
					command = id;
				};
			};
			var action = new com.wiris.vf(id, command);
			action.description = description;
			action.icon = icon;
			if (command == "insertion") {
				if (content == null) {
					throw "There is no content associated to the action \"" + com.wiris.v21.getAttribute(vIG, "id") + "\".";
				};
				action.content = content;
				var v0G = com.wiris.v21.getAttribute(vIG, "offset");
				if (v0G != null) {
					action.vp7 = Std.parseInt(v0G);
				};
			};
			vsF.set(id, action);
		};
	};
	return vsF;
};
com.wiris.vr.vJG = function (toolbar, section, vKG, vsF, vLG, extra, showDisabled, vuF) {
	var i = vKG.elements();
	while (i.hasNext()) {
		var node = i.next();
		if (!showDisabled && "false" == node.get("enabled")) {
			continue;
		};
		if (node.getNodeName() == "button") {
			var button = com.wiris.vr.vqF(toolbar, node, vsF, vLG, vuF);
			section.vW6(button, extra);
		} else if (node.getNodeName() == "select") {
			var select = com.wiris.vr.v6G(toolbar, node, vsF, vuF);
			section.vW6(select, extra);
		} else if (node.getNodeName() == "colorChooser") {
			var colorChooser = com.wiris.vr.v1G(toolbar, node, vsF, vuF);
			section.vW6(colorChooser, extra);
		} else if (!extra && node.getNodeName() == "extra") {
			var vT6 = node.get("layout");
			if (vT6 != null) {
				section.vT6 = vT6 == "horizontal" ? com.wiris.vB.vMG : com.wiris.vB.vdE;
			};
			com.wiris.vr.vJG(toolbar, section, node, vsF, vLG, true, showDisabled, vuF);
		} else {
			throw "Unknown node \"" + node.getNodeName() + "\".";
		};
	};
};
com.wiris.vr.vNG = function (toolbar, v9G, vOG, vsF, vtF, showDisabled, vuF) {
	var description = com.wiris.v21.getAttribute(vOG, "description");
	if (description == null) {
		description = com.wiris.v21.getAttribute(vOG, "id");
		if (description == null) {
			throw "There is a tab without the \"description\" or \"id\" attributes.";
		};
	};
	description = com.wiris.vr.vwF(description, vuF);
	var vmC = com.wiris.v21.getElementsByTagName(vOG.iterator(), "icon");
	if (vmC.length == 0) {
		throw "There is not icon associated with the tab \"" + description + "\".";
	};
	var vQ4 = com.wiris.vr.vyF(vmC[0], vtF);
	var vR4 = vQ4;
	if (vmC.length > 1) {
		vR4 = com.wiris.vr.vyF(vmC[1], vtF);
	};
	var vPG = com.wiris.v21.getAttribute(vOG, "panel");
	if (vPG == null) {
		throw "There is not panel associated with the tab \"" + description + "\".";
	};
	var vQG = com.wiris.v21.vRG(com.wiris.v21.getElementsByTagName(v9G.iterator(), "panel").iterator(), "id", vPG);
	if (vQG.length == 0) {
		throw "Panel \"" + vPG + "\" does not exist.";
	};
	var vSG = vQG[0];
	var tab = new com.wiris.v6(description, vQ4, vR4);
	toolbar.vw9(tab);
	com.wiris.vr.vTG(toolbar, tab.panel, vSG, vsF, vtF, showDisabled, vuF);
};
com.wiris.vr.vTG = function (toolbar, panel, vSG, vsF, vLG, showDisabled, vuF) {
	var rowsPerSection = 2;
	var vUG = com.wiris.v21.getAttribute(vSG, "rowsPerSection");
	if (vUG != null) {
		rowsPerSection = Std.parseInt(vUG);
	};
	var i = vSG.elements();
	while (i.hasNext()) {
		var node = i.next();
		if (node.getNodeName() == "disabled") {
			continue;
		};
		if (!(node.getNodeName() == "section")) {
			throw "Uknown node \"" + node.getNodeName() + "\".";
		};
		if (!showDisabled && "false" == node.get("enabled")) {
			continue;
		};
		var layout = "horizontal" == node.get("layout") ? com.wiris.vB.vMG : com.wiris.vB.vdE;
		var rows = rowsPerSection;
		var vVG = com.wiris.v21.getAttribute(node, "rows");
		if (vVG != null) {
			rows = Std.parseInt(vVG);
		};
		var section = new com.wiris.vB(layout, layout, rows);
		panel.vRC(section);
		com.wiris.vr.vJG(toolbar, section, node, vsF, vLG, false, showDisabled, vuF);
	};
};
com.wiris.vr.vBG = function (toolbar, v9G, vsF, vtF, vuF) {
	var showDisabled = "true" == v9G.get("showDisabled");
	var i = v9G.elements();
	while (i.hasNext()) {
		var node = i.next();
		if (node.getNodeName() == "tab") {
			if (showDisabled || !("false" == node.get("enabled"))) {
				com.wiris.vr.vNG(toolbar, v9G, node, vsF, vtF, showDisabled, vuF);
			};
		} else if (node.getNodeName() == "link") {
			var link = com.wiris.vr.v4G(node, vtF, vuF);
			toolbar.vv9(link);
		};
	};
};
com.wiris.vr.vwF = function (vU1, vuF) {
	if (vU1 == null) {
		return null;
	};
	var value = vuF.get(vU1);
	if (value == null) {
		return vU1;
	};
	return value;
};
com.wiris.vr.prototype.__class__ = com.wiris.vr;
Std = function () {};
Std.__name__ = ["Std"];
Std["is"] = function (v, t) {
	return js.Boot.__instanceof(v, t);
};
Std.string = function (s) {
	return js.Boot.__string_rec(s, "");
};
Std["int"] = function (x) {
	if (x < 0) return Math.ceil(x);
	return Math.floor(x);
};
Std.parseInt = function (x) {
	var v = parseInt(x, 10);
	if (v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if (isNaN(v)) return null;
	return v;
};
Std.parseFloat = function (x) {
	return parseFloat(x);
};
Std.random = function (x) {
	return Math.floor(Math.random() * x);
};
Std.prototype.__class__ = Std;
com.wiris.vs = function () {};
com.wiris.vs.__name__ = ["com", "wiris", "vs"];
com.wiris.vs.v0D = null;
com.wiris.vs.v81 = null;
com.wiris.vs.v6D = null;
com.wiris.vs.vA1 = function (parent) {
	if (com.wiris.vs.v81 == null) {
		com.wiris.vs.v81 = js.Lib.document.createElement("div");
		com.wiris.vs.v81.className = "wrs_contextPanel wrs_hidden";
		com.wiris.vs.v81.style.position = "absolute"; // by cf
		parent.appendChild(com.wiris.vs.v81);
		com.wiris.vs.v0D = null;
		com.wiris.vs.v6D = true;
	};
};
com.wiris.vs.v0E = function () {
	if (!com.wiris.vs.v6D) {
		com.wiris.vs.v6D = true;
		com.wiris.vh.vx1(com.wiris.vs.v81, "wrs_hidden");
		com.wiris.vh.removeEventListener(js.Lib.document, "mousedown", vf9(com.wiris.vs, "onDocumentMouseDown"));
		if (com.wiris.vs.v0D != null) {
			com.wiris.vs.v0D();
			com.wiris.vs.v0D = null;
		};
	};
};
com.wiris.vs.onDocumentMouseDown = function (e) {
	var target = com.wiris.vh.vHD(e);
	if (!com.wiris.vh.vX1(com.wiris.vs.v81, target)) {
		com.wiris.vs.v0E();
	};
};
com.wiris.vs.vDE = function (x, vK1, content, v0D)
{
    com.wiris.vs.v0E();
    com.wiris.vh.vL1(com.wiris.vs.v81);
    com.wiris.vs.v81.appendChild(content);
    com.wiris.vh.vQ2(com.wiris.vs.v81, "wrs_hidden");
    var vWG = com.wiris.vs.v81.offsetWidth;
    var vXG = com.wiris.vs.v81.parentNode.offsetWidth;
    var vYG = com.wiris.vh.getLeft(com.wiris.vs.v81.parentNode);
    var vZG = x + vWG - (vYG + vXG);
    if (vZG > 0)
    {
        x -= vZG;
    };
   
    com.wiris.vs.v81.style.left = x + "px";
    com.wiris.vs.v81.style.top =  vK1 + "px";
    com.wiris.vs.v0D = v0D;
    com.wiris.vs.v6D = false;
    com.wiris.vh.addEventListener(js.Lib.document, "mousedown", vf9(com.wiris.vs, "onDocumentMouseDown"));
};
com.wiris.vs.prototype.__class__ = com.wiris.vs;
com.wiris.vt = function (p) {
	if (p === v91) return; {
		null;
	}
};
com.wiris.vt.__name__ = ["com", "wiris", "vt"];
com.wiris.vt.prototype.string = null;
com.wiris.vt.prototype.vaG = null;
com.wiris.vt.prototype.vbG = null;
com.wiris.vt.prototype.vcG = null;
com.wiris.vt.prototype.vdG = null;
com.wiris.vt.prototype.__class__ = com.wiris.vt;
com.wiris.vu = function (p) {
	if (p === v91) return; {
		null;
	}
};
com.wiris.vu.__name__ = ["com", "wiris", "vu"];
com.wiris.vu.prototype.string = null;
com.wiris.vu.prototype.vbG = null;
com.wiris.vu.prototype.vdG = null;
com.wiris.vu.prototype.__class__ = com.wiris.vu;
com.wiris.vv = function (p) {
	if (p === v91) return; {
		this.veG = new Array();
		this.vfG("navigator.userAgent", null, "Chrome", null, "Chrome");
		this.vfG("navigator.userAgent", null, "OmniWeb", null, "OmniWeb");
		this.vfG("navigator.vendor", null, "Apple", "Version", "Safari");
		this.vfG(null, "window.opera", null, "Version", "Opera");
		this.vfG("navigator.vendor", null, "iCab", null, "iCab");
		this.vfG("navigator.vendor", null, "KDE", null, "Konkeror");
		this.vfG("navigator.userAgent", null, "Firefox", null, "Firefox");
		this.vfG("navigator.vendor", null, "Camino", null, "Camino");
		this.vfG("navigator.userAgent", null, "Netscape", null, "Netscape");
		this.vfG("navigator.userAgent", null, "MSIE", "MSIE", "Explorer");
		this.vfG("navigator.userAgent", null, "Gecko", "rv", "Mozilla");
		this.vfG("navigator.userAgent", null, "Mozilla", "Mozilla", "Netscape");
		this.vgG = new Array();
		this.vhG("navigator.platform", "Win", "Windows");
		this.vhG("navigator.platform", "Mac", "Mac");
		this.vhG("navigator.userAgent", "iPhone", "iOS");
		this.vhG("navigator.userAgent", "iPad", "iOS");
		this.vhG("navigator.platform", "Linux", "Linux");
		this.viG();
		this.vjG();
	}
};
com.wiris.vv.__name__ = ["com", "wiris", "vv"];
com.wiris.vv.prototype.veG = null;
com.wiris.vv.prototype.vgG = null;
com.wiris.vv.prototype.browser = null;
com.wiris.vv.prototype.vkG = null;
com.wiris.vv.prototype.vq4 = null;
com.wiris.vv.prototype.vfG = function (string, vaG, vbG, vcG, vdG) {
	var b = new com.wiris.vt();
	b.string = string;
	b.vaG = vaG;
	b.vbG = vbG;
	b.vcG = vcG != null ? vcG : vdG;
	b.vdG = vdG;
	this.veG.push(b);
};
com.wiris.vv.prototype.vhG = function (string, vbG, vdG) {
	var s = new com.wiris.vu();
	s.string = string;
	s.vbG = vbG;
	s.vdG = vdG;
	this.vgG.push(s);
};
com.wiris.vv.prototype.viG = function () {
	var i = this.veG.iterator();
	while (i.hasNext()) {
		var b = i.next();
		if (b.string != null) {
			var obj = js.Lib.eval(b.string);
			if (obj != null) {
				var str = (function (vH4) {
					var vI4;
					var vm4 = obj;
					if (Std["is"](vm4, String)) vm4;
					else throw "Class cast error";
					vI4 = vm4;
					return vI4;
				}(this));
				if (str.indexOf(b.vbG) != -1) {
					this.browser = b.vdG;
					this.vkG = this.vlG("navigator.userAgent", b.vcG);
					if (this.vkG == null) this.vkG = this.vlG("navigator.appVersion", b.vcG);
					return;
				};
			};
		};
	};
};
com.wiris.vv.prototype.vjG = function () {
	var i = this.vgG.iterator();
	while (i.hasNext()) {
		var s = i.next();
		var str = (function (vH4) {
			var vI4;
			var vm4 = js.Lib.eval(s.string);
			if (Std["is"](vm4, String)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this));
		if (str.indexOf(s.vbG) != -1) {
			this.vq4 = s.vdG;
			return;
		};
	};
};
com.wiris.vv.prototype.vlG = function (vaG, search) {
	var str = (function (vH4) {
		var vI4;
		var vm4 = js.Lib.eval(vaG);
		if (Std["is"](vm4, String)) vm4;
		else throw "Class cast error";
		vI4 = vm4;
		return vI4;
	}(this));
	var index = str.indexOf(search);
	if (index == -1) return null;
	return "" + Std.parseFloat(str.substr(index + search.length + 1));
};
com.wiris.vv.prototype.vmG = function () {
	return this.browser;
};
com.wiris.vv.prototype.vnG = function () {
	return this.vq4;
};
com.wiris.vv.prototype.vh1 = function () {
	return this.vkG;
};
com.wiris.vv.prototype.isIE = function () {
	return this.browser == "Explorer";
};
com.wiris.vv.prototype.voG = function () {
	return this.browser == "Chrome";
};
com.wiris.vv.prototype.vk1 = function () {
	return this.browser == "Firefox";
};
com.wiris.vv.prototype.vdD = function () {
	return this.vq4 == "iOS";
};
com.wiris.vv.prototype.__class__ = com.wiris.vv;
com.wiris.vw = function (p) {
	if (p === v91) return; {
		com.wiris.v1.call(this);
	}
};
com.wiris.vw.__name__ = ["com", "wiris", "vw"];
com.wiris.vw.__super__ = com.wiris.v1;
for (var k in com.wiris.v1.prototype) com.wiris.vw.prototype[k] = com.wiris.v1.prototype[k];
com.wiris.vw.prototype.vl2 = function (vm2) {
	this.width = this.vw2(0).width;
	this.height = this.vw2(0).height;
	this.baseline = this.vw2(0).baseline;
};
com.wiris.vw.prototype.v23 = function () {
	com.wiris.vm.vV3(this);
};
com.wiris.vw.prototype.v53 = function (s) {
	s.vS3(this, "math");
	s.vT3("xmlns", "http://www.w3.org/1998/Math/MathML", "");
	s.v63(this);
	s.vU3("math");
};
com.wiris.vw.prototype.vB3 = function () {
	var b;
	b = new com.wiris.vw();
	this.v83(b);
	return b;
};
com.wiris.vw.prototype.__class__ = com.wiris.vw;
com.wiris.vx = function (vpG) {
	if (vpG === v91) return; {
		if (vpG.nodeType != Xml.Element) {
			throw "The root node at the images definition is not an Element.";
		};
		if (!(vpG.getNodeName() == "images")) {
			throw "The root node at the image definition is \"" + vpG.getNodeName() + "\" instead of \"images\".";
		};
		this.vqG = new Hash();
		this.vrG = new Hash();
		var i = vpG.iterator();
		while (i.hasNext()) {
			var node = i.next();
			if (node.nodeType == Xml.Element) {
				if (node.getNodeName() == "imageGroup") {
					this.vsG(node);
				} else if (node.getNodeName() == "image") {
					this.vtG(node);
				};
			};
		};
	}
};
com.wiris.vx.__name__ = ["com", "wiris", "vx"];
com.wiris.vx.prototype.vqG = null;
com.wiris.vx.prototype.vrG = null;
com.wiris.vx.prototype.vuG = function (vi8) {
	return new com.wiris.vo(null, -1, -1, -1, -1, vi8);
};
com.wiris.vx.prototype.vvG = function (src) {
	return new com.wiris.vo(src, -1, -1, -1, -1, null);
};
com.wiris.vx.prototype.vDG = function (vi8) {
	var image = this.vqG.get(haxe.Md5.encode(vi8));
	if (image == null) {
		return this.vuG(vi8);
	};
	return image;
};
com.wiris.vx.prototype.vCG = function (src) {
	var image = this.vrG.get(src);
	if (image == null) {
		return this.vvG(src);
	};
	return image;
};
com.wiris.vx.prototype.vtG = function (node) {
	var vU1 = com.wiris.v21.getAttribute(node, "src");
	var vwG = this.vrG;
	if (vU1 == null) {
		vU1 = com.wiris.v21.getAttribute(node, "mathmlHash");
		vwG = this.vqG;
	};
	if (vU1 != null) {
		var filePath = com.wiris.v21.getAttribute(node, "filePath");
		if (filePath == null) {
			throw "Attribute \"filePath\" not found in a \"image\" node.";
		};
		var bounds = node.get("bounds");
		if (bounds == null) {
			throw "Attribute \"bounds\" not found in a \"image\" node.";
		};
		var vxG = bounds.split(",");
		if (vxG.length != 4) {
			throw "Wrong format for bounds \"" + bounds + "\".";
		};
		var image = new com.wiris.vo(filePath, Std.parseInt(vxG[0]), Std.parseInt(vxG[1]), Std.parseInt(vxG[2]), Std.parseInt(vxG[3]), null);
		vwG.set(vU1, image);
	};
};
com.wiris.vx.prototype.vsG = function (node) {
	var filePath = com.wiris.v21.getAttribute(node, "filePath");
	var i = node.iterator();
	while (i.hasNext()) {
		var ve4 = i.next();
		if (ve4.nodeType == Xml.Element && node.getNodeName() == "image") {
			ve4.set("filePath", filePath);
			this.vtG(ve4);
		};
	};
};
com.wiris.vx.prototype.__class__ = com.wiris.vx;
com.wiris.vy = function (p) {
	if (p === v91) return; {
		this.p = 0;
		this.vyG = 0;
		this.color = 0;
		this.fontFamily = null;
		this.vzG = 0;
		this.v0H = 0;
		this.fontSize = 0;
		this.v1H = true;
	}
};
com.wiris.vy.__name__ = ["com", "wiris", "vy"];
com.wiris.vy.vF1 = function (p) {
	var s = new com.wiris.vy();
	s.vt6(p);
	return s;
};
com.wiris.vy.vH9 = function (v2C) {
	var b = new com.wiris.vy();
	b.p = v2C.getP();
	b.vyG = v2C.getScriptLevel();
	b.fontFamily = v2C.getFontFamily();
	b.fontSize = v2C.getFontSize();
	b.color = v2C.getColor();
	b.vzG = v2C.getFlags();
	b.v0H = v2C.getFlagsMask();
	b.v1H = v2C.getDisplayStyle();
	return b;
};
com.wiris.vy.join = function (vCF, vDF) {
	var a = com.wiris.vy.vH9(vCF);
	a.vPB(vDF);
	return a;
};
com.wiris.vy.remove = function (vCF, vDF) {
	var a = com.wiris.vy.vH9(vCF);
	a.v2H(vDF, true);
	return a;
};
com.wiris.vy.vAC = function (vCF, vDF) {
	var a = com.wiris.vy.vH9(vCF);
	if (vDF.isFlagMask(com.wiris.vy.vFC) && vCF.getColor() == vDF.getColor()) {
		a.v0H &= ~com.wiris.vy.vFC;
	};
	if (vDF.isFlagMask(com.wiris.vy.v3H) && vCF.getScriptLevel() == vDF.getScriptLevel()) {
		a.v0H &= ~com.wiris.vy.v3H;
	};
	if (vDF.isFlagMask(com.wiris.vy.v8C) && vCF.getDisplayStyle() == vDF.getDisplayStyle()) {
		a.v0H &= ~com.wiris.vy.v8C;
	};
	if (vDF.isFlagMask(com.wiris.vy.v4H) && vCF.getP() == vDF.getP()) {
		a.v0H &= ~com.wiris.vy.v4H;
	};
	if (vDF.isFlagMask(com.wiris.vy.vX2) && vCF.getFontSize() == vDF.getFontSize()) {
		a.v0H &= ~com.wiris.vy.vX2;
	};
	if (vDF.isFlagMask(com.wiris.vy.vW2) && com.wiris.vy.v5H(vCF.getFontFamily(), vDF.getFontFamily())) {
		a.v0H &= ~com.wiris.vy.vW2;
	};
	a.v0H &= ~ (vDF.getFlagsMask() & ~ (vCF.getFlags() ^ vDF.getFlags()) & (com.wiris.vy.vU2 | com.wiris.vy.vV2));
	a.v6H();
	return a;
};
com.wiris.vy.v7H = function (v8H, v9H, v0H) {
	v8H &= ~v0H;
	v8H |= v9H;
	return v8H;
};
com.wiris.vy.vDC = function (style) {
	var h = new Hash();
	if (style.isFlagMask(com.wiris.vy.vX2)) {
		h.set("fontSize", style.getFontSize() + "px");
	};
	if (style.isFlagMask(com.wiris.vy.vW2)) {
		h.set("fontFamily", style.getFontFamily());
	};
	return h;
};
com.wiris.vy.v5H = function (vgF, vaC) {
	return vgF == vaC || vgF != null && vgF == vaC;
};
com.wiris.vy.prototype.p = null;
com.wiris.vy.prototype.vyG = null;
com.wiris.vy.prototype.v1H = null;
com.wiris.vy.prototype.color = null;
com.wiris.vy.prototype.fontSize = null;
com.wiris.vy.prototype.fontFamily = null;
com.wiris.vy.prototype.vzG = null;
com.wiris.vy.prototype.v0H = null;
com.wiris.vy.prototype.vAH = function (style) {
	return style.p == this.p && style.vyG == this.vyG && com.wiris.vy.v5H(style.fontFamily, this.fontFamily) && style.fontSize == this.fontSize && style.color == this.color && style.vzG == this.vzG && style.v0H == this.v0H && style.v1H == this.v1H;
};
com.wiris.vy.prototype.vG7 = function () {
	return com.wiris.vy.vH9(this);
};
com.wiris.vy.prototype.vPB = function (style) {
	if (style.isFlagMask(com.wiris.vy.vFC)) {
		this.color = style.getColor();
	};
	if (style.isFlagMask(com.wiris.vy.v3H)) {
		this.vyG = style.getScriptLevel();
	};
	if (style.isFlagMask(com.wiris.vy.v8C)) {
		this.v1H = style.getDisplayStyle();
	};
	if (style.isFlagMask(com.wiris.vy.v4H)) {
		this.p = style.getP();
	};
	if (style.isFlagMask(com.wiris.vy.vX2)) {
		this.fontSize = style.getFontSize();
	};
	if (style.isFlagMask(com.wiris.vy.vW2)) {
		this.fontFamily = style.getFontFamily();
	};
	this.v0H |= style.getFlagsMask();
	this.vzG = com.wiris.vy.v7H(this.vzG, style.getFlags(), style.getFlagsMask());
	var n = style.getFlagsMask() >> com.wiris.vy.vBH;
	if (n != 0) {
		this.v0H &= ~n;
		this.vzG &= ~n;
		this.v0H &= com.wiris.vy.vCH - 1;
	};
};
com.wiris.vy.prototype.v2H = function (vDF, vDH) {
	if (vDH) {
		this.v0H &= ~vDF.getFlagsMask();
	} else {
		this.v0H &= vDF.getFlagsMask();
	};
	this.v6H();
};
com.wiris.vy.prototype.v6H = function () {
	this.vzG = this.vzG & this.v0H;
	if (!this.isFlagMask(com.wiris.vy.vFC)) {
		this.color = 0;
	};
	if (!this.isFlagMask(com.wiris.vy.v3H)) {
		this.vyG = 0;
	};
	if (!this.isFlagMask(com.wiris.vy.v4H)) {
		this.p = 0;
	};
	if (!this.isFlagMask(com.wiris.vy.vX2)) {
		this.fontSize = 0;
	};
	if (!this.isFlagMask(com.wiris.vy.v8C)) {
		this.v1H = true;
	};
	if (!this.isFlagMask(com.wiris.vy.vW2)) {
		this.fontFamily = null;
	};
};
com.wiris.vy.prototype.v7C = function (v49) {
	this.v0H &= ~v49;
	this.v6H();
};
com.wiris.vy.prototype.isFlagMask = function (v49) {
	return (this.v0H & v49) != 0;
};
com.wiris.vy.prototype.getP = function () {
	return this.p;
};
com.wiris.vy.prototype.vt6 = function (p) {
	this.p = p;
	this.v0H |= com.wiris.vy.v4H;
};
com.wiris.vy.prototype.getScriptLevel = function () {
	return this.vyG;
};
com.wiris.vy.prototype.vJ7 = function (vyG) {
	this.vyG = vyG;
	this.v0H |= com.wiris.vy.v3H;
};
com.wiris.vy.prototype.vw6 = function (v1H) {
	this.v1H = v1H;
	this.v0H |= com.wiris.vy.v8C;
};
com.wiris.vy.prototype.getColor = function () {
	return this.color;
};
com.wiris.vy.prototype.setColor = function (color) {
	this.color = color;
	this.v0H |= com.wiris.vy.vFC;
};
com.wiris.vy.prototype.vv6 = function (v49, vEH) {
	if (vEH) this.vzG |= v49;
	else this.vzG &= ~v49;
	this.v0H |= v49;
};
com.wiris.vy.prototype.isFlag = function (v49) {
	return (this.vzG & v49 & this.v0H) != 0;
};
com.wiris.vy.prototype.getFontFamily = function () {
	return this.fontFamily;
};
com.wiris.vy.prototype.setFontFamily = function (fontFamily) {
	this.fontFamily = fontFamily;
	this.v0H |= com.wiris.vy.vW2;
};
com.wiris.vy.prototype.getFontSize = function () {
	return this.fontSize;
};
com.wiris.vy.prototype.setFontSize = function (size) {
	this.fontSize = size;
	this.v0H |= com.wiris.vy.vX2;
};
com.wiris.vy.prototype.getFlags = function () {
	return this.vzG;
};
com.wiris.vy.prototype.getFlagsMask = function () {
	return this.v0H;
};
com.wiris.vy.prototype.getDisplayStyle = function () {
	return this.v1H;
};
com.wiris.vy.prototype.vFH = function (vU1, value) {
	if ("backgroundColor" == vU1) null;
	else if ("color" == vU1) {
		this.setColor(com.wiris.v31.vz8(value));
	} else if ("fontFamily" == vU1) {
		this.setFontFamily(value);
	};
	if ("fontSize" == vU1) {
		this.setFontSize(com.wiris.v31.vGH(value));
	};
	if ("fontStyle" == vU1) {
		this.vv6(com.wiris.vy.vU2, value == "italic");
	};
	if ("fontWeight" == vU1) {
		this.vv6(com.wiris.vy.vV2, value == "bold");
	};
};
com.wiris.vy.prototype.setParams = function (parameters) {
	var i = parameters.keys();
	while (i.hasNext()) {
		var vU1 = i.next();
		this.vFH(vU1, parameters.get(vU1));
	};
};
com.wiris.vy.prototype.__class__ = com.wiris.vy;
com.wiris.vy.__interfaces__ = [com.wiris.editor.BoxStyleInterface];
haxe.Md5 = function (p) {
	if (p === v91) return; {
		null;
	}
};
haxe.Md5.__name__ = ["haxe", "Md5"];
haxe.Md5.encode = function (s) {
	return haxe.Md5.inst.doEncode(s);
};
haxe.Md5.prototype.bitOR = function (a, b) {
	var vHH = a & 1 | b & 1;
	var vIH = a >>> 1 | b >>> 1;
	return vIH << 1 | vHH;
};
haxe.Md5.prototype.bitXOR = function (a, b) {
	var vHH = a & 1 ^ b & 1;
	var vIH = a >>> 1 ^ b >>> 1;
	return vIH << 1 | vHH;
};
haxe.Md5.prototype.bitAND = function (a, b) {
	var vHH = a & 1 & (b & 1);
	var vIH = a >>> 1 & b >>> 1;
	return vIH << 1 | vHH;
};
haxe.Md5.prototype.addme = function (x, vK1) {
	var vJH = (x & 65535) + (vK1 & 65535);
	var vKH = (x >> 16) + (vK1 >> 16) + (vJH >> 16);
	return vKH << 16 | vJH & 65535;
};
haxe.Md5.prototype.rhex = function (vLH) {
	var str = "";
	var hex_chr = "0123456789abcdef"; {
		var v03 = 0;
		while (v03 < 4) {
			var vt2 = v03++;
			str += hex_chr.charAt(vLH >> vt2 * 8 + 4 & 15) + hex_chr.charAt(vLH >> vt2 * 8 & 15);
		};
	};
	return str;
};
haxe.Md5.prototype.str2blks = function (str) {
	var vMH = (str.length + 8 >> 6) + 1;
	var vNH = new Array(); {
		var vz2 = 0,
			v03 = vMH * 16;
		while (vz2 < v03) {
				var i = vz2++;
				vNH[i] = 0;
			};
	};
	var i = 0;
	while (i < str.length) {
		vNH[i >> 2] |= str.charCodeAt(i) << (str.length * 8 + i) % 4 * 8;
		i++;
	};
	vNH[i >> 2] |= 128 << (str.length * 8 + i) % 4 * 8;
	var l = str.length * 8;
	var k = vMH * 16 - 2;
	vNH[k] = l & 255;
	vNH[k] |= (l >>> 8 & 255) << 8;
	vNH[k] |= (l >>> 16 & 255) << 16;
	vNH[k] |= (l >>> 24 & 255) << 24;
	return vNH;
};
haxe.Md5.prototype.rol = function (vLH, vOH) {
	return vLH << vOH | vLH >>> 32 - vOH;
};
haxe.Md5.prototype.cmn = function (q, a, b, x, s, t) {
	return this.addme(this.rol(this.addme(this.addme(a, q), this.addme(x, t)), s), b);
};
haxe.Md5.prototype.ff = function (a, b, c, d, x, s, t) {
	return this.cmn(this.bitOR(this.bitAND(b, c), this.bitAND(~b, d)), a, b, x, s, t);
};
haxe.Md5.prototype.gg = function (a, b, c, d, x, s, t) {
	return this.cmn(this.bitOR(this.bitAND(b, d), this.bitAND(c, ~d)), a, b, x, s, t);
};
haxe.Md5.prototype.hh = function (a, b, c, d, x, s, t) {
	return this.cmn(this.bitXOR(this.bitXOR(b, c), d), a, b, x, s, t);
};
haxe.Md5.prototype.ii = function (a, b, c, d, x, s, t) {
	return this.cmn(this.bitXOR(c, this.bitOR(b, ~d)), a, b, x, s, t);
};
haxe.Md5.prototype.doEncode = function (str) {
	var x = this.str2blks(str);
	var a = 1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d = 271733878;
	var vPH;
	var i = 0;
	while (i < x.length) {
		var vQH = a;
		var vRH = b;
		var vSH = c;
		var vTH = d;
		vPH = 0;
		a = this.ff(a, b, c, d, x[i], 7, -680876936);
		d = this.ff(d, a, b, c, x[i + 1], 12, -389564586);
		c = this.ff(c, d, a, b, x[i + 2], 17, 606105819);
		b = this.ff(b, c, d, a, x[i + 3], 22, -1044525330);
		a = this.ff(a, b, c, d, x[i + 4], 7, -176418897);
		d = this.ff(d, a, b, c, x[i + 5], 12, 1200080426);
		c = this.ff(c, d, a, b, x[i + 6], 17, -1473231341);
		b = this.ff(b, c, d, a, x[i + 7], 22, -45705983);
		a = this.ff(a, b, c, d, x[i + 8], 7, 1770035416);
		d = this.ff(d, a, b, c, x[i + 9], 12, -1958414417);
		c = this.ff(c, d, a, b, x[i + 10], 17, -42063);
		b = this.ff(b, c, d, a, x[i + 11], 22, -1990404162);
		a = this.ff(a, b, c, d, x[i + 12], 7, 1804603682);
		d = this.ff(d, a, b, c, x[i + 13], 12, -40341101);
		c = this.ff(c, d, a, b, x[i + 14], 17, -1502002290);
		b = this.ff(b, c, d, a, x[i + 15], 22, 1236535329);
		a = this.gg(a, b, c, d, x[i + 1], 5, -165796510);
		d = this.gg(d, a, b, c, x[i + 6], 9, -1069501632);
		c = this.gg(c, d, a, b, x[i + 11], 14, 643717713);
		b = this.gg(b, c, d, a, x[i], 20, -373897302);
		a = this.gg(a, b, c, d, x[i + 5], 5, -701558691);
		d = this.gg(d, a, b, c, x[i + 10], 9, 38016083);
		c = this.gg(c, d, a, b, x[i + 15], 14, -660478335);
		b = this.gg(b, c, d, a, x[i + 4], 20, -405537848);
		a = this.gg(a, b, c, d, x[i + 9], 5, 568446438);
		d = this.gg(d, a, b, c, x[i + 14], 9, -1019803690);
		c = this.gg(c, d, a, b, x[i + 3], 14, -187363961);
		b = this.gg(b, c, d, a, x[i + 8], 20, 1163531501);
		a = this.gg(a, b, c, d, x[i + 13], 5, -1444681467);
		d = this.gg(d, a, b, c, x[i + 2], 9, -51403784);
		c = this.gg(c, d, a, b, x[i + 7], 14, 1735328473);
		b = this.gg(b, c, d, a, x[i + 12], 20, -1926607734);
		a = this.hh(a, b, c, d, x[i + 5], 4, -378558);
		d = this.hh(d, a, b, c, x[i + 8], 11, -2022574463);
		c = this.hh(c, d, a, b, x[i + 11], 16, 1839030562);
		b = this.hh(b, c, d, a, x[i + 14], 23, -35309556);
		a = this.hh(a, b, c, d, x[i + 1], 4, -1530992060);
		d = this.hh(d, a, b, c, x[i + 4], 11, 1272893353);
		c = this.hh(c, d, a, b, x[i + 7], 16, -155497632);
		b = this.hh(b, c, d, a, x[i + 10], 23, -1094730640);
		a = this.hh(a, b, c, d, x[i + 13], 4, 681279174);
		d = this.hh(d, a, b, c, x[i], 11, -358537222);
		c = this.hh(c, d, a, b, x[i + 3], 16, -722521979);
		b = this.hh(b, c, d, a, x[i + 6], 23, 76029189);
		a = this.hh(a, b, c, d, x[i + 9], 4, -640364487);
		d = this.hh(d, a, b, c, x[i + 12], 11, -421815835);
		c = this.hh(c, d, a, b, x[i + 15], 16, 530742520);
		b = this.hh(b, c, d, a, x[i + 2], 23, -995338651);
		a = this.ii(a, b, c, d, x[i], 6, -198630844);
		d = this.ii(d, a, b, c, x[i + 7], 10, 1126891415);
		c = this.ii(c, d, a, b, x[i + 14], 15, -1416354905);
		b = this.ii(b, c, d, a, x[i + 5], 21, -57434055);
		a = this.ii(a, b, c, d, x[i + 12], 6, 1700485571);
		d = this.ii(d, a, b, c, x[i + 3], 10, -1894986606);
		c = this.ii(c, d, a, b, x[i + 10], 15, -1051523);
		b = this.ii(b, c, d, a, x[i + 1], 21, -2054922799);
		a = this.ii(a, b, c, d, x[i + 8], 6, 1873313359);
		d = this.ii(d, a, b, c, x[i + 15], 10, -30611744);
		c = this.ii(c, d, a, b, x[i + 6], 15, -1560198380);
		b = this.ii(b, c, d, a, x[i + 13], 21, 1309151649);
		a = this.ii(a, b, c, d, x[i + 4], 6, -145523070);
		d = this.ii(d, a, b, c, x[i + 11], 10, -1120210379);
		c = this.ii(c, d, a, b, x[i + 2], 15, 718787259);
		b = this.ii(b, c, d, a, x[i + 9], 21, -343485551);
		a = this.addme(a, vQH);
		b = this.addme(b, vRH);
		c = this.addme(c, vSH);
		d = this.addme(d, vTH);
		i += 16;
	};
	return this.rhex(a) + this.rhex(b) + this.rhex(c) + this.rhex(d);
};
haxe.Md5.prototype.__class__ = haxe.Md5;
com.wiris.vz = function (p) {
	if (p === v91) return; {
		null;
	}
};
com.wiris.vz.__name__ = ["com", "wiris", "vz"];
com.wiris.vz.vc4 = function (b, x) {
	if (x < 0 || x >= b.vW4()) {
		throw "Invalid position";
	};
	var vj4;
	vj4 = new com.wiris.vz();
	vj4.b = b;
	vj4.x = x;
	return vj4;
};
com.wiris.vz.vUH = function (b, vg4) {
	var parent = b.getParent();
	if (parent == null) return null;
	var vVH = parent.vL3();
	if (vVH == null) {
		if (0 <= b.vh2 + vg4 && b.vh2 + vg4 < parent.vy2()) return com.wiris.vz.vF9(parent.vw2(b.vh2 + vg4), vg4);
		return com.wiris.vz.vUH(parent, vg4);
	};
	return com.wiris.vz.vWH(vVH, b.vh2, vg4);
};
com.wiris.vz.vWH = function (b, vh2, vg4) {
	var vK1;
	vK1 = b.vf4(vh2, -vg4);
	if (vK1 >= 0) return com.wiris.vz.vc4(b, vK1);
	return com.wiris.vz.vUH(b, vg4);
};
com.wiris.vz.vXH = function (b, x, vg4) {
	var vJC = null;
	if (0 <= x + vg4 && x + vg4 < b.vW4()) {
		vJC = com.wiris.vz.vc4(b, x + vg4);
	} else {
		vJC = null;
	};
	var vMF = b.vh4(x, vg4);
	if (vMF != -1) {
		var v13 = vJC.b.vh4(vJC.x, vg4);
		if (vMF == v13 && vJC != null) return vJC;
		else return com.wiris.vz.vF9(b.vw2(vMF), vg4);
	};
	if (vJC != null) return vJC;
	return com.wiris.vz.vUH(b, vg4);
};
com.wiris.vz.vF9 = function (b, vg4) {
	var v1F = b.vL3();
	if (v1F != null) {
		var n = v1F.vW4();
		if (n > 0) {
			if (vg4 > 0) return com.wiris.vz.vc4(v1F, 0);
			else return com.wiris.vz.vc4(v1F, n - 1);
		};
	};
	var vYH = b.vy2();
	if (vYH > 0) {
		if (vg4 > 0) return com.wiris.vz.vF9(b.vw2(0), vg4);
		else return com.wiris.vz.vF9(b.vw2(vYH - 1), vg4);
	};
	return com.wiris.vz.vUH(b, vg4);
};
com.wiris.vz.prototype.b = null;
com.wiris.vz.prototype.x = null;
com.wiris.vz.prototype.vG9 = function () {
	var x = 0;
	var i; {
		var v03 = 0;
		while (v03 < x) {
			var v13 = v03++;
			x += com.wiris.vm.vU7(this.b.vw2(v13));
		};
	};
	return x + com.wiris.vm.vX9(this.b) + x;
};
com.wiris.vz.prototype.vX4 = function () {
	return this.b.vX4(this.x, this.x, null, null);
};
com.wiris.vz.prototype.next = function () {
	return com.wiris.vz.vXH(this.b, this.x, 1);
};
com.wiris.vz.prototype.vZH = function () {
	return com.wiris.vz.vXH(this.b, this.x, -1);
};
com.wiris.vz.prototype.__class__ = com.wiris.vz;
com.wiris.v01 = function (formulaModel, vNE, vtF) {
	if (formulaModel === v91) return; {
		this.formulaModel = formulaModel;
		this.vtF = vtF;
		this.vNE = vNE;
		this.vaH = !this.formulaModel.v89();
		this.vbH = !this.formulaModel.v79();
		this.vcH = !this.formulaModel.v69();
		this.vdH = !this.formulaModel.v59();
		this.veH();
		this.vfH();
		this.vgH();
		this.vhH(this.formulaModel.getCurrentStyles(), true);
	}
};
com.wiris.v01.__name__ = ["com", "wiris", "v01"];
com.wiris.v01.prototype.formulaModel = null;
com.wiris.v01.prototype.vtF = null;
com.wiris.v01.prototype.viH = null;
com.wiris.v01.prototype.vjH = null;
com.wiris.v01.prototype.vaH = null;
com.wiris.v01.prototype.vbH = null;
com.wiris.v01.prototype.vcH = null;
com.wiris.v01.prototype.vdH = null;
com.wiris.v01.prototype.vkH = null;
com.wiris.v01.prototype.vNE = null;
com.wiris.v01.prototype.caretPositionChanged = function (v1D) {
	this.veH();
	var vt9 = this.vNE.vt9;
	this.vNE.v5A();
	var vlH = this.formulaModel.v99();
	this.vmH(vlH);
	this.vhH(this.formulaModel.getCurrentStyles(), false);
	var v6A = this.vNE.ve6().length + this.vNE.vc6().length;
	if (v6A > vt9) {
		this.vNE.vf6(vt9);
	} else {
		this.vNE.vf6(v6A - 1);
	};
};
com.wiris.v01.prototype.clipboardChanged = function (v1D) {
	this.vfH();
};
com.wiris.v01.prototype.contentChanged = function (v1D) {
	this.vgH();
};
com.wiris.v01.prototype.styleChanged = function (v1D) {
	null;
};
com.wiris.v01.prototype.vmH = function (vlH) {
	var vZF = 0;
	var tab;
	if (this.vtF == null) {
		tab = new com.wiris.v6("Properties", null, null);
	} else {
		tab = new com.wiris.v6("Properties", this.vtF.vCG("properties_dark"), this.vtF.vCG("properties_white"));
	};
	var i = vlH.iterator();
	while (i.hasNext() && (vZF < com.wiris.v01.vnH || com.wiris.v01.vnH == -1)) {
		var vcB = i.next();
		if (vcB.vA9 == "mtable") {
			var section = new com.wiris.vB(com.wiris.vB.vdE, com.wiris.vB.vdE, 2);
			var button = new com.wiris.vN(this.vNE, "prependRow", this.vtF.vCG("prepend_row"));
			button.action = new com.wiris.vf("prependRow", "prependRow");
			section.vW6(button, false);
			button = new com.wiris.vN(this.vNE, "appendRow", this.vtF.vCG("append_row"));
			button.action = new com.wiris.vf("appendRow", "appendRow");
			section.vW6(button, false);
			button = new com.wiris.vN(this.vNE, "prependColumn", this.vtF.vCG("prepend_column"));
			button.action = new com.wiris.vf("prependColumn", "prependColumn");
			section.vW6(button, false);
			button = new com.wiris.vN(this.vNE, "appendColumn", this.vtF.vCG("append_column"));
			button.action = new com.wiris.vf("appendColumn", "appendColumn");
			section.vW6(button, false);
			button = new com.wiris.vN(this.vNE, "removeRow", this.vtF.vCG("remove_row"));
			button.action = new com.wiris.vf("removeRow", "removeRow");
			section.vW6(button, false);
			button = new com.wiris.vN(this.vNE, "removeColumn", this.vtF.vCG("remove_column"));
			button.action = new com.wiris.vf("removeColumn", "removeColumn");
			section.vW6(button, false);
			tab.panel.vRC(section);
			++vZF;
		};
	};
	if (tab.panel.v0A() > 0) {
		this.vNE.vu9(tab);
	};
};
com.wiris.v01.prototype.veH = function () {
	var v89 = this.formulaModel.v89();
	if (v89 != this.vaH) {
		this.vNE.v8A("copy", v89);
		this.vNE.v8A("cut", v89);
		this.vaH = v89;
	};
};
com.wiris.v01.prototype.vfH = function () {
	var v79 = this.formulaModel.v79();
	if (v79 != this.vbH) {
		this.vNE.v8A("paste", v79);
		this.vbH = v79;
	};
};
com.wiris.v01.prototype.vhH = function (style, vJ3) {
	if (style == null) {
		return;
	}; {
		var bold = style.isFlag(com.wiris.vy.vV2);
		if (vJ3 || bold != this.vjH) {
			this.vNE.vCA("bold", bold);
			this.vjH = bold;
		};
	}; {
		var italic = style.isFlag(com.wiris.vy.vU2);
		if (vJ3 || italic != this.vkH) {
			this.vNE.vCA("italic", italic);
			this.vkH = italic;
		};
	};
	var autoItalic = !style.isFlagMask(com.wiris.vy.vU2);
	if (vJ3 || autoItalic != this.viH) {
		this.vNE.vCA("autoItalic", autoItalic);
		this.viH = autoItalic;
	};
};
com.wiris.v01.prototype.vgH = function () {
	var v69 = this.formulaModel.v69();
	if (v69 != this.vcH) {
		this.vNE.v8A("redo", v69);
		this.vcH = v69;
	};
	var v59 = this.formulaModel.v59();
	if (v59 != this.vdH) {
		this.vNE.v8A("undo", v59);
		this.vdH = v59;
	};
};
com.wiris.v01.prototype.mathmlSetted = function (v1D) {
	null;
};
com.wiris.v01.prototype.__class__ = com.wiris.v01;
com.wiris.v01.__interfaces__ = [com.wiris.editor.EditorListener];
com.wiris.v11 = function (p) {
	if (p === v91) return; {
		null;
	}
};
com.wiris.v11.__name__ = ["com", "wiris", "v11"];
com.wiris.v11.prototype.vpE = function (vm2, width, height, c, vU5) {
	if (c == com.wiris.vQ.vn1) {
		return this.voH(vm2, height, vU5);
	};
	var i; {
		var vz2 = 0,
			v03 = com.wiris.v11.vpH.length;
		while (vz2 < v03) {
				var v13 = vz2++;
				if (c == com.wiris.v11.vpH[v13][0]) return this.vqH(vm2, com.wiris.v11.vpH[v13], height, vU5);
			};
	};
	return height;
};
com.wiris.v11.prototype.vrH = function (vm2, width, height, c, vU5) {
	return width;
};
com.wiris.v11.prototype.getWidth = function (vm2, c, width, height) {
	var i; {
		var vz2 = 0,
			v03 = com.wiris.v11.vpH.length;
		while (vz2 < v03) {
				var v13 = vz2++;
				if (com.wiris.v11.vpH[v13][0] == c) return this.vsH(vm2, com.wiris.v11.vpH[v13], width, height);
			};
	};
	return width;
};
com.wiris.v11.prototype.vR3 = function (vm2, c, x, vK1, baseline, width, height) {
	var vtH = vm2.getStyle();
	var vuH = com.wiris.vy.vH9(vtH);
	vuH.vv6(com.wiris.vy.vU2, false);
	vm2.setStyle(vuH);
	if (c == com.wiris.vQ.vn1) {
		this.vvH(vm2, x, vK1, baseline, width, height);
		return;
	};
	var i; {
		var vz2 = 0,
			v03 = com.wiris.v11.vpH.length;
		while (vz2 < v03) {
				var v13 = vz2++;
				if (com.wiris.v11.vpH[v13][0] == c) {
					this.vwH(vm2, com.wiris.v11.vpH[v13], x, vK1, baseline, height);
					return;
				};
			};
	};
	vm2.drawText(0, String.fromCharCode(c), x, vK1, baseline);
	vm2.setStyle(vtH);
};
com.wiris.v11.prototype.vsH = function (vm2, vxH, width, height) {
	this.vyH(vm2, vxH[2], height);
	var vzH = com.wiris.vS.max(com.wiris.vS.max(this.v0I(vm2, vxH[1]), this.v0I(vm2, vxH[2])), com.wiris.vS.max(this.v0I(vm2, vxH[3]), this.v0I(vm2, vxH[4])));
	return vzH + 2 * vm2.getLength(0.1);
};
com.wiris.v11.prototype.v1I = function (vm2, vxH, x, vK1, baseline, width) {
	var v2I = this.v0I(vm2, vxH[1]);
	var v3I = this.v0I(vm2, vxH[2]);
	var v4I = this.v0I(vm2, vxH[3]);
	var v5I = this.v0I(vm2, vxH[4]);
	var vLH = 0;
	var v6I = 0;
	var v7I = 0;
	if (vxH[4] == 0) {
		vLH = Math.round(Math.floor(1.0 * (width - v2I - v4I) / v3I));
	} else {
		v6I = Math.round(Math.floor((width / 2.0 - v2I - v5I / 2.0) / v3I));
		v7I = Math.round(Math.floor((width / 2.0 - v4I - v5I / 2.0) / v3I));
		vLH = v6I + v7I;
	};
	var v8I = v2I + v4I + v5I + vLH * v3I;
	x += (function (vH4) {
		var vI4;
		var vm4 = Math.floor((width - v8I) / 2.0);
		if (Std["is"](vm4, Int)) vm4;
		else throw "Class cast error";
		vI4 = vm4;
		return vI4;
	}(this));
	if (vxH[1] != 0) {
		this.v9I(vm2, vxH[1], 1, x, vK1);
		x += v2I;
	};
	if (vxH[4] == 0) {
		this.v9I(vm2, vxH[2], vLH, x, vK1);
		x += vLH * v3I;
	} else {
		this.v9I(vm2, vxH[2], v6I, x, vK1);
		x += v6I * v3I;
		this.v9I(vm2, vxH[4], 1, x, vK1);
		x += v5I;
		this.v9I(vm2, vxH[2], v7I, x, vK1);
		x += v7I * v3I;
	};
	if (vxH[3] != 0) {
		this.v9I(vm2, vxH[3], 1, x, vK1);
		x += v4I;
	};
};
com.wiris.v11.prototype.vwH = function (vm2, vxH, x, vK1, baseline, height) {
	this.vyH(vm2, vxH[2], height);
	var vAI = this.vBI(vm2, vxH[1]);
	var vCI = this.vBI(vm2, vxH[2]);
	var vDI = this.vBI(vm2, vxH[3]);
	var vEI = this.vBI(vm2, vxH[4]);
	var vLH = 0;
	var v6I = 0;
	var v7I = 0;
	if (vxH[4] == 0) {
		vLH = Math.round(Math.floor(1.0 * (height - vAI - vDI) / vCI));
	} else {
		v6I = Math.round(Math.floor((height / 2.0 - vAI - vEI / 2.0) / vCI));
		v7I = Math.round(Math.floor((height / 2.0 - vDI - vEI / 2.0) / vCI));
		vLH = v6I + v7I;
	};
	var vFI = vAI + vDI + vEI + vLH * vCI;
	vK1 += (function (vH4) {
		var vI4;
		var vm4 = Math.round(2.0 / 3.0 * (height - vFI));
		if (Std["is"](vm4, Int)) vm4;
		else throw "Class cast error";
		vI4 = vm4;
		return vI4;
	}(this));
	x += vm2.getLength(0.1);
	if (vxH[4] == 9128) x += vm2.getLength(0.1);
	if (vxH[1] != 0) {
		this.vGI(vm2, vxH[1], 1, x, vK1);
		vK1 += vAI;
	};
	if (vxH[4] == 0) {
		this.vGI(vm2, vxH[2], vLH, x, vK1);
		vK1 += vLH * vCI;
	} else {
		this.vGI(vm2, vxH[2], v6I, x, vK1);
		vK1 += v6I * vCI;
		this.vGI(vm2, vxH[4], 1, x, vK1);
		vK1 += vEI;
		this.vGI(vm2, vxH[2], v7I, x, vK1);
		vK1 += v7I * vCI;
	};
	if (vxH[3] != 0) {
		this.vGI(vm2, vxH[3], 1, x, vK1);
		vK1 += vDI;
	};
};
com.wiris.v11.prototype.vyH = function (vm2, c, height) {
	vm2.setBracketsSmaller(false);
	if (Math.round(height / this.vBI(vm2, c)) < 3) {
		vm2.setBracketsSmaller(true);
	};
};
com.wiris.v11.prototype.vBI = function (vm2, vHI) {
	return vHI != 0 ? vm2.getHeight(String.fromCharCode(vHI)) : 0;
};
com.wiris.v11.prototype.v0I = function (vm2, vHI) {
	var width;
	if (vHI == 0) {
		width = 0;
	} else {
		width = vm2.getWidth(String.fromCharCode(vHI));
		if (vHI == 9128 || vHI == 9132) width += vm2.getLength(0.1);
	};
	return width;
};
com.wiris.v11.prototype.voH = function (vm2, height, vU5) {
	var vII = vm2.getHeight(String.fromCharCode(com.wiris.vQ.vn1));
	var v72 = 2;
	var vJI = Math.max(1.0 * (height - vII) / v72, 0.0);
	var vLH = 0;
	if (vU5 == com.wiris.v11.vKI) vLH = (function (vH4) {
		var vI4;
		var vm4 = Math.round(vJI);
		if (Std["is"](vm4, Int)) vm4;
		else throw "Class cast error";
		vI4 = vm4;
		return vI4;
	}(this));
	else if (vU5 == com.wiris.v11.vLI) vLH = (function (vH4) {
		var vI4;
		var vm4 = Math.floor(vJI);
		if (Std["is"](vm4, Int)) vm4;
		else throw "Class cast error";
		vI4 = vm4;
		return vI4;
	}(this));
	else if (vU5 == com.wiris.v11.vqE) vLH = (function (vH4) {
		var vI4;
		var vm4 = Math.ceil(vJI);
		if (Std["is"](vm4, Int)) vm4;
		else throw "Class cast error";
		vI4 = vm4;
		return vI4;
	}(this));
	return vII + vLH * v72;
};
com.wiris.v11.prototype.vqH = function (vm2, c, height, vU5) {
	return height;
};
com.wiris.v11.prototype.vvH = function (vm2, x, vK1, baseline, width, height) {
	var vMI = com.wiris.vQ.vn1;
	var vNI = String.fromCharCode(vMI);
	var vOI = width - vm2.getWidth(vNI);
	var vPI = vOI > 0 ? com.wiris.vQ.v92 : vMI;
	var vII = vm2.getHeight(vNI);
	var v72 = 2;
	var vQI = height - vII;
	var vRI = false;
	if (vQI > 0) {
		if (Math.round(vQI / (function (vH4) {
			var vI4;
			var vm4 = v72;
			if (Std["is"](vm4, Float)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this))) < com.wiris.vQ.v82 - com.wiris.vQ.vn1) {
			vPI += (function (vH4) {
				var vI4;
				var vm4 = Math.round(vQI / (function (vH4) {
					var vI4;
					var vm4 = v72;
					if (Std["is"](vm4, Float)) vm4;
					else throw "Class cast error";
					vI4 = vm4;
					return vI4;
				}(vH4)));
				if (Std["is"](vm4, Int)) vm4;
				else throw "Class cast error";
				vI4 = vm4;
				return vI4;
			}(this));
		} else {
			vPI += com.wiris.vQ.v82 - com.wiris.vQ.vn1;
			vRI = true;
		};
	};
	if (vOI > 0) {
		v72 = vm2.getLength(0.1);
		var vSI = (function (vH4) {
			var vI4;
			var vm4 = Math.floor(height - vm2.getHeight(String.fromCharCode(vPI)) * 0.4);
			if (Std["is"](vm4, Int)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this));
		var vTI = vOI + Math.round(Math.round(1.25 * v72));
		var vUI = vm2.getWidth(String.fromCharCode(com.wiris.vQ.vB2));
		var vLH = Math.round(Math.floor(1.0 * vTI / vUI));
		var vVI = vLH * vUI;
		this.v9I(vm2, com.wiris.vQ.vB2, vLH, x + (vTI - vVI), vK1 + vSI - vm2.getBaseline(String.fromCharCode(com.wiris.vQ.vB2)));
	};
	if (vRI) {
		this.vWI(vm2, com.wiris.vQ.vo1, height, x + width - 1, vK1, vm2.getBaseline(String.fromCharCode(com.wiris.vQ.vo1)));
	};
	vm2.drawText(1, String.fromCharCode(vPI), x + vOI, vK1, baseline);
};
com.wiris.v11.prototype.v9I = function (vm2, c, n, x, vK1) {
	var t = String.fromCharCode(c);
	var b = vm2.getBaseline(t);
	var vzH = vm2.getWidth(t);
	var i; {
		var v03 = 0;
		while (v03 < n) {
			var v13 = v03++;
			vm2.drawText(v13, t, x, vK1, b);
			x += vzH;
		};
	};
};
com.wiris.v11.prototype.vGI = function (vm2, c, n, x, vK1) {
	var t = String.fromCharCode(c);
	var b = vm2.getBaseline(t);
	var vrE = vm2.getHeight(t);
	var i; {
		var v03 = 0;
		while (v03 < n) {
			var v13 = v03++;
			vm2.drawText(v13, t, x, vK1, b);
			vK1 += vrE;
		};
	};
};
com.wiris.v11.prototype.vWI = function (vm2, c, height, x, vK1, baseline) {
	var s = String.fromCharCode(c);
	var vrE = vm2.getHeight(s);
	var vXI = 0;
	while (vXI + vrE <= height) {
		vm2.drawText(0, s, x, vK1 + vXI, baseline);
		vXI += vrE;
	};
	vm2.drawVerticalLine(0, x, vK1 + vXI, height - vXI);
};
com.wiris.v11.prototype.v4B = function (c) {
	if (c == com.wiris.vQ.vn1) return true;
	var i; {
		var vz2 = 0,
			v03 = com.wiris.v11.vpH.length;
		while (vz2 < v03) {
				var v13 = vz2++;
				if (c == com.wiris.v11.vpH[v13][0]) return true;
			};
	};
	return false;
};
com.wiris.v11.prototype.__class__ = com.wiris.v11;
com.wiris.editor.EditorModelInterface = function () {};
com.wiris.editor.EditorModelInterface.__name__ = ["com", "wiris", "editor", "EditorModelInterface"];
com.wiris.editor.EditorModelInterface.prototype.action = null;
com.wiris.editor.EditorModelInterface.prototype.actionWithParam = null;
com.wiris.editor.EditorModelInterface.prototype.addEditorListener = null;
com.wiris.editor.EditorModelInterface.prototype.removeEditorListener = null;
com.wiris.editor.EditorModelInterface.prototype.beginEventTransaction = null;
com.wiris.editor.EditorModelInterface.prototype.clearMetricsCache = null;
com.wiris.editor.EditorModelInterface.prototype.endEventTransaction = null;
com.wiris.editor.EditorModelInterface.prototype.formulaToStandard = null;
com.wiris.editor.EditorModelInterface.prototype.getCaretRectangle = null;
com.wiris.editor.EditorModelInterface.prototype.getFormulaBaseline = null;
com.wiris.editor.EditorModelInterface.prototype.getFormulaHeight = null;
com.wiris.editor.EditorModelInterface.prototype.getFormulaWidth = null;
com.wiris.editor.EditorModelInterface.prototype.getMathML = null;
com.wiris.editor.EditorModelInterface.prototype.getPositionFromPoint = null;
com.wiris.editor.EditorModelInterface.prototype.getSelectionRectangles = null;
com.wiris.editor.EditorModelInterface.prototype.getToolbarModel = null;
com.wiris.editor.EditorModelInterface.prototype.handleKeyEvent = null;
com.wiris.editor.EditorModelInterface.prototype.keyEventIsHandled = null;
com.wiris.editor.EditorModelInterface.prototype.insertMathML = null;
com.wiris.editor.EditorModelInterface.prototype.insertText = null;
com.wiris.editor.EditorModelInterface.prototype.isFormulaEmpty = null;
com.wiris.editor.EditorModelInterface.prototype.isRecalcNeeded = null;
com.wiris.editor.EditorModelInterface.prototype.paint = null;
com.wiris.editor.EditorModelInterface.prototype.recalc = null;
com.wiris.editor.EditorModelInterface.prototype.reset = null;
com.wiris.editor.EditorModelInterface.prototype.selectWord = null;
com.wiris.editor.EditorModelInterface.prototype.setCaret = null;
com.wiris.editor.EditorModelInterface.prototype.setMathML = null;
com.wiris.editor.EditorModelInterface.prototype.standardToFormula = null;
com.wiris.editor.EditorModelInterface.prototype.getCaret = null;
com.wiris.editor.EditorModelInterface.prototype.getCaretLength = null;
com.wiris.editor.EditorModelInterface.prototype.setDefaultStyles = null;
com.wiris.editor.EditorModelInterface.prototype.getDefaultStyles = null;
com.wiris.editor.EditorModelInterface.prototype.getDesiredDefaultStyles = null;
com.wiris.editor.EditorModelInterface.prototype.setSelectionStyles = null;
com.wiris.editor.EditorModelInterface.prototype.getCurrentStyles = null;
com.wiris.editor.EditorModelInterface.prototype.getCurrentActualStyles = null;
com.wiris.editor.EditorModelInterface.prototype.setParams = null;
com.wiris.editor.EditorModelInterface.prototype.isReady = null;
com.wiris.editor.EditorModelInterface.prototype.__class__ = com.wiris.editor.EditorModelInterface;
com.wiris.editor.formula.UndoState = {
	vTC: ["com", "wiris", "editor", "formula", "UndoState"],
	vUC: ["UNDO_NORMAL", "UNDO_UNDO", "UNDO_REDO"]
};
com.wiris.editor.formula.UndoState.UNDO_NORMAL = ["UNDO_NORMAL", 0];
com.wiris.editor.formula.UndoState.UNDO_NORMAL.toString = v71;
com.wiris.editor.formula.UndoState.UNDO_NORMAL.vcA = com.wiris.editor.formula.UndoState;
com.wiris.editor.formula.UndoState.UNDO_UNDO = ["UNDO_UNDO", 1];
com.wiris.editor.formula.UndoState.UNDO_UNDO.toString = v71;
com.wiris.editor.formula.UndoState.UNDO_UNDO.vcA = com.wiris.editor.formula.UndoState;
com.wiris.editor.formula.UndoState.UNDO_REDO = ["UNDO_REDO", 2];
com.wiris.editor.formula.UndoState.UNDO_REDO.toString = v71;
com.wiris.editor.formula.UndoState.UNDO_REDO.vcA = com.wiris.editor.formula.UndoState;
com.wiris.v21 = function () {};
com.wiris.v21.__name__ = ["com", "wiris", "v21"];
com.wiris.v21.vpB = function (element) {
	var v1F = new StringBuf();
	var i = element.iterator();
	while (i.hasNext()) {
		v1F.b[v1F.b.length] = i.next().toString();
	};
	return v1F.b.join("");
};
com.wiris.v21.vRG = function (vYI, vZI, vaI) {
	var nodes = new Array();
	while (vYI.hasNext()) {
		var node = vYI.next();
		if (node.nodeType == Xml.Element && vaI == com.wiris.v21.getAttribute(node, vZI)) {
			nodes.push(node);
		};
	};
	return nodes;
};
com.wiris.v21.getElementsByTagName = function (vYI, vA9) {
	var nodes = new Array();
	while (vYI.hasNext()) {
		var node = vYI.next();
		if (node.nodeType == Xml.Element && node.getNodeName() == vA9) {
			nodes.push(node);
		};
	};
	return nodes;
};
com.wiris.v21.getElements = function (node) {
	var nodes = new Array();
	var vYI = node.iterator();
	while (vYI.hasNext()) {
		var vS4 = vYI.next();
		if (vS4.nodeType == Xml.Element) {
			nodes.push(vS4);
		};
	};
	return nodes;
};
com.wiris.v21.vbI = function (doc) {
	var vYI = doc.iterator();
	while (vYI.hasNext()) {
		var node = vYI.next();
		if (node.nodeType == Xml.Element) {
			return node;
		};
	};
	return null;
};
com.wiris.v21.getAttribute = function (node, vZI) {
	var value = node.get(vZI);
	if (value == null) {
		return null;
	};
	if (com.wiris.v61.vcI) {
		return com.wiris.v21.htmlUnescape(value);
	};
	return value;
};
com.wiris.v21.createPCData = function (node, text) {
	if (com.wiris.v61.vcI) {
		text = com.wiris.v21.htmlEscape(text);
	};
	return Xml.createPCData(text);
};
com.wiris.v21.htmlEscape = function (input) {
	var output = StringTools.replace(input, "&", "&amp;");
	output = StringTools.replace(output, "<", "&lt;");
	output = StringTools.replace(output, ">", "&gt;");
	output = StringTools.replace(output, "\"", "&quot;");
	return output;
};
com.wiris.v21.htmlUnescape = function (input) {
	var output = [];
	var start = 0;
	var position = input.indexOf("&", start);
	while (position != -1) {
		output.push( input.substr(start, position - start));
		if (input.charAt(position + 1) == "#") {
			var vdI = position + 2;
			var vP8 = input.indexOf(";", vdI);
			if (vP8 != -1) {
				var charCode = Std.parseInt(input.substr(vdI, vP8 - vdI));
				output.push( String.fromCharCode(charCode));
				start = vP8 + 1;
			} else {
				output.push( "&");
				start = position + 1;
			};
		} else {
			output.push( "&");
			start = position + 1;
		};
		position = input.indexOf("&", start);
	};
    output.push(input.substr(start, input.length - start));
	output = StringTools.replace(output.join(''), "&amp;", "&");
	output = StringTools.replace(output, "&lt;", "<");
	output = StringTools.replace(output, "&gt;", ">");
	output = StringTools.replace(output, "&quot;", "\"");
	return output;
};
com.wiris.v21.veI = null;
com.wiris.v21.vj8 = function (xml) {
	xml = com.wiris.v21.vfI(xml);
	var x = Xml.parse(xml);
	return x;
};
com.wiris.v21.vgI = function (xml) {
	var s = xml.toString();
	s = com.wiris.v21.vfI(s);
	return s;
};
com.wiris.v21.vfI = function (text) {
	com.wiris.v21.vhI();
	var v1F = new StringBuf();
	var i = 0;
	var n = text.length;
	while (i < n) {
		var c = text.charCodeAt(i);
		if (c > 127) {
			v1F.b[v1F.b.length] = "&#";
			v1F.b[v1F.b.length] = "" + c;
			v1F.b[v1F.b.length] = ";";
		} else {
			v1F.b[v1F.b.length] = String.fromCharCode(c);
			if (c == 38) {
				i++;
				c = text.charCodeAt(i);
				if (com.wiris.v21.viI(c)) {
					var name = new StringBuf();
					name.b[name.b.length] = String.fromCharCode(c);
					i++;
					c = text.charCodeAt(i);
					while (com.wiris.v21.vjI(c)) {
						name.b[name.b.length] = String.fromCharCode(c);
						i++;
						c = text.charCodeAt(i);
					};
					var vkI = name.b.join("");
					if (c == 59 && com.wiris.v21.veI.exists(vkI)) {
						var vlI = com.wiris.v21.veI.get(vkI);
						v1F.b[v1F.b.length] = "#";
						v1F.b[v1F.b.length] = vlI;
					} else {
						v1F.b[v1F.b.length] = name;
					};
				} else if (c == 35) {
					v1F.b[v1F.b.length] = String.fromCharCode(c);
					i++;
					c = text.charCodeAt(i);
					if (c == 120) {
						var hex = new StringBuf();
						i++;
						c = text.charCodeAt(i);
						while (com.wiris.v21.vmI(c)) {
							hex.b[hex.b.length] = String.fromCharCode(c);
							i++;
							c = text.charCodeAt(i);
						};
						var vnI = hex.b.join("");
						if (c == 59) {
							var voI = Std.parseInt("0x" + vnI);
							v1F.b[v1F.b.length] = "" + voI;
						} else {
							v1F.b[v1F.b.length] = "x";
							v1F.b[v1F.b.length] = vnI;
						};
					};
				};
				v1F.b[v1F.b.length] = String.fromCharCode(c);
			};
		};
		i++;
	};
	return v1F.b.join("");
};
com.wiris.v21.viI = function (c) {
	if (65 <= c && c <= 90) return true;
	if (97 <= c && c <= 122) return true;
	if (c == 95 || c == 58) return true;
	return false;
};
com.wiris.v21.vjI = function (c) {
	if (com.wiris.v21.viI(c)) return true;
	if (48 <= c && c <= 57) return true;
	if (c == 46 || c == 45) return true;
	return false;
};
com.wiris.v21.vmI = function (c) {
	if (c >= 48 && c <= 57) return true;
	if (c >= 65 && c <= 70) return true;
	if (c >= 97 && c <= 102) return true;
	return false;
};
com.wiris.v21.vhI = function () {
	if (com.wiris.v21.veI == null) {
		var e = com.wiris.vq.vpI;
		com.wiris.v21.veI = new Hash();
		var start = 0;
		var voA;
		while ((voA = e.indexOf("@", start)) != -1) {
			var name = e.substr(start, voA - start);
			voA++;
			start = e.indexOf("@", voA);
			if (start == -1) break;
			var value = e.substr(voA, start - voA);
			var vLH = Std.parseInt("0x" + value);
			com.wiris.v21.veI.set(name, "" + vLH);
			start++;
		};
	};
};
com.wiris.v21.prototype.__class__ = com.wiris.v21;
if (!com.wiris.util.css) com.wiris.util.css = {};
com.wiris.v31 = function () {};
com.wiris.v31.__name__ = ["com", "wiris", "v31"];
com.wiris.v31.vz8 = function (color) {
	if (color.charAt(0) != "#") {
		return 0;
	};
	var vqI = color.length;
	if (vqI == 4) {
		color = "" + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2) + color.charAt(3) + color.charAt(3);
	} else if (vqI == 7) {
		color = color.substr(1, 6);
	} else {
		return 0;
	};
	return com.wiris.vS.vMB(color);
};
com.wiris.v31.vrI = function (color) {
	return "#" + com.wiris.vS.vKB(color, 6);
};
com.wiris.v31.vGH = function (vsI) {
	if (!(vsI.substr(vsI.length - 2, 2) == "px")) {
		return 0;
	};
	return Std.parseInt(vsI.substr(0, vsI.length - 2));
};
com.wiris.v31.vhB = function (vtI) {
	if (vtI == null) return "";
	var v1F = new StringBuf();
	var keys = vtI.keys();
	while (keys.hasNext()) {
		var vU1 = keys.next();
		v1F.b[v1F.b.length] = vU1;
		v1F.b[v1F.b.length] = ":";
		v1F.b[v1F.b.length] = vtI.get(vU1);
		if (keys.hasNext()) v1F.b[v1F.b.length] = ";";
	};
	return v1F.b.join("");
};
com.wiris.v31.vjB = function (vtI) {
	var voB = vtI.split(";");
	var h = new Hash();
	var i; {
		var vz2 = 0,
			v03 = voB.length;
		while (vz2 < v03) {
				var v13 = vz2++;
				var vuI = voB[v13].split(":");
				if (vuI.length >= 2) {
					h.set(vuI[0], vuI[1]);
				};
			};
	};
	return h;
};
com.wiris.v31.prototype.__class__ = com.wiris.v31;
com.wiris.editor.EditorModel = function (vk6, parameters) {
	if (vk6 === v91) return; {
		this.actions = new Hash();
		this.eventTransactionSemaphore = 0;
		this.listeners = new Array();
		this.mathmlSetted = false;
		this.remainingCalls = 0;
		this.toolbar = null;
		var vtF = null;
		if (vk6 != null) {
			vk6 = vk6.firstChild();
			var vvI = com.wiris.v21.getElementsByTagName(vk6.iterator(), "toolbar");
			if (vvI.length == 0) {
				throw "There is not a \"toolbar\" node in the editor definition.";
			};
			var vwI = com.wiris.v21.getElementsByTagName(vk6.iterator(), "images");
			if (vwI.length == 0) {
				throw "There is not an \"images\" node in the editor definition.";
			};
			vtF = new com.wiris.vx(vwI[0]);
			var vxI = com.wiris.v21.getElementsByTagName(vk6.iterator(), "actions");
			if (vxI.length == 0) {
				throw "There is not a \"actions\" node in the editor definition.";
			};
			var vHG = vxI[0];
			this.actions = com.wiris.vr.vGG(vHG, vtF);
			this.toolbar = com.wiris.vr.v8G(vvI[0], this.actions, vtF, parameters);
		} else {
			this.toolbar = new com.wiris.vK();
		};
		this.toolbar.vb6(this);
		this.formulaModel = new com.wiris.vF();
		var vyI = new com.wiris.v01(this.formulaModel, this.toolbar, vtF);
		this.addEditorListener(vyI);
		if (parameters != null) {
			this.setParams(parameters);
		};
	}
};
com.wiris.editor.EditorModel.__name__ = ["com", "wiris", "editor", "EditorModel"];
com.wiris.editor.EditorModel.getNewInstance = function () {
	return com.wiris.editor.EditorModel.getNewInstanceWithParams(null);
};
com.wiris.editor.EditorModel.getNewInstanceWithParams = function (parameters) {
	var resourceLoader = new com.wiris.vD();
	var vzI = resourceLoader.vT1("editor_definition.xml");
	if (vzI == null) {
		return new com.wiris.editor.EditorModel(null, null);
	};
	return new com.wiris.editor.EditorModel(com.wiris.v21.vj8(vzI), parameters);
};
com.wiris.editor.EditorModel.prototype.actions = null;
com.wiris.editor.EditorModel.prototype.eventTransactionSemaphore = null;
com.wiris.editor.EditorModel.prototype.formulaModel = null;
com.wiris.editor.EditorModel.prototype.listeners = null;
com.wiris.editor.EditorModel.prototype.mathmlSetted = null;
com.wiris.editor.EditorModel.prototype.remainingCalls = null;
com.wiris.editor.EditorModel.prototype.toolbar = null;
com.wiris.editor.EditorModel.prototype.action = function (v0J) {
	if (v0J == "undo") {
		this.formulaModel.undo();
	} else if (v0J == "redo") {
		this.formulaModel.redo();
	} else if (v0J == "bold") {
		this.formulaModel.vu8();
	} else if (v0J == "italic") {
		this.formulaModel.vv8();
	} else if (v0J == "autoItalic") {
		this.formulaModel.v19();
	} else if (v0J == "copy") {
		this.formulaModel.copy();
	} else if (v0J == "paste") {
		this.formulaModel.paste();
	} else if (v0J == "cut") {
		this.formulaModel.cut();
	} else if (v0J == "appendRow") {
		this.formulaModel.appendRow();
	} else if (v0J == "prependRow") {
		this.formulaModel.prependRow();
	} else if (v0J == "removeRow") {
		this.formulaModel.removeRow();
	} else if (v0J == "appendColumn") {
		this.formulaModel.appendColumn();
	} else if (v0J == "prependColumn") {
		this.formulaModel.prependColumn();
	} else if (v0J == "removeColumn") {
		this.formulaModel.removeColumn();
	} else {
		var action = this.actions.get(v0J);
		if (action != null) {
			if (action.command == "insertion") {
				if (action.vBD) {
					this.insertMathML(action.content, action.vp7);
				} else {
					this.insertText(action.content);
				};
			} else {
				this.action(action.command);
			};
		};
	};
	this.dispatchEvents();
};
com.wiris.editor.EditorModel.prototype.actionWithParam = function (v0J, v1J) {
	if (v0J == "setFontFamily") {
		this.formulaModel.setFontFamily(v1J);
		this.dispatchEvents();
	} else if (v0J == "setFontSize") {
		var vsI = v1J == "inherit" ? -1 : com.wiris.v31.vGH(v1J);
		this.formulaModel.setFontSize(vsI);
		this.dispatchEvents();
	} else if (v0J == "setColor") {
		this.formulaModel.setColor(v1J);
		this.dispatchEvents();
	};
};
com.wiris.editor.EditorModel.prototype.addEditorListener = function (listener) {
	this.listeners.push(listener);
};
com.wiris.editor.EditorModel.prototype.removeEditorListener = function (listener) {
	this.listeners.remove(listener);
};
com.wiris.editor.EditorModel.prototype.beginEventTransaction = function () {
	++this.eventTransactionSemaphore;
};
com.wiris.editor.EditorModel.prototype.clearMetricsCache = function () {
	this.formulaModel.vt8();
};
com.wiris.editor.EditorModel.prototype.componentFired = function (v1D, vX6) {
	if (Std["is"](vX6, com.wiris.vN)) {
		var button = (function (vH4) {
			var vI4;
			var vm4 = vX6;
			if (Std["is"](vm4, com.wiris.vN)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this));
		if (button.action != null) {
			if (button.action.id == null) {
				if (button.action.vBD) {
					this.insertMathML(button.action.content, button.action.vp7);
				} else {
					this.insertText(button.action.content);
				};
			} else {
				this.action(button.action.id);
			};
		};
	} else if (Std["is"](vX6, com.wiris.vn)) {
		var select = (function (vH4) {
			var vI4;
			var vm4 = vX6;
			if (Std["is"](vm4, com.wiris.vn)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this));
		if (select.action != null) {
			this.actionWithParam(select.action.id, select.value);
		};
	} else if (Std["is"](vX6, com.wiris.vV)) {
		var colorChooser = (function (vH4) {
			var vI4;
			var vm4 = vX6;
			if (Std["is"](vm4, com.wiris.vV)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this));
		if (colorChooser.action != null) {
			this.actionWithParam(colorChooser.action.id, colorChooser.value);
		};
	};
};
com.wiris.editor.EditorModel.prototype.componentUpdated = function (v1D, vX6) {
	null;
};
com.wiris.editor.EditorModel.prototype.contextTabAdded = function (v1D, tab) {
	null;
};
com.wiris.editor.EditorModel.prototype.dispatchEvents = function () {
	if (this.eventTransactionSemaphore == 0) {
		var vp8 = this.formulaModel.vp8();
		var vq8 = this.formulaModel.vq8();
		var vo8 = this.formulaModel.vo8();
		var vr8 = this.formulaModel.vr8();
		this.formulaModel.vn8();
		if (vp8) {
			var i = this.listeners.iterator();
			while (i.hasNext()) {
				i.next().caretPositionChanged(this);
			};
		};
		if (vq8) {
			var i = this.listeners.iterator();
			while (i.hasNext()) {
				i.next().clipboardChanged(this);
			};
		};
		if (vo8) {
			var i = this.listeners.iterator();
			while (i.hasNext()) {
				i.next().contentChanged(this);
			};
		};
		if (vr8) {
			var i = this.listeners.iterator();
			while (i.hasNext()) {
				i.next().styleChanged(this);
			};
		};
		if (this.mathmlSetted) {
			this.mathmlSetted = false;
			var i = this.listeners.iterator();
			while (i.hasNext()) {
				i.next().mathmlSetted(this);
			};
		};
	};
};
com.wiris.editor.EditorModel.prototype.endEventTransaction = function () {
	--this.eventTransactionSemaphore;
	if (this.eventTransactionSemaphore < 0) {
		this.eventTransactionSemaphore = 0;
	};
	this.dispatchEvents();
};
com.wiris.editor.EditorModel.prototype.formulaToStandard = function (formula) {
	var v2J = new com.wiris.vc();
	var v3J = com.wiris.v21.vj8(formula);
	return v2J.formulaToStandard(v3J).toString();
};
com.wiris.editor.EditorModel.prototype.getCaretRectangle = function () {
	var v4J = this.formulaModel.getCaretRectangle();
	this.dispatchEvents();
	return v4J;
};
com.wiris.editor.EditorModel.prototype.getFormulaBaseline = function () {
	return this.formulaModel.getBaseline();
};
com.wiris.editor.EditorModel.prototype.getFormulaHeight = function () {
	return this.formulaModel.getHeight();
};
com.wiris.editor.EditorModel.prototype.getFormulaWidth = function () {
	return this.formulaModel.getWidth();
};
com.wiris.editor.EditorModel.prototype.getMathML = function () {
	var vi8 = com.wiris.v21.vgI(this.formulaModel.va8());
	this.dispatchEvents();
	return vi8;
};
com.wiris.editor.EditorModel.prototype.getPositionFromPoint = function (x, vK1) {
	var position = this.formulaModel.getPositionFromPoint(x, vK1);
	this.dispatchEvents();
	return position;
};
com.wiris.editor.EditorModel.prototype.getSelectionRectangles = function () {
	var v5J = this.formulaModel.getSelectionRectangles();
	this.dispatchEvents();
	return v5J;
};
com.wiris.editor.EditorModel.prototype.getToolbarModel = function () {
	return this.toolbar;
};
com.wiris.editor.EditorModel.prototype.handleKeyEvent = function (keyCode, shiftKey, ctrlKey) {
	var result = this.formulaModel.handleKeyEvent(keyCode, shiftKey, ctrlKey);
	this.dispatchEvents();
	return result;
};
com.wiris.editor.EditorModel.prototype.keyEventIsHandled = function (keyCode, shiftKey, ctrlKey) {
	return ctrlKey;
};
com.wiris.editor.EditorModel.prototype.insertMathML = function (vi8, vp7) {
	this.formulaModel.insertMathML(vi8, vp7);
	this.dispatchEvents();
};
com.wiris.editor.EditorModel.prototype.insertText = function (text) {
	this.formulaModel.insertText(text);
	this.dispatchEvents();
};
com.wiris.editor.EditorModel.prototype.isFormulaEmpty = function () {
	return this.formulaModel.isEmpty();
};
com.wiris.editor.EditorModel.prototype.isRecalcNeeded = function () {
	return this.formulaModel.isRecalcNeeded();
};
com.wiris.editor.EditorModel.prototype.paint = function (vu3) {
	this.formulaModel.paint(vu3);
	this.dispatchEvents();
};
com.wiris.editor.EditorModel.prototype.recalc = function (vu3) {
	this.formulaModel.recalc(vu3);
};
com.wiris.editor.EditorModel.prototype.registerAction = function (action) {
	this.actions.set(action.id, action);
};
com.wiris.editor.EditorModel.prototype.reset = function () {
	this.formulaModel.reset();
};
com.wiris.editor.EditorModel.prototype.selectWord = function (vQ8) {
	this.formulaModel.selectWord(vQ8);
	this.dispatchEvents();
};
com.wiris.editor.EditorModel.prototype.setCaret = function (vx6, length) {
	this.formulaModel.setCaret(vx6, length);
	this.dispatchEvents();
};
com.wiris.editor.EditorModel.prototype.setMathML = function (vi8) {
	++this.remainingCalls;
	var parameters = new Hash();
	parameters.set("mml", vi8);
	com.wiris.vI.va9("mathml2internal", parameters, this);
};
com.wiris.editor.EditorModel.prototype.standardToFormula = function (v6J) {
	var v2J = new com.wiris.vc();
	var v7J = com.wiris.v21.vj8(v6J);
	return v2J.standardToFormula(v7J).toString();
};
com.wiris.editor.EditorModel.prototype.tabChanged = function (v1D, v9D, vAD) {
	null;
};
com.wiris.editor.EditorModel.prototype.tabRemoved = function (v1D, index) {
	null;
};
com.wiris.editor.EditorModel.prototype.getCaret = function () {
	return this.formulaModel.getCaret();
};
com.wiris.editor.EditorModel.prototype.getCaretLength = function () {
	return this.formulaModel.getCaretLength();
};
com.wiris.editor.EditorModel.prototype.setDefaultStyles = function (c) {
	this.formulaModel.setDefaultStyles(c);
	this.dispatchEvents();
};
com.wiris.editor.EditorModel.prototype.getDefaultStyles = function () {
	return this.formulaModel.getDefaultStyles();
};
com.wiris.editor.EditorModel.prototype.getDesiredDefaultStyles = function () {
	return this.formulaModel.getDesiredDefaultStyles();
};
com.wiris.editor.EditorModel.prototype.setSelectionStyles = function (s) {
	var vaC = com.wiris.vy.vH9(s);
	this.formulaModel.vl8(vaC);
	this.dispatchEvents();
};
com.wiris.editor.EditorModel.prototype.getCurrentStyles = function () {
	return this.formulaModel.getCurrentStyles();
};
com.wiris.editor.EditorModel.prototype.getCurrentActualStyles = function () {
	return this.formulaModel.getCurrentActualStyles();
};
com.wiris.editor.EditorModel.prototype.setParams = function (parameters) {
	var i = parameters.keys();
	var style = com.wiris.vy.vH9(this.getDefaultStyles());
	style.setParams(parameters);
	this.setDefaultStyles(style);
	while (i.hasNext()) {
		var vU1 = i.next();
		if ("mml" == vU1) {
			this.setMathML(parameters.get(vU1));
		};
	};
};
com.wiris.editor.EditorModel.prototype.serviceAnswerReceived = function (serviceName, parameters, v8J) {
	this.formulaModel.vb8(com.wiris.v21.vj8(v8J));
	--this.remainingCalls;
	this.mathmlSetted = true;
	this.dispatchEvents();
};
com.wiris.editor.EditorModel.prototype.isReady = function () {
	return this.remainingCalls == 0;
};
com.wiris.editor.EditorModel.prototype.__class__ = com.wiris.editor.EditorModel;
com.wiris.editor.EditorModel.__interfaces__ = [com.wiris.vA, com.wiris.vO, com.wiris.editor.EditorModelInterface];
js.Lib = function () {};
js.Lib.__name__ = ["js", "Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function (v) {
	alert(js.Boot.__string_rec(v, ""));
};
js.Lib.eval = function (v9J) {
	return eval(v9J);
};
js.Lib.setErrorHandler = function (f) {
	js.Lib.onerror = f;
};
js.Lib.prototype.__class__ = js.Lib;
com.wiris.v41 = function (p) {
	if (p === v91) return; {
		null;
	}
};
com.wiris.v41.__name__ = ["com", "wiris", "v41"];
com.wiris.v41.prototype.vq2 = function (vOB, top, box, vd2, vo7) {
	if (vd2 != null) this.vI3(box, vd2, vo7 == com.wiris.vF.vw7, true);
	return this.vr7(vOB, top, box);
};
com.wiris.v41.prototype.vr7 = function (vOB, top, box) {
	var x = vOB.vb7();
	if (Std["is"](box, com.wiris.vw)) {
		return this.vr7(vOB, top, box.vw2(0));
	};
	if (Std["is"](vOB, com.wiris.vH)) {
		var vAJ = (function (vH4) {
			var vI4;
			var vm4 = vOB;
			if (Std["is"](vm4, com.wiris.vH)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this));
		if (vAJ.box.vV9().length == 0) {
			vOB.vq2(box);
		} else {
			this.vBJ(vAJ.box, vAJ.vY4);
			var vCJ = com.wiris.vm.select(top, x, 0);
			return this.vr7(vCJ, top, box);
		};
	};
	if (Std["is"](vOB, com.wiris.vU)) {
		if (Std["is"](box, com.wiris.vP)) {
			var vO7 = (function (vH4) {
				var vI4;
				var vm4 = box;
				if (Std["is"](vm4, com.wiris.vP)) vm4;
				else throw "Class cast error";
				vI4 = vm4;
				return vI4;
			}(this));
			if (vO7.vy2() == 1) {
				return this.vr7(vOB, top, vO7.vw2(0));
			};
		} else if (Std["is"](box, com.wiris.v8)) {
			vOB.vq2(box);
			return vOB;
		};
	};
	if (Std["is"](vOB, com.wiris.vT) && !Std["is"](vOB, com.wiris.vU)) {
		if (Std["is"](box, com.wiris.vR)) {
			var vDJ = (function (vH4) {
				var vI4;
				var vm4 = vOB;
				if (Std["is"](vm4, com.wiris.vT)) vm4;
				else throw "Class cast error";
				vI4 = vm4;
				return vI4;
			}(this));
			var vO7 = (function (vH4) {
				var vI4;
				var vm4 = vDJ.box;
				if (Std["is"](vm4, com.wiris.vP)) vm4;
				else throw "Class cast error";
				vI4 = vm4;
				return vI4;
			}(this));
			if (vO7.vy2() == 1 && Std["is"](vO7.vw2(0), com.wiris.vR) && ((function (vH4) {
				var vI4;
				var vm4 = vO7.vw2(0);
				if (Std["is"](vm4, com.wiris.vR)) vm4;
				else throw "Class cast error";
				vI4 = vm4;
				return vI4;
			}(this))).vV9().length == 0) {
				var vAJ = com.wiris.vH.vT9((function (vH4) {
					var vI4;
					var vm4 = vO7.vw2(0);
					if (Std["is"](vm4, com.wiris.vR)) vm4;
					else throw "Class cast error";
					vI4 = vm4;
					return vI4;
				}(this)), 0, 0, null, null);
				vAJ.vq2(box);
				if (this.vEJ(vAJ.box)) {
					return com.wiris.vm.select(top, x - 1, 0);
				};
				return vAJ;
			};
		};
		if (Std["is"](box, com.wiris.vP)) {
			var action = this.vFJ(box);
			if (action != null && action.vy2() == 1 && Std["is"](action.vw2(0), com.wiris.vP) && action.vw2(0).vy2() == 0) {
				var argument = this.vGJ((function (vH4) {
					var vI4;
					var vm4 = vOB;
					if (Std["is"](vm4, com.wiris.vT)) vm4;
					else throw "Class cast error";
					vI4 = vm4;
					return vI4;
				}(this)));
				if (argument != null) {
					action.getParent()["delete"](action.vh2, 1);
				};
			};
			vOB.vq2(box);
			if (this.vEJ(vOB.vD7())) {
				vOB = com.wiris.vm.select(top, x - 1, 0);
			};
			return vOB;
		} else {
			box = com.wiris.vP.vOA(box);
			return this.vr7(vOB, top, box);
		};
	};
	return null;
};
com.wiris.v41.prototype.vEJ = function (b) {
	if (Std["is"](b, com.wiris.vL)) {
		var a = (function (vH4) {
			var vI4;
			var vm4 = b;
			if (Std["is"](vm4, com.wiris.vL)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this));
		if (com.wiris.vL.vTA == a.actiontype) {
			var p = a.getParent();
			var vHJ = a.vh2;
			p["delete"](vHJ, 1);
			var i;
			var n = a.vy2(); {
				var v03 = 0;
				while (v03 < n) {
					var v13 = v03++;
					var ve4 = a.vw2(0);
					a["delete"](0, 1);
					p.vq2(vHJ + v13, ve4);
				};
			};
			return true;
		};
	} else if (b.getParent() != null) {
		return this.vEJ(b.getParent());
	};
	return false;
};
com.wiris.v41.prototype.vFJ = function (b) {
	while (b.vy2() > 0) {
		if (Std["is"](b, com.wiris.vL)) {
			var a = (function (vH4) {
				var vI4;
				var vm4 = b;
				if (Std["is"](vm4, com.wiris.vL)) vm4;
				else throw "Class cast error";
				vI4 = vm4;
				return vI4;
			}(this));
			if (com.wiris.vL.vTA == a.actiontype) {
				return a;
			};
		};
		b = b.vw2(0);
	};
	return null;
};
com.wiris.v41.prototype.vGJ = function (s) {
	if (s.vY4 > 0 && s.vY4 == s.vd1) {
		return s.vD7().vw2(s.vY4 - 1);
	};
	return null;
};
com.wiris.v41.prototype.v48 = function (b, vY4, vd1, vo7) {
	if (vo7 == com.wiris.vF.vw7) null;
	this.vIJ(b, vY4, vo7, true);
	if (vY4 != vd1) this.vIJ(b, vd1, vo7, false);
};
com.wiris.v41.prototype.vIJ = function (b, x, vo7, vj7) {
	var vj4 = com.wiris.vm.vk4(b, x);
	if (Std["is"](vj4.b, com.wiris.vR)) {
		var vO7 = (function (vH4) {
			var vI4;
			var vm4 = vj4.b;
			if (Std["is"](vm4, com.wiris.vR)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this));
		var vgF = vO7.vU9(vj4.x);
		var vaC = vO7.vW9(vj4.x);
		if (!this.vJJ(vgF, vaC)) {
			this.vBJ(vO7, vj4.x);
		};
	};
	if (Std["is"](vj4.b, com.wiris.vP)) {
		var vO7 = (function (vH4) {
			var vI4;
			var vm4 = vj4.b;
			if (Std["is"](vm4, com.wiris.vP)) vm4;
			else throw "Class cast error";
			vI4 = vm4;
			return vI4;
		}(this));
		if (vj4.x > 0 && vj4.x < vO7.vy2()) {
			var left = vO7.vw2(vj4.x - 1);
			var right = vO7.vw2(vj4.x);
			if (Std["is"](left, com.wiris.vR) && Std["is"](right, com.wiris.vR)) {
				var vg5 = (function (vH4) {
					var vI4;
					var vm4 = left;
					if (Std["is"](vm4, com.wiris.vR)) vm4;
					else throw "Class cast error";
					vI4 = vm4;
					return vI4;
				}(this));
				var tr = (function (vH4) {
					var vI4;
					var vm4 = right;
					if (Std["is"](vm4, com.wiris.vR)) vm4;
					else throw "Class cast error";
					vI4 = vm4;
					return vI4;
				}(this));
				var vKJ = vg5.vd2.vAH(tr.vd2);
				if (!vKJ && this.vJJ(vg5.vV9(), tr.vV9())) {
					var k;
					k = 33;
				};
				if (vKJ && this.vJJ(vg5.vV9(), tr.vV9())) {
					vg5.vf8(vg5.vV9() + tr.vV9());
					vO7["delete"](tr.vh2, 1);
				};
			};
		};
		if (vo7 == com.wiris.vF.vz7 && !vj7) {
			this.vLJ(vO7, vj4.x);
		};
	};
};
com.wiris.v41.prototype.vBJ = function (vO7, x) {
	var vgF = vO7.vU9(x);
	var vaC = vO7.vW9(x);
	vO7.vf8(vgF);
	var vMJ = (function (vH4) {
		var vI4;
		var vm4 = vO7.vB3();
		if (Std["is"](vm4, com.wiris.vR)) vm4;
		else throw "Class cast error";
		vI4 = vm4;
		return vI4;
	}(this));
	vMJ.vf8(vaC);
	vO7.getParent().vq2(vO7.vh2 + 1, vMJ);
};
com.wiris.v41.prototype.vJJ = function (vgF, vaC) {
	if (vgF.length == 0 || vaC.length == 0) return false;
	var last = vgF.charCodeAt(vgF.length - 1);
	var first = vaC.charCodeAt(0);
	return com.wiris.vQ.veA(last) && com.wiris.vQ.veA(first);
};
com.wiris.v41.prototype.vM9 = function (top, vY4) {
	var b = this.vN9(top, vY4);
	if (b != null) return b.vd2;
	return new com.wiris.vy();
};
com.wiris.v41.prototype.vN9 = function (top, vY4) {
	var vj4 = com.wiris.vm.vk4(top, vY4);
	var b = vj4.b;
	if (Std["is"](vj4.b, com.wiris.vP)) {
		if (vj4.x > 0) {
			b = b.vw2(vj4.x - 1);
		} else if (b.vy2() > 0) {
			b = b.vw2(0);
		};
	};
	var p = b.getParent();
	var i = b.vh2;
	while (i >= 0) {
		var t = p.vw2(i);
		if (Std["is"](t, com.wiris.vR) && (!com.wiris.v41.vNJ || com.wiris.vm.vk8(t) == "mi")) {
			var vO7 = (function (vH4) {
				var vI4;
				var vm4 = t;
				if (Std["is"](vm4, com.wiris.vR)) vm4;
				else throw "Class cast error";
				vI4 = vm4;
				return vI4;
			}(this));
			if (!this.vOJ(vO7.vV9()) && !vO7.vJB()) {
				return t;
			};
		};
		i--;
	};
	return null;
};
com.wiris.v41.prototype.vI3 = function (b, a, vJ3, rec) {
	var tag = com.wiris.vm.vk8(b);
	if (!vJ3) a.v2H(b.vd2, true);
	if (!com.wiris.v41.vNJ || tag == "mi") b.vI3(a, vJ3, false);
	if (rec) {
		var i; {
			var vz2 = 0,
				v03 = b.vy2();
			while (vz2 < v03) {
					var v13 = vz2++;
					this.vI3(b.vw2(v13), a, vJ3, rec);
				};
		};
	};
};
com.wiris.v41.prototype.vLJ = function (vO7, vY4) {
	var s = "";
	var x = vY4;
	x--;
	while (x >= 0) {
		var c = vO7.vw2(x);
		if (Std["is"](c, com.wiris.vR)) {
			var vPJ = (function (vH4) {
				var vI4;
				var vm4 = c;
				if (Std["is"](vm4, com.wiris.vR)) vm4;
				else throw "Class cast error";
				vI4 = vm4;
				return vI4;
			}(this));
			s = vPJ.vV9() + s;
			if (this.vOJ(s)) {
				vO7["delete"](x, vY4 - x);
				var vQJ = new com.wiris.vR();
				vQJ.vf8(s);
				vQJ.vd2.vv6(com.wiris.vy.vU2, false);
				vO7.vq2(x, vQJ);
			};
		} else {
			return;
		};
		x--;
	};
};
com.wiris.v41.prototype.vOJ = function (str) {
	return com.wiris.v41.vRJ.indexOf("@" + str + "@") >= 0;
};
com.wiris.v41.prototype.__class__ = com.wiris.v41;
StringTools = function () {};
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function (s) {
	return encodeURIComponent(s);
};
StringTools.urlDecode = function (s) {
	return decodeURIComponent(s.split("+").join(" "));
};
StringTools.htmlEscape = function (s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
StringTools.htmlUnescape = function (s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
};
StringTools.startsWith = function (s, start) {
	return s.length >= start.length && s.substr(0, start.length) == start;
};
StringTools.endsWith = function (s, end) {
	var vSJ = end.length;
	var vTJ = s.length;
	return vTJ >= vSJ && s.substr(vTJ - vSJ, vSJ) == end;
};
StringTools.isSpace = function (s, pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
};
StringTools.ltrim = function (s) {
	var l = s.length;
	var r = 0;
	while (r < l && StringTools.isSpace(s, r)) {
		r++;
	};
	if (r > 0) return s.substr(r, l - r);
	else return s;
};
StringTools.rtrim = function (s) {
	var l = s.length;
	var r = 0;
	while (r < l && StringTools.isSpace(s, l - r - 1)) {
		r++;
	};
	if (r > 0) {
		return s.substr(0, l - r);
	} else {
		return s;
	};
};
StringTools.trim = function (s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.rpad = function (s, c, l) {
	var vUJ = s.length;
	var vWC = c.length;
	while (vUJ < l) {
		if (l - vUJ < vWC) {
			s += c.substr(0, l - vUJ);
			vUJ = l;
		} else {
			s += c;
			vUJ += vWC;
		};
	};
	return s;
};
StringTools.lpad = function (s, c, l) {
	var vVJ = "";
	var vUJ = s.length;
	if (vUJ >= l) return s;
	var vWC = c.length;
	while (vUJ < l) {
		if (l - vUJ < vWC) {
			vVJ += c.substr(0, l - vUJ);
			vUJ = l;
		} else {
			vVJ += c;
			vUJ += vWC;
		};
	};
	return vVJ + s;
};
StringTools.replace = function (s, sub, vhC) {
	return s.split(sub).join(vhC);
};
StringTools.hex = function (n, vLB) {
	var s = "";
	var vWJ = "0123456789ABCDEF";
	do {
		s = vWJ.charAt(n & 15) + s;
		n >>>= 4;
	} while (n > 0);
	if (vLB != null) while (s.length < vLB) s = "0" + s;
	return s;
};
StringTools.vXJ = function (s, index) {
	return s.cca(index);
};
StringTools.vYJ = function (c) {
	return c != c;
};
StringTools.prototype.__class__ = StringTools;
com.wiris.v51 = function (p) {
	if (p === v91) return; {
		null;
	}
};
com.wiris.v51.__name__ = ["com", "wiris", "v51"];
com.wiris.v51.vZJ = null;
com.wiris.v51.vaJ = function () {
	if (com.wiris.v51.vZJ == null) {
		var e = com.wiris.v51.vbJ + com.wiris.v51.vcJ;
		com.wiris.v51.vZJ = new Hash();
		var start = 0;
		var voA;
		while ((voA = e.indexOf("@", start)) != -1) {
			var vdJ = e.substr(start, voA - start);
			voA++;
			start = e.indexOf("@", voA);
			if (start == -1) break;
			var value = e.substr(voA, start - voA);
			start++;
			vdJ = com.wiris.v21.htmlUnescape(vdJ);
			var attributes = com.wiris.v51.veJ(value);
			var v52 = vdJ + "@" + attributes.form;
			com.wiris.v51.vZJ.set(v52, attributes);
		};
	};
};
com.wiris.v51.veJ = function (value) {
	var vdJ = new com.wiris.v9(null);
	vdJ.form = Std.parseInt(value.substr(0, 1));
	vdJ.lspace = Std.parseInt(value.substr(1, 1));
	vdJ.rspace = Std.parseInt(value.substr(2, 1));
	var n = Std.parseInt("0x" + value.substr(3));
	vdJ.vz5 = (n & com.wiris.v51.vfJ) != 0;
	vdJ.v06 = (n & com.wiris.v51.vgJ) != 0;
	vdJ.largeop = (n & com.wiris.v51.vhJ) != 0;
	vdJ.v16 = (n & com.wiris.v51.viJ) != 0 ? com.wiris.v9.vjJ : com.wiris.v9.vkJ;
	vdJ.v26 = (n & com.wiris.v51.vlJ) != 0;
	vdJ.v36 = (n & com.wiris.v51.vmJ) != 0;
	vdJ.v46 = (n & com.wiris.v51.vnJ) != 0;
	vdJ.v56 = (n & com.wiris.v51.voJ) != 0;
	return vdJ;
};
com.wiris.v51.prototype.vBB = function (vpJ, form) {
	com.wiris.v51.vaJ();
	var v52 = vpJ + "@" + form;
	var vdJ = com.wiris.v51.vZJ.get(v52);
	if (vdJ != null) return vdJ;
	vdJ = com.wiris.v51.vZJ.get(vpJ + "@1");
	if (vdJ != null) return vdJ;
	vdJ = com.wiris.v51.vZJ.get(vpJ + "@2");
	if (vdJ != null) return vdJ;
	vdJ = com.wiris.v51.vZJ.get(vpJ + "@0");
	if (vdJ != null) return vdJ;
	return new com.wiris.v9(null);
};
com.wiris.v51.prototype.__class__ = com.wiris.v51;
if (!com.wiris.settings) com.wiris.settings = {};
com.wiris.v61 = function () {};
com.wiris.v61.__name__ = ["com", "wiris", "v61"];
com.wiris.v61.prototype.__class__ = com.wiris.v61;
v91 = {};
js.Boot.vqJ = {};
js.Boot.__init(); {
	js["XMLHttpRequest"] = window.XMLHttpRequest ? XMLHttpRequest : window.ActiveXObject ?
	function () {
		try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		} catch (vJ4) {
			{
				var e = vJ4; {
					try {
						return new ActiveXObject("Microsoft.XMLHTTP");
					} catch (vrJ) {
						{
							var viD = vrJ; {
								throw "Unable to create XMLHttpRequest object.";
							};
						};
					};
				};
			};
		};
	} : (function (vH4) {
		var vI4;
		throw "Unable to create XMLHttpRequest object.";
		return vI4;
	}(this));
}; {
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function (i) {
		return isFinite(i);
	};
	Math.isNaN = function (i) {
		return isNaN(i);
	};
}; {
	Xml.Element = "element";
	Xml.PCData = "pcdata";
	Xml.CData = "cdata";
	Xml.Comment = "comment";
	Xml.DocType = "doctype";
	Xml.Prolog = "prolog";
	Xml.Document = "document";
}; {
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = {
		__name__: ["Int"]
	};
	Dynamic = {
		__name__: ["Dynamic"]
	};
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = {
		vTC: ["Bool"]
	};
	Class = {
		__name__: ["Class"]
	};
	Enum = {};
	Void = {
		vTC: ["Void"]
	};
}; {
	var d = Date;
	d.now = function () {
		return new Date();
	};
	d.fromTime = function (t) {
		var vsJ = new Date();
		vsJ["setTime"](t);
		return vsJ;
	};
	d.fromString = function (s) {
		switch (s.length) {
		case 8:
			{
				var k = s.split(":");
				var vsJ = new Date();
				vsJ["setTime"](0);

				vsJ["setUTCHours"](k[0]);
				vsJ["setUTCMinutes"](k[1]);
				vsJ["setUTCSeconds"](k[2]);
				return vsJ;
			}
			break;
		case 10:
			{
				var k = s.split("-");
				return new Date(k[0], k[1] - 1, k[2], 0, 0, 0);
			}
			break;
		case 19:
			{
				var k = s.split(" ");
				var vK1 = k[0].split("-");
				var t = k[1].split(":");
				return new Date(vK1[0], vK1[1] - 1, vK1[2], t[0], t[1], t[2]);
			}
			break;
		default:
			{
				throw "Invalid date format : " + s;
			}
			break;
		};
	};
	d.prototype["toString"] = function () {
		var date = this;
		var m = date.getMonth() + 1;
		var vsJ = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10 ? "0" + m : "" + m) + "-" + (vsJ < 10 ? "0" + vsJ : "" + vsJ) + " " + (h < 10 ? "0" + h : "" + h) + ":" + (mi < 10 ? "0" + mi : "" + mi) + ":" + (s < 10 ? "0" + s : "" + s);
	};
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}; {
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function (vP4, url, line) {
		var f = js.Lib.onerror;
		if (f == null) return false;
		return f(vP4, [url + ":" + line]);
	};
};
com.wiris.v1.vtJ = {
	fields: {
		vl2: {
			vuJ: null
		},
		vn2: {
			vuJ: null
		},
		vo2: {
			vuJ: null
		},
		vp2: {
			vuJ: null
		},
		vq2: {
			vuJ: null
		},
		replace: {
			vuJ: null
		},
		vx2: {
			vuJ: null
		},
		vy2: {
			vuJ: null
		},
		vw2: {
			vuJ: null
		},
		v43: {
			vuJ: null
		},
		getParent: {
			vuJ: null
		},
		v53: {
			vuJ: null
		},
		v73: {
			vuJ: null
		},
		v23: {
			vuJ: null
		},
		v83: {
			vuJ: null
		},
		vB3: {
			vuJ: null
		},
		vC3: {
			vuJ: null
		},
		vD3: {
			vuJ: null
		},
		v33: {
			vuJ: null
		},
		vF3: {
			vuJ: null
		},
		vG3: {
			vuJ: null
		},
		vH3: {
			vuJ: null
		},
		vI3: {
			vuJ: null
		},
		vK3: {
			vuJ: null
		},
		vL3: {
			vuJ: null
		},
		vM3: {
			vuJ: null
		}
	}
};
com.wiris.v1.vn3 = 0;
com.wiris.v1.vb3 = 1;
com.wiris.v1.vl3 = 2;
com.wiris.v1.vf3 = 3;
com.wiris.v1.vvJ = 4;
com.wiris.v1.v74 = 5;
com.wiris.v1.vwJ = 6;
com.wiris.v1.v64 = 7;
com.wiris.v3.vj3 = 0;
com.wiris.v3.vk3 = 1;
com.wiris.v3.vm3 = 2;
com.wiris.v4.vxJ = -1;
com.wiris.v4.vM5 = 0;
com.wiris.v4.vN5 = 1;
com.wiris.v4.vO5 = 2;
com.wiris.v4.vP5 = 3;
com.wiris.v4.vQ5 = 4;
com.wiris.v4.vG5 = 5;
com.wiris.v4.vH5 = 6;
com.wiris.v4.vI5 = 7;
com.wiris.v4.vs4 = ["left", "center", "right"];
com.wiris.v4.vS5 = ["axis", "top", "center", "bottom", "baseline"];
com.wiris.v4.vyJ = ["", "top", "middle", "bottom", "baseline"];
com.wiris.v5.vz3 = com.wiris.v3.vj3;
com.wiris.v5.v44 = com.wiris.v3.vk3;
com.wiris.v5.v34 = com.wiris.v3.vm3;
com.wiris.v5.v94 = [0, 1];
com.wiris.v5.vA4 = [1, 0];
com.wiris.v5.vB4 = [1, 2, 0];
com.wiris.v5.center = [com.wiris.v4.vG5];
com.wiris.v7.vtJ = {
	fields: {
		vW4: {
			vuJ: null
		},
		vX4: {
			vuJ: null
		},
		vZ4: {
			vuJ: null
		},
		vb4: {
			vuJ: null
		},
		vd4: {
			vuJ: null
		},
		vf4: {
			vuJ: null
		},
		vh4: {
			vuJ: null
		},
		getSelectionRectangles: {
			vuJ: null
		}
	}
};
com.wiris.v9.vDB = 0;
com.wiris.v9.vFB = 1;
com.wiris.v9.vEB = 2;
com.wiris.v9.vkJ = 0;
com.wiris.v9.vjJ = 1;
com.wiris.v9.vzJ = 2;
com.wiris.v9.v0K = 0;
com.wiris.v9.vB6 = 1;
com.wiris.v9.vD6 = 2;
com.wiris.v9.vF6 = 3;
com.wiris.v9.vH6 = 4;
com.wiris.v9.v66 = 5;
com.wiris.v9.vK6 = 6;
com.wiris.v9.vM6 = 7;
com.wiris.v9.vC6 = "veryverythinmathspace";
com.wiris.v9.vE6 = "verythinmathspace";
com.wiris.v9.vG6 = "thinmathspace";
com.wiris.v9.vI6 = "mediummathspace";
com.wiris.v9.vJ6 = "thickmathspace";
com.wiris.v9.vL6 = "verythickmathspace";
com.wiris.v9.vN6 = "veryverythickmathspace";
com.wiris.vB.vdE = 0;
com.wiris.vB.vMG = 1;
com.wiris.vD.vk6 = null;
com.wiris.vD.vl6 = null;
com.wiris.vD.vm6 = null;
com.wiris.vD.vn6 = null;
com.wiris.vF.vz7 = 0;
com.wiris.vF.vA8 = 1;
com.wiris.vF.vw7 = 2;
com.wiris.vF.vM8 = 3;
com.wiris.vF.vp9 = 4;
com.wiris.vG.vtJ = {
	fields: {
		vq2: {
			vuJ: null
		},
		v78: {
			vuJ: null
		},
		vD7: {
			vuJ: null
		},
		vY7: {
			vuJ: null
		},
		vb7: {
			vuJ: null
		},
		va7: {
			vuJ: null
		},
		vn7: {
			vuJ: null
		},
		vR9: {
			vuJ: null
		},
		vS9: {
			vuJ: null
		},
		vn5: {
			vuJ: null
		},
		v58: {
			vuJ: null
		},
		vp6: {
			vuJ: null
		},
		vl7: {
			vuJ: null
		}
	}
};
com.wiris.vI.ve9 = 0;
com.wiris.vI.remainingCalls = new Array();
com.wiris.vJ.vl9 = 0;
com.wiris.vJ.vk9 = 1;
com.wiris.vJ.vo9 = 2;
com.wiris.vL.vTA = "argument";
com.wiris.vM.vtJ = {
	fields: {
		vHA: {
			vuJ: null
		},
		vIA: {
			vuJ: null
		},
		vJA: {
			vuJ: null
		},
		vKA: {
			vuJ: null
		},
		vLA: {
			vuJ: null
		}
	}
};
com.wiris.vQ.vn1 = 61696;
com.wiris.vQ.v82 = 61727;
com.wiris.vQ.v92 = 61728;
com.wiris.vQ.vA2 = 61759;
com.wiris.vQ.vB2 = 61760;
com.wiris.vQ.vo1 = 61761;
com.wiris.vQ.v1K = 40;
com.wiris.vQ.v2K = 41;
com.wiris.vQ.v3K = 91;
com.wiris.vQ.v4K = 93;
com.wiris.vQ.v5K = 123;
com.wiris.vQ.v6K = 125;
com.wiris.vQ.v7K = 124;
com.wiris.vQ.v8K = 8592;
com.wiris.vQ.v9K = 8594;
com.wiris.vQ.vAK = 8596;
com.wiris.vQ.vBK = 9182;
com.wiris.vQ.vCK = 9183;
com.wiris.vQ.vlA = [43, 45, 47, 177, 183, 215, 247, 8226, 8722, 8723, 8724, 8726, 8727, 8728, 8743, 8744, 8745, 8746, 8760, 8768, 8846, 8851, 8852, 8853, 8854, 8855, 8856, 8857, 8858, 8859, 8861, 8862, 8863, 8864, 8865, 8890, 8891, 8900, 8901, 8902, 8903, 8905, 8906, 8907, 8908, 8910, 8911, 8914, 8915, 8966, 9021, 9675, 10678, 10789, 10794, 10797, 10798, 10799, 10804, 10805, 10812, 10815, 10835, 10836, 10837, 10838, 10846, 10847, 10851];
com.wiris.vQ.vnA = [60, 61, 62, 8592, 8593, 8594, 8595, 8596, 8597, 8598, 8599, 8600, 8601, 8602, 8603, 8604, 8605, 8606, 8608, 8610, 8611, 8614, 8617, 8618, 8619, 8620, 8621, 8622, 8624, 8625, 8627, 8630, 8631, 8636, 8637, 8638, 8639, 8640, 8641, 8642, 8643, 8644, 8645, 8646, 8647, 8648, 8649, 8650, 8651, 8652, 8653, 8654, 8655, 8656, 8657, 8658, 8659, 8660, 8661, 8666, 8667, 8669, 8693, 8712, 8713, 8715, 8716, 8733, 8739, 8740, 8741, 8742, 8764, 8765, 8769, 8770, 8771, 8772, 8773, 8774, 8775, 8776, 8777, 8778, 8779, 8781, 8782, 8783, 8784, 8785, 8786, 8787, 8788, 8789, 8790, 8791, 8793, 8794, 8795, 8796, 8799, 8800, 8801, 8802, 8804, 8805, 8806, 8807, 8808, 8809, 8810, 8811, 8812, 8814, 8815, 8816, 8817, 8818, 8819, 8820, 8821, 8822, 8823, 8824, 8825, 8826, 8827, 8828, 8829, 8830, 8831, 8832, 8833, 8834, 8835, 8836, 8837, 8838, 8839, 8840, 8841, 8842, 8843, 8847, 8848, 8849, 8850, 8866, 8867, 8869, 8871, 8872, 8873, 8874, 8875, 8876, 8877, 8878, 8879, 8882, 8883, 8884, 8885, 8886, 8887, 8888, 8904, 8909, 8912, 8913, 8918, 8919, 8920, 8921, 8922, 8923, 8926, 8927, 8930, 8931, 8934, 8935, 8936, 8937, 8938, 8939, 8940, 8941, 8994, 8995, 9123, 10229, 10230, 10231, 10232, 10233, 10234, 10236, 10239, 10501, 10514, 10515, 10531, 10532, 10533, 10534, 10535, 10536, 10537, 10538, 10547, 10550, 10551, 10560, 10561, 10562, 10564, 10567, 10574, 10575, 10576, 10577, 10578, 10579, 10580, 10581, 10582, 10583, 10584, 10585, 10586, 10587, 10588, 10589, 10590, 10591, 10592, 10593, 10606, 10607, 10608, 10620, 10621, 10869, 10877, 10878, 10885, 10886, 10887, 10888, 10889, 10890, 10891, 10892, 10901, 10902, 10909, 10910, 10913, 10914, 10927, 10928, 10933, 10934, 10935, 10936, 10937, 10938, 10949, 10950, 10955, 10956, 10987, 11005];
com.wiris.vQ.vhA = [8719, 8720, 8721, 8896, 8897, 8898, 8899, 10756, 10757, 10758, 10759, 10760];
com.wiris.vQ.vjA = [8747, 8748, 8749, 8750, 8751, 8752, 8753, 8754, 8755, 10763, 10764, 10765, 10766, 10767, 10768, 10774, 10775, 10776, 10777, 10778, 10779, 10780];
com.wiris.vR.vsA = 0;
com.wiris.vR.v7B = 1;
com.wiris.vR.v6B = 2;
com.wiris.vR.vyA = 3;
com.wiris.vX.vq6 = 0;
com.wiris.vX.vV5 = 1;
com.wiris.vX.vX5 = 2;
com.wiris.vX.vlB = 3;
com.wiris.vX.vmB = 4;
com.wiris.vX.vdB = 5;
com.wiris.vX.vsB = 6;
com.wiris.vX.veB = 7;
com.wiris.vX.vrB = new Hash();
Xml.enode = new EReg("^<([a-zA-Z0-9:_-]+)", "");
Xml.ecdata = new EReg("^<!\\[CDATA\\[", "i");
Xml.edoctype = new EReg("^<!DOCTYPE ", "i");
Xml.eend = new EReg("^</([a-zA-Z0-9:_-]+)>", "");
Xml.epcdata = new EReg("^[^<]+", "");
Xml.ecomment = new EReg("^<!--", "");
Xml.eprolog = new EReg("^<\\?[^\\?]+\\?>", "");
Xml.eattribute = new EReg("^\\s*([a-zA-Z0-9:_-]+)\\s*=\\s*([\"'])([^\\2]*?)\\2", "");
Xml.eclose = new EReg("^[ \r\n\t]*(>|(/>))", "");
Xml.ecdata_end = new EReg("\\]\\]>", "");
Xml.edoctype_elt = new EReg("[\\[|\\]>]", "");
Xml.ecomment_end = new EReg("-->", "");
haxe.Timer.arr = new Array();
com.wiris.vc.vqC = "@mrow@1@math@1@mfrac@2@msqrt@1@mroot@2@mstyle@2@merror@1@mpadded@1@mphantom@1@msub@2@msup@2@msubsup@3@munder@2@mover@2@munderover@3@mtd@1@";
com.wiris.vc.vsC = "@msub@msup@msubsup@";
com.wiris.vc.subs = "@sub@sup@subsup@";
com.wiris.vc.vuC = "@mi@mn@mo@mtext@ms@mspace@";
com.wiris.vc.vxC = "displaystyle";
com.wiris.vl.vkE = 0;
com.wiris.vl.vmE = 1;
com.wiris.vl.v29 = true;
com.wiris.vm.voF = 25600;
com.wiris.vq.vpI = "boxDL@02557@boxDl@02556@boxdL@02555@boxdl@02510@boxDR@02554@boxDr@02553@boxdR@02552@boxdr@0250C@boxH@02550@boxh@02500@boxHD@02566@boxHd@02564@boxhD@02565@boxhd@0252C@boxHU@02569@boxHu@02567@boxhU@02568@boxhu@02534@boxUL@0255D@boxUl@0255C@boxuL@0255B@boxul@02518@boxUR@0255A@boxUr@02559@boxuR@02558@boxur@02514@boxV@02551@boxv@02502@boxVH@0256C@boxVh@0256B@boxvH@0256A@boxvh@0253C@boxVL@02563@boxVl@02562@boxvL@02561@boxvl@02524@boxVR@02560@boxVr@0255F@boxvR@0255E@boxvr@0251C@Acy@00410@acy@00430@Bcy@00411@bcy@00431@CHcy@00427@chcy@00447@Dcy@00414@dcy@00434@Ecy@0042D@ecy@0044D@Fcy@00424@fcy@00444@Gcy@00413@gcy@00433@HARDcy@0042A@hardcy@0044A@Icy@00418@icy@00438@IEcy@00415@iecy@00435@IOcy@00401@iocy@00451@Jcy@00419@jcy@00439@Kcy@0041A@kcy@0043A@KHcy@00425@khcy@00445@Lcy@0041B@lcy@0043B@Mcy@0041C@mcy@0043C@Ncy@0041D@ncy@0043D@numero@02116@Ocy@0041E@ocy@0043E@Pcy@0041F@pcy@0043F@Rcy@00420@rcy@00440@Scy@00421@scy@00441@SHCHcy@00429@shchcy@00449@SHcy@00428@shcy@00448@SOFTcy@0042C@softcy@0044C@Tcy@00422@tcy@00442@TScy@00426@tscy@00446@Ucy@00423@ucy@00443@Vcy@00412@vcy@00432@YAcy@0042F@yacy@0044F@Ycy@0042B@ycy@0044B@YUcy@0042E@yucy@0044E@Zcy@00417@zcy@00437@ZHcy@00416@zhcy@00436@DJcy@00402@djcy@00452@DScy@00405@dscy@00455@DZcy@0040F@dzcy@0045F@GJcy@00403@gjcy@00453@Iukcy@00406@iukcy@00456@Jsercy@00408@jsercy@00458@Jukcy@00404@jukcy@00454@KJcy@0040C@kjcy@0045C@LJcy@00409@ljcy@00459@NJcy@0040A@njcy@0045A@TSHcy@0040B@tshcy@0045B@Ubrcy@0040E@ubrcy@0045E@YIcy@00407@yicy@00457@acute@000B4@breve@002D8@caron@002C7@cedil@000B8@circ@002C6@dblac@002DD@die@000A8@dot@002D9@grave@00060@macr@000AF@ogon@002DB@ring@002DA@tilde@002DC@uml@000A8@Aacute@000C1@aacute@000E1@Acirc@000C2@acirc@000E2@AElig@000C6@aelig@000E6@Agrave@000C0@agrave@000E0@Aring@000C5@aring@000E5@Atilde@000C3@atilde@000E3@Auml@000C4@auml@000E4@Ccedil@000C7@ccedil@000E7@Eacute@000C9@eacute@000E9@Ecirc@000CA@ecirc@000EA@Egrave@000C8@egrave@000E8@ETH@000D0@eth@000F0@Euml@000CB@euml@000EB@Iacute@000CD@iacute@000ED@Icirc@000CE@icirc@000EE@Igrave@000CC@igrave@000EC@Iuml@000CF@iuml@000EF@Ntilde@000D1@ntilde@000F1@Oacute@000D3@oacute@000F3@Ocirc@000D4@ocirc@000F4@Ograve@000D2@ograve@000F2@Oslash@000D8@oslash@000F8@Otilde@000D5@otilde@000F5@Ouml@000D6@ouml@000F6@szlig@000DF@THORN@000DE@thorn@000FE@Uacute@000DA@uacute@000FA@Ucirc@000DB@ucirc@000FB@Ugrave@000D9@ugrave@000F9@Uuml@000DC@uuml@000FC@Yacute@000DD@yacute@000FD@yuml@000FF@Abreve@00102@abreve@00103@Amacr@00100@amacr@00101@Aogon@00104@aogon@00105@Cacute@00106@cacute@00107@Ccaron@0010C@ccaron@0010D@Ccirc@00108@ccirc@00109@Cdot@0010A@cdot@0010B@Dcaron@0010E@dcaron@0010F@Dstrok@00110@dstrok@00111@Ecaron@0011A@ecaron@0011B@Edot@00116@edot@00117@Emacr@00112@emacr@00113@ENG@0014A@eng@0014B@Eogon@00118@eogon@00119@gacute@001F5@Gbreve@0011E@gbreve@0011F@Gcedil@00122@Gcirc@0011C@gcirc@0011D@Gdot@00120@gdot@00121@Hcirc@00124@hcirc@00125@Hstrok@00126@hstrok@00127@Idot@00130@IJlig@00132@ijlig@00133@Imacr@0012A@imacr@0012B@inodot@00131@Iogon@0012E@iogon@0012F@Itilde@00128@itilde@00129@Jcirc@00134@jcirc@00135@Kcedil@00136@kcedil@00137@kgreen@00138@Lacute@00139@lacute@0013A@Lcaron@0013D@lcaron@0013E@Lcedil@0013B@lcedil@0013C@Lmidot@0013F@lmidot@00140@Lstrok@00141@lstrok@00142@Nacute@00143@nacute@00144@napos@00149@Ncaron@00147@ncaron@00148@Ncedil@00145@ncedil@00146@Odblac@00150@odblac@00151@OElig@00152@oelig@00153@Omacr@0014C@omacr@0014D@Racute@00154@racute@00155@Rcaron@00158@rcaron@00159@Rcedil@00156@rcedil@00157@Sacute@0015A@sacute@0015B@Scaron@00160@scaron@00161@Scedil@0015E@scedil@0015F@Scirc@0015C@scirc@0015D@Tcaron@00164@tcaron@00165@Tcedil@00162@tcedil@00163@Tstrok@00166@tstrok@00167@Ubreve@0016C@ubreve@0016D@Udblac@00170@udblac@00171@Umacr@0016A@umacr@0016B@Uogon@00172@uogon@00173@Uring@0016E@uring@0016F@Utilde@00168@utilde@00169@Wcirc@00174@wcirc@00175@Ycirc@00176@ycirc@00177@Yuml@00178@Zacute@00179@zacute@0017A@Zcaron@0017D@zcaron@0017E@Zdot@0017B@zdot@0017C@apos@00027@ast@0002A@brvbar@000A6@bsol@0005C@cent@000A2@colon@0003A@comma@0002C@commat@00040@copy@000A9@curren@000A4@darr@02193@deg@000B0@divide@000F7@dollar@00024@equals@0003D@excl@00021@frac12@000BD@frac14@000BC@frac18@0215B@frac34@000BE@frac38@0215C@frac58@0215D@frac78@0215E@gt@0003E@half@000BD@horbar@02015@hyphen@02010@iexcl@000A1@iquest@000BF@laquo@000AB@larr@02190@lcub@0007B@ldquo@0201C@lowbar@0005F@lpar@00028@lsqb@0005B@lsquo@02018@micro@000B5@middot@000B7@nbsp@000A0@not@000AC@num@00023@ohm@02126@ordf@000AA@ordm@000BA@para@000B6@percnt@00025@period@0002E@plus@0002B@plusmn@000B1@pound@000A3@quest@0003F@quot@00022@raquo@000BB@rarr@02192@rcub@0007D@rdquo@0201D@reg@000AE@rpar@00029@rsqb@0005D@rsquo@02019@sect@000A7@semi@0003B@shy@000AD@sol@0002F@sung@0266A@sup1@000B9@sup2@000B2@sup3@000B3@times@000D7@trade@02122@uarr@02191@verbar@0007C@yen@000A5@blank@02423@blk12@02592@blk14@02591@blk34@02593@block@02588@bull@02022@caret@02041@check@02713@cir@025CB@clubs@02663@copysr@02117@cross@02717@Dagger@02021@dagger@02020@dash@02010@diams@02666@dlcrop@0230D@drcrop@0230C@dtri@025BF@dtrif@025BE@emsp@02003@emsp13@02004@emsp14@02005@ensp@02002@female@02640@ffilig@0FB03@fflig@0FB00@ffllig@0FB04@filig@0FB01@flat@0266D@fllig@0FB02@frac13@02153@frac15@02155@frac16@02159@frac23@02154@frac25@02156@frac35@02157@frac45@02158@frac56@0215A@hairsp@0200A@hearts@02665@hellip@02026@hybull@02043@incare@02105@ldquor@0201E@lhblk@02584@loz@025CA@lozf@029EB@lsquor@0201A@ltri@025C3@ltrif@025C2@male@02642@malt@02720@marker@025AE@mdash@02014@mldr@02026@natur@0266E@ndash@02013@nldr@02025@numsp@02007@phone@0260E@puncsp@02008@rdquor@0201D@rect@025AD@rsquor@02019@rtri@025B9@rtrif@025B8@rx@0211E@sext@02736@sharp@0266F@spades@02660@squ@025A1@squf@025AA@star@02606@starf@02605@target@02316@telrec@02315@thinsp@02009@uhblk@02580@ulcrop@0230F@urcrop@0230E@utri@025B5@utrif@025B4@vellip@022EE@angzarr@0237C@cirmid@02AEF@cudarrl@02938@cudarrr@02935@cularr@021B6@cularrp@0293D@curarr@021B7@curarrm@0293C@Darr@021A1@dArr@021D3@ddarr@021CA@DDotrahd@02911@dfisht@0297F@dHar@02965@dharl@021C3@dharr@021C2@duarr@021F5@duhar@0296F@dzigrarr@027FF@erarr@02971@hArr@021D4@harr@02194@harrcir@02948@harrw@021AD@hoarr@021FF@imof@022B7@lAarr@021DA@Larr@0219E@larrbfs@0291F@larrfs@0291D@larrhk@021A9@larrlp@021AB@larrpl@02939@larrsim@02973@larrtl@021A2@lAtail@0291B@latail@02919@lBarr@0290E@lbarr@0290C@ldca@02936@ldrdhar@02967@ldrushar@0294B@ldsh@021B2@lfisht@0297C@lHar@02962@lhard@021BD@lharu@021BC@lharul@0296A@llarr@021C7@llhard@0296B@loarr@021FD@lrarr@021C6@lrhar@021CB@lrhard@0296D@lsh@021B0@lurdshar@0294A@luruhar@02966@Map@02905@map@021A6@midcir@02AF0@mumap@022B8@nearhk@02924@neArr@021D7@nearr@02197@nesear@02928@nhArr@021CE@nharr@021AE@nlArr@021CD@nlarr@0219A@nrArr@021CF@nrarr@0219B@nvHarr@02904@nvlArr@02902@nvrArr@02903@nwarhk@02923@nwArr@021D6@nwarr@02196@nwnear@02927@olarr@021BA@orarr@021BB@origof@022B6@rAarr@021DB@Rarr@021A0@rarrap@02975@rarrbfs@02920@rarrc@02933@rarrfs@0291E@rarrhk@021AA@rarrlp@021AC@rarrpl@02945@rarrsim@02974@Rarrtl@02916@rarrtl@021A3@rarrw@0219D@rAtail@0291C@ratail@0291A@RBarr@02910@rBarr@0290F@rbarr@0290D@rdca@02937@rdldhar@02969@rdsh@021B3@rfisht@0297D@rHar@02964@rhard@021C1@rharu@021C0@rharul@0296C@rlarr@021C4@rlhar@021CC@roarr@021FE@rrarr@021C9@rsh@021B1@ruluhar@02968@searhk@02925@seArr@021D8@searr@02198@seswar@02929@simrarr@02972@slarr@02190@srarr@02192@swarhk@02926@swArr@021D9@swarr@02199@swnwar@0292A@Uarr@0219F@uArr@021D1@Uarrocir@02949@udarr@021C5@udhar@0296E@ufisht@0297E@uHar@02963@uharl@021BF@uharr@021BE@uuarr@021C8@vArr@021D5@varr@02195@xhArr@027FA@xharr@027F7@xlArr@027F8@xlarr@027F5@xmap@027FC@xrArr@027F9@xrarr@027F6@zigrarr@021DD@ac@0223E@amalg@02A3F@barvee@022BD@Barwed@02306@barwed@02305@bsolb@029C5@Cap@022D2@capand@02A44@capbrcup@02A49@capcap@02A4B@capcup@02A47@capdot@02A40@ccaps@02A4D@ccups@02A4C@ccupssm@02A50@coprod@02210@Cup@022D3@cupbrcap@02A48@cupcap@02A46@cupcup@02A4A@cupdot@0228D@cupor@02A45@cuvee@022CE@cuwed@022CF@Dagger@02021@dagger@02020@diam@022C4@divonx@022C7@eplus@02A71@hercon@022B9@intcal@022BA@iprod@02A3C@loplus@02A2D@lotimes@02A34@lthree@022CB@ltimes@022C9@midast@0002A@minusb@0229F@minusd@02238@minusdu@02A2A@ncap@02A43@ncup@02A42@oast@0229B@ocir@0229A@odash@0229D@odiv@02A38@odot@02299@odsold@029BC@ofcir@029BF@ogt@029C1@ohbar@029B5@olcir@029BE@olt@029C0@omid@029B6@ominus@02296@opar@029B7@operp@029B9@oplus@02295@osol@02298@Otimes@02A37@otimes@02297@otimesas@02A36@ovbar@0233D@plusacir@02A23@plusb@0229E@pluscir@02A22@plusdo@02214@plusdu@02A25@pluse@02A72@plussim@02A26@plustwo@02A27@prod@0220F@race@029DA@roplus@02A2E@rotimes@02A35@rthree@022CC@rtimes@022CA@sdot@022C5@sdotb@022A1@setmn@02216@simplus@02A24@smashp@02A33@solb@029C4@sqcap@02293@sqcup@02294@ssetmn@02216@sstarf@022C6@subdot@02ABD@sum@02211@supdot@02ABE@timesb@022A0@timesbar@02A31@timesd@02A30@tridot@025EC@triminus@02A3A@triplus@02A39@trisb@029CD@tritime@02A3B@uplus@0228E@veebar@022BB@wedbar@02A5F@wreath@02240@xcap@022C2@xcirc@025EF@xcup@022C3@xdtri@025BD@xodot@02A00@xoplus@02A01@xotime@02A02@xsqcup@02A06@xuplus@02A04@xutri@025B3@xvee@022C1@xwedge@022C0@dlcorn@0231E@drcorn@0231F@gtlPar@02995@langd@02991@lbrke@0298B@lbrksld@0298F@lbrkslu@0298D@lceil@02308@lfloor@0230A@lmoust@023B0@lparlt@02993@ltrPar@02996@rangd@02992@rbrke@0298C@rbrksld@0298E@rbrkslu@02990@rceil@02309@rfloor@0230B@rmoust@023B1@rpargt@02994@ulcorn@0231C@urcorn@0231D@gnap@02A8A@gnE@02269@gne@02A88@gnsim@022E7@lnap@02A89@lnE@02268@lne@02A87@lnsim@022E6@nap@02249@ncong@02247@nequiv@02262@nge@02271@ngsim@02275@ngt@0226F@nle@02270@nlsim@02274@nlt@0226E@nltri@022EA@nltrie@022EC@nmid@02224@npar@02226@npr@02280@nprcue@022E0@nrtri@022EB@nrtrie@022ED@nsc@02281@nsccue@022E1@nsim@02241@nsime@02244@nsmid@02224@nspar@02226@nsqsube@022E2@nsqsupe@022E3@nsub@02284@nsube@02288@nsup@02285@nsupe@02289@ntgl@02279@ntlg@02278@nVDash@022AF@nVdash@022AE@nvDash@022AD@nvdash@022AC@parsim@02AF3@prnap@02AB9@prnE@02AB5@prnsim@022E8@rnmid@02AEE@scnap@02ABA@scnE@02AB6@scnsim@022E9@simne@02246@solbar@0233F@subnE@02ACB@subne@0228A@supnE@02ACC@supne@0228B@ang@02220@ange@029A4@angmsd@02221@angmsdaa@029A8@angmsdab@029A9@angmsdac@029AA@angmsdad@029AB@angmsdae@029AC@angmsdaf@029AD@angmsdag@029AE@angmsdah@029AF@angrtvb@022BE@angrtvbd@0299D@bbrk@023B5@bbrktbrk@023B6@bemptyv@029B0@beth@02136@boxbox@029C9@bprime@02035@bsemi@0204F@cemptyv@029B2@cirE@029C3@cirscir@029C2@comp@02201@daleth@02138@demptyv@029B1@ell@02113@empty@02205@emptyv@02205@gimel@02137@iiota@02129@image@02111@imath@00131@jmath@0006A@laemptyv@029B4@lltri@025FA@lrtri@022BF@mho@02127@nexist@02204@oS@024C8@planck@0210F@plankv@0210F@raemptyv@029B3@range@029A5@real@0211C@tbrk@023B4@trpezium@0FFFD@ultri@025F8@urtri@025F9@vzigzag@0299A@weierp@02118@apE@02A70@ape@0224A@apid@0224B@asymp@02248@Barv@02AE7@bcong@0224C@bepsi@003F6@bowtie@022C8@bsim@0223D@bsime@022CD@bump@0224E@bumpE@02AAE@bumpe@0224F@cire@02257@Colon@02237@Colone@02A74@colone@02254@congdot@02A6D@csub@02ACF@csube@02AD1@csup@02AD0@csupe@02AD2@cuepr@022DE@cuesc@022DF@Dashv@02AE4@dashv@022A3@easter@02A6E@ecir@02256@ecolon@02255@eDDot@02A77@eDot@02251@efDot@02252@eg@02A9A@egs@02A96@egsdot@02A98@el@02A99@els@02A95@elsdot@02A97@equest@0225F@equivDD@02A78@erDot@02253@esdot@02250@Esim@02A73@esim@02242@fork@022D4@forkv@02AD9@frown@02322@gap@02A86@gE@02267@gEl@02A8C@gel@022DB@ges@02A7E@gescc@02AA9@gesdot@02A80@gesdoto@02A82@gesdotol@02A84@gesles@02A94@Gg@022D9@gl@02277@gla@02AA5@glE@02A92@glj@02AA4@gsim@02273@gsime@02A8E@gsiml@02A90@Gt@0226B@gtcc@02AA7@gtcir@02A7A@gtdot@022D7@gtquest@02A7C@gtrarr@02978@homtht@0223B@lap@02A85@lat@02AAB@late@02AAD@lE@02266@lEg@02A8B@leg@022DA@les@02A7D@lescc@02AA8@lesdot@02A7F@lesdoto@02A81@lesdotor@02A83@lesges@02A93@lg@02276@lgE@02A91@Ll@022D8@lsim@02272@lsime@02A8D@lsimg@02A8F@Lt@0226A@ltcc@02AA6@ltcir@02A79@ltdot@022D6@ltlarr@02976@ltquest@02A7B@ltrie@022B4@mcomma@02A29@mDDot@0223A@mid@02223@mlcp@02ADB@models@022A7@mstpos@0223E@Pr@02ABB@pr@0227A@prap@02AB7@prcue@0227C@prE@02AB3@pre@02AAF@prsim@0227E@prurel@022B0@ratio@02236@rtrie@022B5@rtriltri@029CE@Sc@02ABC@sc@0227B@scap@02AB8@sccue@0227D@scE@02AB4@sce@02AB0@scsim@0227F@sdote@02A66@sfrown@02322@simg@02A9E@simgE@02AA0@siml@02A9D@simlE@02A9F@smid@02223@smile@02323@smt@02AAA@smte@02AAC@spar@02225@sqsub@0228F@sqsube@02291@sqsup@02290@sqsupe@02292@ssmile@02323@Sub@022D0@subE@02AC5@subedot@02AC3@submult@02AC1@subplus@02ABF@subrarr@02979@subsim@02AC7@subsub@02AD5@subsup@02AD3@Sup@022D1@supdsub@02AD8@supE@02AC6@supedot@02AC4@suphsub@02AD7@suplarr@0297B@supmult@02AC2@supplus@02AC0@supsim@02AC8@supsub@02AD4@supsup@02AD6@thkap@02248@thksim@0223C@topfork@02ADA@trie@0225C@twixt@0226C@Vbar@02AEB@vBar@02AE8@vBarv@02AE9@VDash@022AB@Vdash@022A9@vDash@022A8@vdash@022A2@Vdashl@02AE6@vltri@022B2@vprop@0221D@vrtri@022B3@Vvdash@022AA@alpha@003B1@beta@003B2@chi@003C7@Delta@00394@delta@003B4@epsi@003F5@epsiv@003B5@eta@003B7@Gamma@00393@gamma@003B3@Gammad@003DC@gammad@003DD@iota@003B9@kappa@003BA@kappav@003F0@Lambda@0039B@lambda@003BB@mu@003BC@nu@003BD@Omega@003A9@omega@003C9@Phi@003A6@phi@003C6@phiv@003D5@Pi@003A0@pi@003C0@piv@003D6@Psi@003A8@psi@003C8@rho@003C1@rhov@003F1@Sigma@003A3@sigma@003C3@sigmav@003C2@tau@003C4@Theta@00398@theta@003B8@thetav@003D1@Upsi@003D2@upsi@003C5@Xi@0039E@xi@003BE@zeta@003B6@Cfr@0212D@Hfr@0210C@Ifr@02111@Rfr@0211C@Zfr@02128@Copf@02102@Hopf@0210D@Nopf@02115@Popf@02119@Qopf@0211A@Ropf@0211D@Zopf@02124@acd@0223F@aleph@02135@And@02A53@and@02227@andand@02A55@andd@02A5C@andslope@02A58@andv@02A5A@angrt@0221F@angsph@02222@angst@0212B@ap@02248@apacir@02A6F@awconint@02233@awint@02A11@becaus@02235@bernou@0212C@bNot@02AED@bnot@02310@bottom@022A5@cap@02229@Cconint@02230@cirfnint@02A10@compfn@02218@cong@02245@Conint@0222F@conint@0222E@ctdot@022EF@cup@0222A@cwconint@02232@cwint@02231@cylcty@0232D@disin@022F2@Dot@000A8@DotDot@020DC@dsol@029F6@dtdot@022F1@dwangle@029A6@elinters@0FFFD@epar@022D5@eparsl@029E3@equiv@02261@eqvparsl@029E5@exist@02203@fltns@025B1@fnof@00192@forall@02200@fpartint@02A0D@ge@02265@hamilt@0210B@iff@021D4@iinfin@029DC@imped@001B5@infin@0221E@infintie@029DD@Int@0222C@int@0222B@intlarhk@02A17@isin@02208@isindot@022F5@isinE@022F9@isins@022F4@isinsv@022F3@isinv@02208@lagran@02112@Lang@0300A@lang@02329@lArr@021D0@lbbrk@03014@le@02264@loang@03018@lobrk@0301A@lopar@02985@lowast@02217@minus@02212@mnplus@02213@nabla@02207@ne@02260@nhpar@02AF2@ni@0220B@nis@022FC@nisd@022FA@niv@0220B@Not@02AEC@notin@02209@notinva@02209@notinvb@022F7@notinvc@022F6@notni@0220C@notniva@0220C@notnivb@022FE@notnivc@022FD@npolint@02A14@nvinfin@029DE@olcross@029BB@Or@02A54@or@02228@ord@02A5D@order@02134@oror@02A56@orslope@02A57@orv@02A5B@par@02225@parsl@02AFD@part@02202@permil@02030@perp@022A5@pertenk@02031@phmmat@02133@pointint@02A15@Prime@02033@prime@02032@profalar@0232E@profline@02312@profsurf@02313@prop@0221D@qint@02A0C@qprime@02057@quatint@02A16@radic@0221A@Rang@0300B@rang@0232A@rArr@021D2@rbbrk@03015@roang@03019@robrk@0301B@ropar@02986@rppolint@02A12@scpolint@02A13@sim@0223C@simdot@02A6A@sime@02243@smeparsl@029E4@square@025A1@squarf@025AA@strns@000AF@sub@02282@sube@02286@sup@02283@supe@02287@tdot@020DB@there4@02234@tint@0222D@top@022A4@topbot@02336@topcir@02AF1@tprime@02034@utdot@022F0@uwangle@029A7@vangrt@0299C@veeeq@0225A@Verbar@02016@wedgeq@02259@xnis@022FB@angle@02220@ApplyFunction@02061@approx@02248@approxeq@0224A@Assign@02254@backcong@0224C@backepsilon@003F6@backprime@02035@backsim@0223D@backsimeq@022CD@Backslash@02216@barwedge@02305@Because@02235@because@02235@Bernoullis@0212C@between@0226C@bigcap@022C2@bigcirc@025EF@bigcup@022C3@bigodot@02A00@bigoplus@02A01@bigotimes@02A02@bigsqcup@02A06@bigstar@02605@bigtriangledown@025BD@bigtriangleup@025B3@biguplus@02A04@bigvee@022C1@bigwedge@022C0@bkarow@0290D@blacklozenge@029EB@blacksquare@025AA@blacktriangle@025B4@blacktriangledown@025BE@blacktriangleleft@025C2@blacktriangleright@025B8@bot@022A5@boxminus@0229F@boxplus@0229E@boxtimes@022A0@Breve@002D8@bullet@02022@Bumpeq@0224E@bumpeq@0224F@CapitalDifferentialD@02145@Cayleys@0212D@Cedilla@000B8@CenterDot@000B7@centerdot@000B7@checkmark@02713@circeq@02257@circlearrowleft@021BA@circlearrowright@021BB@circledast@0229B@circledcirc@0229A@circleddash@0229D@CircleDot@02299@circledR@000AE@circledS@024C8@CircleMinus@02296@CirclePlus@02295@CircleTimes@02297@ClockwiseContourIntegral@02232@CloseCurlyDoubleQuote@0201D@CloseCurlyQuote@02019@clubsuit@02663@coloneq@02254@complement@02201@complexes@02102@Congruent@02261@ContourIntegral@0222E@Coproduct@02210@CounterClockwiseContourIntegral@02233@CupCap@0224D@curlyeqprec@022DE@curlyeqsucc@022DF@curlyvee@022CE@curlywedge@022CF@curvearrowleft@021B6@curvearrowright@021B7@dbkarow@0290F@ddagger@02021@ddotseq@02A77@Del@02207@DiacriticalAcute@000B4@DiacriticalDot@002D9@DiacriticalDoubleAcute@002DD@DiacriticalGrave@00060@DiacriticalTilde@002DC@Diamond@022C4@diamond@022C4@diamondsuit@02666@DifferentialD@02146@digamma@003DD@div@000F7@divideontimes@022C7@doteq@02250@doteqdot@02251@DotEqual@02250@dotminus@02238@dotplus@02214@dotsquare@022A1@doublebarwedge@02306@DoubleContourIntegral@0222F@DoubleDot@000A8@DoubleDownArrow@021D3@DoubleLeftArrow@021D0@DoubleLeftRightArrow@021D4@DoubleLeftTee@02AE4@DoubleLongLeftArrow@027F8@DoubleLongLeftRightArrow@027FA@DoubleLongRightArrow@027F9@DoubleRightArrow@021D2@DoubleRightTee@022A8@DoubleUpArrow@021D1@DoubleUpDownArrow@021D5@DoubleVerticalBar@02225@DownArrow@02193@Downarrow@021D3@downarrow@02193@DownArrowUpArrow@021F5@downdownarrows@021CA@downharpoonleft@021C3@downharpoonright@021C2@DownLeftVector@021BD@DownRightVector@021C1@DownTee@022A4@DownTeeArrow@021A7@drbkarow@02910@Element@02208@emptyset@02205@eqcirc@02256@eqcolon@02255@eqsim@02242@eqslantgtr@02A96@eqslantless@02A95@EqualTilde@02242@Equilibrium@021CC@Exists@02203@expectation@02130@ExponentialE@02147@exponentiale@02147@fallingdotseq@02252@ForAll@02200@Fouriertrf@02131@geq@02265@geqq@02267@geqslant@02A7E@gg@0226B@ggg@022D9@gnapprox@02A8A@gneq@02A88@gneqq@02269@GreaterEqual@02265@GreaterEqualLess@022DB@GreaterFullEqual@02267@GreaterLess@02277@GreaterSlantEqual@02A7E@GreaterTilde@02273@gtrapprox@02A86@gtrdot@022D7@gtreqless@022DB@gtreqqless@02A8C@gtrless@02277@gtrsim@02273@Hacek@002C7@hbar@0210F@heartsuit@02665@HilbertSpace@0210B@hksearow@02925@hkswarow@02926@hookleftarrow@021A9@hookrightarrow@021AA@hslash@0210F@HumpDownHump@0224E@HumpEqual@0224F@iiiint@02A0C@iiint@0222D@Im@02111@ImaginaryI@02148@imagline@02110@imagpart@02111@Implies@021D2@in@02208@integers@02124@Integral@0222B@intercal@022BA@Intersection@022C2@intprod@02A3C@InvisibleComma@02063@InvisibleTimes@02062@langle@02329@Laplacetrf@02112@lbrace@0007B@lbrack@0005B@LeftAngleBracket@02329@LeftArrow@02190@Leftarrow@021D0@leftarrow@02190@LeftArrowBar@021E4@LeftArrowRightArrow@021C6@leftarrowtail@021A2@LeftCeiling@02308@LeftDoubleBracket@0301A@LeftDownVector@021C3@LeftFloor@0230A@leftharpoondown@021BD@leftharpoonup@021BC@leftleftarrows@021C7@LeftRightArrow@02194@Leftrightarrow@021D4@leftrightarrow@02194@leftrightarrows@021C6@leftrightharpoons@021CB@leftrightsquigarrow@021AD@LeftTee@022A3@LeftTeeArrow@021A4@leftthreetimes@022CB@LeftTriangle@022B2@LeftTriangleEqual@022B4@LeftUpVector@021BF@LeftVector@021BC@leq@02264@leqq@02266@leqslant@02A7D@lessapprox@02A85@lessdot@022D6@lesseqgtr@022DA@lesseqqgtr@02A8B@LessEqualGreater@022DA@LessFullEqual@02266@LessGreater@02276@lessgtr@02276@lesssim@02272@LessSlantEqual@02A7D@LessTilde@02272@ll@0226A@llcorner@0231E@Lleftarrow@021DA@lmoustache@023B0@lnapprox@02A89@lneq@02A87@lneqq@02268@LongLeftArrow@027F5@Longleftarrow@027F8@longleftarrow@027F5@LongLeftRightArrow@027F7@Longleftrightarrow@027FA@longleftrightarrow@027F7@longmapsto@027FC@LongRightArrow@027F6@Longrightarrow@027F9@longrightarrow@027F6@looparrowleft@021AB@looparrowright@021AC@LowerLeftArrow@02199@LowerRightArrow@02198@lozenge@025CA@lrcorner@0231F@Lsh@021B0@maltese@02720@mapsto@021A6@measuredangle@02221@Mellintrf@02133@MinusPlus@02213@mp@02213@multimap@022B8@napprox@02249@natural@0266E@naturals@02115@nearrow@02197@NegativeMediumSpace@0200B@NegativeThickSpace@0200B@NegativeThinSpace@0200B@NegativeVeryThinSpace@0200B@NestedGreaterGreater@0226B@NestedLessLess@0226A@nexists@02204@ngeq@02271@ngtr@0226F@nLeftarrow@021CD@nleftarrow@0219A@nLeftrightarrow@021CE@nleftrightarrow@021AE@nleq@02270@nless@0226E@NonBreakingSpace@000A0@NotCongruent@02262@NotDoubleVerticalBar@02226@NotElement@02209@NotEqual@02260@NotExists@02204@NotGreater@0226F@NotGreaterEqual@02271@NotGreaterLess@02279@NotGreaterTilde@02275@NotLeftTriangle@022EA@NotLeftTriangleEqual@022EC@NotLess@0226E@NotLessEqual@02270@NotLessGreater@02278@NotLessTilde@02274@NotPrecedes@02280@NotPrecedesSlantEqual@022E0@NotReverseElement@0220C@NotRightTriangle@022EB@NotRightTriangleEqual@022ED@NotSquareSubsetEqual@022E2@NotSquareSupersetEqual@022E3@NotSubsetEqual@02288@NotSucceeds@02281@NotSucceedsSlantEqual@022E1@NotSupersetEqual@02289@NotTilde@02241@NotTildeEqual@02244@NotTildeFullEqual@02247@NotTildeTilde@02249@NotVerticalBar@02224@nparallel@02226@nprec@02280@nRightarrow@021CF@nrightarrow@0219B@nshortmid@02224@nshortparallel@02226@nsimeq@02244@nsubseteq@02288@nsucc@02281@nsupseteq@02289@ntriangleleft@022EA@ntrianglelefteq@022EC@ntriangleright@022EB@ntrianglerighteq@022ED@nwarrow@02196@oint@0222E@OpenCurlyDoubleQuote@0201C@OpenCurlyQuote@02018@orderof@02134@parallel@02225@PartialD@02202@pitchfork@022D4@PlusMinus@000B1@pm@000B1@Poincareplane@0210C@prec@0227A@precapprox@02AB7@preccurlyeq@0227C@Precedes@0227A@PrecedesEqual@02AAF@PrecedesSlantEqual@0227C@PrecedesTilde@0227E@preceq@02AAF@precnapprox@02AB9@precneqq@02AB5@precnsim@022E8@precsim@0227E@primes@02119@Proportion@02237@Proportional@0221D@propto@0221D@quaternions@0210D@questeq@0225F@rangle@0232A@rationals@0211A@rbrace@0007D@rbrack@0005D@Re@0211C@realine@0211B@realpart@0211C@reals@0211D@ReverseElement@0220B@ReverseEquilibrium@021CB@ReverseUpEquilibrium@0296F@RightAngleBracket@0232A@RightArrow@02192@Rightarrow@021D2@rightarrow@02192@RightArrowBar@021E5@RightArrowLeftArrow@021C4@rightarrowtail@021A3@RightCeiling@02309@RightDoubleBracket@0301B@RightDownVector@021C2@RightFloor@0230B@rightharpoondown@021C1@rightharpoonup@021C0@rightleftarrows@021C4@rightleftharpoons@021CC@rightrightarrows@021C9@rightsquigarrow@0219D@RightTee@022A2@RightTeeArrow@021A6@rightthreetimes@022CC@RightTriangle@022B3@RightTriangleEqual@022B5@RightUpVector@021BE@RightVector@021C0@risingdotseq@02253@rmoustache@023B1@Rrightarrow@021DB@Rsh@021B1@searrow@02198@setminus@02216@ShortDownArrow@02193@ShortLeftArrow@02190@shortmid@02223@shortparallel@02225@ShortRightArrow@02192@ShortUpArrow@02191@simeq@02243@SmallCircle@02218@smallsetminus@02216@spadesuit@02660@Sqrt@0221A@sqsubset@0228F@sqsubseteq@02291@sqsupset@02290@sqsupseteq@02292@Square@025A1@SquareIntersection@02293@SquareSubset@0228F@SquareSubsetEqual@02291@SquareSuperset@02290@SquareSupersetEqual@02292@SquareUnion@02294@Star@022C6@straightepsilon@003F5@straightphi@003D5@Subset@022D0@subset@02282@subseteq@02286@subseteqq@02AC5@SubsetEqual@02286@subsetneq@0228A@subsetneqq@02ACB@succ@0227B@succapprox@02AB8@succcurlyeq@0227D@Succeeds@0227B@SucceedsEqual@02AB0@SucceedsSlantEqual@0227D@SucceedsTilde@0227F@succeq@02AB0@succnapprox@02ABA@succneqq@02AB6@succnsim@022E9@succsim@0227F@SuchThat@0220B@Sum@02211@Superset@02283@SupersetEqual@02287@Supset@022D1@supset@02283@supseteq@02287@supseteqq@02AC6@supsetneq@0228B@supsetneqq@02ACC@swarrow@02199@Therefore@02234@therefore@02234@thickapprox@02248@thicksim@0223C@ThinSpace@02009@Tilde@0223C@TildeEqual@02243@TildeFullEqual@02245@TildeTilde@02248@toea@02928@tosa@02929@triangle@025B5@triangledown@025BF@triangleleft@025C3@trianglelefteq@022B4@triangleq@0225C@triangleright@025B9@trianglerighteq@022B5@TripleDot@020DB@twoheadleftarrow@0219E@twoheadrightarrow@021A0@ulcorner@0231C@Union@022C3@UnionPlus@0228E@UpArrow@02191@Uparrow@021D1@uparrow@02191@UpArrowDownArrow@021C5@UpDownArrow@02195@Updownarrow@021D5@updownarrow@02195@UpEquilibrium@0296E@upharpoonleft@021BF@upharpoonright@021BE@UpperLeftArrow@02196@UpperRightArrow@02197@upsilon@003C5@UpTee@022A5@UpTeeArrow@021A5@upuparrows@021C8@urcorner@0231D@varepsilon@003B5@varkappa@003F0@varnothing@02205@varphi@003C6@varpi@003D6@varpropto@0221D@varrho@003F1@varsigma@003C2@vartheta@003D1@vartriangleleft@022B2@vartriangleright@022B3@Vee@022C1@vee@02228@Vert@02016@vert@0007C@VerticalBar@02223@VerticalTilde@02240@VeryThinSpace@0200A@Wedge@022C0@wedge@02227@wp@02118@wr@02240@zeetrf@02128@af@02061@asympeq@0224D@Cross@02A2F@DD@02145@dd@02146@DownArrowBar@02913@DownBreve@00311@DownLeftRightVector@02950@DownLeftTeeVector@0295E@DownLeftVectorBar@02956@DownRightTeeVector@0295F@DownRightVectorBar@02957@ee@02147@EmptySmallSquare@025FB@EmptyVerySmallSquare@025AB@Equal@02A75@FilledSmallSquare@025FC@FilledVerySmallSquare@025AA@GreaterGreater@02AA2@Hat@0005E@HorizontalLine@02500@ic@02063@ii@02148@it@02062@larrb@021E4@LeftDownTeeVector@02961@LeftDownVectorBar@02959@LeftRightVector@0294E@LeftTeeVector@0295A@LeftTriangleBar@029CF@LeftUpDownVector@02951@LeftUpTeeVector@02960@LeftUpVectorBar@02958@LeftVectorBar@02952@LessLess@02AA1@mapstodown@021A7@mapstoleft@021A4@mapstoup@021A5@MediumSpace@0205F@NewLine@0000A@NoBreak@02060@NotCupCap@0226D@OverBar@000AF@OverBrace@0FE37@OverBracket@023B4@OverParenthesis@0FE35@planckh@0210E@Product@0220F@rarrb@021E5@RightDownTeeVector@0295D@RightDownVectorBar@02955@RightTeeVector@0295B@RightTriangleBar@029D0@RightUpDownVector@0294F@RightUpTeeVector@0295C@RightUpVectorBar@02954@RightVectorBar@02953@RoundImplies@02970@RuleDelayed@029F4@Tab@00009@UnderBar@00332@UnderBrace@0FE38@UnderBracket@023B5@UnderParenthesis@0FE36@UpArrowBar@02912@Upsilon@003A5@VerticalLine@0007C@VerticalSeparator@02758@ZeroWidthSpace@0200B@omicron@003BF@amalg@02210@NegativeThinSpace@0E000@";
com.wiris.vy.vFC = 1;
com.wiris.vy.v3H = 2;
com.wiris.vy.v4H = 4;
com.wiris.vy.vU2 = 8;
com.wiris.vy.vV2 = 16;
com.wiris.vy.vX2 = 32;
com.wiris.vy.v8C = 64;
com.wiris.vy.vW2 = 128;
com.wiris.vy.vBH = 16;
com.wiris.vy.vCH = 65536;
com.wiris.vy.v39 = 524288;
com.wiris.vy.vDK = 1048576;
com.wiris.vy.vy8 = 2097152;
com.wiris.vy.vw8 = 8388608;
haxe.Md5.inst = new haxe.Md5();
com.wiris.v01.vnH = 1;
com.wiris.v11.vpH = [
	[com.wiris.vQ.v1K, 9115, 9116, 9117, 0],
	[com.wiris.vQ.v2K, 9118, 9119, 9120, 0],
	[com.wiris.vQ.v3K, 9121, 9122, 9123, 0],
	[com.wiris.vQ.v4K, 9124, 9125, 9126, 0],
	[com.wiris.vQ.v5K, 9127, 9130, 9129, 9128],
	[com.wiris.vQ.v6K, 9131, 9134, 9133, 9132],
	[com.wiris.vQ.v7K, 0, 124, 0, 0]
];
com.wiris.v11.vEK = [
	[com.wiris.vQ.vBK, 62210, 9135, 62211, 62213],
	[com.wiris.vQ.vCK, 62208, 9135, 62209, 62212],
	[com.wiris.vQ.v8K, 61953, 9135, 0, 0],
	[com.wiris.vQ.v9K, 0, 9135, 61952, 0],
	[com.wiris.vQ.vAK, 61953, 9135, 61952, 0]
];
com.wiris.v11.vKI = 0;
com.wiris.v11.vLI = 1;
com.wiris.v11.vqE = 2;
js.Lib.onerror = null;
com.wiris.v41.vRJ = "@sin@cos@tan@log@ln@";
com.wiris.v41.vNJ = false;
com.wiris.v51.vbJ = "&#8216;@00020@&#8217;@20020@&#8220;@00020@&#8221;@20020@(@000c2@)@200c2@[@000c2@]@200c2@{@000c2@|@000c2@|@200c2@||@000c2@||@200c2@|||@000c2@|||@200c2@}@200c2@&#8214;@00042@&#8214;@20042@&#8968;@000c2@&#8969;@200c2@&#8970;@000c2@&#8971;@200c2@&#10098;@000c2@&#10099;@200c2@&#10214;@000c2@&#10215;@200c2@&#10216;@000c2@&#10217;@200c2@&#10218;@000c2@&#10219;@200c2@&#10220;@000c2@&#10221;@200c2@&#10222;@000c2@&#10223;@200c2@&#10624;@00042@&#10624;@20042@&#10627;@000c2@&#10628;@200c2@&#10629;@000c2@&#10630;@200c2@&#10631;@000c2@&#10632;@200c2@&#10633;@000c2@&#10634;@200c2@&#10635;@000c2@&#10636;@200c2@&#10637;@000c2@&#10638;@200c2@&#10639;@000c2@&#10640;@200c2@&#10641;@000c2@&#10642;@200c2@&#10643;@000c2@&#10644;@200c2@&#10645;@000c2@&#10646;@200c2@&#10647;@000c2@&#10648;@200c2@&#10748;@000c2@&#10749;@200c2@;@10328@,@10328@&#8291;@10028@&#8756;@15500@&#8757;@15500@->@15500@..@20000@...@20000@:@11200@&#1014;@15500@&#8230;@10000@&#8942;@15500@&#8943;@10000@&#8945;@15500@&#8715;@15500@&#8866;@15500@&#8867;@15500@&#8868;@15500@&#8872;@15500@&#8873;@15500@&#8876;@15500@&#8877;@15500@&#8878;@15500@&#8879;@15500@&#8744;@14400@&amp;&amp;@14400@&#8743;@14400@&#8704;@02100@&#8707;@02100@&#8708;@02100@&#8705;@11200@&#8712;@15500@&#8713;@15500@&#8716;@15500@&#8834;@15500@&#8834;&#8402;@15500@&#8835;@15500@&#8835;&#8402;@15500@&#8836;@15500@&#8837;@15500@&#8838;@15500@&#8839;@15500@&#8840;@15500@&#8841;@15500@&#8842;@15500@&#8843;@15500@&lt;=@15500@&#8804;@15500@&#8805;@15500@>@15500@>=@15500@&#8815;@15500@&lt;@15500@&#8814;@15500@&#8776;@15500@&#8764;@15500@&#8777;@15500@&#8802;@15500@&#8800;@15500@!=@14400@*=@14400@+=@14400@-=@14400@/=@14400@:=@14400@=@15500@==@14400@&#8733;@15500@&#8740;@15500@&#8741;@15500@&#8742;@15500@&#8769;@15500@&#8771;@15500@&#8772;@15500@&#8773;@15500@&#8774;@15500@&#8775;@15500@&#8781;@15500@&#8788;@15500@&#8791;@15500@&#8793;@15500@&#8794;@15500@&#8796;@15500@&#8799;@15500@&#8801;@15500@&#8808;@15500@&#8809;@15500@&#8810;@15500@&#8810;&#824;@15500@&#8811;@15500@&#8811;&#824;@15500@&#8813;@15500@&#8816;@15500@&#8817;@15500@&#8826;@15500@&#8827;@15500@&#8828;@15500@&#8829;@15500@&#8832;@15500@&#8833;@15500@&#8869;@15500@&#8884;@15500@&#8885;@15500@&#8905;@14400@&#8906;@14400@&#8907;@14400@&#8908;@14400@&#8916;@15500@&#8918;@15500@&#8919;@15500@&#8920;@15500@&#8921;@15500@&#8938;@15500@&#8939;@15500@&#8940;@15500@&#8941;@15500@&#9632;@13300@&#9633;@13300@&#9642;@13300@&#9643;@13300@&#9645;@13300@&#9646;@13300@&#9647;@13300@&#9648;@13300@&#9649;@13300@&#9651;@14400@&#9652;@14400@&#9653;@14400@&#9654;@14400@&#9655;@14400@&#9656;@14400@&#9657;@14400@&#9660;@14400@&#9661;@14400@&#9662;@14400@&#9663;@14400@&#9664;@14400@&#9665;@14400@&#9666;@14400@&#9667;@14400@&#9668;@14400@&#9669;@14400@&#9670;@14400@&#9671;@14400@&#9672;@14400@&#9673;@14400@&#9676;@14400@&#9677;@14400@&#9678;@14400@&#9679;@14400@&#9686;@14400@&#9687;@14400@&#9702;@14400@&#10688;@15500@&#10689;@15500@&#10723;@15500@&#10724;@15500@&#10725;@15500@&#10726;@15500@&#10739;@13300@&#10887;@15500@&#10888;@15500@&#10927;@15500@&#10927;&#824;@15500@&#10928;@15500@&#10928;&#824;@15500@&#8260;@14440@&#8710;@13300@&#8714;@15500@&#8717;@15500@&#8718;@13300@&#8725;@14440@&#8727;@14400@&#8728;@14400@&#8729;@14400@&#8735;@15500@&#8739;@15500@&#8758;@15500@&#8759;@15500@&#8760;@14400@&#8761;@15500@&#8762;@14400@&#8763;@15500@&#8765;@15500@&#8765;&#817;@13300@&#8766;@15500@&#8767;@13300@&#8770;@15500@&#8770;&#824;@15500@&#8778;@15500@&#8779;@15500@&#8780;@15500@&#8782;@15500@&#8782;&#824;@15500@&#8783;@15500@&#8783;&#824;@15500@&#8784;@15500@&#8785;@15500@&#8786;@15500@&#8787;@15500@&#8789;@15500@&#8790;@15500@&#8792;@15500@&#8797;@15500@&#8798;@15500@&#8803;@15500@&#8806;@15500@&#8806;&#824;@15500@&#8807;@15500@&#8812;@15500@&#8818;@15500@&#8819;@15500@&#8820;@15500@&#8821;@15500@&#8822;@15500@&#8823;@15500@&#8824;@15500@&#8825;@15500@&#8830;@15500@&#8831;@15500@&#8831;&#824;@15500@&#8844;@14400@&#8845;@14400@&#8846;@14400@&#8847;@15500@&#8847;&#824;@15500@&#8848;@15500@&#8848;&#824;@15500@&#8849;@15500@&#8850;@15500@&#8851;@14400@&#8852;@14400@&#8858;@14400@&#8859;@14400@&#8860;@14400@&#8861;@14400@&#8870;@15500@&#8871;@15500@&#8874;@15500@&#8875;@15500@&#8880;@15500@&#8881;@15500@&#8882;@15500@&#8883;@15500@&#8886;@15500@&#8887;@15500@&#8889;@15500@&#8890;@14400@&#8891;@14400@&#8892;@14400@&#8893;@14400@&#8894;@13300@&#8895;@13300@&#8900;@14400@&#8902;@14400@&#8903;@14400@&#8904;@15500@&#8909;@15500@&#8910;@14400@&#8911;@14400@&#8912;@15500@&#8913;@15500@&#8914;@14400@&#8915;@14400@&#8917;@15500@&#8922;@15500@&#8923;@15500@&#8924;@15500@&#8925;@15500@&#8926;@15500@&#8927;@15500@&#8928;@15500@&#8929;@15500@&#8930;@15500@&#8931;@15500@&#8932;@15500@&#8933;@15500@&#8934;@15500@&#8935;@15500@&#8936;@15500@&#8937;@15500@&#8944;@15500@&#8946;@15500@&#8947;@15500@&#8948;@15500@&#8949;@15500@&#8950;@15500@&#8951;@15500@&#8952;@15500@&#8953;@15500@&#8954;@15500@&#8955;@15500@&#8956;@15500@&#8957;@15500@&#8958;@15500@&#8959;@15500@&#9650;@14400@&#10072;@15500@&#10625;@13300@&#10626;@13300@&#10656;@13300@&#10657;@13300@&#10658;@13300@&#10659;@13300@&#10660;@13300@&#10661;@13300@&#10662;@13300@&#10663;@13300@&#10664;@13300@&#10665;@13300@&#10666;@13300@&#10667;@13300@&#10668;@13300@&#10669;@13300@&#10670;@13300@&#10671;@13300@&#10672;@13300@&#10673;@13300@&#10674;@13300@&#10675;@13300@&#10676;@13300@&#10677;@13300@&#10678;@14400@&#10679;@14400@&#10680;@14400@&#10681;@14400@&#10682;@14400@&#10683;@14400@&#10684;@14400@&#10685;@14400@&#10686;@14400@&#10687;@14400@&#10690;@13300@&#10691;@13300@&#10692;@14400@&#10693;@14400@&#10694;@14400@&#10695;@14400@&#10696;@14400@&#10697;@13300@&#10698;@13300@&#10699;@13300@&#10700;@13300@&#10701;@13300@&#10702;@15500@&#10703;@15500@&#10703;&#824;@15500@&#10704;@15500@&#10704;&#824;@15500@&#10705;@15500@&#10706;@15500@&#10707;@15500@&#10708;@15500@&#10709;@15500@&#10710;@14400@&#10711;@14400@&#10712;@13300@&#10713;@13300@&#10715;@13300@&#10716;@13300@&#10717;@13300@&#10718;@15500@&#10720;@13300@&#10721;@15500@&#10722;@14400@&#10727;@13300@&#10728;@13300@&#10729;@13300@&#10730;@13300@&#10731;@13300@&#10732;@13300@&#10733;@13300@&#10734;@13300@&#10736;@13300@&#10737;@13300@&#10738;@13300@&#10741;@14400@&#10742;@14400@&#10743;@14400@&#10744;@13300@&#10745;@13300@&#10746;@13300@&#10747;@13300@&#10750;@14400@&#10751;@14400@&#10781;@13300@&#10782;@13300@&#10783;@13300@&#10784;@13300@&#10785;@13300@&#10786;@14400@&#10787;@14400@&#10788;@14400@&#10789;@14400@&#10790;@14400@&#10791;@14400@&#10792;@14400@&#10793;@14400@&#10794;@14400@&#10795;@14400@&#10796;@14400@&#10797;@14400@&#10798;@14400@&#10800;@14400@&#10801;@14400@&#10802;@14400@&#10803;@14400@&#10804;@14400@&#10805;@14400@&#10806;@14400@&#10807;@14400@&#10808;@14400@&#10809;@14400@&#10810;@14400@&#10811;@14400@&#10812;@14400@&#10813;@14400@&#10814;@14400@&#10816;@14400@&#10817;@14400@&#10818;@14400@&#10819;@14400@&#10820;@14400@&#10821;@14400@&#10822;@14400@&#10823;@14400@&#10824;@14400@&#10825;@14400@&#10826;@14400@&#10827;@14400@&#10828;@14400@&#10829;@14400@&#10830;@14400@&#10831;@14400@&#10832;@14400@&#10833;@14400@&#10834;@14400@&#10835;@14400@&#10836;@14400@&#10837;@14400@&#10838;@14400@&#10839;@14400@&#10840;@14400@&#10841;@15500@&#10842;@14400@&#10843;@14400@&#10844;@14400@&#10845;@14400@&#10846;@14400@&#10847;@14400@&#10848;@14400@&#10849;@14400@&#10850;@14400@&#10851;@14400@&#10852;@14400@&#10853;@14400@&#10854;@15500@&#10855;@15500@&#10856;@15500@&#10857;@15500@&#10858;@15500@&#10859;@15500@&#10860;@15500@&#10861;@15500@&#10862;@15500@&#10863;@15500@&#10864;@15500@&#10865;@14400@&#10866;@14400@&#10867;@15500@&#10868;@15500@&#10869;@15500@&#10870;@15500@&#10871;@15500@&#10872;@15500@&#10873;@15500@&#10874;@15500@&#10875;@15500@&#10876;@15500@&#10877;@15500@&#10877;&#824;@15500@&#10878;@15500@&#10878;&#824;@15500@&#10879;@15500@&#10880;@15500@&#10881;@15500@&#10882;@15500@&#10883;@15500@&#10884;@15500@&#10885;@15500@&#10886;@15500@&#10889;@15500@&#10890;@15500@&#10891;@15500@&#10892;@15500@&#10893;@15500@&#10894;@15500@&#10895;@15500@&#10896;@15500@&#10897;@15500@&#10898;@15500@&#10899;@15500@&#10900;@15500@&#10901;@15500@&#10902;@15500@&#10903;@15500@&#10904;@15500@&#10905;@15500@&#10906;@15500@&#10907;@15500@&#10908;@15500@&#10909;@15500@&#10910;@15500@&#10911;@15500@&#10912;@15500@&#10913;@15500@&#10913;&#824;@15500@&#10914;@15500@&#10914;&#824;@15500@&#10915;@15500@&#10916;@15500@&#10917;@15500@&#10918;@15500@&#10919;@15500@&#10920;@15500@&#10921;@15500@&#10922;@15500@&#10923;@15500@&#10924;@15500@&#10925;@15500@&#10926;@15500@&#10929;@15500@&#10930;@15500@&#10931;@15500@&#10932;@15500@&#10933;@15500@&#10934;@15500@&#10935;@15500@&#10936;@15500@&#10937;@15500@&#10938;@15500@&#10939;@15500@&#10940;@15500@&#10941;@15500@&#10942;@15500@&#10943;@15500@&#10944;@15500@&#10945;@15500@&#10946;@15500@&#10947;@15500@&#10948;@15500@&#10949;@15500@&#10950;@15500@&#10951;@15500@&#10952;@15500@&#10953;@15500@&#10954;@15500@&#10955;@15500@&#10956;@15500@&#10957;@15500@&#10958;@15500@&#10959;@15500@&#10960;@15500@&#10961;@15500@&#10962;@15500@&#10963;@15500@&#10964;@15500@&#10965;@15500@&#10966;@15500@&#10967;@15500@&#10968;@15500@&#10969;@15500@&#10970;@15500@&#10971;@15500@&#10972;@15500@&#10973;@15500@&#10974;@15500@&#10975;@15500@&#10976;@15500@&#10977;@15500@&#10978;@15500@&#10979;@15500@&#10980;@15500@&#10981;@15500@&#10982;@15500@&#10983;@15500@&#10984;@15500@&#10985;@15500@&#10986;@15500@&#10987;@15500@&#10988;@15500@&#10989;@15500@&#10990;@15500@&#10991;@15500@&#10992;@15500@&#10993;@15500@&#10994;@15500@&#10995;@15500@&#10996;@14400@&#10997;@14400@&#10998;@14400@&#10999;@15500@&#11000;@15500@&#11001;@15500@&#11002;@15500@&#11003;@14400@&#11005;@14400@&#11006;@13300@|@122c2@||@122c2@|||@122c2@&#8592;@15541@&#8593;@15540@&#8594;@15541@&#8595;@15540@&#8596;@15541@&#8597;@15540@&#8598;@15540@&#8599;@15540@&#8600;@15540@&#8601;@15540@&#8602;@15510@&#8603;@15510@&#8604;@15541@&#8605;@15541@&#8606;@15541@&#8607;@15541@&#8608;@15541@&#8609;@15540@&#8610;@15541@&#8611;@15541@&#8612;@15541@&#8613;@15540@&#8614;@15541@&#8615;@15540@&#8616;@15540@&#8617;@15541@&#8618;@15541@&#8619;@15541@&#8620;@15541@&#8621;@15541@&#8622;@15510@&#8623;@15540@&#8624;@15540@&#8625;@15540@&#8626;@15540@&#8627;@15540@&#8628;@15540@&#8629;@15540@&#8630;@15510@&#8631;@15510@&#8632;@15500@&#8633;@15541@&#8634;@15500@&#8635;@15500@&#8636;@15541@&#8637;@15541@&#8638;@15540@&#8639;@15540@&#8640;@15541@&#8641;@15541@&#8642;@15540@&#8643;@15540@&#8644;@15541@&#8645;@15540@&#8646;@15541@&#8647;@15541@&#8648;@15540@&#8649;@15541@&#8650;@15540@&#8651;@15541@&#8652;@15541@&#8653;@15510@&#8654;@15510@&#8655;@15510@&#8656;@15541@&#8657;@15540@&#8658;@15541@&#8659;@15540@&#8660;@15541@&#8661;@15540@&#8662;@15540@&#8663;@15540@&#8664;@15540@&#8665;@15540@&#8666;@15541@&#8667;@15541@&#8668;@15541@&#8669;@15541@&#8670;@15500@&#8671;@15500@&#8672;@15541@&#8673;@15540@&#8674;@15541@&#8675;@15540@&#8676;@15541@&#8677;@15541@&#8678;@15541@&#8679;@15540@&#8680;@15541@&#8681;@15540@&#8682;@15540@&#8683;@15540@&#8684;@15540@&#8685;@15540@&#8686;@15540@&#8687;@15540@&#8688;@15541@&#8689;@15500@&#8690;@15500@&#8691;@15540@&#8692;@15510@&#8693;@15540@&#8694;@15541@&#8695;@15510@&#8696;@15510@&#8697;@15510@&#8698;@15510@&#8699;@15510@&#8700;@15510@&#8701;@15541@&#8702;@15541@&#8703;@15541@&#8888;@15500@&#10224;@15540@&#10225;@15540@&#10229;@15541@&#10230;@15541@&#10231;@15541@&#10232;@15541@&#10233;@15541@&#10234;@15541@&#10235;@15541@&#10236;@15541@&#10237;@15541@&#10238;@15541@&#10239;@15541@&#10496;@15510@&#10497;@15510@&#10498;@15510@&#10499;@15510@&#10500;@15510@&#10501;@15510@&#10502;@15510@&#10503;@15510@&#10504;@15500@&#10505;@15500@&#10506;@15540@&#10507;@15540@&#10508;@15541@&#10509;@15541@&#10510;@15541@&#10511;@15541@&#10512;@15541@&#10513;@15510@&#10514;@15540@&#10515;@15540@&#10516;@15510@&#10517;@15510@&#10518;@15510@&#10519;@15510@&#10520;@15510@&#10521;@15510@&#10522;@15510@&#10523;@15510@&#10524;@15510@&#10525;@15510@&#10526;@15510@&#10527;@15510@&#10528;@15510@&#10529;@15540@&#10530;@15540@&#10531;@15500@&#10532;@15500@&#10533;@15500@&#10534;@15500@&#10535;@15500@&#10536;@15500@&#10537;@15500@&#10538;@15500@&#10539;@15500@&#10540;@15500@&#10541;@15500@&#10542;@15500@&#10543;@15500@&#10544;@15500@&#10545;@15500@&#10546;@15500@&#10547;@15510@&#10548;@15500@&#10549;@15500@&#10550;@15500@&#10551;@15500@&#10552;@15500@&#10553;@15500@&#10554;@15510@&#10555;@15510@&#10556;@15510@&#10557;@15510@&#10558;@15500@&#10559;@15500@&#10560;@15500@&#10561;@15500@&#10562;@15510@&#10563;@15510@&#10564;@15510@&#10565;@15510@&#10566;@15510@&#10567;@15510@&#10568;@15510@&#10569;@15500@&#10570;@15510@&#10571;@15510@&#10572;@15500@&#10573;@15500@&#10574;@15541@&#10575;@15540@&#10576;@15541@&#10577;@15540@&#10578;@15541@&#10579;@15541@&#10580;@15540@&#10581;@15540@&#10582;@15540@&#10583;@15540@&#10584;@15540@&#10585;@15540@&#10586;@15541@&#10587;@15541@&#10588;@15540@&#10589;@15540@&#10590;@15541@&#10591;@15541@&#10592;@15540@&#10593;@15540@&#10594;@15510@&#10595;@15500@&#10596;@15510@&#10597;@15500@&#10598;@15510@&#10599;@15510@&#10600;@15510@&#10601;@15510@&#10602;@15510@&#10603;@15510@&#10604;@15510@&#10605;@15510@&#10606;@15540@&#10607;@15540@&#10608;@15510@&#10609;@15510@&#10610;@15510@&#10611;@15510@&#10612;@15510@&#10613;@15510@&#10614;@15510@&#10615;@15510@&#10616;@15510@&#10617;@15510@&#10618;@15510@&#10619;@15510@&#10620;@15510@&#10621;@15510@&#10622;@15500@&#10623;@15500@&#10649;@13300@&#10650;@13300@&#10651;@13300@&#10652;@13300@&#10653;@13300@&#10654;@13300@&#10655;@13300@&#10719;@13300@&#10735;@13300@&#10740;@15500@&#11077;@15540@&#11078;@15540@+@14400@+@00100@-@14400@-@00100@&#177;@14400@&#177;@00100@&#8722;@14400@&#8722;@00100@&#8723;@14400@&#8723;@00100@&#8724;@14400@&#8862;@14400@&#8863;@14400@&#8721;@01284@&#10762;@01284@&#10763;@01284@&#8748;@00184@&#8749;@00184@&#8853;@14400@&#8854;@14400@&#8856;@14400@&#10753;@01284@&#8747;@00184@&#8750;@00184@&#8751;@00184@&#8752;@00184@&#8753;@00184@&#8754;@00184@&#8755;@00184@&#10764;@00184@&#10765;@01284@&#10766;@01284@&#10767;@01284@&#10768;@01284@&#10769;@01284@&#10770;@01284@&#10771;@01284@&#10772;@01284@&#10773;@01284@&#10774;@01284@&#10775;@01284@&#10776;@01284@&#10777;@01284@&#10778;@01284@&#10779;@01284@&#10780;@01284@&#8899;@01284@&#10755;@01284@&#10756;@01284@&#8896;@01284@&#8897;@01284@&#8898;@01284@&#10752;@01284@&#10754;@01284@&#10757;@01284@&#10758;@01284@&#10759;@01284@&#10760;@01284@&#10761;@01284@&#11004;@01284@&#11007;@01284@&#8768;@14400@&#8719;@01284@&#8720;@01284@&#8745;@14400@&#8746;@14400@*@13300@.@13300@&#215;@14400@&#8226;@14400@&#8290;@10000@&#8864;@14400@&#8865;@14400@&#8901;@14400@&#10799;@14400@&#10815;@14400@&#183;@14400@&#8855;@14400@%@13300@\\@10000@&#8726;@14400@/@11100@&#247;@14400@&#8736;@00000@&#8737;@00000@&#8738;@00000@&#172;@02100@&#8857;@14400@&#8706;@02100@&#8711;@02100@**@11100@&lt;>@11100@^@11100@&#8242;@20200@&#9837;@20200@&#9838;@20200@&#9839;@20200@!@21000@!!@21000@//@11100@&#64;@11100@?@11100@&#8517;@02100@&#8518;@02000@&#8730;@01140@&#8731;@01100@&#8732;@01100@&#8289;@10000@&amp;@20000@'@20010@++@20000@--@20000@^@20041@_@20041@`@20010@~@20041@&#168;@20010@&#175;@20041@&#176;@20000@&#180;@20010@&#184;@20010@&#710;@20041@&#711;@20041@&#713;@20041@&#714;@20010@&#715;@20010@&#717;@20041@&#728;@20010@&#729;@20010@&#730;@20010@&#732;@20041@&#733;@20010@&#759;@20041@&#770;@20041@&#785;@20010@&#8254;@20041@&#8292;@10000@&#8411;@20010@&#8412;@20010@&#9140;@20041@&#9141;@20041@&#9180;@20041@&#9181;@20041@&#9182;@20041@&#9183;@20041@&#9184;@20041@&#9185;@20041@_@11100@";
com.wiris.v51.vcJ = "d@02100@(@00082@)@20082@[@00082@]@20082@{@00082@|@00082@|@20082@||@00082@||@20082@|||@00082@|||@20082@}@20082@|@12282@||@12282@|||@12282@&#160;@100c0@";
com.wiris.v51.vfJ = 1;
com.wiris.v51.vgJ = 2;
com.wiris.v51.vhJ = 4;
com.wiris.v51.viJ = 8;
com.wiris.v51.vlJ = 16;
com.wiris.v51.vmJ = 32;
com.wiris.v51.vnJ = 64;
com.wiris.v51.voJ = 128;
com.wiris.v61.vcI = true;
com.wiris.vD.vk6 = '<editor><actions><action id="fraction"><content><mstyle displaystyle="true"><mfrac><mrow/><mrow/></mfrac></mstyle></content></action><action id="smallFraction"><content><mstyle displaystyle="false"><mfrac><mrow/><mrow/></mfrac></mstyle></content></action><action id="bevelledFraction"><content><mstyle displaystyle="true"><mfrac bevelled="true"><mrow/><mrow/></mfrac></mstyle></content></action><action id="smallBevelledFraction"><content><mstyle displaystyle="false"><mfrac bevelled="true"><mrow/><mrow/></mfrac></mstyle></content></action><action id="squareRoot"><content><msqrt><mrow/></msqrt></content></action><action id="nRoot" offset="2"><content><mroot><mrow/><mrow/></mroot></content></action><action id="subscript"><content><msub><maction actiontype="argument"><mrow/></maction><mrow/></msub></content></action><action id="superscript"><content><msup><maction actiontype="argument"><mrow/></maction><mrow/></msup></content></action><action id="subsuperscript"><content><msubsup><maction actiontype="argument"><mrow/></maction><mrow/><mrow/></msubsup></content></action><action id="parenthesis"><content><mfenced><mrow/></mfenced></content></action><action id="squareBracket"><content><mfenced open="[" close="]"><mrow/></mfenced></content></action><action id="verticalBar"><content><mfenced open="|" close="|"><mrow/></mfenced></content></action><action id="curlyBracket"><content><mfenced open="{" close="}"><mrow/></mfenced></content></action><action id="aposApos"><content><mo>\'\'</mo></content></action><action id="numberPi"><content><mi mathvariant="normal">&#960;</mi></content></action><action id="naturals"><content><mi mathvariant="normal">&#8469;</mi></content></action><action id="rationals"><content><mi mathvariant="normal">&#8474;</mi></content></action><action id="reals"><content><mi mathvariant="normal">&#8477;</mi></content></action><action id="integers"><content><mi mathvariant="normal">&#8484;</mi></content></action><action id="complexes"><content><mi mathvariant="normal">&#8450;</mi></content></action><action id="table"><content><mtable><mtr><mtd/><mtd/><mtd/></mtr><mtr><mtd/><mtd/><mtd/></mtr><mtr><mtd/><mtd/><mtd/></mtr></mtable></content></action><action id="squareTable"><content><mfenced close="]" open="["><mtable><mtr><mtd/><mtd/></mtr><mtr><mtd/><mtd/></mtr></mtable></mfenced></content></action><action id="verticalLineTable"><content><mfenced close="|" open="|"><mtable><mtr><mtd/><mtd/></mtr><mtr><mtd/><mtd/></mtr></mtable></mfenced></content></action><action id="parenthesisTable"><content><mfenced><mtable><mtr><mtd/><mtd/></mtr><mtr><mtd/><mtd/></mtr></mtable></mfenced></content></action><action id="column"><content><mtable><mtr><mtd/></mtr><mtr><mtd/></mtr><mtr><mtd/></mtr></mtable></content></action><action id="row"><content><mtable><mtr><mtd/><mtd/><mtd/></mtr></mtable></content></action><action id="squareColumn"><content><mfenced close="]" open="["><mtable><mtr><mtd/></mtr><mtr><mtd/></mtr></mtable></mfenced></content></action><action id="squareRow"><content><mfenced close="]" open="["><mtable><mtr><mtd/><mtd/></mtr></mtable></mfenced></content></action><action id="parenthesisColumn"><content><mfenced><mtable><mtr><mtd/></mtr><mtr><mtd/></mtr></mtable></mfenced></content></action><action id="parenthesisRow"><content><mfenced><mtable><mtr><mtd/><mtd/></mtr></mtable></mfenced></content></action><action id="lCurlyColumn"><content><mfenced close="" open="{"><mtable><mtr><mtd/></mtr><mtr><mtd/></mtr></mtable></mfenced></content></action><action id="rCurlyColumn"><content><mfenced close="}" open=""><mtable><mtr><mtd/></mtr><mtr><mtd/></mtr></mtable></mfenced></content></action><action id="over" offset="2"><content><mover><mrow/><mrow/></mover></content></action><action id="under"><content><munder><mrow/><mrow/></munder></content></action><action id="underover" offset="2"><content><munderover><mrow/><mrow/><mrow/></munderover></content></action><action id="sumUnderover" offset="5"><content><munderover><mo>&#8721;</mo><mrow/><mrow/></munderover></content></action><action id="sumUnder" offset="4"><content><munder><mo>&#8721;</mo><mrow/></munder></content></action><action id="sumSubsuperscript" offset="4"><content><msubsup><mo>&#8721;</mo><mrow/><mrow/></msubsup></content></action><action id="sumSubscript" offset="3"><content><msub><mo>&#8721;</mo><mrow/></msub></content></action><action id="productUnderover" offset="5"><content><munderover><mo>&#8719;</mo><mrow/><mrow/></munderover></content></action><action id="productUnder" offset="4"><content><munder><mo>&#8719;</mo><mrow/></munder></content></action><action id="productSubsuperscript" offset="4"><content><msubsup><mo>&#8719;</mo><mrow/><mrow/></msubsup></content></action><action id="productSubscript" offset="3"><content><msub><mo>&#8719;</mo><mrow/></msub></content></action><action id="bigOpUnderover" offset="2"><content><munderover><mo largeop="true"/><mrow/><mrow/></munderover></content></action><action id="bigOpUnder"><content><munder><mo largeop="true"/><mrow/></munder></content></action><action id="bigOpSubsuperscript"><content><msubsup><maction actiontype="argument"><mrow><mo largeop="true"/></mrow></maction><mrow/><mrow/></msubsup></content></action><action id="bigOpSubscript"><content><msub><maction actiontype="argument"><mrow><mo largeop="true"/></mrow></maction><mrow/></msub></content></action><action id="bigCap"><content><mo largeop="true">&#8745;</mo></content></action><action id="bigCup"><content><mo largeop="true">&#8746;</mo></content></action><action id="bigSqCap"><content><mo largeop="true">&#8851;</mo></content></action><action id="bigSqCup"><content><mo largeop="true">&#8852;</mo></content></action><action id="integralSubsuperscript" offset="4"><content><msubsup><mo>&#8747;</mo><mrow/><mrow/></msubsup></content></action><action id="integralSubscript" offset="3"><content><msub><mo>&#8747;</mo><mrow/></msub></content></action><action id="integralSubsuperscriptD" offset="5"><content><mrow><msubsup><mo>&#8747;</mo><mrow/><mrow/></msubsup><maction actiontype="argument"><mrow/></maction><mo>d</mo><maction actiontype="argument"><mrow/></maction></mrow></content></action><action id="integralSubscriptD" offset="4"><content><mrow><msub><mo>&#8747;</mo><mrow/></msub><maction actiontype="argument"><mrow/></maction><mo>d</mo><maction actiontype="argument"><mrow/></maction></mrow></content></action><action id="fracPartial" offset="3"><content><mstyle displaystyle="true"><mfrac><mrow><mo>&#8706;</mo><maction actiontype="argument"><mrow/></maction></mrow><mrow><mo>&#8706;</mo><maction actiontype="argument"><mrow/></maction></mrow></mfrac></mstyle></content></action><action id="fracDiff" offset="3"><content><mstyle displaystyle="true"><mfrac><mrow><mo>d</mo><maction actiontype="argument"><mrow/></maction></mrow><mrow><mo>d</mo><maction actiontype="argument"><mrow/></maction></mrow></mfrac></mstyle></content></action><action id="limitToInfinity" offset="10"><content><munder><mi mathvariant="normal">lim</mi><mrow><maction actiontype="argument"><mrow/></maction><mo>&#8594;</mo><mo>&#8734;</mo></mrow></munder></content></action><action id="limitUnder" offset="6"><content><munder><mi mathvariant="normal">lim</mi><mrow/></munder></content></action><action id="curl" offset="3"><content><mrow><mo>&#8711;</mo><mo>&#215;</mo><maction actiontype="argument"><mrow/></maction></mrow></content></action><action id="divergence" offset="3"><content><mrow><mo>&#8711;</mo><mo>&#183;</mo><maction actiontype="argument"><mrow/></maction></mrow></content></action><action id="gradient" offset="2"><content><mrow><mo>&#8711;</mo><maction actiontype="argument"><mrow/></maction></mrow></content></action><action id="laplacian" offset="2"><content><mrow><mo>&#8710;</mo><maction actiontype="argument"><mrow/></maction></mrow></content></action><action id="differentialD"><content><mo>d</mo></content></action>        <action id="rightArrowWithOverScript" enabled="false">            <content>                <math xmlns="http://www.w3.org/1998/Math/MathML"><mover><mo>&#8594;</mo><mrow/></mover></math>            </content>        </action>        <action id="leftArrowWithOverScript" enabled="false">            <content>                <math xmlns="http://www.w3.org/1998/Math/MathML"><mover><mo>&#8592;</mo><mrow/></mover></math>            </content>        </action>        <action id="rightArrowWithUnderScript" enabled="false">            <content>                <math xmlns="http://www.w3.org/1998/Math/MathML"><munder><mo>&#8594;</mo><mrow/></munder></math>            </content>        </action>        <action id="leftArrowWithUnderScript" enabled="false">            <content>                <math xmlns="http://www.w3.org/1998/Math/MathML"><munder><mo>&#8592;</mo><mrow/></munder></math>            </content>        </action>        <action id="rightArrowWithUnderAndOverScript" enabled="false">            <content>                <math xmlns="http://www.w3.org/1998/Math/MathML"><munderover><mo>&#8594;</mo><mrow/><mrow/></munderover></math>            </content>        </action>        <action id="leftArrowWithUnderAndOverScript" enabled="false">            <content>                <math xmlns="http://www.w3.org/1998/Math/MathML"><munderover><mo>&#8592;</mo><mrow/><mrow/></munderover></math>            </content>        </action>        <action id="vectorAccent" enabled="false">            <content>                <math xmlns="http://www.w3.org/1998/Math/MathML"><mover><mrow/><mo>&#8640;</mo></mover></math>            </content>        </action>        <action id="rightArrowAccent" enabled="false">            <content>                <math xmlns="http://www.w3.org/1998/Math/MathML"><mover><mrow/><mo>&#8594;</mo></mover></math>            </content>        </action>        <action id="barAccent" enabled="false">            <content>                <math xmlns="http://www.w3.org/1998/Math/MathML"><mover><mrow/><mo>_</mo></mover></math>            </content>        </action>        <action id="rightLeftArrowAccent" enabled="false">            <content>                <math xmlns="http://www.w3.org/1998/Math/MathML"><mover><mrow/><mo>&#8596;</mo></mover></math>            </content>        </action>        <action id="underScriptWithBrace" enabled="false">            <content>                <math><munder><munder><mrow/><mo>&#xfe38;</mo></munder><mrow/></munder></math>            </content>        </action>        <action id="overScriptWithBrace" enabled="false">            <content>                <math><mover><mover><mrow/><mo>&#xfe37;</mo></mover><mrow/></mover></math>            </content>        </action></actions><toolbar showDisabled="false"><tab id="general" panel="general"><icon src="tab1_dark"/><icon src="tab1_white"/></tab><tab id="symbols" panel="symbols"><icon src="tab2_dark"/><icon src="tab2_white"/></tab><tab id="arrows" panel="arrows"><icon src="tab3_dark"/><icon src="tab3_white"/></tab><tab id="greek" panel="greek"><icon src="tab4_dark"/><icon src="tab4_white"/></tab><tab id="matrices" panel="matrices"><icon src="tab5_dark"/><icon src="tab5_white"/></tab><tab id="scriptsAndLayout" panel="scriptsAndLayout"><icon src="tab6_dark"/><icon src="tab6_white"/></tab><tab id="bracketsAndAccents" panel="bracketsAndAccents"><icon src="tab7_dark"/><icon src="tab7_white"/></tab><tab id="bigOps" panel="bigOps"><icon src="tab8_dark"/><icon src="tab8_white"/></tab><tab id="calculus" panel="calculus"><icon src="tab9_dark"/><icon src="tab9_white"/></tab><!--<tab id="Functions" panel="functions"><icon src="tab10_dark"/><icon src="tab10_white"/></tab>--><panel id="general"><section><button action="fraction" /><button action="bevelledFraction" /><button action="squareRoot" /><button action="nRoot" /></section><section><button action="superscript" /><button action="subscript" /></section><section><button action="parenthesis" /><button action="verticalBar" /><button action="squareBracket" /><button action="curlyBracket" /></section><section rows="3"><button content="+" ><!-- plus --><icon src="plus" /></button><button content="&#215;" ><!-- cross times operator--><icon src="times" /></button><button content="-" ><!-- minus --><icon src="minus" /></button><button content="/" ><!-- slash divide operator --><icon src="slash" /></button><button content="&#177;" ><!-- plusminus --><icon src="plusminus" /></button><button content="&#247;" ><!-- div --><icon src="div" /></button></section><section rows="3" layout="horizontal"><button content="&#8805;" ><!-- gereater or slanted equal to --><icon src="geq" /></button><button content="&#8804;" ><!-- less or slanted equal to --><icon src="leq" /></button><button content="&#8712;" ><!-- element of --><icon src="isin" /></button><button content="&#8834;" ><!-- subset of --><icon src="subset" /></button><button content="&#8746;" ><!-- union --><icon src="cup" /></button><button content="&#8745;" ><!-- intersection --><icon src="cap" /></button></section><section rows="3"><button content="&#8709;" ><!-- empty set --><icon src="emptyset" /></button><button content="&#8734;" ><!-- infinity --><icon src="infinity" /></button><button action="numberPi" ><!-- number pi --><icon src="numberPi" /></button></section><section rows="3"><button action="copy"><icon src="copy" /></button><button action="cut"><icon src="cut" /></button><button action="paste"><icon src="paste" /></button><button action="undo"><icon src="undo" /></button><button action="redo"><icon src="redo" /></button></section><section rows="3"><button action="bold"><icon src="bold" /></button><button action="italic"><icon src="italic" /></button><button action="autoItalic"><icon src="autoItalic" /></button><!-- button action="clean"><icon src="clean" /></button --><colorChooser action="setColor" default="#000000" /></section><section><select action="setFontFamily" enabled="false"><option id="inherit" label="-- Font family --" /><option id="arial" label="Arial" /><option id="courier new" label="Courier New" /><option id="tahoma" label="Tahoma" /><option id="times new roman" label="Times New Roman" /><option id="verdana" label="Verdana" /></select><select action="setFontSize"><option id="inherit" label="-- 字体大小 --" /><option id="8px" label="8px" /><option id="9px" label="9px" /><option id="10px" label="10px" /><option id="11px" label="11px" /><option id="12px" label="12px" /><option id="14px" label="14px" /><option id="16px" label="16px" /><option id="18px" label="18px" /><option id="20px" label="20px" /><option id="22px" label="22px" /><option id="24px" label="24px" /><option id="26px" label="26px" /><option id="28px" label="28px" /><option id="36px" label="36px" /><option id="48px" label="48px" /><option id="72px" label="72px" /></select></section></panel><panel id="symbols" rowsPerSection="3"><section><button content="+" ><!-- plus --><icon src="plus3" /></button><button content="-" ><!-- minus --><icon src="minus3" /></button><button content="&#177;" ><!-- plusminus --><icon src="plusminus3" /></button><button content="&#215;" ><!-- cross times operator--><icon src="times3" /></button><button content="&#247;" ><!-- div --><icon src="div3" /></button><button content="*" ><!-- asterisk --><icon src="asterisk3" /> </button><button content="&#183;"><icon src="middot3" />     <!-- dot times --></button><button content="/"><icon src="slash3" />   <!-- slash --></button><button content="&#8728;"><icon src="smallcircle3"/> <!-- composition --></button><extra><button content="\"><icon src="backslash3" /></button><button content="&#8726;"><icon src="setminus3" /></button><button content="&#8723;"><icon src="minusplus3" /> <!--minusplus symbol --></button></extra></section><section><button action="numberPi"><icon src="numberPi3"/></button><button content="&#8734;"><icon src="infinity3"/></button><button content="&#8709;"><icon src="emptyset3"/></button><button content="&#8706;"><icon src="partial3"/></button><button content="&#8710;"><icon src="increment3"/></button><button content="&#8711;"><icon src="nabla3"/> <!-- &Del; --></button><button content="&#176;"><icon src="degree3"/></button><button content="\'"><icon src="apos3"/></button><button action="aposApos"/></section><section><button content="="><icon src="equal3"/></button><button content="&#8764;"><icon src="sim3"/></button><button content="&#8771;"><icon src="simeq3"/></button><button content="&#8801;"><icon src="congruent3"/></button><button content="&#8776;"><icon src="approx3"/></button><button content="&#8773;"><icon src="tildeFullEqual3"/></button><extra><button content="&#8800;"><icon src="ne3"/></button><button content="&#8802;"><icon src="notCongruent3"/></button><button content="&#8769;"><icon src="notTilde3"/></button></extra></section><section><button content=">"><icon src="greater3"/></button><button content="&#8805;"><icon src="geq3"/> <!-- greater or equal to --></button><button content="&#10878;" ><!-- gereater or slanted equal to --><icon src="geqslant3" /></button><button content="&#60;"><icon src="less3"/></button><button content="&#8804;"><icon src="leq3"/></button><button content="&#10877;"><icon src="leqslant3"/></button><extra><button content="&#10887;"><icon src="lne3"/></button><button content="&#10888;"><icon src="gneq3"/></button><button content="&#8810;"><icon src="mlt3"/> <!-- much less than --></button><button content="&#8811;"><icon src="mgt3"/> <!-- much greater than --></button><button content="&#8733;"><icon src="propto3"/> <!-- proportional to --></button></extra></section><section layout="horizontal"><button content="&#8712;"><icon src="in3" /></button><button content="&#8715;"><icon src="ni3" /></button><button content="&#8746;"><icon src="cup3" /></button><button content="&#8745;"><icon src="cap3" /></button><button content="&#8834;"><icon src="subset3"/></button><button content="&#8835;"><icon src="supset3" /></button><extra><button content="&#8713;"><icon src="notin3"/></button><button content="&#8716;"><icon src="notni3"/></button><button content="&#8838;"><icon src="subsetEqual3"/></button><button content="&#8839;"><icon src="supersetEqual3"/></button><button content="&#8847;"><icon src="sqsub3"/></button><button content="&#8848;"><icon src="sqsupset3"/></button><button content="&#8849;"><icon src="sqsubseteq3"/></button><button content="&#8850;"><icon src="squareSupersetEqual3"/></button><button content="&#8851;"><icon src="sqcap3"/></button><button content="&#8852;"><icon src="squareUnion3"/></button></extra></section><section layout="horizontal"><button content="&#8743;"><icon src="and3" /></button><button content="&#8744;"><icon src="or3" /></button><button content="&#172;"><icon src="not3" /></button><button content="&#8704;"><icon src="forall3" /></button><button content="&#8707;"><icon src="exists3" /></button><button content="&#8708;"><icon src="notExists3" /></button>                <extra>   <button content="&#x2234;" enabled="false"><icon src="there4"/></button>   <button content="&#x2235;" enabled="false"><icon src="becaus"/></button>                </extra></section><section><button content="&#8736;"><icon src="ang3" /></button><button content="&#8741;"><icon src="parallel3" /></button><button content="&#8869;"><icon src="bottom3" /> <!-- perpendicular --></button><extra><button content="&#8742;"><icon src="nparallel3"/></button><button content="&#8737;"><icon src="measuredangle3"/></button><button content="&#8738;"><icon src="angsph3"/></button></extra></section><section><button content="&#9633;"><icon src="square3" /></button><button content="&#9651;"><icon src="bigtriangleup3" /></button><button content="&#9675;"><icon src="cir3" /></button></section><section><button content="&#8853;"><icon src="oplus3" /></button><button content="&#8855;"><icon src="otimes3" /></button></section></panel><panel id="arrows" rowsPerSection="3"><section layout="horizontal"><button content="&#8592;"><icon src="leftarrow" /></button><button content="&#8594;"><icon src="rightarrow" /></button><button content="&#8596;"><icon src="leftrightarrow" /></button><button content="&#8656;"><icon src="DoubleLeftArrow" /></button><button content="&#8658;"><icon src="DoubleRightArrow" /></button><button content="&#8660;"><icon src="DoubleLeftRightArrow" /></button><button content="&#8612;"><icon src="leftTeeArrow"/></button><button content="&#8614;"><icon src="map" /></button><extra><button content="&#8599;"><icon src="nearr"/></button><button content="&#8600;"><icon src="searr"/></button><button content="&#8617;"><icon src="larrhk"/></button><button content="&#8618;"><icon src="hookrightarrow"/></button><button content="&#8598;"><icon src="nwarr"/></button><button content="&#8601;"><icon src="swarrow"/></button><button content="&#8636;"><icon src="lharu"/></button><button content="&#8640;"><icon src="rharu"/></button><button content="&#8593;"><icon src="uparrow"/></button><button content="&#8595;"><icon src="downArrow"/></button><button content="&#x2195;" enabled="false"><icon src="varr"/></button><button content="&#x21d1;" enabled="false"><icon src="UpArrow"/></button><button content="&#x21d3;" enabled="false"><icon src="DownArrow"/></button><button content="&#x21d5;" enabled="false"><icon src="UpDownArrow"/></button><button content="&#x21c1;" enabled="false"><icon src="rhard"/></button><button content="&#x21bd;" enabled="false"><icon src="lhard"/></button><button content="&#x21CB;" enabled="false"><icon src="lrhar"/></button><button content="&#x21CC;" enabled="false"> <!-- equilibrium --><icon src="rlhar"/></button><button content="&#x21C4;" enabled="false"> <!-- reaction in both direction --><icon src="rlarr"/></button><button content="&#x21C6;" enabled="false"><icon src="lrarr"/></button><button content="&#x21f5;" enabled="false"><icon src="duarr"/></button><button content="&#x21C5;" enabled="false"><icon src="udarr"/></button><button content="&#x296F;" enabled="false"><icon src="duhar"/></button><button content="&#x296E;" enabled="false"><icon src="udhar"/></button></extra></section><section><button content="&#x22ee;"> <!-- vertical ... --><icon src="vellip"/></button><button content="&#x2026;"> <!-- ... --><icon src="hellip"/></button><button content="&#x22ef;"> <!-- ��� --><icon src="ctdot"/></button><button content="&#x22f0;"> <!-- up right diagonal ... --><icon src="utdot"/></button><button content="&#x22f1;"> <!-- down right diagonal ... --><icon src="dtdot"/></button></section><section enabled="false"><button action="rightArrowWithOverScript"/>                <button action="leftArrowWithOverScript"/><button action="rightArrowWithUnderScript"/>                <button action="leftArrowWithUnderScript"/><button action="rightArrowWithUnderAndOverScript"/>                <button action="leftArrowWithUnderAndOverScript"/></section><section enabled="false"><button action="vectorAccent"/>                <button action="rightArrowAccent"/>                <button action="barAccent"/>                <button action="rightLeftArrowAccent"/></section></panel><panel id="greek" rowsPerSection="3"><section layout="horizontal"><button content="&#945;"><icon src="alpha"/></button><button content="&#946;"><icon src="beta"/></button><button content="&#947;"><icon src="gamma"/></button><button content="&#948;"><icon src="delta"/></button><button content="&#949;"><icon src="epsilon"/></button><button content="&#950;"><icon src="zeta"/></button><button content="&#951;"><icon src="eta"/></button><button content="&#952;"><icon src="theta"/></button><button content="&#953;"><icon src="iota"/></button><button content="&#954;"><icon src="kappa"/></button><button content="&#955;"><icon src="lambda"/></button><button content="&#956;"><icon src="mu"/></button><button content="&#957;"><icon src="nu"/></button><button content="&#958;"><icon src="xi"/></button><button content="&#959;"><icon src="omicron"/></button><button content="&#960;"><icon src="pi"/></button><button content="&#961;"><icon src="rho"/></button><button content="&#962;"><icon src="sigmav"/></button><button content="&#963;"><icon src="sigma"/></button><button content="&#964;"><icon src="tau"/></button><button content="&#965;"><icon src="upsilon"/></button><button content="&#966;"><icon src="phi"/></button><button content="&#967;"><icon src="chi"/></button><button content="&#968;"><icon src="psi"/></button><button content="&#969;"><icon src="omega"/></button></section><section layout="horizontal"><button content="&#913;"><icon src="Alpha"/></button><button content="&#914;"><icon src="Beta"/></button><button content="&#915;"><icon src="Gamma"/></button><button content="&#916;"><icon src="Delta"/></button><button content="&#917;"><icon src="Epsilon"/></button><button content="&#918;"><icon src="Zeta"/></button><button content="&#919;"><icon src="Eta"/></button><button content="&#920;"><icon src="Theta"/></button><button content="&#921;"><icon src="Iota"/></button><button content="&#922;"><icon src="Kappa"/></button><button content="&#923;"><icon src="Lambda"/></button><button content="&#924;"><icon src="Mu"/></button><button content="&#925;"><icon src="Nu"/></button><button content="&#926;"><icon src="Xi"/></button><button content="&#927;"><icon src="Omicron"/></button><button content="&#928;"><icon src="Pi"/></button><button content="&#929;"><icon src="Rho"/></button><button content="&#931;"><icon src="Sigma"/></button><button content="&#932;"><icon src="Tau"/></button><button content="&#933;"><icon src="Upsilon"/></button><button content="&#934;"><icon src="Phi"/></button><button content="&#935;"><icon src="Chi"/></button><button content="&#936;"><icon src="Psi"/></button><button content="&#937;"><icon src="Omega"/></button></section><section><button action="naturals"><icon src="naturals3" /></button><button action="rationals"><icon src="rationals3" /></button><button action="reals"><icon src="reals3" /></button><button action="integers"><icon src="integers3" /></button><button action="complexes"><icon src="complexes3" /></button><button content="&#8476;"><icon src="realpart3" /></button><extra><button content="&#8465;"><icon src="ifr3"/> <!-- imaginary part --></button></extra></section></panel><panel id="matrices"><section><button action="table"/><button action="squareTable"/><button action="verticalLineTable"/><button action="parenthesisTable"/><button action="column"/><button action="row"/><button action="squareColumn"/><button action="squareRow"/><button action="parenthesisColumn"/><button action="parenthesisRow"/></section><section><button action="lCurlyColumn"/><button action="rCurlyColumn"/></section></panel><panel id="scriptsAndLayout"><section><button action="fraction" /><button action="bevelledFraction" /><button action="smallFraction" /><button action="smallBevelledFraction" /></section><section><button action="squareRoot"/><button action="nRoot"/></section><section><button action="superscript"/><button action="subsuperscript"/><button action="subscript"/></section><section><button action="over"/><button action="underover"/><button action="under"/></section><section enabled="false"><button action="underScriptWithBrace"/><button action="overScriptWithBrace"/></section></panel><panel id="bracketsAndAccents"><section><button action="parenthesis"/><button action="squareBracket"/><button action="verticalBar"/><button action="curlyBracket" /></section>            <section enabled="false" rows="3">            <button content="(">                    <icon src="leftParenthesis"/>                </button>            <button content=")">                    <icon src="rightParenthesis"/>                </button>            <button content="[">                    <icon src="leftSquareBracket"/>                </button>            <button content="]">                    <icon src="rightSquareBracket"/>                </button>            <button content="{">                    <icon src="leftCurlyBracket"/>                </button>            <button content="}">                    <icon src="rightCurlyBracket"/>                </button>            <button content="&#x2308;">                    <icon src="leftCeiling"/>                </button>            <button content="&#x230a;">                    <icon src="leftFloor"/>                </button>            <button content="&#x2309;">                    <icon src="rightCeiling"/>                </button>            <button content="&#x230b;">                    <icon src="rightFloor"/>                </button>            <button content="|">                    <icon src="bar"/>                </button>            <button content="&#x27E9;">                    <icon src="rightAngleBracket"/>                </button>            <button content="&#x27E8;">                    <icon src="leftAngleBracket"/>                </button>            </section>            <section enabled="false" rows="3">            <button content="&#x23DC;">                    <icon src="topParenthesis"/>                </button>            <button content="&#x23DD;">                    <icon src="bottomParenthesis"/>                </button>            <button content="&#x23B4;">                    <icon src="topSquareBracket"/>                </button>            <button content="&#x23B5;">                    <icon src="bottomSquareBracket"/>                </button>            <button content="&#x23DE;">                    <icon src="topCurlyBracket"/>                </button>            <button content="&#x23DF;">                    <icon src="bottomCurlyBracket"/>                </button>            </section></panel><panel id="bigOps"><section><button action="sumUnderover"/><button action="sumUnder"/><button action="sumSubsuperscript"/><button action="sumSubscript"/></section><section><button action="productUnderover"/><button action="productUnder"/><button action="productSubsuperscript"/><button action="productSubscript"/></section><section><button action="bigOpUnderover"/><button action="bigOpUnder"/><button action="bigOpSubsuperscript"/><button action="bigOpSubscript"/></section><section><button action="bigCap"/><button action="bigCup"/><extra><button action="bigSqCap"/><button action="bigSqCup"/></extra></section></panel><panel id="calculus"><section><button action="integralSubsuperscript"/><button action="integralSubscript"/><button action="integralSubsuperscriptD"/><button action="integralSubscriptD"/></section><section><button action="differentialD"/><button content="&#8706;"><icon src="partial2"/></button><button action="fracDiff"/><button action="fracPartial"/></section><section><button action="limitToInfinity"/><button action="limitUnder"/></section><section><button action="curl"/><button action="divergence"/><button action="gradient"/><button action="laplacian"/></section><section><button content="&#8747;"><icon src="integral"/></button><button content="&#8750;"><icon src="integralContour"/></button><button content="&#8748;"><icon src="integralDouble"/></button><button content="&#8751;"><icon src="integralDoubleContour"/></button><extra><button content="&#8749;"><icon src="iiint"/></button><button content="&#8752;"><icon src="cconint"/></button></extra></section></panel><panel id="functions"><section></section></panel></toolbar><images><image bounds="0,0,29,29" filePath="icons/icons.png" src="fraction"/><image bounds="0,29,29,58" filePath="icons/icons.png" src="bevelledFraction"/><image bounds="29,0,58,29" filePath="icons/icons.png" src="squareRoot"/><image bounds="29,29,58,58" filePath="icons/icons.png" src="nRoot"/><image bounds="58,0,87,29" filePath="icons/icons.png" src="superscript"/><image bounds="58,29,87,58" filePath="icons/icons.png" src="subscript"/><image bounds="87,0,116,29" filePath="icons/icons.png" src="parenthesis"/><image bounds="87,29,116,58" filePath="icons/icons.png" src="verticalBar"/><image bounds="116,0,145,29" filePath="icons/icons.png" src="squareBracket"/><image bounds="116,29,145,58" filePath="icons/icons.png" src="curlyBracket"/><image bounds="145,0,163,18" filePath="icons/icons.png" src="plus"/><image bounds="145,18,163,36" filePath="icons/icons.png" src="times"/><image bounds="145,36,163,54" filePath="icons/icons.png" src="minus"/><image bounds="163,0,181,18" filePath="icons/icons.png" src="slash"/><image bounds="163,18,181,36" filePath="icons/icons.png" src="plusminus"/><image bounds="163,36,181,54" filePath="icons/icons.png" src="div"/><image bounds="181,0,199,18" filePath="icons/icons.png" src="geq"/><image bounds="181,18,199,36" filePath="icons/icons.png" src="leq"/><image bounds="181,36,199,54" filePath="icons/icons.png" src="isin"/><image bounds="199,0,217,18" filePath="icons/icons.png" src="subset"/><image bounds="199,18,217,36" filePath="icons/icons.png" src="cup"/><image bounds="199,36,217,54" filePath="icons/icons.png" src="cap"/><image bounds="217,0,235,18" filePath="icons/icons.png" src="emptyset"/><image bounds="217,18,235,36" filePath="icons/icons.png" src="infinity"/><image bounds="217,36,235,54" filePath="icons/icons.png" src="numberPi"/><image bounds="235,0,253,18" filePath="icons/icons.png" src="copy"/><image bounds="235,18,253,36" filePath="icons/icons.png" src="cut"/><image bounds="235,36,253,54" filePath="icons/icons.png" src="paste"/><image bounds="253,0,271,18" filePath="icons/icons.png" src="undo"/><image bounds="253,18,271,36" filePath="icons/icons.png" src="redo"/><image bounds="253,36,271,54" filePath="icons/icons.png" src="bold"/><image bounds="271,0,289,18" filePath="icons/icons.png" src="italic"/><image bounds="271,18,289,36" filePath="icons/icons.png" src="autoItalic"/><image bounds="271,36,289,54" filePath="icons/icons.png" src="backslash3"/><image bounds="289,0,307,18" filePath="icons/icons.png" src="setminus3"/><image bounds="289,18,307,36" filePath="icons/icons.png" src="minusplus3"/><image bounds="289,36,307,54" filePath="icons/icons.png" src="plus3"/><image bounds="307,0,325,18" filePath="icons/icons.png" src="minus3"/><image bounds="307,18,325,36" filePath="icons/icons.png" src="plusminus3"/><image bounds="307,36,325,54" filePath="icons/icons.png" src="times3"/><image bounds="325,0,343,18" filePath="icons/icons.png" src="div3"/><image bounds="325,18,343,36" filePath="icons/icons.png" src="asterisk3"/><image bounds="325,36,343,54" filePath="icons/icons.png" src="middot3"/><image bounds="343,0,361,18" filePath="icons/icons.png" src="slash3"/><image bounds="343,18,361,36" filePath="icons/icons.png" src="smallcircle3"/><image bounds="343,36,361,54" filePath="icons/icons.png" src="numberPi3"/><image bounds="361,0,379,18" filePath="icons/icons.png" src="infinity3"/><image bounds="361,18,379,36" filePath="icons/icons.png" src="emptyset3"/><image bounds="361,36,379,54" filePath="icons/icons.png" src="partial3"/><image bounds="379,0,397,18" filePath="icons/icons.png" src="increment3"/><image bounds="379,18,397,36" filePath="icons/icons.png" src="nabla3"/><image bounds="379,36,397,54" filePath="icons/icons.png" src="degree3"/><image bounds="397,0,415,18" filePath="icons/icons.png" src="apos3"/><image bounds="397,18,415,36" filePath="icons/icons.png" src="aposApos"/><image bounds="397,36,415,54" filePath="icons/icons.png" src="ne3"/><image bounds="415,0,433,18" filePath="icons/icons.png" src="notCongruent3"/><image bounds="415,18,433,36" filePath="icons/icons.png" src="notTilde3"/><image bounds="415,36,433,54" filePath="icons/icons.png" src="equal3"/><image bounds="433,0,451,18" filePath="icons/icons.png" src="sim3"/><image bounds="433,18,451,36" filePath="icons/icons.png" src="simeq3"/><image bounds="433,36,451,54" filePath="icons/icons.png" src="congruent3"/><image bounds="451,0,469,18" filePath="icons/icons.png" src="approx3"/><image bounds="451,18,469,36" filePath="icons/icons.png" src="tildeFullEqual3"/><image bounds="451,36,469,54" filePath="icons/icons.png" src="lne3"/><image bounds="469,0,487,18" filePath="icons/icons.png" src="gneq3"/><image bounds="469,18,487,36" filePath="icons/icons.png" src="mlt3"/><image bounds="469,36,487,54" filePath="icons/icons.png" src="mgt3"/><image bounds="487,0,505,18" filePath="icons/icons.png" src="propto3"/><image bounds="487,18,505,36" filePath="icons/icons.png" src="greater3"/><image bounds="487,36,505,54" filePath="icons/icons.png" src="geq3"/><image bounds="505,0,523,18" filePath="icons/icons.png" src="geqslant3"/><image bounds="505,18,523,36" filePath="icons/icons.png" src="less3"/><image bounds="505,36,523,54" filePath="icons/icons.png" src="leq3"/><image bounds="523,0,541,18" filePath="icons/icons.png" src="leqslant3"/><image bounds="523,18,541,36" filePath="icons/icons.png" src="notin3"/><image bounds="523,36,541,54" filePath="icons/icons.png" src="notni3"/><image bounds="541,0,559,18" filePath="icons/icons.png" src="subsetEqual3"/><image bounds="541,18,559,36" filePath="icons/icons.png" src="supersetEqual3"/><image bounds="541,36,559,54" filePath="icons/icons.png" src="sqsub3"/><image bounds="559,0,577,18" filePath="icons/icons.png" src="sqsupset3"/><image bounds="559,18,577,36" filePath="icons/icons.png" src="sqsubseteq3"/><image bounds="559,36,577,54" filePath="icons/icons.png" src="squareSupersetEqual3"/><image bounds="577,0,595,18" filePath="icons/icons.png" src="sqcap3"/><image bounds="577,18,595,36" filePath="icons/icons.png" src="squareUnion3"/><image bounds="577,36,595,54" filePath="icons/icons.png" src="in3"/><image bounds="595,0,613,18" filePath="icons/icons.png" src="ni3"/><image bounds="595,18,613,36" filePath="icons/icons.png" src="cup3"/><image bounds="595,36,613,54" filePath="icons/icons.png" src="cap3"/><image bounds="613,0,631,18" filePath="icons/icons.png" src="subset3"/><image bounds="613,18,631,36" filePath="icons/icons.png" src="supset3"/><image bounds="613,36,631,54" filePath="icons/icons.png" src="and3"/><image bounds="631,0,649,18" filePath="icons/icons.png" src="or3"/><image bounds="631,18,649,36" filePath="icons/icons.png" src="not3"/><image bounds="631,36,649,54" filePath="icons/icons.png" src="forall3"/><image bounds="649,0,667,18" filePath="icons/icons.png" src="exists3"/><image bounds="649,18,667,36" filePath="icons/icons.png" src="notExists3"/><image bounds="649,36,667,54" filePath="icons/icons.png" src="nparallel3"/><image bounds="667,0,685,18" filePath="icons/icons.png" src="measuredangle3"/><image bounds="667,18,685,36" filePath="icons/icons.png" src="angsph3"/><image bounds="667,36,685,54" filePath="icons/icons.png" src="ang3"/><image bounds="685,0,703,18" filePath="icons/icons.png" src="parallel3"/><image bounds="685,18,703,36" filePath="icons/icons.png" src="bottom3"/><image bounds="685,36,703,54" filePath="icons/icons.png" src="square3"/><image bounds="703,0,721,18" filePath="icons/icons.png" src="bigtriangleup3"/><image bounds="703,18,721,36" filePath="icons/icons.png" src="cir3"/><image bounds="703,36,721,54" filePath="icons/icons.png" src="oplus3"/><image bounds="721,0,739,18" filePath="icons/icons.png" src="otimes3"/><image bounds="721,18,739,36" filePath="icons/icons.png" src="nearr"/><image bounds="721,36,739,54" filePath="icons/icons.png" src="searr"/><image bounds="739,0,757,18" filePath="icons/icons.png" src="larrhk"/><image bounds="739,18,757,36" filePath="icons/icons.png" src="hookrightarrow"/><image bounds="739,36,757,54" filePath="icons/icons.png" src="nwarr"/><image bounds="757,0,775,18" filePath="icons/icons.png" src="swarrow"/><image bounds="757,18,775,36" filePath="icons/icons.png" src="lharu"/><image bounds="757,36,775,54" filePath="icons/icons.png" src="rharu"/><image bounds="775,0,793,18" filePath="icons/icons.png" src="uparrow"/><image bounds="775,18,793,36" filePath="icons/icons.png" src="downArrow"/><image bounds="775,36,793,54" filePath="icons/icons.png" src="leftarrow"/><image bounds="793,0,811,18" filePath="icons/icons.png" src="rightarrow"/><image bounds="793,18,811,36" filePath="icons/icons.png" src="leftrightarrow"/><image bounds="793,36,811,54" filePath="icons/icons.png" src="DoubleLeftArrow"/><image bounds="811,0,829,18" filePath="icons/icons.png" src="DoubleRightArrow"/><image bounds="811,18,829,36" filePath="icons/icons.png" src="DoubleLeftRightArrow"/><image bounds="811,36,829,54" filePath="icons/icons.png" src="leftTeeArrow"/><image bounds="829,0,847,18" filePath="icons/icons.png" src="map"/><image bounds="829,18,847,36" filePath="icons/icons.png" src="vellip"/><image bounds="829,36,847,54" filePath="icons/icons.png" src="hellip"/><image bounds="847,0,865,18" filePath="icons/icons.png" src="ctdot"/><image bounds="847,18,865,36" filePath="icons/icons.png" src="utdot"/><image bounds="847,36,865,54" filePath="icons/icons.png" src="dtdot"/><image bounds="865,0,883,18" filePath="icons/icons.png" src="alpha"/><image bounds="865,18,883,36" filePath="icons/icons.png" src="beta"/><image bounds="865,36,883,54" filePath="icons/icons.png" src="gamma"/><image bounds="883,0,901,18" filePath="icons/icons.png" src="delta"/><image bounds="883,18,901,36" filePath="icons/icons.png" src="epsilon"/><image bounds="883,36,901,54" filePath="icons/icons.png" src="zeta"/><image bounds="901,0,919,18" filePath="icons/icons.png" src="eta"/><image bounds="901,18,919,36" filePath="icons/icons.png" src="theta"/><image bounds="901,36,919,54" filePath="icons/icons.png" src="iota"/><image bounds="919,0,937,18" filePath="icons/icons.png" src="kappa"/><image bounds="919,18,937,36" filePath="icons/icons.png" src="lambda"/><image bounds="919,36,937,54" filePath="icons/icons.png" src="mu"/><image bounds="937,0,955,18" filePath="icons/icons.png" src="nu"/><image bounds="937,18,955,36" filePath="icons/icons.png" src="xi"/><image bounds="937,36,955,54" filePath="icons/icons.png" src="omicron"/><image bounds="955,0,973,18" filePath="icons/icons.png" src="pi"/><image bounds="955,18,973,36" filePath="icons/icons.png" src="rho"/><image bounds="955,36,973,54" filePath="icons/icons.png" src="sigmav"/><image bounds="973,0,991,18" filePath="icons/icons.png" src="sigma"/><image bounds="973,18,991,36" filePath="icons/icons.png" src="tau"/><image bounds="973,36,991,54" filePath="icons/icons.png" src="upsilon"/><image bounds="991,0,1009,18" filePath="icons/icons.png" src="phi"/><image bounds="991,18,1009,36" filePath="icons/icons.png" src="chi"/><image bounds="991,36,1009,54" filePath="icons/icons.png" src="psi"/><image bounds="1009,0,1027,18" filePath="icons/icons.png" src="omega"/><image bounds="1009,18,1027,36" filePath="icons/icons.png" src="Alpha"/><image bounds="1009,36,1027,54" filePath="icons/icons.png" src="Beta"/><image bounds="1027,0,1045,18" filePath="icons/icons.png" src="Gamma"/><image bounds="1027,18,1045,36" filePath="icons/icons.png" src="Delta"/><image bounds="1027,36,1045,54" filePath="icons/icons.png" src="Epsilon"/><image bounds="1045,0,1063,18" filePath="icons/icons.png" src="Zeta"/><image bounds="1045,18,1063,36" filePath="icons/icons.png" src="Eta"/><image bounds="1045,36,1063,54" filePath="icons/icons.png" src="Theta"/><image bounds="1063,0,1081,18" filePath="icons/icons.png" src="Iota"/><image bounds="1063,18,1081,36" filePath="icons/icons.png" src="Kappa"/><image bounds="1063,36,1081,54" filePath="icons/icons.png" src="Lambda"/><image bounds="1081,0,1099,18" filePath="icons/icons.png" src="Mu"/><image bounds="1081,18,1099,36" filePath="icons/icons.png" src="Nu"/><image bounds="1081,36,1099,54" filePath="icons/icons.png" src="Xi"/><image bounds="1099,0,1117,18" filePath="icons/icons.png" src="Omicron"/><image bounds="1099,18,1117,36" filePath="icons/icons.png" src="Pi"/><image bounds="1099,36,1117,54" filePath="icons/icons.png" src="Rho"/><image bounds="1117,0,1135,18" filePath="icons/icons.png" src="Sigma"/><image bounds="1117,18,1135,36" filePath="icons/icons.png" src="Tau"/><image bounds="1117,36,1135,54" filePath="icons/icons.png" src="Upsilon"/><image bounds="1135,0,1153,18" filePath="icons/icons.png" src="Phi"/><image bounds="1135,18,1153,36" filePath="icons/icons.png" src="Chi"/><image bounds="1135,36,1153,54" filePath="icons/icons.png" src="Psi"/><image bounds="1153,0,1171,18" filePath="icons/icons.png" src="Omega"/><image bounds="1153,18,1171,36" filePath="icons/icons.png" src="ifr3"/><image bounds="1153,36,1171,54" filePath="icons/icons.png" src="naturals3"/><image bounds="1171,0,1189,18" filePath="icons/icons.png" src="rationals3"/><image bounds="1171,18,1189,36" filePath="icons/icons.png" src="reals3"/><image bounds="1171,36,1189,54" filePath="icons/icons.png" src="integers3"/><image bounds="1189,0,1207,18" filePath="icons/icons.png" src="complexes3"/><image bounds="1189,18,1207,36" filePath="icons/icons.png" src="realpart3"/><image bounds="1207,0,1236,29" filePath="icons/icons.png" src="table"/><image bounds="1207,29,1236,58" filePath="icons/icons.png" src="squareTable"/><image bounds="1236,0,1265,29" filePath="icons/icons.png" src="verticalLineTable"/><image bounds="1236,29,1265,58" filePath="icons/icons.png" src="parenthesisTable"/><image bounds="1265,0,1294,29" filePath="icons/icons.png" src="column"/><image bounds="1265,29,1294,58" filePath="icons/icons.png" src="row"/><image bounds="1294,0,1323,29" filePath="icons/icons.png" src="squareColumn"/><image bounds="1294,29,1323,58" filePath="icons/icons.png" src="squareRow"/><image bounds="1323,0,1352,29" filePath="icons/icons.png" src="parenthesisColumn"/><image bounds="1323,29,1352,58" filePath="icons/icons.png" src="parenthesisRow"/><image bounds="1352,0,1381,29" filePath="icons/icons.png" src="lCurlyColumn"/><image bounds="1352,29,1381,58" filePath="icons/icons.png" src="rCurlyColumn"/><image bounds="1381,0,1410,29" filePath="icons/icons.png" src="smallFraction"/><image bounds="1381,29,1410,58" filePath="icons/icons.png" src="smallBevelledFraction"/><image bounds="1410,0,1439,29" filePath="icons/icons.png" src="subsuperscript"/><image bounds="1410,29,1439,58" filePath="icons/icons.png" src="over"/><image bounds="1439,0,1468,29" filePath="icons/icons.png" src="underover"/><image bounds="1439,29,1468,58" filePath="icons/icons.png" src="under"/><image bounds="1468,0,1497,29" filePath="icons/icons.png" src="sumUnderover"/><image bounds="1468,29,1497,58" filePath="icons/icons.png" src="sumUnder"/><image bounds="1497,0,1526,29" filePath="icons/icons.png" src="sumSubsuperscript"/><image bounds="1497,29,1526,58" filePath="icons/icons.png" src="sumSubscript"/><image bounds="1526,0,1555,29" filePath="icons/icons.png" src="productUnderover"/><image bounds="1526,29,1555,58" filePath="icons/icons.png" src="productUnder"/><image bounds="1555,0,1584,29" filePath="icons/icons.png" src="productSubsuperscript"/><image bounds="1555,29,1584,58" filePath="icons/icons.png" src="productSubscript"/><image bounds="1584,0,1613,29" filePath="icons/icons.png" src="bigOpUnderover"/><image bounds="1584,29,1613,58" filePath="icons/icons.png" src="bigOpUnder"/><image bounds="1613,0,1642,29" filePath="icons/icons.png" src="bigOpSubsuperscript"/><image bounds="1613,29,1642,58" filePath="icons/icons.png" src="bigOpSubscript"/><image bounds="1642,0,1671,29" filePath="icons/icons.png" src="bigSqCap"/><image bounds="1642,29,1671,58" filePath="icons/icons.png" src="bigSqCup"/><image bounds="1671,0,1700,29" filePath="icons/icons.png" src="bigCap"/><image bounds="1671,29,1700,58" filePath="icons/icons.png" src="bigCup"/><image bounds="1700,0,1729,29" filePath="icons/icons.png" src="integralSubsuperscript"/><image bounds="1700,29,1729,58" filePath="icons/icons.png" src="integralSubscript"/><image bounds="1729,0,1758,29" filePath="icons/icons.png" src="integralSubsuperscriptD"/><image bounds="1729,29,1758,58" filePath="icons/icons.png" src="integralSubscriptD"/><image bounds="1758,0,1787,29" filePath="icons/icons.png" src="differentialD"/><image bounds="1758,29,1787,58" filePath="icons/icons.png" src="partial2"/><image bounds="1787,0,1816,29" filePath="icons/icons.png" src="fracDiff"/><image bounds="1787,29,1816,58" filePath="icons/icons.png" src="fracPartial"/><image bounds="1816,0,1845,29" filePath="icons/icons.png" src="limitToInfinity"/><image bounds="1816,29,1845,58" filePath="icons/icons.png" src="limitUnder"/><image bounds="1845,0,1874,29" filePath="icons/icons.png" src="curl"/><image bounds="1845,29,1874,58" filePath="icons/icons.png" src="divergence"/><image bounds="1874,0,1903,29" filePath="icons/icons.png" src="gradient"/><image bounds="1874,29,1903,58" filePath="icons/icons.png" src="laplacian"/><image bounds="1903,0,1932,29" filePath="icons/icons.png" src="iiint"/><image bounds="1903,29,1932,58" filePath="icons/icons.png" src="cconint"/><image bounds="1932,0,1961,29" filePath="icons/icons.png" src="integral"/><image bounds="1932,29,1961,58" filePath="icons/icons.png" src="integralContour"/><image bounds="1961,0,1990,29" filePath="icons/icons.png" src="integralDouble"/><image bounds="1961,29,1990,58" filePath="icons/icons.png" src="integralDoubleContour"/><image bounds="1990,0,2040,30" filePath="icons/icons.png" src="general"/><image bounds="1990,30,2040,60" filePath="icons/icons.png" src="general_unselected"/><image bounds="2040,0,2090,30" filePath="icons/icons.png" src="symbols"/><image bounds="2040,30,2090,60" filePath="icons/icons.png" src="symbols_unselected"/><image bounds="2090,0,2140,30" filePath="icons/icons.png" src="arrows"/><image bounds="2090,30,2140,60" filePath="icons/icons.png" src="arrows_unselected"/><image bounds="2140,0,2190,30" filePath="icons/icons.png" src="greek"/><image bounds="2140,30,2190,60" filePath="icons/icons.png" src="greek_unselected"/><image bounds="2190,0,2240,30" filePath="icons/icons.png" src="matrices"/><image bounds="2190,30,2240,60" filePath="icons/icons.png" src="matrices_unselected"/><image bounds="2240,0,2290,30" filePath="icons/icons.png" src="scriptsAndLayout"/><image bounds="2240,30,2290,60" filePath="icons/icons.png" src="scriptsAndLayout_unselected"/><image bounds="2290,0,2340,30" filePath="icons/icons.png" src="bracketsAndAccents"/><image bounds="2290,30,2340,60" filePath="icons/icons.png" src="bracketsAndAccents_unselected"/><image bounds="2340,0,2390,30" filePath="icons/icons.png" src="bigOps"/><image bounds="2340,30,2390,60" filePath="icons/icons.png" src="bigOps_unselected"/><image bounds="2390,0,2440,30" filePath="icons/icons.png" src="calculus"/><image bounds="2390,30,2440,60" filePath="icons/icons.png" src="calculus_unselected"/><image bounds="2440,0,2468,17" filePath="icons/icons.png" src="tab1_dark"/><image bounds="2440,17,2465,34" filePath="icons/icons.png" src="tab3_dark"/><image bounds="2468,0,2497,29" filePath="icons/icons.png" src="remove_row"/><image bounds="2468,29,2495,46" filePath="icons/icons.png" src="tab5_dark"/><image bounds="2497,0,2517,17" filePath="icons/icons.png" src="properties_white"/><image bounds="2497,17,2526,34" filePath="icons/icons.png" src="tab7_dark"/><image bounds="2497,34,2524,51" filePath="icons/icons.png" src="tab9_dark"/><image bounds="2526,0,2555,29" filePath="icons/icons.png" src="remove_column"/><image bounds="2526,29,2554,46" filePath="icons/icons.png" src="tab1_white"/><image bounds="2555,0,2578,17" filePath="icons/icons.png" src="tab6_white"/><image bounds="2555,17,2580,34" filePath="icons/icons.png" src="tab3_white"/><image bounds="2555,34,2578,51" filePath="icons/icons.png" src="tab8_white"/><image bounds="2580,0,2607,17" filePath="icons/icons.png" src="tab5_white"/><image bounds="2580,17,2604,34" filePath="icons/icons.png" src="tab2_white"/><image bounds="2580,34,2609,51" filePath="icons/icons.png" src="tab7_white"/><image bounds="2609,0,2632,17" filePath="icons/icons.png" src="tab4_white"/><image bounds="2609,17,2636,34" filePath="icons/icons.png" src="tab9_white"/><image bounds="2609,34,2629,51" filePath="icons/icons.png" src="properties_dark"/><image bounds="2636,0,2665,29" filePath="icons/icons.png" src="prepend_row"/><image bounds="2636,29,2666,46" filePath="icons/icons.png" src="tab10_dark"/><image bounds="2666,0,2683,17" filePath="icons/icons.png" src="manual"/><image bounds="2666,17,2690,34" filePath="icons/icons.png" src="tab2_dark"/><image bounds="2666,34,2684,51" filePath="icons/icons.png" src="tab11_white"/><image bounds="2690,0,2720,17" filePath="icons/icons.png" src="tab10_white"/><image bounds="2690,17,2713,34" filePath="icons/icons.png" src="tab4_dark"/><image bounds="2720,0,2749,29" filePath="icons/icons.png" src="prepend_column"/><image bounds="2720,29,2743,46" filePath="icons/icons.png" src="tab6_dark"/><image bounds="2749,0,2778,29" filePath="icons/icons.png" src="append_row"/><image bounds="2749,29,2772,46" filePath="icons/icons.png" src="tab8_dark"/><image bounds="2778,0,2796,18" filePath="icons/icons.png" src="clean"/><image bounds="2778,18,2807,47" filePath="icons/icons.png" src="append_column"/><image bounds="2807,0,2825,17" filePath="icons/icons.png" src="tab11_dark"/></images></editor>';
com.wiris.vD.vl6 = '<characters><char c="124"/><char c="8204"/><char c="8205"/><char c="8206"/><char c="8207"/><char c="8214"/><char c="8232"/><char c="8233"/><char c="8234"/><char c="8235"/><char c="8236"/><char c="8237"/><char c="8238"/><char c="8298"/><char c="8299"/><char c="8300"/><char c="8301"/><char c="8302"/><char c="8303"/><char c="9115"/><char c="9116"/><char c="9117"/><char c="9118"/><char c="9119"/><char c="9120"/><char c="9121"/><char c="9122"/><char c="9123"/><char c="9124"/><char c="9125"/><char c="9126"/><char c="61442"/><char c="124" t="s"/><char c="8204" t="s"/><char c="8205" t="s"/><char c="8206" t="s"/><char c="8207" t="s"/><char c="8214" t="s"/><char c="8232" t="s"/><char c="8233" t="s"/><char c="8234" t="s"/><char c="8235" t="s"/><char c="8236" t="s"/><char c="8237" t="s"/><char c="8238" t="s"/><char c="8298" t="s"/><char c="8299" t="s"/><char c="8300" t="s"/><char c="8301" t="s"/><char c="8302" t="s"/><char c="8303" t="s"/><char c="9115" t="s"/><char c="9116" t="s"/><char c="9117" t="s"/><char c="9118" t="s"/><char c="9119" t="s"/><char c="9120" t="s"/><char c="9121" t="s"/><char c="9122" t="s"/><char c="9123" t="s"/><char c="9124" t="s"/><char c="9125" t="s"/><char c="9126" t="s"/><char c="9127" t="s"/><char c="9128" t="s"/><char c="9129" t="s"/><char c="9130" t="s"/><char c="9131" t="s"/><char c="9132" t="s"/><char c="9133" t="s"/><char c="9134" t="s"/><char c="61442" t="s"/><char c="39" t="m"/><char c="43" t="m"/><char c="45" t="m"/><char c="46" t="m"/><char c="47" t="m"/><char c="60" t="m"/><char c="61" t="m"/><char c="62" t="m"/><char c="160" t="m"/><char c="172" t="m"/><char c="176" t="m"/><char c="177" t="m"/><char c="183" t="m"/><char c="215" t="m"/><char c="247" t="m"/><char c="4096" t="m"/><char c="8204" t="m"/><char c="8205" t="m"/><char c="8206" t="m"/><char c="8207" t="m"/><char c="8229" t="m"/><char c="8232" t="m"/><char c="8233" t="m"/><char c="8234" t="m"/><char c="8235" t="m"/><char c="8236" t="m"/><char c="8237" t="m"/><char c="8238" t="m"/><char c="8298" t="m"/><char c="8299" t="m"/><char c="8300" t="m"/><char c="8301" t="m"/><char c="8302" t="m"/><char c="8303" t="m"/><char c="8592" t="m"/><char c="8594" t="m"/><char c="8617" t="m"/><char c="8618" t="m"/><char c="8636" t="m"/><char c="8640" t="m"/><char c="8656" t="m"/><char c="8658" t="m"/><char c="8660" t="m"/><char c="8704" t="m"/><char c="8706" t="m"/><char c="8707" t="m"/><char c="8708" t="m"/><char c="8709" t="m"/><char c="8710" t="m"/><char c="8711" t="m"/><char c="8712" t="m"/><char c="8713" t="m"/><char c="8715" t="m"/><char c="8716" t="m"/><char c="8719" t="m"/><char c="8721" t="m"/><char c="8722" t="m"/><char c="8723" t="m"/><char c="8726" t="m"/><char c="8727" t="m"/><char c="8728" t="m"/><char c="8733" t="m"/><char c="8734" t="m"/><char c="8736" t="m"/><char c="8737" t="m"/><char c="8738" t="m"/><char c="8741" t="m"/><char c="8742" t="m"/><char c="8743" t="m"/><char c="8744" t="m"/><char c="8745" t="m"/><char c="8746" t="m"/><char c="8747" t="m"/><char c="8748" t="m"/><char c="8749" t="m"/><char c="8750" t="m"/><char c="8751" t="m"/><char c="8752" t="m"/><char c="8764" t="m"/><char c="8769" t="m"/><char c="8771" t="m"/><char c="8776" t="m"/><char c="8800" t="m"/><char c="8801" t="m"/><char c="8802" t="m"/><char c="8804" t="m"/><char c="8805" t="m"/><char c="8810" t="m"/><char c="8811" t="m"/><char c="8834" t="m"/><char c="8835" t="m"/><char c="8838" t="m"/><char c="8839" t="m"/><char c="8847" t="m"/><char c="8848" t="m"/><char c="8849" t="m"/><char c="8850" t="m"/><char c="8851" t="m"/><char c="8852" t="m"/><char c="8853" t="m"/><char c="8855" t="m"/><char c="8869" t="m"/><char c="9135" t="m"/><char c="9633" t="m"/><char c="9651" t="m"/><char c="9675" t="m"/><char c="10877" t="m"/><char c="10878" t="m"/><char c="10887" t="m"/><char c="10888" t="m"/><char c="12288" t="m"/><char c="12289" t="m"/><char c="61442" t="m"/><char c="8204" t="h"/><char c="8205" t="h"/><char c="8206" t="h"/><char c="8207" t="h"/><char c="8232" t="h"/><char c="8233" t="h"/><char c="8234" t="h"/><char c="8235" t="h"/><char c="8236" t="h"/><char c="8237" t="h"/><char c="8238" t="h"/><char c="8298" t="h"/><char c="8299" t="h"/><char c="8300" t="h"/><char c="8301" t="h"/><char c="8302" t="h"/><char c="8303" t="h"/><char c="9135" t="h"/><char c="61442" t="h"/><char c="61952" t="h"/><char c="61953" t="h"/><char c="62208" t="h"/><char c="62209" t="h"/><char c="62210" t="h"/><char c="62211" t="h"/><char c="62212" t="h"/><char c="62213" t="h"/></characters>';
//com.wiris.vD.vm6 = '<translation><t k="&#8805;" v="Greater-than or equal to"/><t k="&#8804;" v="Less-than or equal to"/><t k="productSubsuperscript" v="Product with subscript and superscript"/><t k="&#8802;" v="Not identical to"/><t k="&#8801;" v="Identical to"/><t k="&#8800;" v="Not equal to"/><t k="subscript" v="Subscript"/><t k="squareBracket" v="Square brackets"/><t k="bigCup" v="Big cup. Big union"/><t k="&#8776;" v="Almost equal to"/><t k="&#8773;" v="Approximately equal to"/><t k="arrows" v="Arrows tab"/><t k="&#8771;" v="Asymptotically equal to"/><t k="&#8769;" v="Not tilde"/><t k="sumSubscript" v="Summation with subscript"/><t k="setColor" v="Color"/><t k="&#8764;" v="Tilde operator"/><t k="differentialD" v="Differential"/><t k="verticalLineTable" v="3 rows, 3 columns matrix with vertical bars"/><t k="calculus" v="Calculus tab"/><t k="squareRoot" v="Square root"/><t k="&#8752;" v="Volume integral"/><t k="&#8751;" v="Surface integral"/><t k="&#8750;" v="Contour integral"/><t k="&#8749;" v="Triple integral"/><t k="bigOpUnderover" v="Big operator with under and over scripts"/><t k="&#8748;" v="Double integral"/><t k="&#8747;" v="Integral"/><t k="&#8746;" v="Union"/><t k="fracPartial" v="Partial derivative"/><t k="&#8745;" v="Intersection"/><t k="&#8744;" v="Logical or"/><t k="&#8743;" v="Logical and"/><t k="&#8742;" v="Not parallel to"/><t k="&#8741;" v="Parallel to"/><t k="laplacian" v="Laplacian"/><t k="&#8738;" v="Spherical angle"/><t k="&#8737;" v="Measured angle"/><t k="matrices" v="Matrices tab"/><t k="&#8736;" v="Angle"/><t k="&#8734;" v="Infinity"/><t k="&#8733;" v="Proportional to"/><t k="productUnder" v="Product with under scripts"/><t k="&#8728;" v="Ring operator"/><t k="&#8726;" v="Set minus"/><t k="&#8723;" v="Minus-or-plus sign"/><t k="bevelledFraction" v="Bevelled fraction"/><t k="integralSubsuperscript" v="Definite integral"/><t k="paste" v="Paste"/><t k="&#8716;" v="Does not contain as member"/><t k="&#8715;" v="Contains as member"/><t k="&#8713;" v="Not an element of"/><t k="setFontSize" v="Font size"/><t k="&#8712;" v="Element of"/><t k="lCurlyColumn" v="3 rows column with left curly brackets"/><t k="&#8711;" v="Nabla"/><t k="&#8710;" v="Increment"/><t k="&#8709;" v="Empty set"/><t k="&#8708;" v="There does not exist"/><t k="&#8707;" v="There exists"/><t k="&#8706;" v="Partial differential"/><t k="squareTable" v="3 rows, 3 columns matrix with square brackets"/><t k="&#8704;" v="For all"/><t k="divergence" v="Divergence"/><t k="squareColumn" v="3 rows column with square brackets"/><t k="curlyBracket" v="Curly brackets"/><t k="bigOpSubsuperscript" v="Big operator with subscript and superscript"/><t k="gradient" v="Gradient"/><t k="parenthesisColumn" v="3 rows column with parenthesis"/><t k="underover" v="Elements under and over"/><t k="subsuperscript" v="Superscript and subscript"/><t k="&#247;" v="Division sign"/><t k="bigOps" v="Big operators tab"/><t k="curl" v="Curl"/><t k="parenthesisRow" v="3 columns row with parenthesis"/><t k="&#8660;" v="Left right double arrow"/><t k="&#8658;" v="Rightwards double arrow"/><t k="superscript" v="Superscript"/><t k="&#8656;" v="Leftwards double arrow"/><t k="table" v="3 rows, 3 columns table"/><t k="sumUnderover" v="Summation with under and over scripts"/><t k="integralSubscript" v="Integral with subscript"/><t k="parenthesisTable" v="3 rows, 3 columns matrix with parenthesis"/><t k="parenthesis" v="Parentheses"/><t k="&#215;" v="Multiplication sign"/><t k="integralSubsuperscriptD" v="Definite integral with differential"/><t k="&#8640;" v="Rightwards harpoon with barb upwards"/><t k="general" v="General tab"/><t k="sumSubsuperscript" v="Summation with subscript and superscript"/><t k="&#8636;" v="Leftwards harpoon with barb upwards"/><t k="under" v="Element under"/><t k="&#969;" v="Omega"/><t k="bigSqCap" v="Big square cap"/><t k="&#968;" v="Psi"/><t k="scriptsAndLayout" v="Scripts and layout tab"/><t k="&#967;" v="Chi"/><t k="bigOpUnder" v="Big operator with under script"/><t k="&#966;" v="Phi"/><t k="&#965;" v="Upsilon"/><t k="&#964;" v="Tau"/><t k="&#963;" v="Sigma"/><t k="&#962;" v="Final sigma"/><t k="&#961;" v="Rho"/><t k="&#960;" v="Pi"/><t k="&#959;" v="Omicron"/><t k="&#958;" v="Xi"/><t k="&#8618;" v="Rightwards arrow with hook"/><t k="sumUnder" v="Summation with under scripts"/><t k="&#957;" v="Nu"/><t k="&#8617;" v="Leftwards arrow with hook"/><t k="symbols" v="Symbols tab"/><t k="over" v="Element over"/><t k="&#956;" v="Mu"/><t k="&#955;" v="Lambda"/><t k="&#8614;" v="Rightwards arrow from bar"/><t k="&#954;" v="Kappa"/><t k="&#8230;" v="Horizontal ellipsis"/><t k="&#953;" v="Iota"/><t k="&#8612;" v="Leftwards arrow from bar"/><t k="&#952;" v="Theta"/><t k="&#951;" v="Eta"/><t k="&#950;" v="Zeta"/><t k="&#183;" v="Middle dot"/><t k="&#949;" v="Epsilon"/><t k="&#948;" v="delta"/><t k="squareRow" v="3 columns row with square brackets"/><t k="&#947;" v="Gamma"/><t k="&#946;" v="Beta"/><t k="&#945;" v="Alpha"/><t k="&#177;" v="Plus-minus sign"/><t k="&#176;" v="Degree sign"/><t k="&#8601;" v="South west arrow"/><t k="&#8600;" v="South east arrow"/><t k="autoItalic" v="Automatic italic"/><t k="&#8599;" v="North east arrow"/><t k="&#8598;" v="North west arrow"/><t k="&#172;" v="Not sign"/><t k="&#937;" v="Capital omega"/><t k="&#936;" v="Capital psi"/><t k="&#8596;" v="Left right arrow"/><t k="&#935;" v="Capital chi"/><t k="&#8595;" v="Downwards arrow"/><t k="copy" v="Copy"/><t k="&#934;" v="Capital phi"/><t k="&#8594;" v="Rightwards arrow"/><t k="&#933;" v="Capital upsilon"/><t k="&#8593;" v="Upwards arrow"/><t k="&#932;" v="Capital tau"/><t k="&#8592;" v="Leftwards arrow"/><t k="&#931;" v="Capital sigma"/><t k="&#10888;" v="Greater-than and single-line not equal to"/><t k="&#929;" v="Capital rho"/><t k="&#10887;" v="Less-than and single-line not equal to"/><t k="&#928;" v="Capital pi"/><t k="&#927;" v="Capital omicron"/><t k="&#926;" v="Capital xi"/><t k="fraction" v="Fraction"/><t k="&#925;" v="Capital nu"/><t k="&#924;" v="Capital mu"/><t k="&#923;" v="Capital lambda"/><t k="&#922;" v="Capital kappa"/><t k="&#921;" v="Capital iota"/><t k="&#920;" v="Capital theta"/><t k="&#10878;" v="Greater-than or slanted equal to"/><t k="smallFraction" v="Small fraction"/><t k="&#919;" v="Capital eta"/><t k="&#10877;" v="Less-than or slanted equal to"/><t k="&#918;" v="Capital zeta"/><t k="&#917;" v="Capital epsilon"/><t k="&#916;" v="Capital delta"/><t k="&#915;" v="Capital gamma"/><t k="aposApos" v="Double apostrophe"/><t k="&#914;" v="Capital beta"/><t k="&#913;" v="Capital alpha"/><t k="italic" v="Italic"/><t k="limitToInfinity" v="Limit to infinity"/><t k="integralSubscriptD" v="Integral with subscript and differential"/><t k="&#8945;" v="Down right diagonal ellipsis"/><t k="&#8944;" v="Up right diagonal ellipsis"/><t k="productSubscript" v="Product with subscript"/><t k="&#8943;" v="Midline horizontal ellipsis"/><t k="&#8942;" v="Vertical ellipsis"/><t k="row" v="3 column row"/><t k="rCurlyColumn" v="3 rows column with right curly brackets"/><t k="verticalBar" v="Vertical bars"/><t k="limitUnder" v="Limit with under script"/><t k="bigCap" v="Big cap. Big intersection"/><t k="bold" v="Bold"/><t k="&#9675;" v="Circle"/><t k="\" v="Reverse solidus"/><t k="greek" v="Greek tab"/><t k="&#9651;" v="Triangle"/><t k="cut" v="Cut"/><t k="bracketsAndAccents" v="Decorations tab"/><t k="bigOpSubscript" v="Big operator with subscript"/><t k="&#62;" v="Greater-than sign"/><t k="=" v="Equals sign"/><t k="&lt;" v="Less-than sign"/><t k="&#8869;" v="Perpendicular"/><t k="&#9633;" v="Square"/><t k="bigSqCup" v="Big square cup"/><t k="&#8476;" v="Black-letter capital r"/><t k="manual" v="Manual"/><t k="/" v="Forward slash"/><t k="&#8855;" v="Circled times"/><t k="-" v="Minus sign"/><t k="&#8853;" v="Circled plus"/><t k="+" v="Plus sign"/><t k="&#8852;" v="Square cup"/><t k="*" v="Asterisk"/><t k="&#8851;" v="Square cap"/><t k="&#8850;" v="Square superset of or equal to"/><t k="&#8849;" v="Square subset of or equal to"/><t k="&#8465;" v="Black-letter capital i"/><t k="redo" v="Redo"/><t k="\'" v="Apostrophe"/><t k="&#8848;" v="Square superset of"/><t k="&#8847;" v="Square subset of"/><t k="&#8839;" v="Superset of or equal to"/><t k="&#8838;" v="Subset of or equal to"/><t k="fracDiff" v="Derivative"/><t k="column" v="3 rows column"/><t k="&#8835;" v="Superset of"/><t k="&#8834;" v="Subset of"/><t k="nRoot" v="Root"/><t k="undo" v="Undo"/><t k="productUnderover" v="Product with under and over scripts"/><t k="numberPi" v="Number pi"/><t k="smallBevelledFraction" v="Bevelled small fraction"/><t k="&#8811;" v="Much greater-than"/><t k="&#8810;" v="Much less-than"/></translation>';
com.wiris.vD.vn6 = '<translation><t k="&#8805;" v="Mayor o igual"/><t k="&#8804;" v="Menor o igual"/><t k="productSubsuperscript" v="Productorio con sub&#237;ndice y super&#237;ndice"/><t k="&#8802;" v="No id&#233;ntico"/><t k="&#8801;" v="Id&#233;ntico"/><t k="&#8800;" v="No igual"/><t k="subscript" v="Sub&#237;ndice"/><t k="squareBracket" v="Corchete"/><t k="bigCup" v="Uni&#243;n grande"/><t k="&#8776;" v="Casi igual a"/><t k="&#8773;" v="Aproximadamente igual a"/><t k="arrows" v="Pesta&#241;a flechas"/><t k="&#8771;" v="Igual simpt&#243;tico"/><t k="&#8769;" v="No tilde"/><t k="sumSubscript" v="Sumatorio con sub&#237;ndice"/><t k="setColor" v="Color"/><t k="&#8764;" v="Operador tilde"/><t k="differentialD" v="Diferencial"/><t k="verticalLineTable" v="Matriz 3 por 3 con barras verticales"/><t k="calculus" v="Pesta&#241;a c&#225;lculo"/><t k="squareRoot" v="Ra&#237;z cuadrada"/><t k="&#8752;" v="Integral de volumen"/><t k="&#8751;" v="Integral de superficie"/><t k="&#8750;" v="Integral de l&#237;nea"/><t k="&#8749;" v="Integral triple"/><t k="bigOpUnderover" v="Operador grande con elemento abajo y arriba"/><t k="&#8748;" v="Integral doble"/><t k="&#8747;" v="Integral"/><t k="&#8746;" v="Uni&#243;n"/><t k="fracPartial" v="Derivada parcial"/><t k="&#8745;" v="Intersecci&#243;n"/><t k="&#8744;" v="O l&#243;gico"/><t k="&#8743;" v="Y l&#243;gico"/><t k="&#8742;" v="No paralelo"/><t k="&#8741;" v="Paralelo"/><t k="laplacian" v="Laplaciano"/><t k="&#8738;" v="&#193;ngulo esf&#233;rico"/><t k="&#8737;" v="Medida de un &#225;ngulo"/><t k="matrices" v="Pesta&#241;a matrices"/><t k="&#8736;" v="&#193;ngulo"/><t k="&#8734;" v="Infinito"/><t k="&#8733;" v="Proporcional"/><t k="productUnder" v="Productorio con elemento abajo"/><t k="&#8728;" v="Operador de anillo"/><t k="&#8726;" v="Diferencia de conjuntos"/><t k="&#8723;" v="S&#237;mbolo menos/m&#225;s"/><t k="bevelledFraction" v="Fracci&#243;n inclinada"/><t k="integralSubsuperscript" v="Integral definida"/><t k="paste" v="Pegar"/><t k="&#8716;" v="No contiene"/><t k="&#8715;" v="Contiene"/><t k="&#8713;" v="No pertenece"/><t k="setFontSize" v="Tama&#241;o de fuente"/><t k="&#8712;" v="Pertenece"/><t k="lCurlyColumn" v="Columna con 3 filas y con llave en la izquierda"/><t k="&#8711;" v="Nabla"/><t k="&#8710;" v="Incremento"/><t k="&#8709;" v="Conjunto vac&#237;o"/><t k="&#8708;" v="No existe"/><t k="&#8707;" v="Existe"/><t k="&#8706;" v="Derivada parcial"/><t k="squareTable" v="Matriz 3 por 3 con corchetes"/><t k="&#8704;" v="Para todo"/><t k="divergence" v="Divergencia"/><t k="squareColumn" v="Columna con 3 filas y con corchetes"/><t k="curlyBracket" v="Llaves"/><t k="bigOpSubsuperscript" v="Operador grande con sub&#237;ndice y super&#237;ndice"/><t k="gradient" v="Gradiente"/><t k="parenthesisColumn" v="Fila con 3 columnas y con par&#233;ntesis"/><t k="underover" v="Elemento arriba y abajo"/><t k="subsuperscript" v="Super&#237;ndice y sub&#237;ndice"/><t k="&#247;" v="S&#237;mbolo divisi&#243;n"/><t k="bigOps" v="Pesta&#241;a operadores grandes"/><t k="curl" v="Rotacional"/><t k="parenthesisRow" v="Fila con 3 columnas y con par&#233;ntesis"/><t k="&#8660;" v="Flecha doble izquierda y derecha"/><t k="&#8658;" v="Flecha doble derecha"/><t k="superscript" v="Super&#237;ndice"/><t k="&#8656;" v="Flecha doble izquierda"/><t k="table" v="Tabla con 3 filas y 3 columnas"/><t k="sumUnderover" v="Sumatorio con elementos abajo y encima"/><t k="integralSubscript" v="Integral con sub&#237;ndice"/><t k="parenthesisTable" v="Matriz 3 por 3 con par&#233;ntesis"/><t k="parenthesis" v="Par&#233;ntesis"/><t k="&#215;" v="S&#237;mbolo multiplicaci&#243;n"/><t k="integralSubsuperscriptD" v="Integral definida con diferencial"/><t k="&#8640;" v="Arp&#243;n derecho con anzuelo hacia abajo"/><t k="general" v="Pesta&#241;a general"/><t k="sumSubsuperscript" v="Sumatorio con sub&#237;ndice y super&#237;ndice"/><t k="&#8636;" v="Arp&#243;n izquierdo con anzuelo hacia arriba"/><t k="under" v="Elemento abajo"/><t k="&#969;" v="Omega"/><t k="bigSqCap" v="Intersecci&#243;n grande cuadrada"/><t k="&#968;" v="Psi"/><t k="scriptsAndLayout" v="Pesta&#241;a &#237;ndices y posici&#243;n"/><t k="&#967;" v="Ji"/><t k="bigOpUnder" v="Operador grande con elemento abajo"/><t k="&#966;" v="Fi"/><t k="&#965;" v="&#205;psilon"/><t k="&#964;" v="Tau"/><t k="&#963;" v="Sigma"/><t k="&#962;" v="Sigma al final"/><t k="&#961;" v="Rho"/><t k="&#960;" v="Pi"/><t k="&#959;" v="&#211;micron"/><t k="&#958;" v="Xi"/><t k="&#8618;" v="Flecha derecha con gancho"/><t k="sumUnder" v="Sumatorio con elemento abajo"/><t k="&#957;" v="Nu"/><t k="&#8617;" v="Flecha izquierda con gancho"/><t k="symbols" v="Pesta&#241;a s&#237;mbolos"/><t k="over" v="Elemento arriba"/><t k="&#956;" v="Mu"/><t k="&#955;" v="Lambda"/><t k="&#8614;" v="Flecha derecha desde barra"/><t k="&#954;" v="Kappa"/><t k="&#8230;" v="Puntos suspensivos"/><t k="&#953;" v="Iota"/><t k="&#8612;" v="Flecha izquierda desde barra"/><t k="&#952;" v="Theta"/><t k="&#951;" v="Eta"/><t k="&#950;" v="Zeta"/><t k="&#183;" v="Punto medio"/><t k="&#949;" v="&#201;psilon"/><t k="&#948;" v="Delta"/><t k="squareRow" v="Fila con 3 columnas y con llaves"/><t k="&#947;" v="Gamma"/><t k="&#946;" v="Beta"/><t k="&#945;" v="Alfa"/><t k="&#177;" v="S&#237;mbolo m&#225;s/menos"/><t k="&#176;" v="S&#237;mbolo grado"/><t k="&#8601;" v="Flecha suroeste"/><t k="&#8600;" v="Flecha sureste"/><t k="autoItalic" v="It&#225;lica autom&#225;tica"/><t k="&#8599;" v="Flecha noreste"/><t k="&#8598;" v="Flecha noroeste"/><t k="&#172;" v="S&#237;mbolo negaci&#243;n"/><t k="&#937;" v="May&#250;scula omega"/><t k="&#936;" v="May&#250;scula psi"/><t k="&#8596;" v="Flecha izquierda y derecha"/><t k="&#935;" v="May&#250;scula ji"/><t k="&#8595;" v="Flecha abajo"/><t k="copy" v="Copiar"/><t k="&#934;" v="May&#250;scula fi"/><t k="&#8594;" v="Flecha derecha"/><t k="&#933;" v="May&#250;scula &#237;psilon"/><t k="&#8593;" v="Flecha arriba"/><t k="&#932;" v="May&#250;scula tau"/><t k="&#8592;" v="Flecha izquierda"/><t k="&#931;" v="May&#250;scula sigma"/><t k="&#10888;" v="Mayor que y no igual"/><t k="&#929;" v="May&#250;scula rho"/><t k="&#10887;" v="Menor que y no igual"/><t k="&#928;" v="May&#250;scula pi"/><t k="&#927;" v="May&#250;scula &#243;micron"/><t k="&#926;" v="May&#250;scula xi"/><t k="fraction" v="Fracci&#243;n"/><t k="&#925;" v="May&#250;scula nu"/><t k="&#924;" v="May&#250;scula mu"/><t k="&#923;" v="May&#250;scula lambda"/><t k="&#922;" v="May&#250;scula kappa"/><t k="&#921;" v="May&#250;scula iota"/><t k="&#920;" v="May&#250;scula theta"/><t k="&#10878;" v="Mayor que o igual inclinado"/><t k="smallFraction" v="Fracci&#243;n peque&#241;a"/><t k="&#919;" v="May&#250;scula eta"/><t k="&#10877;" v="Menor que o igual inclinado"/><t k="&#918;" v="May&#250;scula zeta"/><t k="&#917;" v="May&#250;scula &#233;psilon"/><t k="&#916;" v="May&#250;scula delta"/><t k="&#915;" v="May&#250;scula gamma"/><t k="aposApos" v="Ap&#243;strofe"/><t k="&#914;" v="May&#250;scula beta"/><t k="&#913;" v="May&#250;scula alfa"/><t k="italic" v="It&#225;lica"/><t k="limitToInfinity" v="L&#237;mite al infinito"/><t k="integralSubscriptD" v="Integral con sub&#237;ndice y diferencial"/><t k="&#8945;" v="Puntos suspensivos inclinados hacia abajo"/><t k="&#8944;" v="Puntos suspensivos inclinados hacia arriba"/><t k="productSubscript" v="Productorio con sub&#237;ndice"/><t k="&#8943;" v="Puntos suspensivos centrados"/><t k="&#8942;" v="Puntos suspensivos verticales"/><t k="row" v="Fila con 3 columnas"/><t k="rCurlyColumn" v="Columna con 3 filas y con llave en la derecha"/><t k="verticalBar" v="Barra vertical"/><t k="limitUnder" v="L&#237;mite con elemento abajo"/><t k="bigCap" v="Intersecci&#243;n grande"/><t k="bold" v="Negrita"/><t k="&#9675;" v="C&#237;rculo"/><t k="\" v="Barra inversa"/><t k="greek" v="Pesta&#241;a griego"/><t k="&#9651;" v="Tri&#225;ngulo"/><t k="cut" v="Cortar"/><t k="bracketsAndAccents" v="Pesta&#241;a decoraci&#243;n"/><t k="bigOpSubscript" v="Operador grande con sub&#237;ndice"/><t k="&#62;" v="Signo mayor que"/><t k="=" v="Signo igual"/><t k="&lt;" v="Signo menor que"/><t k="&#8869;" v="Perpendicular"/><t k="&#9633;" v="Cuadrado"/><t k="bigSqCup" v="Uni&#243;n grande cuadrada"/><t k="&#8476;" v="May&#250;scula r g&#243;tica (parte real)"/><t k="manual" v="Manual"/><t k="/" v="Barra inclinada"/><t k="&#8855;" v="S&#237;mbolo multiplicaci&#243;n dentro de un c&#237;rculo"/><t k="-" v="Signo menos"/><t k="&#8853;" v="S&#237;mbolo suma dentro de un c&#237;rculo"/><t k="+" v="Signo suma"/><t k="&#8852;" v="Uni&#243;n cuadrada"/><t k="*" v="Asterisco"/><t k="&#8851;" v="Intersecci&#243;n cuadrada"/><t k="&#8850;" v="Superconjunto cuadrado o igual"/><t k="&#8849;" v="Subconjunto cuadrado o igual"/><t k="&#8465;" v="May&#250;scula i g&#243;tica (parte imaginaria)"/><t k="redo" v="Rehacer"/><t k="\'" v="Ap&#243;strofe"/><t k="&#8848;" v="Superconjunto cuadrado"/><t k="&#8847;" v="Subconjunto cuadrado"/><t k="&#8839;" v="Superconjunto o igual"/><t k="&#8838;" v="Subconjunto o igual"/><t k="fracDiff" v="Derivada"/><t k="column" v="Columna con 3 filas"/><t k="&#8835;" v="Superconjunto"/><t k="&#8834;" v="Subconjunto"/><t k="nRoot" v="Ra&#237;z"/><t k="undo" v="Deshacer"/><t k="productUnderover" v="Productorio con elementos abajo y encima"/><t k="numberPi" v="N&#250;mero pi"/><t k="smallBevelledFraction" v="Fracci&#243;n inclinada peque&#241;a"/><t k="&#8811;" v="Mucho mayor"/><t k="&#8810;" v="Mucho menor"/></translation>';
com.wiris.vD.vm6='<translation><t k="&#8805;" v="&#22823;&#20110;&#25110;&#31561;&#20110;"/><t k="&#8804;" v="&#23567;&#20110;&#25110;&#31561;&#20110;"/><t k="productSubsuperscript" v="&#24102;&#19979;&#26631;&#21644;&#19978;&#26631;&#30340;&#27714;&#31215;&#31526;&#21495;"/><t k="&#8802;" v="&#19981;&#20840;&#31561;&#20110;"/><t k="&#8801;" v="&#20840;&#31561;&#20110;"/><t k="&#8800;" v="&#19981;&#31561;&#20110;"/><t k="subscript" v="&#19979;&#26631;"/><t k="squareBracket" v="&#26041;&#25324;&#21495;"/><t k="bigCup" v="&#22823;&#24182;&#38598;"/><t k="&#8776;" v="&#20960;&#20046;&#31561;&#20110;"/><t k="&#8773;" v="&#32422;&#31561;&#20110;"/><t k="arrows" v="&#31661;&#22836;&#36873;&#39033;&#21345;"/><t k="&#8771;" v="&#28176;&#36817;&#31561;&#20110;"/><t k="&#8769;" v="&#38750;&#27874;&#28010;&#21495;"/><t k="sumSubscript" v="&#24102;&#19979;&#26631;&#30340;&#27714;&#21644;&#31526;&#21495;"/><t k="setColor" v="&#39068;&#33394;"/><t k="&#8764;" v="&#27874;&#28010;&#21495;&#36816;&#31639;&#31526;"/><t k="differentialD" v="&#24494;&#20998;"/><t k="verticalLineTable" v="&#24102;&#31446;&#32447;&#30340; 3 &#34892; 3 &#21015;&#30697;&#38453;"/><t k="calculus" v="&#35745;&#31639;&#36873;&#39033;&#21345;"/><t k="squareRoot" v="&#24179;&#26041;&#26681;&#31526;&#21495;"/><t k="&#8752;" v="&#20307;&#31215;&#31215;&#20998;"/><t k="&#8751;" v="&#38754;&#31215;&#31215;&#20998;"/><t k="&#8750;" v="&#22260;&#36947;&#31215;&#20998;"/><t k="&#8749;" v="&#19977;&#37325;&#31215;&#20998;"/><t k="bigOpUnderover" v="&#19978;&#19979;&#37117;&#26377;&#26631;&#31614;&#30340;&#22823;&#36816;&#31639;&#31526;"/><t k="&#8748;" v="&#20108;&#37325;&#31215;&#20998;"/><t k="&#8747;" v="&#31215;&#20998;"/><t k="&#8746;" v="&#24182;&#38598;"/><t k="fracPartial" v="&#20559;&#23548;&#25968;"/><t k="&#8745;" v="&#20132;&#38598;"/><t k="&#8744;" v="&#36923;&#36753;&#25110;"/><t k="&#8743;" v="&#36923;&#36753;&#19982;"/><t k="&#8742;" v="&#19981;&#24179;&#34892;&#20110;"/><t k="&#8741;" v="&#24179;&#34892;&#20110;"/><t k="laplacian" v="&#25289;&#26222;&#25289;&#26031;&#31639;&#23376;"/><t k="&#8738;" v="&#29699;&#38754;&#35282;"/><t k="&#8737;" v="&#23454;&#27979;&#35282;"/><t k="matrices" v="&#30697;&#38453;&#36873;&#39033;&#21345;"/><t k="&#8736;" v="&#35282;"/><t k="&#8734;" v="&#26080;&#31351;&#22823;"/><t k="&#8733;" v="&#25104;&#27604;&#20363;"/><t k="productUnder" v="&#19979;&#26041;&#26377;&#26631;&#31614;&#30340;&#27714;&#31215;&#31526;&#21495;"/><t k="&#8728;" v="&#29615;&#36816;&#31639;&#31526;"/><t k="&#8726;" v="&#38598;&#21512;&#20943;&#21495;"/><t k="&#8723;" v="&#27491;&#36127;&#21495;"/><t k="bevelledFraction" v="&#26012;&#35282;&#20998;&#25968;"/><t k="integralSubsuperscript" v="&#23450;&#31215;&#20998;"/><t k="paste" v="&#31896;&#36148;"/><t k="&#8716;" v="&#38750;&#23376;&#38598;"/><t k="&#8715;" v="&#23376;&#38598;"/><t k="&#8713;" v="&#19981;&#23646;&#20110;"/><t k="setFontSize" v="&#23383;&#20307;&#22823;&#23567;"/><t k="&#8712;" v="&#23646;&#20110;"/><t k="lCurlyColumn" v="&#24102;&#24038;&#33457;&#25324;&#21495;&#30340; 3 &#34892;&#21015;"/><t k="&#8711;" v="&#20498;&#19977;&#35282;&#31639;&#23376;"/><t k="&#8710;" v="&#22686;&#37327;"/><t k="&#8709;" v="&#31354;&#38598;"/><t k="&#8708;" v="&#19981;&#23384;&#22312;"/><t k="&#8707;" v="&#23384;&#22312;"/><t k="&#8706;" v="&#20559;&#24494;&#20998;"/><t k="squareTable" v="&#24102;&#26041;&#25324;&#21495;&#30340; 3 &#34892; 3 &#21015;&#30697;&#38453;"/><t k="&#8704;" v="&#36866;&#21512;&#20110;&#20840;&#37096;"/><t k="divergence" v="&#25955;&#24230;"/><t k="squareColumn" v="&#24102;&#26041;&#25324;&#21495;&#30340; 3 &#34892;&#21015;"/><t k="curlyBracket" v="&#33457;&#25324;&#21495;"/><t k="bigOpSubsuperscript" v="&#24102;&#19979;&#26631;&#21644;&#19978;&#26631;&#30340;&#22823;&#36816;&#31639;&#31526;"/><t k="gradient" v="&#26799;&#24230;"/><t k="parenthesisColumn" v="&#24102;&#25324;&#21495;&#30340; 3 &#34892;&#21015;"/><t k="underover" v="&#20803;&#32032;&#19978;&#19979;&#26041;"/><t k="subsuperscript" v="&#19978;&#26631;&#21644;&#19979;&#26631;"/><t k="&#247;" v="&#38500;&#21495;"/><t k="bigOps" v="&#22823;&#36816;&#31639;&#31526;&#36873;&#39033;&#21345;"/><t k="curl" v="&#26059;&#24230;"/><t k="parenthesisRow" v="&#24102;&#25324;&#21495;&#30340; 3 &#21015;&#34892;"/><t k="&#8660;" v="&#24038;&#21491;&#21452;&#31661;&#22836;"/><t k="&#8658;" v="&#21521;&#21491;&#21452;&#31661;&#22836;"/><t k="superscript" v="&#19978;&#26631;"/><t k="&#8656;" v="&#21521;&#24038;&#21452;&#31661;&#22836;"/><t k="table" v="3 &#34892; 3 &#21015;&#34920;&#26684;"/><t k="sumUnderover" v="&#19978;&#19979;&#37117;&#26377;&#26631;&#31614;&#30340;&#27714;&#21644;&#31526;&#21495;"/><t k="integralSubscript" v="&#24102;&#19979;&#26631;&#30340;&#31215;&#20998;"/><t k="parenthesisTable" v="&#24102;&#25324;&#21495;&#30340; 3 &#34892; 3 &#21015;&#30697;&#38453;"/><t k="parenthesis" v="&#25324;&#21495;"/><t k="&#215;" v="&#20056;&#21495;"/><t k="integralSubsuperscriptD" v="&#24102;&#24494;&#20998;&#30340;&#23450;&#31215;&#20998;"/><t k="&#8640;" v="&#20498;&#38057;&#26397;&#19978;&#30340;&#21521;&#21491;&#40060;&#21449;&#31526;&#21495;"/><t k="general" v="&#24120;&#35268;&#36873;&#39033;&#21345;"/><t k="sumSubsuperscript" v="&#24102;&#19979;&#26631;&#21644;&#19978;&#26631;&#30340;&#27714;&#21644;&#31526;&#21495;"/><t k="&#8636;" v="&#20498;&#38057;&#26397;&#19978;&#30340;&#21521;&#24038;&#40060;&#21449;&#31526;&#21495;"/><t k="under" v="&#20803;&#32032;&#19979;&#26041;"/><t k="&#969;" v="Omega&#65288;&#23567;&#20889;&#65289;"/><t k="bigSqCap" v="&#22823;&#27714;&#20132;&#36816;&#31639;&#31526;"/><t k="&#968;" v="Psi&#65288;&#23567;&#20889;&#65289;"/><t k="scriptsAndLayout" v="&#26631;&#31614;&#21644;&#24067;&#23616;&#36873;&#39033;&#21345;"/><t k="&#967;" v="Chi&#65288;&#23567;&#20889;&#65289;"/><t k="bigOpUnder" v="&#19979;&#26041;&#26377;&#26631;&#31614;&#30340;&#22823;&#36816;&#31639;&#31526;"/><t k="&#966;" v="Phi&#65288;&#23567;&#20889;&#65289;"/><t k="&#965;" v="Upsilon&#65288;&#23567;&#20889;&#65289;"/><t k="&#964;" v="Tau&#65288;&#23567;&#20889;&#65289;"/><t k="&#963;" v="Sigma&#65288;&#23567;&#20889;&#65289;"/><t k="&#962;" v="Final Sigma&#65288;&#23567;&#20889;&#65289;"/><t k="&#961;" v="Rho&#65288;&#23567;&#20889;&#65289;"/><t k="&#960;" v="Pi&#65288;&#23567;&#20889;&#65289;"/><t k="&#959;" v="Omicron&#65288;&#23567;&#20889;&#65289;"/><t k="&#958;" v="Xi&#65288;&#23567;&#20889;&#65289;"/><t k="&#8618;" v="&#24102;&#38057;&#21521;&#21491;&#31661;&#22836;"/><t k="sumUnder" v="&#19979;&#26041;&#26377;&#26631;&#31614;&#30340;&#27714;&#21644;&#31526;&#21495;"/><t k="&#957;" v="Nu&#65288;&#23567;&#20889;&#65289;"/><t k="&#8617;" v="&#24102;&#38057;&#21521;&#24038;&#31661;&#22836;"/><t k="symbols" v="&#31526;&#21495;&#36873;&#39033;&#21345;"/><t k="over" v="&#20803;&#32032;&#19978;&#26041;"/><t k="&#956;" v="Mu&#65288;&#23567;&#20889;&#65289;"/><t k="&#955;" v="Lambda&#65288;&#23567;&#20889;&#65289;"/><t k="&#8614;" v="&#26465;&#24418;&#21521;&#21491;&#31661;&#22836;"/><t k="&#954;" v="Kappa&#65288;&#23567;&#20889;&#65289;"/><t k="&#8230;" v="&#27700;&#24179;&#30465;&#30053;&#21495;"/><t k="&#953;" v="Iota&#65288;&#23567;&#20889;&#65289;"/><t k="&#8612;" v="&#26465;&#24418;&#21521;&#24038;&#31661;&#22836;"/><t k="&#952;" v="Theta&#65288;&#23567;&#20889;&#65289;"/><t k="&#951;" v="Eta&#65288;&#23567;&#20889;&#65289;"/><t k="&#950;" v="Zeta&#65288;&#23567;&#20889;&#65289;"/><t k="&#183;" v="&#20013;&#38388;&#28857;"/><t k="&#949;" v="Epsilon&#65288;&#23567;&#20889;&#65289;"/><t k="&#948;" v="Delta&#65288;&#23567;&#20889;&#65289;"/><t k="squareRow" v="&#24102;&#26041;&#25324;&#21495;&#30340; 3 &#21015;&#34892;"/><t k="&#947;" v="Gamma&#65288;&#23567;&#20889;&#65289;"/><t k="&#946;" v="Beta&#65288;&#23567;&#20889;&#65289;"/><t k="&#945;" v="Alpha&#65288;&#23567;&#20889;&#65289;"/><t k="&#177;" v="&#21152;&#20943;&#21495;"/><t k="&#176;" v="&#24230;&#31526;&#21495;"/><t k="&#8601;" v="&#35199;&#21335;&#31661;&#22836;"/><t k="&#8600;" v="&#19996;&#21335;&#31661;&#22836;"/><t k="autoItalic" v="&#33258;&#21160;&#26012;&#20307;"/><t k="&#8599;" v="&#19996;&#21271;&#31661;&#22836;"/><t k="&#8598;" v="&#35199;&#21271;&#31661;&#22836;"/><t k="&#172;" v="&#8220;&#38750;&#8221;&#31526;&#21495;"/><t k="&#937;" v="Omega&#65288;&#22823;&#20889;&#65289;"/><t k="&#936;" v="Psi&#65288;&#22823;&#20889;&#65289;"/><t k="&#8596;" v="&#24038;&#21491;&#31661;&#22836;"/><t k="&#935;" v="Chi&#65288;&#22823;&#20889;&#65289;"/><t k="&#8595;" v="&#21521;&#19979;&#31661;&#22836;"/><t k="copy" v="&#22797;&#21046;"/><t k="&#934;" v="Phi&#65288;&#22823;&#20889;&#65289;"/><t k="&#8594;" v="&#21521;&#21491;&#31661;&#22836;"/><t k="&#933;" v="Upsilon&#65288;&#22823;&#20889;&#65289;"/><t k="&#8593;" v="&#21521;&#19978;&#31661;&#22836;"/><t k="&#932;" v="Tau&#65288;&#22823;&#20889;&#65289;"/><t k="&#8592;" v="&#21521;&#24038;&#31661;&#22836;"/><t k="&#931;" v="Sigma&#65288;&#22823;&#20889;&#65289;"/><t k="&#10888;" v="&#22823;&#20110;&#19988;&#19981;&#31561;&#20110;&#65288;&#21333;&#32447;&#65289;"/><t k="&#929;" v="Rho&#65288;&#22823;&#20889;&#65289;"/><t k="&#10887;" v="&#23567;&#20110;&#19988;&#19981;&#31561;&#20110;&#65288;&#21333;&#32447;&#65289;"/><t k="&#928;" v="Pi&#65288;&#22823;&#20889;&#65289;"/><t k="&#927;" v="Omicron&#65288;&#22823;&#20889;&#65289;"/><t k="&#926;" v="Xi&#65288;&#22823;&#20889;&#65289;"/><t k="fraction" v="&#20998;&#25968;"/><t k="&#925;" v="Nu&#65288;&#22823;&#20889;&#65289;"/><t k="&#924;" v="Mu&#65288;&#22823;&#20889;&#65289;"/><t k="&#923;" v="Lambda&#65288;&#22823;&#20889;&#65289;"/><t k="&#922;" v="Kappa&#65288;&#22823;&#20889;&#65289;"/><t k="&#921;" v="Iota&#65288;&#22823;&#20889;&#65289;"/><t k="&#920;" v="Theta&#65288;&#22823;&#20889;&#65289;"/><t k="&#10878;" v="&#22823;&#20110;&#25110;&#31561;&#20110;&#65288;&#20542;&#26012;&#65289;"/><t k="smallFraction" v="&#23567;&#20998;&#25968;"/><t k="&#919;" v="Eta&#65288;&#22823;&#20889;&#65289;"/><t k="&#10877;" v="&#23567;&#20110;&#25110;&#31561;&#20110;&#65288;&#20542;&#26012;&#65289;"/><t k="&#918;" v="Zeta&#65288;&#22823;&#20889;&#65289;"/><t k="&#917;" v="Epsilon&#65288;&#22823;&#20889;&#65289;"/><t k="&#916;" v="Delta&#65288;&#22823;&#20889;&#65289;"/><t k="&#915;" v="Gamma&#65288;&#22823;&#20889;&#65289;"/><t k="aposApos" v="&#21452;&#25735;&#21495;"/><t k="&#914;" v="Beta&#65288;&#22823;&#20889;&#65289;"/><t k="&#913;" v="Alpha&#65288;&#22823;&#20889;&#65289;"/><t k="italic" v="&#26012;&#20307;"/><t k="limitToInfinity" v="&#26080;&#31351;&#22823;"/><t k="integralSubscriptD" v="&#24102;&#19979;&#26631;&#21644;&#24494;&#20998;&#30340;&#31215;&#20998;"/><t k="&#8945;" v="&#19979;&#26012;&#30465;&#30053;&#21495;"/><t k="&#8944;" v="&#19978;&#26012;&#30465;&#30053;&#21495;"/><t k="productSubscript" v="&#24102;&#19979;&#26631;&#30340;&#27714;&#31215;&#31526;&#21495;"/><t k="&#8943;" v="&#20013;&#32447;&#30465;&#30053;&#21495;"/><t k="&#8942;" v="&#22402;&#30452;&#30465;&#30053;&#21495;"/><t k="row" v="3 &#21015;&#34892;"/><t k="rCurlyColumn" v="&#24102;&#21491;&#33457;&#25324;&#21495;&#30340; 3 &#34892;&#21015;"/><t k="verticalBar" v="&#31446;&#32447;"/><t k="limitUnder" v="&#19979;&#26041;&#26377;&#26631;&#31614;&#30340;&#26497;&#38480;"/><t k="bigCap" v="&#22823;&#20132;&#38598;"/><t k="bold" v="&#31895;&#20307;"/><t k="&#9675;" v="&#22278;"/><t k="\" v="&#21453;&#26012;&#26464;"/><t k="greek" v="&#24076;&#33098;&#23383;&#27597;&#36873;&#39033;&#21345;"/><t k="&#9651;" v="&#19977;&#35282;&#24418;"/><t k="cut" v="&#21098;&#20999;"/><t k="bracketsAndAccents" v="&#20462;&#39280;&#31526;&#36873;&#39033;&#21345;"/><t k="bigOpSubscript" v="&#24102;&#19979;&#26631;&#30340;&#22823;&#36816;&#31639;&#31526;"/><t k="&#62;" v="&#22823;&#20110;&#21495;"/><t k="=" v="&#31561;&#21495;"/><t k="&lt;" v="&#23567;&#20110;&#21495;"/><t k="&#8869;" v="&#22402;&#30452;"/><t k="&#9633;" v="&#26041;&#24418;"/><t k="bigSqCup" v="&#22823;&#27714;&#24182;&#36816;&#31639;&#31526;"/><t k="&#8476;" v="&#40657;&#20307;&#22823;&#20889; R"/><t k="manual" v="&#25163;&#20876;"/><t k="/" v="&#26012;&#26464;"/><t k="&#8855;" v="&#24490;&#29615;&#20056;&#21495;"/><t k="-" v="&#20943;&#21495;"/><t k="&#8853;" v="&#24490;&#29615;&#21152;&#21495;"/><t k="+" v="&#21152;&#21495;"/><t k="&#8852;" v="&#27714;&#24182;&#36816;&#31639;&#31526;"/><t k="*" v="&#26143;&#21495;"/><t k="&#8851;" v="&#27714;&#20132;&#36816;&#31639;&#31526;"/><t k="&#8850;" v="&#26041;&#24418;&#36229;&#32423;&#25110;&#31561;&#20110;"/><t k="&#8849;" v="&#26041;&#24418;&#23376;&#38598;&#25110;&#31561;&#20110;"/><t k="&#8465;" v="&#40657;&#20307;&#22823;&#20889; I"/><t k="redo" v="&#37325;&#20570;"/><t k="\'" v="&#25735;&#21495;"/><t k="&#8848;" v="&#26041;&#24418;&#36229;&#38598;"/><t k="&#8847;" v="&#26041;&#24418;&#23376;&#38598;"/><t k="&#8839;" v="&#36229;&#38598;&#25110;&#31561;&#20110;"/><t k="&#8838;" v="&#23376;&#38598;&#25110;&#31561;&#20110;"/><t k="fracDiff" v="&#23548;&#25968;"/><t k="column" v="3 &#34892;&#21015;"/><t k="&#8835;" v="&#36229;&#38598;"/><t k="&#8834;" v="&#23376;&#38598;"/><t k="nRoot" v="&#27714;&#26681;&#31526;&#21495;"/><t k="undo" v="&#25764;&#38144;"/><t k="productUnderover" v="&#19978;&#19979;&#37117;&#26377;&#26631;&#31614;&#30340;&#27714;&#31215;&#31526;&#21495;"/><t k="numberPi" v="&#22278;&#21608;&#29575;"/><t k="smallBevelledFraction" v="&#26012;&#35282;&#23567;&#20998;&#25968;"/><t k="&#8811;" v="&#36828;&#22823;&#20110;"/><t k="&#8810;" v="&#36828;&#23567;&#20110;"/></translation>';