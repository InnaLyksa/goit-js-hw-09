!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){o[e]=t},e.parcelRequired7c6=n);var i=n("h6c0i");function r(e,t){var o=Math.random()>.3;return new Promise((function(n,i){setTimeout((function(){o?n({position:e,delay:t}):i({position:e,delay:t})}),t)}))}function a(e){var t=e.position,o=e.delay;i.Notify.success("✅ Fulfilled promise ".concat(t," in ").concat(o,"ms"),{position:"right-top",fontSize:"20px",width:"350px"})}function l(e){var t=e.position,o=e.delay;i.Notify.failure("❌ Rejected promise ".concat(t," in ").concat(o,"ms"),{position:"right-top",fontSize:"20px",width:"350px"})}document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();var t=Number(e.target.elements.delay.value),o=Number(e.target.elements.step.value),n=Number(e.target.elements.amount.value);if(t<1||o<1||n<1)return void i.Notify.failure("❌ All values must be more than zero!",{position:"right-top",fontSize:"20px",width:"350px"});for(var u=1;u<=n;u+=1)r(u,t).then(a).catch(l),t+=o}))}();
//# sourceMappingURL=03-promises.eabc82bb.js.map
