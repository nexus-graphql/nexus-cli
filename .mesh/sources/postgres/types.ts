// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace PostgresTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Reads a set of `Director`. */
  allDirectorsList?: Maybe<Array<Director>>;
  /** Reads a set of `Film`. */
  allFilmsList?: Maybe<Array<Film>>;
  directorById?: Maybe<Director>;
  filmById?: Maybe<Film>;
  filmByTitle?: Maybe<Film>;
  /** Reads a single `Director` using its globally unique `ID`. */
  director?: Maybe<Director>;
  /** Reads a single `Film` using its globally unique `ID`. */
  film?: Maybe<Film>;
};


/** The root query type which gives access points into the data universe. */
export type QuerynodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryallDirectorsListArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DirectorsOrderBy>>;
  condition?: InputMaybe<DirectorCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryallFilmsListArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<FilmsOrderBy>>;
  condition?: InputMaybe<FilmCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QuerydirectorByIdArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryfilmByIdArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryfilmByTitleArgs = {
  title: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QuerydirectorArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryfilmArgs = {
  nodeId: Scalars['ID'];
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

export type Director = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  name: Scalars['String'];
  /** Reads and enables pagination through a set of `Film`. */
  filmsByDirectorIdList: Array<Film>;
};


export type DirectorfilmsByDirectorIdListArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<FilmsOrderBy>>;
  condition?: InputMaybe<FilmCondition>;
};

export type Film = Node & {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  title: Scalars['String'];
  year: Scalars['Int'];
  genre: Scalars['String'];
  duration: Scalars['Int'];
  directorId: Scalars['Int'];
  /** Reads a single `Director` that is related to this `Film`. */
  directorByDirectorId?: Maybe<Director>;
};

/** Methods to use when ordering `Film`. */
export type FilmsOrderBy =
  | 'NATURAL'
  | 'ID_ASC'
  | 'ID_DESC'
  | 'TITLE_ASC'
  | 'TITLE_DESC'
  | 'YEAR_ASC'
  | 'YEAR_DESC'
  | 'GENRE_ASC'
  | 'GENRE_DESC'
  | 'DURATION_ASC'
  | 'DURATION_DESC'
  | 'DIRECTOR_ID_ASC'
  | 'DIRECTOR_ID_DESC'
  | 'PRIMARY_KEY_ASC'
  | 'PRIMARY_KEY_DESC';

/** A condition to be used against `Film` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type FilmCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `title` field. */
  title?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `genre` field. */
  genre?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `duration` field. */
  duration?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `directorId` field. */
  directorId?: InputMaybe<Scalars['Int']>;
};

/** Methods to use when ordering `Director`. */
export type DirectorsOrderBy =
  | 'NATURAL'
  | 'ID_ASC'
  | 'ID_DESC'
  | 'NAME_ASC'
  | 'NAME_DESC'
  | 'PRIMARY_KEY_ASC'
  | 'PRIMARY_KEY_DESC';

