function Paradise () {
  this.database = {}

  this.install = () => {
    const library = new Vessel({ id: 0, name: 'library', owner: 0, parent: 0 })
    this.add(library)
    library.actions.create('ghost')
    library.data.note = 'Welcome to paradise, you can edit this message with the note action. <br />To begin, make a new vessel with create.<br/>Type learn to see the list of commands.'
  }

  this.start = () => {

  }

  this.add = (vessel) => {
    if (this.names().indexOf(vessel.data.name) > -1) { return null }
    this.database[vessel.data.id] = vessel
    console.log(`Adding ${vessel.data.name}`)
    return vessel
  }

  this.find = (name) => {
    for (vessel of this.vessels()) {
      if (vessel.name !== name) { continue }
      return vessel
    }
  }

  this.vessels = () => {
    return Object.values(this.database)
  }

  this.read = (id) => {
    return this.database[id]
  }

  this.write = () => {

  }

  this.names = () => {
    return this.vessels().map((vessel) => { return vessel.name })
  }

  this.next = () => {
    for (var i = 0; i < 1000; i++) {
      if (!this.read(i)) { return i }
    }
  }

  this.filter = (fn) => {
    return this.vessels().filter(fn)
  }

  this.import = (json) => {
    const db = {}
    for (const vessel of JSON.parse(json)) {
      db[vessel.id] = new Vessel(vessel)
    }
    this.database = db
  }

  this.export = () => {
    const a = []
    for (const vessel of this.vessels()) {
      a.push(vessel.data)
    }
    return JSON.stringify(a)
  }
}
