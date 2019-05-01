import { ObservableLike } from "rxjs";
import { StringObjects } from './stringobjects';
import { FeaturedMedia } from "./featuredmedia";
import { LinksContent } from "./linkscontent";

export class Property {
    constructor(
        public id: number,
        public date: string,
        public date_gmt: string,
        public guid: String
    ){}
}