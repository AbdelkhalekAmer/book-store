export class Submit {

    constructor(
        public submitted: boolean = false,
        public success: boolean = false,
        public message: string = '',
        public errors: string[] = []
    ) { }
}
