// Derived from StackExchange's browser detection
// By Tim Powell March 2019
// uses useragent sniffing
// Chrome is listed as both chrome and webkit
// Anything else webkit is treated as safari, except android browser
// Edge above 73 is also listed as chrome
function getBrowser(a){
	a = a || navigator.userAgent;
	//console.log("Trying "+a);
	var t=function(e){
		e=e.toLowerCase();
		var ios = /iphone|ipad|ipod/.test(e);
		var android = /android/.test(e);
		var t=/(edg)e?[ \/]([\w.]+)/.exec(e)||/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||/(firefox)[ \/]([\w.]+)/.exec(e)||/(trident)(?:.*? rv:([\w.]+)|)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];
		var os=/windows/.test(e)?"win":/mac/.test(e)?"mac":/linux/.test(e)?"linux":/x11/.test(e)?"nix":"";
		return{
			"browser":t[1]||"",
			"version":t[2]||"0",
			"os":os,
			"ios":ios||"",
			"android":android||"",
		}
	};
	var n=t(a),i={},e={};
	n.browser && (i[n.browser]=!0, i.version=n.version, i.os=n.os, i.ios=n.ios, i.android=n.android), i.chrome ? i.webkit=!0 : i.webkit && (i.safari=!0), i.edg ? i.edge=!0 && (delete i.edg) : null, "73"<i.version && i.edge ? (i.chrome=!0) : null, i.trident ? !(i.edge) && (i.msie=!0) : null, i.android ? i.safari=!1 : null, e.browser=i;
	return e;
}
