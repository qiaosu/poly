/**
 * polyfill / shim plugin for AMD loaders
 *
 * (c) copyright 2011, unscriptable.com / John Hann
 * Licensed under the MIT License at:
 * 		http://www.opensource.org/licenses/mit-license.php
 *
 */

define(['exports'], function (exports) {

	exports.load = function (def, require, onload, config) {

		function success (module) {
			// check for curl.js's promise
			onload.resolve ? onload.resolve(module) : onload(module);
		}

		function fail (ex) {
			// check for curl.js's promise
			if (onload.reject) {
				onload.reject(ex)
			}
			else {
				throw ex;
			}
		}


		// load module
		require([def], function (module) {

			try {
				// augment native
				if (module.polyfill) {
					module.polyfill();
				}
			}
			catch (ex) {
				fail(ex);
			}
			success(module);

		});

	}

});
