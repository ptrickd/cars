// Let us open our database
interface IObjectStoreList {
  objectStore: IDBObjectStore
  storeName: string
  keyPath: string
}
interface IConnectReturn {
  db: IDBDatabase | null
  DBOpenRequest: IDBOpenDBRequest | null
}

export class Idb {
  dbName: string
  dbVersion: number
  objectStoreList: IObjectStoreList[]

  constructor() {
    this.dbName = 'MaintenanceDB'
    this.dbVersion = 0

    this.objectStoreList = []
  }
  upgradeVersion() {
    this.dbVersion++
  }
  connect(): IDBOpenDBRequest {
    let DBOpenRequest = null
    // let db = null
    DBOpenRequest = window.indexedDB.open(this.dbName)

    DBOpenRequest.onerror = (event: Event) => {
      console.error("Why didn't you allow my web app to use IndexedDB?!")
      console.error(event)
    }
    DBOpenRequest.onsuccess = (event: Event) => {
      // const { target } = event
      console.log('onsuccess')
      console.log((event.target as IDBOpenDBRequest).result.version)
      const db = (event.target as IDBOpenDBRequest).result
      this.dbVersion = db.version
    }
    DBOpenRequest.onblocked = (event: Event) => {
      console.log('onblocked')
      console.log(event.target)
    }
    return DBOpenRequest
  }
  deleteDB(dbName: string) {
    const DBDeleteRequest = window.indexedDB.deleteDatabase(dbName)

    DBDeleteRequest.onerror = (event: Event) => {
      console.log(event.target)
      console.error('Error deleting database.')
    }

    DBDeleteRequest.onsuccess = (event: Event) => {
      console.log(event.target)
      console.log('Database deleted successfully')

      // console.log(event.result) // should be undefined
    }
  }
  isIdbSupported() {
    if (!('indexedDB' in window)) {
      // Can't use IndexedDB
      console.log("This browser doesn't support IndexedDB")
    } else {
      console.log('This browser support IndexedDB')
    }
  }
  createObjectStore(storeName: string, keyPath: string) {
    // console.log(storeName)
    // console.log(keyPath)

    if (storeName.length > 1 && keyPath.length > 1) {
      console.log(this.dbVersion)
      this.upgradeVersion()
      console.log('upgrade version')
      console.log(this.dbVersion)
      const DBOpenRequest = window.indexedDB.open(this.dbName, this.dbVersion)
      // const DBOpenRequest = this.connect(this.dbVersion)

      DBOpenRequest.onsuccess = (event: Event) => {
        // const { target } = event
        console.log('event on success')
        console.log(event)
        if (event.target) {
          // const db = (event.target as IDBOpenDBRequest).result
          console.log('onsuccess')
        } else throw new Error('event.target undefined')
      }
      DBOpenRequest.onerror = (event: Event) => {
        console.log(event.target)
        console.error('Error creating new store database.')
      }
      DBOpenRequest.onupgradeneeded = (event: Event) => {
        console.log('inside oneupgrade')
        const db = (event.target as IDBOpenDBRequest).result
        console.log(db)
        db.onerror = (event: Event) => {
          console.error("Why didn't you allow my web app to use IndexedDB?!")
          console.error(event)
        }
        const objectStore = db.createObjectStore(storeName, {
          keyPath: keyPath
        })
        console.log(objectStore)
      }
    }
  } //Add value we can search value by, ex: name, id
  // createIndex(storeName: string) {
  //   objectStore.createIndex('name', 'name', { unique: false })
  // }
}
