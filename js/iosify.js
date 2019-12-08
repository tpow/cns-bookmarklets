// Make it easier for iOS users to save bookmarklets:
// convert from true javascript link to a hash URL
// Uses browser detect and assumes browser variable in global scope
function iosify(clsname) {
  if (browser.safari && browser.ios) {
    // console.log('changing links for ease of bookmarking');
    var i, links = document.getElementsByClassName(clsname)
    var bH = window.location.href.split(location.search||location.hash||/[?#]/)[0];
    for (i=0; i<links.length; i++) {
      if (links[i].href.lastIndexOf("javascript:", 0) === 0) {
        links[i].href = links[i].href.replace("javascript:", bH+"#javascript:");
        links[i].href += encodeURIComponent("//bookmarkletname:"+links[i].text);
      }
    }
  }
}

