// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode } from 'graphql';
import { findAndParseConfig } from '@graphql-mesh/cli';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { PostgresTypes } from './sources/postgres/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Node: ResolversTypes['Query'] | ResolversTypes['Director'] | ResolversTypes['Film'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Director: ResolverTypeWrapper<Director>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Film: ResolverTypeWrapper<Film>;
  FilmsOrderBy: FilmsOrderBy;
  FilmCondition: FilmCondition;
  DirectorsOrderBy: DirectorsOrderBy;
  DirectorCondition: DirectorCondition;
  Mutation: ResolverTypeWrapper<{}>;
  CreateDirectorPayload: ResolverTypeWrapper<CreateDirectorPayload>;
  CreateDirectorInput: CreateDirectorInput;
  DirectorInput: DirectorInput;
  CreateFilmPayload: ResolverTypeWrapper<CreateFilmPayload>;
  CreateFilmInput: CreateFilmInput;
  FilmInput: FilmInput;
  UpdateDirectorPayload: ResolverTypeWrapper<UpdateDirectorPayload>;
  UpdateDirectorInput: UpdateDirectorInput;
  DirectorPatch: DirectorPatch;
  UpdateDirectorByIdInput: UpdateDirectorByIdInput;
  UpdateFilmPayload: ResolverTypeWrapper<UpdateFilmPayload>;
  UpdateFilmInput: UpdateFilmInput;
  FilmPatch: FilmPatch;
  UpdateFilmByIdInput: UpdateFilmByIdInput;
  UpdateFilmByTitleInput: UpdateFilmByTitleInput;
  DeleteDirectorPayload: ResolverTypeWrapper<DeleteDirectorPayload>;
  DeleteDirectorInput: DeleteDirectorInput;
  DeleteDirectorByIdInput: DeleteDirectorByIdInput;
  DeleteFilmPayload: ResolverTypeWrapper<DeleteFilmPayload>;
  DeleteFilmInput: DeleteFilmInput;
  DeleteFilmByIdInput: DeleteFilmByIdInput;
  DeleteFilmByTitleInput: DeleteFilmByTitleInput;
  Subscription: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Node: ResolversParentTypes['Query'] | ResolversParentTypes['Director'] | ResolversParentTypes['Film'];
  ID: Scalars['ID'];
  Director: Director;
  Int: Scalars['Int'];
  String: Scalars['String'];
  Film: Film;
  FilmCondition: FilmCondition;
  DirectorCondition: DirectorCondition;
  Mutation: {};
  CreateDirectorPayload: CreateDirectorPayload;
  CreateDirectorInput: CreateDirectorInput;
  DirectorInput: DirectorInput;
  CreateFilmPayload: CreateFilmPayload;
  CreateFilmInput: CreateFilmInput;
  FilmInput: FilmInput;
  UpdateDirectorPayload: UpdateDirectorPayload;
  UpdateDirectorInput: UpdateDirectorInput;
  DirectorPatch: DirectorPatch;
  UpdateDirectorByIdInput: UpdateDirectorByIdInput;
  UpdateFilmPayload: UpdateFilmPayload;
  UpdateFilmInput: UpdateFilmInput;
  FilmPatch: FilmPatch;
  UpdateFilmByIdInput: UpdateFilmByIdInput;
  UpdateFilmByTitleInput: UpdateFilmByTitleInput;
  DeleteDirectorPayload: DeleteDirectorPayload;
  DeleteDirectorInput: DeleteDirectorInput;
  DeleteDirectorByIdInput: DeleteDirectorByIdInput;
  DeleteFilmPayload: DeleteFilmPayload;
  DeleteFilmInput: DeleteFilmInput;
  DeleteFilmByIdInput: DeleteFilmByIdInput;
  DeleteFilmByTitleInput: DeleteFilmByTitleInput;
  Subscription: {};
  Boolean: Scalars['Boolean'];
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  query?: Resolver<ResolversTypes['Query'], ParentType, ContextType>;
  nodeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QuerynodeArgs, 'nodeId'>>;
  allDirectorsList?: Resolver<Maybe<Array<ResolversTypes['Director']>>, ParentType, ContextType, Partial<QueryallDirectorsListArgs>>;
  allFilmsList?: Resolver<Maybe<Array<ResolversTypes['Film']>>, ParentType, ContextType, Partial<QueryallFilmsListArgs>>;
  directorById?: Resolver<Maybe<ResolversTypes['Director']>, ParentType, ContextType, RequireFields<QuerydirectorByIdArgs, 'id'>>;
  filmById?: Resolver<Maybe<ResolversTypes['Film']>, ParentType, ContextType, RequireFields<QueryfilmByIdArgs, 'id'>>;
  filmByTitle?: Resolver<Maybe<ResolversTypes['Film']>, ParentType, ContextType, RequireFields<QueryfilmByTitleArgs, 'title'>>;
  director?: Resolver<Maybe<ResolversTypes['Director']>, ParentType, ContextType, RequireFields<QuerydirectorArgs, 'nodeId'>>;
  film?: Resolver<Maybe<ResolversTypes['Film']>, ParentType, ContextType, RequireFields<QueryfilmArgs, 'nodeId'>>;
}>;

