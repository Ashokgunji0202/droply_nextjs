import {pgTable,text,uuid,integer,boolean,timestamp} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const files=pgTable("files",{
    id:uuid("id").defaultRandom().primaryKey(),

    //base file/folder information
    name:text("name").notNull(),
    path:text("path").notNull(), // document/project/resum
    size:integer("size").notNull(),
    type:text("type").notNull(),  // folder/file
    fileurl:text("file_url").notNull(), // url to access the file
    thumbnailUrl:text("thumbnail_url"),// url to access the thumbnail   

    //Ownership 
    userId:text("user_id").notNull(),
    parentId:uuid("parent_id"),

    //file/folder
    isFolder: boolean("is_folder").notNull().default(false),
    isStarred:boolean("is_starred").notNull().default(false),
    isTrash:boolean("is_trash").notNull().default(false),

    //Timestamp
    createdAt:timestamp("created_at").notNull().defaultNow(),
    updatedAt:timestamp("updated_at").notNull().defaultNow(),
    deletedAt:timestamp("deleted_at"),
})

/*
    Relations
    parent -> Each file/folder can  have one parent folder

    children -> Each file/folder can have many children  files/folders
*/
export const filesReals=relations(files,({one,many})=>({
    parent:one(files,{
        fields:[files.parentId],
        references:[files.id]}
    ),
    children:many(files),
}))

//Types definations
export type File=typeof files.$inferSelect;
export type NewFile=typeof files.$inferInsert;
