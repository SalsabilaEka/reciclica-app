import { StoreModule } from "@ngrx/store"
import { loadingReducer } from "./loading/loading.reducers"
import { NgModule } from "@angular/core"

export const AppStoreModule = [
  StoreModule.forRoot([]),
  StoreModule.forFeature("loading", loadingReducer)
]
