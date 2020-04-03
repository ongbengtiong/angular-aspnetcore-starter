
import { createAction, props } from "@ngrx/store";

import { Entity } from "../models/entity";

export enum EntityActionTypes {
  LoadEntities = "[Entity] Load Entities",
  LoadEntitiesSuccess = "[Entity] Load Entities Success",
  LoadEntitiesFail = "[Entity] Load Entities Fail",
  loadEntitySuccess = "[Entity] Load Entity Success",
  loadEntityFail = "[Entity] Load Entity Fail"
}

export const loadEntities = createAction(EntityActionTypes.LoadEntities);

export const loadEntitiesSuccess = createAction(
  EntityActionTypes.LoadEntitiesSuccess,
  props<{ data: Entity[] }>()
);

export const loadEntitiesFail = createAction(
  EntityActionTypes.LoadEntitiesFail,
  props<{ error: Error | any }>()
);

export const loadEntitySuccess = createAction(
  EntityActionTypes.loadEntitySuccess,
  props<{ data: Entity }>()
);

export const loadEntityFail = createAction(
  EntityActionTypes.loadEntityFail,
  props<{ error: Error | any }>()
);

export const fromEntityActions = {
  loadEntities,
  loadEntitiesFail,
  loadEntitiesSuccess,
  loadEntitySuccess,
  loadEntityFail
};
