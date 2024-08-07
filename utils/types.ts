export enum RESPONSE_TYPES  {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
}

export interface PayloadType {
    message: string;
    data?: any;
    status: number;
}

export interface ReturnType {
    type: RESPONSE_TYPES.SUCCESS | RESPONSE_TYPES.ERROR;
    payload: PayloadType;
}