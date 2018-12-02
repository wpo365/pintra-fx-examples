import React = require('react')

import Axios from 'axios'

import { TokenCache, TokenRequest, TokenRequestError, IToken } from 'pintra-fx'

import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList'

import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection'

import { initializeIcons } from 'office-ui-fabric-react/lib/Icons'

initializeIcons(/* optional base url */)

export interface IGraphItem {
  key: number
  title: string
  type: string
  url: string
}

export interface IRecentDocumentsProps {
  env: {
    nonce: string
    wpAjaxAdminUrl: string
    props: any
  }
}

export interface IRecentDocumentsState {
  items: IGraphItem[]
}

const columns = [
  {
    key: 'title',
    name: 'Title',
    fieldName: 'title',
    minWidth: 150,
    maxWidth: 250,
    isResizable: true,
  },
  {
    key: 'type',
    name: 'Type',
    fieldName: 'type',
    minWidth: 50,
    maxWidth: 100,
    isResizable: true,
  },
]

export class RecentDocuments extends React.Component<
  IRecentDocumentsProps,
  IRecentDocumentsState
> {
  private selection: Selection

  public constructor(props: IRecentDocumentsProps) {
    super(props)

    this.state = {
      items: [],
    }

    this.getRecentDocuments.bind(this)
    this.getRecentDocuments()
  }

  public render(): React.ReactElement<IRecentDocumentsProps> {
    const { items } = this.state
    return (
      <div>
        <MarqueeSelection selection={this.selection}>
          <DetailsList
            items={items}
            columns={columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selection={this.selection}
            selectionPreservedOnEmptyClick={true}
            selectionMode={SelectionMode.single}
            onItemInvoked={this.onItemInvoked}
            compact={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          />
        </MarqueeSelection>
      </div>
    )
  }

  private onItemInvoked = (item: any): void => {
    window.open(item.url, '_blank')
  }

  private async getRecentDocuments() {
    const tokenResponse = await TokenCache.getToken(
      new TokenRequest('graph', this.props.env.props.resourceId),
      {
        nonce: this.props.env.nonce,
        wpAjaxAdminUrl: this.props.env.wpAjaxAdminUrl,
      },
    )

    if (tokenResponse instanceof Error) {
      return new Error('Unexpected: Could not retrieve a valid access token.')
    }

    const token = tokenResponse as IToken

    const response = await Axios.get(
      'https://graph.microsoft.com/beta/me/insights/used',
      {
        headers: {
          Accept: 'application/json',
          ContentType: 'application/json; odata=verbose',
          Authorization: `Bearer ${token.bearer}`,
        },
      },
    )

    let items: IGraphItem[] = []
    if (
      response.data &&
      response.data.value &&
      Array.isArray(response.data.value)
    ) {
      const graphData = [...response.data.value]
      for (let i = 0; i < graphData.length; i++) {
        items.push({
          key: i,
          title: graphData[i].resourceVisualization.title,
          type: graphData[i].resourceVisualization.type,
          url: graphData[i].resourceReference.webUrl
            ? graphData[i].resourceReference.webUrl
            : graphData[i].resourceVisualization.containerWebUrl,
        })
      }
      this.setState({ items })
    }
  }
}
