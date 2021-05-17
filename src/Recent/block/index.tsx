import * as React from 'react'

import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import { Edit } from './edit'
import save from './save'
import icons from '../components/icons'

registerBlockType('pintra/recent', {
  title: __('WPO365 | RECENT'),
  description: __("Display a user's recently used files in WordPress"),
  category: 'widgets',
  icon: icons.msft,
  supports: {
    html: false,
  },
  attributes: {},
  edit: (props: any) => <Edit {...props} />,
  save,
})