/**
 * A condition to be used against `Director` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type DirectorCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  /** Creates a single `Director`. */
  createDirector?: Maybe<CreateDirectorPayload>;
  /** Creates a single `Film`. */
  createFilm?: Maybe<CreateFilmPayload>;
  /** Updates a single `Director` using its globally unique id and a patch. */
  updateDirector?: Maybe<UpdateDirectorPayload>;
  /** Updates a single `Director` using a unique key and a patch. */
  updateDirectorById?: Maybe<UpdateDirectorPayload>;
  /** Updates a single `Film` using its globally unique id and a patch. */
  updateFilm?: Maybe<UpdateFilmPayload>;
  /** Updates a single `Film` using a unique key and a patch. */
  updateFilmById?: Maybe<UpdateFilmPayload>;
  /** Updates a single `Film` using a unique key and a patch. */
  updateFilmByTitle?: Maybe<UpdateFilmPayload>;
  /** Deletes a single `Director` using its globally unique id. */
  deleteDirector?: Maybe<DeleteDirectorPayload>;
  /** Deletes a single `Director` using a unique key. */
  deleteDirectorById?: Maybe<DeleteDirectorPayload>;
  /** Deletes a single `Film` using its globally unique id. */
  deleteFilm?: Maybe<DeleteFilmPayload>;
  /** Deletes a single `Film` using a unique key. */
  deleteFilmById?: Maybe<DeleteFilmPayload>;
  /** Deletes a single `Film` using a unique key. */
  deleteFilmByTitle?: Maybe<DeleteFilmPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationcreateDirectorArgs = {
  input: CreateDirectorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationcreateFilmArgs = {
  input: CreateFilmInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationupdateDirectorArgs = {
  input: UpdateDirectorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationupdateDirectorByIdArgs = {
  input: UpdateDirectorByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationupdateFilmArgs = {
  input: UpdateFilmInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationupdateFilmByIdArgs = {
  input: UpdateFilmByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationupdateFilmByTitleArgs = {
  input: UpdateFilmByTitleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationdeleteDirectorArgs = {
  input: DeleteDirectorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationdeleteDirectorByIdArgs = {
  input: DeleteDirectorByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationdeleteFilmArgs = {
  input: DeleteFilmInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationdeleteFilmByIdArgs = {
  input: DeleteFilmByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationdeleteFilmByTitleArgs = {
  input: DeleteFilmByTitleInput;
};

/** The output of our create `Director` mutation. */
export type CreateDirectorPayload = {
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Director` that was created by this mutation. */
  director?: Maybe<Director>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `Director` mutation. */
export type CreateDirectorInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Director` to be created by this mutation. */
  director: DirectorInput;
};

/** An input for mutations affecting `Director` */
export type DirectorInput = {
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
};

/** The output of our create `Film` mutation. */
export type CreateFilmPayload = {
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Film` that was created by this mutation. */
  film?: Maybe<Film>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Director` that is related to this `Film`. */
  directorByDirectorId?: Maybe<Director>;
};

/** All input for the create `Film` mutation. */
export type CreateFilmInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Film` to be created by this mutation. */
  film: FilmInput;
};

/** An input for mutations affecting `Film` */
export type FilmInput = {
  id?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
  year: Scalars['Int'];
  genre: Scalars['String'];
  duration: Scalars['Int'];
  directorId: Scalars['Int'];
};

/** The output of our update `Director` mutation. */
export type UpdateDirectorPayload = {
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Director` that was updated by this mutation. */
  director?: Maybe<Director>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `updateDirector` mutation. */
export type UpdateDirectorInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Director` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Director` being updated. */
  directorPatch: DirectorPatch;
};

/** Represents an update to a `Director`. Fields that are set will be updated. */
export type DirectorPatch = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** All input for the `updateDirectorById` mutation. */
export type UpdateDirectorByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Director` being updated. */
  directorPatch: DirectorPatch;
  id: Scalars['Int'];
};

/** The output of our update `Film` mutation. */
export type UpdateFilmPayload = {
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Film` that was updated by this mutation. */
  film?: Maybe<Film>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Director` that is related to this `Film`. */
  directorByDirectorId?: Maybe<Director>;
};

/** All input for the `updateFilm` mutation. */
export type UpdateFilmInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Film` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Film` being updated. */
  filmPatch: FilmPatch;
};

/** Represents an update to a `Film`. Fields that are set will be updated. */
export type FilmPatch = {
  id?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
  genre?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  directorId?: InputMaybe<Scalars['Int']>;
};

/** All input for the `updateFilmById` mutation. */
export type UpdateFilmByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Film` being updated. */
  filmPatch: FilmPatch;
  id: Scalars['Int'];
};

/** All input for the `updateFilmByTitle` mutation. */
export type UpdateFilmByTitleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Film` being updated. */
  filmPatch: FilmPatch;
  title: Scalars['String'];
};

/** The output of our delete `Director` mutation. */
export type DeleteDirectorPayload = {
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Director` that was deleted by this mutation. */
  director?: Maybe<Director>;
  deletedDirectorId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `deleteDirector` mutation. */
export type DeleteDirectorInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Director` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteDirectorById` mutation. */
export type DeleteDirectorByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Film` mutation. */
export type DeleteFilmPayload = {
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Film` that was deleted by this mutation. */
  film?: Maybe<Film>;
  deletedFilmId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Director` that is related to this `Film`. */
  directorByDirectorId?: Maybe<Director>;
};

/** All input for the `deleteFilm` mutation. */
export type DeleteFilmInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Film` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteFilmById` mutation. */
export type DeleteFilmByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** All input for the `deleteFilmByTitle` mutation. */
export type DeleteFilmByTitleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type Subscription = {
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form. (live)
   */
  query: Query;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. (live) */
  nodeId: Scalars['ID'];
  /** Fetches an object given its globally unique `ID`. (live) */
  node?: Maybe<Node>;
  /** Reads a set of `Director`. (live) */
  allDirectorsList?: Maybe<Array<Director>>;
  /** Reads a set of `Film`. (live) */
  allFilmsList?: Maybe<Array<Film>>;
  /**  (live) */
  directorById?: Maybe<Director>;
  /**  (live) */
  filmById?: Maybe<Film>;
  /**  (live) */
  filmByTitle?: Maybe<Film>;
  /** Reads a single `Director` using its globally unique `ID`. (live) */
  director?: Maybe<Director>;
  /** Reads a single `Film` using its globally unique `ID`. (live) */
  film?: Maybe<Film>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionnodeArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionallDirectorsListArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DirectorsOrderBy>>;
  condition?: InputMaybe<DirectorCondition>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionallFilmsListArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<FilmsOrderBy>>;
  condition?: InputMaybe<FilmCondition>;
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptiondirectorByIdArgs = {
  id: Scalars['Int'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionfilmByIdArgs = {
  id: Scalars['Int'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionfilmByTitleArgs = {
  title: Scalars['String'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptiondirectorArgs = {
  nodeId: Scalars['ID'];
};


/**
 * The root subscription type: contains events and live queries you can subscribe to with the `subscription` operation.
 *
 * #### Live Queries
 *
 * Live query fields are differentiated by containing `(live)` at the end of their
 * description, they are added for each field in the `Query` type. When you
 * subscribe to a live query field, the selection set will be evaluated and sent to
 * the client, and then most things\* that would cause the output of the selection
 * set to change will trigger the selection set to be re-evaluated and the results
 * to be re-sent to the client.
 *
 * _(\* Not everything: typically only changes to persisted data referenced by the query are detected, not computed fields.)_
 *
 * Live queries can be very expensive, so try and keep them small and focussed.
 *
 * #### Events
 *
 * Event fields will run their selection set when, and only when, the specified
 * server-side event occurs. This makes them a lot more efficient than Live
 * Queries, but it is still recommended that you keep payloads fairly small.
 */
export type SubscriptionfilmArgs = {
  nodeId: Scalars['ID'];
};

  export type QuerySdk = {
      /** Exposes the root query type nested one level down. This is helpful for Relay 1
which can only query top level fields if they are in a particular form. **/
  query: InContextSdkMethod<Query['query'], {}, MeshContext>,
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. **/
  nodeId: InContextSdkMethod<Query['nodeId'], {}, MeshContext>,
  /** Fetches an object given its globally unique `ID`. **/
  node: InContextSdkMethod<Query['node'], QuerynodeArgs, MeshContext>,
  /** Reads a set of `Director`. **/
  allDirectorsList: InContextSdkMethod<Query['allDirectorsList'], QueryallDirectorsListArgs, MeshContext>,
  /** Reads a set of `Film`. **/
  allFilmsList: InContextSdkMethod<Query['allFilmsList'], QueryallFilmsListArgs, MeshContext>,
  /** undefined **/
  directorById: InContextSdkMethod<Query['directorById'], QuerydirectorByIdArgs, MeshContext>,
  /** undefined **/
  filmById: InContextSdkMethod<Query['filmById'], QueryfilmByIdArgs, MeshContext>,
  /** undefined **/
  filmByTitle: InContextSdkMethod<Query['filmByTitle'], QueryfilmByTitleArgs, MeshContext>,
  /** Reads a single `Director` using its globally unique `ID`. **/
  director: InContextSdkMethod<Query['director'], QuerydirectorArgs, MeshContext>,
  /** Reads a single `Film` using its globally unique `ID`. **/
  film: InContextSdkMethod<Query['film'], QueryfilmArgs, MeshContext>
  };

  export type MutationSdk = {
      /** Creates a single `Director`. **/
  createDirector: InContextSdkMethod<Mutation['createDirector'], MutationcreateDirectorArgs, MeshContext>,
  /** Creates a single `Film`. **/
  createFilm: InContextSdkMethod<Mutation['createFilm'], MutationcreateFilmArgs, MeshContext>,
  /** Updates a single `Director` using its globally unique id and a patch. **/
  updateDirector: InContextSdkMethod<Mutation['updateDirector'], MutationupdateDirectorArgs, MeshContext>,
  /** Updates a single `Director` using a unique key and a patch. **/
  updateDirectorById: InContextSdkMethod<Mutation['updateDirectorById'], MutationupdateDirectorByIdArgs, MeshContext>,
  /** Updates a single `Film` using its globally unique id and a patch. **/
  updateFilm: InContextSdkMethod<Mutation['updateFilm'], MutationupdateFilmArgs, MeshContext>,
  /** Updates a single `Film` using a unique key and a patch. **/
  updateFilmById: InContextSdkMethod<Mutation['updateFilmById'], MutationupdateFilmByIdArgs, MeshContext>,
  /** Updates a single `Film` using a unique key and a patch. **/
  updateFilmByTitle: InContextSdkMethod<Mutation['updateFilmByTitle'], MutationupdateFilmByTitleArgs, MeshContext>,
  /** Deletes a single `Director` using its globally unique id. **/
  deleteDirector: InContextSdkMethod<Mutation['deleteDirector'], MutationdeleteDirectorArgs, MeshContext>,
  /** Deletes a single `Director` using a unique key. **/
  deleteDirectorById: InContextSdkMethod<Mutation['deleteDirectorById'], MutationdeleteDirectorByIdArgs, MeshContext>,
  /** Deletes a single `Film` using its globally unique id. **/
  deleteFilm: InContextSdkMethod<Mutation['deleteFilm'], MutationdeleteFilmArgs, MeshContext>,
  /** Deletes a single `Film` using a unique key. **/
  deleteFilmById: InContextSdkMethod<Mutation['deleteFilmById'], MutationdeleteFilmByIdArgs, MeshContext>,
  /** Deletes a single `Film` using a unique key. **/
  deleteFilmByTitle: InContextSdkMethod<Mutation['deleteFilmByTitle'], MutationdeleteFilmByTitleArgs, MeshContext>
  };

  export type SubscriptionSdk = {
      /** Exposes the root query type nested one level down. This is helpful for Relay 1
which can only query top level fields if they are in a particular form. (live) **/
  query: InContextSdkMethod<Subscription['query'], {}, MeshContext>,
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. (live) **/
  nodeId: InContextSdkMethod<Subscription['nodeId'], {}, MeshContext>,
  /** Fetches an object given its globally unique `ID`. (live) **/
  node: InContextSdkMethod<Subscription['node'], SubscriptionnodeArgs, MeshContext>,
  /** Reads a set of `Director`. (live) **/
  allDirectorsList: InContextSdkMethod<Subscription['allDirectorsList'], SubscriptionallDirectorsListArgs, MeshContext>,
  /** Reads a set of `Film`. (live) **/
  allFilmsList: InContextSdkMethod<Subscription['allFilmsList'], SubscriptionallFilmsListArgs, MeshContext>,
  /**  (live) **/
  directorById: InContextSdkMethod<Subscription['directorById'], SubscriptiondirectorByIdArgs, MeshContext>,
  /**  (live) **/
  filmById: InContextSdkMethod<Subscription['filmById'], SubscriptionfilmByIdArgs, MeshContext>,
  /**  (live) **/
  filmByTitle: InContextSdkMethod<Subscription['filmByTitle'], SubscriptionfilmByTitleArgs, MeshContext>,
  /** Reads a single `Director` using its globally unique `ID`. (live) **/
  director: InContextSdkMethod<Subscription['director'], SubscriptiondirectorArgs, MeshContext>,
  /** Reads a single `Film` using its globally unique `ID`. (live) **/
  film: InContextSdkMethod<Subscription['film'], SubscriptionfilmArgs, MeshContext>
  };

  export type Context = {
      ["postgres"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
