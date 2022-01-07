
export function asyncLoad(path, callback?) {

  if (typeof callback === "undefined") {
    callback = function () { };
  }

  var nuiScript = document.createElement("script")
  nuiScript.src = path
  document.head.appendChild(nuiScript)
  nuiScript.onload = function() {
    callback()
  }
}

// UPGRADE FOR VULETUBE APP ALSO
export function switchTheme (this: any) {
  var themes = this.$store.state.appStyle.themes()

  var nextThemeIndex = themes.indexOf((this.$root as any).$material.theming.theme) + 1;

  if (nextThemeIndex == themes.lenght) {
    nextThemeIndex = 0;
  }

  (this.$root as any).$material.theming.theme = themes[nextThemeIndex]
  this.changeTheme(themes[nextThemeIndex])
}

export function copyToClipboard(this: any, e) {
  console.log('copy to clipboard => ', e.target.innerText);
  var text = e.target.innerText;
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
  (this as any).$root.$emit('global.copyclipboard', text)
}
