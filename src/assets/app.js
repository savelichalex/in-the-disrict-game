import { mobile } from './mobile-app.js';
import { desktop } from './desktop-app.js';

const isMobile = {
    Android: function() {
        return window.navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return window.navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return window.navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return window.navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if(isMobile.any()) {
	modile();
} else {
	desktop();
}