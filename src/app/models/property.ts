import { ObservableLike } from "rxjs";
import { StringObjects } from './stringobjects';
import { FeaturedMedia } from "./featuredmedia";
import { LinksContent } from "./linkscontent";

export class Property {
    constructor(
        public id: number,
        public date: string,
        public date_gmt: string,
        public guid: Object,
        public modified: string,
        public modified_gmt: string,
        public slug: string,
        public status: string,
        public type: string,
        public lunk: string,
        public title: StringObjects,
        public content: StringObjects,
        public author: number,
        public featured_media: number,
        public comment_status: string,
        public ping_status: string,
        public template: string,
        public meta: [],
        public property_feature: number[],
        public propertyFeatureStr: string[],
        public region: number[],
        public regionStr: string[],
        public _links: LinksContent,
        public urlFoto: string,
        public foto: string
    ){}
}