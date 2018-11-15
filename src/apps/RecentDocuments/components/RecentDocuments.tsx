import React = require('react')

import Axios from 'axios'

import { TokenCache, TokenRequest, TokenRequestError, IToken } from 'pintra-fx'

import { TextField } from 'office-ui-fabric-react/lib/TextField'

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

    this.usingGraphToken(this.getRecentDocuments, (rejectedResponse: any) =>
      console.error(rejectedResponse),
    )
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

  private getRecentDocuments = (
    fullfilledResponse: IToken | TokenRequestError,
  ) => {
    // now get documents from graph
    if ('bearer' in fullfilledResponse) {
      Axios.get('https://graph.microsoft.com/beta/me/insights/used', {
        headers: {
          Accept: 'application/json',
          ContentType: 'application/json; odata=verbose',
          Authorization: `Bearer ${fullfilledResponse.bearer}`,
        },
      }).then(
        (graphFullFilledResponse: any) => {
          console.log(graphFullFilledResponse)
          let items: IGraphItem[] = []
          if (
            graphFullFilledResponse.data &&
            graphFullFilledResponse.data.value &&
            Array.isArray(graphFullFilledResponse.data.value)
          ) {
            const graphData = [...graphFullFilledResponse.data.value]
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
        },
        (graphRejectedResponse: any) => {
          console.error(graphRejectedResponse)
        },
      )
    }
  }

  private usingGraphToken(
    success: (fullfilledResponse: IToken | TokenRequestError) => void,
    rejected: (error: any) => void,
  ): void {
    TokenCache.getToken(
      new TokenRequest('graph', this.props.env.props.resourceId),
      {
        nonce: this.props.env.nonce,
        wpAjaxAdminUrl: this.props.env.wpAjaxAdminUrl,
      },
    ).then(
      fullfilledResponse => success(fullfilledResponse),
      rejectedResponse => rejected(rejectedResponse),
    )
  }
}
