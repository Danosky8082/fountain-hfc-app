
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Fellowship
 * 
 */
export type Fellowship = $Result.DefaultSelection<Prisma.$FellowshipPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Member
 * 
 */
export type Member = $Result.DefaultSelection<Prisma.$MemberPayload>
/**
 * Model AttendanceSession
 * 
 */
export type AttendanceSession = $Result.DefaultSelection<Prisma.$AttendanceSessionPayload>
/**
 * Model AttendanceRecord
 * 
 */
export type AttendanceRecord = $Result.DefaultSelection<Prisma.$AttendanceRecordPayload>
/**
 * Model MonthlyReport
 * 
 */
export type MonthlyReport = $Result.DefaultSelection<Prisma.$MonthlyReportPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ReportStatus: {
  DRAFT: 'DRAFT',
  FINALIZED: 'FINALIZED'
};

export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus]


export const Role: {
  FL: 'FL',
  ASSOCIATE: 'ASSOCIATE',
  HOD: 'HOD',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type ReportStatus = $Enums.ReportStatus

export const ReportStatus: typeof $Enums.ReportStatus

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Fellowships
 * const fellowships = await prisma.fellowship.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Fellowships
   * const fellowships = await prisma.fellowship.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.fellowship`: Exposes CRUD operations for the **Fellowship** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fellowships
    * const fellowships = await prisma.fellowship.findMany()
    * ```
    */
  get fellowship(): Prisma.FellowshipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.member`: Exposes CRUD operations for the **Member** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Members
    * const members = await prisma.member.findMany()
    * ```
    */
  get member(): Prisma.MemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attendanceSession`: Exposes CRUD operations for the **AttendanceSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AttendanceSessions
    * const attendanceSessions = await prisma.attendanceSession.findMany()
    * ```
    */
  get attendanceSession(): Prisma.AttendanceSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attendanceRecord`: Exposes CRUD operations for the **AttendanceRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AttendanceRecords
    * const attendanceRecords = await prisma.attendanceRecord.findMany()
    * ```
    */
  get attendanceRecord(): Prisma.AttendanceRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.monthlyReport`: Exposes CRUD operations for the **MonthlyReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MonthlyReports
    * const monthlyReports = await prisma.monthlyReport.findMany()
    * ```
    */
  get monthlyReport(): Prisma.MonthlyReportDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Fellowship: 'Fellowship',
    User: 'User',
    Member: 'Member',
    AttendanceSession: 'AttendanceSession',
    AttendanceRecord: 'AttendanceRecord',
    MonthlyReport: 'MonthlyReport'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "fellowship" | "user" | "member" | "attendanceSession" | "attendanceRecord" | "monthlyReport"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Fellowship: {
        payload: Prisma.$FellowshipPayload<ExtArgs>
        fields: Prisma.FellowshipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FellowshipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FellowshipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FellowshipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FellowshipPayload>
          }
          findFirst: {
            args: Prisma.FellowshipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FellowshipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FellowshipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FellowshipPayload>
          }
          findMany: {
            args: Prisma.FellowshipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FellowshipPayload>[]
          }
          create: {
            args: Prisma.FellowshipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FellowshipPayload>
          }
          createMany: {
            args: Prisma.FellowshipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FellowshipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FellowshipPayload>[]
          }
          delete: {
            args: Prisma.FellowshipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FellowshipPayload>
          }
          update: {
            args: Prisma.FellowshipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FellowshipPayload>
          }
          deleteMany: {
            args: Prisma.FellowshipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FellowshipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FellowshipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FellowshipPayload>[]
          }
          upsert: {
            args: Prisma.FellowshipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FellowshipPayload>
          }
          aggregate: {
            args: Prisma.FellowshipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFellowship>
          }
          groupBy: {
            args: Prisma.FellowshipGroupByArgs<ExtArgs>
            result: $Utils.Optional<FellowshipGroupByOutputType>[]
          }
          count: {
            args: Prisma.FellowshipCountArgs<ExtArgs>
            result: $Utils.Optional<FellowshipCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Member: {
        payload: Prisma.$MemberPayload<ExtArgs>
        fields: Prisma.MemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          findFirst: {
            args: Prisma.MemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          findMany: {
            args: Prisma.MemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          create: {
            args: Prisma.MemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          createMany: {
            args: Prisma.MemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          delete: {
            args: Prisma.MemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          update: {
            args: Prisma.MemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          deleteMany: {
            args: Prisma.MemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          upsert: {
            args: Prisma.MemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          aggregate: {
            args: Prisma.MemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMember>
          }
          groupBy: {
            args: Prisma.MemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemberCountArgs<ExtArgs>
            result: $Utils.Optional<MemberCountAggregateOutputType> | number
          }
        }
      }
      AttendanceSession: {
        payload: Prisma.$AttendanceSessionPayload<ExtArgs>
        fields: Prisma.AttendanceSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttendanceSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttendanceSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceSessionPayload>
          }
          findFirst: {
            args: Prisma.AttendanceSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttendanceSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceSessionPayload>
          }
          findMany: {
            args: Prisma.AttendanceSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceSessionPayload>[]
          }
          create: {
            args: Prisma.AttendanceSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceSessionPayload>
          }
          createMany: {
            args: Prisma.AttendanceSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttendanceSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceSessionPayload>[]
          }
          delete: {
            args: Prisma.AttendanceSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceSessionPayload>
          }
          update: {
            args: Prisma.AttendanceSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceSessionPayload>
          }
          deleteMany: {
            args: Prisma.AttendanceSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttendanceSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AttendanceSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceSessionPayload>[]
          }
          upsert: {
            args: Prisma.AttendanceSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceSessionPayload>
          }
          aggregate: {
            args: Prisma.AttendanceSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendanceSession>
          }
          groupBy: {
            args: Prisma.AttendanceSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendanceSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttendanceSessionCountArgs<ExtArgs>
            result: $Utils.Optional<AttendanceSessionCountAggregateOutputType> | number
          }
        }
      }
      AttendanceRecord: {
        payload: Prisma.$AttendanceRecordPayload<ExtArgs>
        fields: Prisma.AttendanceRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttendanceRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttendanceRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          findFirst: {
            args: Prisma.AttendanceRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttendanceRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          findMany: {
            args: Prisma.AttendanceRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>[]
          }
          create: {
            args: Prisma.AttendanceRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          createMany: {
            args: Prisma.AttendanceRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttendanceRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>[]
          }
          delete: {
            args: Prisma.AttendanceRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          update: {
            args: Prisma.AttendanceRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          deleteMany: {
            args: Prisma.AttendanceRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttendanceRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AttendanceRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>[]
          }
          upsert: {
            args: Prisma.AttendanceRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>
          }
          aggregate: {
            args: Prisma.AttendanceRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendanceRecord>
          }
          groupBy: {
            args: Prisma.AttendanceRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendanceRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttendanceRecordCountArgs<ExtArgs>
            result: $Utils.Optional<AttendanceRecordCountAggregateOutputType> | number
          }
        }
      }
      MonthlyReport: {
        payload: Prisma.$MonthlyReportPayload<ExtArgs>
        fields: Prisma.MonthlyReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MonthlyReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MonthlyReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>
          }
          findFirst: {
            args: Prisma.MonthlyReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MonthlyReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>
          }
          findMany: {
            args: Prisma.MonthlyReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>[]
          }
          create: {
            args: Prisma.MonthlyReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>
          }
          createMany: {
            args: Prisma.MonthlyReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MonthlyReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>[]
          }
          delete: {
            args: Prisma.MonthlyReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>
          }
          update: {
            args: Prisma.MonthlyReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>
          }
          deleteMany: {
            args: Prisma.MonthlyReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MonthlyReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MonthlyReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>[]
          }
          upsert: {
            args: Prisma.MonthlyReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyReportPayload>
          }
          aggregate: {
            args: Prisma.MonthlyReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMonthlyReport>
          }
          groupBy: {
            args: Prisma.MonthlyReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<MonthlyReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.MonthlyReportCountArgs<ExtArgs>
            result: $Utils.Optional<MonthlyReportCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    fellowship?: FellowshipOmit
    user?: UserOmit
    member?: MemberOmit
    attendanceSession?: AttendanceSessionOmit
    attendanceRecord?: AttendanceRecordOmit
    monthlyReport?: MonthlyReportOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type FellowshipCountOutputType
   */

  export type FellowshipCountOutputType = {
    members: number
    sessions: number
    reports: number
  }

  export type FellowshipCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | FellowshipCountOutputTypeCountMembersArgs
    sessions?: boolean | FellowshipCountOutputTypeCountSessionsArgs
    reports?: boolean | FellowshipCountOutputTypeCountReportsArgs
  }

  // Custom InputTypes
  /**
   * FellowshipCountOutputType without action
   */
  export type FellowshipCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FellowshipCountOutputType
     */
    select?: FellowshipCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FellowshipCountOutputType without action
   */
  export type FellowshipCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberWhereInput
  }

  /**
   * FellowshipCountOutputType without action
   */
  export type FellowshipCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceSessionWhereInput
  }

  /**
   * FellowshipCountOutputType without action
   */
  export type FellowshipCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyReportWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    submittedSessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submittedSessions?: boolean | UserCountOutputTypeCountSubmittedSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubmittedSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceSessionWhereInput
  }


  /**
   * Count Type MemberCountOutputType
   */

  export type MemberCountOutputType = {
    attendanceRecords: number
  }

  export type MemberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendanceRecords?: boolean | MemberCountOutputTypeCountAttendanceRecordsArgs
  }

  // Custom InputTypes
  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCountOutputType
     */
    select?: MemberCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountAttendanceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceRecordWhereInput
  }


  /**
   * Count Type AttendanceSessionCountOutputType
   */

  export type AttendanceSessionCountOutputType = {
    records: number
  }

  export type AttendanceSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    records?: boolean | AttendanceSessionCountOutputTypeCountRecordsArgs
  }

  // Custom InputTypes
  /**
   * AttendanceSessionCountOutputType without action
   */
  export type AttendanceSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceSessionCountOutputType
     */
    select?: AttendanceSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AttendanceSessionCountOutputType without action
   */
  export type AttendanceSessionCountOutputTypeCountRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceRecordWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Fellowship
   */

  export type AggregateFellowship = {
    _count: FellowshipCountAggregateOutputType | null
    _min: FellowshipMinAggregateOutputType | null
    _max: FellowshipMaxAggregateOutputType | null
  }

  export type FellowshipMinAggregateOutputType = {
    id: string | null
    name: string | null
    location: string | null
    leaderId: string | null
    associateId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FellowshipMaxAggregateOutputType = {
    id: string | null
    name: string | null
    location: string | null
    leaderId: string | null
    associateId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FellowshipCountAggregateOutputType = {
    id: number
    name: number
    location: number
    leaderId: number
    associateId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FellowshipMinAggregateInputType = {
    id?: true
    name?: true
    location?: true
    leaderId?: true
    associateId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FellowshipMaxAggregateInputType = {
    id?: true
    name?: true
    location?: true
    leaderId?: true
    associateId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FellowshipCountAggregateInputType = {
    id?: true
    name?: true
    location?: true
    leaderId?: true
    associateId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FellowshipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fellowship to aggregate.
     */
    where?: FellowshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fellowships to fetch.
     */
    orderBy?: FellowshipOrderByWithRelationInput | FellowshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FellowshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fellowships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fellowships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Fellowships
    **/
    _count?: true | FellowshipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FellowshipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FellowshipMaxAggregateInputType
  }

  export type GetFellowshipAggregateType<T extends FellowshipAggregateArgs> = {
        [P in keyof T & keyof AggregateFellowship]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFellowship[P]>
      : GetScalarType<T[P], AggregateFellowship[P]>
  }




  export type FellowshipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FellowshipWhereInput
    orderBy?: FellowshipOrderByWithAggregationInput | FellowshipOrderByWithAggregationInput[]
    by: FellowshipScalarFieldEnum[] | FellowshipScalarFieldEnum
    having?: FellowshipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FellowshipCountAggregateInputType | true
    _min?: FellowshipMinAggregateInputType
    _max?: FellowshipMaxAggregateInputType
  }

  export type FellowshipGroupByOutputType = {
    id: string
    name: string
    location: string
    leaderId: string | null
    associateId: string | null
    createdAt: Date
    updatedAt: Date
    _count: FellowshipCountAggregateOutputType | null
    _min: FellowshipMinAggregateOutputType | null
    _max: FellowshipMaxAggregateOutputType | null
  }

  type GetFellowshipGroupByPayload<T extends FellowshipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FellowshipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FellowshipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FellowshipGroupByOutputType[P]>
            : GetScalarType<T[P], FellowshipGroupByOutputType[P]>
        }
      >
    >


  export type FellowshipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    leaderId?: boolean
    associateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    leader?: boolean | Fellowship$leaderArgs<ExtArgs>
    associate?: boolean | Fellowship$associateArgs<ExtArgs>
    members?: boolean | Fellowship$membersArgs<ExtArgs>
    sessions?: boolean | Fellowship$sessionsArgs<ExtArgs>
    reports?: boolean | Fellowship$reportsArgs<ExtArgs>
    _count?: boolean | FellowshipCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fellowship"]>

  export type FellowshipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    leaderId?: boolean
    associateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    leader?: boolean | Fellowship$leaderArgs<ExtArgs>
    associate?: boolean | Fellowship$associateArgs<ExtArgs>
  }, ExtArgs["result"]["fellowship"]>

  export type FellowshipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    leaderId?: boolean
    associateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    leader?: boolean | Fellowship$leaderArgs<ExtArgs>
    associate?: boolean | Fellowship$associateArgs<ExtArgs>
  }, ExtArgs["result"]["fellowship"]>

  export type FellowshipSelectScalar = {
    id?: boolean
    name?: boolean
    location?: boolean
    leaderId?: boolean
    associateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FellowshipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "location" | "leaderId" | "associateId" | "createdAt" | "updatedAt", ExtArgs["result"]["fellowship"]>
  export type FellowshipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leader?: boolean | Fellowship$leaderArgs<ExtArgs>
    associate?: boolean | Fellowship$associateArgs<ExtArgs>
    members?: boolean | Fellowship$membersArgs<ExtArgs>
    sessions?: boolean | Fellowship$sessionsArgs<ExtArgs>
    reports?: boolean | Fellowship$reportsArgs<ExtArgs>
    _count?: boolean | FellowshipCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FellowshipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leader?: boolean | Fellowship$leaderArgs<ExtArgs>
    associate?: boolean | Fellowship$associateArgs<ExtArgs>
  }
  export type FellowshipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leader?: boolean | Fellowship$leaderArgs<ExtArgs>
    associate?: boolean | Fellowship$associateArgs<ExtArgs>
  }

  export type $FellowshipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Fellowship"
    objects: {
      leader: Prisma.$UserPayload<ExtArgs> | null
      associate: Prisma.$UserPayload<ExtArgs> | null
      members: Prisma.$MemberPayload<ExtArgs>[]
      sessions: Prisma.$AttendanceSessionPayload<ExtArgs>[]
      reports: Prisma.$MonthlyReportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      location: string
      leaderId: string | null
      associateId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["fellowship"]>
    composites: {}
  }

  type FellowshipGetPayload<S extends boolean | null | undefined | FellowshipDefaultArgs> = $Result.GetResult<Prisma.$FellowshipPayload, S>

  type FellowshipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FellowshipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FellowshipCountAggregateInputType | true
    }

  export interface FellowshipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Fellowship'], meta: { name: 'Fellowship' } }
    /**
     * Find zero or one Fellowship that matches the filter.
     * @param {FellowshipFindUniqueArgs} args - Arguments to find a Fellowship
     * @example
     * // Get one Fellowship
     * const fellowship = await prisma.fellowship.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FellowshipFindUniqueArgs>(args: SelectSubset<T, FellowshipFindUniqueArgs<ExtArgs>>): Prisma__FellowshipClient<$Result.GetResult<Prisma.$FellowshipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Fellowship that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FellowshipFindUniqueOrThrowArgs} args - Arguments to find a Fellowship
     * @example
     * // Get one Fellowship
     * const fellowship = await prisma.fellowship.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FellowshipFindUniqueOrThrowArgs>(args: SelectSubset<T, FellowshipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FellowshipClient<$Result.GetResult<Prisma.$FellowshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fellowship that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FellowshipFindFirstArgs} args - Arguments to find a Fellowship
     * @example
     * // Get one Fellowship
     * const fellowship = await prisma.fellowship.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FellowshipFindFirstArgs>(args?: SelectSubset<T, FellowshipFindFirstArgs<ExtArgs>>): Prisma__FellowshipClient<$Result.GetResult<Prisma.$FellowshipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fellowship that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FellowshipFindFirstOrThrowArgs} args - Arguments to find a Fellowship
     * @example
     * // Get one Fellowship
     * const fellowship = await prisma.fellowship.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FellowshipFindFirstOrThrowArgs>(args?: SelectSubset<T, FellowshipFindFirstOrThrowArgs<ExtArgs>>): Prisma__FellowshipClient<$Result.GetResult<Prisma.$FellowshipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Fellowships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FellowshipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fellowships
     * const fellowships = await prisma.fellowship.findMany()
     * 
     * // Get first 10 Fellowships
     * const fellowships = await prisma.fellowship.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fellowshipWithIdOnly = await prisma.fellowship.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FellowshipFindManyArgs>(args?: SelectSubset<T, FellowshipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FellowshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Fellowship.
     * @param {FellowshipCreateArgs} args - Arguments to create a Fellowship.
     * @example
     * // Create one Fellowship
     * const Fellowship = await prisma.fellowship.create({
     *   data: {
     *     // ... data to create a Fellowship
     *   }
     * })
     * 
     */
    create<T extends FellowshipCreateArgs>(args: SelectSubset<T, FellowshipCreateArgs<ExtArgs>>): Prisma__FellowshipClient<$Result.GetResult<Prisma.$FellowshipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Fellowships.
     * @param {FellowshipCreateManyArgs} args - Arguments to create many Fellowships.
     * @example
     * // Create many Fellowships
     * const fellowship = await prisma.fellowship.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FellowshipCreateManyArgs>(args?: SelectSubset<T, FellowshipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Fellowships and returns the data saved in the database.
     * @param {FellowshipCreateManyAndReturnArgs} args - Arguments to create many Fellowships.
     * @example
     * // Create many Fellowships
     * const fellowship = await prisma.fellowship.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Fellowships and only return the `id`
     * const fellowshipWithIdOnly = await prisma.fellowship.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FellowshipCreateManyAndReturnArgs>(args?: SelectSubset<T, FellowshipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FellowshipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Fellowship.
     * @param {FellowshipDeleteArgs} args - Arguments to delete one Fellowship.
     * @example
     * // Delete one Fellowship
     * const Fellowship = await prisma.fellowship.delete({
     *   where: {
     *     // ... filter to delete one Fellowship
     *   }
     * })
     * 
     */
    delete<T extends FellowshipDeleteArgs>(args: SelectSubset<T, FellowshipDeleteArgs<ExtArgs>>): Prisma__FellowshipClient<$Result.GetResult<Prisma.$FellowshipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Fellowship.
     * @param {FellowshipUpdateArgs} args - Arguments to update one Fellowship.
     * @example
     * // Update one Fellowship
     * const fellowship = await prisma.fellowship.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FellowshipUpdateArgs>(args: SelectSubset<T, FellowshipUpdateArgs<ExtArgs>>): Prisma__FellowshipClient<$Result.GetResult<Prisma.$FellowshipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Fellowships.
     * @param {FellowshipDeleteManyArgs} args - Arguments to filter Fellowships to delete.
     * @example
     * // Delete a few Fellowships
     * const { count } = await prisma.fellowship.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FellowshipDeleteManyArgs>(args?: SelectSubset<T, FellowshipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fellowships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FellowshipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fellowships
     * const fellowship = await prisma.fellowship.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FellowshipUpdateManyArgs>(args: SelectSubset<T, FellowshipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fellowships and returns the data updated in the database.
     * @param {FellowshipUpdateManyAndReturnArgs} args - Arguments to update many Fellowships.
     * @example
     * // Update many Fellowships
     * const fellowship = await prisma.fellowship.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Fellowships and only return the `id`
     * const fellowshipWithIdOnly = await prisma.fellowship.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FellowshipUpdateManyAndReturnArgs>(args: SelectSubset<T, FellowshipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FellowshipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Fellowship.
     * @param {FellowshipUpsertArgs} args - Arguments to update or create a Fellowship.
     * @example
     * // Update or create a Fellowship
     * const fellowship = await prisma.fellowship.upsert({
     *   create: {
     *     // ... data to create a Fellowship
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Fellowship we want to update
     *   }
     * })
     */
    upsert<T extends FellowshipUpsertArgs>(args: SelectSubset<T, FellowshipUpsertArgs<ExtArgs>>): Prisma__FellowshipClient<$Result.GetResult<Prisma.$FellowshipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Fellowships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FellowshipCountArgs} args - Arguments to filter Fellowships to count.
     * @example
     * // Count the number of Fellowships
     * const count = await prisma.fellowship.count({
     *   where: {
     *     // ... the filter for the Fellowships we want to count
     *   }
     * })
    **/
    count<T extends FellowshipCountArgs>(
      args?: Subset<T, FellowshipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FellowshipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Fellowship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FellowshipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FellowshipAggregateArgs>(args: Subset<T, FellowshipAggregateArgs>): Prisma.PrismaPromise<GetFellowshipAggregateType<T>>

    /**
     * Group by Fellowship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FellowshipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FellowshipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FellowshipGroupByArgs['orderBy'] }
        : { orderBy?: FellowshipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FellowshipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFellowshipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Fellowship model
   */
  readonly fields: FellowshipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Fellowship.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FellowshipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leader<T extends Fellowship$leaderArgs<ExtArgs> = {}>(args?: Subset<T, Fellowship$leaderArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    associate<T extends Fellowship$associateArgs<ExtArgs> = {}>(args?: Subset<T, Fellowship$associateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    members<T extends Fellowship$membersArgs<ExtArgs> = {}>(args?: Subset<T, Fellowship$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends Fellowship$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Fellowship$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reports<T extends Fellowship$reportsArgs<ExtArgs> = {}>(args?: Subset<T, Fellowship$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Fellowship model
   */
  interface FellowshipFieldRefs {
    readonly id: FieldRef<"Fellowship", 'String'>
    readonly name: FieldRef<"Fellowship", 'String'>
    readonly location: FieldRef<"Fellowship", 'String'>
    readonly leaderId: FieldRef<"Fellowship", 'String'>
    readonly associateId: FieldRef<"Fellowship", 'String'>
    readonly createdAt: FieldRef<"Fellowship", 'DateTime'>
    readonly updatedAt: FieldRef<"Fellowship", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Fellowship findUnique
   */
  export type FellowshipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fellowship
     */
    select?: FellowshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fellowship
     */
    omit?: FellowshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FellowshipInclude<ExtArgs> | null
    /**
     * Filter, which Fellowship to fetch.
     */
    where: FellowshipWhereUniqueInput
  }

  /**
   * Fellowship findUniqueOrThrow
   */
  export type FellowshipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fellowship
     */
    select?: FellowshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fellowship
     */
    omit?: FellowshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FellowshipInclude<ExtArgs> | null
    /**
     * Filter, which Fellowship to fetch.
     */
    where: FellowshipWhereUniqueInput
  }

  /**
   * Fellowship findFirst
   */
  export type FellowshipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fellowship
     */
    select?: FellowshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fellowship
     */
    omit?: FellowshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FellowshipInclude<ExtArgs> | null
    /**
     * Filter, which Fellowship to fetch.
     */
    where?: FellowshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fellowships to fetch.
     */
    orderBy?: FellowshipOrderByWithRelationInput | FellowshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fellowships.
     */
    cursor?: FellowshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fellowships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fellowships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fellowships.
     */
    distinct?: FellowshipScalarFieldEnum | FellowshipScalarFieldEnum[]
  }

  /**
   * Fellowship findFirstOrThrow
   */
  export type FellowshipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fellowship
     */
    select?: FellowshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fellowship
     */
    omit?: FellowshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FellowshipInclude<ExtArgs> | null
    /**
     * Filter, which Fellowship to fetch.
     */
    where?: FellowshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fellowships to fetch.
     */
    orderBy?: FellowshipOrderByWithRelationInput | FellowshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fellowships.
     */
    cursor?: FellowshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fellowships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fellowships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fellowships.
     */
    distinct?: FellowshipScalarFieldEnum | FellowshipScalarFieldEnum[]
  }

  /**
   * Fellowship findMany
   */
  export type FellowshipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fellowship
     */
    select?: FellowshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fellowship
     */
    omit?: FellowshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FellowshipInclude<ExtArgs> | null
    /**
     * Filter, which Fellowships to fetch.
     */
    where?: FellowshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fellowships to fetch.
     */
    orderBy?: FellowshipOrderByWithRelationInput | FellowshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Fellowships.
     */
    cursor?: FellowshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fellowships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fellowships.
     */
    skip?: number
    distinct?: FellowshipScalarFieldEnum | FellowshipScalarFieldEnum[]
  }

  /**
   * Fellowship create
   */
  export type FellowshipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fellowship
     */
    select?: FellowshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fellowship
     */
    omit?: FellowshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FellowshipInclude<ExtArgs> | null
    /**
     * The data needed to create a Fellowship.
     */
    data: XOR<FellowshipCreateInput, FellowshipUncheckedCreateInput>
  }

  /**
   * Fellowship createMany
   */
  export type FellowshipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Fellowships.
     */
    data: FellowshipCreateManyInput | FellowshipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Fellowship createManyAndReturn
   */
  export type FellowshipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fellowship
     */
    select?: FellowshipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fellowship
     */
    omit?: FellowshipOmit<ExtArgs> | null
    /**
     * The data used to create many Fellowships.
     */
    data: FellowshipCreateManyInput | FellowshipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FellowshipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Fellowship update
   */
  export type FellowshipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fellowship
     */
    select?: FellowshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fellowship
     */
    omit?: FellowshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FellowshipInclude<ExtArgs> | null
    /**
     * The data needed to update a Fellowship.
     */
    data: XOR<FellowshipUpdateInput, FellowshipUncheckedUpdateInput>
    /**
     * Choose, which Fellowship to update.
     */
    where: FellowshipWhereUniqueInput
  }

  /**
   * Fellowship updateMany
   */
  export type FellowshipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Fellowships.
     */
    data: XOR<FellowshipUpdateManyMutationInput, FellowshipUncheckedUpdateManyInput>
    /**
     * Filter which Fellowships to update
     */
    where?: FellowshipWhereInput
    /**
     * Limit how many Fellowships to update.
     */
    limit?: number
  }

  /**
   * Fellowship updateManyAndReturn
   */
  export type FellowshipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fellowship
     */
    select?: FellowshipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fellowship
     */
    omit?: FellowshipOmit<ExtArgs> | null
    /**
     * The data used to update Fellowships.
     */
    data: XOR<FellowshipUpdateManyMutationInput, FellowshipUncheckedUpdateManyInput>
    /**
     * Filter which Fellowships to update
     */
    where?: FellowshipWhereInput
    /**
     * Limit how many Fellowships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FellowshipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Fellowship upsert
   */
  export type FellowshipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fellowship
     */
    select?: FellowshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fellowship
     */
    omit?: FellowshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FellowshipInclude<ExtArgs> | null
    /**
     * The filter to search for the Fellowship to update in case it exists.
     */
    where: FellowshipWhereUniqueInput
    /**
     * In case the Fellowship found by the `where` argument doesn't exist, create a new Fellowship with this data.
     */
    create: XOR<FellowshipCreateInput, FellowshipUncheckedCreateInput>
    /**
     * In case the Fellowship was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FellowshipUpdateInput, FellowshipUncheckedUpdateInput>
  }

  /**
   * Fellowship delete
   */
  export type FellowshipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fellowship
     */
    select?: FellowshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fellowship
     */
    omit?: FellowshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FellowshipInclude<ExtArgs> | null
    /**
     * Filter which Fellowship to delete.
     */
    where: FellowshipWhereUniqueInput
  }

  /**
   * Fellowship deleteMany
   */
  export type FellowshipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fellowships to delete
     */
    where?: FellowshipWhereInput
    /**
     * Limit how many Fellowships to delete.
     */
    limit?: number
  }

  /**
   * Fellowship.leader
   */
  export type Fellowship$leaderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Fellowship.associate
   */
  export type Fellowship$associateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Fellowship.members
   */
  export type Fellowship$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    where?: MemberWhereInput
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    cursor?: MemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Fellowship.sessions
   */
  export type Fellowship$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceSession
     */
    select?: AttendanceSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceSession
     */
    omit?: AttendanceSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceSessionInclude<ExtArgs> | null
    where?: AttendanceSessionWhereInput
    orderBy?: AttendanceSessionOrderByWithRelationInput | AttendanceSessionOrderByWithRelationInput[]
    cursor?: AttendanceSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendanceSessionScalarFieldEnum | AttendanceSessionScalarFieldEnum[]
  }

  /**
   * Fellowship.reports
   */
  export type Fellowship$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    where?: MonthlyReportWhereInput
    orderBy?: MonthlyReportOrderByWithRelationInput | MonthlyReportOrderByWithRelationInput[]
    cursor?: MonthlyReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MonthlyReportScalarFieldEnum | MonthlyReportScalarFieldEnum[]
  }

  /**
   * Fellowship without action
   */
  export type FellowshipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fellowship
     */
    select?: FellowshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fellowship
     */
    omit?: FellowshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FellowshipInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    churchId: string | null
    email: string | null
    fullName: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    churchId: string | null
    email: string | null
    fullName: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    churchId: number
    email: number
    fullName: number
    passwordHash: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    churchId?: true
    email?: true
    fullName?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    churchId?: true
    email?: true
    fullName?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    churchId?: true
    email?: true
    fullName?: true
    passwordHash?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    churchId: string
    email: string
    fullName: string
    passwordHash: string
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    churchId?: boolean
    email?: boolean
    fullName?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    leading?: boolean | User$leadingArgs<ExtArgs>
    assisting?: boolean | User$assistingArgs<ExtArgs>
    submittedSessions?: boolean | User$submittedSessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    churchId?: boolean
    email?: boolean
    fullName?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    churchId?: boolean
    email?: boolean
    fullName?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    churchId?: boolean
    email?: boolean
    fullName?: boolean
    passwordHash?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "churchId" | "email" | "fullName" | "passwordHash" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leading?: boolean | User$leadingArgs<ExtArgs>
    assisting?: boolean | User$assistingArgs<ExtArgs>
    submittedSessions?: boolean | User$submittedSessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      leading: Prisma.$FellowshipPayload<ExtArgs> | null
      assisting: Prisma.$FellowshipPayload<ExtArgs> | null
      submittedSessions: Prisma.$AttendanceSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      churchId: string
      email: string
      fullName: string
      passwordHash: string
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leading<T extends User$leadingArgs<ExtArgs> = {}>(args?: Subset<T, User$leadingArgs<ExtArgs>>): Prisma__FellowshipClient<$Result.GetResult<Prisma.$FellowshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    assisting<T extends User$assistingArgs<ExtArgs> = {}>(args?: Subset<T, User$assistingArgs<ExtArgs>>): Prisma__FellowshipClient<$Result.GetResult<Prisma.$FellowshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    submittedSessions<T extends User$submittedSessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$submittedSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly churchId: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.leading
   */
  export type User$leadingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fellowship
     */
    select?: FellowshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fellowship
     */
    omit?: FellowshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FellowshipInclude<ExtArgs> | null
    where?: FellowshipWhereInput
  }

  /**
   * User.assisting
   */
  export type User$assistingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fellowship
     */
    select?: FellowshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fellowship
     */
    omit?: FellowshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FellowshipInclude<ExtArgs> | null
    where?: FellowshipWhereInput
  }

  /**
   * User.submittedSessions
   */
  export type User$submittedSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceSession
     */
    select?: AttendanceSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceSession
     */
    omit?: AttendanceSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceSessionInclude<ExtArgs> | null
    where?: AttendanceSessionWhereInput
    orderBy?: AttendanceSessionOrderByWithRelationInput | AttendanceSessionOrderByWithRelationInput[]
    cursor?: AttendanceSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendanceSessionScalarFieldEnum | AttendanceSessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Member
   */

  export type AggregateMember = {
    _count: MemberCountAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  export type MemberMinAggregateOutputType = {
    id: string | null
    fullName: string | null
    phone: string | null
    email: string | null
    qrUniqueId: string | null
    isActive: boolean | null
    fellowshipId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberMaxAggregateOutputType = {
    id: string | null
    fullName: string | null
    phone: string | null
    email: string | null
    qrUniqueId: string | null
    isActive: boolean | null
    fellowshipId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberCountAggregateOutputType = {
    id: number
    fullName: number
    phone: number
    email: number
    qrUniqueId: number
    isActive: number
    fellowshipId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MemberMinAggregateInputType = {
    id?: true
    fullName?: true
    phone?: true
    email?: true
    qrUniqueId?: true
    isActive?: true
    fellowshipId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberMaxAggregateInputType = {
    id?: true
    fullName?: true
    phone?: true
    email?: true
    qrUniqueId?: true
    isActive?: true
    fellowshipId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberCountAggregateInputType = {
    id?: true
    fullName?: true
    phone?: true
    email?: true
    qrUniqueId?: true
    isActive?: true
    fellowshipId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Member to aggregate.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Members
    **/
    _count?: true | MemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemberMaxAggregateInputType
  }

  export type GetMemberAggregateType<T extends MemberAggregateArgs> = {
        [P in keyof T & keyof AggregateMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMember[P]>
      : GetScalarType<T[P], AggregateMember[P]>
  }




  export type MemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberWhereInput
    orderBy?: MemberOrderByWithAggregationInput | MemberOrderByWithAggregationInput[]
    by: MemberScalarFieldEnum[] | MemberScalarFieldEnum
    having?: MemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberCountAggregateInputType | true
    _min?: MemberMinAggregateInputType
    _max?: MemberMaxAggregateInputType
  }

  export type MemberGroupByOutputType = {
    id: string
    fullName: string
    phone: string | null
    email: string | null
    qrUniqueId: string
    isActive: boolean
    fellowshipId: string
    createdAt: Date
    updatedAt: Date
    _count: MemberCountAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  type GetMemberGroupByPayload<T extends MemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberGroupByOutputType[P]>
            : GetScalarType<T[P], MemberGroupByOutputType[P]>
        }
      >
    >


  export type MemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    phone?: boolean
    email?: boolean
    qrUniqueId?: boolean
    isActive?: boolean
    fellowshipId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fellowship?: boolean | FellowshipDefaultArgs<ExtArgs>
    attendanceRecords?: boolean | Member$attendanceRecordsArgs<ExtArgs>
    _count?: boolean | MemberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["member"]>

  export type MemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    phone?: boolean
    email?: boolean
    qrUniqueId?: boolean
    isActive?: boolean
    fellowshipId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fellowship?: boolean | FellowshipDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["member"]>

  export type MemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    phone?: boolean
    email?: boolean
    qrUniqueId?: boolean
    isActive?: boolean
    fellowshipId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fellowship?: boolean | FellowshipDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["member"]>

  export type MemberSelectScalar = {
    id?: boolean
    fullName?: boolean
    phone?: boolean
    email?: boolean
    qrUniqueId?: boolean
    isActive?: boolean
    fellowshipId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "phone" | "email" | "qrUniqueId" | "isActive" | "fellowshipId" | "createdAt" | "updatedAt", ExtArgs["result"]["member"]>
  export type MemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fellowship?: boolean | FellowshipDefaultArgs<ExtArgs>
    attendanceRecords?: boolean | Member$attendanceRecordsArgs<ExtArgs>
    _count?: boolean | MemberCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fellowship?: boolean | FellowshipDefaultArgs<ExtArgs>
  }
  export type MemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fellowship?: boolean | FellowshipDefaultArgs<ExtArgs>
  }

  export type $MemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Member"
    objects: {
      fellowship: Prisma.$FellowshipPayload<ExtArgs>
      attendanceRecords: Prisma.$AttendanceRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fullName: string
      phone: string | null
      email: string | null
      qrUniqueId: string
      isActive: boolean
      fellowshipId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["member"]>
    composites: {}
  }

  type MemberGetPayload<S extends boolean | null | undefined | MemberDefaultArgs> = $Result.GetResult<Prisma.$MemberPayload, S>

  type MemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemberCountAggregateInputType | true
    }

  export interface MemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Member'], meta: { name: 'Member' } }
    /**
     * Find zero or one Member that matches the filter.
     * @param {MemberFindUniqueArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemberFindUniqueArgs>(args: SelectSubset<T, MemberFindUniqueArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Member that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemberFindUniqueOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemberFindUniqueOrThrowArgs>(args: SelectSubset<T, MemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Member that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemberFindFirstArgs>(args?: SelectSubset<T, MemberFindFirstArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Member that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemberFindFirstOrThrowArgs>(args?: SelectSubset<T, MemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Members that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Members
     * const members = await prisma.member.findMany()
     * 
     * // Get first 10 Members
     * const members = await prisma.member.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memberWithIdOnly = await prisma.member.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemberFindManyArgs>(args?: SelectSubset<T, MemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Member.
     * @param {MemberCreateArgs} args - Arguments to create a Member.
     * @example
     * // Create one Member
     * const Member = await prisma.member.create({
     *   data: {
     *     // ... data to create a Member
     *   }
     * })
     * 
     */
    create<T extends MemberCreateArgs>(args: SelectSubset<T, MemberCreateArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Members.
     * @param {MemberCreateManyArgs} args - Arguments to create many Members.
     * @example
     * // Create many Members
     * const member = await prisma.member.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemberCreateManyArgs>(args?: SelectSubset<T, MemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Members and returns the data saved in the database.
     * @param {MemberCreateManyAndReturnArgs} args - Arguments to create many Members.
     * @example
     * // Create many Members
     * const member = await prisma.member.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Members and only return the `id`
     * const memberWithIdOnly = await prisma.member.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemberCreateManyAndReturnArgs>(args?: SelectSubset<T, MemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Member.
     * @param {MemberDeleteArgs} args - Arguments to delete one Member.
     * @example
     * // Delete one Member
     * const Member = await prisma.member.delete({
     *   where: {
     *     // ... filter to delete one Member
     *   }
     * })
     * 
     */
    delete<T extends MemberDeleteArgs>(args: SelectSubset<T, MemberDeleteArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Member.
     * @param {MemberUpdateArgs} args - Arguments to update one Member.
     * @example
     * // Update one Member
     * const member = await prisma.member.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemberUpdateArgs>(args: SelectSubset<T, MemberUpdateArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Members.
     * @param {MemberDeleteManyArgs} args - Arguments to filter Members to delete.
     * @example
     * // Delete a few Members
     * const { count } = await prisma.member.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemberDeleteManyArgs>(args?: SelectSubset<T, MemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Members
     * const member = await prisma.member.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemberUpdateManyArgs>(args: SelectSubset<T, MemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Members and returns the data updated in the database.
     * @param {MemberUpdateManyAndReturnArgs} args - Arguments to update many Members.
     * @example
     * // Update many Members
     * const member = await prisma.member.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Members and only return the `id`
     * const memberWithIdOnly = await prisma.member.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MemberUpdateManyAndReturnArgs>(args: SelectSubset<T, MemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Member.
     * @param {MemberUpsertArgs} args - Arguments to update or create a Member.
     * @example
     * // Update or create a Member
     * const member = await prisma.member.upsert({
     *   create: {
     *     // ... data to create a Member
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Member we want to update
     *   }
     * })
     */
    upsert<T extends MemberUpsertArgs>(args: SelectSubset<T, MemberUpsertArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberCountArgs} args - Arguments to filter Members to count.
     * @example
     * // Count the number of Members
     * const count = await prisma.member.count({
     *   where: {
     *     // ... the filter for the Members we want to count
     *   }
     * })
    **/
    count<T extends MemberCountArgs>(
      args?: Subset<T, MemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemberAggregateArgs>(args: Subset<T, MemberAggregateArgs>): Prisma.PrismaPromise<GetMemberAggregateType<T>>

    /**
     * Group by Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemberGroupByArgs['orderBy'] }
        : { orderBy?: MemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Member model
   */
  readonly fields: MemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Member.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fellowship<T extends FellowshipDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FellowshipDefaultArgs<ExtArgs>>): Prisma__FellowshipClient<$Result.GetResult<Prisma.$FellowshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    attendanceRecords<T extends Member$attendanceRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Member$attendanceRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Member model
   */
  interface MemberFieldRefs {
    readonly id: FieldRef<"Member", 'String'>
    readonly fullName: FieldRef<"Member", 'String'>
    readonly phone: FieldRef<"Member", 'String'>
    readonly email: FieldRef<"Member", 'String'>
    readonly qrUniqueId: FieldRef<"Member", 'String'>
    readonly isActive: FieldRef<"Member", 'Boolean'>
    readonly fellowshipId: FieldRef<"Member", 'String'>
    readonly createdAt: FieldRef<"Member", 'DateTime'>
    readonly updatedAt: FieldRef<"Member", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Member findUnique
   */
  export type MemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member findUniqueOrThrow
   */
  export type MemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member findFirst
   */
  export type MemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member findFirstOrThrow
   */
  export type MemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member findMany
   */
  export type MemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Members to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }

  /**
   * Member create
   */
  export type MemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The data needed to create a Member.
     */
    data: XOR<MemberCreateInput, MemberUncheckedCreateInput>
  }

  /**
   * Member createMany
   */
  export type MemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Members.
     */
    data: MemberCreateManyInput | MemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Member createManyAndReturn
   */
  export type MemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * The data used to create many Members.
     */
    data: MemberCreateManyInput | MemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Member update
   */
  export type MemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The data needed to update a Member.
     */
    data: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>
    /**
     * Choose, which Member to update.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member updateMany
   */
  export type MemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Members.
     */
    data: XOR<MemberUpdateManyMutationInput, MemberUncheckedUpdateManyInput>
    /**
     * Filter which Members to update
     */
    where?: MemberWhereInput
    /**
     * Limit how many Members to update.
     */
    limit?: number
  }

  /**
   * Member updateManyAndReturn
   */
  export type MemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * The data used to update Members.
     */
    data: XOR<MemberUpdateManyMutationInput, MemberUncheckedUpdateManyInput>
    /**
     * Filter which Members to update
     */
    where?: MemberWhereInput
    /**
     * Limit how many Members to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Member upsert
   */
  export type MemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The filter to search for the Member to update in case it exists.
     */
    where: MemberWhereUniqueInput
    /**
     * In case the Member found by the `where` argument doesn't exist, create a new Member with this data.
     */
    create: XOR<MemberCreateInput, MemberUncheckedCreateInput>
    /**
     * In case the Member was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>
  }

  /**
   * Member delete
   */
  export type MemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter which Member to delete.
     */
    where: MemberWhereUniqueInput
  }

  /**
   * Member deleteMany
   */
  export type MemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Members to delete
     */
    where?: MemberWhereInput
    /**
     * Limit how many Members to delete.
     */
    limit?: number
  }

  /**
   * Member.attendanceRecords
   */
  export type Member$attendanceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    where?: AttendanceRecordWhereInput
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    cursor?: AttendanceRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[]
  }

  /**
   * Member without action
   */
  export type MemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Member
     */
    omit?: MemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberInclude<ExtArgs> | null
  }


  /**
   * Model AttendanceSession
   */

  export type AggregateAttendanceSession = {
    _count: AttendanceSessionCountAggregateOutputType | null
    _avg: AttendanceSessionAvgAggregateOutputType | null
    _sum: AttendanceSessionSumAggregateOutputType | null
    _min: AttendanceSessionMinAggregateOutputType | null
    _max: AttendanceSessionMaxAggregateOutputType | null
  }

  export type AttendanceSessionAvgAggregateOutputType = {
    weekNumber: number | null
  }

  export type AttendanceSessionSumAggregateOutputType = {
    weekNumber: number | null
  }

  export type AttendanceSessionMinAggregateOutputType = {
    id: string | null
    fellowshipId: string | null
    weekNumber: number | null
    monthYear: string | null
    meetingDate: Date | null
    isSubmitted: boolean | null
    submittedAt: Date | null
    submittedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AttendanceSessionMaxAggregateOutputType = {
    id: string | null
    fellowshipId: string | null
    weekNumber: number | null
    monthYear: string | null
    meetingDate: Date | null
    isSubmitted: boolean | null
    submittedAt: Date | null
    submittedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AttendanceSessionCountAggregateOutputType = {
    id: number
    fellowshipId: number
    weekNumber: number
    monthYear: number
    meetingDate: number
    isSubmitted: number
    submittedAt: number
    submittedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AttendanceSessionAvgAggregateInputType = {
    weekNumber?: true
  }

  export type AttendanceSessionSumAggregateInputType = {
    weekNumber?: true
  }

  export type AttendanceSessionMinAggregateInputType = {
    id?: true
    fellowshipId?: true
    weekNumber?: true
    monthYear?: true
    meetingDate?: true
    isSubmitted?: true
    submittedAt?: true
    submittedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AttendanceSessionMaxAggregateInputType = {
    id?: true
    fellowshipId?: true
    weekNumber?: true
    monthYear?: true
    meetingDate?: true
    isSubmitted?: true
    submittedAt?: true
    submittedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AttendanceSessionCountAggregateInputType = {
    id?: true
    fellowshipId?: true
    weekNumber?: true
    monthYear?: true
    meetingDate?: true
    isSubmitted?: true
    submittedAt?: true
    submittedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AttendanceSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AttendanceSession to aggregate.
     */
    where?: AttendanceSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceSessions to fetch.
     */
    orderBy?: AttendanceSessionOrderByWithRelationInput | AttendanceSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttendanceSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AttendanceSessions
    **/
    _count?: true | AttendanceSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttendanceSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttendanceSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendanceSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendanceSessionMaxAggregateInputType
  }

  export type GetAttendanceSessionAggregateType<T extends AttendanceSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendanceSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendanceSession[P]>
      : GetScalarType<T[P], AggregateAttendanceSession[P]>
  }




  export type AttendanceSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceSessionWhereInput
    orderBy?: AttendanceSessionOrderByWithAggregationInput | AttendanceSessionOrderByWithAggregationInput[]
    by: AttendanceSessionScalarFieldEnum[] | AttendanceSessionScalarFieldEnum
    having?: AttendanceSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendanceSessionCountAggregateInputType | true
    _avg?: AttendanceSessionAvgAggregateInputType
    _sum?: AttendanceSessionSumAggregateInputType
    _min?: AttendanceSessionMinAggregateInputType
    _max?: AttendanceSessionMaxAggregateInputType
  }

  export type AttendanceSessionGroupByOutputType = {
    id: string
    fellowshipId: string
    weekNumber: number
    monthYear: string
    meetingDate: Date
    isSubmitted: boolean
    submittedAt: Date | null
    submittedBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: AttendanceSessionCountAggregateOutputType | null
    _avg: AttendanceSessionAvgAggregateOutputType | null
    _sum: AttendanceSessionSumAggregateOutputType | null
    _min: AttendanceSessionMinAggregateOutputType | null
    _max: AttendanceSessionMaxAggregateOutputType | null
  }

  type GetAttendanceSessionGroupByPayload<T extends AttendanceSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendanceSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendanceSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendanceSessionGroupByOutputType[P]>
            : GetScalarType<T[P], AttendanceSessionGroupByOutputType[P]>
        }
      >
    >


  export type AttendanceSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fellowshipId?: boolean
    weekNumber?: boolean
    monthYear?: boolean
    meetingDate?: boolean
    isSubmitted?: boolean
    submittedAt?: boolean
    submittedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fellowship?: boolean | FellowshipDefaultArgs<ExtArgs>
    records?: boolean | AttendanceSession$recordsArgs<ExtArgs>
    submitter?: boolean | AttendanceSession$submitterArgs<ExtArgs>
    _count?: boolean | AttendanceSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendanceSession"]>

  export type AttendanceSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fellowshipId?: boolean
    weekNumber?: boolean
    monthYear?: boolean
    meetingDate?: boolean
    isSubmitted?: boolean
    submittedAt?: boolean
    submittedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fellowship?: boolean | FellowshipDefaultArgs<ExtArgs>
    submitter?: boolean | AttendanceSession$submitterArgs<ExtArgs>
  }, ExtArgs["result"]["attendanceSession"]>

  export type AttendanceSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fellowshipId?: boolean
    weekNumber?: boolean
    monthYear?: boolean
    meetingDate?: boolean
    isSubmitted?: boolean
    submittedAt?: boolean
    submittedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fellowship?: boolean | FellowshipDefaultArgs<ExtArgs>
    submitter?: boolean | AttendanceSession$submitterArgs<ExtArgs>
  }, ExtArgs["result"]["attendanceSession"]>

  export type AttendanceSessionSelectScalar = {
    id?: boolean
    fellowshipId?: boolean
    weekNumber?: boolean
    monthYear?: boolean
    meetingDate?: boolean
    isSubmitted?: boolean
    submittedAt?: boolean
    submittedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AttendanceSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fellowshipId" | "weekNumber" | "monthYear" | "meetingDate" | "isSubmitted" | "submittedAt" | "submittedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["attendanceSession"]>
  export type AttendanceSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fellowship?: boolean | FellowshipDefaultArgs<ExtArgs>
    records?: boolean | AttendanceSession$recordsArgs<ExtArgs>
    submitter?: boolean | AttendanceSession$submitterArgs<ExtArgs>
    _count?: boolean | AttendanceSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AttendanceSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fellowship?: boolean | FellowshipDefaultArgs<ExtArgs>
    submitter?: boolean | AttendanceSession$submitterArgs<ExtArgs>
  }
  export type AttendanceSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fellowship?: boolean | FellowshipDefaultArgs<ExtArgs>
    submitter?: boolean | AttendanceSession$submitterArgs<ExtArgs>
  }

  export type $AttendanceSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AttendanceSession"
    objects: {
      fellowship: Prisma.$FellowshipPayload<ExtArgs>
      records: Prisma.$AttendanceRecordPayload<ExtArgs>[]
      submitter: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fellowshipId: string
      weekNumber: number
      monthYear: string
      meetingDate: Date
      isSubmitted: boolean
      submittedAt: Date | null
      submittedBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["attendanceSession"]>
    composites: {}
  }

  type AttendanceSessionGetPayload<S extends boolean | null | undefined | AttendanceSessionDefaultArgs> = $Result.GetResult<Prisma.$AttendanceSessionPayload, S>

  type AttendanceSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttendanceSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttendanceSessionCountAggregateInputType | true
    }

  export interface AttendanceSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AttendanceSession'], meta: { name: 'AttendanceSession' } }
    /**
     * Find zero or one AttendanceSession that matches the filter.
     * @param {AttendanceSessionFindUniqueArgs} args - Arguments to find a AttendanceSession
     * @example
     * // Get one AttendanceSession
     * const attendanceSession = await prisma.attendanceSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttendanceSessionFindUniqueArgs>(args: SelectSubset<T, AttendanceSessionFindUniqueArgs<ExtArgs>>): Prisma__AttendanceSessionClient<$Result.GetResult<Prisma.$AttendanceSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AttendanceSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttendanceSessionFindUniqueOrThrowArgs} args - Arguments to find a AttendanceSession
     * @example
     * // Get one AttendanceSession
     * const attendanceSession = await prisma.attendanceSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttendanceSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, AttendanceSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttendanceSessionClient<$Result.GetResult<Prisma.$AttendanceSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AttendanceSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceSessionFindFirstArgs} args - Arguments to find a AttendanceSession
     * @example
     * // Get one AttendanceSession
     * const attendanceSession = await prisma.attendanceSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttendanceSessionFindFirstArgs>(args?: SelectSubset<T, AttendanceSessionFindFirstArgs<ExtArgs>>): Prisma__AttendanceSessionClient<$Result.GetResult<Prisma.$AttendanceSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AttendanceSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceSessionFindFirstOrThrowArgs} args - Arguments to find a AttendanceSession
     * @example
     * // Get one AttendanceSession
     * const attendanceSession = await prisma.attendanceSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttendanceSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, AttendanceSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttendanceSessionClient<$Result.GetResult<Prisma.$AttendanceSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AttendanceSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AttendanceSessions
     * const attendanceSessions = await prisma.attendanceSession.findMany()
     * 
     * // Get first 10 AttendanceSessions
     * const attendanceSessions = await prisma.attendanceSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendanceSessionWithIdOnly = await prisma.attendanceSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttendanceSessionFindManyArgs>(args?: SelectSubset<T, AttendanceSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AttendanceSession.
     * @param {AttendanceSessionCreateArgs} args - Arguments to create a AttendanceSession.
     * @example
     * // Create one AttendanceSession
     * const AttendanceSession = await prisma.attendanceSession.create({
     *   data: {
     *     // ... data to create a AttendanceSession
     *   }
     * })
     * 
     */
    create<T extends AttendanceSessionCreateArgs>(args: SelectSubset<T, AttendanceSessionCreateArgs<ExtArgs>>): Prisma__AttendanceSessionClient<$Result.GetResult<Prisma.$AttendanceSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AttendanceSessions.
     * @param {AttendanceSessionCreateManyArgs} args - Arguments to create many AttendanceSessions.
     * @example
     * // Create many AttendanceSessions
     * const attendanceSession = await prisma.attendanceSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttendanceSessionCreateManyArgs>(args?: SelectSubset<T, AttendanceSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AttendanceSessions and returns the data saved in the database.
     * @param {AttendanceSessionCreateManyAndReturnArgs} args - Arguments to create many AttendanceSessions.
     * @example
     * // Create many AttendanceSessions
     * const attendanceSession = await prisma.attendanceSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AttendanceSessions and only return the `id`
     * const attendanceSessionWithIdOnly = await prisma.attendanceSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttendanceSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, AttendanceSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AttendanceSession.
     * @param {AttendanceSessionDeleteArgs} args - Arguments to delete one AttendanceSession.
     * @example
     * // Delete one AttendanceSession
     * const AttendanceSession = await prisma.attendanceSession.delete({
     *   where: {
     *     // ... filter to delete one AttendanceSession
     *   }
     * })
     * 
     */
    delete<T extends AttendanceSessionDeleteArgs>(args: SelectSubset<T, AttendanceSessionDeleteArgs<ExtArgs>>): Prisma__AttendanceSessionClient<$Result.GetResult<Prisma.$AttendanceSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AttendanceSession.
     * @param {AttendanceSessionUpdateArgs} args - Arguments to update one AttendanceSession.
     * @example
     * // Update one AttendanceSession
     * const attendanceSession = await prisma.attendanceSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttendanceSessionUpdateArgs>(args: SelectSubset<T, AttendanceSessionUpdateArgs<ExtArgs>>): Prisma__AttendanceSessionClient<$Result.GetResult<Prisma.$AttendanceSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AttendanceSessions.
     * @param {AttendanceSessionDeleteManyArgs} args - Arguments to filter AttendanceSessions to delete.
     * @example
     * // Delete a few AttendanceSessions
     * const { count } = await prisma.attendanceSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttendanceSessionDeleteManyArgs>(args?: SelectSubset<T, AttendanceSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AttendanceSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AttendanceSessions
     * const attendanceSession = await prisma.attendanceSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttendanceSessionUpdateManyArgs>(args: SelectSubset<T, AttendanceSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AttendanceSessions and returns the data updated in the database.
     * @param {AttendanceSessionUpdateManyAndReturnArgs} args - Arguments to update many AttendanceSessions.
     * @example
     * // Update many AttendanceSessions
     * const attendanceSession = await prisma.attendanceSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AttendanceSessions and only return the `id`
     * const attendanceSessionWithIdOnly = await prisma.attendanceSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AttendanceSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, AttendanceSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AttendanceSession.
     * @param {AttendanceSessionUpsertArgs} args - Arguments to update or create a AttendanceSession.
     * @example
     * // Update or create a AttendanceSession
     * const attendanceSession = await prisma.attendanceSession.upsert({
     *   create: {
     *     // ... data to create a AttendanceSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AttendanceSession we want to update
     *   }
     * })
     */
    upsert<T extends AttendanceSessionUpsertArgs>(args: SelectSubset<T, AttendanceSessionUpsertArgs<ExtArgs>>): Prisma__AttendanceSessionClient<$Result.GetResult<Prisma.$AttendanceSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AttendanceSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceSessionCountArgs} args - Arguments to filter AttendanceSessions to count.
     * @example
     * // Count the number of AttendanceSessions
     * const count = await prisma.attendanceSession.count({
     *   where: {
     *     // ... the filter for the AttendanceSessions we want to count
     *   }
     * })
    **/
    count<T extends AttendanceSessionCountArgs>(
      args?: Subset<T, AttendanceSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendanceSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AttendanceSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttendanceSessionAggregateArgs>(args: Subset<T, AttendanceSessionAggregateArgs>): Prisma.PrismaPromise<GetAttendanceSessionAggregateType<T>>

    /**
     * Group by AttendanceSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttendanceSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttendanceSessionGroupByArgs['orderBy'] }
        : { orderBy?: AttendanceSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttendanceSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendanceSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AttendanceSession model
   */
  readonly fields: AttendanceSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AttendanceSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttendanceSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fellowship<T extends FellowshipDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FellowshipDefaultArgs<ExtArgs>>): Prisma__FellowshipClient<$Result.GetResult<Prisma.$FellowshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    records<T extends AttendanceSession$recordsArgs<ExtArgs> = {}>(args?: Subset<T, AttendanceSession$recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    submitter<T extends AttendanceSession$submitterArgs<ExtArgs> = {}>(args?: Subset<T, AttendanceSession$submitterArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AttendanceSession model
   */
  interface AttendanceSessionFieldRefs {
    readonly id: FieldRef<"AttendanceSession", 'String'>
    readonly fellowshipId: FieldRef<"AttendanceSession", 'String'>
    readonly weekNumber: FieldRef<"AttendanceSession", 'Int'>
    readonly monthYear: FieldRef<"AttendanceSession", 'String'>
    readonly meetingDate: FieldRef<"AttendanceSession", 'DateTime'>
    readonly isSubmitted: FieldRef<"AttendanceSession", 'Boolean'>
    readonly submittedAt: FieldRef<"AttendanceSession", 'DateTime'>
    readonly submittedBy: FieldRef<"AttendanceSession", 'String'>
    readonly createdAt: FieldRef<"AttendanceSession", 'DateTime'>
    readonly updatedAt: FieldRef<"AttendanceSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AttendanceSession findUnique
   */
  export type AttendanceSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceSession
     */
    select?: AttendanceSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceSession
     */
    omit?: AttendanceSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceSessionInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceSession to fetch.
     */
    where: AttendanceSessionWhereUniqueInput
  }

  /**
   * AttendanceSession findUniqueOrThrow
   */
  export type AttendanceSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceSession
     */
    select?: AttendanceSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceSession
     */
    omit?: AttendanceSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceSessionInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceSession to fetch.
     */
    where: AttendanceSessionWhereUniqueInput
  }

  /**
   * AttendanceSession findFirst
   */
  export type AttendanceSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceSession
     */
    select?: AttendanceSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceSession
     */
    omit?: AttendanceSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceSessionInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceSession to fetch.
     */
    where?: AttendanceSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceSessions to fetch.
     */
    orderBy?: AttendanceSessionOrderByWithRelationInput | AttendanceSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AttendanceSessions.
     */
    cursor?: AttendanceSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AttendanceSessions.
     */
    distinct?: AttendanceSessionScalarFieldEnum | AttendanceSessionScalarFieldEnum[]
  }

  /**
   * AttendanceSession findFirstOrThrow
   */
  export type AttendanceSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceSession
     */
    select?: AttendanceSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceSession
     */
    omit?: AttendanceSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceSessionInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceSession to fetch.
     */
    where?: AttendanceSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceSessions to fetch.
     */
    orderBy?: AttendanceSessionOrderByWithRelationInput | AttendanceSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AttendanceSessions.
     */
    cursor?: AttendanceSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AttendanceSessions.
     */
    distinct?: AttendanceSessionScalarFieldEnum | AttendanceSessionScalarFieldEnum[]
  }

  /**
   * AttendanceSession findMany
   */
  export type AttendanceSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceSession
     */
    select?: AttendanceSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceSession
     */
    omit?: AttendanceSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceSessionInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceSessions to fetch.
     */
    where?: AttendanceSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceSessions to fetch.
     */
    orderBy?: AttendanceSessionOrderByWithRelationInput | AttendanceSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AttendanceSessions.
     */
    cursor?: AttendanceSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceSessions.
     */
    skip?: number
    distinct?: AttendanceSessionScalarFieldEnum | AttendanceSessionScalarFieldEnum[]
  }

  /**
   * AttendanceSession create
   */
  export type AttendanceSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceSession
     */
    select?: AttendanceSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceSession
     */
    omit?: AttendanceSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a AttendanceSession.
     */
    data: XOR<AttendanceSessionCreateInput, AttendanceSessionUncheckedCreateInput>
  }

  /**
   * AttendanceSession createMany
   */
  export type AttendanceSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AttendanceSessions.
     */
    data: AttendanceSessionCreateManyInput | AttendanceSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AttendanceSession createManyAndReturn
   */
  export type AttendanceSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceSession
     */
    select?: AttendanceSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceSession
     */
    omit?: AttendanceSessionOmit<ExtArgs> | null
    /**
     * The data used to create many AttendanceSessions.
     */
    data: AttendanceSessionCreateManyInput | AttendanceSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AttendanceSession update
   */
  export type AttendanceSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceSession
     */
    select?: AttendanceSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceSession
     */
    omit?: AttendanceSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a AttendanceSession.
     */
    data: XOR<AttendanceSessionUpdateInput, AttendanceSessionUncheckedUpdateInput>
    /**
     * Choose, which AttendanceSession to update.
     */
    where: AttendanceSessionWhereUniqueInput
  }

  /**
   * AttendanceSession updateMany
   */
  export type AttendanceSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AttendanceSessions.
     */
    data: XOR<AttendanceSessionUpdateManyMutationInput, AttendanceSessionUncheckedUpdateManyInput>
    /**
     * Filter which AttendanceSessions to update
     */
    where?: AttendanceSessionWhereInput
    /**
     * Limit how many AttendanceSessions to update.
     */
    limit?: number
  }

  /**
   * AttendanceSession updateManyAndReturn
   */
  export type AttendanceSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceSession
     */
    select?: AttendanceSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceSession
     */
    omit?: AttendanceSessionOmit<ExtArgs> | null
    /**
     * The data used to update AttendanceSessions.
     */
    data: XOR<AttendanceSessionUpdateManyMutationInput, AttendanceSessionUncheckedUpdateManyInput>
    /**
     * Filter which AttendanceSessions to update
     */
    where?: AttendanceSessionWhereInput
    /**
     * Limit how many AttendanceSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AttendanceSession upsert
   */
  export type AttendanceSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceSession
     */
    select?: AttendanceSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceSession
     */
    omit?: AttendanceSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the AttendanceSession to update in case it exists.
     */
    where: AttendanceSessionWhereUniqueInput
    /**
     * In case the AttendanceSession found by the `where` argument doesn't exist, create a new AttendanceSession with this data.
     */
    create: XOR<AttendanceSessionCreateInput, AttendanceSessionUncheckedCreateInput>
    /**
     * In case the AttendanceSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttendanceSessionUpdateInput, AttendanceSessionUncheckedUpdateInput>
  }

  /**
   * AttendanceSession delete
   */
  export type AttendanceSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceSession
     */
    select?: AttendanceSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceSession
     */
    omit?: AttendanceSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceSessionInclude<ExtArgs> | null
    /**
     * Filter which AttendanceSession to delete.
     */
    where: AttendanceSessionWhereUniqueInput
  }

  /**
   * AttendanceSession deleteMany
   */
  export type AttendanceSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AttendanceSessions to delete
     */
    where?: AttendanceSessionWhereInput
    /**
     * Limit how many AttendanceSessions to delete.
     */
    limit?: number
  }

  /**
   * AttendanceSession.records
   */
  export type AttendanceSession$recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    where?: AttendanceRecordWhereInput
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    cursor?: AttendanceRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[]
  }

  /**
   * AttendanceSession.submitter
   */
  export type AttendanceSession$submitterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AttendanceSession without action
   */
  export type AttendanceSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceSession
     */
    select?: AttendanceSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceSession
     */
    omit?: AttendanceSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceSessionInclude<ExtArgs> | null
  }


  /**
   * Model AttendanceRecord
   */

  export type AggregateAttendanceRecord = {
    _count: AttendanceRecordCountAggregateOutputType | null
    _min: AttendanceRecordMinAggregateOutputType | null
    _max: AttendanceRecordMaxAggregateOutputType | null
  }

  export type AttendanceRecordMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    memberId: string | null
    checkInMethod: string | null
    checkedInBy: string | null
    checkedInAt: Date | null
  }

  export type AttendanceRecordMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    memberId: string | null
    checkInMethod: string | null
    checkedInBy: string | null
    checkedInAt: Date | null
  }

  export type AttendanceRecordCountAggregateOutputType = {
    id: number
    sessionId: number
    memberId: number
    checkInMethod: number
    checkedInBy: number
    checkedInAt: number
    _all: number
  }


  export type AttendanceRecordMinAggregateInputType = {
    id?: true
    sessionId?: true
    memberId?: true
    checkInMethod?: true
    checkedInBy?: true
    checkedInAt?: true
  }

  export type AttendanceRecordMaxAggregateInputType = {
    id?: true
    sessionId?: true
    memberId?: true
    checkInMethod?: true
    checkedInBy?: true
    checkedInAt?: true
  }

  export type AttendanceRecordCountAggregateInputType = {
    id?: true
    sessionId?: true
    memberId?: true
    checkInMethod?: true
    checkedInBy?: true
    checkedInAt?: true
    _all?: true
  }

  export type AttendanceRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AttendanceRecord to aggregate.
     */
    where?: AttendanceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttendanceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AttendanceRecords
    **/
    _count?: true | AttendanceRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendanceRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendanceRecordMaxAggregateInputType
  }

  export type GetAttendanceRecordAggregateType<T extends AttendanceRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendanceRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendanceRecord[P]>
      : GetScalarType<T[P], AggregateAttendanceRecord[P]>
  }




  export type AttendanceRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceRecordWhereInput
    orderBy?: AttendanceRecordOrderByWithAggregationInput | AttendanceRecordOrderByWithAggregationInput[]
    by: AttendanceRecordScalarFieldEnum[] | AttendanceRecordScalarFieldEnum
    having?: AttendanceRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendanceRecordCountAggregateInputType | true
    _min?: AttendanceRecordMinAggregateInputType
    _max?: AttendanceRecordMaxAggregateInputType
  }

  export type AttendanceRecordGroupByOutputType = {
    id: string
    sessionId: string
    memberId: string
    checkInMethod: string
    checkedInBy: string
    checkedInAt: Date
    _count: AttendanceRecordCountAggregateOutputType | null
    _min: AttendanceRecordMinAggregateOutputType | null
    _max: AttendanceRecordMaxAggregateOutputType | null
  }

  type GetAttendanceRecordGroupByPayload<T extends AttendanceRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendanceRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendanceRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendanceRecordGroupByOutputType[P]>
            : GetScalarType<T[P], AttendanceRecordGroupByOutputType[P]>
        }
      >
    >


  export type AttendanceRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    memberId?: boolean
    checkInMethod?: boolean
    checkedInBy?: boolean
    checkedInAt?: boolean
    session?: boolean | AttendanceSessionDefaultArgs<ExtArgs>
    member?: boolean | MemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendanceRecord"]>

  export type AttendanceRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    memberId?: boolean
    checkInMethod?: boolean
    checkedInBy?: boolean
    checkedInAt?: boolean
    session?: boolean | AttendanceSessionDefaultArgs<ExtArgs>
    member?: boolean | MemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendanceRecord"]>

  export type AttendanceRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    memberId?: boolean
    checkInMethod?: boolean
    checkedInBy?: boolean
    checkedInAt?: boolean
    session?: boolean | AttendanceSessionDefaultArgs<ExtArgs>
    member?: boolean | MemberDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendanceRecord"]>

  export type AttendanceRecordSelectScalar = {
    id?: boolean
    sessionId?: boolean
    memberId?: boolean
    checkInMethod?: boolean
    checkedInBy?: boolean
    checkedInAt?: boolean
  }

  export type AttendanceRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "memberId" | "checkInMethod" | "checkedInBy" | "checkedInAt", ExtArgs["result"]["attendanceRecord"]>
  export type AttendanceRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | AttendanceSessionDefaultArgs<ExtArgs>
    member?: boolean | MemberDefaultArgs<ExtArgs>
  }
  export type AttendanceRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | AttendanceSessionDefaultArgs<ExtArgs>
    member?: boolean | MemberDefaultArgs<ExtArgs>
  }
  export type AttendanceRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | AttendanceSessionDefaultArgs<ExtArgs>
    member?: boolean | MemberDefaultArgs<ExtArgs>
  }

  export type $AttendanceRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AttendanceRecord"
    objects: {
      session: Prisma.$AttendanceSessionPayload<ExtArgs>
      member: Prisma.$MemberPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      memberId: string
      checkInMethod: string
      checkedInBy: string
      checkedInAt: Date
    }, ExtArgs["result"]["attendanceRecord"]>
    composites: {}
  }

  type AttendanceRecordGetPayload<S extends boolean | null | undefined | AttendanceRecordDefaultArgs> = $Result.GetResult<Prisma.$AttendanceRecordPayload, S>

  type AttendanceRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttendanceRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttendanceRecordCountAggregateInputType | true
    }

  export interface AttendanceRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AttendanceRecord'], meta: { name: 'AttendanceRecord' } }
    /**
     * Find zero or one AttendanceRecord that matches the filter.
     * @param {AttendanceRecordFindUniqueArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttendanceRecordFindUniqueArgs>(args: SelectSubset<T, AttendanceRecordFindUniqueArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AttendanceRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttendanceRecordFindUniqueOrThrowArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttendanceRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, AttendanceRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AttendanceRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordFindFirstArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttendanceRecordFindFirstArgs>(args?: SelectSubset<T, AttendanceRecordFindFirstArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AttendanceRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordFindFirstOrThrowArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttendanceRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, AttendanceRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AttendanceRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AttendanceRecords
     * const attendanceRecords = await prisma.attendanceRecord.findMany()
     * 
     * // Get first 10 AttendanceRecords
     * const attendanceRecords = await prisma.attendanceRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendanceRecordWithIdOnly = await prisma.attendanceRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttendanceRecordFindManyArgs>(args?: SelectSubset<T, AttendanceRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AttendanceRecord.
     * @param {AttendanceRecordCreateArgs} args - Arguments to create a AttendanceRecord.
     * @example
     * // Create one AttendanceRecord
     * const AttendanceRecord = await prisma.attendanceRecord.create({
     *   data: {
     *     // ... data to create a AttendanceRecord
     *   }
     * })
     * 
     */
    create<T extends AttendanceRecordCreateArgs>(args: SelectSubset<T, AttendanceRecordCreateArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AttendanceRecords.
     * @param {AttendanceRecordCreateManyArgs} args - Arguments to create many AttendanceRecords.
     * @example
     * // Create many AttendanceRecords
     * const attendanceRecord = await prisma.attendanceRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttendanceRecordCreateManyArgs>(args?: SelectSubset<T, AttendanceRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AttendanceRecords and returns the data saved in the database.
     * @param {AttendanceRecordCreateManyAndReturnArgs} args - Arguments to create many AttendanceRecords.
     * @example
     * // Create many AttendanceRecords
     * const attendanceRecord = await prisma.attendanceRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AttendanceRecords and only return the `id`
     * const attendanceRecordWithIdOnly = await prisma.attendanceRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttendanceRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, AttendanceRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AttendanceRecord.
     * @param {AttendanceRecordDeleteArgs} args - Arguments to delete one AttendanceRecord.
     * @example
     * // Delete one AttendanceRecord
     * const AttendanceRecord = await prisma.attendanceRecord.delete({
     *   where: {
     *     // ... filter to delete one AttendanceRecord
     *   }
     * })
     * 
     */
    delete<T extends AttendanceRecordDeleteArgs>(args: SelectSubset<T, AttendanceRecordDeleteArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AttendanceRecord.
     * @param {AttendanceRecordUpdateArgs} args - Arguments to update one AttendanceRecord.
     * @example
     * // Update one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttendanceRecordUpdateArgs>(args: SelectSubset<T, AttendanceRecordUpdateArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AttendanceRecords.
     * @param {AttendanceRecordDeleteManyArgs} args - Arguments to filter AttendanceRecords to delete.
     * @example
     * // Delete a few AttendanceRecords
     * const { count } = await prisma.attendanceRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttendanceRecordDeleteManyArgs>(args?: SelectSubset<T, AttendanceRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AttendanceRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AttendanceRecords
     * const attendanceRecord = await prisma.attendanceRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttendanceRecordUpdateManyArgs>(args: SelectSubset<T, AttendanceRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AttendanceRecords and returns the data updated in the database.
     * @param {AttendanceRecordUpdateManyAndReturnArgs} args - Arguments to update many AttendanceRecords.
     * @example
     * // Update many AttendanceRecords
     * const attendanceRecord = await prisma.attendanceRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AttendanceRecords and only return the `id`
     * const attendanceRecordWithIdOnly = await prisma.attendanceRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AttendanceRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, AttendanceRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AttendanceRecord.
     * @param {AttendanceRecordUpsertArgs} args - Arguments to update or create a AttendanceRecord.
     * @example
     * // Update or create a AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.upsert({
     *   create: {
     *     // ... data to create a AttendanceRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AttendanceRecord we want to update
     *   }
     * })
     */
    upsert<T extends AttendanceRecordUpsertArgs>(args: SelectSubset<T, AttendanceRecordUpsertArgs<ExtArgs>>): Prisma__AttendanceRecordClient<$Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AttendanceRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordCountArgs} args - Arguments to filter AttendanceRecords to count.
     * @example
     * // Count the number of AttendanceRecords
     * const count = await prisma.attendanceRecord.count({
     *   where: {
     *     // ... the filter for the AttendanceRecords we want to count
     *   }
     * })
    **/
    count<T extends AttendanceRecordCountArgs>(
      args?: Subset<T, AttendanceRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendanceRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AttendanceRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttendanceRecordAggregateArgs>(args: Subset<T, AttendanceRecordAggregateArgs>): Prisma.PrismaPromise<GetAttendanceRecordAggregateType<T>>

    /**
     * Group by AttendanceRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttendanceRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttendanceRecordGroupByArgs['orderBy'] }
        : { orderBy?: AttendanceRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttendanceRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendanceRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AttendanceRecord model
   */
  readonly fields: AttendanceRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AttendanceRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttendanceRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends AttendanceSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AttendanceSessionDefaultArgs<ExtArgs>>): Prisma__AttendanceSessionClient<$Result.GetResult<Prisma.$AttendanceSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    member<T extends MemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemberDefaultArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AttendanceRecord model
   */
  interface AttendanceRecordFieldRefs {
    readonly id: FieldRef<"AttendanceRecord", 'String'>
    readonly sessionId: FieldRef<"AttendanceRecord", 'String'>
    readonly memberId: FieldRef<"AttendanceRecord", 'String'>
    readonly checkInMethod: FieldRef<"AttendanceRecord", 'String'>
    readonly checkedInBy: FieldRef<"AttendanceRecord", 'String'>
    readonly checkedInAt: FieldRef<"AttendanceRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AttendanceRecord findUnique
   */
  export type AttendanceRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where: AttendanceRecordWhereUniqueInput
  }

  /**
   * AttendanceRecord findUniqueOrThrow
   */
  export type AttendanceRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where: AttendanceRecordWhereUniqueInput
  }

  /**
   * AttendanceRecord findFirst
   */
  export type AttendanceRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where?: AttendanceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AttendanceRecords.
     */
    cursor?: AttendanceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AttendanceRecords.
     */
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[]
  }

  /**
   * AttendanceRecord findFirstOrThrow
   */
  export type AttendanceRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where?: AttendanceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AttendanceRecords.
     */
    cursor?: AttendanceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AttendanceRecords.
     */
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[]
  }

  /**
   * AttendanceRecord findMany
   */
  export type AttendanceRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter, which AttendanceRecords to fetch.
     */
    where?: AttendanceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AttendanceRecords.
     */
    cursor?: AttendanceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[]
  }

  /**
   * AttendanceRecord create
   */
  export type AttendanceRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a AttendanceRecord.
     */
    data: XOR<AttendanceRecordCreateInput, AttendanceRecordUncheckedCreateInput>
  }

  /**
   * AttendanceRecord createMany
   */
  export type AttendanceRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AttendanceRecords.
     */
    data: AttendanceRecordCreateManyInput | AttendanceRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AttendanceRecord createManyAndReturn
   */
  export type AttendanceRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * The data used to create many AttendanceRecords.
     */
    data: AttendanceRecordCreateManyInput | AttendanceRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AttendanceRecord update
   */
  export type AttendanceRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a AttendanceRecord.
     */
    data: XOR<AttendanceRecordUpdateInput, AttendanceRecordUncheckedUpdateInput>
    /**
     * Choose, which AttendanceRecord to update.
     */
    where: AttendanceRecordWhereUniqueInput
  }

  /**
   * AttendanceRecord updateMany
   */
  export type AttendanceRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AttendanceRecords.
     */
    data: XOR<AttendanceRecordUpdateManyMutationInput, AttendanceRecordUncheckedUpdateManyInput>
    /**
     * Filter which AttendanceRecords to update
     */
    where?: AttendanceRecordWhereInput
    /**
     * Limit how many AttendanceRecords to update.
     */
    limit?: number
  }

  /**
   * AttendanceRecord updateManyAndReturn
   */
  export type AttendanceRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * The data used to update AttendanceRecords.
     */
    data: XOR<AttendanceRecordUpdateManyMutationInput, AttendanceRecordUncheckedUpdateManyInput>
    /**
     * Filter which AttendanceRecords to update
     */
    where?: AttendanceRecordWhereInput
    /**
     * Limit how many AttendanceRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AttendanceRecord upsert
   */
  export type AttendanceRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the AttendanceRecord to update in case it exists.
     */
    where: AttendanceRecordWhereUniqueInput
    /**
     * In case the AttendanceRecord found by the `where` argument doesn't exist, create a new AttendanceRecord with this data.
     */
    create: XOR<AttendanceRecordCreateInput, AttendanceRecordUncheckedCreateInput>
    /**
     * In case the AttendanceRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttendanceRecordUpdateInput, AttendanceRecordUncheckedUpdateInput>
  }

  /**
   * AttendanceRecord delete
   */
  export type AttendanceRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
    /**
     * Filter which AttendanceRecord to delete.
     */
    where: AttendanceRecordWhereUniqueInput
  }

  /**
   * AttendanceRecord deleteMany
   */
  export type AttendanceRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AttendanceRecords to delete
     */
    where?: AttendanceRecordWhereInput
    /**
     * Limit how many AttendanceRecords to delete.
     */
    limit?: number
  }

  /**
   * AttendanceRecord without action
   */
  export type AttendanceRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null
  }


  /**
   * Model MonthlyReport
   */

  export type AggregateMonthlyReport = {
    _count: MonthlyReportCountAggregateOutputType | null
    _avg: MonthlyReportAvgAggregateOutputType | null
    _sum: MonthlyReportSumAggregateOutputType | null
    _min: MonthlyReportMinAggregateOutputType | null
    _max: MonthlyReportMaxAggregateOutputType | null
  }

  export type MonthlyReportAvgAggregateOutputType = {
    week1Count: number | null
    week2Count: number | null
    week3Count: number | null
    week4Count: number | null
    week5Count: number | null
    firstTimers: number | null
    newMembers: number | null
    followUps: number | null
  }

  export type MonthlyReportSumAggregateOutputType = {
    week1Count: number | null
    week2Count: number | null
    week3Count: number | null
    week4Count: number | null
    week5Count: number | null
    firstTimers: number | null
    newMembers: number | null
    followUps: number | null
  }

  export type MonthlyReportMinAggregateOutputType = {
    id: string | null
    fellowshipId: string | null
    monthYear: string | null
    week1Date: Date | null
    week2Date: Date | null
    week3Date: Date | null
    week4Date: Date | null
    week5Date: Date | null
    week1Count: number | null
    week2Count: number | null
    week3Count: number | null
    week4Count: number | null
    week5Count: number | null
    prayerFlag: boolean | null
    firstTimers: number | null
    newMembers: number | null
    followUps: number | null
    escalations: string | null
    comments: string | null
    status: $Enums.ReportStatus | null
    finalizedAt: Date | null
    finalizedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MonthlyReportMaxAggregateOutputType = {
    id: string | null
    fellowshipId: string | null
    monthYear: string | null
    week1Date: Date | null
    week2Date: Date | null
    week3Date: Date | null
    week4Date: Date | null
    week5Date: Date | null
    week1Count: number | null
    week2Count: number | null
    week3Count: number | null
    week4Count: number | null
    week5Count: number | null
    prayerFlag: boolean | null
    firstTimers: number | null
    newMembers: number | null
    followUps: number | null
    escalations: string | null
    comments: string | null
    status: $Enums.ReportStatus | null
    finalizedAt: Date | null
    finalizedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MonthlyReportCountAggregateOutputType = {
    id: number
    fellowshipId: number
    monthYear: number
    week1Date: number
    week2Date: number
    week3Date: number
    week4Date: number
    week5Date: number
    week1Count: number
    week2Count: number
    week3Count: number
    week4Count: number
    week5Count: number
    prayerFlag: number
    firstTimers: number
    newMembers: number
    followUps: number
    escalations: number
    comments: number
    status: number
    finalizedAt: number
    finalizedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MonthlyReportAvgAggregateInputType = {
    week1Count?: true
    week2Count?: true
    week3Count?: true
    week4Count?: true
    week5Count?: true
    firstTimers?: true
    newMembers?: true
    followUps?: true
  }

  export type MonthlyReportSumAggregateInputType = {
    week1Count?: true
    week2Count?: true
    week3Count?: true
    week4Count?: true
    week5Count?: true
    firstTimers?: true
    newMembers?: true
    followUps?: true
  }

  export type MonthlyReportMinAggregateInputType = {
    id?: true
    fellowshipId?: true
    monthYear?: true
    week1Date?: true
    week2Date?: true
    week3Date?: true
    week4Date?: true
    week5Date?: true
    week1Count?: true
    week2Count?: true
    week3Count?: true
    week4Count?: true
    week5Count?: true
    prayerFlag?: true
    firstTimers?: true
    newMembers?: true
    followUps?: true
    escalations?: true
    comments?: true
    status?: true
    finalizedAt?: true
    finalizedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MonthlyReportMaxAggregateInputType = {
    id?: true
    fellowshipId?: true
    monthYear?: true
    week1Date?: true
    week2Date?: true
    week3Date?: true
    week4Date?: true
    week5Date?: true
    week1Count?: true
    week2Count?: true
    week3Count?: true
    week4Count?: true
    week5Count?: true
    prayerFlag?: true
    firstTimers?: true
    newMembers?: true
    followUps?: true
    escalations?: true
    comments?: true
    status?: true
    finalizedAt?: true
    finalizedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MonthlyReportCountAggregateInputType = {
    id?: true
    fellowshipId?: true
    monthYear?: true
    week1Date?: true
    week2Date?: true
    week3Date?: true
    week4Date?: true
    week5Date?: true
    week1Count?: true
    week2Count?: true
    week3Count?: true
    week4Count?: true
    week5Count?: true
    prayerFlag?: true
    firstTimers?: true
    newMembers?: true
    followUps?: true
    escalations?: true
    comments?: true
    status?: true
    finalizedAt?: true
    finalizedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MonthlyReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyReport to aggregate.
     */
    where?: MonthlyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyReports to fetch.
     */
    orderBy?: MonthlyReportOrderByWithRelationInput | MonthlyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MonthlyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MonthlyReports
    **/
    _count?: true | MonthlyReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MonthlyReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MonthlyReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MonthlyReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MonthlyReportMaxAggregateInputType
  }

  export type GetMonthlyReportAggregateType<T extends MonthlyReportAggregateArgs> = {
        [P in keyof T & keyof AggregateMonthlyReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMonthlyReport[P]>
      : GetScalarType<T[P], AggregateMonthlyReport[P]>
  }




  export type MonthlyReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyReportWhereInput
    orderBy?: MonthlyReportOrderByWithAggregationInput | MonthlyReportOrderByWithAggregationInput[]
    by: MonthlyReportScalarFieldEnum[] | MonthlyReportScalarFieldEnum
    having?: MonthlyReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MonthlyReportCountAggregateInputType | true
    _avg?: MonthlyReportAvgAggregateInputType
    _sum?: MonthlyReportSumAggregateInputType
    _min?: MonthlyReportMinAggregateInputType
    _max?: MonthlyReportMaxAggregateInputType
  }

  export type MonthlyReportGroupByOutputType = {
    id: string
    fellowshipId: string
    monthYear: string
    week1Date: Date | null
    week2Date: Date | null
    week3Date: Date | null
    week4Date: Date | null
    week5Date: Date | null
    week1Count: number
    week2Count: number
    week3Count: number
    week4Count: number
    week5Count: number
    prayerFlag: boolean
    firstTimers: number
    newMembers: number
    followUps: number
    escalations: string | null
    comments: string | null
    status: $Enums.ReportStatus
    finalizedAt: Date | null
    finalizedBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: MonthlyReportCountAggregateOutputType | null
    _avg: MonthlyReportAvgAggregateOutputType | null
    _sum: MonthlyReportSumAggregateOutputType | null
    _min: MonthlyReportMinAggregateOutputType | null
    _max: MonthlyReportMaxAggregateOutputType | null
  }

  type GetMonthlyReportGroupByPayload<T extends MonthlyReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MonthlyReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MonthlyReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MonthlyReportGroupByOutputType[P]>
            : GetScalarType<T[P], MonthlyReportGroupByOutputType[P]>
        }
      >
    >


  export type MonthlyReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fellowshipId?: boolean
    monthYear?: boolean
    week1Date?: boolean
    week2Date?: boolean
    week3Date?: boolean
    week4Date?: boolean
    week5Date?: boolean
    week1Count?: boolean
    week2Count?: boolean
    week3Count?: boolean
    week4Count?: boolean
    week5Count?: boolean
    prayerFlag?: boolean
    firstTimers?: boolean
    newMembers?: boolean
    followUps?: boolean
    escalations?: boolean
    comments?: boolean
    status?: boolean
    finalizedAt?: boolean
    finalizedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fellowship?: boolean | FellowshipDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlyReport"]>

  export type MonthlyReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fellowshipId?: boolean
    monthYear?: boolean
    week1Date?: boolean
    week2Date?: boolean
    week3Date?: boolean
    week4Date?: boolean
    week5Date?: boolean
    week1Count?: boolean
    week2Count?: boolean
    week3Count?: boolean
    week4Count?: boolean
    week5Count?: boolean
    prayerFlag?: boolean
    firstTimers?: boolean
    newMembers?: boolean
    followUps?: boolean
    escalations?: boolean
    comments?: boolean
    status?: boolean
    finalizedAt?: boolean
    finalizedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fellowship?: boolean | FellowshipDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlyReport"]>

  export type MonthlyReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fellowshipId?: boolean
    monthYear?: boolean
    week1Date?: boolean
    week2Date?: boolean
    week3Date?: boolean
    week4Date?: boolean
    week5Date?: boolean
    week1Count?: boolean
    week2Count?: boolean
    week3Count?: boolean
    week4Count?: boolean
    week5Count?: boolean
    prayerFlag?: boolean
    firstTimers?: boolean
    newMembers?: boolean
    followUps?: boolean
    escalations?: boolean
    comments?: boolean
    status?: boolean
    finalizedAt?: boolean
    finalizedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fellowship?: boolean | FellowshipDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["monthlyReport"]>

  export type MonthlyReportSelectScalar = {
    id?: boolean
    fellowshipId?: boolean
    monthYear?: boolean
    week1Date?: boolean
    week2Date?: boolean
    week3Date?: boolean
    week4Date?: boolean
    week5Date?: boolean
    week1Count?: boolean
    week2Count?: boolean
    week3Count?: boolean
    week4Count?: boolean
    week5Count?: boolean
    prayerFlag?: boolean
    firstTimers?: boolean
    newMembers?: boolean
    followUps?: boolean
    escalations?: boolean
    comments?: boolean
    status?: boolean
    finalizedAt?: boolean
    finalizedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MonthlyReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fellowshipId" | "monthYear" | "week1Date" | "week2Date" | "week3Date" | "week4Date" | "week5Date" | "week1Count" | "week2Count" | "week3Count" | "week4Count" | "week5Count" | "prayerFlag" | "firstTimers" | "newMembers" | "followUps" | "escalations" | "comments" | "status" | "finalizedAt" | "finalizedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["monthlyReport"]>
  export type MonthlyReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fellowship?: boolean | FellowshipDefaultArgs<ExtArgs>
  }
  export type MonthlyReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fellowship?: boolean | FellowshipDefaultArgs<ExtArgs>
  }
  export type MonthlyReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fellowship?: boolean | FellowshipDefaultArgs<ExtArgs>
  }

  export type $MonthlyReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MonthlyReport"
    objects: {
      fellowship: Prisma.$FellowshipPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fellowshipId: string
      monthYear: string
      week1Date: Date | null
      week2Date: Date | null
      week3Date: Date | null
      week4Date: Date | null
      week5Date: Date | null
      week1Count: number
      week2Count: number
      week3Count: number
      week4Count: number
      week5Count: number
      prayerFlag: boolean
      firstTimers: number
      newMembers: number
      followUps: number
      escalations: string | null
      comments: string | null
      status: $Enums.ReportStatus
      finalizedAt: Date | null
      finalizedBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["monthlyReport"]>
    composites: {}
  }

  type MonthlyReportGetPayload<S extends boolean | null | undefined | MonthlyReportDefaultArgs> = $Result.GetResult<Prisma.$MonthlyReportPayload, S>

  type MonthlyReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MonthlyReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MonthlyReportCountAggregateInputType | true
    }

  export interface MonthlyReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MonthlyReport'], meta: { name: 'MonthlyReport' } }
    /**
     * Find zero or one MonthlyReport that matches the filter.
     * @param {MonthlyReportFindUniqueArgs} args - Arguments to find a MonthlyReport
     * @example
     * // Get one MonthlyReport
     * const monthlyReport = await prisma.monthlyReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MonthlyReportFindUniqueArgs>(args: SelectSubset<T, MonthlyReportFindUniqueArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MonthlyReport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MonthlyReportFindUniqueOrThrowArgs} args - Arguments to find a MonthlyReport
     * @example
     * // Get one MonthlyReport
     * const monthlyReport = await prisma.monthlyReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MonthlyReportFindUniqueOrThrowArgs>(args: SelectSubset<T, MonthlyReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MonthlyReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportFindFirstArgs} args - Arguments to find a MonthlyReport
     * @example
     * // Get one MonthlyReport
     * const monthlyReport = await prisma.monthlyReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MonthlyReportFindFirstArgs>(args?: SelectSubset<T, MonthlyReportFindFirstArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MonthlyReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportFindFirstOrThrowArgs} args - Arguments to find a MonthlyReport
     * @example
     * // Get one MonthlyReport
     * const monthlyReport = await prisma.monthlyReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MonthlyReportFindFirstOrThrowArgs>(args?: SelectSubset<T, MonthlyReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MonthlyReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MonthlyReports
     * const monthlyReports = await prisma.monthlyReport.findMany()
     * 
     * // Get first 10 MonthlyReports
     * const monthlyReports = await prisma.monthlyReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const monthlyReportWithIdOnly = await prisma.monthlyReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MonthlyReportFindManyArgs>(args?: SelectSubset<T, MonthlyReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MonthlyReport.
     * @param {MonthlyReportCreateArgs} args - Arguments to create a MonthlyReport.
     * @example
     * // Create one MonthlyReport
     * const MonthlyReport = await prisma.monthlyReport.create({
     *   data: {
     *     // ... data to create a MonthlyReport
     *   }
     * })
     * 
     */
    create<T extends MonthlyReportCreateArgs>(args: SelectSubset<T, MonthlyReportCreateArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MonthlyReports.
     * @param {MonthlyReportCreateManyArgs} args - Arguments to create many MonthlyReports.
     * @example
     * // Create many MonthlyReports
     * const monthlyReport = await prisma.monthlyReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MonthlyReportCreateManyArgs>(args?: SelectSubset<T, MonthlyReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MonthlyReports and returns the data saved in the database.
     * @param {MonthlyReportCreateManyAndReturnArgs} args - Arguments to create many MonthlyReports.
     * @example
     * // Create many MonthlyReports
     * const monthlyReport = await prisma.monthlyReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MonthlyReports and only return the `id`
     * const monthlyReportWithIdOnly = await prisma.monthlyReport.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MonthlyReportCreateManyAndReturnArgs>(args?: SelectSubset<T, MonthlyReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MonthlyReport.
     * @param {MonthlyReportDeleteArgs} args - Arguments to delete one MonthlyReport.
     * @example
     * // Delete one MonthlyReport
     * const MonthlyReport = await prisma.monthlyReport.delete({
     *   where: {
     *     // ... filter to delete one MonthlyReport
     *   }
     * })
     * 
     */
    delete<T extends MonthlyReportDeleteArgs>(args: SelectSubset<T, MonthlyReportDeleteArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MonthlyReport.
     * @param {MonthlyReportUpdateArgs} args - Arguments to update one MonthlyReport.
     * @example
     * // Update one MonthlyReport
     * const monthlyReport = await prisma.monthlyReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MonthlyReportUpdateArgs>(args: SelectSubset<T, MonthlyReportUpdateArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MonthlyReports.
     * @param {MonthlyReportDeleteManyArgs} args - Arguments to filter MonthlyReports to delete.
     * @example
     * // Delete a few MonthlyReports
     * const { count } = await prisma.monthlyReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MonthlyReportDeleteManyArgs>(args?: SelectSubset<T, MonthlyReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MonthlyReports
     * const monthlyReport = await prisma.monthlyReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MonthlyReportUpdateManyArgs>(args: SelectSubset<T, MonthlyReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyReports and returns the data updated in the database.
     * @param {MonthlyReportUpdateManyAndReturnArgs} args - Arguments to update many MonthlyReports.
     * @example
     * // Update many MonthlyReports
     * const monthlyReport = await prisma.monthlyReport.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MonthlyReports and only return the `id`
     * const monthlyReportWithIdOnly = await prisma.monthlyReport.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MonthlyReportUpdateManyAndReturnArgs>(args: SelectSubset<T, MonthlyReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MonthlyReport.
     * @param {MonthlyReportUpsertArgs} args - Arguments to update or create a MonthlyReport.
     * @example
     * // Update or create a MonthlyReport
     * const monthlyReport = await prisma.monthlyReport.upsert({
     *   create: {
     *     // ... data to create a MonthlyReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MonthlyReport we want to update
     *   }
     * })
     */
    upsert<T extends MonthlyReportUpsertArgs>(args: SelectSubset<T, MonthlyReportUpsertArgs<ExtArgs>>): Prisma__MonthlyReportClient<$Result.GetResult<Prisma.$MonthlyReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MonthlyReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportCountArgs} args - Arguments to filter MonthlyReports to count.
     * @example
     * // Count the number of MonthlyReports
     * const count = await prisma.monthlyReport.count({
     *   where: {
     *     // ... the filter for the MonthlyReports we want to count
     *   }
     * })
    **/
    count<T extends MonthlyReportCountArgs>(
      args?: Subset<T, MonthlyReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MonthlyReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MonthlyReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MonthlyReportAggregateArgs>(args: Subset<T, MonthlyReportAggregateArgs>): Prisma.PrismaPromise<GetMonthlyReportAggregateType<T>>

    /**
     * Group by MonthlyReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MonthlyReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MonthlyReportGroupByArgs['orderBy'] }
        : { orderBy?: MonthlyReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MonthlyReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMonthlyReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MonthlyReport model
   */
  readonly fields: MonthlyReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MonthlyReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MonthlyReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fellowship<T extends FellowshipDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FellowshipDefaultArgs<ExtArgs>>): Prisma__FellowshipClient<$Result.GetResult<Prisma.$FellowshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MonthlyReport model
   */
  interface MonthlyReportFieldRefs {
    readonly id: FieldRef<"MonthlyReport", 'String'>
    readonly fellowshipId: FieldRef<"MonthlyReport", 'String'>
    readonly monthYear: FieldRef<"MonthlyReport", 'String'>
    readonly week1Date: FieldRef<"MonthlyReport", 'DateTime'>
    readonly week2Date: FieldRef<"MonthlyReport", 'DateTime'>
    readonly week3Date: FieldRef<"MonthlyReport", 'DateTime'>
    readonly week4Date: FieldRef<"MonthlyReport", 'DateTime'>
    readonly week5Date: FieldRef<"MonthlyReport", 'DateTime'>
    readonly week1Count: FieldRef<"MonthlyReport", 'Int'>
    readonly week2Count: FieldRef<"MonthlyReport", 'Int'>
    readonly week3Count: FieldRef<"MonthlyReport", 'Int'>
    readonly week4Count: FieldRef<"MonthlyReport", 'Int'>
    readonly week5Count: FieldRef<"MonthlyReport", 'Int'>
    readonly prayerFlag: FieldRef<"MonthlyReport", 'Boolean'>
    readonly firstTimers: FieldRef<"MonthlyReport", 'Int'>
    readonly newMembers: FieldRef<"MonthlyReport", 'Int'>
    readonly followUps: FieldRef<"MonthlyReport", 'Int'>
    readonly escalations: FieldRef<"MonthlyReport", 'String'>
    readonly comments: FieldRef<"MonthlyReport", 'String'>
    readonly status: FieldRef<"MonthlyReport", 'ReportStatus'>
    readonly finalizedAt: FieldRef<"MonthlyReport", 'DateTime'>
    readonly finalizedBy: FieldRef<"MonthlyReport", 'String'>
    readonly createdAt: FieldRef<"MonthlyReport", 'DateTime'>
    readonly updatedAt: FieldRef<"MonthlyReport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MonthlyReport findUnique
   */
  export type MonthlyReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyReport to fetch.
     */
    where: MonthlyReportWhereUniqueInput
  }

  /**
   * MonthlyReport findUniqueOrThrow
   */
  export type MonthlyReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyReport to fetch.
     */
    where: MonthlyReportWhereUniqueInput
  }

  /**
   * MonthlyReport findFirst
   */
  export type MonthlyReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyReport to fetch.
     */
    where?: MonthlyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyReports to fetch.
     */
    orderBy?: MonthlyReportOrderByWithRelationInput | MonthlyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyReports.
     */
    cursor?: MonthlyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyReports.
     */
    distinct?: MonthlyReportScalarFieldEnum | MonthlyReportScalarFieldEnum[]
  }

  /**
   * MonthlyReport findFirstOrThrow
   */
  export type MonthlyReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyReport to fetch.
     */
    where?: MonthlyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyReports to fetch.
     */
    orderBy?: MonthlyReportOrderByWithRelationInput | MonthlyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyReports.
     */
    cursor?: MonthlyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyReports.
     */
    distinct?: MonthlyReportScalarFieldEnum | MonthlyReportScalarFieldEnum[]
  }

  /**
   * MonthlyReport findMany
   */
  export type MonthlyReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    /**
     * Filter, which MonthlyReports to fetch.
     */
    where?: MonthlyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyReports to fetch.
     */
    orderBy?: MonthlyReportOrderByWithRelationInput | MonthlyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MonthlyReports.
     */
    cursor?: MonthlyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyReports.
     */
    skip?: number
    distinct?: MonthlyReportScalarFieldEnum | MonthlyReportScalarFieldEnum[]
  }

  /**
   * MonthlyReport create
   */
  export type MonthlyReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    /**
     * The data needed to create a MonthlyReport.
     */
    data: XOR<MonthlyReportCreateInput, MonthlyReportUncheckedCreateInput>
  }

  /**
   * MonthlyReport createMany
   */
  export type MonthlyReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MonthlyReports.
     */
    data: MonthlyReportCreateManyInput | MonthlyReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MonthlyReport createManyAndReturn
   */
  export type MonthlyReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * The data used to create many MonthlyReports.
     */
    data: MonthlyReportCreateManyInput | MonthlyReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MonthlyReport update
   */
  export type MonthlyReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    /**
     * The data needed to update a MonthlyReport.
     */
    data: XOR<MonthlyReportUpdateInput, MonthlyReportUncheckedUpdateInput>
    /**
     * Choose, which MonthlyReport to update.
     */
    where: MonthlyReportWhereUniqueInput
  }

  /**
   * MonthlyReport updateMany
   */
  export type MonthlyReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MonthlyReports.
     */
    data: XOR<MonthlyReportUpdateManyMutationInput, MonthlyReportUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyReports to update
     */
    where?: MonthlyReportWhereInput
    /**
     * Limit how many MonthlyReports to update.
     */
    limit?: number
  }

  /**
   * MonthlyReport updateManyAndReturn
   */
  export type MonthlyReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * The data used to update MonthlyReports.
     */
    data: XOR<MonthlyReportUpdateManyMutationInput, MonthlyReportUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyReports to update
     */
    where?: MonthlyReportWhereInput
    /**
     * Limit how many MonthlyReports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MonthlyReport upsert
   */
  export type MonthlyReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    /**
     * The filter to search for the MonthlyReport to update in case it exists.
     */
    where: MonthlyReportWhereUniqueInput
    /**
     * In case the MonthlyReport found by the `where` argument doesn't exist, create a new MonthlyReport with this data.
     */
    create: XOR<MonthlyReportCreateInput, MonthlyReportUncheckedCreateInput>
    /**
     * In case the MonthlyReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MonthlyReportUpdateInput, MonthlyReportUncheckedUpdateInput>
  }

  /**
   * MonthlyReport delete
   */
  export type MonthlyReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
    /**
     * Filter which MonthlyReport to delete.
     */
    where: MonthlyReportWhereUniqueInput
  }

  /**
   * MonthlyReport deleteMany
   */
  export type MonthlyReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyReports to delete
     */
    where?: MonthlyReportWhereInput
    /**
     * Limit how many MonthlyReports to delete.
     */
    limit?: number
  }

  /**
   * MonthlyReport without action
   */
  export type MonthlyReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyReport
     */
    select?: MonthlyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyReport
     */
    omit?: MonthlyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MonthlyReportInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const FellowshipScalarFieldEnum: {
    id: 'id',
    name: 'name',
    location: 'location',
    leaderId: 'leaderId',
    associateId: 'associateId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FellowshipScalarFieldEnum = (typeof FellowshipScalarFieldEnum)[keyof typeof FellowshipScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    churchId: 'churchId',
    email: 'email',
    fullName: 'fullName',
    passwordHash: 'passwordHash',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MemberScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    phone: 'phone',
    email: 'email',
    qrUniqueId: 'qrUniqueId',
    isActive: 'isActive',
    fellowshipId: 'fellowshipId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MemberScalarFieldEnum = (typeof MemberScalarFieldEnum)[keyof typeof MemberScalarFieldEnum]


  export const AttendanceSessionScalarFieldEnum: {
    id: 'id',
    fellowshipId: 'fellowshipId',
    weekNumber: 'weekNumber',
    monthYear: 'monthYear',
    meetingDate: 'meetingDate',
    isSubmitted: 'isSubmitted',
    submittedAt: 'submittedAt',
    submittedBy: 'submittedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AttendanceSessionScalarFieldEnum = (typeof AttendanceSessionScalarFieldEnum)[keyof typeof AttendanceSessionScalarFieldEnum]


  export const AttendanceRecordScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    memberId: 'memberId',
    checkInMethod: 'checkInMethod',
    checkedInBy: 'checkedInBy',
    checkedInAt: 'checkedInAt'
  };

  export type AttendanceRecordScalarFieldEnum = (typeof AttendanceRecordScalarFieldEnum)[keyof typeof AttendanceRecordScalarFieldEnum]


  export const MonthlyReportScalarFieldEnum: {
    id: 'id',
    fellowshipId: 'fellowshipId',
    monthYear: 'monthYear',
    week1Date: 'week1Date',
    week2Date: 'week2Date',
    week3Date: 'week3Date',
    week4Date: 'week4Date',
    week5Date: 'week5Date',
    week1Count: 'week1Count',
    week2Count: 'week2Count',
    week3Count: 'week3Count',
    week4Count: 'week4Count',
    week5Count: 'week5Count',
    prayerFlag: 'prayerFlag',
    firstTimers: 'firstTimers',
    newMembers: 'newMembers',
    followUps: 'followUps',
    escalations: 'escalations',
    comments: 'comments',
    status: 'status',
    finalizedAt: 'finalizedAt',
    finalizedBy: 'finalizedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MonthlyReportScalarFieldEnum = (typeof MonthlyReportScalarFieldEnum)[keyof typeof MonthlyReportScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ReportStatus'
   */
  export type EnumReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportStatus'>
    


  /**
   * Reference to a field of type 'ReportStatus[]'
   */
  export type ListEnumReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type FellowshipWhereInput = {
    AND?: FellowshipWhereInput | FellowshipWhereInput[]
    OR?: FellowshipWhereInput[]
    NOT?: FellowshipWhereInput | FellowshipWhereInput[]
    id?: StringFilter<"Fellowship"> | string
    name?: StringFilter<"Fellowship"> | string
    location?: StringFilter<"Fellowship"> | string
    leaderId?: StringNullableFilter<"Fellowship"> | string | null
    associateId?: StringNullableFilter<"Fellowship"> | string | null
    createdAt?: DateTimeFilter<"Fellowship"> | Date | string
    updatedAt?: DateTimeFilter<"Fellowship"> | Date | string
    leader?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    associate?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    members?: MemberListRelationFilter
    sessions?: AttendanceSessionListRelationFilter
    reports?: MonthlyReportListRelationFilter
  }

  export type FellowshipOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    leaderId?: SortOrderInput | SortOrder
    associateId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    leader?: UserOrderByWithRelationInput
    associate?: UserOrderByWithRelationInput
    members?: MemberOrderByRelationAggregateInput
    sessions?: AttendanceSessionOrderByRelationAggregateInput
    reports?: MonthlyReportOrderByRelationAggregateInput
  }

  export type FellowshipWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    leaderId?: string
    associateId?: string
    AND?: FellowshipWhereInput | FellowshipWhereInput[]
    OR?: FellowshipWhereInput[]
    NOT?: FellowshipWhereInput | FellowshipWhereInput[]
    name?: StringFilter<"Fellowship"> | string
    location?: StringFilter<"Fellowship"> | string
    createdAt?: DateTimeFilter<"Fellowship"> | Date | string
    updatedAt?: DateTimeFilter<"Fellowship"> | Date | string
    leader?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    associate?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    members?: MemberListRelationFilter
    sessions?: AttendanceSessionListRelationFilter
    reports?: MonthlyReportListRelationFilter
  }, "id" | "leaderId" | "associateId">

  export type FellowshipOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    leaderId?: SortOrderInput | SortOrder
    associateId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FellowshipCountOrderByAggregateInput
    _max?: FellowshipMaxOrderByAggregateInput
    _min?: FellowshipMinOrderByAggregateInput
  }

  export type FellowshipScalarWhereWithAggregatesInput = {
    AND?: FellowshipScalarWhereWithAggregatesInput | FellowshipScalarWhereWithAggregatesInput[]
    OR?: FellowshipScalarWhereWithAggregatesInput[]
    NOT?: FellowshipScalarWhereWithAggregatesInput | FellowshipScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Fellowship"> | string
    name?: StringWithAggregatesFilter<"Fellowship"> | string
    location?: StringWithAggregatesFilter<"Fellowship"> | string
    leaderId?: StringNullableWithAggregatesFilter<"Fellowship"> | string | null
    associateId?: StringNullableWithAggregatesFilter<"Fellowship"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Fellowship"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Fellowship"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    churchId?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    leading?: XOR<FellowshipNullableScalarRelationFilter, FellowshipWhereInput> | null
    assisting?: XOR<FellowshipNullableScalarRelationFilter, FellowshipWhereInput> | null
    submittedSessions?: AttendanceSessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    churchId?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    leading?: FellowshipOrderByWithRelationInput
    assisting?: FellowshipOrderByWithRelationInput
    submittedSessions?: AttendanceSessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    churchId?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullName?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    leading?: XOR<FellowshipNullableScalarRelationFilter, FellowshipWhereInput> | null
    assisting?: XOR<FellowshipNullableScalarRelationFilter, FellowshipWhereInput> | null
    submittedSessions?: AttendanceSessionListRelationFilter
  }, "id" | "churchId" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    churchId?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    churchId?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type MemberWhereInput = {
    AND?: MemberWhereInput | MemberWhereInput[]
    OR?: MemberWhereInput[]
    NOT?: MemberWhereInput | MemberWhereInput[]
    id?: StringFilter<"Member"> | string
    fullName?: StringFilter<"Member"> | string
    phone?: StringNullableFilter<"Member"> | string | null
    email?: StringNullableFilter<"Member"> | string | null
    qrUniqueId?: StringFilter<"Member"> | string
    isActive?: BoolFilter<"Member"> | boolean
    fellowshipId?: StringFilter<"Member"> | string
    createdAt?: DateTimeFilter<"Member"> | Date | string
    updatedAt?: DateTimeFilter<"Member"> | Date | string
    fellowship?: XOR<FellowshipScalarRelationFilter, FellowshipWhereInput>
    attendanceRecords?: AttendanceRecordListRelationFilter
  }

  export type MemberOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    qrUniqueId?: SortOrder
    isActive?: SortOrder
    fellowshipId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fellowship?: FellowshipOrderByWithRelationInput
    attendanceRecords?: AttendanceRecordOrderByRelationAggregateInput
  }

  export type MemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    qrUniqueId?: string
    AND?: MemberWhereInput | MemberWhereInput[]
    OR?: MemberWhereInput[]
    NOT?: MemberWhereInput | MemberWhereInput[]
    fullName?: StringFilter<"Member"> | string
    phone?: StringNullableFilter<"Member"> | string | null
    email?: StringNullableFilter<"Member"> | string | null
    isActive?: BoolFilter<"Member"> | boolean
    fellowshipId?: StringFilter<"Member"> | string
    createdAt?: DateTimeFilter<"Member"> | Date | string
    updatedAt?: DateTimeFilter<"Member"> | Date | string
    fellowship?: XOR<FellowshipScalarRelationFilter, FellowshipWhereInput>
    attendanceRecords?: AttendanceRecordListRelationFilter
  }, "id" | "qrUniqueId">

  export type MemberOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    qrUniqueId?: SortOrder
    isActive?: SortOrder
    fellowshipId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MemberCountOrderByAggregateInput
    _max?: MemberMaxOrderByAggregateInput
    _min?: MemberMinOrderByAggregateInput
  }

  export type MemberScalarWhereWithAggregatesInput = {
    AND?: MemberScalarWhereWithAggregatesInput | MemberScalarWhereWithAggregatesInput[]
    OR?: MemberScalarWhereWithAggregatesInput[]
    NOT?: MemberScalarWhereWithAggregatesInput | MemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Member"> | string
    fullName?: StringWithAggregatesFilter<"Member"> | string
    phone?: StringNullableWithAggregatesFilter<"Member"> | string | null
    email?: StringNullableWithAggregatesFilter<"Member"> | string | null
    qrUniqueId?: StringWithAggregatesFilter<"Member"> | string
    isActive?: BoolWithAggregatesFilter<"Member"> | boolean
    fellowshipId?: StringWithAggregatesFilter<"Member"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Member"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Member"> | Date | string
  }

  export type AttendanceSessionWhereInput = {
    AND?: AttendanceSessionWhereInput | AttendanceSessionWhereInput[]
    OR?: AttendanceSessionWhereInput[]
    NOT?: AttendanceSessionWhereInput | AttendanceSessionWhereInput[]
    id?: StringFilter<"AttendanceSession"> | string
    fellowshipId?: StringFilter<"AttendanceSession"> | string
    weekNumber?: IntFilter<"AttendanceSession"> | number
    monthYear?: StringFilter<"AttendanceSession"> | string
    meetingDate?: DateTimeFilter<"AttendanceSession"> | Date | string
    isSubmitted?: BoolFilter<"AttendanceSession"> | boolean
    submittedAt?: DateTimeNullableFilter<"AttendanceSession"> | Date | string | null
    submittedBy?: StringNullableFilter<"AttendanceSession"> | string | null
    createdAt?: DateTimeFilter<"AttendanceSession"> | Date | string
    updatedAt?: DateTimeFilter<"AttendanceSession"> | Date | string
    fellowship?: XOR<FellowshipScalarRelationFilter, FellowshipWhereInput>
    records?: AttendanceRecordListRelationFilter
    submitter?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AttendanceSessionOrderByWithRelationInput = {
    id?: SortOrder
    fellowshipId?: SortOrder
    weekNumber?: SortOrder
    monthYear?: SortOrder
    meetingDate?: SortOrder
    isSubmitted?: SortOrder
    submittedAt?: SortOrderInput | SortOrder
    submittedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fellowship?: FellowshipOrderByWithRelationInput
    records?: AttendanceRecordOrderByRelationAggregateInput
    submitter?: UserOrderByWithRelationInput
  }

  export type AttendanceSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    fellowshipId_weekNumber_monthYear?: AttendanceSessionFellowshipIdWeekNumberMonthYearCompoundUniqueInput
    AND?: AttendanceSessionWhereInput | AttendanceSessionWhereInput[]
    OR?: AttendanceSessionWhereInput[]
    NOT?: AttendanceSessionWhereInput | AttendanceSessionWhereInput[]
    fellowshipId?: StringFilter<"AttendanceSession"> | string
    weekNumber?: IntFilter<"AttendanceSession"> | number
    monthYear?: StringFilter<"AttendanceSession"> | string
    meetingDate?: DateTimeFilter<"AttendanceSession"> | Date | string
    isSubmitted?: BoolFilter<"AttendanceSession"> | boolean
    submittedAt?: DateTimeNullableFilter<"AttendanceSession"> | Date | string | null
    submittedBy?: StringNullableFilter<"AttendanceSession"> | string | null
    createdAt?: DateTimeFilter<"AttendanceSession"> | Date | string
    updatedAt?: DateTimeFilter<"AttendanceSession"> | Date | string
    fellowship?: XOR<FellowshipScalarRelationFilter, FellowshipWhereInput>
    records?: AttendanceRecordListRelationFilter
    submitter?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "fellowshipId_weekNumber_monthYear">

  export type AttendanceSessionOrderByWithAggregationInput = {
    id?: SortOrder
    fellowshipId?: SortOrder
    weekNumber?: SortOrder
    monthYear?: SortOrder
    meetingDate?: SortOrder
    isSubmitted?: SortOrder
    submittedAt?: SortOrderInput | SortOrder
    submittedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AttendanceSessionCountOrderByAggregateInput
    _avg?: AttendanceSessionAvgOrderByAggregateInput
    _max?: AttendanceSessionMaxOrderByAggregateInput
    _min?: AttendanceSessionMinOrderByAggregateInput
    _sum?: AttendanceSessionSumOrderByAggregateInput
  }

  export type AttendanceSessionScalarWhereWithAggregatesInput = {
    AND?: AttendanceSessionScalarWhereWithAggregatesInput | AttendanceSessionScalarWhereWithAggregatesInput[]
    OR?: AttendanceSessionScalarWhereWithAggregatesInput[]
    NOT?: AttendanceSessionScalarWhereWithAggregatesInput | AttendanceSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AttendanceSession"> | string
    fellowshipId?: StringWithAggregatesFilter<"AttendanceSession"> | string
    weekNumber?: IntWithAggregatesFilter<"AttendanceSession"> | number
    monthYear?: StringWithAggregatesFilter<"AttendanceSession"> | string
    meetingDate?: DateTimeWithAggregatesFilter<"AttendanceSession"> | Date | string
    isSubmitted?: BoolWithAggregatesFilter<"AttendanceSession"> | boolean
    submittedAt?: DateTimeNullableWithAggregatesFilter<"AttendanceSession"> | Date | string | null
    submittedBy?: StringNullableWithAggregatesFilter<"AttendanceSession"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AttendanceSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AttendanceSession"> | Date | string
  }

  export type AttendanceRecordWhereInput = {
    AND?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[]
    OR?: AttendanceRecordWhereInput[]
    NOT?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[]
    id?: StringFilter<"AttendanceRecord"> | string
    sessionId?: StringFilter<"AttendanceRecord"> | string
    memberId?: StringFilter<"AttendanceRecord"> | string
    checkInMethod?: StringFilter<"AttendanceRecord"> | string
    checkedInBy?: StringFilter<"AttendanceRecord"> | string
    checkedInAt?: DateTimeFilter<"AttendanceRecord"> | Date | string
    session?: XOR<AttendanceSessionScalarRelationFilter, AttendanceSessionWhereInput>
    member?: XOR<MemberScalarRelationFilter, MemberWhereInput>
  }

  export type AttendanceRecordOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    memberId?: SortOrder
    checkInMethod?: SortOrder
    checkedInBy?: SortOrder
    checkedInAt?: SortOrder
    session?: AttendanceSessionOrderByWithRelationInput
    member?: MemberOrderByWithRelationInput
  }

  export type AttendanceRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId_memberId?: AttendanceRecordSessionIdMemberIdCompoundUniqueInput
    AND?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[]
    OR?: AttendanceRecordWhereInput[]
    NOT?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[]
    sessionId?: StringFilter<"AttendanceRecord"> | string
    memberId?: StringFilter<"AttendanceRecord"> | string
    checkInMethod?: StringFilter<"AttendanceRecord"> | string
    checkedInBy?: StringFilter<"AttendanceRecord"> | string
    checkedInAt?: DateTimeFilter<"AttendanceRecord"> | Date | string
    session?: XOR<AttendanceSessionScalarRelationFilter, AttendanceSessionWhereInput>
    member?: XOR<MemberScalarRelationFilter, MemberWhereInput>
  }, "id" | "sessionId_memberId">

  export type AttendanceRecordOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    memberId?: SortOrder
    checkInMethod?: SortOrder
    checkedInBy?: SortOrder
    checkedInAt?: SortOrder
    _count?: AttendanceRecordCountOrderByAggregateInput
    _max?: AttendanceRecordMaxOrderByAggregateInput
    _min?: AttendanceRecordMinOrderByAggregateInput
  }

  export type AttendanceRecordScalarWhereWithAggregatesInput = {
    AND?: AttendanceRecordScalarWhereWithAggregatesInput | AttendanceRecordScalarWhereWithAggregatesInput[]
    OR?: AttendanceRecordScalarWhereWithAggregatesInput[]
    NOT?: AttendanceRecordScalarWhereWithAggregatesInput | AttendanceRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AttendanceRecord"> | string
    sessionId?: StringWithAggregatesFilter<"AttendanceRecord"> | string
    memberId?: StringWithAggregatesFilter<"AttendanceRecord"> | string
    checkInMethod?: StringWithAggregatesFilter<"AttendanceRecord"> | string
    checkedInBy?: StringWithAggregatesFilter<"AttendanceRecord"> | string
    checkedInAt?: DateTimeWithAggregatesFilter<"AttendanceRecord"> | Date | string
  }

  export type MonthlyReportWhereInput = {
    AND?: MonthlyReportWhereInput | MonthlyReportWhereInput[]
    OR?: MonthlyReportWhereInput[]
    NOT?: MonthlyReportWhereInput | MonthlyReportWhereInput[]
    id?: StringFilter<"MonthlyReport"> | string
    fellowshipId?: StringFilter<"MonthlyReport"> | string
    monthYear?: StringFilter<"MonthlyReport"> | string
    week1Date?: DateTimeNullableFilter<"MonthlyReport"> | Date | string | null
    week2Date?: DateTimeNullableFilter<"MonthlyReport"> | Date | string | null
    week3Date?: DateTimeNullableFilter<"MonthlyReport"> | Date | string | null
    week4Date?: DateTimeNullableFilter<"MonthlyReport"> | Date | string | null
    week5Date?: DateTimeNullableFilter<"MonthlyReport"> | Date | string | null
    week1Count?: IntFilter<"MonthlyReport"> | number
    week2Count?: IntFilter<"MonthlyReport"> | number
    week3Count?: IntFilter<"MonthlyReport"> | number
    week4Count?: IntFilter<"MonthlyReport"> | number
    week5Count?: IntFilter<"MonthlyReport"> | number
    prayerFlag?: BoolFilter<"MonthlyReport"> | boolean
    firstTimers?: IntFilter<"MonthlyReport"> | number
    newMembers?: IntFilter<"MonthlyReport"> | number
    followUps?: IntFilter<"MonthlyReport"> | number
    escalations?: StringNullableFilter<"MonthlyReport"> | string | null
    comments?: StringNullableFilter<"MonthlyReport"> | string | null
    status?: EnumReportStatusFilter<"MonthlyReport"> | $Enums.ReportStatus
    finalizedAt?: DateTimeNullableFilter<"MonthlyReport"> | Date | string | null
    finalizedBy?: StringNullableFilter<"MonthlyReport"> | string | null
    createdAt?: DateTimeFilter<"MonthlyReport"> | Date | string
    updatedAt?: DateTimeFilter<"MonthlyReport"> | Date | string
    fellowship?: XOR<FellowshipScalarRelationFilter, FellowshipWhereInput>
  }

  export type MonthlyReportOrderByWithRelationInput = {
    id?: SortOrder
    fellowshipId?: SortOrder
    monthYear?: SortOrder
    week1Date?: SortOrderInput | SortOrder
    week2Date?: SortOrderInput | SortOrder
    week3Date?: SortOrderInput | SortOrder
    week4Date?: SortOrderInput | SortOrder
    week5Date?: SortOrderInput | SortOrder
    week1Count?: SortOrder
    week2Count?: SortOrder
    week3Count?: SortOrder
    week4Count?: SortOrder
    week5Count?: SortOrder
    prayerFlag?: SortOrder
    firstTimers?: SortOrder
    newMembers?: SortOrder
    followUps?: SortOrder
    escalations?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    status?: SortOrder
    finalizedAt?: SortOrderInput | SortOrder
    finalizedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fellowship?: FellowshipOrderByWithRelationInput
  }

  export type MonthlyReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    fellowshipId_monthYear?: MonthlyReportFellowshipIdMonthYearCompoundUniqueInput
    AND?: MonthlyReportWhereInput | MonthlyReportWhereInput[]
    OR?: MonthlyReportWhereInput[]
    NOT?: MonthlyReportWhereInput | MonthlyReportWhereInput[]
    fellowshipId?: StringFilter<"MonthlyReport"> | string
    monthYear?: StringFilter<"MonthlyReport"> | string
    week1Date?: DateTimeNullableFilter<"MonthlyReport"> | Date | string | null
    week2Date?: DateTimeNullableFilter<"MonthlyReport"> | Date | string | null
    week3Date?: DateTimeNullableFilter<"MonthlyReport"> | Date | string | null
    week4Date?: DateTimeNullableFilter<"MonthlyReport"> | Date | string | null
    week5Date?: DateTimeNullableFilter<"MonthlyReport"> | Date | string | null
    week1Count?: IntFilter<"MonthlyReport"> | number
    week2Count?: IntFilter<"MonthlyReport"> | number
    week3Count?: IntFilter<"MonthlyReport"> | number
    week4Count?: IntFilter<"MonthlyReport"> | number
    week5Count?: IntFilter<"MonthlyReport"> | number
    prayerFlag?: BoolFilter<"MonthlyReport"> | boolean
    firstTimers?: IntFilter<"MonthlyReport"> | number
    newMembers?: IntFilter<"MonthlyReport"> | number
    followUps?: IntFilter<"MonthlyReport"> | number
    escalations?: StringNullableFilter<"MonthlyReport"> | string | null
    comments?: StringNullableFilter<"MonthlyReport"> | string | null
    status?: EnumReportStatusFilter<"MonthlyReport"> | $Enums.ReportStatus
    finalizedAt?: DateTimeNullableFilter<"MonthlyReport"> | Date | string | null
    finalizedBy?: StringNullableFilter<"MonthlyReport"> | string | null
    createdAt?: DateTimeFilter<"MonthlyReport"> | Date | string
    updatedAt?: DateTimeFilter<"MonthlyReport"> | Date | string
    fellowship?: XOR<FellowshipScalarRelationFilter, FellowshipWhereInput>
  }, "id" | "fellowshipId_monthYear">

  export type MonthlyReportOrderByWithAggregationInput = {
    id?: SortOrder
    fellowshipId?: SortOrder
    monthYear?: SortOrder
    week1Date?: SortOrderInput | SortOrder
    week2Date?: SortOrderInput | SortOrder
    week3Date?: SortOrderInput | SortOrder
    week4Date?: SortOrderInput | SortOrder
    week5Date?: SortOrderInput | SortOrder
    week1Count?: SortOrder
    week2Count?: SortOrder
    week3Count?: SortOrder
    week4Count?: SortOrder
    week5Count?: SortOrder
    prayerFlag?: SortOrder
    firstTimers?: SortOrder
    newMembers?: SortOrder
    followUps?: SortOrder
    escalations?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    status?: SortOrder
    finalizedAt?: SortOrderInput | SortOrder
    finalizedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MonthlyReportCountOrderByAggregateInput
    _avg?: MonthlyReportAvgOrderByAggregateInput
    _max?: MonthlyReportMaxOrderByAggregateInput
    _min?: MonthlyReportMinOrderByAggregateInput
    _sum?: MonthlyReportSumOrderByAggregateInput
  }

  export type MonthlyReportScalarWhereWithAggregatesInput = {
    AND?: MonthlyReportScalarWhereWithAggregatesInput | MonthlyReportScalarWhereWithAggregatesInput[]
    OR?: MonthlyReportScalarWhereWithAggregatesInput[]
    NOT?: MonthlyReportScalarWhereWithAggregatesInput | MonthlyReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MonthlyReport"> | string
    fellowshipId?: StringWithAggregatesFilter<"MonthlyReport"> | string
    monthYear?: StringWithAggregatesFilter<"MonthlyReport"> | string
    week1Date?: DateTimeNullableWithAggregatesFilter<"MonthlyReport"> | Date | string | null
    week2Date?: DateTimeNullableWithAggregatesFilter<"MonthlyReport"> | Date | string | null
    week3Date?: DateTimeNullableWithAggregatesFilter<"MonthlyReport"> | Date | string | null
    week4Date?: DateTimeNullableWithAggregatesFilter<"MonthlyReport"> | Date | string | null
    week5Date?: DateTimeNullableWithAggregatesFilter<"MonthlyReport"> | Date | string | null
    week1Count?: IntWithAggregatesFilter<"MonthlyReport"> | number
    week2Count?: IntWithAggregatesFilter<"MonthlyReport"> | number
    week3Count?: IntWithAggregatesFilter<"MonthlyReport"> | number
    week4Count?: IntWithAggregatesFilter<"MonthlyReport"> | number
    week5Count?: IntWithAggregatesFilter<"MonthlyReport"> | number
    prayerFlag?: BoolWithAggregatesFilter<"MonthlyReport"> | boolean
    firstTimers?: IntWithAggregatesFilter<"MonthlyReport"> | number
    newMembers?: IntWithAggregatesFilter<"MonthlyReport"> | number
    followUps?: IntWithAggregatesFilter<"MonthlyReport"> | number
    escalations?: StringNullableWithAggregatesFilter<"MonthlyReport"> | string | null
    comments?: StringNullableWithAggregatesFilter<"MonthlyReport"> | string | null
    status?: EnumReportStatusWithAggregatesFilter<"MonthlyReport"> | $Enums.ReportStatus
    finalizedAt?: DateTimeNullableWithAggregatesFilter<"MonthlyReport"> | Date | string | null
    finalizedBy?: StringNullableWithAggregatesFilter<"MonthlyReport"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MonthlyReport"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MonthlyReport"> | Date | string
  }

  export type FellowshipCreateInput = {
    id?: string
    name: string
    location: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leader?: UserCreateNestedOneWithoutLeadingInput
    associate?: UserCreateNestedOneWithoutAssistingInput
    members?: MemberCreateNestedManyWithoutFellowshipInput
    sessions?: AttendanceSessionCreateNestedManyWithoutFellowshipInput
    reports?: MonthlyReportCreateNestedManyWithoutFellowshipInput
  }

  export type FellowshipUncheckedCreateInput = {
    id?: string
    name: string
    location: string
    leaderId?: string | null
    associateId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberUncheckedCreateNestedManyWithoutFellowshipInput
    sessions?: AttendanceSessionUncheckedCreateNestedManyWithoutFellowshipInput
    reports?: MonthlyReportUncheckedCreateNestedManyWithoutFellowshipInput
  }

  export type FellowshipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leader?: UserUpdateOneWithoutLeadingNestedInput
    associate?: UserUpdateOneWithoutAssistingNestedInput
    members?: MemberUpdateManyWithoutFellowshipNestedInput
    sessions?: AttendanceSessionUpdateManyWithoutFellowshipNestedInput
    reports?: MonthlyReportUpdateManyWithoutFellowshipNestedInput
  }

  export type FellowshipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    leaderId?: NullableStringFieldUpdateOperationsInput | string | null
    associateId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberUncheckedUpdateManyWithoutFellowshipNestedInput
    sessions?: AttendanceSessionUncheckedUpdateManyWithoutFellowshipNestedInput
    reports?: MonthlyReportUncheckedUpdateManyWithoutFellowshipNestedInput
  }

  export type FellowshipCreateManyInput = {
    id?: string
    name: string
    location: string
    leaderId?: string | null
    associateId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FellowshipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FellowshipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    leaderId?: NullableStringFieldUpdateOperationsInput | string | null
    associateId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    churchId: string
    email: string
    fullName: string
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    leading?: FellowshipCreateNestedOneWithoutLeaderInput
    assisting?: FellowshipCreateNestedOneWithoutAssociateInput
    submittedSessions?: AttendanceSessionCreateNestedManyWithoutSubmitterInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    churchId: string
    email: string
    fullName: string
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    leading?: FellowshipUncheckedCreateNestedOneWithoutLeaderInput
    assisting?: FellowshipUncheckedCreateNestedOneWithoutAssociateInput
    submittedSessions?: AttendanceSessionUncheckedCreateNestedManyWithoutSubmitterInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leading?: FellowshipUpdateOneWithoutLeaderNestedInput
    assisting?: FellowshipUpdateOneWithoutAssociateNestedInput
    submittedSessions?: AttendanceSessionUpdateManyWithoutSubmitterNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leading?: FellowshipUncheckedUpdateOneWithoutLeaderNestedInput
    assisting?: FellowshipUncheckedUpdateOneWithoutAssociateNestedInput
    submittedSessions?: AttendanceSessionUncheckedUpdateManyWithoutSubmitterNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    churchId: string
    email: string
    fullName: string
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberCreateInput = {
    id?: string
    fullName: string
    phone?: string | null
    email?: string | null
    qrUniqueId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fellowship: FellowshipCreateNestedOneWithoutMembersInput
    attendanceRecords?: AttendanceRecordCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateInput = {
    id?: string
    fullName: string
    phone?: string | null
    email?: string | null
    qrUniqueId: string
    isActive?: boolean
    fellowshipId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    attendanceRecords?: AttendanceRecordUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    qrUniqueId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fellowship?: FellowshipUpdateOneRequiredWithoutMembersNestedInput
    attendanceRecords?: AttendanceRecordUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    qrUniqueId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    fellowshipId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendanceRecords?: AttendanceRecordUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type MemberCreateManyInput = {
    id?: string
    fullName: string
    phone?: string | null
    email?: string | null
    qrUniqueId: string
    isActive?: boolean
    fellowshipId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    qrUniqueId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    qrUniqueId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    fellowshipId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceSessionCreateInput = {
    id?: string
    weekNumber: number
    monthYear: string
    meetingDate: Date | string
    isSubmitted?: boolean
    submittedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fellowship: FellowshipCreateNestedOneWithoutSessionsInput
    records?: AttendanceRecordCreateNestedManyWithoutSessionInput
    submitter?: UserCreateNestedOneWithoutSubmittedSessionsInput
  }

  export type AttendanceSessionUncheckedCreateInput = {
    id?: string
    fellowshipId: string
    weekNumber: number
    monthYear: string
    meetingDate: Date | string
    isSubmitted?: boolean
    submittedAt?: Date | string | null
    submittedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    records?: AttendanceRecordUncheckedCreateNestedManyWithoutSessionInput
  }

  export type AttendanceSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    meetingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isSubmitted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fellowship?: FellowshipUpdateOneRequiredWithoutSessionsNestedInput
    records?: AttendanceRecordUpdateManyWithoutSessionNestedInput
    submitter?: UserUpdateOneWithoutSubmittedSessionsNestedInput
  }

  export type AttendanceSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fellowshipId?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    meetingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isSubmitted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: AttendanceRecordUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type AttendanceSessionCreateManyInput = {
    id?: string
    fellowshipId: string
    weekNumber: number
    monthYear: string
    meetingDate: Date | string
    isSubmitted?: boolean
    submittedAt?: Date | string | null
    submittedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendanceSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    meetingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isSubmitted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fellowshipId?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    meetingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isSubmitted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceRecordCreateInput = {
    id?: string
    checkInMethod: string
    checkedInBy: string
    checkedInAt?: Date | string
    session: AttendanceSessionCreateNestedOneWithoutRecordsInput
    member: MemberCreateNestedOneWithoutAttendanceRecordsInput
  }

  export type AttendanceRecordUncheckedCreateInput = {
    id?: string
    sessionId: string
    memberId: string
    checkInMethod: string
    checkedInBy: string
    checkedInAt?: Date | string
  }

  export type AttendanceRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkInMethod?: StringFieldUpdateOperationsInput | string
    checkedInBy?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: AttendanceSessionUpdateOneRequiredWithoutRecordsNestedInput
    member?: MemberUpdateOneRequiredWithoutAttendanceRecordsNestedInput
  }

  export type AttendanceRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    checkInMethod?: StringFieldUpdateOperationsInput | string
    checkedInBy?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceRecordCreateManyInput = {
    id?: string
    sessionId: string
    memberId: string
    checkInMethod: string
    checkedInBy: string
    checkedInAt?: Date | string
  }

  export type AttendanceRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkInMethod?: StringFieldUpdateOperationsInput | string
    checkedInBy?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    checkInMethod?: StringFieldUpdateOperationsInput | string
    checkedInBy?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyReportCreateInput = {
    id?: string
    monthYear: string
    week1Date?: Date | string | null
    week2Date?: Date | string | null
    week3Date?: Date | string | null
    week4Date?: Date | string | null
    week5Date?: Date | string | null
    week1Count?: number
    week2Count?: number
    week3Count?: number
    week4Count?: number
    week5Count?: number
    prayerFlag?: boolean
    firstTimers?: number
    newMembers?: number
    followUps?: number
    escalations?: string | null
    comments?: string | null
    status?: $Enums.ReportStatus
    finalizedAt?: Date | string | null
    finalizedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fellowship: FellowshipCreateNestedOneWithoutReportsInput
  }

  export type MonthlyReportUncheckedCreateInput = {
    id?: string
    fellowshipId: string
    monthYear: string
    week1Date?: Date | string | null
    week2Date?: Date | string | null
    week3Date?: Date | string | null
    week4Date?: Date | string | null
    week5Date?: Date | string | null
    week1Count?: number
    week2Count?: number
    week3Count?: number
    week4Count?: number
    week5Count?: number
    prayerFlag?: boolean
    firstTimers?: number
    newMembers?: number
    followUps?: number
    escalations?: string | null
    comments?: string | null
    status?: $Enums.ReportStatus
    finalizedAt?: Date | string | null
    finalizedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    week1Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week2Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week3Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week4Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week5Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week1Count?: IntFieldUpdateOperationsInput | number
    week2Count?: IntFieldUpdateOperationsInput | number
    week3Count?: IntFieldUpdateOperationsInput | number
    week4Count?: IntFieldUpdateOperationsInput | number
    week5Count?: IntFieldUpdateOperationsInput | number
    prayerFlag?: BoolFieldUpdateOperationsInput | boolean
    firstTimers?: IntFieldUpdateOperationsInput | number
    newMembers?: IntFieldUpdateOperationsInput | number
    followUps?: IntFieldUpdateOperationsInput | number
    escalations?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    finalizedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalizedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fellowship?: FellowshipUpdateOneRequiredWithoutReportsNestedInput
  }

  export type MonthlyReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fellowshipId?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    week1Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week2Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week3Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week4Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week5Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week1Count?: IntFieldUpdateOperationsInput | number
    week2Count?: IntFieldUpdateOperationsInput | number
    week3Count?: IntFieldUpdateOperationsInput | number
    week4Count?: IntFieldUpdateOperationsInput | number
    week5Count?: IntFieldUpdateOperationsInput | number
    prayerFlag?: BoolFieldUpdateOperationsInput | boolean
    firstTimers?: IntFieldUpdateOperationsInput | number
    newMembers?: IntFieldUpdateOperationsInput | number
    followUps?: IntFieldUpdateOperationsInput | number
    escalations?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    finalizedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalizedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyReportCreateManyInput = {
    id?: string
    fellowshipId: string
    monthYear: string
    week1Date?: Date | string | null
    week2Date?: Date | string | null
    week3Date?: Date | string | null
    week4Date?: Date | string | null
    week5Date?: Date | string | null
    week1Count?: number
    week2Count?: number
    week3Count?: number
    week4Count?: number
    week5Count?: number
    prayerFlag?: boolean
    firstTimers?: number
    newMembers?: number
    followUps?: number
    escalations?: string | null
    comments?: string | null
    status?: $Enums.ReportStatus
    finalizedAt?: Date | string | null
    finalizedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    week1Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week2Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week3Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week4Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week5Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week1Count?: IntFieldUpdateOperationsInput | number
    week2Count?: IntFieldUpdateOperationsInput | number
    week3Count?: IntFieldUpdateOperationsInput | number
    week4Count?: IntFieldUpdateOperationsInput | number
    week5Count?: IntFieldUpdateOperationsInput | number
    prayerFlag?: BoolFieldUpdateOperationsInput | boolean
    firstTimers?: IntFieldUpdateOperationsInput | number
    newMembers?: IntFieldUpdateOperationsInput | number
    followUps?: IntFieldUpdateOperationsInput | number
    escalations?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    finalizedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalizedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fellowshipId?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    week1Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week2Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week3Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week4Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week5Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week1Count?: IntFieldUpdateOperationsInput | number
    week2Count?: IntFieldUpdateOperationsInput | number
    week3Count?: IntFieldUpdateOperationsInput | number
    week4Count?: IntFieldUpdateOperationsInput | number
    week5Count?: IntFieldUpdateOperationsInput | number
    prayerFlag?: BoolFieldUpdateOperationsInput | boolean
    firstTimers?: IntFieldUpdateOperationsInput | number
    newMembers?: IntFieldUpdateOperationsInput | number
    followUps?: IntFieldUpdateOperationsInput | number
    escalations?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    finalizedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalizedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type MemberListRelationFilter = {
    every?: MemberWhereInput
    some?: MemberWhereInput
    none?: MemberWhereInput
  }

  export type AttendanceSessionListRelationFilter = {
    every?: AttendanceSessionWhereInput
    some?: AttendanceSessionWhereInput
    none?: AttendanceSessionWhereInput
  }

  export type MonthlyReportListRelationFilter = {
    every?: MonthlyReportWhereInput
    some?: MonthlyReportWhereInput
    none?: MonthlyReportWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AttendanceSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MonthlyReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FellowshipCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    leaderId?: SortOrder
    associateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FellowshipMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    leaderId?: SortOrder
    associateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FellowshipMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    leaderId?: SortOrder
    associateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type FellowshipNullableScalarRelationFilter = {
    is?: FellowshipWhereInput | null
    isNot?: FellowshipWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    churchId?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    churchId?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    churchId?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FellowshipScalarRelationFilter = {
    is?: FellowshipWhereInput
    isNot?: FellowshipWhereInput
  }

  export type AttendanceRecordListRelationFilter = {
    every?: AttendanceRecordWhereInput
    some?: AttendanceRecordWhereInput
    none?: AttendanceRecordWhereInput
  }

  export type AttendanceRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemberCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    qrUniqueId?: SortOrder
    isActive?: SortOrder
    fellowshipId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    qrUniqueId?: SortOrder
    isActive?: SortOrder
    fellowshipId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    qrUniqueId?: SortOrder
    isActive?: SortOrder
    fellowshipId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AttendanceSessionFellowshipIdWeekNumberMonthYearCompoundUniqueInput = {
    fellowshipId: string
    weekNumber: number
    monthYear: string
  }

  export type AttendanceSessionCountOrderByAggregateInput = {
    id?: SortOrder
    fellowshipId?: SortOrder
    weekNumber?: SortOrder
    monthYear?: SortOrder
    meetingDate?: SortOrder
    isSubmitted?: SortOrder
    submittedAt?: SortOrder
    submittedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttendanceSessionAvgOrderByAggregateInput = {
    weekNumber?: SortOrder
  }

  export type AttendanceSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    fellowshipId?: SortOrder
    weekNumber?: SortOrder
    monthYear?: SortOrder
    meetingDate?: SortOrder
    isSubmitted?: SortOrder
    submittedAt?: SortOrder
    submittedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttendanceSessionMinOrderByAggregateInput = {
    id?: SortOrder
    fellowshipId?: SortOrder
    weekNumber?: SortOrder
    monthYear?: SortOrder
    meetingDate?: SortOrder
    isSubmitted?: SortOrder
    submittedAt?: SortOrder
    submittedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttendanceSessionSumOrderByAggregateInput = {
    weekNumber?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AttendanceSessionScalarRelationFilter = {
    is?: AttendanceSessionWhereInput
    isNot?: AttendanceSessionWhereInput
  }

  export type MemberScalarRelationFilter = {
    is?: MemberWhereInput
    isNot?: MemberWhereInput
  }

  export type AttendanceRecordSessionIdMemberIdCompoundUniqueInput = {
    sessionId: string
    memberId: string
  }

  export type AttendanceRecordCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    memberId?: SortOrder
    checkInMethod?: SortOrder
    checkedInBy?: SortOrder
    checkedInAt?: SortOrder
  }

  export type AttendanceRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    memberId?: SortOrder
    checkInMethod?: SortOrder
    checkedInBy?: SortOrder
    checkedInAt?: SortOrder
  }

  export type AttendanceRecordMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    memberId?: SortOrder
    checkInMethod?: SortOrder
    checkedInBy?: SortOrder
    checkedInAt?: SortOrder
  }

  export type EnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus
  }

  export type MonthlyReportFellowshipIdMonthYearCompoundUniqueInput = {
    fellowshipId: string
    monthYear: string
  }

  export type MonthlyReportCountOrderByAggregateInput = {
    id?: SortOrder
    fellowshipId?: SortOrder
    monthYear?: SortOrder
    week1Date?: SortOrder
    week2Date?: SortOrder
    week3Date?: SortOrder
    week4Date?: SortOrder
    week5Date?: SortOrder
    week1Count?: SortOrder
    week2Count?: SortOrder
    week3Count?: SortOrder
    week4Count?: SortOrder
    week5Count?: SortOrder
    prayerFlag?: SortOrder
    firstTimers?: SortOrder
    newMembers?: SortOrder
    followUps?: SortOrder
    escalations?: SortOrder
    comments?: SortOrder
    status?: SortOrder
    finalizedAt?: SortOrder
    finalizedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MonthlyReportAvgOrderByAggregateInput = {
    week1Count?: SortOrder
    week2Count?: SortOrder
    week3Count?: SortOrder
    week4Count?: SortOrder
    week5Count?: SortOrder
    firstTimers?: SortOrder
    newMembers?: SortOrder
    followUps?: SortOrder
  }

  export type MonthlyReportMaxOrderByAggregateInput = {
    id?: SortOrder
    fellowshipId?: SortOrder
    monthYear?: SortOrder
    week1Date?: SortOrder
    week2Date?: SortOrder
    week3Date?: SortOrder
    week4Date?: SortOrder
    week5Date?: SortOrder
    week1Count?: SortOrder
    week2Count?: SortOrder
    week3Count?: SortOrder
    week4Count?: SortOrder
    week5Count?: SortOrder
    prayerFlag?: SortOrder
    firstTimers?: SortOrder
    newMembers?: SortOrder
    followUps?: SortOrder
    escalations?: SortOrder
    comments?: SortOrder
    status?: SortOrder
    finalizedAt?: SortOrder
    finalizedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MonthlyReportMinOrderByAggregateInput = {
    id?: SortOrder
    fellowshipId?: SortOrder
    monthYear?: SortOrder
    week1Date?: SortOrder
    week2Date?: SortOrder
    week3Date?: SortOrder
    week4Date?: SortOrder
    week5Date?: SortOrder
    week1Count?: SortOrder
    week2Count?: SortOrder
    week3Count?: SortOrder
    week4Count?: SortOrder
    week5Count?: SortOrder
    prayerFlag?: SortOrder
    firstTimers?: SortOrder
    newMembers?: SortOrder
    followUps?: SortOrder
    escalations?: SortOrder
    comments?: SortOrder
    status?: SortOrder
    finalizedAt?: SortOrder
    finalizedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MonthlyReportSumOrderByAggregateInput = {
    week1Count?: SortOrder
    week2Count?: SortOrder
    week3Count?: SortOrder
    week4Count?: SortOrder
    week5Count?: SortOrder
    firstTimers?: SortOrder
    newMembers?: SortOrder
    followUps?: SortOrder
  }

  export type EnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportStatusFilter<$PrismaModel>
    _max?: NestedEnumReportStatusFilter<$PrismaModel>
  }

  export type UserCreateNestedOneWithoutLeadingInput = {
    create?: XOR<UserCreateWithoutLeadingInput, UserUncheckedCreateWithoutLeadingInput>
    connectOrCreate?: UserCreateOrConnectWithoutLeadingInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAssistingInput = {
    create?: XOR<UserCreateWithoutAssistingInput, UserUncheckedCreateWithoutAssistingInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssistingInput
    connect?: UserWhereUniqueInput
  }

  export type MemberCreateNestedManyWithoutFellowshipInput = {
    create?: XOR<MemberCreateWithoutFellowshipInput, MemberUncheckedCreateWithoutFellowshipInput> | MemberCreateWithoutFellowshipInput[] | MemberUncheckedCreateWithoutFellowshipInput[]
    connectOrCreate?: MemberCreateOrConnectWithoutFellowshipInput | MemberCreateOrConnectWithoutFellowshipInput[]
    createMany?: MemberCreateManyFellowshipInputEnvelope
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
  }

  export type AttendanceSessionCreateNestedManyWithoutFellowshipInput = {
    create?: XOR<AttendanceSessionCreateWithoutFellowshipInput, AttendanceSessionUncheckedCreateWithoutFellowshipInput> | AttendanceSessionCreateWithoutFellowshipInput[] | AttendanceSessionUncheckedCreateWithoutFellowshipInput[]
    connectOrCreate?: AttendanceSessionCreateOrConnectWithoutFellowshipInput | AttendanceSessionCreateOrConnectWithoutFellowshipInput[]
    createMany?: AttendanceSessionCreateManyFellowshipInputEnvelope
    connect?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
  }

  export type MonthlyReportCreateNestedManyWithoutFellowshipInput = {
    create?: XOR<MonthlyReportCreateWithoutFellowshipInput, MonthlyReportUncheckedCreateWithoutFellowshipInput> | MonthlyReportCreateWithoutFellowshipInput[] | MonthlyReportUncheckedCreateWithoutFellowshipInput[]
    connectOrCreate?: MonthlyReportCreateOrConnectWithoutFellowshipInput | MonthlyReportCreateOrConnectWithoutFellowshipInput[]
    createMany?: MonthlyReportCreateManyFellowshipInputEnvelope
    connect?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
  }

  export type MemberUncheckedCreateNestedManyWithoutFellowshipInput = {
    create?: XOR<MemberCreateWithoutFellowshipInput, MemberUncheckedCreateWithoutFellowshipInput> | MemberCreateWithoutFellowshipInput[] | MemberUncheckedCreateWithoutFellowshipInput[]
    connectOrCreate?: MemberCreateOrConnectWithoutFellowshipInput | MemberCreateOrConnectWithoutFellowshipInput[]
    createMany?: MemberCreateManyFellowshipInputEnvelope
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
  }

  export type AttendanceSessionUncheckedCreateNestedManyWithoutFellowshipInput = {
    create?: XOR<AttendanceSessionCreateWithoutFellowshipInput, AttendanceSessionUncheckedCreateWithoutFellowshipInput> | AttendanceSessionCreateWithoutFellowshipInput[] | AttendanceSessionUncheckedCreateWithoutFellowshipInput[]
    connectOrCreate?: AttendanceSessionCreateOrConnectWithoutFellowshipInput | AttendanceSessionCreateOrConnectWithoutFellowshipInput[]
    createMany?: AttendanceSessionCreateManyFellowshipInputEnvelope
    connect?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
  }

  export type MonthlyReportUncheckedCreateNestedManyWithoutFellowshipInput = {
    create?: XOR<MonthlyReportCreateWithoutFellowshipInput, MonthlyReportUncheckedCreateWithoutFellowshipInput> | MonthlyReportCreateWithoutFellowshipInput[] | MonthlyReportUncheckedCreateWithoutFellowshipInput[]
    connectOrCreate?: MonthlyReportCreateOrConnectWithoutFellowshipInput | MonthlyReportCreateOrConnectWithoutFellowshipInput[]
    createMany?: MonthlyReportCreateManyFellowshipInputEnvelope
    connect?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneWithoutLeadingNestedInput = {
    create?: XOR<UserCreateWithoutLeadingInput, UserUncheckedCreateWithoutLeadingInput>
    connectOrCreate?: UserCreateOrConnectWithoutLeadingInput
    upsert?: UserUpsertWithoutLeadingInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLeadingInput, UserUpdateWithoutLeadingInput>, UserUncheckedUpdateWithoutLeadingInput>
  }

  export type UserUpdateOneWithoutAssistingNestedInput = {
    create?: XOR<UserCreateWithoutAssistingInput, UserUncheckedCreateWithoutAssistingInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssistingInput
    upsert?: UserUpsertWithoutAssistingInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssistingInput, UserUpdateWithoutAssistingInput>, UserUncheckedUpdateWithoutAssistingInput>
  }

  export type MemberUpdateManyWithoutFellowshipNestedInput = {
    create?: XOR<MemberCreateWithoutFellowshipInput, MemberUncheckedCreateWithoutFellowshipInput> | MemberCreateWithoutFellowshipInput[] | MemberUncheckedCreateWithoutFellowshipInput[]
    connectOrCreate?: MemberCreateOrConnectWithoutFellowshipInput | MemberCreateOrConnectWithoutFellowshipInput[]
    upsert?: MemberUpsertWithWhereUniqueWithoutFellowshipInput | MemberUpsertWithWhereUniqueWithoutFellowshipInput[]
    createMany?: MemberCreateManyFellowshipInputEnvelope
    set?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    disconnect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    delete?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    update?: MemberUpdateWithWhereUniqueWithoutFellowshipInput | MemberUpdateWithWhereUniqueWithoutFellowshipInput[]
    updateMany?: MemberUpdateManyWithWhereWithoutFellowshipInput | MemberUpdateManyWithWhereWithoutFellowshipInput[]
    deleteMany?: MemberScalarWhereInput | MemberScalarWhereInput[]
  }

  export type AttendanceSessionUpdateManyWithoutFellowshipNestedInput = {
    create?: XOR<AttendanceSessionCreateWithoutFellowshipInput, AttendanceSessionUncheckedCreateWithoutFellowshipInput> | AttendanceSessionCreateWithoutFellowshipInput[] | AttendanceSessionUncheckedCreateWithoutFellowshipInput[]
    connectOrCreate?: AttendanceSessionCreateOrConnectWithoutFellowshipInput | AttendanceSessionCreateOrConnectWithoutFellowshipInput[]
    upsert?: AttendanceSessionUpsertWithWhereUniqueWithoutFellowshipInput | AttendanceSessionUpsertWithWhereUniqueWithoutFellowshipInput[]
    createMany?: AttendanceSessionCreateManyFellowshipInputEnvelope
    set?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
    disconnect?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
    delete?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
    connect?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
    update?: AttendanceSessionUpdateWithWhereUniqueWithoutFellowshipInput | AttendanceSessionUpdateWithWhereUniqueWithoutFellowshipInput[]
    updateMany?: AttendanceSessionUpdateManyWithWhereWithoutFellowshipInput | AttendanceSessionUpdateManyWithWhereWithoutFellowshipInput[]
    deleteMany?: AttendanceSessionScalarWhereInput | AttendanceSessionScalarWhereInput[]
  }

  export type MonthlyReportUpdateManyWithoutFellowshipNestedInput = {
    create?: XOR<MonthlyReportCreateWithoutFellowshipInput, MonthlyReportUncheckedCreateWithoutFellowshipInput> | MonthlyReportCreateWithoutFellowshipInput[] | MonthlyReportUncheckedCreateWithoutFellowshipInput[]
    connectOrCreate?: MonthlyReportCreateOrConnectWithoutFellowshipInput | MonthlyReportCreateOrConnectWithoutFellowshipInput[]
    upsert?: MonthlyReportUpsertWithWhereUniqueWithoutFellowshipInput | MonthlyReportUpsertWithWhereUniqueWithoutFellowshipInput[]
    createMany?: MonthlyReportCreateManyFellowshipInputEnvelope
    set?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
    disconnect?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
    delete?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
    connect?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
    update?: MonthlyReportUpdateWithWhereUniqueWithoutFellowshipInput | MonthlyReportUpdateWithWhereUniqueWithoutFellowshipInput[]
    updateMany?: MonthlyReportUpdateManyWithWhereWithoutFellowshipInput | MonthlyReportUpdateManyWithWhereWithoutFellowshipInput[]
    deleteMany?: MonthlyReportScalarWhereInput | MonthlyReportScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type MemberUncheckedUpdateManyWithoutFellowshipNestedInput = {
    create?: XOR<MemberCreateWithoutFellowshipInput, MemberUncheckedCreateWithoutFellowshipInput> | MemberCreateWithoutFellowshipInput[] | MemberUncheckedCreateWithoutFellowshipInput[]
    connectOrCreate?: MemberCreateOrConnectWithoutFellowshipInput | MemberCreateOrConnectWithoutFellowshipInput[]
    upsert?: MemberUpsertWithWhereUniqueWithoutFellowshipInput | MemberUpsertWithWhereUniqueWithoutFellowshipInput[]
    createMany?: MemberCreateManyFellowshipInputEnvelope
    set?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    disconnect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    delete?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    update?: MemberUpdateWithWhereUniqueWithoutFellowshipInput | MemberUpdateWithWhereUniqueWithoutFellowshipInput[]
    updateMany?: MemberUpdateManyWithWhereWithoutFellowshipInput | MemberUpdateManyWithWhereWithoutFellowshipInput[]
    deleteMany?: MemberScalarWhereInput | MemberScalarWhereInput[]
  }

  export type AttendanceSessionUncheckedUpdateManyWithoutFellowshipNestedInput = {
    create?: XOR<AttendanceSessionCreateWithoutFellowshipInput, AttendanceSessionUncheckedCreateWithoutFellowshipInput> | AttendanceSessionCreateWithoutFellowshipInput[] | AttendanceSessionUncheckedCreateWithoutFellowshipInput[]
    connectOrCreate?: AttendanceSessionCreateOrConnectWithoutFellowshipInput | AttendanceSessionCreateOrConnectWithoutFellowshipInput[]
    upsert?: AttendanceSessionUpsertWithWhereUniqueWithoutFellowshipInput | AttendanceSessionUpsertWithWhereUniqueWithoutFellowshipInput[]
    createMany?: AttendanceSessionCreateManyFellowshipInputEnvelope
    set?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
    disconnect?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
    delete?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
    connect?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
    update?: AttendanceSessionUpdateWithWhereUniqueWithoutFellowshipInput | AttendanceSessionUpdateWithWhereUniqueWithoutFellowshipInput[]
    updateMany?: AttendanceSessionUpdateManyWithWhereWithoutFellowshipInput | AttendanceSessionUpdateManyWithWhereWithoutFellowshipInput[]
    deleteMany?: AttendanceSessionScalarWhereInput | AttendanceSessionScalarWhereInput[]
  }

  export type MonthlyReportUncheckedUpdateManyWithoutFellowshipNestedInput = {
    create?: XOR<MonthlyReportCreateWithoutFellowshipInput, MonthlyReportUncheckedCreateWithoutFellowshipInput> | MonthlyReportCreateWithoutFellowshipInput[] | MonthlyReportUncheckedCreateWithoutFellowshipInput[]
    connectOrCreate?: MonthlyReportCreateOrConnectWithoutFellowshipInput | MonthlyReportCreateOrConnectWithoutFellowshipInput[]
    upsert?: MonthlyReportUpsertWithWhereUniqueWithoutFellowshipInput | MonthlyReportUpsertWithWhereUniqueWithoutFellowshipInput[]
    createMany?: MonthlyReportCreateManyFellowshipInputEnvelope
    set?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
    disconnect?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
    delete?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
    connect?: MonthlyReportWhereUniqueInput | MonthlyReportWhereUniqueInput[]
    update?: MonthlyReportUpdateWithWhereUniqueWithoutFellowshipInput | MonthlyReportUpdateWithWhereUniqueWithoutFellowshipInput[]
    updateMany?: MonthlyReportUpdateManyWithWhereWithoutFellowshipInput | MonthlyReportUpdateManyWithWhereWithoutFellowshipInput[]
    deleteMany?: MonthlyReportScalarWhereInput | MonthlyReportScalarWhereInput[]
  }

  export type FellowshipCreateNestedOneWithoutLeaderInput = {
    create?: XOR<FellowshipCreateWithoutLeaderInput, FellowshipUncheckedCreateWithoutLeaderInput>
    connectOrCreate?: FellowshipCreateOrConnectWithoutLeaderInput
    connect?: FellowshipWhereUniqueInput
  }

  export type FellowshipCreateNestedOneWithoutAssociateInput = {
    create?: XOR<FellowshipCreateWithoutAssociateInput, FellowshipUncheckedCreateWithoutAssociateInput>
    connectOrCreate?: FellowshipCreateOrConnectWithoutAssociateInput
    connect?: FellowshipWhereUniqueInput
  }

  export type AttendanceSessionCreateNestedManyWithoutSubmitterInput = {
    create?: XOR<AttendanceSessionCreateWithoutSubmitterInput, AttendanceSessionUncheckedCreateWithoutSubmitterInput> | AttendanceSessionCreateWithoutSubmitterInput[] | AttendanceSessionUncheckedCreateWithoutSubmitterInput[]
    connectOrCreate?: AttendanceSessionCreateOrConnectWithoutSubmitterInput | AttendanceSessionCreateOrConnectWithoutSubmitterInput[]
    createMany?: AttendanceSessionCreateManySubmitterInputEnvelope
    connect?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
  }

  export type FellowshipUncheckedCreateNestedOneWithoutLeaderInput = {
    create?: XOR<FellowshipCreateWithoutLeaderInput, FellowshipUncheckedCreateWithoutLeaderInput>
    connectOrCreate?: FellowshipCreateOrConnectWithoutLeaderInput
    connect?: FellowshipWhereUniqueInput
  }

  export type FellowshipUncheckedCreateNestedOneWithoutAssociateInput = {
    create?: XOR<FellowshipCreateWithoutAssociateInput, FellowshipUncheckedCreateWithoutAssociateInput>
    connectOrCreate?: FellowshipCreateOrConnectWithoutAssociateInput
    connect?: FellowshipWhereUniqueInput
  }

  export type AttendanceSessionUncheckedCreateNestedManyWithoutSubmitterInput = {
    create?: XOR<AttendanceSessionCreateWithoutSubmitterInput, AttendanceSessionUncheckedCreateWithoutSubmitterInput> | AttendanceSessionCreateWithoutSubmitterInput[] | AttendanceSessionUncheckedCreateWithoutSubmitterInput[]
    connectOrCreate?: AttendanceSessionCreateOrConnectWithoutSubmitterInput | AttendanceSessionCreateOrConnectWithoutSubmitterInput[]
    createMany?: AttendanceSessionCreateManySubmitterInputEnvelope
    connect?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type FellowshipUpdateOneWithoutLeaderNestedInput = {
    create?: XOR<FellowshipCreateWithoutLeaderInput, FellowshipUncheckedCreateWithoutLeaderInput>
    connectOrCreate?: FellowshipCreateOrConnectWithoutLeaderInput
    upsert?: FellowshipUpsertWithoutLeaderInput
    disconnect?: FellowshipWhereInput | boolean
    delete?: FellowshipWhereInput | boolean
    connect?: FellowshipWhereUniqueInput
    update?: XOR<XOR<FellowshipUpdateToOneWithWhereWithoutLeaderInput, FellowshipUpdateWithoutLeaderInput>, FellowshipUncheckedUpdateWithoutLeaderInput>
  }

  export type FellowshipUpdateOneWithoutAssociateNestedInput = {
    create?: XOR<FellowshipCreateWithoutAssociateInput, FellowshipUncheckedCreateWithoutAssociateInput>
    connectOrCreate?: FellowshipCreateOrConnectWithoutAssociateInput
    upsert?: FellowshipUpsertWithoutAssociateInput
    disconnect?: FellowshipWhereInput | boolean
    delete?: FellowshipWhereInput | boolean
    connect?: FellowshipWhereUniqueInput
    update?: XOR<XOR<FellowshipUpdateToOneWithWhereWithoutAssociateInput, FellowshipUpdateWithoutAssociateInput>, FellowshipUncheckedUpdateWithoutAssociateInput>
  }

  export type AttendanceSessionUpdateManyWithoutSubmitterNestedInput = {
    create?: XOR<AttendanceSessionCreateWithoutSubmitterInput, AttendanceSessionUncheckedCreateWithoutSubmitterInput> | AttendanceSessionCreateWithoutSubmitterInput[] | AttendanceSessionUncheckedCreateWithoutSubmitterInput[]
    connectOrCreate?: AttendanceSessionCreateOrConnectWithoutSubmitterInput | AttendanceSessionCreateOrConnectWithoutSubmitterInput[]
    upsert?: AttendanceSessionUpsertWithWhereUniqueWithoutSubmitterInput | AttendanceSessionUpsertWithWhereUniqueWithoutSubmitterInput[]
    createMany?: AttendanceSessionCreateManySubmitterInputEnvelope
    set?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
    disconnect?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
    delete?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
    connect?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
    update?: AttendanceSessionUpdateWithWhereUniqueWithoutSubmitterInput | AttendanceSessionUpdateWithWhereUniqueWithoutSubmitterInput[]
    updateMany?: AttendanceSessionUpdateManyWithWhereWithoutSubmitterInput | AttendanceSessionUpdateManyWithWhereWithoutSubmitterInput[]
    deleteMany?: AttendanceSessionScalarWhereInput | AttendanceSessionScalarWhereInput[]
  }

  export type FellowshipUncheckedUpdateOneWithoutLeaderNestedInput = {
    create?: XOR<FellowshipCreateWithoutLeaderInput, FellowshipUncheckedCreateWithoutLeaderInput>
    connectOrCreate?: FellowshipCreateOrConnectWithoutLeaderInput
    upsert?: FellowshipUpsertWithoutLeaderInput
    disconnect?: FellowshipWhereInput | boolean
    delete?: FellowshipWhereInput | boolean
    connect?: FellowshipWhereUniqueInput
    update?: XOR<XOR<FellowshipUpdateToOneWithWhereWithoutLeaderInput, FellowshipUpdateWithoutLeaderInput>, FellowshipUncheckedUpdateWithoutLeaderInput>
  }

  export type FellowshipUncheckedUpdateOneWithoutAssociateNestedInput = {
    create?: XOR<FellowshipCreateWithoutAssociateInput, FellowshipUncheckedCreateWithoutAssociateInput>
    connectOrCreate?: FellowshipCreateOrConnectWithoutAssociateInput
    upsert?: FellowshipUpsertWithoutAssociateInput
    disconnect?: FellowshipWhereInput | boolean
    delete?: FellowshipWhereInput | boolean
    connect?: FellowshipWhereUniqueInput
    update?: XOR<XOR<FellowshipUpdateToOneWithWhereWithoutAssociateInput, FellowshipUpdateWithoutAssociateInput>, FellowshipUncheckedUpdateWithoutAssociateInput>
  }

  export type AttendanceSessionUncheckedUpdateManyWithoutSubmitterNestedInput = {
    create?: XOR<AttendanceSessionCreateWithoutSubmitterInput, AttendanceSessionUncheckedCreateWithoutSubmitterInput> | AttendanceSessionCreateWithoutSubmitterInput[] | AttendanceSessionUncheckedCreateWithoutSubmitterInput[]
    connectOrCreate?: AttendanceSessionCreateOrConnectWithoutSubmitterInput | AttendanceSessionCreateOrConnectWithoutSubmitterInput[]
    upsert?: AttendanceSessionUpsertWithWhereUniqueWithoutSubmitterInput | AttendanceSessionUpsertWithWhereUniqueWithoutSubmitterInput[]
    createMany?: AttendanceSessionCreateManySubmitterInputEnvelope
    set?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
    disconnect?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
    delete?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
    connect?: AttendanceSessionWhereUniqueInput | AttendanceSessionWhereUniqueInput[]
    update?: AttendanceSessionUpdateWithWhereUniqueWithoutSubmitterInput | AttendanceSessionUpdateWithWhereUniqueWithoutSubmitterInput[]
    updateMany?: AttendanceSessionUpdateManyWithWhereWithoutSubmitterInput | AttendanceSessionUpdateManyWithWhereWithoutSubmitterInput[]
    deleteMany?: AttendanceSessionScalarWhereInput | AttendanceSessionScalarWhereInput[]
  }

  export type FellowshipCreateNestedOneWithoutMembersInput = {
    create?: XOR<FellowshipCreateWithoutMembersInput, FellowshipUncheckedCreateWithoutMembersInput>
    connectOrCreate?: FellowshipCreateOrConnectWithoutMembersInput
    connect?: FellowshipWhereUniqueInput
  }

  export type AttendanceRecordCreateNestedManyWithoutMemberInput = {
    create?: XOR<AttendanceRecordCreateWithoutMemberInput, AttendanceRecordUncheckedCreateWithoutMemberInput> | AttendanceRecordCreateWithoutMemberInput[] | AttendanceRecordUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutMemberInput | AttendanceRecordCreateOrConnectWithoutMemberInput[]
    createMany?: AttendanceRecordCreateManyMemberInputEnvelope
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
  }

  export type AttendanceRecordUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<AttendanceRecordCreateWithoutMemberInput, AttendanceRecordUncheckedCreateWithoutMemberInput> | AttendanceRecordCreateWithoutMemberInput[] | AttendanceRecordUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutMemberInput | AttendanceRecordCreateOrConnectWithoutMemberInput[]
    createMany?: AttendanceRecordCreateManyMemberInputEnvelope
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type FellowshipUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<FellowshipCreateWithoutMembersInput, FellowshipUncheckedCreateWithoutMembersInput>
    connectOrCreate?: FellowshipCreateOrConnectWithoutMembersInput
    upsert?: FellowshipUpsertWithoutMembersInput
    connect?: FellowshipWhereUniqueInput
    update?: XOR<XOR<FellowshipUpdateToOneWithWhereWithoutMembersInput, FellowshipUpdateWithoutMembersInput>, FellowshipUncheckedUpdateWithoutMembersInput>
  }

  export type AttendanceRecordUpdateManyWithoutMemberNestedInput = {
    create?: XOR<AttendanceRecordCreateWithoutMemberInput, AttendanceRecordUncheckedCreateWithoutMemberInput> | AttendanceRecordCreateWithoutMemberInput[] | AttendanceRecordUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutMemberInput | AttendanceRecordCreateOrConnectWithoutMemberInput[]
    upsert?: AttendanceRecordUpsertWithWhereUniqueWithoutMemberInput | AttendanceRecordUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: AttendanceRecordCreateManyMemberInputEnvelope
    set?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    disconnect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    delete?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    update?: AttendanceRecordUpdateWithWhereUniqueWithoutMemberInput | AttendanceRecordUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: AttendanceRecordUpdateManyWithWhereWithoutMemberInput | AttendanceRecordUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[]
  }

  export type AttendanceRecordUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<AttendanceRecordCreateWithoutMemberInput, AttendanceRecordUncheckedCreateWithoutMemberInput> | AttendanceRecordCreateWithoutMemberInput[] | AttendanceRecordUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutMemberInput | AttendanceRecordCreateOrConnectWithoutMemberInput[]
    upsert?: AttendanceRecordUpsertWithWhereUniqueWithoutMemberInput | AttendanceRecordUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: AttendanceRecordCreateManyMemberInputEnvelope
    set?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    disconnect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    delete?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    update?: AttendanceRecordUpdateWithWhereUniqueWithoutMemberInput | AttendanceRecordUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: AttendanceRecordUpdateManyWithWhereWithoutMemberInput | AttendanceRecordUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[]
  }

  export type FellowshipCreateNestedOneWithoutSessionsInput = {
    create?: XOR<FellowshipCreateWithoutSessionsInput, FellowshipUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: FellowshipCreateOrConnectWithoutSessionsInput
    connect?: FellowshipWhereUniqueInput
  }

  export type AttendanceRecordCreateNestedManyWithoutSessionInput = {
    create?: XOR<AttendanceRecordCreateWithoutSessionInput, AttendanceRecordUncheckedCreateWithoutSessionInput> | AttendanceRecordCreateWithoutSessionInput[] | AttendanceRecordUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutSessionInput | AttendanceRecordCreateOrConnectWithoutSessionInput[]
    createMany?: AttendanceRecordCreateManySessionInputEnvelope
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutSubmittedSessionsInput = {
    create?: XOR<UserCreateWithoutSubmittedSessionsInput, UserUncheckedCreateWithoutSubmittedSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmittedSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type AttendanceRecordUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<AttendanceRecordCreateWithoutSessionInput, AttendanceRecordUncheckedCreateWithoutSessionInput> | AttendanceRecordCreateWithoutSessionInput[] | AttendanceRecordUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutSessionInput | AttendanceRecordCreateOrConnectWithoutSessionInput[]
    createMany?: AttendanceRecordCreateManySessionInputEnvelope
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type FellowshipUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<FellowshipCreateWithoutSessionsInput, FellowshipUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: FellowshipCreateOrConnectWithoutSessionsInput
    upsert?: FellowshipUpsertWithoutSessionsInput
    connect?: FellowshipWhereUniqueInput
    update?: XOR<XOR<FellowshipUpdateToOneWithWhereWithoutSessionsInput, FellowshipUpdateWithoutSessionsInput>, FellowshipUncheckedUpdateWithoutSessionsInput>
  }

  export type AttendanceRecordUpdateManyWithoutSessionNestedInput = {
    create?: XOR<AttendanceRecordCreateWithoutSessionInput, AttendanceRecordUncheckedCreateWithoutSessionInput> | AttendanceRecordCreateWithoutSessionInput[] | AttendanceRecordUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutSessionInput | AttendanceRecordCreateOrConnectWithoutSessionInput[]
    upsert?: AttendanceRecordUpsertWithWhereUniqueWithoutSessionInput | AttendanceRecordUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: AttendanceRecordCreateManySessionInputEnvelope
    set?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    disconnect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    delete?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    update?: AttendanceRecordUpdateWithWhereUniqueWithoutSessionInput | AttendanceRecordUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: AttendanceRecordUpdateManyWithWhereWithoutSessionInput | AttendanceRecordUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[]
  }

  export type UserUpdateOneWithoutSubmittedSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSubmittedSessionsInput, UserUncheckedCreateWithoutSubmittedSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmittedSessionsInput
    upsert?: UserUpsertWithoutSubmittedSessionsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubmittedSessionsInput, UserUpdateWithoutSubmittedSessionsInput>, UserUncheckedUpdateWithoutSubmittedSessionsInput>
  }

  export type AttendanceRecordUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<AttendanceRecordCreateWithoutSessionInput, AttendanceRecordUncheckedCreateWithoutSessionInput> | AttendanceRecordCreateWithoutSessionInput[] | AttendanceRecordUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: AttendanceRecordCreateOrConnectWithoutSessionInput | AttendanceRecordCreateOrConnectWithoutSessionInput[]
    upsert?: AttendanceRecordUpsertWithWhereUniqueWithoutSessionInput | AttendanceRecordUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: AttendanceRecordCreateManySessionInputEnvelope
    set?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    disconnect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    delete?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[]
    update?: AttendanceRecordUpdateWithWhereUniqueWithoutSessionInput | AttendanceRecordUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: AttendanceRecordUpdateManyWithWhereWithoutSessionInput | AttendanceRecordUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[]
  }

  export type AttendanceSessionCreateNestedOneWithoutRecordsInput = {
    create?: XOR<AttendanceSessionCreateWithoutRecordsInput, AttendanceSessionUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: AttendanceSessionCreateOrConnectWithoutRecordsInput
    connect?: AttendanceSessionWhereUniqueInput
  }

  export type MemberCreateNestedOneWithoutAttendanceRecordsInput = {
    create?: XOR<MemberCreateWithoutAttendanceRecordsInput, MemberUncheckedCreateWithoutAttendanceRecordsInput>
    connectOrCreate?: MemberCreateOrConnectWithoutAttendanceRecordsInput
    connect?: MemberWhereUniqueInput
  }

  export type AttendanceSessionUpdateOneRequiredWithoutRecordsNestedInput = {
    create?: XOR<AttendanceSessionCreateWithoutRecordsInput, AttendanceSessionUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: AttendanceSessionCreateOrConnectWithoutRecordsInput
    upsert?: AttendanceSessionUpsertWithoutRecordsInput
    connect?: AttendanceSessionWhereUniqueInput
    update?: XOR<XOR<AttendanceSessionUpdateToOneWithWhereWithoutRecordsInput, AttendanceSessionUpdateWithoutRecordsInput>, AttendanceSessionUncheckedUpdateWithoutRecordsInput>
  }

  export type MemberUpdateOneRequiredWithoutAttendanceRecordsNestedInput = {
    create?: XOR<MemberCreateWithoutAttendanceRecordsInput, MemberUncheckedCreateWithoutAttendanceRecordsInput>
    connectOrCreate?: MemberCreateOrConnectWithoutAttendanceRecordsInput
    upsert?: MemberUpsertWithoutAttendanceRecordsInput
    connect?: MemberWhereUniqueInput
    update?: XOR<XOR<MemberUpdateToOneWithWhereWithoutAttendanceRecordsInput, MemberUpdateWithoutAttendanceRecordsInput>, MemberUncheckedUpdateWithoutAttendanceRecordsInput>
  }

  export type FellowshipCreateNestedOneWithoutReportsInput = {
    create?: XOR<FellowshipCreateWithoutReportsInput, FellowshipUncheckedCreateWithoutReportsInput>
    connectOrCreate?: FellowshipCreateOrConnectWithoutReportsInput
    connect?: FellowshipWhereUniqueInput
  }

  export type EnumReportStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReportStatus
  }

  export type FellowshipUpdateOneRequiredWithoutReportsNestedInput = {
    create?: XOR<FellowshipCreateWithoutReportsInput, FellowshipUncheckedCreateWithoutReportsInput>
    connectOrCreate?: FellowshipCreateOrConnectWithoutReportsInput
    upsert?: FellowshipUpsertWithoutReportsInput
    connect?: FellowshipWhereUniqueInput
    update?: XOR<XOR<FellowshipUpdateToOneWithWhereWithoutReportsInput, FellowshipUpdateWithoutReportsInput>, FellowshipUncheckedUpdateWithoutReportsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus
  }

  export type NestedEnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportStatus[] | ListEnumReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportStatusFilter<$PrismaModel>
    _max?: NestedEnumReportStatusFilter<$PrismaModel>
  }

  export type UserCreateWithoutLeadingInput = {
    id?: string
    churchId: string
    email: string
    fullName: string
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    assisting?: FellowshipCreateNestedOneWithoutAssociateInput
    submittedSessions?: AttendanceSessionCreateNestedManyWithoutSubmitterInput
  }

  export type UserUncheckedCreateWithoutLeadingInput = {
    id?: string
    churchId: string
    email: string
    fullName: string
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    assisting?: FellowshipUncheckedCreateNestedOneWithoutAssociateInput
    submittedSessions?: AttendanceSessionUncheckedCreateNestedManyWithoutSubmitterInput
  }

  export type UserCreateOrConnectWithoutLeadingInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLeadingInput, UserUncheckedCreateWithoutLeadingInput>
  }

  export type UserCreateWithoutAssistingInput = {
    id?: string
    churchId: string
    email: string
    fullName: string
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    leading?: FellowshipCreateNestedOneWithoutLeaderInput
    submittedSessions?: AttendanceSessionCreateNestedManyWithoutSubmitterInput
  }

  export type UserUncheckedCreateWithoutAssistingInput = {
    id?: string
    churchId: string
    email: string
    fullName: string
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    leading?: FellowshipUncheckedCreateNestedOneWithoutLeaderInput
    submittedSessions?: AttendanceSessionUncheckedCreateNestedManyWithoutSubmitterInput
  }

  export type UserCreateOrConnectWithoutAssistingInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssistingInput, UserUncheckedCreateWithoutAssistingInput>
  }

  export type MemberCreateWithoutFellowshipInput = {
    id?: string
    fullName: string
    phone?: string | null
    email?: string | null
    qrUniqueId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    attendanceRecords?: AttendanceRecordCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutFellowshipInput = {
    id?: string
    fullName: string
    phone?: string | null
    email?: string | null
    qrUniqueId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    attendanceRecords?: AttendanceRecordUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutFellowshipInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutFellowshipInput, MemberUncheckedCreateWithoutFellowshipInput>
  }

  export type MemberCreateManyFellowshipInputEnvelope = {
    data: MemberCreateManyFellowshipInput | MemberCreateManyFellowshipInput[]
    skipDuplicates?: boolean
  }

  export type AttendanceSessionCreateWithoutFellowshipInput = {
    id?: string
    weekNumber: number
    monthYear: string
    meetingDate: Date | string
    isSubmitted?: boolean
    submittedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    records?: AttendanceRecordCreateNestedManyWithoutSessionInput
    submitter?: UserCreateNestedOneWithoutSubmittedSessionsInput
  }

  export type AttendanceSessionUncheckedCreateWithoutFellowshipInput = {
    id?: string
    weekNumber: number
    monthYear: string
    meetingDate: Date | string
    isSubmitted?: boolean
    submittedAt?: Date | string | null
    submittedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    records?: AttendanceRecordUncheckedCreateNestedManyWithoutSessionInput
  }

  export type AttendanceSessionCreateOrConnectWithoutFellowshipInput = {
    where: AttendanceSessionWhereUniqueInput
    create: XOR<AttendanceSessionCreateWithoutFellowshipInput, AttendanceSessionUncheckedCreateWithoutFellowshipInput>
  }

  export type AttendanceSessionCreateManyFellowshipInputEnvelope = {
    data: AttendanceSessionCreateManyFellowshipInput | AttendanceSessionCreateManyFellowshipInput[]
    skipDuplicates?: boolean
  }

  export type MonthlyReportCreateWithoutFellowshipInput = {
    id?: string
    monthYear: string
    week1Date?: Date | string | null
    week2Date?: Date | string | null
    week3Date?: Date | string | null
    week4Date?: Date | string | null
    week5Date?: Date | string | null
    week1Count?: number
    week2Count?: number
    week3Count?: number
    week4Count?: number
    week5Count?: number
    prayerFlag?: boolean
    firstTimers?: number
    newMembers?: number
    followUps?: number
    escalations?: string | null
    comments?: string | null
    status?: $Enums.ReportStatus
    finalizedAt?: Date | string | null
    finalizedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyReportUncheckedCreateWithoutFellowshipInput = {
    id?: string
    monthYear: string
    week1Date?: Date | string | null
    week2Date?: Date | string | null
    week3Date?: Date | string | null
    week4Date?: Date | string | null
    week5Date?: Date | string | null
    week1Count?: number
    week2Count?: number
    week3Count?: number
    week4Count?: number
    week5Count?: number
    prayerFlag?: boolean
    firstTimers?: number
    newMembers?: number
    followUps?: number
    escalations?: string | null
    comments?: string | null
    status?: $Enums.ReportStatus
    finalizedAt?: Date | string | null
    finalizedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyReportCreateOrConnectWithoutFellowshipInput = {
    where: MonthlyReportWhereUniqueInput
    create: XOR<MonthlyReportCreateWithoutFellowshipInput, MonthlyReportUncheckedCreateWithoutFellowshipInput>
  }

  export type MonthlyReportCreateManyFellowshipInputEnvelope = {
    data: MonthlyReportCreateManyFellowshipInput | MonthlyReportCreateManyFellowshipInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutLeadingInput = {
    update: XOR<UserUpdateWithoutLeadingInput, UserUncheckedUpdateWithoutLeadingInput>
    create: XOR<UserCreateWithoutLeadingInput, UserUncheckedCreateWithoutLeadingInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLeadingInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLeadingInput, UserUncheckedUpdateWithoutLeadingInput>
  }

  export type UserUpdateWithoutLeadingInput = {
    id?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assisting?: FellowshipUpdateOneWithoutAssociateNestedInput
    submittedSessions?: AttendanceSessionUpdateManyWithoutSubmitterNestedInput
  }

  export type UserUncheckedUpdateWithoutLeadingInput = {
    id?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assisting?: FellowshipUncheckedUpdateOneWithoutAssociateNestedInput
    submittedSessions?: AttendanceSessionUncheckedUpdateManyWithoutSubmitterNestedInput
  }

  export type UserUpsertWithoutAssistingInput = {
    update: XOR<UserUpdateWithoutAssistingInput, UserUncheckedUpdateWithoutAssistingInput>
    create: XOR<UserCreateWithoutAssistingInput, UserUncheckedCreateWithoutAssistingInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssistingInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssistingInput, UserUncheckedUpdateWithoutAssistingInput>
  }

  export type UserUpdateWithoutAssistingInput = {
    id?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leading?: FellowshipUpdateOneWithoutLeaderNestedInput
    submittedSessions?: AttendanceSessionUpdateManyWithoutSubmitterNestedInput
  }

  export type UserUncheckedUpdateWithoutAssistingInput = {
    id?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leading?: FellowshipUncheckedUpdateOneWithoutLeaderNestedInput
    submittedSessions?: AttendanceSessionUncheckedUpdateManyWithoutSubmitterNestedInput
  }

  export type MemberUpsertWithWhereUniqueWithoutFellowshipInput = {
    where: MemberWhereUniqueInput
    update: XOR<MemberUpdateWithoutFellowshipInput, MemberUncheckedUpdateWithoutFellowshipInput>
    create: XOR<MemberCreateWithoutFellowshipInput, MemberUncheckedCreateWithoutFellowshipInput>
  }

  export type MemberUpdateWithWhereUniqueWithoutFellowshipInput = {
    where: MemberWhereUniqueInput
    data: XOR<MemberUpdateWithoutFellowshipInput, MemberUncheckedUpdateWithoutFellowshipInput>
  }

  export type MemberUpdateManyWithWhereWithoutFellowshipInput = {
    where: MemberScalarWhereInput
    data: XOR<MemberUpdateManyMutationInput, MemberUncheckedUpdateManyWithoutFellowshipInput>
  }

  export type MemberScalarWhereInput = {
    AND?: MemberScalarWhereInput | MemberScalarWhereInput[]
    OR?: MemberScalarWhereInput[]
    NOT?: MemberScalarWhereInput | MemberScalarWhereInput[]
    id?: StringFilter<"Member"> | string
    fullName?: StringFilter<"Member"> | string
    phone?: StringNullableFilter<"Member"> | string | null
    email?: StringNullableFilter<"Member"> | string | null
    qrUniqueId?: StringFilter<"Member"> | string
    isActive?: BoolFilter<"Member"> | boolean
    fellowshipId?: StringFilter<"Member"> | string
    createdAt?: DateTimeFilter<"Member"> | Date | string
    updatedAt?: DateTimeFilter<"Member"> | Date | string
  }

  export type AttendanceSessionUpsertWithWhereUniqueWithoutFellowshipInput = {
    where: AttendanceSessionWhereUniqueInput
    update: XOR<AttendanceSessionUpdateWithoutFellowshipInput, AttendanceSessionUncheckedUpdateWithoutFellowshipInput>
    create: XOR<AttendanceSessionCreateWithoutFellowshipInput, AttendanceSessionUncheckedCreateWithoutFellowshipInput>
  }

  export type AttendanceSessionUpdateWithWhereUniqueWithoutFellowshipInput = {
    where: AttendanceSessionWhereUniqueInput
    data: XOR<AttendanceSessionUpdateWithoutFellowshipInput, AttendanceSessionUncheckedUpdateWithoutFellowshipInput>
  }

  export type AttendanceSessionUpdateManyWithWhereWithoutFellowshipInput = {
    where: AttendanceSessionScalarWhereInput
    data: XOR<AttendanceSessionUpdateManyMutationInput, AttendanceSessionUncheckedUpdateManyWithoutFellowshipInput>
  }

  export type AttendanceSessionScalarWhereInput = {
    AND?: AttendanceSessionScalarWhereInput | AttendanceSessionScalarWhereInput[]
    OR?: AttendanceSessionScalarWhereInput[]
    NOT?: AttendanceSessionScalarWhereInput | AttendanceSessionScalarWhereInput[]
    id?: StringFilter<"AttendanceSession"> | string
    fellowshipId?: StringFilter<"AttendanceSession"> | string
    weekNumber?: IntFilter<"AttendanceSession"> | number
    monthYear?: StringFilter<"AttendanceSession"> | string
    meetingDate?: DateTimeFilter<"AttendanceSession"> | Date | string
    isSubmitted?: BoolFilter<"AttendanceSession"> | boolean
    submittedAt?: DateTimeNullableFilter<"AttendanceSession"> | Date | string | null
    submittedBy?: StringNullableFilter<"AttendanceSession"> | string | null
    createdAt?: DateTimeFilter<"AttendanceSession"> | Date | string
    updatedAt?: DateTimeFilter<"AttendanceSession"> | Date | string
  }

  export type MonthlyReportUpsertWithWhereUniqueWithoutFellowshipInput = {
    where: MonthlyReportWhereUniqueInput
    update: XOR<MonthlyReportUpdateWithoutFellowshipInput, MonthlyReportUncheckedUpdateWithoutFellowshipInput>
    create: XOR<MonthlyReportCreateWithoutFellowshipInput, MonthlyReportUncheckedCreateWithoutFellowshipInput>
  }

  export type MonthlyReportUpdateWithWhereUniqueWithoutFellowshipInput = {
    where: MonthlyReportWhereUniqueInput
    data: XOR<MonthlyReportUpdateWithoutFellowshipInput, MonthlyReportUncheckedUpdateWithoutFellowshipInput>
  }

  export type MonthlyReportUpdateManyWithWhereWithoutFellowshipInput = {
    where: MonthlyReportScalarWhereInput
    data: XOR<MonthlyReportUpdateManyMutationInput, MonthlyReportUncheckedUpdateManyWithoutFellowshipInput>
  }

  export type MonthlyReportScalarWhereInput = {
    AND?: MonthlyReportScalarWhereInput | MonthlyReportScalarWhereInput[]
    OR?: MonthlyReportScalarWhereInput[]
    NOT?: MonthlyReportScalarWhereInput | MonthlyReportScalarWhereInput[]
    id?: StringFilter<"MonthlyReport"> | string
    fellowshipId?: StringFilter<"MonthlyReport"> | string
    monthYear?: StringFilter<"MonthlyReport"> | string
    week1Date?: DateTimeNullableFilter<"MonthlyReport"> | Date | string | null
    week2Date?: DateTimeNullableFilter<"MonthlyReport"> | Date | string | null
    week3Date?: DateTimeNullableFilter<"MonthlyReport"> | Date | string | null
    week4Date?: DateTimeNullableFilter<"MonthlyReport"> | Date | string | null
    week5Date?: DateTimeNullableFilter<"MonthlyReport"> | Date | string | null
    week1Count?: IntFilter<"MonthlyReport"> | number
    week2Count?: IntFilter<"MonthlyReport"> | number
    week3Count?: IntFilter<"MonthlyReport"> | number
    week4Count?: IntFilter<"MonthlyReport"> | number
    week5Count?: IntFilter<"MonthlyReport"> | number
    prayerFlag?: BoolFilter<"MonthlyReport"> | boolean
    firstTimers?: IntFilter<"MonthlyReport"> | number
    newMembers?: IntFilter<"MonthlyReport"> | number
    followUps?: IntFilter<"MonthlyReport"> | number
    escalations?: StringNullableFilter<"MonthlyReport"> | string | null
    comments?: StringNullableFilter<"MonthlyReport"> | string | null
    status?: EnumReportStatusFilter<"MonthlyReport"> | $Enums.ReportStatus
    finalizedAt?: DateTimeNullableFilter<"MonthlyReport"> | Date | string | null
    finalizedBy?: StringNullableFilter<"MonthlyReport"> | string | null
    createdAt?: DateTimeFilter<"MonthlyReport"> | Date | string
    updatedAt?: DateTimeFilter<"MonthlyReport"> | Date | string
  }

  export type FellowshipCreateWithoutLeaderInput = {
    id?: string
    name: string
    location: string
    createdAt?: Date | string
    updatedAt?: Date | string
    associate?: UserCreateNestedOneWithoutAssistingInput
    members?: MemberCreateNestedManyWithoutFellowshipInput
    sessions?: AttendanceSessionCreateNestedManyWithoutFellowshipInput
    reports?: MonthlyReportCreateNestedManyWithoutFellowshipInput
  }

  export type FellowshipUncheckedCreateWithoutLeaderInput = {
    id?: string
    name: string
    location: string
    associateId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberUncheckedCreateNestedManyWithoutFellowshipInput
    sessions?: AttendanceSessionUncheckedCreateNestedManyWithoutFellowshipInput
    reports?: MonthlyReportUncheckedCreateNestedManyWithoutFellowshipInput
  }

  export type FellowshipCreateOrConnectWithoutLeaderInput = {
    where: FellowshipWhereUniqueInput
    create: XOR<FellowshipCreateWithoutLeaderInput, FellowshipUncheckedCreateWithoutLeaderInput>
  }

  export type FellowshipCreateWithoutAssociateInput = {
    id?: string
    name: string
    location: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leader?: UserCreateNestedOneWithoutLeadingInput
    members?: MemberCreateNestedManyWithoutFellowshipInput
    sessions?: AttendanceSessionCreateNestedManyWithoutFellowshipInput
    reports?: MonthlyReportCreateNestedManyWithoutFellowshipInput
  }

  export type FellowshipUncheckedCreateWithoutAssociateInput = {
    id?: string
    name: string
    location: string
    leaderId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberUncheckedCreateNestedManyWithoutFellowshipInput
    sessions?: AttendanceSessionUncheckedCreateNestedManyWithoutFellowshipInput
    reports?: MonthlyReportUncheckedCreateNestedManyWithoutFellowshipInput
  }

  export type FellowshipCreateOrConnectWithoutAssociateInput = {
    where: FellowshipWhereUniqueInput
    create: XOR<FellowshipCreateWithoutAssociateInput, FellowshipUncheckedCreateWithoutAssociateInput>
  }

  export type AttendanceSessionCreateWithoutSubmitterInput = {
    id?: string
    weekNumber: number
    monthYear: string
    meetingDate: Date | string
    isSubmitted?: boolean
    submittedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fellowship: FellowshipCreateNestedOneWithoutSessionsInput
    records?: AttendanceRecordCreateNestedManyWithoutSessionInput
  }

  export type AttendanceSessionUncheckedCreateWithoutSubmitterInput = {
    id?: string
    fellowshipId: string
    weekNumber: number
    monthYear: string
    meetingDate: Date | string
    isSubmitted?: boolean
    submittedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    records?: AttendanceRecordUncheckedCreateNestedManyWithoutSessionInput
  }

  export type AttendanceSessionCreateOrConnectWithoutSubmitterInput = {
    where: AttendanceSessionWhereUniqueInput
    create: XOR<AttendanceSessionCreateWithoutSubmitterInput, AttendanceSessionUncheckedCreateWithoutSubmitterInput>
  }

  export type AttendanceSessionCreateManySubmitterInputEnvelope = {
    data: AttendanceSessionCreateManySubmitterInput | AttendanceSessionCreateManySubmitterInput[]
    skipDuplicates?: boolean
  }

  export type FellowshipUpsertWithoutLeaderInput = {
    update: XOR<FellowshipUpdateWithoutLeaderInput, FellowshipUncheckedUpdateWithoutLeaderInput>
    create: XOR<FellowshipCreateWithoutLeaderInput, FellowshipUncheckedCreateWithoutLeaderInput>
    where?: FellowshipWhereInput
  }

  export type FellowshipUpdateToOneWithWhereWithoutLeaderInput = {
    where?: FellowshipWhereInput
    data: XOR<FellowshipUpdateWithoutLeaderInput, FellowshipUncheckedUpdateWithoutLeaderInput>
  }

  export type FellowshipUpdateWithoutLeaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    associate?: UserUpdateOneWithoutAssistingNestedInput
    members?: MemberUpdateManyWithoutFellowshipNestedInput
    sessions?: AttendanceSessionUpdateManyWithoutFellowshipNestedInput
    reports?: MonthlyReportUpdateManyWithoutFellowshipNestedInput
  }

  export type FellowshipUncheckedUpdateWithoutLeaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    associateId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberUncheckedUpdateManyWithoutFellowshipNestedInput
    sessions?: AttendanceSessionUncheckedUpdateManyWithoutFellowshipNestedInput
    reports?: MonthlyReportUncheckedUpdateManyWithoutFellowshipNestedInput
  }

  export type FellowshipUpsertWithoutAssociateInput = {
    update: XOR<FellowshipUpdateWithoutAssociateInput, FellowshipUncheckedUpdateWithoutAssociateInput>
    create: XOR<FellowshipCreateWithoutAssociateInput, FellowshipUncheckedCreateWithoutAssociateInput>
    where?: FellowshipWhereInput
  }

  export type FellowshipUpdateToOneWithWhereWithoutAssociateInput = {
    where?: FellowshipWhereInput
    data: XOR<FellowshipUpdateWithoutAssociateInput, FellowshipUncheckedUpdateWithoutAssociateInput>
  }

  export type FellowshipUpdateWithoutAssociateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leader?: UserUpdateOneWithoutLeadingNestedInput
    members?: MemberUpdateManyWithoutFellowshipNestedInput
    sessions?: AttendanceSessionUpdateManyWithoutFellowshipNestedInput
    reports?: MonthlyReportUpdateManyWithoutFellowshipNestedInput
  }

  export type FellowshipUncheckedUpdateWithoutAssociateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    leaderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberUncheckedUpdateManyWithoutFellowshipNestedInput
    sessions?: AttendanceSessionUncheckedUpdateManyWithoutFellowshipNestedInput
    reports?: MonthlyReportUncheckedUpdateManyWithoutFellowshipNestedInput
  }

  export type AttendanceSessionUpsertWithWhereUniqueWithoutSubmitterInput = {
    where: AttendanceSessionWhereUniqueInput
    update: XOR<AttendanceSessionUpdateWithoutSubmitterInput, AttendanceSessionUncheckedUpdateWithoutSubmitterInput>
    create: XOR<AttendanceSessionCreateWithoutSubmitterInput, AttendanceSessionUncheckedCreateWithoutSubmitterInput>
  }

  export type AttendanceSessionUpdateWithWhereUniqueWithoutSubmitterInput = {
    where: AttendanceSessionWhereUniqueInput
    data: XOR<AttendanceSessionUpdateWithoutSubmitterInput, AttendanceSessionUncheckedUpdateWithoutSubmitterInput>
  }

  export type AttendanceSessionUpdateManyWithWhereWithoutSubmitterInput = {
    where: AttendanceSessionScalarWhereInput
    data: XOR<AttendanceSessionUpdateManyMutationInput, AttendanceSessionUncheckedUpdateManyWithoutSubmitterInput>
  }

  export type FellowshipCreateWithoutMembersInput = {
    id?: string
    name: string
    location: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leader?: UserCreateNestedOneWithoutLeadingInput
    associate?: UserCreateNestedOneWithoutAssistingInput
    sessions?: AttendanceSessionCreateNestedManyWithoutFellowshipInput
    reports?: MonthlyReportCreateNestedManyWithoutFellowshipInput
  }

  export type FellowshipUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    location: string
    leaderId?: string | null
    associateId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: AttendanceSessionUncheckedCreateNestedManyWithoutFellowshipInput
    reports?: MonthlyReportUncheckedCreateNestedManyWithoutFellowshipInput
  }

  export type FellowshipCreateOrConnectWithoutMembersInput = {
    where: FellowshipWhereUniqueInput
    create: XOR<FellowshipCreateWithoutMembersInput, FellowshipUncheckedCreateWithoutMembersInput>
  }

  export type AttendanceRecordCreateWithoutMemberInput = {
    id?: string
    checkInMethod: string
    checkedInBy: string
    checkedInAt?: Date | string
    session: AttendanceSessionCreateNestedOneWithoutRecordsInput
  }

  export type AttendanceRecordUncheckedCreateWithoutMemberInput = {
    id?: string
    sessionId: string
    checkInMethod: string
    checkedInBy: string
    checkedInAt?: Date | string
  }

  export type AttendanceRecordCreateOrConnectWithoutMemberInput = {
    where: AttendanceRecordWhereUniqueInput
    create: XOR<AttendanceRecordCreateWithoutMemberInput, AttendanceRecordUncheckedCreateWithoutMemberInput>
  }

  export type AttendanceRecordCreateManyMemberInputEnvelope = {
    data: AttendanceRecordCreateManyMemberInput | AttendanceRecordCreateManyMemberInput[]
    skipDuplicates?: boolean
  }

  export type FellowshipUpsertWithoutMembersInput = {
    update: XOR<FellowshipUpdateWithoutMembersInput, FellowshipUncheckedUpdateWithoutMembersInput>
    create: XOR<FellowshipCreateWithoutMembersInput, FellowshipUncheckedCreateWithoutMembersInput>
    where?: FellowshipWhereInput
  }

  export type FellowshipUpdateToOneWithWhereWithoutMembersInput = {
    where?: FellowshipWhereInput
    data: XOR<FellowshipUpdateWithoutMembersInput, FellowshipUncheckedUpdateWithoutMembersInput>
  }

  export type FellowshipUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leader?: UserUpdateOneWithoutLeadingNestedInput
    associate?: UserUpdateOneWithoutAssistingNestedInput
    sessions?: AttendanceSessionUpdateManyWithoutFellowshipNestedInput
    reports?: MonthlyReportUpdateManyWithoutFellowshipNestedInput
  }

  export type FellowshipUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    leaderId?: NullableStringFieldUpdateOperationsInput | string | null
    associateId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: AttendanceSessionUncheckedUpdateManyWithoutFellowshipNestedInput
    reports?: MonthlyReportUncheckedUpdateManyWithoutFellowshipNestedInput
  }

  export type AttendanceRecordUpsertWithWhereUniqueWithoutMemberInput = {
    where: AttendanceRecordWhereUniqueInput
    update: XOR<AttendanceRecordUpdateWithoutMemberInput, AttendanceRecordUncheckedUpdateWithoutMemberInput>
    create: XOR<AttendanceRecordCreateWithoutMemberInput, AttendanceRecordUncheckedCreateWithoutMemberInput>
  }

  export type AttendanceRecordUpdateWithWhereUniqueWithoutMemberInput = {
    where: AttendanceRecordWhereUniqueInput
    data: XOR<AttendanceRecordUpdateWithoutMemberInput, AttendanceRecordUncheckedUpdateWithoutMemberInput>
  }

  export type AttendanceRecordUpdateManyWithWhereWithoutMemberInput = {
    where: AttendanceRecordScalarWhereInput
    data: XOR<AttendanceRecordUpdateManyMutationInput, AttendanceRecordUncheckedUpdateManyWithoutMemberInput>
  }

  export type AttendanceRecordScalarWhereInput = {
    AND?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[]
    OR?: AttendanceRecordScalarWhereInput[]
    NOT?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[]
    id?: StringFilter<"AttendanceRecord"> | string
    sessionId?: StringFilter<"AttendanceRecord"> | string
    memberId?: StringFilter<"AttendanceRecord"> | string
    checkInMethod?: StringFilter<"AttendanceRecord"> | string
    checkedInBy?: StringFilter<"AttendanceRecord"> | string
    checkedInAt?: DateTimeFilter<"AttendanceRecord"> | Date | string
  }

  export type FellowshipCreateWithoutSessionsInput = {
    id?: string
    name: string
    location: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leader?: UserCreateNestedOneWithoutLeadingInput
    associate?: UserCreateNestedOneWithoutAssistingInput
    members?: MemberCreateNestedManyWithoutFellowshipInput
    reports?: MonthlyReportCreateNestedManyWithoutFellowshipInput
  }

  export type FellowshipUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    location: string
    leaderId?: string | null
    associateId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberUncheckedCreateNestedManyWithoutFellowshipInput
    reports?: MonthlyReportUncheckedCreateNestedManyWithoutFellowshipInput
  }

  export type FellowshipCreateOrConnectWithoutSessionsInput = {
    where: FellowshipWhereUniqueInput
    create: XOR<FellowshipCreateWithoutSessionsInput, FellowshipUncheckedCreateWithoutSessionsInput>
  }

  export type AttendanceRecordCreateWithoutSessionInput = {
    id?: string
    checkInMethod: string
    checkedInBy: string
    checkedInAt?: Date | string
    member: MemberCreateNestedOneWithoutAttendanceRecordsInput
  }

  export type AttendanceRecordUncheckedCreateWithoutSessionInput = {
    id?: string
    memberId: string
    checkInMethod: string
    checkedInBy: string
    checkedInAt?: Date | string
  }

  export type AttendanceRecordCreateOrConnectWithoutSessionInput = {
    where: AttendanceRecordWhereUniqueInput
    create: XOR<AttendanceRecordCreateWithoutSessionInput, AttendanceRecordUncheckedCreateWithoutSessionInput>
  }

  export type AttendanceRecordCreateManySessionInputEnvelope = {
    data: AttendanceRecordCreateManySessionInput | AttendanceRecordCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutSubmittedSessionsInput = {
    id?: string
    churchId: string
    email: string
    fullName: string
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    leading?: FellowshipCreateNestedOneWithoutLeaderInput
    assisting?: FellowshipCreateNestedOneWithoutAssociateInput
  }

  export type UserUncheckedCreateWithoutSubmittedSessionsInput = {
    id?: string
    churchId: string
    email: string
    fullName: string
    passwordHash: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    leading?: FellowshipUncheckedCreateNestedOneWithoutLeaderInput
    assisting?: FellowshipUncheckedCreateNestedOneWithoutAssociateInput
  }

  export type UserCreateOrConnectWithoutSubmittedSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubmittedSessionsInput, UserUncheckedCreateWithoutSubmittedSessionsInput>
  }

  export type FellowshipUpsertWithoutSessionsInput = {
    update: XOR<FellowshipUpdateWithoutSessionsInput, FellowshipUncheckedUpdateWithoutSessionsInput>
    create: XOR<FellowshipCreateWithoutSessionsInput, FellowshipUncheckedCreateWithoutSessionsInput>
    where?: FellowshipWhereInput
  }

  export type FellowshipUpdateToOneWithWhereWithoutSessionsInput = {
    where?: FellowshipWhereInput
    data: XOR<FellowshipUpdateWithoutSessionsInput, FellowshipUncheckedUpdateWithoutSessionsInput>
  }

  export type FellowshipUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leader?: UserUpdateOneWithoutLeadingNestedInput
    associate?: UserUpdateOneWithoutAssistingNestedInput
    members?: MemberUpdateManyWithoutFellowshipNestedInput
    reports?: MonthlyReportUpdateManyWithoutFellowshipNestedInput
  }

  export type FellowshipUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    leaderId?: NullableStringFieldUpdateOperationsInput | string | null
    associateId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberUncheckedUpdateManyWithoutFellowshipNestedInput
    reports?: MonthlyReportUncheckedUpdateManyWithoutFellowshipNestedInput
  }

  export type AttendanceRecordUpsertWithWhereUniqueWithoutSessionInput = {
    where: AttendanceRecordWhereUniqueInput
    update: XOR<AttendanceRecordUpdateWithoutSessionInput, AttendanceRecordUncheckedUpdateWithoutSessionInput>
    create: XOR<AttendanceRecordCreateWithoutSessionInput, AttendanceRecordUncheckedCreateWithoutSessionInput>
  }

  export type AttendanceRecordUpdateWithWhereUniqueWithoutSessionInput = {
    where: AttendanceRecordWhereUniqueInput
    data: XOR<AttendanceRecordUpdateWithoutSessionInput, AttendanceRecordUncheckedUpdateWithoutSessionInput>
  }

  export type AttendanceRecordUpdateManyWithWhereWithoutSessionInput = {
    where: AttendanceRecordScalarWhereInput
    data: XOR<AttendanceRecordUpdateManyMutationInput, AttendanceRecordUncheckedUpdateManyWithoutSessionInput>
  }

  export type UserUpsertWithoutSubmittedSessionsInput = {
    update: XOR<UserUpdateWithoutSubmittedSessionsInput, UserUncheckedUpdateWithoutSubmittedSessionsInput>
    create: XOR<UserCreateWithoutSubmittedSessionsInput, UserUncheckedCreateWithoutSubmittedSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubmittedSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubmittedSessionsInput, UserUncheckedUpdateWithoutSubmittedSessionsInput>
  }

  export type UserUpdateWithoutSubmittedSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leading?: FellowshipUpdateOneWithoutLeaderNestedInput
    assisting?: FellowshipUpdateOneWithoutAssociateNestedInput
  }

  export type UserUncheckedUpdateWithoutSubmittedSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    churchId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leading?: FellowshipUncheckedUpdateOneWithoutLeaderNestedInput
    assisting?: FellowshipUncheckedUpdateOneWithoutAssociateNestedInput
  }

  export type AttendanceSessionCreateWithoutRecordsInput = {
    id?: string
    weekNumber: number
    monthYear: string
    meetingDate: Date | string
    isSubmitted?: boolean
    submittedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fellowship: FellowshipCreateNestedOneWithoutSessionsInput
    submitter?: UserCreateNestedOneWithoutSubmittedSessionsInput
  }

  export type AttendanceSessionUncheckedCreateWithoutRecordsInput = {
    id?: string
    fellowshipId: string
    weekNumber: number
    monthYear: string
    meetingDate: Date | string
    isSubmitted?: boolean
    submittedAt?: Date | string | null
    submittedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendanceSessionCreateOrConnectWithoutRecordsInput = {
    where: AttendanceSessionWhereUniqueInput
    create: XOR<AttendanceSessionCreateWithoutRecordsInput, AttendanceSessionUncheckedCreateWithoutRecordsInput>
  }

  export type MemberCreateWithoutAttendanceRecordsInput = {
    id?: string
    fullName: string
    phone?: string | null
    email?: string | null
    qrUniqueId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    fellowship: FellowshipCreateNestedOneWithoutMembersInput
  }

  export type MemberUncheckedCreateWithoutAttendanceRecordsInput = {
    id?: string
    fullName: string
    phone?: string | null
    email?: string | null
    qrUniqueId: string
    isActive?: boolean
    fellowshipId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberCreateOrConnectWithoutAttendanceRecordsInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutAttendanceRecordsInput, MemberUncheckedCreateWithoutAttendanceRecordsInput>
  }

  export type AttendanceSessionUpsertWithoutRecordsInput = {
    update: XOR<AttendanceSessionUpdateWithoutRecordsInput, AttendanceSessionUncheckedUpdateWithoutRecordsInput>
    create: XOR<AttendanceSessionCreateWithoutRecordsInput, AttendanceSessionUncheckedCreateWithoutRecordsInput>
    where?: AttendanceSessionWhereInput
  }

  export type AttendanceSessionUpdateToOneWithWhereWithoutRecordsInput = {
    where?: AttendanceSessionWhereInput
    data: XOR<AttendanceSessionUpdateWithoutRecordsInput, AttendanceSessionUncheckedUpdateWithoutRecordsInput>
  }

  export type AttendanceSessionUpdateWithoutRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    meetingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isSubmitted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fellowship?: FellowshipUpdateOneRequiredWithoutSessionsNestedInput
    submitter?: UserUpdateOneWithoutSubmittedSessionsNestedInput
  }

  export type AttendanceSessionUncheckedUpdateWithoutRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fellowshipId?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    meetingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isSubmitted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberUpsertWithoutAttendanceRecordsInput = {
    update: XOR<MemberUpdateWithoutAttendanceRecordsInput, MemberUncheckedUpdateWithoutAttendanceRecordsInput>
    create: XOR<MemberCreateWithoutAttendanceRecordsInput, MemberUncheckedCreateWithoutAttendanceRecordsInput>
    where?: MemberWhereInput
  }

  export type MemberUpdateToOneWithWhereWithoutAttendanceRecordsInput = {
    where?: MemberWhereInput
    data: XOR<MemberUpdateWithoutAttendanceRecordsInput, MemberUncheckedUpdateWithoutAttendanceRecordsInput>
  }

  export type MemberUpdateWithoutAttendanceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    qrUniqueId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fellowship?: FellowshipUpdateOneRequiredWithoutMembersNestedInput
  }

  export type MemberUncheckedUpdateWithoutAttendanceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    qrUniqueId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    fellowshipId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FellowshipCreateWithoutReportsInput = {
    id?: string
    name: string
    location: string
    createdAt?: Date | string
    updatedAt?: Date | string
    leader?: UserCreateNestedOneWithoutLeadingInput
    associate?: UserCreateNestedOneWithoutAssistingInput
    members?: MemberCreateNestedManyWithoutFellowshipInput
    sessions?: AttendanceSessionCreateNestedManyWithoutFellowshipInput
  }

  export type FellowshipUncheckedCreateWithoutReportsInput = {
    id?: string
    name: string
    location: string
    leaderId?: string | null
    associateId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: MemberUncheckedCreateNestedManyWithoutFellowshipInput
    sessions?: AttendanceSessionUncheckedCreateNestedManyWithoutFellowshipInput
  }

  export type FellowshipCreateOrConnectWithoutReportsInput = {
    where: FellowshipWhereUniqueInput
    create: XOR<FellowshipCreateWithoutReportsInput, FellowshipUncheckedCreateWithoutReportsInput>
  }

  export type FellowshipUpsertWithoutReportsInput = {
    update: XOR<FellowshipUpdateWithoutReportsInput, FellowshipUncheckedUpdateWithoutReportsInput>
    create: XOR<FellowshipCreateWithoutReportsInput, FellowshipUncheckedCreateWithoutReportsInput>
    where?: FellowshipWhereInput
  }

  export type FellowshipUpdateToOneWithWhereWithoutReportsInput = {
    where?: FellowshipWhereInput
    data: XOR<FellowshipUpdateWithoutReportsInput, FellowshipUncheckedUpdateWithoutReportsInput>
  }

  export type FellowshipUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leader?: UserUpdateOneWithoutLeadingNestedInput
    associate?: UserUpdateOneWithoutAssistingNestedInput
    members?: MemberUpdateManyWithoutFellowshipNestedInput
    sessions?: AttendanceSessionUpdateManyWithoutFellowshipNestedInput
  }

  export type FellowshipUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    leaderId?: NullableStringFieldUpdateOperationsInput | string | null
    associateId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberUncheckedUpdateManyWithoutFellowshipNestedInput
    sessions?: AttendanceSessionUncheckedUpdateManyWithoutFellowshipNestedInput
  }

  export type MemberCreateManyFellowshipInput = {
    id?: string
    fullName: string
    phone?: string | null
    email?: string | null
    qrUniqueId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendanceSessionCreateManyFellowshipInput = {
    id?: string
    weekNumber: number
    monthYear: string
    meetingDate: Date | string
    isSubmitted?: boolean
    submittedAt?: Date | string | null
    submittedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MonthlyReportCreateManyFellowshipInput = {
    id?: string
    monthYear: string
    week1Date?: Date | string | null
    week2Date?: Date | string | null
    week3Date?: Date | string | null
    week4Date?: Date | string | null
    week5Date?: Date | string | null
    week1Count?: number
    week2Count?: number
    week3Count?: number
    week4Count?: number
    week5Count?: number
    prayerFlag?: boolean
    firstTimers?: number
    newMembers?: number
    followUps?: number
    escalations?: string | null
    comments?: string | null
    status?: $Enums.ReportStatus
    finalizedAt?: Date | string | null
    finalizedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberUpdateWithoutFellowshipInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    qrUniqueId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendanceRecords?: AttendanceRecordUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutFellowshipInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    qrUniqueId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendanceRecords?: AttendanceRecordUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateManyWithoutFellowshipInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    qrUniqueId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceSessionUpdateWithoutFellowshipInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    meetingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isSubmitted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: AttendanceRecordUpdateManyWithoutSessionNestedInput
    submitter?: UserUpdateOneWithoutSubmittedSessionsNestedInput
  }

  export type AttendanceSessionUncheckedUpdateWithoutFellowshipInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    meetingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isSubmitted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: AttendanceRecordUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type AttendanceSessionUncheckedUpdateManyWithoutFellowshipInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    meetingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isSubmitted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyReportUpdateWithoutFellowshipInput = {
    id?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    week1Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week2Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week3Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week4Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week5Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week1Count?: IntFieldUpdateOperationsInput | number
    week2Count?: IntFieldUpdateOperationsInput | number
    week3Count?: IntFieldUpdateOperationsInput | number
    week4Count?: IntFieldUpdateOperationsInput | number
    week5Count?: IntFieldUpdateOperationsInput | number
    prayerFlag?: BoolFieldUpdateOperationsInput | boolean
    firstTimers?: IntFieldUpdateOperationsInput | number
    newMembers?: IntFieldUpdateOperationsInput | number
    followUps?: IntFieldUpdateOperationsInput | number
    escalations?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    finalizedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalizedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyReportUncheckedUpdateWithoutFellowshipInput = {
    id?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    week1Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week2Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week3Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week4Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week5Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week1Count?: IntFieldUpdateOperationsInput | number
    week2Count?: IntFieldUpdateOperationsInput | number
    week3Count?: IntFieldUpdateOperationsInput | number
    week4Count?: IntFieldUpdateOperationsInput | number
    week5Count?: IntFieldUpdateOperationsInput | number
    prayerFlag?: BoolFieldUpdateOperationsInput | boolean
    firstTimers?: IntFieldUpdateOperationsInput | number
    newMembers?: IntFieldUpdateOperationsInput | number
    followUps?: IntFieldUpdateOperationsInput | number
    escalations?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    finalizedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalizedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyReportUncheckedUpdateManyWithoutFellowshipInput = {
    id?: StringFieldUpdateOperationsInput | string
    monthYear?: StringFieldUpdateOperationsInput | string
    week1Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week2Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week3Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week4Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week5Date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    week1Count?: IntFieldUpdateOperationsInput | number
    week2Count?: IntFieldUpdateOperationsInput | number
    week3Count?: IntFieldUpdateOperationsInput | number
    week4Count?: IntFieldUpdateOperationsInput | number
    week5Count?: IntFieldUpdateOperationsInput | number
    prayerFlag?: BoolFieldUpdateOperationsInput | boolean
    firstTimers?: IntFieldUpdateOperationsInput | number
    newMembers?: IntFieldUpdateOperationsInput | number
    followUps?: IntFieldUpdateOperationsInput | number
    escalations?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    finalizedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalizedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceSessionCreateManySubmitterInput = {
    id?: string
    fellowshipId: string
    weekNumber: number
    monthYear: string
    meetingDate: Date | string
    isSubmitted?: boolean
    submittedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendanceSessionUpdateWithoutSubmitterInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    meetingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isSubmitted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fellowship?: FellowshipUpdateOneRequiredWithoutSessionsNestedInput
    records?: AttendanceRecordUpdateManyWithoutSessionNestedInput
  }

  export type AttendanceSessionUncheckedUpdateWithoutSubmitterInput = {
    id?: StringFieldUpdateOperationsInput | string
    fellowshipId?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    meetingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isSubmitted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: AttendanceRecordUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type AttendanceSessionUncheckedUpdateManyWithoutSubmitterInput = {
    id?: StringFieldUpdateOperationsInput | string
    fellowshipId?: StringFieldUpdateOperationsInput | string
    weekNumber?: IntFieldUpdateOperationsInput | number
    monthYear?: StringFieldUpdateOperationsInput | string
    meetingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isSubmitted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceRecordCreateManyMemberInput = {
    id?: string
    sessionId: string
    checkInMethod: string
    checkedInBy: string
    checkedInAt?: Date | string
  }

  export type AttendanceRecordUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkInMethod?: StringFieldUpdateOperationsInput | string
    checkedInBy?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: AttendanceSessionUpdateOneRequiredWithoutRecordsNestedInput
  }

  export type AttendanceRecordUncheckedUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    checkInMethod?: StringFieldUpdateOperationsInput | string
    checkedInBy?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceRecordUncheckedUpdateManyWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    checkInMethod?: StringFieldUpdateOperationsInput | string
    checkedInBy?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceRecordCreateManySessionInput = {
    id?: string
    memberId: string
    checkInMethod: string
    checkedInBy: string
    checkedInAt?: Date | string
  }

  export type AttendanceRecordUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkInMethod?: StringFieldUpdateOperationsInput | string
    checkedInBy?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutAttendanceRecordsNestedInput
  }

  export type AttendanceRecordUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    checkInMethod?: StringFieldUpdateOperationsInput | string
    checkedInBy?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceRecordUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    checkInMethod?: StringFieldUpdateOperationsInput | string
    checkedInBy?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}