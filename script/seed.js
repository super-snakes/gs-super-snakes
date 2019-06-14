'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.

const library = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Harry_Potter_and_the_Chamber_of_Secrets.jpg/220px-Harry_Potter_and_the_Chamber_of_Secrets.jpg',
    description:
      'Harry Potter and the Chamber of Secrets is a fantasy novel written by British author J. K. Rowling and the second novel in the Harry Potter series. The plot follows Harry\'s second year at Hogwarts School of Witchcraft and Wizardry, during which a series of messages on the walls of the school\'s corridors warn that the "Chamber of Secrets" has been opened and that the "heir of Slytherin" would kill all pupils who do not come from all-magical families.',
    tags: 'fy',
    quantity: 100000000,
    genre: 'fantasy',
    price: 300
  },
  {
    title: 'Of Human Bondage',
    author: 'W. Somerset Maugham',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/OfHumanBondage.jpg/220px-OfHumanBondage.jpg',
    description:
      'Of Human Bondage is a 1915 novel by W. Somerset Maugham. It is generally agreed to be his masterpiece and to be strongly autobiographical in nature, although Maugham stated, "This is a novel, not an autobiography, though much in it is autobiographical, more is pure invention."',
    tags: 'f',
    genre: 'coming of age',
    price: 400,
    salePercentageOff: 20
  },
  {
    title: 'Cloud Atlas',
    author: 'David Mitchell',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/thumb/3/38/Cloud_atlas.jpg/220px-Cloud_atlas.jpg',
    description:
      "Cloud Atlas is the third novel by British author David Mitchell. Published in 2004, the fantastical speculative fiction book consists of six interconnected nested stories that take the reader from the remote South Pacific in the nineteenth century to the island of Hawai'i in a distant post-apocalyptic future.",
    tags: 'f',
    genre: 'fantasy',
    price: 600
  }
]

const people = [
  {
    name: 'Alex Mann',
    email: 'Alexander_Mann@alumni.brown.edu',
    password: 'pumpkin',
    street: '2538 High Ridge Road',
    city: 'Stamford',
    state: 'CT',
    zipCode: '06903',
    phoneNumber: '9379023894',
    paymentInformation: 5500000000000004,
    paymentType: 'credit card',
    isAdmin: true,
    wishList: []
  },
  {
    name: 'Mercedes Miller',
    email: 'mercedesgmiller92@gmail.com',
    password: 'sausage',
    street: '354 44th St',
    apt: '1RF',
    city: 'Brooklyn',
    state: 'NY',
    zipCode: '11220',
    phoneNumber: '7185095356',
    paymentType: 'paypal',
    isAdmin: false,
    wishList: [1]
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all(
    people.map(person => {
      return User.create(person)
    })
  )

  const books = await Promise.all(
    library.map(book => {
      return Product.create(book)
    })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${books.length} books`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
