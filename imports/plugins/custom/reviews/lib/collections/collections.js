import * as Schemas from "./schemas";
import { Mongo } from "meteor/mongo";

export const Reviews = new Mongo.Collection("Reviews");

Reviews.attachSchema(Schemas.Reviews);
