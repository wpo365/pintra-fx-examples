import React = require('react')
import ReactDOM = require('react-dom')

import { IReactDomConfig, AppLauncher } from 'pintra-fx'
import { GetTokenButton } from './components/GetTokenButton'

const reactDomConfig: IReactDomConfig = AppLauncher.getReactDomConfig()

ReactDOM.render(
  <GetTokenButton env={reactDomConfig.env} />,
  document.getElementById(reactDomConfig.rootId),
)
