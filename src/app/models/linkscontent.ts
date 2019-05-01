import { FeaturedMedia } from "./featuredmedia";

export class LinksContent {
    constructor(
        public self: [],
        public about: [],
        public author: [],
        public replies: [],
        public wpfeaturedmedia: FeaturedMedia,
        public wpattachment: [],
        public wpterm: [],
        public curies: []
    ){}
}