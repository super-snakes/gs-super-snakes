'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.

const library = [
  {
    title: 'The Chamber of Secrets',
    author: 'J.K. Rowling',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51jNORv6nQL._SX340_BO1,204,203,200_.jpg',
    description:
      'Harry Potter and the Chamber of Secrets is a fantasy novel written by British author J. K. Rowling and the second novel in the Harry Potter series. The plot follows Harry\'s second year at Hogwarts School of Witchcraft and Wizardry, during which a series of messages on the walls of the school\'s corridors warn that the "Chamber of Secrets" has been opened and that the "heir of Slytherin" would kill all pupils who do not come from all-magical families.',
    tags: 'fy',
    quantity: 430,
    genre: 'fantasy',
    price: 300
  },
  {
    title: 'Love in the Time of Cholera',
    author: 'Gabriel Garcia Marquez',
    imageUrl: 'https://www.bookstellyouwhy.com/pictures/23828.jpg',
    description:
      'Love in the Time of Cholera (Spanish: El amor en los tiempos del cólera) is a novel by Colombian Nobel prize winning author Gabriel García Márquez. The novel was first published in Spanish in 1985. Alfred A. Knopf published an English translation in 1988, and an English-language movie adaptation was released in 2007.',
    tags: 'f',
    quantity: 900,
    genre: 'magical realism',
    price: 400,
    salePercentageOff: 20
  },
  {
    title: 'The Stranger',
    author: 'Albert Camus',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/f/f7/L%E2%80%99%C3%89tranger_%28Camus_novel%29.jpg',
    description:
      "L’Étranger (The Outsider [UK], or The Stranger [US]) is a 1942 novel by French author Albert Camus. Its theme and outlook are often cited as examples of Camus's philosophy of the absurd and existentialism, though Camus personally rejected the latter label.",
    tags: 'f',
    quantity: 140,
    genre: 'philosophical novel',
    price: 1200
  },
  {
    title: 'East of Eden',
    author: 'John Steinbeck',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/56/EastOfEden.jpg',
    description:
      "East of Eden is a novel by Nobel Prize winner John Steinbeck, published in September 1952. Often described as Steinbeck's most ambitious novel, East of Eden brings to life the intricate details of two families, the Trasks and the Hamiltons, and their interwoven stories.",
    tags: 'f',
    quantity: 102,
    genre: 'fiction',
    price: 900
  },
  {
    title: 'Misery',
    author: 'Stephen King',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/6/6f/Stephen_King_Misery_cover.jpg',
    description:
      "Misery is an American psychological thriller novel written by Stephen King and first published by Viking Press in 1987. The novel's narrative is based on the relationship of its two main characters – the popular writer Paul Sheldon and his psychotic fan Annie Wilkes.",
    tags: 'f',
    quantity: 311,
    genre: 'horror',
    price: 200
  },
  {
    title: 'The Witches',
    author: 'Roald Dahl',
    imageUrl: 'http://www.gtps.k12.nj.us/technology/litcircles5th/witches.jpg',
    description:
      "The Witches is a children's fantasy novel by the British writer Roald Dahl. The story is set partly in Norway and partly in the United Kingdom, and features the experiences of a young British boy and his Norwegian grandmother in a world where child-hating societies of witches secretly exist in every country.",
    tags: 'fc',
    genre: 'childrens',
    quantity: 1210,
    price: 795
  },
  {
    title: 'Cloud Atlas',
    author: 'David Mitchell',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/thumb/3/38/Cloud_atlas.jpg/220px-Cloud_atlas.jpg',
    description:
      "Cloud Atlas is the third novel by British author David Mitchell. Published in 2004, the fantastical speculative fiction book consists of six interconnected nested stories that take the reader from the remote South Pacific in the nineteenth century to the island of Hawai'i in a distant post-apocalyptic future.",
    quantity: 2401,
    tags: 'f',
    genre: 'fantasy',
    price: 600
  },
  {
    title: 'An American Tragedy',
    author: 'Theodore Dreiser',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51hnSoTDRSL.jpg',
    description:
      'Ambitious, handsome, but ill-educated, naïve, and immature, Clyde Griffiths is raised by poor and devoutly religious parents to help in their street missionary work. As a young adult, Clyde must, to help support his family, take menial jobs as a soda jerk, then a bellhop at a prestigious Kansas City hotel.',
    tags: 'f',
    genre: 'crime',
    quantity: 1400,
    price: 495
  },
  {
    title: 'Babbit',
    author: 'Sinclair Lewis',
    imageUrl:
      'https://assets.americanliterature.com/al/images/book/babbitt.jpg',
    description:
      'Babbitt (1922), by Sinclair Lewis, is a satirical novel about American culture and society that critiques the vacuity of middle-class life and the social pressure toward conformity. The controversy provoked by Babbitt was influential in the decision to award the Nobel Prize in literature to Lewis in 1930.',
    tags: 'f',
    quantity: 1200,
    genre: 'satire',
    price: 950
  },
  {
    title: 'Ethan Frome',
    author: 'Edith Wharton',
    imageUrl:
      'https://img.thriftbooks.com/api/images/l/72a5480bd428d4b1790803aba9df8ff841416fd8.jpg',
    description:
      'Ethan Frome is a 1911 book by American author Edith Wharton. The novel is framed by the literary device of an extended flashback. The prologue, which is neither named as such nor numbered, opens with an unnamed male narrator spending a winter in Starkfield while in the area on business. He spots a limping, quiet man around the village, who is somehow compelling in his demeanor and carriage. This is Ethan Frome, who is a local fixture of the community, having been a lifelong resident.',
    tags: 'f',
    quantity: 1410,
    genre: 'gothic',
    price: 325
  },
  {
    title: 'Beloved',
    author: 'Toni Morrison',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/613vQdXPDwL.jpg',
    description:
      'Beloved is a 1987 novel by the American writer Toni Morrison. Set after the American Civil War (1861–65), it is inspired by the story of an African-American slave, Margaret Garner, who escaped slavery in Kentucky late January 1856 by fleeing to Ohio, a free state.',
    tags: 'f',
    quantity: 1910,
    genre: 'magical realism',
    price: 925
  },
  {
    title: 'Invisble Man',
    author: 'Ralph Ellison',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/9/9f/Invisible_Man.jpg',
    description:
      'Invisible Man is a novel by Ralph Ellison, published by Random House in 1952. It addresses many of the social and intellectual issues facing African Americans early in the twentieth century, including black nationalism, the relationship between black identity and Marxism, and the reformist racial policies of Booker T. Washington, as well as issues of individuality and personal identity.',
    tags: 'f',
    quantity: 447,
    genre: 'social commentary',
    price: 485
  },
  {
    title: 'Mrs. Dalloway',
    author: 'Virginia Woolf',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51TkzBZVj7L._SX331_BO1,204,203,200_.jpg',
    description: `Mrs Dalloway (published on 14 May 1925[1]) is a novel by Virginia Woolf that details a day in the life of Clarissa Dalloway, a fictional high-society woman in post–First World War England. It is one of Woolf's best-known novels.`,
    tags: 'f',
    quantity: 450,
    genre: 'modernism',
    price: 1045
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
