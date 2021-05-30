keyboard: { // Reserved : N SPACE P H L K J Left Right Up Down Home End, B . Pause F ESC O S
	// List of codes here : https://keycode.info/
	// TODO : Use API to show shortcuts in '?' : Reveal.registerKeyboardShortcut('V', 'View slide fragments');
	34: function() { let {h, v} = Reveal.getIndices(); Reveal.slide(h, v, +Infinity); }, // 'PageDown' show all fragments
	// 33: function() { let {h, v} = Reveal.getIndices(); Reveal.slide(h, v, -1); }, // 'PageUp' show no fragment
	// 73: function() { window.open("../index.html","_self") }, // 'I' to index page
	// 76: function() { RevealSpotlight.toggleSpotlight() }, // 'L' : Spotlight key, alternative to click
	// 88: function() { RevealSpotlight.togglePresentationMode(); }, // 'X' : toggle presentation mode
	// 78: function() { RevealChalkboard.toggleNotesCanvas() }, // 'N' : toggle notes canvas
	// 67: function() { RevealChalkboard.toggleChalkboard() },	// 'C' : toggle chalkboard
	// 46: function() { RevealChalkboard.clear() }, // 'DEL' : clear chalkboard
	//  8: function() { RevealChalkboard.reset() }, // 'BASKSPACE' : reset chalkboard data on current slide
	// 68: function() { RevealChalkboard.download() },	// 'D' : download recorded chalkboard drawing
	// 90: function() { RevealChalkboard.colorNext() }, // 'Z' : cycle colors forward
	// 65: function() { RevealChalkboard.colorPrev() }, // 'A' : cycle colors backward
},
//
// NOTES POINTER PLUGIN https://github.com/dougalsutherland/reveal.js-notes-pointer
//
notes_pointer: {
	pointer: {
		size: 15,  // in pixels (scaled like the rest of reveal.js)
		color: 'rgba(239,82,91,0.8)',  // something valid for css background-color
		key: 'O' // '.' does not work
	},
	notes: {
		key: 'S'
	}
},
//
// MENU PLUGIN https://github.com/denehyg/reveal.js-menu
//
menu: {
	numbers: true, // Add slide numbers to the titles in the slide list.
	titleSelector: 'h1, h2, div.title, caption.title, #toctitle', // Specifies which slide elements will be used for generating the slide titles in the menu. 
	transitions: true, // Specifies if the transitions menu panel will be shown.
	openButton: false, // Adds a menu button to the slides to open the menu panel.
	openSlideNumber: false, // If 'true' allows the slide number in the presentation to open the menu panel
	loadIcons: true, // By default the menu will load it's own font-awesome library icons
	sticky: true, // If 'true', the sticky option will leave the menu open until it is explicitly closed
	custom: [ { title: 'Keys', icon: '<i class="fa fa-keyboard">', content: `
		<ul class="slide-menu-items">
		<li class="slide-menu-item">
			<h3>Core</h3>
			<p>? : Show core keys</p>
		</li>
		<li class="slide-menu-item">
			<h3>Notes Pointer / Spotlight</h3>
			<p>O : Toggle pointer on/off</p>
			<p>L or (X then LEFT CLICK) : Toggle spotlight on/off</p>
		</li>
		<li class="slide-menu-item">
			<h3>Menu</h3>
			<p>M : Open menu</p>
			<p>H or LEFT : Next left panel</p>
			<p>L or RIGHT : Next right panel</p>
			<p>K or UP : Up</p>
			<p>J or DOWN : Down</p>
			<p>U or PAGE UP : Page up</p>
			<p>D or PAGE DOWN : Page down</p>
			<p>HOME : Top</p>
			<p>END : Bottom</p>
			<p>SPACE or RETURN : Selection</p>
			<p>ESC : Close menu</p>
		</li>
		<li class="slide-menu-item">
			<h3>Custom</h3>
			<p>I : ../index.html</p>
		</li></ul>` }
	],
  	themes: [// Specifies the themes that will be available in the themes menu panel. Set to 'true' to show the themes menu panel with the default themes list. 
		{ name: 'huawei-basic-light', theme: 'themes/css/reveal-huawei-light.css' },
		]
}