export type NodeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Query' | 'Director' | 'Film', ParentType, ContextType>;
  nodeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type DirectorResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Director'] = ResolversParentTypes['Director']> = ResolversObject<{
  nodeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  filmsByDirectorIdList?: Resolver<Array<ResolversTypes['Film']>, ParentType, ContextType, Partial<DirectorfilmsByDirectorIdListArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FilmResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Film'] = ResolversParentTypes['Film']> = ResolversObject<{
  nodeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  genre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  directorId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  directorByDirectorId?: Resolver<Maybe<ResolversTypes['Director']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FilmsOrderByResolvers = { NATURAL: '[object Object]', ID_ASC: '[object Object]', ID_DESC: '[object Object]', TITLE_ASC: '[object Object]', TITLE_DESC: '[object Object]', YEAR_ASC: '[object Object]', YEAR_DESC: '[object Object]', GENRE_ASC: '[object Object]', GENRE_DESC: '[object Object]', DURATION_ASC: '[object Object]', DURATION_DESC: '[object Object]', DIRECTOR_ID_ASC: '[object Object]', DIRECTOR_ID_DESC: '[object Object]', PRIMARY_KEY_ASC: '[object Object]', PRIMARY_KEY_DESC: '[object Object]' };

export type DirectorsOrderByResolvers = { NATURAL: '[object Object]', ID_ASC: '[object Object]', ID_DESC: '[object Object]', NAME_ASC: '[object Object]', NAME_DESC: '[object Object]', PRIMARY_KEY_ASC: '[object Object]', PRIMARY_KEY_DESC: '[object Object]' };

export type MutationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createDirector?: Resolver<Maybe<ResolversTypes['CreateDirectorPayload']>, ParentType, ContextType, RequireFields<MutationcreateDirectorArgs, 'input'>>;
  createFilm?: Resolver<Maybe<ResolversTypes['CreateFilmPayload']>, ParentType, ContextType, RequireFields<MutationcreateFilmArgs, 'input'>>;
  updateDirector?: Resolver<Maybe<ResolversTypes['UpdateDirectorPayload']>, ParentType, ContextType, RequireFields<MutationupdateDirectorArgs, 'input'>>;
  updateDirectorById?: Resolver<Maybe<ResolversTypes['UpdateDirectorPayload']>, ParentType, ContextType, RequireFields<MutationupdateDirectorByIdArgs, 'input'>>;
  updateFilm?: Resolver<Maybe<ResolversTypes['UpdateFilmPayload']>, ParentType, ContextType, RequireFields<MutationupdateFilmArgs, 'input'>>;
  updateFilmById?: Resolver<Maybe<ResolversTypes['UpdateFilmPayload']>, ParentType, ContextType, RequireFields<MutationupdateFilmByIdArgs, 'input'>>;
  updateFilmByTitle?: Resolver<Maybe<ResolversTypes['UpdateFilmPayload']>, ParentType, ContextType, RequireFields<MutationupdateFilmByTitleArgs, 'input'>>;
  deleteDirector?: Resolver<Maybe<ResolversTypes['DeleteDirectorPayload']>, ParentType, ContextType, RequireFields<MutationdeleteDirectorArgs, 'input'>>;
  deleteDirectorById?: Resolver<Maybe<ResolversTypes['DeleteDirectorPayload']>, ParentType, ContextType, RequireFields<MutationdeleteDirectorByIdArgs, 'input'>>;
  deleteFilm?: Resolver<Maybe<ResolversTypes['DeleteFilmPayload']>, ParentType, ContextType, RequireFields<MutationdeleteFilmArgs, 'input'>>;
  deleteFilmById?: Resolver<Maybe<ResolversTypes['DeleteFilmPayload']>, ParentType, ContextType, RequireFields<MutationdeleteFilmByIdArgs, 'input'>>;
  deleteFilmByTitle?: Resolver<Maybe<ResolversTypes['DeleteFilmPayload']>, ParentType, ContextType, RequireFields<MutationdeleteFilmByTitleArgs, 'input'>>;
}>;

