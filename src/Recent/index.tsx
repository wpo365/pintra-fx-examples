import 'core-js/es/object'
import 'core-js/es/promise'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Recent } from './components/Recent'

/**
 * Add a custom HTML block to the post or page with the following code:
 * <div id="myRecentDocuments"></div>. Then immediately below that, add
 * our WPO365 | RECENT block.
 */
const elem = document.getElementById('myRecentDocuments')

ReactDOM.render(<Recent />, elem)
