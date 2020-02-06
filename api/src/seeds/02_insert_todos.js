/**
 * Delete existing entries and seed values for `todos`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('todos')
    .del()
    .then(() => {
      return knex('todos').insert([
        {
          data: 'Create a todo list',
          isDone: true,
          isStared: false
        },
        {
          data: 'Make todo list better',
          isDone: false,
          isStared: false
        },
        {
          data: 'Use react redux',
          isDone: false,
          isStared: false
        },
        {
          data: 'Divide into various category',
          isDone: false,
          isStared: false
        },
        {
          data: 'Create the HOC',
          isDone: false,
          isStared: false
        }
      ]);
    });
}
