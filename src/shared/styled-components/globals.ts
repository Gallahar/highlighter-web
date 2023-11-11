import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
:root {
	--bg-primary: #fff;
	--bg-secondary: #fff;
	--text-primary: #fff;
	--text-secondary: #fff;
	--border-radius: 1rem;
	--shadow: 0px 8px 24px -16px rgba(0, 0, 0, 0.15);
}

*,
*::after,
*::before {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	border: none;
	font-size: 62.5%;
	font-weight: 400;
	line-height: 150%;
	scroll-behavior: smooth;
}

body {
	background-color: var(--bg-primary);
	overflow-x: hidden;
}

a,
a:visited {
	text-decoration: none;
	display: inline-block;
}

a:focus,
a:active,
a:hover {
	outline: none;
}

aside,
nav,
footer,
header,
main,
section {
	display: block;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
	font-size: inherit;
	font-weight: inherit;
	line-height: inherit;
}

img,
svg {
	vertical-align: top;
	max-width: 100%;
	height: auto;
}
ul,ol{
    list-style: none;
}

input,
textarea,
button,
select _ {
	font-family: inherit;
	font-size: inherit;
	color: inherit;
}

input::-ms-clear {
	display: none;
}

button,
input[type='submit'] {
	display: inline-block;
	box-shadow: none;
	background-color: transparent;
	background: none;
	cursor: pointer;
}

input:active,
input:focus,
button:active,
button:focus {
	outline: none;
}

button::-moz-focus-inner {
	padding: 0;
	border: 0;
}

label {
	cursor: pointer;
}


`
