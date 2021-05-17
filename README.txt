=== PINTRA | EXAMPLES ===
Contributors: wpo365
Tags: office 365, O365, Microsoft 365, mail, smtp, phpmailer, wp_mail, email, Microsoft Graph
Requires at least: 5.0.0
Tested up to: 5.7
Stable tag: 2.0.0
Requires PHP: 5.6.40

== Description ==

A simple Gutenberg Block for WordPress to demonstrate the seamless integration of Microsoft 365 through Microsoft Graph into WordPress as provided by the [WPO365 | LOGIN plugin](https://wordpress.org/plugins/wpo365-login/).

At the same time this app provides the boiler plate code to any developer who wishes to develop his or her own Gutenberg Blocks for WordPress.

The example has been developed using React and TypeScript and uses Axios to fetch data from the Pintra RESTful API.

See [https://docs.wpo365.com](https://docs.wpo365.com) for more indepth and details.

= Plugin Features =

- Integrates with Pintra RESTful API to transparently retrieve data from Microsoft Graph.
- Boiler plate code for a plugin that installs a Gutenberg Block.
- Uses sass-modules for styling.

= Prerequisites =

- The [WPO365 | LOGIN plugin](https://wordpress.org/plugins/wpo365-login/) must be installed and activated.

= Support =

We will go to great length trying to support you if the plugin doesn't work as expected. Go to our [Support Page](https://www.wpo365.com/how-to-get-support/) to get in touch with us. We haven't been able to test our plugin in all endless possible Wordpress configurations and versions so we are keen to hear from you and happy to learn!

= Feedback =

We are keen to hear from you so share your feedback with us on [Twitter](https://twitter.com/WPO365) and help us get better!

== Installation ==

1. Download or clone the project from (https://github.com/wpo365/pintra-fx-examples)[https://github.com/wpo365/pintra-fx-examples].
2. Change into the root directory of the cloned project and run **npm install** to install the required dependencies.
3. Run **npm run build** to build the project.
4. In your WordPress development environment manually create a new folder **pintra-fx-examples** in the **wp-content\plugins** folder.
5. From the project's folder copy the **dist** folder and the plugin's main PHP file **pintra-fx-examples.php** and paste them into the folder created during the previous step.
6. Navigate to WP Admin > Plugins and activate the plugin **PINTRA | EXAMPLES**.
7. Finally, create a new post or page and click to add a new block and search for **PINTRA | EXAMPLES**.
8. Publish the page and click to view it.

== Frequently Asked Questions ==

== Screenshots ==

== Upgrade Notice ==

== Changelog ==

= 2.0.0 =
