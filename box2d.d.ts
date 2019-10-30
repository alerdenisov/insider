declare global {
  declare class b2Vec {
    constructor(x: number, y: number)
  }

  declare class b2World {
    constructor(size: b2Vec)
  }
}
