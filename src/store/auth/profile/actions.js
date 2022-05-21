import { SAGA_REFRESH_HEADER, REFRESH_HEADER } from "./actionTypes";

export const refreshMenuHeader = () => ({
  type: SAGA_REFRESH_HEADER,
})

export const getDataRefreshHeader = (payload) => {
  return {
    type: REFRESH_HEADER,
    payload
  }
}