export const recipes = [
  {
    _id: 234,
    recipeName: "Tomato Pasta",
    labels: ["healthy", "vegetarian", "quick"],
    shared: true,
    groceries: true,
    ingredients: ["3 tomatoes", "2 blocks feta cheese", "garlic"],
    mealPlan: true,
    instructions:
      "roast the tomatoes for 20 minutes. Add the blocks of feta cheese and roast for another 15 minutes. Add the garlic and roast for another 10 minutes",
  },
  {
    _id: 345,
    recipeName: "Fettuccine Alfredo",
    labels: ["healthy", "vegetarian", "quick"],
    shared: false,
    groceries: false,
    mealPlan: false,

    ingredients: ["fettuccini", " 200g butter", "garlic"],
    instructions:
      "Meatloaf strip steak swine drumstick. Shank beef ground round shoulder short ribs, shankle pancetta chuck jowl bacon brisket. Picanha turkey kielbasa ground round filet mignon. Chislic corned beef picanha filet mignon landjaeger. Flank t-bone biltong spare ribs, beef ribs jerky short ribs.",
  },
  {
    _id: 123,
    recipeName: "Italian Sauage Pasta",
    labels: ["unhealthy"],
    shared: false,
    groceries: true,
    mealPlan: false,
    ingredients: ["tagliatelle", "italian sausage", "200ml cream", "garlic"],
    instructions:
      "Short loin leberkas ribeye kevin, frankfurter burgdoggen meatball salami meatloaf jerky andouille kielbasa pancetta. Prosciutto tongue alcatra, capicola pig ball tip ham strip steak shankle tri-tip short ribs burgdoggen. Sausage fatback cow pork belly ground round doner flank tenderloin pork meatball jerky buffalo. Tri-tip salami pork loin, shankle chicken landjaeger turkey ham hock strip steak meatloaf short loin. Boudin jowl short loin leberkas pancetta.",
  },
  {
    _id: 456,
    recipeName: "Beef and Bacon Burgers",
    labels: ["unhealthy"],
    shared: true,
    groceries: false,
    mealPlan: true,
    ingredients: [
      "burger buns",
      "pesto",
      "bacon",
      "beef mince",
      "cheddar cheese",
      "mayonnaise",
      "smoked paprika",
    ],
    instructions:
      "Pork belly rump cupim, flank pastrami brisket strip steak kevin burgdoggen swine corned beef turducken porchetta spare ribs venison. Venison frankfurter short loin swine turkey salami leberkas. Rump pork belly buffalo, brisket leberkas picanha burgdoggen turducken pancetta turkey pork loin ham corned beef. Short ribs pastrami biltong pancetta shankle brisket. Kevin turducken short loin fatback, tongue venison pancetta.",
  },
];

export const mealPlan = [
  {
    id: 1,
    week: "Week 1",
    day: "Monday",
    recipe: "Tomato Pasta",
  },
  {
    id: 2,
    week: "Week 1",
    day: "Tuesday",
    recipe: "Beef and Bacon Burgers",
  },
  {
    id: 3,
    week: "Week 1",
    day: "Thursday",
    recipe: "Italian Sausage Pasta",
  },
  {
    id: 2,
    week: "Week 2",
    day: "Monday",
    recipe: "Chicken Burgers",
  },
];

export const groceries = [
  {
    id: 10,
    groceryList: [
      "3 tomatoes",
      "2 blocks feta cheese",
      "garlic (2)",
      "tagliatelle",
      "italian sausage",
      "200ml cream",
      "burger buns",
      "pesto",
      "bacon",
      "beef mince",
      "cheddar cheese",
      "mayonnaise",
      "smoked paprika",
    ],
    accessList: [
      {
        userEmail: ["jbothma@gmail.com"],
      },
    ],
  },
];
