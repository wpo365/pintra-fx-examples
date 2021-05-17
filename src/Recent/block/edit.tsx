import * as React from 'react'

import { BlockEditProps } from '@wordpress/blocks'
import { InspectorControls } from '@wordpress/block-editor'

export interface IEditProps {
  attributes: {}
  className: string
  isSelected: boolean
  setAttributes: (attributes: {}) => void
}

export interface IBlockEditProps extends BlockEditProps<{}> {}

export const Edit: React.ComponentType<IBlockEditProps> = (
  props: IEditProps
): any => {
  return (
    <div>
      Your recently used and accessed documents will appear right here when you
      save and publish the page ...
    </div>
  )
}
