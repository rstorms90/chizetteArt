exports.up = function(knex, Promise) {
    return knex.schema.createTable('chizetteart', function(table) {
      // TABLE COLUMN DEFINITIONS HERE
      table.increments()
      table.string('Title').notNullable().defaultTo('')
      table.integer('Year').notNullable().defaultTo(2018)
      table.string('Medium').notNullable().defaultTo('')
      table.string('Description').notNullable().defaultTo('')
      table.timestamps(true, true)
    })
  }
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('chizetteart')
  }