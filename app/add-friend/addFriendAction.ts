'use server';
import { db } from "@/lib/db";
import { ProfileSearchResult } from "./models";

export async function getProfiles(query: string):Promise<ProfileSearchResult[]>{

    const profiles = await db.user.findMany({
        where: {
            name: {
                startsWith: query
            }
        },
        select: {
            image: true,
            id: true,
            name: true,
            email: true
        },
        take: 20
    }
    );

    return profiles;

}

export async function getProfilesStub(query: String){
    console.log(query);
    
    return ["Andrew", "brian", "kevin"];
}

