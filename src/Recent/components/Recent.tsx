declare global {
  interface Window {
    pintra: any
  }
}

import * as React from 'react'

import Axios from 'axios'

import * as styles from './Recent.module.scss'

import { IRecentItem } from '../models/IRecentItem'
import classNames from 'classnames'

export const Recent: React.FunctionComponent<{}> = (_) => {
  const [items, updateItems] = React.useState<IRecentItem[]>([])
  const [lastError, updateLastError] = React.useState<string>('')

  const trailingSlashIt = (input: string): string =>
    input.slice(-1) == '/' ? input : `${input}/`

  /**
   * Get the user's recent items as soon as the component did mount.
   */
  React.useEffect(() => {
    const response = Axios.post(
      `${trailingSlashIt(window.pintra.env.apiUrl)}me`,
      {
        /**
         * The data to be posted to Microsoft Graph e.g. { "requests": [ { "entityTypes": [ "message" ], "query": { "queryString": "contoso" } } ] }.
         */
        data: null,

        /**
         * Additional headers to be included when fetching from Microsoft Graph e.g. {consistencylevel: 'eventual'}
         */
        headers: null,

        /**
         * The query string e.g. mainly when reading data e.g. [sites]/wpo365demo.sharepoint.com:/.
         */
        query:
          'insights/used?$top=10&$orderby=LastUsed/LastAccessedDateTime+desc',

        /**
         * Scope for the permissions needed e.g. https://graph.microsoft.com/Sites.Read.All.
         */
        scope: 'https://graph.microsoft.com/Sites.Read.All',

        /**
         * Whether to use application instead of delegated permissions.
         */
        application: false,

        /**
         * Whether the payload is binary (the result will be an object with exactly one property: { "binary": "[base64 encoded string]"" })
         */
        binary: false,

        /**
         * How to fetch from Microsoft Graph (default: GET).
         */
        method: 'GET',
      },
      {
        headers: {
          'Accept': 'application/json',
          'ContentType': 'application/json; odata=verbose',
          'X-WP-Nonce': window.pintra.env.nonce,
        },
      }
    )
      .then((response) => {
        if (
          response.data &&
          typeof response.data == 'object' &&
          response.data.value
        )
          updateItems(response.data.value)
      })
      .catch((err) => {
        if (err.response && err.response.data)
          updateLastError(JSON.stringify(err.response.data))
        else updateLastError(JSON.stringify(err))
      })
  }, [])

  return (
    <table className={classNames(styles.recentTable, 'recentTable')}>
      <tbody>
        <tr>
          <th>Title</th>
        </tr>
        {items.map((item) => (
          <tr>
            <td>{item.resourceVisualization.title}</td>
          </tr>
        ))}
      </tbody>
      {lastError && (
        <tbody>
          <tr>
            <td>Error: {lastError}</td>
          </tr>
        </tbody>
      )}
    </table>
  )
}
