import { createSignal, createEffect, createRoot } from "solid-js";

function createCookie(name, value, seconds) {
	if (seconds) {
		var date = new Date();
		date.setTime(date.getTime() + (seconds * 1000));
		var expires = "; expires=" + date.toGMTString();
	}
	else var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/; SameSite=strict";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

export const langs = [
  { name: "ID", icon: "/icon/fi-id.svg" }, 
  { name: "EN", icon: "/icon/fi-gb.svg" }
];

export const [lang, setLang] = createRoot(() => {
  const cookieLang = readCookie("lang");
  const initialLang = cookieLang ? cookieLang : "ID";
  let [lang, setLang] = createSignal(initialLang);
  createEffect(() => {
    createCookie("lang", lang(), 604800);
  });
  return [lang, setLang];
});

export const [darkTheme, setDarkTheme] = createRoot(() => {
  const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const cookieTheme = readCookie("darkTheme");
  const initialTheme = cookieTheme ? cookieTheme === "1": systemTheme;
  const [darkTheme, setDarkTheme] = createSignal(initialTheme);
  createEffect(() => {
    const theme = darkTheme() ? "1" : "0";
    createCookie("darkTheme", theme, 604800);
  });
  return [darkTheme, setDarkTheme];
});
