export class Region {
    constructor(
        public id: number,
        public count: number,
        public link: string,
        public name: string,
        public slug: string,
        public taxonomy: string,
        public parent: number
    ){}
}