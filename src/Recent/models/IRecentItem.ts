export interface IRecentItem {
  id: string
  lastUsed: {
    lastAccessedDateTime: string
    lastModifiedDateTime: string
  }
  resourceVisualization: {
    title: string
    type: string
    mediaType: string
    previewImageUrl: string
    previewText: string
    containerWebUrl: string
    containerDisplayName: string
    containerType: string
  }
  resourceReference: {
    webUrl: string
    id: string
    type: string
  }
}