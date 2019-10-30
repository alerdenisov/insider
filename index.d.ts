import * as CSS from 'csstype'

declare global {
  function drawAxes(ctx): void
  function setColorFromDebugDrawCallback(color): void
  function drawSegment(vert1, vert2): void
  function drawPolygon(vertices, vertexCount, fill): void
  function drawCircle(center, radius, axis, fill): void
  function drawTransform(transform): void
  function getCanvasDebugDraw(): void
  type box2D = typeof Box2D
  type LONG = number //todo int64?
  namespace Box2D {
    function destroy(obj: any): void
    // [NoDelete]
    // \s+(\w+) (\w+)\(((\w+) (\w+),?)*\);
    class b2Contact {
      GetManifold(): b2Manifold
      IsTouching(): boolean
      SetEnabled(flag: boolean): void
      IsEnabled(): boolean
      GetNext(): b2Contact
      GetFixtureA(): b2Fixture
      GetChildIndexA(): LONG
      GetFixtureB(): b2Fixture
      GetChildIndexB(): LONG
      SetFriction(friction: number): void
      GetFriction(): number
      ResetFriction(): void
      SetRestitution(restitution: number): void
      GetRestitution(): number
      ResetRestitution(): void
    }

    class b2ContactListener {}

    // [JSImplementation="b2ContactListener"]
    class b2ContactListener {
      b2ContactListener(): void
      BeginContact(contact: b2Contact): void
      EndContact(contact: b2Contact): void
      // TODO: Declare another b2ContactListener implementation without PreSolve/PostSolve,
      // for efficiency (otherwise the JS implementations of these functions must get called
      // even if unused).
      PreSolve(contact: b2Contact, oldManifold: ReadOnly<b2Manifold>): void
      PostSolve(contact: b2Contact, impulse: ReadOnly<b2ContactImpulse>): void
    }

    class b2World {
      constructor(gravity?: Readonly<b2Vec2>)
      SetDestructionListener(listener: b2DestructionListener): void
      SetContactFilter(filter: b2ContactFilter): void
      SetContactListener(listener: b2ContactListener): void
      SetDebugDraw(debugDraw: b2Draw): void
      CreateBody(def: Readonly<b2BodyDef>): b2Body
      DestroyBody(body: b2Body): void
      CreateJoint(def: Readonly<b2JointDef>): b2Joint
      DestroyJoint(joint: b2Joint): void
      Step(
        timeStep: number,
        velocityIterations: LONG,
        positionIterations: LONG
      ): void
      ClearForces(): void
      DrawDebugData(): void
      QueryAABB(callback: b2QueryCallback, aabb: b2AABB): void
      RayCast(callback: b2RayCastCallback, point1: b2Vec2, point2: b2Vec2): void
      GetBodyList(): b2Body
      GetJointList(): b2Joint
      GetContactList(): b2Contact
      SetAllowSleeping(flag: boolean): void
      GetAllowSleeping(): boolean
      SetWarmStarting(flag: boolean): void
      GetWarmStarting(): boolean
      SetContinuousPhysics(flag: boolean): void
      GetContinuousPhysics(): boolean
      SetSubStepping(flag: boolean): void
      GetSubStepping(): boolean
      GetProxyCount(): LONG
      GetBodyCount(): LONG
      GetJointCount(): LONG
      GetContactCount(): LONG
      GetTreeHeight(): LONG
      GetTreeBalance(): LONG
      GetTreeQuality(): number
      SetGravity(gravity: b2Vec2): void
      GetGravity(): b2Vec2
      IsLocked(): boolean
      SetAutoClearForces(flag: boolean): void
      GetAutoClearForces(): boolean
      GetProfile(): b2Profile
      Dump(): void
    }

    enum b2ShapeType {
      e_circle,
      e_edge,
      e_polygon,
      e_chain,
      e_typeCount
    }

    class b2Vec2 {
      constructor(x?: float, y?: float)
      SetZero(): void
      Set(x: float, y: float): void
      op_add(v: b2Vec2): void
      op_sub(v: b2Vec2): void
      op_mul(s: float): void
      Length(): number
      LengthSquared(): number
      Normalize(): number
      IsValid(): boolean
      Skew(): b2Vec2
      x: float
      y: float
    }

    var b2Shape: { new (...args: any[]): any }
    var b2FixtureDef: { new (...args: any[]): any }
    var b2Fixture: { new (...args: any[]): any }
    var b2Transform: { new (...args: any[]): any }
    var b2RayCastCallback: { new (...args: any[]): any }
    var b2RayCastCallback: { new (...args: any[]): any }
    var b2QueryCallback: { new (...args: any[]): any }
    var b2QueryCallback: { new (...args: any[]): any }
    var b2MassData: { new (...args: any[]): any }
    var b2Vec3: { new (...args: any[]): any }
    var b2Body: { new (...args: any[]): any }
    var b2BodyDef: { new (...args: any[]): any }
    var b2Filter: { new (...args: any[]): any }
    var b2AABB: { new (...args: any[]): any }
    var b2CircleShape: { new (...args: any[]): any }
    var b2EdgeShape: { new (...args: any[]): any }
    var b2JointDef: { new (...args: any[]): any }
    var b2Joint: { new (...args: any[]): any }
    var b2WeldJoint: { new (...args: any[]): any }
    var b2WeldJointDef: { new (...args: any[]): any }
    var b2ChainShape: { new (...args: any[]): any }
    var b2Color: { new (...args: any[]): any }
    var b2ContactEdge: { new (...args: any[]): any }
    var b2ContactFeature: { new (...args: any[]): any }
    var b2ContactFilter: { new (...args: any[]): any }
    var b2ContactFilter: { new (...args: any[]): any }
    var b2ContactID: { new (...args: any[]): any }
    var b2ContactImpulse: { new (...args: any[]): any }
    var b2DestructionListener: { new (...args: any[]): any }
    var b2DestructionListenerWrapper: { new (...args: any[]): any }
    var b2DestructionListener: { new (...args: any[]): any }
    var b2DistanceJoint: { new (...args: any[]): any }
    var b2DistanceJointDef: { new (...args: any[]): any }
    var b2Draw: { new (...args: any[]): any }
    var b2Draw: { new (...args: any[]): any }
    var b2FrictionJoint: { new (...args: any[]): any }
    var b2FrictionJointDef: { new (...args: any[]): any }
    var b2GearJoint: { new (...args: any[]): any }
    var b2GearJointDef: { new (...args: any[]): any }
    var b2JointEdge: { new (...args: any[]): any }
    var b2Manifold: { new (...args: any[]): any }
    var b2ManifoldPoint: { new (...args: any[]): any }
    var b2Mat22: { new (...args: any[]): any }
    var b2Mat33: { new (...args: any[]): any }
    var b2MouseJoint: { new (...args: any[]): any }
    var b2MouseJointDef: { new (...args: any[]): any }
    var b2PolygonShape: { new (...args: any[]): any }
    var b2PrismaticJoint: { new (...args: any[]): any }
    var b2PrismaticJointDef: { new (...args: any[]): any }
    var b2Profile: { new (...args: any[]): any }
    var b2PulleyJoint: { new (...args: any[]): any }
    var b2PulleyJointDef: { new (...args: any[]): any }
    var b2RayCastInput: { new (...args: any[]): any }
    var b2RayCastOutput: { new (...args: any[]): any }
    var b2RevoluteJointDef: { new (...args: any[]): any }
    var b2RevoluteJoint: { new (...args: any[]): any }
    var b2RopeJoint: { new (...args: any[]): any }
    var b2RopeJointDef: { new (...args: any[]): any }
    var b2Rot: { new (...args: any[]): any }
    var b2WheelJoint: { new (...args: any[]): any }
    var b2WheelJointDef: { new (...args: any[]): any }
    // class b2Shape {
    //  GetType() : b2ShapeType;
    //  GetChildCount() : LONG;
    //   boolean TestPoint([Ref] b2Transform xf, [Ref] b2Vec2 p);
    //   boolean RayCast(b2RayCastOutput output, [Ref] b2RayCastInput input,
    //                   [Ref] b2Transform transform, LONG childIndex);
    //   void ComputeAABB(b2AABB aabb, [Ref] b2Transform xf, LONG childIndex);
    //   void ComputeMass(b2MassData massData, number density);

    //   attribute b2ShapeType m_type;
    //   attribute number m_radius;
    // };

    // class b2FixtureDef {
    //  b2FixtureDef() : void;
    //   [Const] attribute b2Shape shape;
    //   attribute any userData;
    //   attribute number friction;
    //   attribute number restitution;
    //   attribute number density;
    //   attribute boolean isSensor;
    //   [Value] attribute b2Filter filter;
    // };

    // class b2Fixture {
    //  GetType() : b2ShapeType;
    //  GetShape() : b2Shape;
    //  SetSensor(boolean sensor) : void;
    //  IsSensor() : boolean;
    //   void SetFilterData([Ref] b2Filter filter);
    //   [Const, Ref]  GetFilterData() : b2Filter;
    //  Refilter() : void;
    //  GetBody() : b2Body;
    //  GetNext() : b2Fixture;
    //  GetUserData() : any;
    //  SetUserData(any data) : void;
    //   boolean TestPoint([Ref] b2Vec2 p);
    //   boolean RayCast(b2RayCastOutput output, [Ref] b2RayCastInput input, LONG childIndex);
    //  GetMassData(b2MassData massData) : void;
    //  SetDensity(number density) : void;
    //  GetDensity() : number;
    //  GetFriction() : number;
    //  SetFriction(number friction) : void;
    //  GetRestitution() : number;
    //  SetRestitution(number restitution) : void;
    //   [Const, Ref]  GetAABB(LONG childIndex) : b2AABB;
    //  Dump(LONG bodyIndex) : void;
    // };

    // class b2Transform {
    //  b2Transform() : void;
    //   void b2Transform([Ref] b2Vec2 position, [Ref] b2Rot rotation);
    //  SetIdentity() : void;
    //   void Set([Ref] b2Vec2 position, number angle);
    //   [Value] attribute b2Vec2 p;
    //   [Value] attribute b2Rot q;
    // };

    // class b2RayCastCallback {
    // };
    // [JSImplementation="b2RayCastCallback"]

    // class JSRayCastCallback {
    //  JSRayCastCallback() : void;
    //   number ReportFixture(b2Fixture fixture, [Const, Ref] b2Vec2 point,
    //                       [Const, Ref] b2Vec2 normal, number fraction);
    // };

    // class b2QueryCallback {
    // };
    // [JSImplementation="b2QueryCallback"]

    // class JSQueryCallback {
    //  JSQueryCallback() : void;
    //  ReportFixture(b2Fixture fixture) : boolean;
    // };

    // class b2MassData {
    //  b2MassData() : void;
    //   attribute number mass;
    //   [Value] attribute b2Vec2 center;
    //   attribute number I;
    // };

    class b2Vec2 {
      b2Vec2(): void
      b2Vec2(x: float, y: float): void
      SetZero(): void
      Set(x: float, y: float): void
      op_add(v: b2Vec2): void
      op_sub(v: b2Vec2): void
      op_mul(s: float): void
      Length(): number
      LengthSquared(): number
      Normalize(): number
      IsValid(): boolean
      Skew(): b2Vec2
      x: float
      y: float
    }

    // class b2Vec3 {
    //  b2Vec3() : void;
    //   void b2Vec3(number x, number y, number z);
    //  SetZero() : void;
    //   void Set(number x, number y, number z);
    //   [Operator="+="] void op_add([Const, Ref] b2Vec3 v);
    //   [Operator="-="] void op_sub([Const, Ref] b2Vec3 v);
    //   [Operator="*="]  op_mul(number s) : void;
    //   attribute number x;
    //   attribute number y;
    //   attribute number z;
    // };

    // [NoDelete]

    // class b2Body {
    //  CreateFixture(b2FixtureDef def) : b2Fixture;
    //   b2Fixture CreateFixture(b2Shape shape, number density);
    //  DestroyFixture(b2Fixture fixture) : void;
    //   void SetTransform([Ref] b2Vec2 position, number angle);
    //   [Const, Ref]  GetTransform() : b2Transform;
    //   [Const, Ref]  GetPosition() : b2Vec2;
    //  GetAngle() : number;
    //   [Const, Ref]  GetWorldCenter() : b2Vec2;
    //   [Const, Ref]  GetLocalCenter() : b2Vec2;
    //   void SetLinearVelocity([Ref] b2Vec2 v);
    //   [Value]  GetLinearVelocity() : b2Vec2;
    //  SetAngularVelocity(number omega) : void;
    //  GetAngularVelocity() : number;
    //   void ApplyForce([Ref] b2Vec2 force, [Ref] b2Vec2 point);
    //   void ApplyForceToCenter([Ref] b2Vec2 force);
    //  ApplyTorque(number torque) : void;
    //   void ApplyLinearImpulse([Ref] b2Vec2 impulse, [Ref] b2Vec2 point);
    //  ApplyAngularImpulse(number impulse) : void;
    //  GetMass() : number;
    //  GetInertia() : number;
    //  GetMassData(b2MassData data) : void;
    //  SetMassData(b2MassData data) : void;
    //  ResetMassData() : void;
    //   [Value] b2Vec2 GetWorldPoint([Ref] b2Vec2 localPoint);
    //   [Value] b2Vec2 GetWorldVector([Ref] b2Vec2 localVector);
    //   [Value] b2Vec2 GetLocalPoint([Ref] b2Vec2 worldPoint);
    //   [Value] b2Vec2 GetLocalVector([Ref] b2Vec2 worldVector);
    //   [Value] b2Vec2 GetLinearVelocityFromWorldPoint([Ref] b2Vec2 worldPoint);
    //   [Value] b2Vec2 GetLinearVelocityFromLocalPoint([Ref] b2Vec2 localPoint);
    //  GetLinearDamping() : number;
    //  SetLinearDamping(number linearDamping) : void;
    //  GetAngularDamping() : number;
    //  SetAngularDamping(number angularDamping) : void;
    //  GetGravityScale() : number;
    //  SetGravityScale(number scale) : void;
    //  SetType(b2BodyType type) : void;
    //  GetType() : b2BodyType;
    //  SetBullet(boolean flag) : void;
    //  IsBullet() : boolean;
    //  SetSleepingAllowed(boolean flag) : void;
    //  IsSleepingAllowed() : boolean;
    //  SetAwake(boolean flag) : void;
    //  IsAwake() : boolean;
    //  SetActive(boolean flag) : void;
    //  IsActive() : boolean;
    //  SetFixedRotation(boolean flag) : void;
    //  IsFixedRotation() : boolean;
    //  GetFixtureList() : b2Fixture;
    //  GetJointList() : b2JointEdge;
    //  GetContactList() : b2ContactEdge;
    //  GetNext() : b2Body;
    //  GetUserData() : any;
    //  SetUserData(any data) : void;
    //  GetWorld() : b2World;
    //  Dump() : void;
    // };

    // enum b2BodyType {
    //   "b2_staticBody",
    //   "b2_kinematicBody",
    //   "b2_dynamicBody"
    // };

    // class b2BodyDef {
    //  b2BodyDef() : void;

    //   attribute b2BodyType type;
    //   [Value] attribute b2Vec2 position;
    //   attribute number angle;
    //   [Value] attribute b2Vec2 linearVelocity;
    //   attribute number angularVelocity;
    //   attribute number linearDamping;
    //   attribute number angularDamping;
    //   attribute boolean allowSleep;
    //   attribute boolean awake;
    //   attribute boolean fixedRotation;
    //   attribute boolean bullet;
    //   attribute boolean active;
    //   attribute any userData;
    //   attribute number gravityScale;
    // };

    // class b2Filter {
    //  b2Filter() : void;
    //   attribute unsigned short categoryBits;
    //   attribute unsigned short maskBits;
    //   attribute short groupIndex;
    // };

    // class b2AABB {
    //  b2AABB() : void;
    //  IsValid() : boolean;
    //   [Value]  GetCenter() : b2Vec2;
    //   [Value]  GetExtents() : b2Vec2;
    //  GetPerimeter() : number;
    //   void Combine([Ref] b2AABB aabb);
    //   void Combine([Ref] b2AABB aabb1, [Ref] b2AABB aabb2);
    //   boolean Contains([Ref] b2AABB aabb);
    //   boolean RayCast(b2RayCastOutput output, [Ref] b2RayCastInput input);
    //   [Value] attribute b2Vec2 lowerBound;
    //   [Value] attribute b2Vec2 upperBound;
    // };

    // class b2CircleShape {
    //  b2CircleShape() : void;
    //   [Value] attribute b2Vec2 m_p;
    // };

    // b2CircleShape implements b2Shape;

    // class b2EdgeShape {
    //  b2EdgeShape() : void;
    //   void Set([Ref] b2Vec2 v1, [Ref] b2Vec2 v2);

    //   [Value] attribute b2Vec2 m_vertex1;
    //   [Value] attribute b2Vec2 m_vertex2;
    //   [Value] attribute b2Vec2 m_vertex0;
    //   [Value] attribute b2Vec2 m_vertex3;
    //   attribute boolean m_hasVertex0;
    //   attribute boolean m_hasVertex3;
    // };

    // b2EdgeShape implements b2Shape;

    // enum b2JointType {
    //   "e_unknownJoint",
    //   "e_revoluteJoint",
    //   "e_prismaticJoint",
    //   "e_distanceJoint",
    //   "e_pulleyJoint",
    //   "e_mouseJoint",
    //   "e_gearJoint",
    //   "e_wheelJoint",
    //   "e_weldJoint",
    //   "e_frictionJoint",
    //   "e_ropeJoint"
    // };

    // enum b2LimitState {
    //   "e_inactiveLimit",
    //   "e_atLowerLimit",
    //   "e_atUpperLimit",
    //   "e_equalLimits"
    // };

    // class b2JointDef {
    //  b2JointDef() : void;
    //   attribute b2JointType type;
    //   attribute any userData;
    //   attribute b2Body bodyA;
    //   attribute b2Body bodyB;
    //   attribute boolean collideConnected;
    // };

    // [NoDelete]

    // class b2Joint {
    //  GetType() : b2JointType;
    //  GetBodyA() : b2Body;
    //  GetBodyB() : b2Body;
    //   [Value]  GetAnchorA() : b2Vec2;
    //   [Value]  GetAnchorB() : b2Vec2;
    //   [Value]  GetReactionForce(number inv_dt) : b2Vec2;
    //  GetReactionTorque(number inv_dt) : number;
    //  GetNext() : b2Joint;
    //  GetUserData() : any;
    //  SetUserData(any data) : void;
    //  IsActive() : boolean;
    //  GetCollideConnected() : boolean;
    //  Dump() : void;
    // };

    // class b2WeldJoint {
    //   [Const, Ref]  GetLocalAnchorA() : b2Vec2;
    //   [Const, Ref]  GetLocalAnchorB() : b2Vec2;
    //  SetFrequency(number hz) : void;
    //  GetFrequency() : number;
    //  SetDampingRatio(number ratio) : void;
    //  GetDampingRatio() : number;
    //  Dump() : void;
    // };

    // b2WeldJoint implements b2Joint;

    // class b2WeldJointDef {
    //  b2WeldJointDef() : void;
    //   void Initialize(b2Body bodyA, b2Body bodyB, [Ref] b2Vec2 anchor);
    //   [Value] attribute b2Vec2 localAnchorA;
    //   [Value] attribute b2Vec2 localAnchorB;
    //   attribute number referenceAngle;
    //   attribute number frequencyHz;
    //   attribute number dampingRatio;
    // };

    // b2WeldJointDef implements b2JointDef;

    // class b2ChainShape {
    //  b2ChainShape() : void;
    //   void CreateLoop(b2Vec2 vertices, LONG count);
    //   void CreateChain(b2Vec2 vertices, LONG count);
    //   void SetPrevVertex([Ref] b2Vec2 prevVertex);
    //   void SetNextVertex([Ref] b2Vec2 nextVertex);
    //   void GetChildEdge(b2EdgeShape edge, LONG index);

    //   attribute b2Vec2 m_vertices;
    //   attribute LONG m_count;
    //   [Value] attribute b2Vec2 m_prevVertex;
    //   [Value] attribute b2Vec2 m_nextVertex;
    //   attribute boolean m_hasPrevVertex;
    //   attribute boolean m_hasNextVertex;
    // };

    // b2ChainShape implements b2Shape;

    // class b2Color {
    //  b2Color() : void;
    //   void b2Color(number r, number g, number b);
    //   void Set(number ri, number gi, number bi);

    //   attribute number r;
    //   attribute number g;
    //   attribute number b;
    // };

    // class b2ContactEdge {
    //  b2ContactEdge() : void;
    //   attribute b2Body other;
    //   attribute b2Contact contact;
    //   attribute b2ContactEdge prev;
    //   attribute b2ContactEdge next;
    // };

    // enum b2ContactFeatureType {
    //   "b2ContactFeature::e_vertex",
    //   "b2ContactFeature::e_face"
    // };

    // class b2ContactFeature {
    //   attribute octet indexA;
    //   attribute octet indexB;
    //   attribute octet typeA;
    //   attribute octet typeB;
    // };

    // class b2ContactFilter {
    // };

    // [JSImplementation="b2ContactFilter"]

    // class b2ContactFilter {
    //  b2ContactFilter() : void;
    //   boolean ShouldCollide(b2Fixture fixtureA, b2Fixture fixtureB);
    // };

    // class b2ContactID {
    //   [Value] attribute b2ContactFeature cf;
    //   attribute unsigned LONG key;
    // };

    // class b2ContactImpulse {
    //   // TODO: webidl_binder support for array types.
    //   // attribute number[] normalImpulses;
    //   // attribute number[] tangentImpulses;
    //   attribute LONG count;
    // };

    // class b2DestructionListener {
    // };

    // class b2DestructionListenerWrapper {
    // };

    // [JSImplementation="b2DestructionListenerWrapper"]

    // class JSDestructionListener {
    //  JSDestructionListener() : void;
    //   // These methods map the overloaded methods from b2DestructionListener onto differently-named
    //   // methods, so that it is possible to implement both of them in JS.
    //  SayGoodbyeJoint(b2Joint joint) : void;
    //  SayGoodbyeFixture(b2Fixture joint) : void;
    // };

    // class b2DistanceJoint {
    //   [Const, Ref]  GetLocalAnchorA() : b2Vec2;
    //   [Const, Ref]  GetLocalAnchorB() : b2Vec2;
    //  SetLength(number length) : void;
    //  GetLength() : number;
    //  SetFrequency(number hz) : void;
    //  GetFrequency() : number;
    //  SetDampingRatio(number ratio) : void;
    //  GetDampingRatio() : number;
    // };

    // b2DistanceJoint implements b2Joint;

    // class b2DistanceJointDef {
    //  b2DistanceJointDef() : void;
    //   void Initialize(b2Body bodyA, b2Body bodyB, [Ref] b2Vec2 anchorA, [Ref] b2Vec2 anchorB);
    //   [Value] attribute b2Vec2 localAnchorA;
    //   [Value] attribute b2Vec2 localAnchorB;
    //   attribute number length;
    //   attribute number frequencyHz;
    //   attribute number dampingRatio;
    // };

    // b2DistanceJointDef implements b2JointDef;

    // enum b2DrawFlag {
    //   "b2Draw::e_shapeBit",
    //   "b2Draw::e_jointBit",
    //   "b2Draw::e_aabbBit",
    //   "b2Draw::e_pairBit",
    //   "b2Draw::e_centerOfMassBit"
    // };

    // class b2Draw {
    //  SetFlags(g flags) : void;
    //   unsigned  GetFlags() : LONG;
    //  AppendFlags(g flags) : void;
    //  ClearFlags(g flags) : void;
    // };

    // [JSImplementation="b2Draw"]

    // class JSDraw {
    //  JSDraw() : void;
    //   void DrawPolygon([Const] b2Vec2 vertices, LONG vertexCount, [Const, Ref] b2Color color);
    //   void DrawSolidPolygon([Const] b2Vec2 vertices, LONG vertexCount, [Const, Ref] b2Color color);
    //   void DrawCircle([Const, Ref] b2Vec2 center, number radius, [Const, Ref] b2Color color);
    //   void DrawSolidCircle([Const, Ref] b2Vec2 center, number radius, [Const, Ref] b2Vec2 axis, [Const, Ref] b2Color color);
    //   void DrawSegment([Const, Ref] b2Vec2 p1, [Const, Ref] b2Vec2 p2, [Const, Ref] b2Color color);
    //   void DrawTransform([Const, Ref] b2Transform xf);
    // };

    // class b2FrictionJoint {
    //   [Const, Ref]  GetLocalAnchorA() : b2Vec2;
    //   [Const, Ref]  GetLocalAnchorB() : b2Vec2;
    //  SetMaxForce(number force) : void;
    //  GetMaxForce() : number;
    //  SetMaxTorque(number torque) : void;
    //  GetMaxTorque() : number;
    // };

    // b2FrictionJoint implements b2Joint;

    // class b2FrictionJointDef {
    //  b2FrictionJointDef() : void;
    //   void Initialize(b2Body bodyA, b2Body bodyB, [Ref] b2Vec2 anchor);
    //   [Value] attribute b2Vec2 localAnchorA;
    //   [Value] attribute b2Vec2 localAnchorB;
    //   attribute number maxForce;
    //   attribute number maxTorque;
    // };

    // b2FrictionJointDef implements b2JointDef;

    // class b2GearJoint {
    //  GetJoint1() : b2Joint;
    //  GetJoint2() : b2Joint;
    //  SetRatio(number ratio) : void;
    //  GetRatio() : number;
    // };

    // b2GearJoint implements b2Joint;

    // class b2GearJointDef {
    //  b2GearJointDef() : void;
    //   attribute b2Joint joint1;
    //   attribute b2Joint joint2;
    //   attribute number ratio;
    // };

    // b2GearJointDef implements b2JointDef;

    // class b2JointEdge {
    //  b2JointEdge() : void;
    //   attribute b2Body other;
    //   attribute b2Joint joint;
    //   attribute b2JointEdge prev;
    //   attribute b2JointEdge next;
    // };

    // enum b2ManifoldType {
    //   "b2Manifold::e_circles",
    //   "b2Manifold::e_faceA",
    //   "b2Manifold::e_faceB"
    // };

    // class b2Manifold {
    //  b2Manifold() : void;
    //   // TODO: webidl_binder support for array types.
    //   // [Value] attribute b2ManifoldPoint[] points;
    //   [Value] attribute b2Vec2 localNormal;
    //   [Value] attribute b2Vec2 localPoint;
    //   attribute b2ManifoldType type;
    //   attribute LONG pointCount;
    // };

    // class b2ManifoldPoint {
    //  b2ManifoldPoint() : void;
    //   [Value] attribute b2Vec2 localPoint;
    //   attribute number normalImpulse;
    //   attribute number tangentImpulse;
    //   [Value] attribute b2ContactID id;
    // };

    // class b2Mat22 {
    //  b2Mat22() : void;
    //   void b2Mat22([Ref] b2Vec2 c1, [Ref] b2Vec2 c2);
    //   void b2Mat22(number a11, number a12, number a21, number a22);
    //   void Set([Ref] b2Vec2 c1, [Ref] b2Vec2 c2);
    //  SetIdentity() : void;
    //  SetZero() : void;
    //   [Value]  GetInverse() : b2Mat22;
    //   [Value] b2Vec2 Solve([Ref] b2Vec2 b);

    //   [Value] attribute b2Vec2 ex;
    //   [Value] attribute b2Vec2 ey;
    // };

    // class b2Mat33 {
    //  b2Mat33() : void;
    //   void b2Mat33([Ref] b2Vec3 c1, [Ref] b2Vec3 c2, [Ref] b2Vec3 c3);
    //  SetZero() : void;
    //   [Value] b2Vec3 Solve33([Ref] b2Vec3 b);
    //   [Value] b2Vec2 Solve22([Ref] b2Vec2 b);
    //  GetInverse22(b2Mat33 M) : void;
    //  GetSymInverse33(b2Mat33 M) : void;

    //   [Value] attribute b2Vec3 ex;
    //   [Value] attribute b2Vec3 ey;
    //   [Value] attribute b2Vec3 ez;
    // };

    // class b2MouseJoint {
    //   void SetTarget([Ref] b2Vec2 target);
    //   [Const, Ref]  GetTarget() : b2Vec2;
    //  SetMaxForce(number force) : void;
    //  GetMaxForce() : number;
    //  SetFrequency(number hz) : void;
    //  GetFrequency() : number;
    //  SetDampingRatio(number ratio) : void;
    //  GetDampingRatio() : number;
    // };

    // b2MouseJoint implements b2Joint;

    // class b2MouseJointDef {
    //  b2MouseJointDef() : void;
    //   [Value] attribute b2Vec2 target;
    //   attribute number maxForce;
    //   attribute number frequencyHz;
    //   attribute number dampingRatio;
    // };

    // b2MouseJointDef implements b2JointDef;

    // class b2PolygonShape {
    //  b2PolygonShape() : void;
    //   void Set(b2Vec2 vertices, LONG vertexCount);
    //   void SetAsBox(number hx, number hy);
    //   void SetAsBox(number hx, number hy, [Ref] b2Vec2 center, number angle);
    //  GetVertexCount() : LONG;
    //   [Const, Ref]  GetVertex(LONG index) : b2Vec2;
    //   [Value] attribute b2Vec2 m_centroid;

    //   // TODO: webidl_binder support for array types.
    //   //[Value] attribute b2Vec2[] m_vertices;
    //   //[Value] attribute b2Vec2[] m_normals;

    //   attribute LONG m_vertexCount;
    // };

    // b2PolygonShape implements b2Shape;

    // class b2PrismaticJoint {
    //   [Const, Ref]  GetLocalAnchorA() : b2Vec2;
    //   [Const, Ref]  GetLocalAnchorB() : b2Vec2;
    //   [Const, Ref]  GetLocalAxisA() : b2Vec2;
    //  GetReferenceAngle() : number;
    //  GetJointTranslation() : number;
    //  GetJointSpeed() : number;
    //  IsLimitEnabled() : boolean;
    //  EnableLimit(boolean flag) : void;
    //  GetLowerLimit() : number;
    //  GetUpperLimit() : number;
    //   void SetLimits(number lower, number upper);
    //  IsMotorEnabled() : boolean;
    //  EnableMotor(boolean flag) : void;
    //  SetMotorSpeed(number speed) : void;
    //  GetMotorSpeed() : number;
    //  SetMaxMotorForce(number force) : void;
    //  GetMaxMotorForce() : number;
    //  GetMotorForce(number inv_dt) : number;
    // };

    // b2PrismaticJoint implements b2Joint;

    // class b2PrismaticJointDef {
    //  b2PrismaticJointDef() : void;
    //   void Initialize(b2Body bodyA, b2Body bodyB, [Ref] b2Vec2 anchor, [Ref] b2Vec2 axis);
    //   [Value] attribute b2Vec2 localAnchorA;
    //   [Value] attribute b2Vec2 localAnchorB;
    //   [Value] attribute b2Vec2 localAxisA;
    //   attribute number referenceAngle;
    //   attribute boolean enableLimit;
    //   attribute number lowerTranslation;
    //   attribute number upperTranslation;
    //   attribute boolean enableMotor;
    //   attribute number maxMotorForce;
    //   attribute number motorSpeed;
    // };

    // b2PrismaticJointDef implements b2JointDef;

    // class b2Profile {
    //   attribute number step;
    //   attribute number collide;
    //   attribute number solve;
    //   attribute number solveInit;
    //   attribute number solveVelocity;
    //   attribute number solvePosition;
    //   attribute number broadphase;
    //   attribute number solveTOI;
    // };

    // class b2PulleyJoint {
    //   [Value]  GetGroundAnchorA() : b2Vec2;
    //   [Value]  GetGroundAnchorB() : b2Vec2;
    //  GetLengthA() : number;
    //  GetLengthB() : number;
    //  GetRatio() : number;
    // };

    // b2PulleyJoint implements b2Joint;

    // class b2PulleyJointDef {
    //  b2PulleyJointDef() : void;
    //   void Initialize(b2Body bodyA, b2Body bodyB, [Ref] b2Vec2 groundAnchorA, [Ref] b2Vec2 groundAnchorB,
    //                   [Ref] b2Vec2 anchorA, [Ref] b2Vec2 anchorB, number ratio);
    //   [Value] attribute b2Vec2 groundAnchorA;
    //   [Value] attribute b2Vec2 groundAnchorB;
    //   [Value] attribute b2Vec2 localAnchorA;
    //   [Value] attribute b2Vec2 localAnchorB;
    //   attribute number lengthA;
    //   attribute number lengthB;
    //   attribute number ratio;
    // };

    // b2PulleyJointDef implements b2JointDef;

    // class b2RayCastInput {
    //   [Value] attribute b2Vec2 p1;
    //   [Value] attribute b2Vec2 p2;
    //   attribute number maxFraction;
    // };

    // class b2RayCastOutput {
    //   [Value] attribute b2Vec2 normal;
    //   attribute number fraction;
    // };

    // class b2RevoluteJointDef {
    //  b2RevoluteJointDef() : void;
    //   void Initialize(b2Body bodyA, b2Body bodyB, [Ref] b2Vec2 anchor);
    //   [Value] attribute b2Vec2 localAnchorA;
    //   [Value] attribute b2Vec2 localAnchorB;
    //   attribute number referenceAngle;
    //   attribute boolean enableLimit;
    //   attribute number lowerAngle;
    //   attribute number upperAngle;
    //   attribute boolean enableMotor;
    //   attribute number motorSpeed;
    //   attribute number maxMotorTorque;
    // };

    // b2RevoluteJointDef implements b2JointDef;

    // class b2RevoluteJoint {
    //   [Const, Ref]  GetLocalAnchorA() : b2Vec2;
    //   [Const, Ref]  GetLocalAnchorB() : b2Vec2;
    //  GetReferenceAngle() : number;
    //  GetJointAngle() : number;
    //  GetJointSpeed() : number;
    //  IsLimitEnabled() : boolean;
    //  EnableLimit(boolean flag) : void;
    //  GetLowerLimit() : number;
    //  GetUpperLimit() : number;
    //   void SetLimits(number lower, number upper);
    //  IsMotorEnabled() : boolean;
    //  EnableMotor(boolean flag) : void;
    //  SetMotorSpeed(number speed) : void;
    //  GetMotorSpeed() : number;
    //  SetMaxMotorTorque(number torque) : void;
    //  GetMaxMotorTorque() : number;
    //  GetMotorTorque(number inv_dt) : number;
    // };

    // b2RevoluteJoint implements b2Joint;

    // class b2RopeJoint {
    //   [Const, Ref]  GetLocalAnchorA() : b2Vec2;
    //   [Const, Ref]  GetLocalAnchorB() : b2Vec2;
    //  SetMaxLength(number length) : void;
    //  GetMaxLength() : number;
    //  GetLimitState() : b2LimitState;
    // };

    // b2RopeJoint implements b2Joint;

    // class b2RopeJointDef {
    //  b2RopeJointDef() : void;
    //   [Value] attribute b2Vec2 localAnchorA;
    //   [Value] attribute b2Vec2 localAnchorB;
    //   attribute number maxLength;
    // };
    // b2RopeJointDef implements b2JointDef;

    // class b2Rot {
    //  b2Rot() : void;
    //  b2Rot(number angle) : void;
    //  Set(number angle) : void;
    //  SetIdentity() : void;
    //  GetAngle() : number;
    //   [Value]  GetXAxis() : b2Vec2;
    //   [Value]  GetYAxis() : b2Vec2;
    //   attribute number s;
    //   attribute number c;
    // };

    // class b2WheelJoint {
    //   [Const, Ref]  GetLocalAnchorA() : b2Vec2;
    //   [Const, Ref]  GetLocalAnchorB() : b2Vec2;
    //   [Const, Ref]  GetLocalAxisA() : b2Vec2;
    //  GetJointTranslation() : number;
    //  GetJointSpeed() : number;
    //  IsMotorEnabled() : boolean;
    //  EnableMotor(boolean flag) : void;
    //  SetMotorSpeed(number speed) : void;
    //  GetMotorSpeed() : number;
    //  SetMaxMotorTorque(number torque) : void;
    //  GetMaxMotorTorque() : number;
    //  GetMotorTorque(number inv_dt) : number;
    //  SetSpringFrequencyHz(number hz) : void;
    //  GetSpringFrequencyHz() : number;
    //  SetSpringDampingRatio(number ratio) : void;
    //  GetSpringDampingRatio() : number;
    // };

    // b2WheelJoint implements b2Joint;

    // class b2WheelJointDef {
    //  b2WheelJointDef() : void;
    //   void Initialize(b2Body bodyA, b2Body bodyB, [Ref] b2Vec2 anchor, [Ref] b2Vec2 axis);
    //   [Value] attribute b2Vec2 localAnchorA;
    //   [Value] attribute b2Vec2 localAnchorB;
    //   [Value] attribute b2Vec2 localAxisA;
    //   attribute boolean enableMotor;
    //   attribute number maxMotorTorque;
    //   attribute number motorSpeed;
    //   attribute number frequencyHz;
    //   attribute number dampingRatio;
    // };

    // b2WheelJointDef implements b2JointDef;
  }

  interface Window {
    Box2D(): typeof Box2D
  }

  interface INuxtContext {
    app: vue.default
    isClient: boolean
    isServer: boolean
    isStatic: boolean
    isDev: boolean
    isHMR: boolean
    route: Route
    store: Store<any>
    env: object
    query: object
    nuxtState: object
    req: Request
    res: Response
    redirect: (path: string) => void
    error: (params: { statusCode?: string; message?: string }) => void
    beforeNuxtRender: ({ Components, nuxtState }) => void
  }

  namespace JSX {
    interface ElementAttributesProperty {
      vueTsxProps: any
    }

    interface VueElementEventMap {
      onFullscreenchange: Event
      nativeOnFullscreenchange: Event
      onFullscreenerror: Event
      nativeOnFullscreenerror: Event
      onAbort: UIEvent
      nativeOnAbort: UIEvent
      onAnimationcancel: AnimationEvent
      nativeOnAnimationcancel: AnimationEvent
      onAnimationend: AnimationEvent
      nativeOnAnimationend: AnimationEvent
      onAnimationiteration: AnimationEvent
      nativeOnAnimationiteration: AnimationEvent
      onAnimationstart: AnimationEvent
      nativeOnAnimationstart: AnimationEvent
      onAuxclick: MouseEvent
      nativeOnAuxclick: MouseEvent
      onBlur: FocusEvent
      nativeOnBlur: FocusEvent
      onCancel: Event
      nativeOnCancel: Event
      onCanplay: Event
      nativeOnCanplay: Event
      onCanplaythrough: Event
      nativeOnCanplaythrough: Event
      onChange: Event
      nativeOnChange: Event
      onClick: MouseEvent
      nativeOnClick: MouseEvent
      onClose: Event
      nativeOnClose: Event
      onContextmenu: MouseEvent
      nativeOnContextmenu: MouseEvent
      onCuechange: Event
      nativeOnCuechange: Event
      onDblclick: MouseEvent
      nativeOnDblclick: MouseEvent
      onDrag: DragEvent
      nativeOnDrag: DragEvent
      onDragend: DragEvent
      nativeOnDragend: DragEvent
      onDragenter: DragEvent
      nativeOnDragenter: DragEvent
      onDragexit: Event
      nativeOnDragexit: Event
      onDragleave: DragEvent
      nativeOnDragleave: DragEvent
      onDragover: DragEvent
      nativeOnDragover: DragEvent
      onDragstart: DragEvent
      nativeOnDragstart: DragEvent
      onDrop: DragEvent
      nativeOnDrop: DragEvent
      onDurationchange: Event
      nativeOnDurationchange: Event
      onEmptied: Event
      nativeOnEmptied: Event
      onEnded: Event
      nativeOnEnded: Event
      onError: ErrorEvent
      nativeOnError: ErrorEvent
      onFocus: FocusEvent
      nativeOnFocus: FocusEvent
      onGotpointercapture: PointerEvent
      nativeOnGotpointercapture: PointerEvent
      onInput: Event
      nativeOnInput: Event
      onInvalid: Event
      nativeOnInvalid: Event
      onKeydown: KeyboardEvent
      nativeOnKeydown: KeyboardEvent
      onKeypress: KeyboardEvent
      nativeOnKeypress: KeyboardEvent
      onKeyup: KeyboardEvent
      nativeOnKeyup: KeyboardEvent
      onLoad: Event
      nativeOnLoad: Event
      onLoadeddata: Event
      nativeOnLoadeddata: Event
      onLoadedmetadata: Event
      nativeOnLoadedmetadata: Event
      onLoadend: ProgressEvent
      nativeOnLoadend: ProgressEvent
      onLoadstart: Event
      nativeOnLoadstart: Event
      onLostpointercapture: PointerEvent
      nativeOnLostpointercapture: PointerEvent
      onMousedown: MouseEvent
      nativeOnMousedown: MouseEvent
      onMouseenter: MouseEvent
      nativeOnMouseenter: MouseEvent
      onMouseleave: MouseEvent
      nativeOnMouseleave: MouseEvent
      onMousemove: MouseEvent
      nativeOnMousemove: MouseEvent
      onMouseout: MouseEvent
      nativeOnMouseout: MouseEvent
      onMouseover: MouseEvent
      nativeOnMouseover: MouseEvent
      onMouseup: MouseEvent
      nativeOnMouseup: MouseEvent
      onPause: Event
      nativeOnPause: Event
      onPlay: Event
      nativeOnPlay: Event
      onPlaying: Event
      nativeOnPlaying: Event
      onPointercancel: PointerEvent
      nativeOnPointercancel: PointerEvent
      onPointerdown: PointerEvent
      nativeOnPointerdown: PointerEvent
      onPointerenter: PointerEvent
      nativeOnPointerenter: PointerEvent
      onPointerleave: PointerEvent
      nativeOnPointerleave: PointerEvent
      onPointermove: PointerEvent
      nativeOnPointermove: PointerEvent
      onPointerout: PointerEvent
      nativeOnPointerout: PointerEvent
      onPointerover: PointerEvent
      nativeOnPointerover: PointerEvent
      onPointerup: PointerEvent
      nativeOnPointerup: PointerEvent
      onProgress: ProgressEvent
      nativeOnProgress: ProgressEvent
      onRatechange: Event
      nativeOnRatechange: Event
      onReset: Event
      nativeOnReset: Event
      onResize: UIEvent
      nativeOnResize: UIEvent
      onScroll: Event
      nativeOnScroll: Event
      onSecuritypolicyviolation: SecurityPolicyViolationEvent
      nativeOnSecuritypolicyviolation: SecurityPolicyViolationEvent
      onSeeked: Event
      nativeOnSeeked: Event
      onSeeking: Event
      nativeOnSeeking: Event
      onSelect: Event
      nativeOnSelect: Event
      onSelectionchange: Event
      nativeOnSelectionchange: Event
      onSelectstart: Event
      nativeOnSelectstart: Event
      onStalled: Event
      nativeOnStalled: Event
      onSubmit: Event
      nativeOnSubmit: Event
      onSuspend: Event
      nativeOnSuspend: Event
      onTimeupdate: Event
      nativeOnTimeupdate: Event
      onToggle: Event
      nativeOnToggle: Event
      onTouchcancel: TouchEvent
      nativeOnTouchcancel: TouchEvent
      onTouchend: TouchEvent
      nativeOnTouchend: TouchEvent
      onTouchmove: TouchEvent
      nativeOnTouchmove: TouchEvent
      onTouchstart: TouchEvent
      nativeOnTouchstart: TouchEvent
      onTransitioncancel: TransitionEvent
      nativeOnTransitioncancel: TransitionEvent
      onTransitionend: TransitionEvent
      nativeOnTransitionend: TransitionEvent
      onTransitionrun: TransitionEvent
      nativeOnTransitionrun: TransitionEvent
      onTransitionstart: TransitionEvent
      nativeOnTransitionstart: TransitionEvent
      onVolumechange: Event
      nativeOnVolumechange: Event
      onWaiting: Event
      nativeOnWaiting: Event
      onWheel: WheelEvent
      nativeOnWheel: WheelEvent
      onCopy: ClipboardEvent
      nativeOnCopy: ClipboardEvent
      onCut: ClipboardEvent
      nativeOnCut: ClipboardEvent
      onPaste: ClipboardEvent
      nativeOnPaste: ClipboardEvent
    }

    type D = Map<VueElementEventMap, EventMapFunc>
    type DefaultEvents =
      | {
          [event in keyof VueElementEventMap]: (
            evt: VueElementEventMap[event]
          ) => void | Promise<void>
        }
      | {
          on: {
            [event in keyof HTMLElementEventMap]: (
              evt: HTMLElementEventMap[event]
            ) => void | Promise<void>
          }
          nativeOn: {
            [event in keyof HTMLElementEventMap]: (
              evt: HTMLElementEventMap[event]
            ) => void | Promise<void>
          }
        }

    type DeepPartial<T> = { [P in keyof T]?: T[P] | DeepPartial<T[P]> }
    type DefaultProps = DeepPartial<
      DefaultEvents & {
        attrs: any
        props: any
        directives: Array<{
          name: string
          arg?: string
          modifiers?: { [key: string]: boolean | string }
        }>
        class: string | { [key: string]: boolean }
        id: string
        style: string | CSS.Properties
        key: string
        ref: string
        refInFor: string
        slot: string
        'v-model': any
        vModel: any
      }
    >

    type Props<P> = Readonly<DefaultProps & P>
  }

  declare namespace NodeJS {
    interface Process {
      client: boolean
      server: boolean
    }
  }
}

declare module 'vue/types/vue' {
  type Mods = { [key: string]: boolean | string }

  interface Vue {
    i18n: i18n.IVueI18n | i18n.default
    $bem(
      elOrMods?: string | Mods,
      mods?: Mods
    ): {
      directives: Array<{
        name: 'bem'
        arg?: string
        modifiers?: { [key: string]: boolean }
      }>
    }
    $api<TChain extends keyof typeof chainsMap>(
      type: TChain
    ): Promise<Api<TChain>>
    range<T = any>(n: number, func: (index: number) => T): T[]
  }
}
