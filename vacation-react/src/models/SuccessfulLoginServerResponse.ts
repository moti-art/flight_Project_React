export class SuccessfulLoginServerResponse{
    public constructor(
        public token?:string,       
        public userType?:string,
        public userName?:string,
        public user_id?:string,
    ){}

}