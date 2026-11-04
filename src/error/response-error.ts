/**
 * Application-specific HTTP error used to carry a status code and message
 * through the request pipeline.
 *
 * This class is thrown by services and controllers when a business rule or
 * validation failure should be translated into a structured API response.
 */
export class ResponseError extends Error {
    /**
     * Creates a new API error response payload.
     *
     * @param status HTTP status code to return to the client.
     * @param message Human-readable error message fosr the API response.
     */
    constructor(
        public status: number,
        public message: string,
    ) {
        super(message)
    }
}
