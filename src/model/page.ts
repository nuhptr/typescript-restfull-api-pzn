export type Paging = {
    size: number
    total_page: number
    current_page: number
}

//* Pageable is a generic type that has two properties: data and paging. The data property is an array of T, while the paging property is a Paging type.
export type Pageable<T> = {
    data: Array<T>
    paging: Paging
}
