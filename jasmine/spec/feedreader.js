/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(
	(function() {
		/**
		* @description  This is our first test suite - a test suite just contains
										a related set of tests. This suite is all about the RSS
										feeds definitions, the allFeeds variable in our application.
		* @param {string} - The name of the test suite
		* @param {function} - The function that implements the suite
		*/
		describe('RSS Feeds', function() {
			/* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
			it('are defined', function() {
				expect(allFeeds).toBeDefined();
				expect(allFeeds.length).not.toBe(0);
			});

			/* A test that loops through each feed
      * in the allFeeds object and ensures it has a URL defined
      * and that the URL is not empty.
      */
			function feedsLoopHelper(allfeeds) {
				it('has URL and is not empy', function() {
					expect(allfeeds.url).toBeDefined();
					expect(allfeeds.length).not.toBe(0);
				});
			}

			for (let index of allFeeds) {
				feedsLoopHelper(index);
			}

			/* A test that loops through each feed
      * in the allFeeds object and ensures it has a name defined
      * and that the name is not empty.
      */
			function feedsLoopNameHelper(allfeeds) {
				it('has name and is not empy', function() {
					expect(allfeeds.name).toBeDefined();
					expect(allfeeds.length).not.toBe(0);
				});
			}

			for (let index of allFeeds) {
				feedsLoopNameHelper(index);
			}
		});

		/**
		* @description  This is our second test suite - a test suite that
										handles testing for the menu of the RSS page.
		* @param {string} - The name of the test suite
		* @param {function} - The function that implements the suite
		*/

		describe('The menu', function() {
			/* A test that ensures the menu element is hidden by default. 
      */
			it('should be hidden and is hidden', function() {
				expect(document.body.classList.contains('menu-hidden')).toBe(true);
			});

			/* A test that ensures the menu changes
      * visibility when the menu icon is clicked. This test
     	* should have two expectations: does the menu display when
      * clicked and does it hide when clicked again.
      */
			it('should hide and show on click', function() {
				document.getElementsByClassName('menu-icon-link')[0].click();
				expect(document.body.classList.contains('menu-hidden')).toBe(false);

				document.getElementsByClassName('menu-icon-link')[0].click();
				expect(document.body.classList.contains('menu-hidden')).toBe(true);
			});
		});

		/**
		* @description  This is our third test suite - a test suite that
										handles testing for the initial entries of the RSS feed.
		* @param {string} - The name of the test suite
		* @param {function} - The function that implements the suite
		*/
		describe('Initial Entries', function() {
			/* A test that ensures when the loadFeed
      * function is called and completes its work, there is at least
      * a single .entry element within the .feed container.
      */

			beforeEach(function(done) {
				loadFeed(0, function() {
					done();
				});
			});

			it('should load feed and has at least one entry', function(done) {
				expect(allFeeds[0]).toBeDefined();
				expect(document.getElementsByClassName('feed')[0].children.length).not.toBe(0);
				done();
			});
		});

		/**
		* @description  This is our fourth test suite - a test suite that
										handles testing for the feed selection and the content
										inside the RSS feeds.
		* @param {string} - The name of the test suite
		* @param {function} - The function that implements the suite
		*/
		describe('New Feed Selection', function() {
			/* A test that ensures when a new feed is loaded
      * by the loadFeed function that the content actually changes.
      */

			let firstFeed, secondFeed;

			beforeEach(function(done) {
				loadFeed(1, function() {
					secondFeed = document.getElementsByClassName('feed')[0].children[0].innerText;

					loadFeed(0, function() {
						firstFeed = document.getElementsByClassName('feed')[0].children[0].innerText;
						done();
					});
				});
			});

			it('should make content on feed change', function(done) {
				expect(allFeeds).toBeDefined();
				expect(firstFeed === secondFeed).toBeFalsy();
				done();
			});
		});
	})()
);
