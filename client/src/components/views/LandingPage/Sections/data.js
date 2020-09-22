const price = [
    {
      _id: 0,
      name: "Any",
      priceArr: [],
    },
    {
      _id: 1,
      name: "$0 to $199",
      priceArr: [0, 199],
    },
    {
      _id: 2,
      name: "$200 to $249",
      priceArr: [200, 249],
    },
    {
      _id: 3,
      name: "$250 to $279",
      priceArr: [250, 279],
    },
    {
      _id: 4,
      name: "$280 to $299",
      priceArr: [280, 299],
    },
    {
      _id: 5,
      name: "More than $300",
      priceArr: [300, 1500000],
    },
  ];



  const continents = [
    { _id: "1", name: "Africa" },
    { _id: "2", name: "Europe" },
    { _id: "3", name: "Asia" },
    { _id: "4", name: "North America" },
    { _id: "5", name: "South America" },
    { _id: "6", name: "Australia" },
    { _id: "7", name: "Antarctica" },
  ];

  export {continents, price};