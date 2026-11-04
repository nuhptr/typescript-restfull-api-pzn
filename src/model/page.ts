/**
 * Metadata describing a paginated collection returned by the API.
 */
export type Paging = {
    size: number
    total_page: number
    current_page: number
}

/**
 * Generic paginated response shape used across list endpoints.
 *
 * @template T Item type contained in the data array.
 */
export type Pageable<T> = {
    data: Array<T>
    paging: Paging
}
