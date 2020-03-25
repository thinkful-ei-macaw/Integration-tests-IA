const expect = require("chai").expect;
const supertest = require("supertest");
const app = require("../app");
const store = require("../playstore.js");
const store2 = [...store];

const filteredStore = store.filter(storeItem => {
  return storeItem["Genres"].includes("Action");
});

const sortedStore = store2.sort((a, b) => {
  return a["Rating"] <= b["Rating"] ? 1 : a["Rating"] > b["Rating"] ? -1 : 0;
});

describe("playstore app", () => {
  it("should return a 200", () => {
    return supertest(app)
      .get("/app")
      .expect(200)
      .then(res => {
        expect(res.body).to.eql(store);
      });
  });

  it("look at that professional grade filtering!", () => {
    return supertest(app)
      .get("/app?genres=Action")
      .expect(200)
      .then(res => {
        console.log(res);
        expect(res.body).to.ordered.eql(filteredStore);
      });
  });

  it("look at that professional grade sorting! Hire Ian Immediately!", () => {
    return supertest(app)
      .get("/app?sort=Rating")
      .expect(200)
      .then(res => {
        expect(res.body).to.eql(sortedStore);
      });
  });
});
