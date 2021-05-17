import * as React from 'react'

import { __ } from '@wordpress/i18n'

export interface ISaveProps {
  attributes: {}
  className: string
  isSelected: boolean
  setAttributes: (attribute: object) => void
}

const save = (props: ISaveProps) => <div id='myRecentDocuments' />

export default save
