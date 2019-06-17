import React from 'react'
import Axios from 'axios'

const Reviews = props => {
  const reviews = props.reviews

  return reviews.map(review => {
    return (
      <div key={review.id} className="comment row">
        <div className="column">
          <a>
            <h5>{review.user.name}</h5>
          </a>
          <div>{review.content}</div>
        </div>
      </div>
    )
  })
}

export default Reviews
