export class ValidationSchemaerror {
    public readonly message: string[];
    public readonly statusCode: number;

    constructor(messages: string[], statusCode = 400) {
        this.message = messages;
        this.statusCode = statusCode
    }
}