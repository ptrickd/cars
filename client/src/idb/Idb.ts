// Let us open our database
interface IObjectStoreList {
  objectStore: IDBObjectStore
  storeName: string
  keyPath: string
}
enum DB_STATE {
  oneupgrade = 'oneupgrade'
}
export class Idb {
  dbName: string
  db: null | IDBDatabase
  dbVersion: number
  objectStoreList: IObjectStoreList[]
  dbState: DB_STATE | null
  openRequest: IDBOpenDBRequest | null
  isConnected: boolean

  constructor() {
    this.dbName = 'MaintenanceDB'
    this.db = null
    this.dbVersion = 0
    this.objectStoreList = []
    this.dbState = null
    this.openRequest = null
    this.isConnected = false
  }
  /*
  Upgrade the current version of the db when need to upgrade
  */
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
      console.log('DB version: ' + (event.target as IDBOpenDBRequest).result.version)
      const db = (event.target as IDBOpenDBRequest).result
      console.log('Assign db version')
      this.dbVersion = db.version
      this.isConnected = true
    }
    DBOpenRequest.onblocked = (event: Event) => {
      console.log('onblocked')
      console.log(event.target)
    }
    return DBOpenRequest
  }
  deleteDB() {
    const DBDeleteRequest = window.indexedDB.deleteDatabase(this.dbName)

    DBDeleteRequest.onerror = (event: Event) => {
      console.log(event.target)
      console.error('Error deleting database.')
    }

    DBDeleteRequest.onsuccess = (event: Event) => {
      console.log(event.target)
      console.log('Database deleted successfully')
    }
  }
  //
  //Console.log if the browser support indexedDb
  //
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
      if (this.dbState === DB_STATE.oneupgrade && this.db !== null) {
        console.log('Close connection')
        this.db?.close()
      }
      console.log('upgrade version')
      this.upgradeVersion()
      console.log(this.dbVersion)
      let DBOpenRequest: IDBOpenDBRequest | null = null
      if (this.dbState === DB_STATE.oneupgrade) {
        DBOpenRequest = window.indexedDB.open(this.dbName, this.dbVersion)
        this.openRequest = DBOpenRequest
        console.log(DBOpenRequest)
      } else if (this.openRequest !== null) {
        DBOpenRequest = this.openRequest
        console.log(DBOpenRequest)
      } else {
        DBOpenRequest = window.indexedDB.open(this.dbName, this.dbVersion)
        this.openRequest = DBOpenRequest
        console.log(DBOpenRequest)
      }

      if (DBOpenRequest === null) throw new Error('DBOpenRequest null')

      // const DBOpenRequest = this.connect(this.dbVersion)
      console.log(DBOpenRequest.transaction)
      DBOpenRequest.onsuccess = (event: Event) => {
        // const { target } = event
        console.log('event on success')
        console.log(event)
        if (event.target) {
          const db = (event.target as IDBOpenDBRequest).result
          console.log('onsuccess')
          console.log(db.onclose)
        } else throw new Error('event.target undefined')
      }
      DBOpenRequest.onerror = (event: Event) => {
        console.log(event.target?.error)
        console.error('Error creating new store database.')
      }
      DBOpenRequest.onupgradeneeded = (event: Event) => {
        this.dbState = DB_STATE.oneupgrade
        console.log('inside oneupgrade')
        const db = (event.target as IDBOpenDBRequest).result
        this.db = db
        console.log(db)
        const objectStore = db.createObjectStore(storeName, {
          keyPath: keyPath
        })
        db.onerror = (event: Event) => {
          console.error("Why didn't you allow my web app to use IndexedDB?!")
          console.error(event)
        }

        console.log(objectStore)

        db.onclose = (event: Event) => {
          console.log('onupgraded -> onclose')
          console.log(event)
        }
      }
      DBOpenRequest.onblocked = (event: Event) => {
        console.log('onblocked')
        console.log(event)
      }
    }
  } //Add value we can search value by, ex: name, id
  // createIndex(storeName: string) {
  //   objectStore.createIndex('name', 'name', { unique: false })
  // }
}
