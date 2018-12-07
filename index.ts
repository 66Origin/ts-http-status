declare interface Indexable {
    [key: number]: string;
}

export enum HTTP_STATUS {
    // Information responses
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,
    EARLY_HINTS = 103,
    // Successful responses
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTI_STATUS = 207,
    ALREADY_REPORTED = 208,
    IM_USED = 226,
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    // Redirection messages
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    USE_PROXY = 305,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,
    // Client error responses
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    MISDIRECTED_REQUEST = 421,
    UNPROCESSABLE_ENTITY = 422,
    LOCKED = 423,
    FAILED_DEPENDENCY = 424,
    TOO_EARLY = 425,
    UPGRADE_REQUIRED = 426,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUESTS = 429,
    UNASSIGNED = 420,
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,
    // Server error responses
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    VARIANT_ALSO_NEGOCIATES = 506,
    INSUFFICIENT_STORAGE = 507,
    LOOP_DETECTED = 508,
    NOT_EXTENDED = 510,
    NETWORK_AUTHENTICATION_REQUIRED = 511
}

const ucFirst = (word: string): string => `${word.slice(0, 1)}${word.slice(1).toLowerCase()}`;

const getTextRepresentation = (code: number, status: string): string => {
    // First word is uppercase
    if (code === 200 || code === 226 || code == 414 || code === 505) {
        return `${code} ${status.split('_').map((w, i) => {
            if (i === 0) {
                return w.toUpperCase();
            }
            return ucFirst(w);
        }).join(' ')}`;
    }

    // First join is a -
    if (code === 203 || code === 207) {
        return status.split('_').map(ucFirst).reduce(
            (response, word, index) => {
                if (index === 1) {
                    return `${response}-${word}`;
                }
                return `${response} ${word}`;

            }, `${code}`);
    }
    return `${code} ${status.split('_').map(ucFirst).join(' ')}`;

}
export const getStatus = (code: number): string | null => {
    for (let status in HTTP_STATUS) {
        if (parseInt(HTTP_STATUS[status], 10) === code) {
            return getTextRepresentation(code, status);
        }
    }
    return null;
}

export const getCode = (status: string): number | null => {
    for (const key in HTTP_STATUS) {
        if (status.toUpperCase() === key) {
            return parseInt(HTTP_STATUS[key], 10);
        }
    }
    return null;
}
console.log(getStatus(203));
