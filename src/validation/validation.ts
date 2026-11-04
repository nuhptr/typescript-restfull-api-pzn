import { ZodType } from "zod"

export class Validation {
    /**
     * Validates input against a Zod schema and returns the parsed result.
     *
     * @param schema Zod validation schema to apply to the input data.
     * @param data Data to validate and parse.
     * @returns Parsed, type-safe data.
     */
    static validate<T>(schema: ZodType, data: T): T {
        return schema.parse(data)
    }
}
