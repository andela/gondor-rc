import * as Schemas from "./schemas";
import { Mongo } from "meteor/mongo";

export const WishList = new Mongo.Collection("WishList");

WishList.attachSchema(Schemas.WishList);