export type CreateDirectorPayloadResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CreateDirectorPayload'] = ResolversParentTypes['CreateDirectorPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  director?: Resolver<Maybe<ResolversTypes['Director']>, ParentType, ContextType>;
  query?: Resolver<Maybe<ResolversTypes['Query']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateFilmPayloadResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CreateFilmPayload'] = ResolversParentTypes['CreateFilmPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  film?: Resolver<Maybe<ResolversTypes['Film']>, ParentType, ContextType>;
  query?: Resolver<Maybe<ResolversTypes['Query']>, ParentType, ContextType>;
  directorByDirectorId?: Resolver<Maybe<ResolversTypes['Director']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateDirectorPayloadResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UpdateDirectorPayload'] = ResolversParentTypes['UpdateDirectorPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  director?: Resolver<Maybe<ResolversTypes['Director']>, ParentType, ContextType>;
  query?: Resolver<Maybe<ResolversTypes['Query']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateFilmPayloadResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UpdateFilmPayload'] = ResolversParentTypes['UpdateFilmPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  film?: Resolver<Maybe<ResolversTypes['Film']>, ParentType, ContextType>;
  query?: Resolver<Maybe<ResolversTypes['Query']>, ParentType, ContextType>;
  directorByDirectorId?: Resolver<Maybe<ResolversTypes['Director']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteDirectorPayloadResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DeleteDirectorPayload'] = ResolversParentTypes['DeleteDirectorPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  director?: Resolver<Maybe<ResolversTypes['Director']>, ParentType, ContextType>;
  deletedDirectorId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  query?: Resolver<Maybe<ResolversTypes['Query']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteFilmPayloadResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DeleteFilmPayload'] = ResolversParentTypes['DeleteFilmPayload']> = ResolversObject<{
  clientMutationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  film?: Resolver<Maybe<ResolversTypes['Film']>, ParentType, ContextType>;
  deletedFilmId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  query?: Resolver<Maybe<ResolversTypes['Query']>, ParentType, ContextType>;
  directorByDirectorId?: Resolver<Maybe<ResolversTypes['Director']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  query?: SubscriptionResolver<ResolversTypes['Query'], "query", ParentType, ContextType>;
  nodeId?: SubscriptionResolver<ResolversTypes['ID'], "nodeId", ParentType, ContextType>;
  node?: SubscriptionResolver<Maybe<ResolversTypes['Node']>, "node", ParentType, ContextType, RequireFields<SubscriptionnodeArgs, 'nodeId'>>;
  allDirectorsList?: SubscriptionResolver<Maybe<Array<ResolversTypes['Director']>>, "allDirectorsList", ParentType, ContextType, Partial<SubscriptionallDirectorsListArgs>>;
  allFilmsList?: SubscriptionResolver<Maybe<Array<ResolversTypes['Film']>>, "allFilmsList", ParentType, ContextType, Partial<SubscriptionallFilmsListArgs>>;
  directorById?: SubscriptionResolver<Maybe<ResolversTypes['Director']>, "directorById", ParentType, ContextType, RequireFields<SubscriptiondirectorByIdArgs, 'id'>>;
  filmById?: SubscriptionResolver<Maybe<ResolversTypes['Film']>, "filmById", ParentType, ContextType, RequireFields<SubscriptionfilmByIdArgs, 'id'>>;
  filmByTitle?: SubscriptionResolver<Maybe<ResolversTypes['Film']>, "filmByTitle", ParentType, ContextType, RequireFields<SubscriptionfilmByTitleArgs, 'title'>>;
  director?: SubscriptionResolver<Maybe<ResolversTypes['Director']>, "director", ParentType, ContextType, RequireFields<SubscriptiondirectorArgs, 'nodeId'>>;
  film?: SubscriptionResolver<Maybe<ResolversTypes['Film']>, "film", ParentType, ContextType, RequireFields<SubscriptionfilmArgs, 'nodeId'>>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Director?: DirectorResolvers<ContextType>;
  Film?: FilmResolvers<ContextType>;
  FilmsOrderBy?: FilmsOrderByResolvers;
  DirectorsOrderBy?: DirectorsOrderByResolvers;
  Mutation?: MutationResolvers<ContextType>;
  CreateDirectorPayload?: CreateDirectorPayloadResolvers<ContextType>;
  CreateFilmPayload?: CreateFilmPayloadResolvers<ContextType>;
  UpdateDirectorPayload?: UpdateDirectorPayloadResolvers<ContextType>;
  UpdateFilmPayload?: UpdateFilmPayloadResolvers<ContextType>;
  DeleteDirectorPayload?: DeleteDirectorPayloadResolvers<ContextType>;
  DeleteFilmPayload?: DeleteFilmPayloadResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
}>;


export type MeshContext = PostgresTypes.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.mesh', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export function getMeshOptions() {
  console.warn('WARNING: These artifacts are built for development mode. Please run "mesh build" to build production artifacts');
  return findAndParseConfig({
    dir: baseDir,
    artifactsDir: ".mesh",
    configName: "mesh",
    additionalPackagePrefixes: [],
    initialLoggerPrefix: "🕸️  Mesh",
  });
}

export function createBuiltMeshHTTPHandler(): MeshHTTPHandler<MeshContext> {
  return createMeshHTTPHandler<MeshContext>({
    baseDir,
    getBuiltMesh: getBuiltMesh,
    rawServeConfig: undefined,
  })
}

let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltMesh(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltMesh().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltMesh().then(({ subscribe }) => subscribe(...args));