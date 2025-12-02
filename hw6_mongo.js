// Question 1
var answer_1 = db.laureates.aggregate([
  {
    $unwind: "$prizes" //need to unwind the file to search
  },
  {
    $match: {
      "prizes.category": "medicine",
      "prizes.year": { $gte: "1950", $lte: "1970" },
      $or: [
        { bornCountry: /Germany/ }, // check to see if the country born is Germany
        { bornCountry: /UK/ }, //check UK and United Kingdom seperately
        { bornCountry: /United Kingdom/ }
      ]
    }
  },
  {
    $project: {
      _id: 0,
      firstname: 1,
      surname: 1,
      bornCountry: 1
    }
  }
])

// Question 2
var answer_2 = db.laureates.aggregate([
  {
    $project: {
      firstname: 1,
      surname: 1,
      numPrizes: { $size: "$prizes" } // need to see the number of prizes each has won, can carry over frist and last name data as we only want over 1 time winners
    }
  },
  {
    $match: {
      numPrizes: { $gt: 1 }
    }
  },
  {
    $count: "numWinners"
  }
])

// Question 3
var answer_3 = db.prizes.aggregate([
  {
    $unwind: "$laureates"
  },
  {
    $group: {
      _id: "$laureates.id",
      firstname: { $first: "$laureates.firstname" }, // formatting essentially the num_Winners column to but getting all of the data on each person to win it more than once
      surname: { $first: "$laureates.surname" },
      numPrizes: { $sum: 1 },
      categories: { $addToSet: "$category" }
    }
  },
  {
    $match: {
      numPrizes: { $gt: 1 }
    }
  },
  {
    $sort: { //formatting the sort
      numPrizes: -1,
      surname: 1
    }
  },
  {
    $project: {
      _id: 0,
      firstname: 1,
      surname: 1,
      numPrizes: 1,
      categories: 1
    }
  }
])

