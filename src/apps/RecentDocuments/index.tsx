import React = require('react')
import ReactDOM = require('react-dom')

import { RecentDocuments } from './components/RecentDocuments'

import {
  IReactDomConfig,
  AppLauncher,
} from 'pintra-fx'

const reactDomConfig: IReactDomConfig = AppLauncher.getReactDomConfig()

ReactDOM.render(
  <RecentDocuments env={reactDomConfig.env} />,
  document.getElementById(reactDomConfig.rootId)
)
